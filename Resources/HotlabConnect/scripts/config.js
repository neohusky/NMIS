/**
 * Created by theokitsos on 29/09/15.
 */

var nconf = require('nconf')
    ,path = require('path');

exports.loadConfig = function () {
    DefaultSave = 0;
    //load the config
    nconf.use('file', { file: (path.dirname(require.main.filename) +'/config.json') });
    nconf.load();


/////////////////////Calibrator Serial Port Params//////////////////////////////////////////
// set Calibrator Type to default if none in config file
    if (!nconf.get('DoseCal:Type')) {
        console.log("No Config data detected");
        DefaultSave = 1;
        nconf.set('DoseCal:Type', "none");
    }
    else {
        console.log("Configuration loaded from file");
    }
    console.log ("The DoseCal Type is set to " + nconf.get('DoseCal:Type'));
//set com port name to default if none in config file
    if (!nconf.get('DoseCal:CommPortName')) {
        nconf.set('DoseCal:CommPortName', "/dev/ttyUSB0");
    }
    console.log ("The DoseCal ComPort is set to " + nconf.get('DoseCal:CommPortName'));

///Serial Port Baud Params
//set com baud rate to default if none in config file
    if (!nconf.get('DoseCal:CommPortBaud')) {
        nconf.set('DoseCal:CommPortBaud', 4800);
    }
    console.log ("The DoseCal ComPort Baud is set to " + nconf.get('DoseCal:CommPortBaud'));

///Serial Port DataBits Params
//set com baud rate to default if none in config file
    if (!nconf.get('DoseCal:CommPortDataBits')) {
        nconf.set('DoseCal:CommPortDataBits', 8);
    }
    console.log ("The DoseCal ComPort DataBits is set to " + nconf.get('DoseCal:CommPortDataBits'));

///Serial Port StopBits Params
//set com baud rate to default if none in config file
    if (!nconf.get('DoseCal:CommPortStopBits')) {
        nconf.set('DoseCal:CommPortStopBits', 1);
    }
    console.log ("The DoseCal ComPort StopBits is set to " + nconf.get('DoseCal:CommPortStopBits'));

///Serial Port parity Params
//set com baud rate to default if none in config file
    if (!nconf.get('DoseCal:CommPortParity')) {
        nconf.set('DoseCal:CommPortParity', "none");
    }
    console.log ("The DoseCal ComPort parity is set to " + nconf.get('DoseCal:CommPortParity'));

/////////////////////////////////////////////////////////////////////////////////////////////////////////
///WellCounter Serial Port Params
// set WellCounter enabled to default if none in config file
    if (!nconf.get('WellCounter:Enabled')) {
        nconf.set('WellCounter:Enabled', false);
    }
    console.log ("The Well Counter Enabled is set to " + nconf.get('WellCounter:Enabled'));

//set WellCounter com port name to default if none in config file
    if (!nconf.get('WellCounter:CommPortName')) {
        nconf.set('WellCounter:CommPortName', "/dev/ttyUSB0");
    }
    console.log ("The WellCounter ComPort is set to " + nconf.get('WellCounter:CommPortName'));

///Serial Port Baud Params
//set com baud rate to default if none in config file
    if (!nconf.get('WellCounter:CommPortBaud')) {
        nconf.set('WellCounter:CommPortBaud', 4800);
    }
    console.log ("The WellCounter ComPort Baud is set to " + nconf.get('WellCounter:CommPortBaud'));

///Serial Port DataBits Params
//set com baud rate to default if none in config file
    if (!nconf.get('WellCounter:CommPortDataBits')) {
        nconf.set('WellCounter:CommPortDataBits', 8);
    }
    console.log ("The WellCounter ComPort DataBits is set to " + nconf.get('WellCounter:CommPortDataBits'));

///Serial Port StopBits Params
//set com baud rate to default if none in config file
    if (!nconf.get('WellCounter:CommPortStopBits')) {
        nconf.set('WellCounter:CommPortStopBits', 1);
    }
    console.log ("The WellCounter ComPort StopBits is set to " + nconf.get('WellCounter:CommPortStopBits'));

///Serial Port parity Params
//set com baud rate to default if none in config file
    if (!nconf.get('WellCounter:CommPortParity')) {
        nconf.set('WellCounter:CommPortParity', "none");
    }
    console.log ("The WellCounter ComPort parity is set to " + nconf.get('WellCounter:CommPortParity'));



///Web Port Params
//set web port  to default if none in config file
    if (!nconf.get('WebPort')) {
        nconf.set('WebPort', 8080);
    }
    console.log ("The Web Port is set to " + nconf.get('WebPort'));

///Print Params
//set Print Server enabled to default if none in config file
    if (!nconf.get('Print:Server')) {
        nconf.set('Print:Server', false);
    }
    console.log ("The Print Server is set to " + nconf.get('Print:Server'));

///set Label Printer Name to default if none in config file
    if (!nconf.get('Print:PrinterName')) {
        nconf.set('Print:PrinterName', "Zebra");
    }
    console.log ("The Printer Name is set to " + nconf.get('Print:PrinterName'));

//set Print Server Folder to default if none in config file
    if (!nconf.get('Print:ServerFolder')) {
        nconf.set('Print:ServerFolder', "print");
    }
    console.log ("The Print Server Folder is set to " + nconf.get('Print:ServerFolder'));

    if (DefaultSave == 1) {
        console.log("Configuration file created.");
        exports.saveConfig();
    }

} ;

exports.saveConfig = function () {
///////////////////
//Save Configuration
    nconf.save(function (err) {
        if (err) {
            console.error(err.message);
            return;
        }
        console.log('Configuration saved successfully.');
    });
};






//exports.CommPortName = CommPortName;
//exports.CommPortBaud = CommPortBaud;
//exports.WebPort = WebPort;

