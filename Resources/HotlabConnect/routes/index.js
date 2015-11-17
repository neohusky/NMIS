var express = require('express')
    , router = express.Router()
    , serial = require('../scripts/serial.js')
    , barcode = require("../scripts/barcode.js")
    , config = require('../scripts/config.js')
    , printServer = require('../scripts/printServer.js')
    , nconf = require('nconf')
    , multer = require('multer');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads'); // Absolute path. Folder must exist, will not be created for you.
    },
    filename: function (req, file, cb) {
        //cb(null, file.originalname + '-' + Date.now());
        cb(null, file.originalname);
    }
});
var upload = multer({ storage: storage }).single("upl");



///Upload files
router.get('/labelupload', function(req, res, next) {
    res.render('upload');
});

router.post('/labelupload', upload,
    function (req, res, next) {
        //something do my scripts.
        console.log(req.body); //form fields
        console.log(req.file); //form files
        res.status(204).end();
    });

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
    res.render('printserver');
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


/*

router.post('/settings', function (req, res) {
    nconf.set('DoseCal:CommPortName', req.body.CommPortName);
    nconf.set('DoseCal:CommPortBaud', +req.body.CommPortBaud);
    nconf.set('WebPort', +req.body.WebPort);
    var val = ((req.body.PrintServer) === "true");
    nconf.set('Print:Server', val);
    nconf.set('Print:ServerFolder', req.body.PrintServerFolder);

    // If it's not showing up, just use req.body to see what is actually being passed.
    console.log("Settings Saved. " +req.body);
    //Save Settings to file
    config.saveConfig();
    //Go Back to settings
    res.render('settings');
});*/

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

/*// accept get request at /getPrinters
router.get('/getPrinters', function (req, res) {

    printServer.getPrinters(function (list) {
        res.json(list);
        console.log(list);

    });
});*/

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




