var express = require('express')
    , router = express.Router()
    , serial = require('../scripts/serial.js')
    , barcode = require("../scripts/barcode.js")
    , config = require('../scripts/config.js')
    , nconf = require('nconf')
    , os = require('os')
    ,async = require("async")
    ,fs = require("fs")
    ,exec = require('child_process').exec
    , path = require('path')
    , appDir = path.dirname(require.main.filename);;



/////////////////////////

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// middleware specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
// define the about route
router.get('/about', function(req, res) {
    res.render('about');
});
// define the admin route
router.get('/admin', function(req, res) {
    res.render('admin');
});
// define the status route
router.get('/status', function(req, res) {
    res.render('status');
});
// define the printserver route
router.get('/printserver', function(req, res) {
    GetIP(function(data){
            console.log(data);
    // Print the result
        url = 'http://' + data + ':631';
        res.render('printserver', {
            title: 'Print Server Page',
            url: url
        });
    });
});

// define the settings route
router.get('/settings',function(req,res){

    CreateOptionsJSON(function (data) {
        console.log("options :" + JSON.stringify(data)); //correct json object

        res.render('settings', {
            title: 'Settings Page',
            options:data
        });
    });




});


router.post('/settingssave', function (req, res) {
    nconf.set('DoseCal:Type', req.body.DoseCalType);
    nconf.set('DoseCal:CommPortName', req.body.DoseCalCommPortName);
    nconf.set('DoseCal:CommPortBaud', +req.body.DoseCalCommPortBaud);
    nconf.set('DoseCal:CommPortDataBits', +req.body.DoseCalCommPortDataBits);
    nconf.set('DoseCal:CommPortStopBits', +req.body.DoseCalCommPortStopBits);
    nconf.set('DoseCal:CommPortParity', req.body.DoseCalCommPortParity);

    var valWellCounter = ((req.body.WellCounterEnabled) === "true");
    nconf.set('WellCounter:Enabled', valWellCounter);
    nconf.set('WellCounter:CommPortName', req.body.WellCounterCommPortName);
    nconf.set('WellCounter:CommPortBaud', +req.body.WellCounterCommPortBaud);
    nconf.set('WellCounter:CommPortDataBits', +req.body.WellCounterCommPortDataBits);
    nconf.set('WellCounter:CommPortStopBits', +req.body.WellCounterCommPortStopBits);
    nconf.set('WellCounter:CommPortParity', req.body.WellCounterCommPortParity);

    nconf.set('WebPort', +req.body.WebPort);
    var val = ((req.body.PrintServer) === "true");
    nconf.set('Print:Server', val);
    nconf.set('Print:ServerFolder', req.body.PrintServerFolder);
    nconf.set('Print:PrintPrinterName', req.body.PrintPrinterName);

    // If it's not showing up, just use req.body to see what is actually being passed.
    console.log(req.body);
    //Save Settings to file
    config.saveConfig();
    //Go Back to settings
/*    req.flash("info", "Email queued");
    req.flash("info", "Email sent");
    req.flash("error", "Email delivery failed");*/

    res.render('index');
});




router.get('/data', function(req, res, next){

    //serialData ='~1 Tc-99m 35.1 1.293 GBq';
    //LastBarCode ='E2841 /n';

    /*    var data = '{"data":[' +
     '{"CalibratorData":"'+serialData+'" , ' +
     '"BarcodeData":"'+ LastBarCode +'"}]}';*/
    //res.json({msg: 'This is CORS-enabled for all origins!'});
    if(!serial.serialData){
        StatusString="No Comm";
        res.json({Status:StatusString,
            BarcodeData:barcode.LastBarCode});
        console.log("The sent barcode is " + barcode.LastBarCode);
    } else {

        res.json({
            Status: StatusString,
            CalIsotope: calibrator.IsotopeA100(serialData),
            CalActivity: calibrator.ActivityA100(serialData),
            CalUnits: calibrator.UnitsA100(serialData),
            BarcodeData: barcode.LastBarCode
        });
    console.log("The sent barcode is " + barcode.LastBarCode);
    }
//Erase LastBarcode when value has been retrieved
    barcode.LastBarCode = ""
});

router.get('/SerialData', function(req, res, next){


    if(!serial.serialData){
        StatusString="No Comm";
        res.json({Status:StatusString
            });
    } else {

        res.json({
            SerialData: serial.serialData
        });
        console.log("The sent barcode is " + barcode.LastBarCode);
    }
//Erase LastBarcode when value has been retrieved
    barcode.LastBarCode = ""
});

router.get('/getCommPorts', function(req, res) {

    serial.AvailablePorts(function (list) {
        res.json(list);

    });
});

router.get('/getCalReading', function(req, res) {

    serial.getCalReading(function (data) {
        res.json(data);
        console.log("Web request for serialdata. :" + JSON.stringify(data));
    });

});

router.get('/getCalStatus', function(req, res) {

    serial.getCalStatus(function (data) {
        res.json(data);

    });
});
router.get('/getBarcode', function(req, res) {

    barcode.getBarcode(function (data) {
        res.json(data);
        console.log("Web request for Barcode. :" + JSON.stringify(data));
    });

});


// accept get request at /user
router.get('/test', function (req, res) {
    res.send('Got a get request at /test');
    serial.calTest();

});

// accept get request at /user
router.get('/resetcomm', function (req, res) {
    serial.resetComm();
    console.log("comm has been reset");
    res.send('Comm has been reset');
});



// accept get request at /stopcomm
router.get('/stopcomm', function (req, res) {
    serial.stopComm();
    console.log("comm has been stopped");
    res.send('Comm has been stopped');
});

// accept get request at /startcomm
router.get('/startcomm', function (req, res) {
    serial.StartSerialComms();
    console.log("comm has been started");
    res.send('Comm has been started');
});

router.get('/reboot', function (req, res) {
    var exec = require('child_process').exec;
    exec('sudo reboot', function (error, stdout, stderr) {
        StatusString="Rebooting...";
        res.json({Status:StatusString});
        // output is in stdout
    });
});

router.get('/shutdown', function (req, res) {
    var exec = require('child_process').exec;
    exec('sudo shutdown -h now', function (error, stdout, stderr) {
        res.send('Shutting down....');
        // output is in stdout
    });
});

router.get('/control/:isotope', function(req, res) {
    var isotope = req.params.isotope;
    serial.calIsotope(req.params.isotope);

        //res.send("Not recognised Isotope " +isotope);

    //res.send(isotope);
});

router.get('/sendcommand/:command', function(req, res) {

    serial.sendCommand(req.params.command);

});

router.get('/zplprint/:barcode/:zpl/:copies?', function(req, res) {
    var zpl = req.params.zpl;
    var copies = req.params.copies;
    var copiesArg;
        if (!copies){
            copiesArg = ""
        } else{
            copiesArg = ' -#'+ copies
        }
    var filename  = appDir + "/print/" + req.params.barcode + ".zpl";
    //console.log(req.params.zpl);
    res.send("received zpl: " + req.params.zpl);

    async.series([
        function(callback){
            fs.writeFile(filename, zpl, function(err) {
            if(err) {
                callback(err);
                return;
            }
            //console.log("The file was saved! to "+filename);
                callback();
            });
        },
        function(callback){
            CupsPrinterName = nconf.get('Print:PrinterName');
            //console.log(CupsPrinterName);
            var cmd = 'lpr -P ' + CupsPrinterName + copiesArg +' -o raw ' + filename;
                console.log(cmd);
            exec(cmd, function(error, stdout, stderr) {
                // command output is in stdout'
                //console.log(cmd);
                console.log(filename + " printed");
                callback();
            });

        },
        function(callback){
            fs.unlink(filename, function (err) {
                //console.log(filename + " deleted");

            });
            callback();
        }
    ]);



});

router.get('/zpltest/', function(req, res) {
    var currentdate = new Date();
    var datetime = currentdate.getDate() + "/"
        + (currentdate.getMonth()+1)  + "/"
        + currentdate.getFullYear() + "  "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes();

    var zpl = "^XA \
            ^FX Radiation Logo \
    ^FO520,220^GFA,1530,1530,17,,::Q0C,P03EP07,P07EP0FC,O01FFP0FE,O03FFO01FF8,O07FF8N01FFC,O0IF8N03FFE,N01IFCN07IF,N03IFEN07IF8,N07IFEN0JFC,N0KFN0JFE,M01KFM01KF,M01KF8L01KF,M03KFCL03KF8,M07KFCL07KFC,M07KFEL07KFC,M0LFEL0LFE,L01MFL0LFE,L01MFK01MF,L03MF8J01MF,L03MFCJ03MF8,L03MFCJ07MF8,L07MFEJ07MFC,L07MFEJ0NFC,L0OFJ0NFC,L0OFI01NFE,L0NFEJ0NFE,L0NFCJ07MFE,K01NF8J03NF,K01NFK01NF,K01MFE007C00NF,K01MFE01FF00NF,K01MFC07FF807MF,K01MFC07FFC07MF,K01MF80IFE03MF,K01MF81JF03MF,:K01MF01JF01MF,K01MF01JF01MF8,T01JF01MF,T01JF,::U0IFE,U07FFC,U03FF8,U01FF,V07C,,:::T01I02,T03F01F,T03JF8,T07JF8,T07JFC,T0KFC,S01KFE,:S03LF,S03LF8,S07LF8,S07LFC,S0MFC,R01MFE,R01NF,R03NF,R03NF8,R07NF8,R0OFC,:Q01OFE,Q01PF,Q03PF,Q03PF8,Q07PF8,Q07PFC,Q03PF8,Q01OFE,R07NF8,S0MFE,S01LF,T01JF,,::^FS \
    ^FX Top Section Department Name \
    ^CF0,40 \
    ^FO150,10^FDCAUTION - RADIOISOTOPE^FS \
    ^CF0,50\
    ^FO10,50^FDTEST, DOSE^FS\
    ^CFA,18,12\
    ^FO10,90^FDDOB: 01/01/2000   MRN: 111111^FS\
    ^CF0,40,42\
    ^FO10,130^FD1003.6 MBq Technetium-99m DTPA^FS\
    ^CFI,40,20\
    ^FO10,160^FDGFR (DTPA)^FS\
    ^CF0,35\
    ^FO10,220^FDDispensed: "+ datetime	+"SyrID: d19259^FS\
    ^CF0,35\
    ^FO10,270^FDTech Draw:	tkits	Tech Inj:	Site:^FS\
    ^XZ";


    var copies = 1;
    var copiesArg;
    if (!copies){
        copiesArg = ""
    } else{
        copiesArg = ' -#'+ copies
    }
    var filename  = appDir + "/print/test.zpl";
    //console.log(req.params.zpl);
    res.send("received zpl: " + zpl);

    async.series([
        function(callback){
            fs.writeFile(filename, zpl, function(err) {
                if(err) {
                    callback(err);
                    return;
                }
                //console.log("The file was saved! to "+filename);
                callback();
            });
        },
        function(callback){
            CupsPrinterName = nconf.get('Print:PrinterName');
            //console.log(CupsPrinterName);
            var cmd = 'lpr -P ' + CupsPrinterName + copiesArg +' -o raw ' + filename;
            console.log(cmd);
            exec(cmd, function(error, stdout, stderr) {
                // command output is in stdout'
                //console.log(cmd);
                console.log(filename + " printed");
                callback();
            });

        },
        function(callback){
            fs.unlink(filename, function (err) {
                //console.log(filename + " deleted");

            });
            callback();
        }
    ]);



});



function GetIP(Callback){
    var address
        ,ifaces = os.networkInterfaces();
    for (var dev in ifaces) {

        // ... and find the one that matches the criteria
        var iface = ifaces[dev].filter(function(details) {
            return details.family === 'IPv4' && details.internal === false;
        });

        if(iface.length > 0) address = iface[0].address;
    }
    Callback(address);
}



function CreateOptionsJSON(Callback) {
    var Options = {};

    Options = {
        "DoseCalType":nconf.get('DoseCal:Type'),
        "DoseCalCommPortName":nconf.get('DoseCal:CommPortName'),
        "DoseCalCommPortBaud": nconf.get('DoseCal:CommPortBaud'),
        "DoseCalCommPortDataBits": nconf.get('DoseCal:CommPortDataBits'),
        "DoseCalCommPortStopBits": nconf.get('DoseCal:CommPortStopBits'),
        "DoseCalCommPortParity": nconf.get('DoseCal:CommPortParity'),
        "WellCounterEnabled": [
        ],
        "WellCounterCommPortName":nconf.get('WellCounter:CommPortName'),
        "WellCounterCommPortBaud": nconf.get('WellCounter:CommPortBaud'),
        "WellCounterCommPortDataBits": nconf.get('WellCounter:CommPortDataBits'),
        "WellCounterCommPortStopBits": nconf.get('WellCounter:CommPortStopBits'),
        "WellCounterCommPortParity": nconf.get('WellCounter:CommPortParity'),
        "DoseCalTypes":[
            {"text":"none","value":"none"},
            {"text":"Atomlab-100","value":"Atomlab-100"},
            {"text":"Atomlab-200","value":"Atomlab-200"},
            {"text":"Capintec-CRC25R","value":"Capintec-CRC25R"}
        ],
        "CommPorts": [
        ],
        "BaudRates":[
            {"text":75,"value":75},
            {"text":110,"value":110},
            {"text":300,"value":300},
            {"text":1200,"value":1200},
            {"text":4800,"value":4800},
            {"text":9600,"value":9600},
            {"text":19200,"value":19200},
            {"text":38400,"value":38400},
            {"text":57600,"value":57600},
            {"text":115200,"value":115200}

        ],
        "DataBits":[
            {"text":5,"value":5},
            {"text":6,"value":6},
            {"text":7,"value":7},
            {"text":8,"value":8}
        ],
        "StopBits":[
            {"text":1,"value":1},
            {"text":2,"value":2}
        ],
        "Parity":[
            {"text":'none',"value":'none'},
            {"text":'even',"value":'even'},
            {"text":'mark',"value":'mark'},
            {"text":'odd',"value":'odd'}
        ],
        "WebPort": nconf.get('WebPort'),
        "PrintServer": [
        ],
        "PrintPrinterName":nconf.get('Print:PrinterName'),
        "PrintServerFolder":nconf.get('Print:ServerFolder')
    };

    //Set up Well Counter Enabled Options

    if (nconf.get('WellCounter:Enabled')){
        Options.WellCounterEnabled.push({"text":true,"value":true,"selected": true});
        Options.WellCounterEnabled.push({"text":false,"value":false});
        //console.log("WellCounter option is" + nconf.get('WellCounter:Enabled') + " I reported: Is True")
    }
    else{
        Options.WellCounterEnabled.push({"text":true,"value":true});
        Options.WellCounterEnabled.push({"text":false,"value":false,"selected": true});
        //console.log("Files Says" + nconf.get('Print:Server') + " I reported: Is False")
    }

    //Set up Print Server Options
    if (nconf.get('Print:Server')){
        Options.PrintServer.push({"text":true,"value":true,"selected": true});
        Options.PrintServer.push({"text":false,"value":false});
        //console.log("PrintServer option is" + nconf.get('Print:Server') + " I reported: Is True")
    }
    else{
        Options.PrintServer.push({"text":true,"value":true});
        Options.PrintServer.push({"text":false,"value":false,"selected": true});
        //console.log("Files Says" + nconf.get('Print:Server') + " I reported: Is False")
    }


    //Set Up Serial Port Comm List Options
    serialport.list(function (err, ports) {
        if (err){
            //console.log("No Ports")
        }
        else{

            ports.forEach(function (port) {
                Options.CommPorts.push({"text":port.comName,"value":port.comName});



            });
        }
        Callback(Options);
    });
};



module.exports = router;




