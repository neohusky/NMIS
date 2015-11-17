var config = {
    imagePath: "js/dhtmlx/imgs/",
    iconPath: "icons/"
}
var callbacks = {
	//Clear toolbars and forms
	clearDashboard: function() {

		appLayout.cells("a").detachObject(true);
		appLayout.cells("a").detachToolbar();

	},
    // Toolbar
    addClick: function(){
    	callbacks.showPopup();    	
    },
    removeClick: function(){
    	storage.removeUser(appGrid.getSelectedRowId());
    },
    editClick: function(userId){
    	// get user
    	var user = storage.getUser(userId);
    	// load user into popup
    	appForm.setFormData(user);
    	// show popup
    	callbacks.showPopup();
    },
/*    setToolbarItemStates: function(){
    	if(appGrid.getSelectedRowId()){
    		appToolbar.enableItem(3);
    	}else{
    		appToolbar.disableItem(3);
    	}
    },*/
    // Grid
    refreshGrid: function(){
    	appGrid.clearAll();
    	appGrid.parse(storage.getUserGrid(), "json");
    	//callbacks.setToolbarItemStates();
    },
    // Chart
    refreshChart: function(){
		appChart.clearAll();
		appChart.parse(storage.getUserBarChart(), "json");
    },
    // Popup
    showPopup: function(){
		appPopup.setModal(1);
		appPopup.show();
		appForm.setItemFocus("firstName");
    },
    hidePopup: function(){
		appPopup.setModal(0);
		appPopup.hide();
		appForm.clear();
    },
    // User Data
    dataChanged: function(){
		callbacks.refreshGrid();
		callbacks.refreshChart();
    }
}

// Layout
var appLayout;
dhtmlxEvent(window, "load", function(){
	appLayout = new dhtmlXLayoutObject(document.body, "3L");
	appLayout.cells("a").setText('Main');
	appLayout.cells("a").hideHeader();

	appLayout.cells("b").setText('Login');
	appLayout.cells("b").setWidth('300');
	appLayout.cells("b").fixSize(1,1);

	appLayout.cells("c").setText('Barcode');
	appLayout.cells("c").setHeight('300');
	appLayout.cells("c").setWidth('300');
});

// Toolbar

dhtmlxEvent(window, "load", function(){
	// create toolbar
	toolbar.main();
	toolbar.home();
});

// Grid
var appGrid;
dhtmlxEvent(window, "load", function(){
	// create grid
	appGrid = appLayout.cells("a").attachGrid();	
	appGrid.setHeader(["ID","First Name","MI","Last Name","DOB","Email","Active"]);
	appGrid.setColTypes("ro,ro,ro,ro,ro,ro,ro");
	appGrid.setInitWidths("35,*,35,*,75,*,55");
	appGrid.setColAlign("center,left,center,left,center,left,center");
	appGrid.setImagePath(config.imagePath);
	appGrid.init();
	
	// attach grid events
	appGrid.attachEvent("onRowDblClicked", function(rowId){
		callbacks.editClick(rowId);	
	});
	appGrid.attachEvent("onRowSelect", function(){
		callbacks.setToolbarItemStates();	
	});
	// reset grid and load it with data
	callbacks.refreshGrid();
});

// Popup
var appPopup;
dhtmlxEvent(window,"load",function(){
	// create popup
	var win = new dhtmlXWindows();
	//win.setImagePath(config.imagePath);
	appPopup = win.createWindow(1,null,null,400,300);
	appPopup.setText("User Add/Edit");
	appPopup.centerOnScreen();	
	// events
	appPopup.attachEvent("onClose", callbacks.hidePopup);
	// hide popup
	appPopup.hide();
});

// Form
var appForm;
dhtmlxEvent(window,"load", function(){
	// create form
	appForm = appPopup.attachForm([
		// Tab1
		{ type: "block", id:"tab1",
			list: [
				{ type:"fieldset", name:"data1", label:"Dicom Worklist", inputWidth:"auto",
					list:[
						{ type:"input", name:"DWL_ServerAET", label:"Server AET", labelWidth:"250", inputWidth:"250", labelLeft:"175", labelTop:"50", inputLeft:"175", inputTop:"121"},
						{ type:"input", name:"DWL_ServerIP", label:"Server IP Address", labelWidth:"250", inputWidth:"250", labelLeft:"175", labelTop:"50", inputLeft:"175", inputTop:"171"},
						{ type:"input", name:"DWL_ServerPort", label:"Server AET", labelWidth:"250", inputWidth:"250", labelLeft:"175", labelTop:"50", inputLeft:"175", inputTop:"71"},
						{ type:"input", name:"DWL_OwnAET", label:"NMIS AET", labelWidth:"250", inputWidth:"250", labelLeft:"175", labelTop:"50", inputLeft:"450", inputTop:"71"},
						{ type:"input", name:"DWL_OwnIP", label:"NMIS IP Address", labelWidth:"250", inputWidth:"250", labelLeft:"450", labelTop:"50", inputLeft:"450", inputTop:"121"}
					]
				}
			]},
		// Tab2
		{ type: "block", id:"tab2",
			list: [
				{ type:"fieldset", name:"data2", label:"DWL Query Parameters", inputWidth:"auto",
					list:[
						{ type:"input", name:"DWL_RefreshTime", label:"Auto Refresh Time (s)", labelWidth:"250", inputWidth:"250", labelLeft:"450", labelTop:"50", inputLeft:"450", inputTop:"196"},
						{ type:"input", name:"DWL_SearchModality", label:"Modality", labelWidth:"250", inputWidth:"250", labelLeft:"175", labelTop:"50", inputLeft:"175", inputTop:"296"}
					]
				}
			]},

		// Tab3
		{ type: "block", id:"tab3",
			list: [
				{ type:"fieldset", name:"data3", label:"Application", inputWidth:"auto"	, list:[
					{ type:"input", name:"App_TimeOut", label:"Application Timeout (s)", labelWidth:"250", inputWidth:"250", labelLeft:"450", labelTop:"50", inputLeft:"450", inputTop:"296"},
					{ type:"fieldset", name:"data3", label:"HotlabConnect", inputWidth:"auto"	, list:[
						{ type:"input", name:"App_HotlabConnectServer", label:"Hotlab Connect Server", labelWidth:"250", inputWidth:"250", labelLeft:"250", labelTop:"50", inputLeft:"175", inputTop:"296"},
						{ type:"input", name:"App_HotlabConnectPort", label:"Hotlab Connect Port", labelWidth:"250", inputWidth:"250", labelLeft:"250", labelTop:"50", inputLeft:"175", inputTop:"296"},
						{ type: "block",width: 300,
							list: [
								{type: "button", value: "reboot", name: "Reboot"},
								{type: "newcolumn"},
								{type: "button", value: "config", name: "Config"}
							]
						}
					]}
				]}
			]

		},
		// buttons
		{ type: "block", id:"buttons", width: 300,
			list: [
				{type: "button", value: "Save", name: "save"},
				{type: "newcolumn"},
				{type: "button", value: "Cancel", name: "cancel"}
			]
		}
	]);
	
	// calendar tweaks
	var dobCal = appForm.getCalendar("dob");
	dobCal.attachEvent("onChange", function(date){
		appForm.setItemValue("dob", date);	
	});
	
	// enable validation
	appForm.enableLiveValidation(true);
	
	// set event
	appForm.attachEvent("onButtonClick", function(btnName){
		// save or cancel
		if(btnName == "cancel"){
			callbacks.hidePopup();
		}else if(appForm.validate()){
			var formData = appForm.getFormData();
			if(formData.id){
				storage.updateUser(formData);
			}else{
				storage.createUser(formData);
			}
			callbacks.hidePopup();
		}
	});
});

// Chart
var appChart;
dhtmlxEvent(window,"load",function(){
	appChart = appLayout.cells("b").attachChart({
		view: "bar",
		value: "#age#",
		label: "#age#",
		gradient: "rising",
		tooltip: {
			template: "#age#"
		},
		xAxis: {
			title: "Users",
			template: "#name#",
			lines: false
		},
		yAxis: {
			title: "Years of Age",
			lines: true
		},
		padding: {
			left: 25,
			right: 10,
			top: 45
		}
	});
	// reset chart data
	callbacks.refreshChart();
});
