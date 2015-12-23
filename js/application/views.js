/**
 * Created by nucmed on 17/11/2015.
 */
var combo;

var view = {
    settings: function () {
        var settingsForm;

        var items = [


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
                                    {type: "button", value: "Reboot", name: "reboot"},
                                    {type: "newcolumn"},
                                    {type: "button", value: "Config", name: "config"}
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
        ];
        callbacks.clearDashboard();
        settingsTabbar = appLayout.cells("a").attachTabbar({
            tabs: [
                {id: "a1", label: "Tab 1", active: true},
                {id: "a2", label: "Tab 2"},
                {id: "a3", label: "Tab 3"}
            ]
        });

        settingsForm = settingsTabbar.cells("a1").attachForm();
        settingsForm.setFontSize("20px");
        settingsForm.loadStruct(items, function(){
            settingsTabbar.cells("a2").attachObject("tab2");
            settingsTabbar.cells("a3").attachObject("tab3");
        });

        settingsForm.load("data/formSettings.php?id=1");
        // enable validation
        settingsForm.enableLiveValidation(true);


        // set event
        settingsForm.attachEvent("onButtonClick", function(btnName) {
            // save or cancel
            if (btnName == "cancel") {
                callbacks.clearDashboard();
            } else if (btnName == "reboot") {
                callbacks.GetHotlabData("reboot");
            } else if (btnName == "config") {
                callbacks.openHotlabConnectConfig();
            } else if (settingsForm.validate()) {
                settingsForm.save();
                callbacks.clearDashboard();
            }
        });
        // set Data Processor
        var dp = new dataProcessor("data/FormSettings.php");
        dp.init(settingsForm);


    },
    generatorEntry: function (id) {

            var items = [
                {type: "settings", position:"label-left", labelWidth:"250", inputWidth:"250" },
                { type: "fieldset", name: "data", label: "Generator Entry", inputWidth: "auto",
                    list: [

                        {type: "input", name: "id", label: "id", tooltip: "id", required: "false", hidden: "true"},
                        {
                            type: "input",
                            name: "BatchNo",
                            label: "Batch No",
                            tooltip: "Supplier Batch Number",
                            required: "true",
                            validate: "NotEmpty",
                            hidden: "false"
                        },
                        {
                            type: "combo",
                            name: "Supplier",
                            label: "Supplier",
                            value: "",
                            tooltip: "Supplier Name",
                            required: "true",
                            validate: "NotEmpty",
                            filtering: "true",
                            connector: "data/lstSuppliers.php"
                        },
                        {
                            type: "calendar",
                            name: "ArrivalDate",
                            label: "ArrivalDate",
                            value: "",
                            dateFormat: "%Y-%m-%d %H:%i:%s",
                            enableTime: "true",
                            calendarPosition: "right",
                            tooltip: "Arrival Date",
                            required: "true",
                            validate: "NotEmpty",
                            hidden: "false"
                        },
                        {
                            type: "input",
                            name: "Username",
                            label: "StaffID",
                            tooltip: "Username",
                            required: "true",
                            validate: "NotEmpty",
                            hidden: "false"
                        }
                    ]
                },


                // buttons
                {
                    type: "block", id: "buttons", width: 300,
                    list: [
                        {type: "button", value: "Save", name: "save"},
                        {type: "newcolumn"},
                        {type: "button", value: "Cancel", name: "cancel"}
                    ]
                }
            ];
            //callbacks.clearDashboard();

            generatorForm = appLayout.cells("a").attachForm();
            generatorForm.setFontSize("20px");
            generatorForm.loadStruct(items,function() {
                //mainForm.setItemFocus("BatchNo");
                generatorForm.setItemValue("ArrivalDate",callbacks.getDateTime());
                generatorForm.setItemValue("Username",config.UserName);
                combo = generatorForm.getCombo("Supplier");
            });
            if ( id >= 0){
                generatorForm.load("data/formGenerators.php?id="+id);
            }
            // enable validation
            generatorForm.enableLiveValidation(true);


            // set event
            // save or cancel
            generatorForm.attachEvent("onButtonClick", function (btnName) {
                // save or cancel
                if (btnName == "cancel") {
                    callbacks.clearDashboard();
                } else if (generatorForm.validate()) {
                    generatorForm.save();


                }
            });
            // set Data Processor
            var dp = new dataProcessor("data/formGenerators.php");
            dp.init(generatorForm);
            dp.attachEvent("onAfterUpdate", function(id, action, tid, response){
            if (action == "inserted") {
                console.log(tid);
                logic.printLabel("generator",tid,1);
                callbacks.clearDashboard();
                }
            //if updating a generator then this
            if (action == "updated") {
                //console.log(tid);
                //Print label of updated generator
                logic.printLabel("generator",tid,1);
                callbacks.clearDashboard();
            }
            });
    },
    generatorGrid : function() {
        varTitle =
        appLayout.cells("a").attachToolbar();
        appGrid = appLayout.cells("a").attachGrid();
        appGrid.setImagePath(config.imagePath);
        appGrid.setHeader("id, BatchNo, Supplier, ArrivalDate, button");
        appGrid.setColTypes("ro,ro,ro,ro,button");
        appGrid.setColSorting('str,str,str,str,str');
        appGrid.setInitWidths('50,100,150,120,100');
        appGrid.load("data/gridGenerators.php");
        appGrid.init();

        appGrid.attachEvent("onRowDblClicked", function(rowId){
            console.log(rowId);
            view.generatorEntry(parseInt(rowId));
        });
        appGrid.attachEvent("onRowSelect", function(rowId){
            callbacks.setToolbarItemStates();
        });


    },
    admin : function() {
        /*        var risCodesLayout = appLayout.cells("a").attachLayout({
         //parent:     "layoutObj",    // id/object, parent container where layout will be located
         pattern:    "1C",           // string, layout's pattern
         //skin:       "dhx_web",  // string, optional,"dhx_skyblue","dhx_web","dhx_terrace"

         offsets: {          // optional, offsets for fullscreen init
         top:    0,     // you can specify all four sides
         right:  0,     // or only the side where you want to have an offset
         bottom: 0,
         left:   5
         },

         cells: [    // optional, cells configuration according to the pattern
         // you can specify only the cells you want to configure
         // all params are optional
         {
         id:             "a",        // id of the cell you want to configure
         text:           "Body",     // header text
         collapsed_text: "Body2 colapsed",   // header text for a collapsed cell
         header:         false,      // hide header on init
         //width:          500,        // cell init width
         //height:         90,        // cell init height
         collapse:       false,        // collapse on init
         fix_size:       [null,null] // fix cell's size, [width,height]
         }
         ]
         });*/
        var adminSideBar = appLayout.cells("a").attachSidebar({
            //parent:         "sidebarObj",   // id/object, container for sidebar
            //skin:           "dhx_skyblue",  // string, sidebar skin, optional
            template: "text",      // string, used template, "details" by default
            //icons_path:     config.iconPath,       // string, path to the folder with icons
            single_cell: false,           // boolean, true to enable the single cell mode
            //bubble:         6,              // number, colored marker showing notifications count
            width: 160,            // number, width of the left part
            header: false,           // boolean, true to enable the header
            autohide: false,          // boolean, true to enable autohide for navigation bar
            //xml:            "sidebar.xml",  // string, path to xml config, optional
            //json:           "sidebar.json", // string, path to json config, optional
            //onload:         function(){},   // function, callback for xml/json, optional
            items: [
                // items config
                {
                    id: "a",       // item id
                    text: "RIS codes",     // item text
                    //icon:       "",   // icon used for the item
                    selected: false        // boolean, true to select an item
                },
                {
                    id: "b",       // item id
                    text: "Staff",     // item text
                    //icon:       "",   // icon used for the item
                    selected: false        // boolean, true to select an item
                },
                // separator config
                {
                    id: "sep1",     // separator id
                    type: "separator" // item type, mandatory
                }

            ]
        });

        appLayout.cells("a").hideHeader();
        var risCodesToolbar = adminSideBar.cells("a").attachToolbar();

        var items = [
            {type: "button", id: "btnAddNew", text: "Add", img: "", imgdis: "", title: "Add"},
            {type: "button", id: "btnAllToday", text: "Delete", img: "", title: "Delete"}
        ];
        risCodesToolbar.loadStruct(items);

        risCodesToolbar.attachEvent("onClick", function (id) {
            switch (id) {
                case "btnWorklist":
                    view.patientWorklist();
                    break;
                case "btnAllToday":
                    dhtmlx.alert("All Today");
                    break;
                default:
                    break;
            }
        });

        var risCodeGrid = adminSideBar.cells("a").attachGrid();
        risCodeGrid.setStyle("", "font-size:20px","", "");
        risCodeGrid.setImagePath(config.imagePath);
        risCodeGrid.setHeader("id, RIScode, Show in Worklist");
        risCodeGrid.setColTypes("ro,ed,ch");
        risCodeGrid.setColSorting('str,str,str');
        risCodeGrid.setInitWidths('30,400,170');
        risCodeGrid.load("data/gridRISCodes.php");
        risCodeGrid.init();

        risCodeGrid.attachEvent("onRowDblClicked", function (rowId) {
            console.log(rowId);
            view.generatorEntry(parseInt(rowId));
        });
        risCodeGrid.attachEvent("onRowSelect", function (rowId) {
            callbacks.setToolbarItemStates();
        });
    },


    patientWorklist : function(){
        appGrid =  appLayout.cells("a").attachGrid();
        appGrid.setStyle("", "font-size:20px","", "");

        appGrid.setHeader("Name, Patient ID, DOB, Sex, Procedure");
        appGrid.setColTypes("ro,ro,ro,ro,ro");
        appGrid.setColSorting('str,str,str,str,str');
        appGrid.setInitWidths('250,150,150,50,250');
        //hla.grid.load("data/dwl.php");
        appGrid.load("data/gridWorklist.php");
        appGrid.init();

        appGrid.attachEvent("onRowSelect", function(id,ind){
            msgbox(("Rows with id: "+id+" was selected by user. Index was: "+ind));
    });
    },
    dashboardV1 : function(){
        var dashLayout = appLayout.cells("a").attachLayout({
            parent:     "layoutObj",    // id/object, parent container where layout will be located
            pattern:    "3U",           // string, layout's pattern
            //skin:       "dhx_web",  // string, optional,"dhx_skyblue","dhx_web","dhx_terrace"

            offsets: {          // optional, offsets for fullscreen init
                top:    10,     // you can specify all four sides
                right:  10,     // or only the side where you want to have an offset
                bottom: 10,
                left:   10
            },

            cells: [    // optional, cells configuration according to the pattern
                // you can specify only the cells you want to configure
                // all params are optional
                {
                    id:             "a",        // id of the cell you want to configure
                    text:           "Graphs",     // header text
                    collapsed_text: "Text 2",   // header text for a collapsed cell
                    header:         false,      // hide header on init
                    width:          500,        // cell init width
                    height:         400,        // cell init height
                    collapse:       false,        // collapse on init
                    fix_size:       [null,null] // fix cell's size, [width,height]
                },
                {
                    id: "b",        // id of the cell you want to configure
                    text: "Graphs",     // header text
                    collapsed_text: "Text 2",   // header text for a collapsed cell
                    header: false,      // hide header on init
                    width: 500,        // cell init width
                    height: 400,        // cell init height
                    collapse: false,        // collapse on init
                    fix_size: [null, null] // fix cell's size, [width,height]} // other cell if any
                },
                {
                    id: "c",        // id of the cell you want to configure
                    text: "Graphs",     // header text
                    collapsed_text: "Text 2",   // header text for a collapsed cell
                    header: false,      // hide header on init
                    width: 1000,        // cell init width
                    height: 300,        // cell init height
                    collapse: false,        // collapse on init
                    fix_size: [null, null] // fix cell's size, [width,height]} // other cell if any
                }



        ]

        });
        var chartAccordian = dashLayout.cells("a").attachAccordion({
            icons_path: "../common/icons/",
            items: [
                { id: "a1", text: "Eluates", icon: "flag_red.png" },
                { id: "a2", text: "Kits", icon: "flag_green.png" }
            ]
        });


        var chartKit;
        chartKit = chartAccordian.cells("a2").attachChart({

            view:"stackedBar",
            container:"chart1",
            value:"#percentRemaining#",
            label:"#RemainingActivity#"+" MBq",
            color :function(obj){
                    if (obj.percentRemaining < 10) return "#B067AA";
                    return "#949aff";},
            gradient:"",
            width:100,
            tooltip:{
                template:"#percentRemaining#"
            },
            xAxis:{
                title:"Kit",
                template:"#Abbreviation#"
            },
            yAxis:{
                title:"Amount Remaining (%)"}


        });
        chartKit.addSeries({
            value:"#percentUsed#",
            label:"",
            color:"#bebdff",
            tooltip:{
                template:"#percentUsed#"
            }
        });
        chartKit.load("data/chartKits.php");

        var chartEluate;
        chartEluate = chartAccordian.cells("a1").attachChart({

            view:"stackedBar",
            container:"chart1",
            value:"#percentRemaining#",
            label:"#RemainingActivity#"+" MBq",
            color :function(obj){
                if (obj.percentRemaining < 10) return "#B067AA";
                return "#949aff";},
            gradient:"",
            width:100,
            tooltip:{
                template:"#percentRemaining#"
            },
            xAxis:{
                title:"Eluate",
                template:"#EluateID#"
            },
            yAxis:{
                title:"Amount Remaining (%)"}


        });
        chartEluate.addSeries({
            value:"#percentUsed#",
            label:"",
            color:"#bebdff",
            tooltip:{
                template:"#percentUsed#"
            }
        });
        chartEluate.load("data/chartEluates.php");
        /////Patient Worklist on Dashboard
        var gridPatients;
        gridPatients =  dashLayout.cells("c").attachGrid();
        gridPatients.setStyle("", "font-size:20px","", "");

        gridPatients.setHeader("Name, Patient ID, DOB, Sex, Procedure");
        gridPatients.setColTypes("ro,ro,ro,ro,ro");
        gridPatients.setColSorting('str,str,str,str,str');
        gridPatients.setInitWidths('250,150,150,50,250');
        //hla.grid.load("data/dwl.php");
        gridPatients.load("data/gridWorklist.php");
        gridPatients.init();

        gridPatients.attachEvent("onRowSelect", function(id,ind){
            msgbox(("Rows with id: "+id+" was selected by user. Index was: "+ind));
        });

    },
    dashboard : function(){
        var dashLayout = appLayout.cells("a").attachLayout({
            parent:     "layoutObj",    // id/object, parent container where layout will be located
            pattern:    "3U",           // string, layout's pattern
            //skin:       "dhx_web",  // string, optional,"dhx_skyblue","dhx_web","dhx_terrace"

            offsets: {          // optional, offsets for fullscreen init
                top:    0,     // you can specify all four sides
                right:  0,     // or only the side where you want to have an offset
                bottom: 0,
                left:   0
            },

            cells: [    // optional, cells configuration according to the pattern
                // you can specify only the cells you want to configure
                // all params are optional
                {
                    id:             "a",        // id of the cell you want to configure
                    text:           "Kits",     // header text
                    collapsed_text: "Text 2",   // header text for a collapsed cell
                    header:         false,      // hide header on init
                    width:          500,        // cell init width
                    height:         300,        // cell init height
                    collapse:       false,        // collapse on init
                    fix_size:       [1,1] // fix cell's size, [width,height]
                },
                {
                    id: "b",        // id of the cell you want to configure
                    text: "Eluates",     // header text
                    collapsed_text: "Text 2",   // header text for a collapsed cell
                    header: false,      // hide header on init
                    width: 300,        // cell init width
                    height: 300,        // cell init height
                    collapse: false,        // collapse on init
                    fix_size: [null, null] // fix cell's size, [width,height]} // other cell if any
                },
                {
                    id: "c",        // id of the cell you want to configure
                    text: "Worklist",     // header text
                    collapsed_text: "Text 2",   // header text for a collapsed cell
                    header: false,      // hide header on init
                    width: 1000,        // cell init width
                    height: 300,        // cell init height
                    collapse: false,        // collapse on init
                    fix_size: [null, null] // fix cell's size, [width,height]} // other cell if any
                }



            ]

        });


        var chartKit;
        chartKit = dashLayout.cells("a").attachChart({

            view:"stackedBar",
            container:"chart1",
            value:"#percentRemaining#",
            label:"#RemainingActivity#"+" MBq",
            color :function(obj){
                if (obj.percentRemaining < 10) return "#B067AA";
                return "#949aff";},
            gradient:"",
            width:100,
            tooltip:{
                template:"#percentRemaining#"
            },
            xAxis:{
                title:"Kit",
                template:"#Abbreviation#"
            },
            yAxis:{
                title:"Amount Remaining (%)"}


        });
        chartKit.addSeries({
            value:"#percentUsed#",
            label:"",
            color:"#bebdff",
            tooltip:{
                template:"#percentUsed#"
            }
        });
        chartKit.load("data/chartKits.php");

        var chartEluate;
        chartEluate = dashLayout.cells("b").attachChart({

            view:"stackedBar",
            container:"chart1",
            value:"#percentRemaining#",
            label:"#RemainingActivity#"+" MBq",
            color :function(obj){
                if (obj.percentRemaining < 10) return "#B067AA";
                return "#949aff";},
            gradient:"",
            width:100,
            tooltip:{
                template:"#percentRemaining#"
            },
            xAxis:{
                title:"Eluate",
                template:"#EluateID#"
            },
            yAxis:{
                title:"Amount Remaining (%)"}


        });
        chartEluate.addSeries({
            value:"#percentUsed#",
            label:"",
            color:"#bebdff",
            tooltip:{
                template:"#percentUsed#"
            }
        });
        chartEluate.load("data/chartEluates.php");
        /////Patient Worklist on Dashboard
        var gridPatients;
        gridPatients =  dashLayout.cells("c").attachGrid();
        gridPatients.setStyle("", "font-size:19px","", "");

        gridPatients.setHeader("Name, Patient ID, DOB, Sex, Procedure");
        gridPatients.setColTypes("ro,ro,ro,ro,ro");
        gridPatients.setColSorting('str,str,str,str,str');
        gridPatients.setInitWidths('250,130,100,40,250');
        //hla.grid.load("data/dwl.php");
        gridPatients.load("data/gridWorklist.php");
        gridPatients.init();

        gridPatients.attachEvent("onRowSelect", function(id,ind){
            msgbox(("Rows with id: "+id+" was selected by user. Index was: "+ind));
        });

    },
    dispensePtDoseOld : function(){


        var items = [
            { type:"settings" , labelWidth:5, inputWidth:250,position:"absolute"},
            {
                type: "input",
                name: "LastName",
                inputWidth: 300,
                inputLeft: 5,
                inputTop: 20
            },
            {
                type: "input",
                name: "FirstName",
                inputWidth: 200,
                inputLeft: 310,
                inputTop: 20
            },
            {
                type: "input",
                name: "PatientID",
                inputWidth: 100,
                inputLeft: 520,
                inputTop: 20
            },

            {
                type: "input",
                name: "DOB",
                inputWidth: 100,
                inputLeft: 630,
                inputTop: 20
            },
            {
                type: "input",
                name: "ProcedureType",
                label: "Procedure Type",
                labelWidth: 250,
                labelLeft: 5,
                labelTop: 70,
                inputLeft: 5,
                inputTop: 100
            },
            {
                type: "container",
                name: "gridPreviousDoses",
                label: "Radiopharmaceuticals previously dispensed",
                labelWidth: "auto",
                labelLeft: 5,
                labelTop: 150,
                inputLeft: 5,
                inputTop: 180,
                inputWidth: 750,
                inputHeight:150
            }
        ];







        var doseForm = appLayout.cells("a").attachForm();
        doseForm.setFontSize("20px");
        doseForm.loadStruct(items,function() {
            //mainForm.setItemFocus("BatchNo");

        });

        var historyGrid = new dhtmlXGridObject(doseForm.getContainer('gridPreviousDoses'));
        historyGrid.setIconsPath(config.iconPath);
        historyGrid.setHeader(["PatientName","PatientID","PatientDOB","PatientSex"]);
        historyGrid.setColTypes("ro,ro,ro,ro");

        historyGrid.enableResizing('true,false,true,true');
        historyGrid.setColSorting('date,str,str,int');
        historyGrid.setInitWidths('60,*,*,*');
        historyGrid.attachEvent('onEditCell', function(stage,rId,cInd,nValue,oValue) {return false;});
        historyGrid.enableKeyboardSupport(false);
        historyGrid.init();
        historyGrid.load('data/gridPreviousDoses.php');

    },
    dispensePtDose : function(){

        var items =  [
            { type:"settings" , labelWidth:5, inputWidth:250,position:"absolute"},
            { type: "block", id:"header",
                list: [
                    { type:"template", name:"PatientName", value:"PatientName", format: formatDispenseDoseHeader, inputWidth: 300,inputLeft: 5, inputTop: 5},
                    { type:"template",name: "PatientID",value: "PatientID",format: formatDispenseDoseHeader,inputWidth: 100,inputLeft: 520, inputTop: 5},
                    { type:"template",name: "DOB",value: "DOB",format: formatDispenseDoseHeader,inputWidth: 100,inputLeft: 630, inputTop: 5},
                    { type:"template",name: "ProcedureType",value: "ProcedureType",format: formatDispenseDoseHeader,labelWidth: 250, inputLeft: 5, inputTop: 25}

                    //{ type:"input", name:"LastName", inputWidth: 300, inputLeft: 5, inputTop: 20},
                   // { type:"input", name:"FirstName", inputWidth: 200, inputLeft: 310, inputTop: 20},
                    //{ type:"input", name:"PatientID", inputWidth: 100, inputLeft: 520, inputTop: 20},
                    //{ type:"input", name:"DOB", inputWidth: 100, inputLeft: 630, inputTop: 20},
                    //{ type:"input", name:"ProcedureType", label: "Procedure Type", labelWidth: 250, labelLeft: 5, labelTop: 70, inputLeft: 5, inputTop: 100},
                ]
            },
            { type: "block", id:"tab1",
                list: [
                        { type:"container", name:"gridPreviousDoses", label:"Radiopharmaceuticals previously dispensed", labelWidth: "auto", labelLeft: 5, labelTop: 5, inputLeft: 5, inputTop: 35, inputWidth: 750, inputHeight:150}
                ]
            },
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
                                    {type: "button", value: "Reboot", name: "reboot"},
                                    {type: "newcolumn"},
                                    {type: "button", value: "Config", name: "config"}
                                ]
                            }
                        ]}
                    ]}
                ]

            }

        ];


         callbacks.clearDashboard();
        var dispenseDoseLayout = appLayout.cells("a").attachLayout({
            parent:     "layoutObj",    // id/object, parent container where layout will be located
            pattern:    "2E",           // string, layout's pattern
            //skin:       "dhx_web",  // string, optional,"dhx_skyblue","dhx_web","dhx_terrace"

            offsets: {          // optional, offsets for fullscreen init
                top:    10,     // you can specify all four sides
                right:  5,     // or only the side where you want to have an offset
                bottom: 10,
                left:   5
            },

            cells: [    // optional, cells configuration according to the pattern
                // you can specify only the cells you want to configure
                // all params are optional
                {
                    id:             "a",        // id of the cell you want to configure
                    text:           "Header",     // header text
                    collapsed_text: "Header",   // header text for a collapsed cell
                    header:         false,      // hide header on init
                    //width:          500,        // cell init width
                    height:         90,        // cell init height
                    collapse:       false,        // collapse on init
                    fix_size:       [null,1] // fix cell's size, [width,height]
                },
                {
                    id: "b",        // id of the cell you want to configure
                    text: "Body",     // header text
                    collapsed_text: "Body",   // header text for a collapsed cell
                    header: false,      // hide header on init
                   // width: 300,        // cell init width
                    //height: 900,        // cell init height
                    collapse: false,        // collapse on init
                    fix_size: [null, null] // fix cell's size, [width,height]} // other cell if any
                }



            ]

        });
         var dispenseDoseTabbar = dispenseDoseLayout.cells("b").attachTabbar({
         tabs: [
         {id: "a1", label: "Step 1", active: true},
         {id: "a2", label: "Step 2"},
         {id: "a3", label: "Step 3"}
         ]
         });

        var dispenseDoseForm = dispenseDoseTabbar.cells("a1").attachForm();
        dispenseDoseForm.setFontSize("20px");
        dispenseDoseForm.loadStruct(items, function(){
            dispenseDoseLayout.cells("a").attachObject("header");
            dispenseDoseTabbar.cells("a2").attachObject("tab2");
            dispenseDoseTabbar.cells("a3").attachObject("tab3");
         });

        dispenseDoseForm.load("data/formSettings.php?id=1");
         // enable validation
        dispenseDoseForm.enableLiveValidation(true);




        var historyGrid = new dhtmlXGridObject(dispenseDoseForm.getContainer('gridPreviousDoses'));
        historyGrid.setIconsPath(config.iconPath);
        historyGrid.setHeader(["PatientName","PatientID","PatientDOB","PatientSex"]);
        historyGrid.setColTypes("ro,ro,ro,ro");

        historyGrid.enableResizing('true,false,true,true');
        historyGrid.setColSorting('date,str,str,int');
        historyGrid.setInitWidths('60,*,*,*');
        historyGrid.attachEvent('onEditCell', function(stage,rId,cInd,nValue,oValue) {return false;});
        historyGrid.enableKeyboardSupport(false);
        historyGrid.init();
        historyGrid.load('data/gridPreviousDoses.php');

    },
    barCodeDisplay : function(){

        var items = [
            { type:"settings" , labelWidth:5, inputWidth:250,position:"absolute"},
            {
                type: "template",
                name: "Date",
                value: "Today",
                format: format_a,
                inputLeft: 5,
                inputTop: 0
            },
            {
                type: "template",
                name: "Time",
                value: "Time",
                format: format_a,
                inputLeft: 5,
                inputTop: 30
            },
            {
                type: "input",
                name: "barcode",
                label: "Scan a barcode",
                labelWidth: 250,
                labelLeft: 5,
                labelTop: 100,
                inputLeft: 5,
                inputTop: 130,
                inputWidth: 200
            }

        ];
/*        var timeForm = appLayout.cells("c").attachForm();
        timeForm.setFontSize("15px");
        timeForm.loadStruct(items,function() {
            //mainForm.setItemFocus("BatchNo");

        });*/
        //appLayout.cells("c").attachHTMLString('<div id="clockbox" style="font:16pt Arial; color:#287ec7;" </div>');
        //appLayout.cells("c").attachHTMLString('<div id="clockbox" style="font:16pt Arial; color:#287ec7;" </div>');
        var barcodeForm = appLayout.cells("c").attachForm();
        barcodeForm.setFontSize("20px");
        barcodeForm.loadStruct(items,function() {
            barcodeForm.setItemValue("barcode",config.Barcode);
        });
        if (config.BarcodeIncomming !=""){
            logic.barCodeReader(config.BarcodeIncomming);

        }

    }

};

function format_a(name, value) {
    var d=new Date();
    var nday=d.getDay(),nmonth=d.getMonth(),ndate=d.getDate();
    var nhour=d.getHours(),nmin=d.getMinutes(),ap,nsec= d.getSeconds();
    if(nhour==0){ap=" AM";nhour=12;}
    else if(nhour<12){ap=" AM";}
    else if(nhour==12){ap=" PM";}
    else if(nhour>12){ap=" PM";nhour-=12;}

    if(nmin<=9) nmin="0"+nmin;
    if(nsec<=9) nsec="0"+nsec;

    //if (name == "Date2") return "<div class='simple_bold'>"+value+"</div>";
    if (name == "Date") return "<div style='font:16pt Arial; color:#2c85d5;'>"+tday[nday]+", "+tmonth[nmonth]+" "+ndate+"</div>";
    if (name == "Time") return "<div style='font:32pt Arial; color:#287ec7;'>"+nhour+":"+nmin+":"+nsec+ap+"</div>";
    //if (name == "Today") return "<div id='clockbox' style='font:16pt Arial; color:#287ec7;' </div>'";
    //if (name == "link") return "<div class='simple_link'><a href='http://"+value+"' target='blank'>"+value+"</a></div>";

}
function formatDispenseDoseHeader(name, value) {
    if (name == "ProcedureType") return "<div style='font:32pt Arial; color:#287ec7;'>"+value+"</div>";
    else return "<div style='font:16pt Arial; color:#2c85d5;'>"+value+"</div>";
}

LastAddedId = function(tble){

    dhx.ajax().get("data/lastadded.php?id="+tble, function(text,xml){
        var data = dhx.DataDriver.json.toObject(text,xml);

        data = data.id["0"].id;
        return data;
    });

};