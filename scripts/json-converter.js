var path = require('path'),
    fs = require('fs'),
    nopt = require('nopt'),
    mkdirp = require('mkdirp'),
    os = require('os'),
    exec = require('child_process').exec,
    dataStructFilePath = '_dataStructure/data-structures.apib',
    buildAll = true,
    start = new Date(),
    versionRegex = /v[\d]\.[\d]/;

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
    var apiPath = path.join(__dirname + '/../apis');
    var websitePath = path.join(__dirname + '/../website');
    var skipFile = 'data-structures.apib';
    var includeFolders = [];
    var batchSize = os.cpus().length,
        currentSize = 0;


    console.log("Compiling apib to Swagger JSON");

    var createFolderIfNotExists = function (folder) {
        try {
            var stats = fs.statSync(folder);
        } catch (e) {
            mkdirp.sync(folder);
        }
    };

    var getDataStructureFilePath = function (filePath) {
        var split = filePath.split(path.sep);
        for (var index = 0; index < split.length; index++) {
            var element = split[index];
            if (!versionRegex.exec(element)) continue;
            var subPath = split.slice(0, index + 1).join(path.sep);
            return path.join(subPath, dataStructFilePath);
        }
    };

    if (buildAll === false) {
        var content = JSON.parse(fs.readFileSync(path.join(__dirname + '/../configurations/build/config.json'), {
            encoding: 'utf8'
        }));
        content.folders.forEach(function (folder) {
            includeFolders.push(path.join(__dirname, '/../apis/', folder))
        });

        console.log('Executing selective JSON creation in parallel with batch size of ' + batchSize);
    } else {
        console.log('Executing JSON creation in parallel with batch size of ' + batchSize);
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
            var outputFileName = inputFileName.replace('.apib', '.json');

            // and it will be stored in side website at same folder structure
            var output = filePath.replace(apiPath, websitePath),
                outputFolder = path.dirname(output);

            // remove dots from folder name
            outputFolder = outputFolder.replace(/\./g, '_');

            // check if output folder exists or not, if not create it
            createFolderIfNotExists(outputFolder);

            // build the output file name path
            output = path.join(outputFolder, outputFileName);

            // build data structure file path
            // ASSUMPTION:
            // Name of the version folder will always start with `v` followed by decimal number
            var dataStructureFile = getDataStructureFilePath(filePath);
            if (!dataStructureFile) throw Error('Data structure file is not available @ ' + filePath);

            var command = 'node scripts/converter/mson2json -i "' + path.resolve(filePath) + '" -o "' + path.resolve(output) + '" -r "' + path.resolve(dataStructureFile) + '"';

            exec(command, function (err, stdout, stderr) {
                currentSize--;
                if (!err) {
                    console.log("MSON converted to JSON: " + filePath);
                } else {
                    console.log(command);
                    console.log(err);
                    throw new Error("Couldn't covert MSON to JSON. Command:" + command);
                }
            });
            currentSize++;
        }

        if (currentSize <= batchSize)
            next();
        else {
            var interval = setInterval(function () {
                if (currentSize !== 0) return;
                clearInterval(interval);
                next();
            }, 1000);
        }
    }, function (err, files) {
        if (err) throw err;
    });
}, 0);

process.on('uncaughtexceptions', function (e) {
    process.exit(1);
});

process.on('exit', function (code) {
    console.log((new Date() - start) / 1000);
    if (code == 0) {
        console.log("\n*************JSON generated successfully*************\n");
    }
});
