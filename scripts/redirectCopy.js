var path = require('path');
var fs = require('fs');

var outputFolders = [
    '../website/booking-engine/hotel',
    '../website/booking-engine/car',
    '../website/content',
    '../website/data-api/generics',
    '../website/data-api/trips',
    '../website/data-api/tenancy',
    '../website/data-api/tenant-setup',
    '../website/universal-supplier-gateway/hotel'
];
var inputFile = path.join(__dirname, '../templates/redirect-to-overview/index.ejs');

// iterate on output folders
outputFolders.forEach(function (folder) {
    var folderPath = path.join(__dirname, folder);
    var folders = fs.readdirSync(folderPath);
    folders.forEach(function (subPath) {
        var subFolder = path.join(folderPath, subPath);
        if (fs.lstatSync(subFolder).isDirectory()) {
            var outputFile = path.join(subFolder, 'index.ejs');
            console.log(outputFile);
            // copy file
            fs.createReadStream(path.resolve(inputFile)).pipe(fs.createWriteStream(path.resolve(outputFile)));
        }
    });
}, this);

