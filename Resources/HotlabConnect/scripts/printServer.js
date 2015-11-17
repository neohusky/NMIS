/**
 * Created by theokitsos on 12/10/2015.
 */
var chokidar = require('chokidar')
    ,nconf = require('nconf')
    ,fs = require("fs")
    ,async = require("async")
    ,exec = require('child_process').exec;

var request = require('request');
var ipp = require('ipp');
var path = require('path');
var appDir = path.dirname(require.main.filename);

var file;



exports.Start = function () {
// One-liner for current directory, ignores .dotfiles
    var watcher = chokidar.watch('print', {
        ignored: /[\/\\]\./,
        ignoreInitial: false,
        persistent: true
    });

    /*
     .on('all', function(event, path) {
     console.log(event, path);
     });*/


    //var log = console.log.bind(console);

    watcher.on('add', function (path) {
        console.log('File', path, 'has been added');
        //deletefile(path, printfile(path));
        PrintDelete(appDir+"/"+path);
    });
};

/*
// One-liner for current directory, ignores .dotfiles
    var watcher = chokidar.watch('.', {
        ignored: /[\/\\]\./,
        ignoreInitial: false,
        persistent: true
    });

    /!*
     .on('all', function(event, path) {
     console.log(event, path);
     });*!/


    var log = console.log.bind(console);

    watcher.on('add', function (path) {
        log('File', path, 'has been added');
    });*/


/*

function printfile(file) {
    var lpr;
    CupsPrinterName = nconf.get('Print:PrinterName');
    console.log("Going to print existing file");
    lpr = 'lpr -P ' + CupsPrinterName + ' -o raw ' + file;
    exec(lpr, function(err) {
        if (err) {
            return console.error(err);
        }
        console.log(file + " printed successfully!");

    });

    }
*/






/*exports.getPrinters = function(callback) {
    var CUPSurl = 'http://localhost:631/printers';//todo - change of you have CUPS running on other host
    request(CUPSurl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var printersMatches = body.match(/<TR><TD><A HREF="\/printers\/([a-zA-Z0-9-^"]+)">/gm);//i know, this is terrible, sorry(
            var printersUrls = [];
            var i;
            if (printersMatches) {
                for (i = 0; i < printersMatches.length; i++) {
                    var a = (/"\/printers\/([a-zA-Z0-9-^"]+)"/).exec(printersMatches[i]);
                    if (a) {
                        console.log(a);
                        printersUrls.push(CUPSurl + '/' + a[1]);
                    }
                }
            }
        }

        callback(error, printersUrls);
    });
};*/


function lpr(file) {
        var cmd;
        CupsPrinterName = nconf.get('Print:PrinterName');
        cmd = 'lpr -P ' + CupsPrinterName + ' -o raw ' + file;
        exec(cmd, function(error, stdout, stderr) {
        // command output is in stdout
    });
    console.log("file printed")
    }


function printlabel2(name) {
    //console.log(name);

    //fs.open(name, 'w', function (err) {
        lpr(name,function(err) {
        console.log(' printing ' + name);
        fs.unlink(name, function (err) {
            console.log('   deleting ' + name);
        });
    });

}



function DeleteFile(name){
    fs.unlink(name, function (err) {
        console.log('   deleting ' + name);
    });

};


function PrintDelete(name) {
    console.log('Program Start');


    async.waterfall([
        function(callback){
            lpr(name);
            callback(null, 'one', 'two');
        },
        function(arg1, arg2, callback){
            DeleteFile(name);
            // arg1 now equals 'one' and arg2 now equals 'two'
            callback(null, 'three');
        },
        function(arg1, callback){
            // arg1 now equals 'three'
            callback(null, 'done');
        }
    ], function (err, result) {
        console.log(result);
    });

    console.log('Program End');

};


function openUnlink(name) {
    console.log(name);
    fs.open(name, 'w', function (err) {
        console.log(' + ' + name);
        fs.unlink(name, function (err) {
            console.log('   - ' + name);
        });
    });
};

/*
for (var i=1;i<=10;i++) {
    openUnlink('hello'+i+'.txt');
}*/
