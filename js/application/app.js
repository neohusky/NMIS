var config = {
    imagePath: "js/dhtmlx/imgs/",
    iconPath: "icons/",
	HotlabConnectServer: "",
	HotlabConnectPort: "",
	UserName: "theok",
	TimeOut:""
};
var callbacks = {

	GetAppSettings : function(){

	dhx.ajax().get("data/appSettings.php?id=1", function(text,xml){
		var AppSettings = dhx.DataDriver.json.toObject(text,xml);

		config.TimeOut = AppSettings.AppSettings["0"].App_TimeOut;
		config.HotlabConnectServer =AppSettings.AppSettings["0"].App_HotlabConnectServer;
		config.HotlabConnectPort =AppSettings.AppSettings["0"].App_HotlabConnectPort;



	});

},
	getDateTime : function() {
		var now     = new Date();
		var year    = now.getFullYear();
		var month   = now.getMonth()+1;
		var day     = now.getDate();
		var hour    = now.getHours();
		var minute  = now.getMinutes();
		var second  = now.getSeconds();
		if(month.toString().length == 1) {
			var month = '0'+month;
		}
		if(day.toString().length == 1) {
			var day = '0'+day;
		}
		if(hour.toString().length == 1) {
			var hour = '0'+hour;
		}
		if(minute.toString().length == 1) {
			var minute = '0'+minute;
		}
		if(second.toString().length == 1) {
			var second = '0'+second;
		}
		var dateTime = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;
		return dateTime;
	},

	GetHotlabData : function(param){
		url = "http://" + config.HotlabConnectServer + ":" + config.HotlabConnectPort + "/"+param;

		dhx.ajax().get(url, function(text,xml){

			var obj = dhx.DataDriver.json.toObject(text,xml);

			CalIsotope = obj["CalIsotope"];
			CalActivity = obj["CalActivity"];
			CalUnits = obj["CalUnits"];

			BarcodeData = obj["BarcodeData"];
			HotlabConnectStatus = obj["Status"];

		});
		if  (CalIsotope === undefined || CalIsotope === null) {
			CalIsotope = "";
			CalActivity= "";
			CalUnits="";
		}
		if  (BarcodeData === undefined || BarcodeData === null) {
			BarcodeData = ""
		}
		dhtmlx.message({
			text: "url set to Hotlab COnnect:<br />" + url,
			expire: -1, //milliseconds. You can use negative value (-1) to make notice persistent.
			type: "myNotice" // 'customCss' - css class
		});

	},

	openHotlabConnectConfig: function(){
		var dhxWins, w1,url;
		dhxWins = new dhtmlXWindows();
		url = "http://" + config.HotlabConnectServer +":"+ config.HotlabConnectPort;

		w1 = dhxWins.createWindow("w1",20,50,1120,600);
		w1.setText(url);
		w1.button("minmax").hide();
		w1.button("park").hide();
		w1.button("close").enable();
		w1.attachURL(url);
	},

	//Clear toolbars and forms
	clearDashboard: function() {

		appLayout.cells("a").detachObject(true);
		appLayout.cells("a").detachToolbar();

	},

  setToolbarItemStates: function(){
    	if(appGrid.getSelectedRowId()){
			appSubToolbar.enableItem("btnEdit");
			appSubToolbar.enableItem("sep04");
			appSubToolbar.enableItem("btnReprint");
			appSubToolbar.enableItem("sep05");
    	}else{
			appSubToolbar.disableItem("btnEdit");
			appSubToolbar.disableItem("sep04");
			appSubToolbar.disableItem("btnReprint");
			appSubToolbar.disableItem("sep05");
    	}
    }
};

// Layout
var appLayout;
dhtmlxEvent(window, "load", function(){
	appLayout = new dhtmlXLayoutObject(document.body, "3L");
	//appLayout.cells("a").setText('<h2 style="color:blue;text-align:center;vertical-align: top">This is a heading.</h2>');

	appLayout.cells("b").setText('Notifications');
	appLayout.cells("b").setWidth('300');
	appLayout.cells("b").fixSize(1,1);

	appLayout.cells("c").setText('Barcode');
	appLayout.cells("c").setHeight('300');
	appLayout.cells("c").setWidth('300');
	view.timeDisplay()

});

// Toolbar

dhtmlxEvent(window, "load", function(){
	// create toolbar
	var appToolbar;
	var appSubToolbar;
	toolbar.main();
	//toolbar.home();
});
// Settings
var settingsTabbar;
// App Grid
var appGrid;

// App Forms
var generatorForm;

//Retrieve Settings
callbacks.GetAppSettings();



//////////////////////////////
var tday=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
var tmonth=new Array("January","February","March","April","May","June","July","August","September","October","November","December");

function GetClock(){
	var d=new Date();
	var nday=d.getDay(),nmonth=d.getMonth(),ndate=d.getDate();
	var nhour=d.getHours(),nmin=d.getMinutes(),ap;
	if(nhour==0){ap=" AM";nhour=12;}
	else if(nhour<12){ap=" AM";}
	else if(nhour==12){ap=" PM";}
	else if(nhour>12){ap=" PM";nhour-=12;}

	if(nmin<=9) nmin="0"+nmin;

	document.getElementById('clockbox').innerHTML=""+tday[nday]+", "+tmonth[nmonth]+" "+ndate+" <br> <br> "+nhour+":"+nmin+ap+"";

}

window.onload=function(){
	GetClock();
	setInterval(GetClock,1000);
};

