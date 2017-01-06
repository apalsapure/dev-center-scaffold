var path = require('path');
var exec = require('child_process').exec;
var fs = require('fs');
var nopt = require('nopt');

var options = nopt({
    'environment': String
}, {
    'e': ['--environment']
});

options.environment = options.environment || 'dev';

function replaceAll(find, replace, str) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
};

function guid() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

function throwError(message, error) {
    console.log(error)
    throw new Error(message);
}

function setProdEnv(next) {
    console.log('Setting environment to "prod"');
    process.env.NODE_ENV = 'prod';
    next();
}

function compileJSON(next) {
    console.log("Compiling JSON");
    exec('node ./scripts/json-converter.js', function (err, stdout, stderr) {
        if (!err) {
            next();
        } else {
            throwError('Could not compile JSON', err);
        }
    });
}

function compileMarkDown(next) {
    console.log("Compiling Mark Down");
    exec('node ./scripts/md-converter.js', function (err, stdout, stderr) {
        if (!err) {
            next();
        } else {
            throwError('Could not compile Mark Down', err);
        }
    });
}

function copyDataConfigFiles(next) {
    console.log("Copying data config files");
    exec('node ./scripts/dataConfigCopy.js', function (err, stdout, stderr) {
        if (!err) {
            next();
        } else {
            throwError('Could not data config files', err);
        }
    });
}

function copyPlaceholderFiles(next) {
    console.log("Copying placeholder config files");
    exec('node ./scripts/placeholderConfigCopy.js', function (err, stdout, stderr) {
        if (!err) {
            next();
        } else {
            throwError('Could not placeholder config files', err);
        }
    });
}

function updateHarpConfig(next) {
    console.log("Updating Harp Config. Environment: " + options.environment);
    exec('node ./scripts/setHarpConfig.js -e ' + options.environment, function (err, stdout, stderr) {
        if (!err) {
            next();
        } else {
            throwError('Could not update harp config', err);
        }
    });
}

function compileHTML(next) {
    console.log("Compiling HTML using Harp");
    var harp = require("harp")
    harp.compile(__dirname + "/../website", __dirname + "/../publish", function (err, stdout, stderr) {
        if (!err) {
            console.log("Html compiled");
            setTimeout(function () {
                next();
            }, 3000);
        } else {
            throwError('Could not compile html using harp', err);
        }
    });
}

function versionStaticResource(next) {
    // adds version in the query string
    var transform = function (content, filename) {
        //console.log("Transforming " + filename);

        content = replaceAll('__RevisionNoGoesHere__', guid(), content);

        fs.writeFile(path.resolve(filename), content, function (err) {
            if (err) throwError('Versioning of static resources failed', err);
            //console.log(filename + " saved");
        });
    };

    // path where html will be generated
    var publishPath = path.join(__dirname + '/../publish');

    // add version in query string
    require('node-dir').readFiles(publishPath, {
        match: /.html$/
    }, function (err, content, filename, nextFile) {
        if (err) throw err;
        transform(content, filename);
        nextFile();
    }, function (err, files) {
        if (err) throw err;
        console.log('Finished transforming files');
        next();
    });
}

function setCurrentVersion(next) {
    console.log("Renaming version folders");
    exec('node ./scripts/setCurrentVersion.js', function (err, stdout, stderr) {
        if (!err) {
            next();
        } else {
            throwError('Could not rename version folders', err);
        }
    });
}

function redirectFileCopy(next) {
    console.log("Copying redirect ejs file");
    exec('node ./scripts/redirectCopy.js', function (err, stdout, stderr) {
        if (!err) {
            next();
        } else {
            throwError('Could not Copying redirect ejs file', err);
        }
    });
}

function deleteMarkdownFiles(next) {
    var publishPath = path.join(__dirname + '/../publish');
    // delete mark down files
    require('node-dir').readFiles(publishPath, {
        match: /.md$/
    }, function (err, content, filename, nextPath) {
        if (err) throw err;
        fs.unlinkSync(filename);
        nextPath();
    }, function (err, files) {
        if (err) throw err;
        next();
        console.log('Finished deleting markdown files');
    });
}

function deleteStaticFiles(next) {
    // deletes folder
    var deleteFolderRecursive = function (folderPath) {
        try {
            if (fs.existsSync(folderPath)) {
                fs.readdirSync(folderPath).forEach(function (file, index) {
                    var curPath = path.join(folderPath, file);
                    if (fs.lstatSync(curPath).isDirectory()) { // recurse
                        deleteFolderRecursive(curPath);
                    } else { // delete file
                        fs.unlinkSync(curPath);
                    }
                });
                fs.rmdirSync(folderPath);
            }
        } catch (e) {
            console.log(e);
            // don't do anything
            console.log('Failed to remove path: ' + folderPath);
        }
    };

    // path where html will be generated
    var publishPath = path.join(__dirname + '/../publish');

    // delete js, css and global folders as they are not required
    // content from them is minified and combined in bundle folder
    deleteFolderRecursive(path.join(publishPath, 'js'));
    deleteFolderRecursive(path.join(publishPath, 'css'));
    deleteFolderRecursive(path.join(publishPath, 'global'));
    console.log('Finished deleting static files');
}

setTimeout(function () {
    setProdEnv(function () {
        compileJSON(function () {
            compileMarkDown(function () {
                copyDataConfigFiles(function () {
                    copyPlaceholderFiles(function () {
                        redirectFileCopy(function () {
                            setCurrentVersion(function () {
                                updateHarpConfig(function () {
                                    compileHTML(function () {
                                        deleteMarkdownFiles(function () {
                                            deleteStaticFiles(function () {
                                                versionStaticResource(function () {
                                                    console.log('Done');
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}, 0);

process.on('uncaughtexceptions', function (e) {
    process.exit(1);
});

process.on('exit', function (code) {
    if (code == 0) {
        console.log("\n*************Site generated successfully*************\n");
    }
});