var path = require('path');
var exec = require('child_process').exec;
var fs = require('fs');

var defaultConfigFile = path.join(__dirname, '/../templates/be_hotel_data_json/_data.json');

var input = path.join(__dirname + '/../configurations/dataConfig'),
    output = path.join(__dirname + '/../website'),
    command = 'node scripts/fileCopy/json-copy -i "' + path.resolve(input) + '" -o "' + path.resolve(output) + '"';

console.log('Copying _data.json files...')
exec(command, function (err, stdout, stderr) {
    if (err) {
        console.log(command);
        console.log(err);
        throw new Error("Couldn't copy data config.");
    }
    // Check if all folders which has .md has _data.json file
    require('node-dir').readFiles(output, {
        match: /.md$/
    }, function (err, content, filePath, next) {
        // get the folder name
        var folderName = path.dirname(filePath);
        var jsonFilePath = path.join(folderName, '_data.json');
        // check if file exists or not
        // if not copy default content
        try {
            fs.statSync(jsonFilePath);
        } catch (e) {
            // copy file
            fs.createReadStream(path.resolve(defaultConfigFile)).pipe(fs.createWriteStream(path.resolve(jsonFilePath)));
        }
        next();
    });
});

process.on('uncaughtexceptions', function (e) {
    process.exit(1);
});

process.on('exit', function (code) {
    if (code == 0) {
        console.log('_data.json files copied successfully');
    }
});