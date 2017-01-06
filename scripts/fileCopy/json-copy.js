var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');
var nopt = require('nopt');

var options = nopt({
    'input': String,
    'output': String
}, {
        'i': ['--input'],
        'o': ['--output']
    });

if (!options.input || !options.output) {
    console.log('Usage: json-copy -i "PATH_FROM_FOLDER" -o "PATH_TO_FOLDER"');
    process.exit();
}

setTimeout(function () {
    var nodeDir = require('node-dir');

    console.log("Copying data json files to Website");

    var createFolderIfNotExists = function (folder) {
        try {
            var stats = fs.statSync(folder);
        } catch (e) {
            mkdirp.sync(folder);
        }
    };

    // Get all apib files in given folder
    require('node-dir').readFiles(options.input, {
        match: /.json$/
    }, function (err, content, filePath, next) {
        // Get the name of file
        var inputFileName = path.basename(filePath);

        // Output file name will be same as input file name
        var outputFileName = inputFileName;

        // and it will be stored in side website at same folder structure
        var output = filePath.replace(options.input, options.output),
            outputFolder = path.dirname(output);

        // remove dots from folder name
        outputFolder = outputFolder.replace(/\./g, '_');

        // check if output folder exists or not, if not create it
        createFolderIfNotExists(outputFolder);

        // build the output file name path
        output = path.join(outputFolder, outputFileName);

        // copy file
        fs.createReadStream(path.resolve(filePath)).pipe(fs.createWriteStream(path.resolve(output)));

        console.log("File copied : " + filePath);

        next();
    }, function (err, files) {
        if (err) {
            console.log(err);
            throw err;
        }
    });
}, 0);

process.on('uncaughtexceptions', function (e) {
    process.exit(1);
});

process.on('exit', function (code) {
    if (code == 0) {
        console.log("\n*************Data Config files copied successfully*************\n");
    }
});
