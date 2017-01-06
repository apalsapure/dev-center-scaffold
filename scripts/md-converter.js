var path = require('path'),
    fs = require('fs'),
    nopt = require('nopt'),
    mkdirp = require('mkdirp'),
    buildAll = true,
    exec = require('child_process').exec;

var options = nopt({
    'build': String
}, {
    'b': ['--build']
});

if (options.build) {
    buildAll = false;
}

setTimeout(function () {
    var nodeDir = require('node-dir');
    var apiPath = path.join(__dirname + '/../apis')
    var websitePath = path.join(__dirname + '/../website');
    var skipFile = 'data-structures.apib';
    var includeFolders = [];

    console.log("Compiling apib to Mark Down");

    var createFolderIfNotExists = function (folder) {
        try {
            var stats = fs.statSync(folder);
        } catch (e) {
            mkdirp.sync(folder);
        }
    };

    if (buildAll === false) {
        var content = JSON.parse(fs.readFileSync(path.join(__dirname + '/../configurations/build/config.json'), {
            encoding: 'utf8'
        }));
        content.folders.forEach(function (folder) {
            includeFolders.push(path.join(__dirname, '/../apis/', folder))
        });
    }

    // Get all apib files in given folder
    require('node-dir').readFiles(apiPath, {
        match: /.apib$/
    }, function (err, content, filePath, next) {
        // Get the name of file
        var inputFileName = path.basename(filePath);

        if (includeFolders.length) {
            var match = false;
            includeFolders.forEach(function (folder) {
                if (match === false) {
                    if (filePath.indexOf(folder) !== -1) match = true;
                }
            });
            if (match === false) {
                next();
                return;
            }
        }

        if (inputFileName !== skipFile) {
            // Output file name will be with extension .md
            var outputFileName = inputFileName.replace('.apib', '.md');
           
            // and it will be stored in side website at same folder structure
            var output = filePath.replace(apiPath, websitePath),
                outputFolder = path.dirname(output);

            // remove dots from folder name
            outputFolder = outputFolder.replace(/\./g, '_');

            // check if output folder exists or not, if not create it
            createFolderIfNotExists(outputFolder);

            // build the output file name path
            output = path.join(outputFolder, outputFileName);

            // build the command
            var command = 'node scripts/converter/mson2md.js -i "' + path.resolve(filePath) + '" -o "' + path.resolve(output) + '"';
            // console.log(command);
            exec(command, function (err, stdout, stderr) {
                if (!err) {
                    console.log("MSON converted to Mark Down: " + filePath);
                } else {
                    throw new Error("Couldn't covert MSON to Mark Down");
                }
            });
        }
        next();
    }, function (err, files) {
        if (err)
            throw err;
        console.log('Executing Mark Down creation in parallel.');
    });
}, 0);

process.on('uncaughtexceptions', function (e) {
    process.exit(1);
});

process.on('exit', function (code) {
    if (code == 0) {
        console.log("\n*************Mark Down generated successfully*************\n");
    }
});
