/**
 * Created by nucmed on 17/11/2015.
 */
var logic = {


    getBarcode: function () {
        url = "http://" + config.HotlabConnectServer + ":" + config.HotlabConnectPort + "/getBarcode";
        //retrieve barcode data from hotlab connect if barcopde string is empty
        if (config.Barcode==="") {
            dhx.ajax().get(url, function (text, xml) {
                var obj = dhx.DataDriver.json.toObject(text, xml);
                config.Barcode = obj["0"].Barcode;
                //If there is no data the reformat undefined/null to "" string
                if (config.Barcode === undefined || config.Barcode === null) {
                    config.Barcode = "";
                    console.log("Funny data received and therefore reset config string to empty");
                }
            });
            console.log("Barcode data received and string updated to:"+config.Barcode);
        }
    },
    getAppSettings: function(){

        dhx.ajax().get("data/appSettings.php", function(text,xml){
            var AppSettings = dhx.DataDriver.json.toObject(text,xml);

            config.TimeOut = AppSettings.AppSettings["0"].App_TimeOut;
            config.HotlabConnectServer =AppSettings.AppSettings["0"].App_HotlabConnectServer;
            config.HotlabConnectPort =AppSettings.AppSettings["0"].App_HotlabConnectPort;

        });

    },
    getUrlVars: function () {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
            function(m,key,value) {
                vars[key] = value;
            });
        return vars;
    },

    getUserDetails: function() {

        dhx.ajax().get("data/userDetails.php?id=" + config.UserName, function (text, xml) {
            var UserDetails = dhx.DataDriver.json.toObject(text, xml);

            config.StaffName = UserDetails.UserDetails["0"].Staffname;
            config.StaffPosition = UserDetails.UserDetails["0"].Position;

            //msgbox(Position);

        })
    }

};