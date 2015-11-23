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
                generatorForm.load("data/FormGenerators.php?id="+id);
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
                    callbacks.clearDashboard();
                }
            });
            // set Data Processor
            var dp = new dataProcessor("data/FormGenerators.php");
            dp.init(generatorForm);
    },
    generatorGrid : function() {
        varTitle =
        appLayout.cells("a").attachToolbar();
        appGrid = appLayout.cells("a").attachGrid();
        appGrid.setImagePath(config.imagePath);
        appGrid.setHeader("id, BatchNo, Supplier, ArrivalDate");
        appGrid.setColTypes("ro,ro,ro,ro");
        appGrid.setColSorting('str,str,str,str');
        appGrid.setInitWidths('*,*,*,*');
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
    chartKits : function(){

        var myBarChart;
        myBarChart = appLayout.cells("a").attachChart({

            view:"stackedBar",
            container:"chart1",
            value:"#percentRemaining#",
            label:"#percentRemaining#",
            color: "#58dccd",
            gradient:"falling",
            width:120,
            tooltip:{
                template:"#percentRemaining#"
            },
            xAxis:{
                template:"#Abbreviation#"
            },
            yAxis:{},
            legend:{
                values:[{text:"Type A",color:"#36abee"},{text:"Type B",color:"#a7ee70"}],
                valign:"middle",
                align:"right",
                width:90,
                layout:"y"
            }
        });
        myBarChart.addSeries({
            value:"#percentUsed#",
            color:"#a7ee70",
            label:"#percentUsed#",
            tooltip:{
                template:"#percentUsed#"
            }
        });
        myBarChart.load("data/chartKits.php");


    },
    chartKits2 : function(){
        var layout2 = appLayout.cells("a").attachLayout({
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
        var chartKit;
        chartKit = layout2.cells("a").attachChart({

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
        chartEluate = layout2.cells("a").attachChart({

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
        chartEluate.addSeries({
            value:"#percentUsed#",
            label:"",
            color:"#bebdff",
            tooltip:{
                template:"#percentUsed#"
            }
        });
        chartEluate.load("data/chartKits.php");

    },
    dispensePtDose : function(){

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
                name: "gridPreviousRadiopharmaceuticals",
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

        var historyGrid = new dhtmlXGridObject(doseForm.getContainer('gridPreviousRadiopharmaceuticals'));
        historyGrid.setIconsPath(config.iconPath);
        historyGrid.setHeader(["Date","Study Type","Radiopharmaceutical","Dispensed Activity"]);
        historyGrid.setColTypes("ro,ro,ro,ro");

        historyGrid.enableResizing('true,false,true,true');
        historyGrid.setColSorting('date,str,str,int');
        historyGrid.setInitWidths('60,*,*,*');
        historyGrid.attachEvent('onEditCell', function(stage,rId,cInd,nValue,oValue) {return false;});
        historyGrid.enableKeyboardSupport(false);
        historyGrid.init();
        historyGrid.load('data/gridGenerators.php');

    }


};