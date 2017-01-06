var path = require('path');
var exec = require('child_process').exec;
var fs = require('fs');
var websitePath = path.join(__dirname, '../website');

var globalJSON = JSON.parse(fs.readFileSync(path.join(websitePath, '_harp.json'), {
    encoding: 'utf8'
})).globals;

// deletes folder
var deleteFolderRecursive = function (folderPath) {
    try {
        if (fs.existsSync(folderPath)) {
            fs.readdirSync(folderPath).forEach(function (file, index) {
                var curPath = path.join(folderPath, file);
                if (fs.lstatSync(curPath).isDirectory()) { // recurse
                    deleteFolderRecursive(curPath);
                } else { // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(folderPath);
        }
    } catch (e) {
        // don't do anything
        console.log('Failed to remove path: ' + folderPath);
    }
};

var renameFolder = function (oldName, newName) {
    var folderExists = false;
    try {
        // check if folder exists
        var stats = fs.statSync(oldName);
        folderExists = true;
    } catch (e) {
        // don't do anything
    }
    // check if there is folder with name `current`, if yes delete it
    try {
        // check if folder exists
        var stats = fs.statSync(newName);
        // delete the folder
        deleteFolderRecursive(newName);
    } catch (e) {
        // don't do anything
    }

    // rename
    if (folderExists)
        fs.renameSync(oldName, newName);
}

// booking engine hotel
if (globalJSON.be_hotel_version) {
    var oldName = path.join(websitePath, globalJSON.booking_engine_url, 'hotel', 'v' + globalJSON.be_hotel_version).replace(/\./g, '_');
    var newName = path.join(websitePath, globalJSON.booking_engine_url, 'hotel', 'current');
    renameFolder(oldName, newName);
}
// booking engine car
if (globalJSON.be_car_version) {
    var oldName = path.join(websitePath, globalJSON.booking_engine_url, 'car', 'v' + globalJSON.be_car_version).replace(/\./g, '_');
    var newName = path.join(websitePath, globalJSON.booking_engine_url, 'car', 'current');
    renameFolder(oldName, newName);
}

// content
if (globalJSON.content_version) {
    var oldName = path.join(websitePath, 'content', 'v' + globalJSON.be_hotel_version).replace(/\./g, '_');
    var newName = path.join(websitePath, 'content', 'current');
    renameFolder(oldName, newName);
}

// usg hotel
if (globalJSON.usg_hotel_version) {
    var oldName = path.join(websitePath, globalJSON.universal_supplier_gateway_url, 'hotel', 'v' + globalJSON.usg_hotel_version).replace(/\./g, '_');
    var newName = path.join(websitePath, globalJSON.universal_supplier_gateway_url, 'hotel', 'current');
    renameFolder(oldName, newName);
}

// data api generics
if (globalJSON.data_api_version) {
    var oldName = path.join(websitePath, 'data-api', 'generics', 'v' + globalJSON.data_api_version).replace(/\./g, '_');
    var newName = path.join(websitePath, 'data-api', 'generics', 'current');
    renameFolder(oldName, newName);
}

// data api trips
if (globalJSON.data_api_version) {
    var oldName = path.join(websitePath, 'data-api', 'trips', 'v' + globalJSON.data_api_version).replace(/\./g, '_');
    var newName = path.join(websitePath, 'data-api', 'trips', 'current');
    renameFolder(oldName, newName);
}

// data api tenant configuration
if (globalJSON.data_tenancy_configuration_version) {
    var oldName = path.join(websitePath, 'data-api', 'tenancy', 'v' + globalJSON.data_tenancy_configuration_version).replace(/\./g, '_');
    var newName = path.join(websitePath, 'data-api', 'tenancy', 'current');
    renameFolder(oldName, newName);
}

// data api tenant setup
if (globalJSON.data_tenancy_setup_version) {
    var oldName = path.join(websitePath, 'data-api', 'tenant-setup', 'v' + globalJSON.data_tenancy_setup_version).replace(/\./g, '_');
    var newName = path.join(websitePath, 'data-api', 'tenant-setup', 'current');
    renameFolder(oldName, newName);
}

process.on('uncaughtexceptions', function (e) {
    process.exit(1);
});

process.on('exit', function (code) {
    if (code == 0) {
        console.log('Current Version changes done');
    }
});