var path = require('path');
var fs = require('fs');
var exec = require('child_process').exec;
var nopt = require('nopt');

var options = nopt({
    'input': String,
    'output': String
}, {
    'i': ['--input'],
    'o': ['--output']
});

if (!options.input) {
    console.log("Usage: mson2md -i mson.apib");
    console.log("       mson2md -i mson.apib -o converted.md");
    process.exit();
}

var stopWords = [],
    configPath = path.join(__dirname, '../../configurations/stop-words.json');
console.log(configPath);
if (fs.existsSync(configPath))
    stopWords = JSON.parse(fs.readFileSync(configPath, {
        encoding: 'utf8'
    })).stopWords;

for (var i = 0; i < stopWords.length; i++) {
    var item = stopWords[i];
    item.pattern = new RegExp(item.pattern);
}

var output = options.output || 'output.md';
var apibContent = fs.readFileSync(options.input, {
    encoding: 'utf8'
});

var requestRegex = /\+ Request[\w \(\)\/]*/;
var parameterRegex = /\+ Parameters/;
var hashRegex = new RegExp('^#[# ]*');

var convert = function (content) {
    var lines = content.split('\n');
    var markdown = '',
	skip = false,
	skipBlockquote = false,
	responseStarted = false,
	addBlockquote = false;
    for (var index = 0; index < lines.length; index++) {
        var line = lines[index];

        // break if Data Structure is found
        if (line.indexOf('# Data Structures') !== -1)
            break;

        // remove stop word
        for (var i = 0; i < stopWords.length; i++) {
            var item = stopWords[i];
            line = line.replace(item.pattern, item.for);
        }

        // remove the url from the line
        var url = line.match(/^#[# \w-()]+(\[[\w\/{}\&\?=.]*\])$/);
        if (url) {
            console.log(url[1]);
            line = line.substring(0, line.indexOf('['));
            // if it's action on the resource add one span element
            // so that script and add try out link at run time
            if (url[1] === '[POST]' || url[1] === '[GET]' || url[1] === '[DELETE]' || url[1] === '[PUT]') {
                line = '<span style="display: none" class="link">' + line.replace(hashRegex, '').trim() + '</span>\n\n';
                addBlockquote = true;
                skipBlockquote = true;
            } else {
                line = line + '\n';
            }
        }

        if (skip === false) {
            var match = line.match(requestRegex) || line.match(parameterRegex);
            if (match)
                skip = true;
        }

        if (responseStarted === false) {
            var trim = line.trim();

            if (trim.indexOf('+ Response') === 0)
                responseStarted = true;

        } else {
            var trim = line.trim();

            if (trim.indexOf('+ ') === 0)
                continue;

            skip = false;
            responseStarted = false;
            addBlockquote = false;
            continue;
        }

        if (addBlockquote && skipBlockquote === false && line.length > 4) line = '> ' + line;
        skipBlockquote = false;

        if (skip === false && responseStarted === false)
            markdown += line + '\n';

    }

    return markdown;
}

var md = convert(apibContent);
fs.writeFileSync(output, md);
