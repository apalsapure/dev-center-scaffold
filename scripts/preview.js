var path = require('path');
var exec = require('child_process').exec;
var nopt = require('nopt');

var options = nopt({
    'environment': String
}, {
    'e': ['--environment']
});

options.environment = options.environment || 'dev';

function throwError(message, error) {
    console.log(error)
    throw new Error(message);
}

// Step 0
function cleanup(next) {
    console.log('Cleanup...');
    exec('node ./scripts/cleanup.js', function (err, stdout, stderr) {
        if (!err) {
            next();
        } else {
            throwError('Could not compile JSON', err);
        }
    });
}

// Step 1
function setProdEnv(next) {
    console.log('Setting environment to "prod"');
    process.env.NODE_ENV = 'prod';
    next();
}

// Step 2
function compileJSON(next) {
    console.log("Compiling JSON");
    exec('node ./scripts/json-converter.js -b true', function (err, stdout, stderr) {
        if (!err) {
            next();
        } else {
            throwError('Could not compile JSON', err);
        }
    });
}

// Step 3
function compileMarkDown(next) {
    console.log("Compiling Mark Down");
    exec('node ./scripts/md-converter.js -b true', function (err, stdout, stderr) {
        if (!err) {
            next();
        } else {
            throwError('Could not compile Mark Down', err);
        }
    });
}

// Step 4
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

// Step 5
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

// step 6
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

// Step 7
function setCurrentVersion(next) {
    console.log("Renaming version folders");
    exec('node ./scripts/setCurrentVersion.js', function (err, stdout, stderr) {
        if (!err) {
            next();
        } else {
            throwError('Could not rename version folders', err);
        }
    });
    next();
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
var start = new Date();
var end = new Date();
setTimeout(function () {
    cleanup(function () {
        setProdEnv(function () {
            compileJSON(function () {
                compileMarkDown(function () {
                    copyDataConfigFiles(function () {
                        copyPlaceholderFiles(function () {
                            redirectFileCopy(function () {
                                updateHarpConfig(function () {
                                    setCurrentVersion(function () {
                                        end = new Date();
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
    console.log('\nTime taken: ' + ((end - start) / (1000)) + ' seconds');
    if (code == 0) {
        console.log("\n*************Site generated successfully*************\n");
    }
});