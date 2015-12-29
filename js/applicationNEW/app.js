var config = {
    imagePath: "js/dhtmlx/imgs/",
    iconPath: "icons/",
	HotlabConnectServer: "",
	HotlabConnectPort: "",
	UserName: "theok",
	TimeOut:"",
	BarcodeIncomming:"",
	BarcodeScanned:"",
	StaffName:"Theo Kitsos",
	StaffPosition:""


};
var callbacks = {

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
			text: "url set to Hotlab Connect:<br />" + url,
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
			appToolbar.enableItem("btnEdit");
			appToolbar.enableItem("sep04");
			appToolbar.enableItem("btnReprint");
			appToolbar.enableItem("sep05");
		}else{
			appToolbar.disableItem("btnEdit");
			appToolbar.disableItem("sep04");
			appToolbar.disableItem("btnReprint");
			appToolbar.disableItem("sep05");
		}
	}


};

// Layout
var appLayout;
var appToolbar;
var appSubToolbar;
var settingsTabbar;
var appGrid;
var appForm;
var generatorForm;
var statusBar;
var homeLayout;
var mainSidebar;

dhtmlxEvent(window, "load", function(){


	//Setup main window Layout
	appLayout = new dhtmlXLayoutObject({
		parent: document.body,    // id or object for parent container
		pattern: "1C",             // layout's pattern
		skin: "dhx_web",     // optional, layout's skin
		offsets: {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0
		},
		cells: [    // optional, cells configuration according to the pattern
			// you can specify only the cells you want to configure
			// all params are optional
			{
				id:             "a",        // id of the cell you want to configure
				text:           "Main",     // header text
				//collapsed_text: "",   // header text for a collapsed cell
				header:         false     // hide header on init
				//width:          500,        // cell init width
				//height:         300,        // cell init height
				//collapse:       false,        // collapse on init
				//fix_size:       [1,1] // fix cell's size, [width,height]
			}
		]
	});


	statusBar = appLayout.attachStatusBar();

	statusBar.setText("<div><span id='status_txt' style='max-width: 300px; position:relative;left:0;top:0'> Welcome "+config.StaffName+"</span><span id='date_txt' style='font:12pt Arial; color:#2c85d5;float:right; max-width: 400px; position:relative;top:0;'>date</span></div>");

	sidebar.main();


	//Retrieve Application Settings
	logic.getAppSettings();

	//Retrieve User Details
	logic.getUserDetails();

	//Retrive Barcode every 5s
	setInterval(logic.getBarcode,5000);

	//Setup Clock and timer
	//GetClock();
	setInterval(view.timeDisplay,1000);
});
