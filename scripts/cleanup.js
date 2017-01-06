var path = require('path'),
    exec = require('child_process').exec,
    fs = require('fs');


var foldersToClean = [{
    "path": "/website/booking-engine/hotel",
    "deleteFiles": false,
    "deleteFolder": false
},{
    "path": "/website/content",
    "deleteFiles": false,
    "deleteFolder": false
}, {
    "path": "/website/universal-supplier-gateway/hotel",
    "deleteFiles": false,
    "deleteFolder": false
}, {
    "path": "/website/data-api/generics",
    "deleteFiles": false,
    "deleteFolder": false
}, {
    "path": "/website/data-api/trips",
    "deleteFiles": false,
    "deleteFolder": false
}, {
    "path": "/website/data-api/tenancy",
    "deleteFiles": false,
    "deleteFolder": false
}, {
    "path": "/website/data-api/tenant-setup",
    "deleteFiles": false,
    "deleteFolder": false
}, {
    "path": "/publish",
    "deleteFiles": true,
    "deleteFolder": true
}];


var deleteFolderRecursive = function (folderPath, deleteFolder, deleteFiles) {
    try {
        if (fs.existsSync(folderPath)) {
            fs.readdirSync(folderPath).forEach(function (file, index) {
                var curPath = path.join(folderPath, file);
                if (fs.lstatSync(curPath).isDirectory()) { // recursive
                    deleteFolderRecursive(curPath, true, true);
                } else { // delete file
                    if (deleteFiles)
                        fs.unlinkSync(curPath);
                }
            });
            if (deleteFolder)
                fs.rmdirSync(folderPath);
        }
    } catch (e) {
        console.log(e);
        // don't do anything
        console.log('Failed to remove path: ' + folderPath);
    }
};

foldersToClean.forEach(function (folder) {
    var folderPath = path.join(__dirname, '../', folder.path);
    deleteFolderRecursive(folderPath, folder.deleteFolder, folder.deleteFiles);
});