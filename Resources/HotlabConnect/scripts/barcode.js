var keypress = require('keypress')
    , LastBarCode = ""
    , ScannedBarcode = "";

exports.StartBarcode = function () {
// make `process.stdin` begin emitting "keypress" events
    keypress(process.stdin);
// listen for the "keypress" event
    process.stdin.on('keypress', function (ch, key) {
        console.log('got "keypress"', ch); //original script

        ScannedBarcode = ScannedBarcode + ch;


        /*
         if (key.ctrl && key.name == 'c') {
         process.stdin.pause();
         }
         */
        if (key && key.name == 'enter') {

            //ScannedBarcode = ScannedBarcode; //Add +"/n" if CR is required
            console.log("Barcode:" + ScannedBarcode);
            LastBarCode = ScannedBarcode;
            //LastBarCode = 'E2134';
            ScannedBarcode = "";
        }
    });

//process.stdin.setRawMode(true); //Use this to output one letter at a time
    process.stdin.resume();
};
exports.getBarcode = function (callback) {
    var data = [];
    //LastBarCode = 'E2134';
        console.log("Barcode was retrieved. Barcode:" + ScannedBarcode);
        data.push({Barcode:LastBarCode});
        LastBarCode = "";
    callback(data);
};
