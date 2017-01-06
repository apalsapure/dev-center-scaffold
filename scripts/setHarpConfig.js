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

var haprJSONFile = path.join(__dirname, '../website/_harp.json');
var configPath = path.join(__dirname, '../configurations/environement', options.environment + '.json');

var sourceJSON = JSON.parse(fs.readFileSync(configPath, {
    encoding: 'utf8'
})).globals;

var harpJSON = JSON.parse(fs.readFileSync(haprJSONFile, {
    encoding: 'utf8'
})).globals;

// over ride the harp json
for (var key in sourceJSON) {
    harpJSON[key] = sourceJSON[key];
}

// save harp json
var json = {
    "globals": harpJSON
};

fs.writeFileSync(haprJSONFile, JSON.stringify(json, null, 2), { encoding: 'utf8' });

process.on('uncaughtexceptions', function (e) {
    process.exit(1);
});

process.on('exit', function (code) {
    if (code == 0) {
        console.log('Current Version changes done');
    }
});