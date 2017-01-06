var path = require('path');
var exec = require('child_process').exec;

var input = path.join(__dirname + '/../configurations/placeholder'),
    output = path.join(__dirname + '/../website'),
    command = 'node scripts/fileCopy/json-copy -i "' + path.resolve(input) + '" -o "' + path.resolve(output) + '"';

console.log('Copying config.json files.');
exec(command, function (err, stdout, stderr) {
    if (err) {
        console.log(command);
        console.log(err);
        throw new Error("Couldn't copy placeholder config.");
    }
});

process.on('uncaughtexceptions', function (e) {
    process.exit(1);
});

process.on('exit', function (code) {
    if (code == 0) {
        console.log('Placeholder Config copied');
    }
});