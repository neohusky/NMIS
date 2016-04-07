/**
 * Created by theokitsos on 30/09/15.
 */
serialport = require('serialport');
var calibrator = require('./calibrator');
var serialData
    ,StatusString;
var nconf = require('nconf');
var myPort;




exports.StartSerialComms = function (){
//serialData ='~1 Tc-99m 35.1 1.293 GBq';
//LastBarCode ='E2841 /n';
/////////////////Set up Serial Port Functions
SerialPort = serialport.SerialPort;    // make a local instance of it
    myPort = new SerialPort(nconf.get('DoseCal:CommPortName'), {
    baudRate: nconf.get('DoseCal:CommPortBaud'),
    //dataBits: nconf.get('DoseCal:CommPortDataBits'),
    //stopBits:nconf.get('DoseCal:CommPortStopBits'),
    //parity: nconf.get('DoseCal:CommPortParity'),
    // look for return and newline at the end of each data packet:
    parser: serialport.parsers.readline('\n')
});

// these are the definitions for the serial events:
myPort.on('open', showPortOpen);
myPort.on('data', saveLatestData);
myPort.on('close', showPortClose);
myPort.on('error', showError);
};

// these are the functions called when the serial events occur:
function showPortOpen() {
    console.log('port open. Data rate: ' + myPort.options.baudRate);
}

function saveLatestData(data) {
    //console.log("Serial Data:"+data);
    serialData = data;
    StatusString = "OK";
}

function showPortClose() {
    console.log('port closed.');
    StatusString = "Comm Closed";
}

function showError(error) {
    console.log('Serial port error: ' + error);
    StatusString = "Comm Error";
}
///////////////////////////////////////////////

exports.calTest = function () {
    myPort.write("A\n C\n E\n G\n I\n J\n I\n G\n E\n C\n A\n");
};

exports.resetComm = function () {
    myPort.close();
    myPort.open();
};
exports.openComm = function (){
//serialData ='~1 Tc-99m 35.1 1.293 GBq';
//LastBarCode ='E2841 /n';
/////////////////Set up Serial Port Functions
    SerialPort = serialport.SerialPort;    // make a local instance of it
    myPort = new SerialPort(nconf.get('DoseCal:CommPortName'), {
        baudRate: nconf.get('DoseCal:CommPortBaud'),
        //dataBits: nconf.get('DoseCal:CommPortDataBits'),
        //stopBits:nconf.get('DoseCal:CommPortStopBits'),
        //parity: nconf.get('DoseCal:CommPortParity'),
        // look for return and newline at the end of each data packet:
        parser: serialport.parsers.readline('\n')
    });

// these are the definitions for the serial events:
    myPort.on('open', showPortOpen);
    myPort.on('data', saveLatestData);
    myPort.on('close', showPortClose);
    myPort.on('error', showError);
};
exports.stopComm = function () {
    myPort.close();
};

exports.getCommPorts = function (callback) {
    var PortList = {
        options: []
    };

    var i = 0;
    serialport.list(function (err, ports) {
        ports.forEach(function(port) {
            i=i+1;
            //console.log(i);
            PortList.options.push({value: i+'', text: port.comName});
            //console.log(PortList);

        });
        callback(PortList);
    });

};



exports.AvailablePorts = function (callback) {
    var PortList = [];


    serialport.list(function (err, ports) {
        if (err){
            console.log("No Ports")
        }
        else{

            ports.forEach(function (port) {

                //console.log(i);
                PortList.push(port.comName);
                //console.log(PortList);

            });
        }
        callback(PortList);
    });

};

exports.getCalStatus = function (callback) {
    var data = [];

    if (nconf.get('DoseCal:Type')=='none'){
        data.push({Status:'NoCalibrator'});
    }
    else{
        if(!serialData){
            data.push({Status:'No Comm'});

        } else {
            data.push({Status:'OK'});
        }
    }

    callback(data);
};
exports.getCalReading = function (callback) {
    var data = [];
    //serialData ='~1 Tc-99m 35.1 1.293 GBq';

    if (nconf.get('DoseCal:Type')=='none'){
        data.push({Status:'NoCalibrator'});
    }
    else{
        if(!serialData){
            data.push({Status:'No Comm'});

        } else {
            //data.push({Status:'OK'});
            data.push({Isotope:calibrator.IsotopeA100(serialData)});
            data.push({Activity:calibrator.ActivityA100(serialData)});
            data.push({Units:calibrator.UnitsA100(serialData)});
        }
    }





    console.log ("Received data: " + serialData   + "Converted data: " + + JSON.stringify(data));
    callback(data);
};

exports.sendCommand = function (r) {
    console.log(r);
    myPort.write(r+"\n");
};
exports.calIsotope = function (r) {
    //var isotope = req.params.isotope;

    switch(r)
    {
        case "Tc-99m":
            console.log("A");
            myPort.write("A\n");
            break;
        case "Mo-99":
            console.log("B");
            myPort.write("B\n");
            break;
        case "Tl-201":
            console.log("C");
            myPort.write("C\n");
            break;
        case "I-123":
            console.log("D");
            myPort.write("D\n");
            break;
        case "Xe-133":
            console.log("E");
            myPort.write("E\n");
            break;
        case "Ga-67":
            console.log("F");
            myPort.write("F\n");
            break;
        case "In-111":
            console.log("G");
            myPort.write("G\n");
            break;
        case "I-131":
            console.log("H");
            myPort.write("H\n");
            break;
        case "Cs-137":
            console.log("I");
            myPort.write("I\n");
            break;
        case "Co-57":
            console.log("J");
            myPort.write("J\n");
            break;
        case "#2":
            console.log("K");
            myPort.write("K\n");
            break;
        case "#1":
            console.log("L");
            myPort.write("L\n");
            break;
        case "OTHER":
            console.log("M");
            myPort.write("M\n");
            break;
        case "BKGND":
            console.log("P");
            myPort.write("P\n");
            break;
        case "TEST":
            console.log("D");
            myPort.write("D\n");
            break;
        default:
            console.log("Not recognised Isotope");
    }
};
///////////////////////////////////////////////
exports.serialData;