/**
 * Created by nucmed on 17/11/2015.
 */
var combo;
var view;
var formItems = {

    generator: [
        {type: "settings", position: "label-left", labelWidth: "250", inputWidth: "260"},
        {type: "fieldset", name: "data", label: "Generator Entry", inputWidth: "auto",
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
            ]},
        // buttons
        {type: "block", id: "buttons", width: 300,
            list: [
                {type: "button", value: "Save", name: "save"},
                {type: "newcolumn"},
                {type: "button", value: "Cancel", name: "cancel"}
            ]
        }
    ],
    kit: [
        {
            type: "block", id: "tab1",
            list: [
                {
                    type: "fieldset", name: "data1", label: "Dicom Worklist", inputWidth: "auto",
                    list: [
                        { type: "input", name: "supplier_name", label: "Supplier", labelWidth: "250", inputWidth: "250", labelLeft: "175", labelTop: "50", inputLeft: "175", inputTop: "121"},
                        { type: "input", name: "trade_name", label: "Trade name", labelWidth: "250", inputWidth: "250", labelLeft: "175", labelTop: "50", inputLeft: "175", inputTop: "171"},
                        { type: "input", name: "abbreviation", label: "Abbreviation", labelWidth: "250", inputWidth: "250", labelLeft: "175", labelTop: "50", inputLeft: "175", inputTop: "71"},
                        { type: "input", name: "radiopharmaceutical", label: "Radiopharmaceutical", labelWidth: "250", inputWidth: "250", labelLeft: "175", labelTop: "50", inputLeft: "450", inputTop: "71"},
                        { type: "input", name: "recon_isotope", label: "Recon Isotope", labelWidth: "250", inputWidth: "250", labelLeft: "450", labelTop: "50", inputLeft: "450", inputTop: "121"},
                        { type: "checkbox", name: "qc_required", label: "Requires QC Pass", labelWidth: "250", labelLeft: "450", labelTop: "50"},
                        { type: "checkbox", name: "recon_required", label: "Requires reconstitution", labelWidth: "250", inputWidth: "250", labelLeft: "450", labelTop: "50"}
                    ]
                }
            ]
        },
                // Tab2
        {
            type: "block", id: "tab2",
                list: [
                    { type: "fieldset", name: "data2", label: "Kit Properties", inputWidth: "auto",
                        list: [
                            { type: "input", name: "kit_size", label: "Kit size (mg)", labelWidth: "250", inputWidth: "250", labelLeft: "450", labelTop: "50", inputLeft: "450", inputTop: "196"},
                            { type: "input", name: "manufacture_comments", label: "Manufacturer comments", rows:4, labelWidth: "250", inputWidth: "250", labelLeft: "175", labelTop: "50", inputLeft: "175", inputTop: "296"}
                        ]
                    },
                    { type: "fieldset", name: "data3", label: "Recon Parameters", inputWidth: "auto",
                        list: [
                            { type: "input", name: "kit_size", label: "Kit size (mg)", labelWidth: "250", inputWidth: "250", labelLeft: "450", labelTop: "50", inputLeft: "450", inputTop: "196"},
                            { type: "input", name: "manufacture_comments", label: "Manufacturer comments", labelWidth: "250", inputWidth: "250", labelLeft: "175", labelTop: "50", inputLeft: "175", inputTop: "296"},
                        ]
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
    ],

    admin: [
        {id: "setting1", text: "setting1", icon: "disk_c.png"},
        {id: "setting2", text: "setting2", icon: "disk_d.png"},
        {id: "setting3", text: "setting3", icon: "disk_e.png"}
    ],
    settings:  [


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
    ],
};
view = {

    dashboard: function () {

        homeLayout = mainSidebar.cells("home").attachLayout({
            pattern: "3U",             // layout's pattern
            skin: "dhx_web",     // optional, layout's skin
            offsets: {top: 0, right: 0, bottom: 0, left: 0},
            cells: [
                {
                    id: "a",
                    text: "Main",
                    collapsed_text: "",
                    header: false,
                    width: 500,
                    height: 300,
                    collapse: false,
                    fix_size: [null, null]
                },
                {
                    id: "b",
                    text: "Notifications",
                    collapsed_text: "",
                    header: true,
                    width: 250,
                    height: 0,
                    collapse: false,
                    fix_size: [1, null]
                },
                {
                    id: "c",
                    text: "Worklist",
                    collapsed_text: "",
                    header: true,
                    width: 0,
                    height: 300,
                    collapse: false,
                    fix_size: [null, 1]
                }
            ]
        });


        var chartKit;
        chartKit = homeLayout.cells("a").attachChart({

            view: "stackedBar",
            container: "chart1",
            value: "#percentRemaining#",
            label: "#RemainingActivity#" + " MBq",
            color: function (obj) {
                if (obj.percentRemaining < 10) return "#B067AA";
                return "#949aff";
            },
            gradient: "",
            width: 100,
            tooltip: {
                template: "#percentRemaining#"
            },
            xAxis: {
                title: "Kit",
                template: "#Abbreviation#"
            },
            yAxis: {
                title: "Amount Remaining (%)"
            }


        });
        chartKit.addSeries({
            value: "#percentUsed#",
            label: "",
            color: "#bebdff",
            tooltip: {
                template: "#percentUsed#"
            }
        });
        chartKit.load("data/chartKits.php");

        /*        var chartEluate;
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
         chartEluate.load("data/chartEluates.php");*/


        /////Patient Worklist on Dashboard
        var gridPatients;
        gridPatients = homeLayout.cells("c").attachGrid();
        gridPatients.setStyle("", "font-size:19px", "", "");

        gridPatients.setHeader("Name, Patient ID, DOB, Sex, Procedure");
        gridPatients.setColTypes("ro,ro,ro,ro,ro");
        gridPatients.setColSorting('str,str,str,str,str');
        gridPatients.setInitWidths('250,130,100,40,250');
        //hla.grid.load("data/dwl.php");
        gridPatients.load("data/gridWorklist.php");
        gridPatients.init();

        gridPatients.attachEvent("onRowSelect", function (id, ind) {
            msgbox(("Rows with id: " + id + " was selected by user. Index was: " + ind));
        });

    },
    generators: function () {
        homeLayout = mainSidebar.cells("generators").attachLayout({
            pattern: "1C",             // layout's pattern
            skin: "dhx_web",     // optional, layout's skin
            offsets: {top: 0, right: 0, bottom: 0, left: 0},
            cells: [
                {
                    id: "a",
                    text: "Main",
                    collapsed_text: "",
                    header: false,
                    width: 500,
                    height: 300,
                    collapse: false,
                    fix_size: [null, null]
                }
                //{ id: "b", text: "Notifications", collapsed_text: "", header:true, width: 250,height: 0, collapse: false,fix_size:[1,null]},
                //{ id: "c", text: "Worklist", collapsed_text: "", header:true, width: 0,height: 300, collapse: false,fix_size:[null,1]}
            ]
        });

        appToolbar = homeLayout.cells("a").attachToolbar();
        appToolbar.setIconsPath(config.iconPath);
        appToolbar.setIconSize(24);
        appToolbar.loadStruct(toolbarItems["generator"]);
        appToolbar.attachEvent("onClick", function (id) {
            switch (id) {
                case "btnAddNew":
                    view.generatorEntry();
                    break;
                case "btnDecommission":
                    dhtmlx.alert("generator:Decomission");
                    break;
                case "btnInventory":
                    view.generatorInventory();
                    callbacks.setToolbarItemStates();
                    break;
                case "btnEdit":
                    view.generatorEntry(parseInt(appGrid.getSelectedRowId()));
                    break;
                case "btnReprint":
                    logic.printLabel("generator", parseInt(appGrid.getSelectedRowId()), 1);
                    console.log(parseInt(appGrid.getSelectedRowId));
                    break;
                default:
                    break;
            }
        });


        //appLayout.cells("a").attachToolbar();
        appGrid = homeLayout.cells("a").attachGrid();
        appGrid.setImagePath(config.imagePath);
        appGrid.setHeader("id, BatchNo, Supplier, ArrivalDate, button");
        appGrid.setColumnIds("id,BatchNo,Supplier,ArrivalDate,Username");         //sets the columns' ids
        appGrid.setColTypes("ro,ro,ro,ro,ro");
        appGrid.setColSorting('str,str,str,str,str');
        appGrid.setInitWidths('50,100,150,120,150');
        appGrid.load("data/gridGenerators.php");
        appGrid.init();

        /*        appGrid.attachEvent("onRowDblClicked", function(rowId){
         console.log(rowId);
         view.generatorEntry(parseInt(rowId));
         });
         appGrid.attachEvent("onRowSelect", function(rowId){
         callbacks.setToolbarItemStates();
         });*/

    },
    generatorEntry: function (id) {
        var formLayout = homeLayout.cells("a").attachLayout({
            pattern: "1C",             // layout's pattern
            skin: "dhx_web",     // optional, layout's skin
            offsets: {top: 0, right: 0, bottom: 0, left: 0},
            cells: [
                {
                    id: "a",
                    text: "Main",
                    collapsed_text: "",
                    header: false,
                    width: 0,
                    height: 0,
                    collapse: false,
                    fix_size: [null, null]
                }
            ]
        });


        generatorForm = formLayout.cells("a").attachForm();
        generatorForm.setFontSize("20px");
        generatorForm.loadStruct(formItems.generator,function() {
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
                mainSidebar.cells("home").setActive(true);
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
                logic.logger("Generator Added","Added generator wth id:"+tid);
                mainSidebar.cells("home").setActive(true);
            }
            //if updating a generator then this
            if (action == "updated") {
                //console.log(tid);
                //Print label of updated generator
                logic.printLabel("generator",tid,1);
                callbacks.goHome();
            }
        });
    },

    generatorInventory: function () {
        var genLayout = homeLayout.cells("a").attachLayout({
            pattern: "2U",             // layout's pattern
            skin: "dhx_web",     // optional, layout's skin
            offsets: {top: 0, right: 0, bottom: 0, left: 0},
            cells: [
                {
                    id: "a",
                    text: "Main",
                    collapsed_text: "",
                    header: false,
                    width: 0,
                    height: 0,
                    collapse: false,
                    fix_size: [null, null]
                },
                {
                    id: "b",
                    text: "Form",
                    collapsed_text: "",
                    header: false,
                    width: 0,
                    height: 0,
                    collapse: false,
                    fix_size: [null, null]
                }
            ]
        });

        appGrid = genLayout.cells("a").attachGrid();
        appGrid.setImagePath(config.imagePath);
        appGrid.setStyle("", "font-size:20px","", "");
        appGrid.setHeader("id, BatchNo, Supplier, ArrivalDate, Username");
        appGrid.attachHeader("&nbsp;,#text_filter,#combo_filter,&nbsp;,#select_filter");
        appGrid.setColumnIds("id,BatchNo,Supplier,ArrivalDate,Username");         //sets the columns' ids
        appGrid.setDateFormat("%Y-%m-%d %H:%i:%s");
        appGrid.setColTypes("ro,ro,ro,dhxCalendar,ro");
        appGrid.setColSorting('str,str,str,date,str');
        appGrid.setInitWidths('100,120,220,120,150');
        appGrid.load("data/gridGenerators.php");
        appGrid.init();

        //callbacks.clearDashboard();
        appForm = genLayout.cells("b").attachForm();
        //generatorForm = appLayout.cells("a").attachForm();
        appForm.setFontSize("20px");
        appForm.loadStruct(formItems.generator, function () {
            //mainForm.setItemFocus("BatchNo");
            //appForm.setItemValue("ArrivalDate",callbacks.getDateTime());
            //appForm.setItemValue("Username",config.UserName);
            //combo = appForm.getCombo("Supplier");
        });
        appForm.bind(appGrid);

        /*        if ( id >= 0){
         appForm.load("data/formGenerators.php?id="+id);
         }*/
        // enable validation
        appForm.enableLiveValidation(true);


        // set event
        // save or cancel
        appForm.attachEvent("onButtonClick", function (btnName) {
            // save or cancel
            if (btnName == "cancel") {
                //callbacks.clearDashboard();
            } else if (appForm.validate()) {
                appForm.save();


            }
        });
        // set Data Processor
        var dp = new dataProcessor("data/gridGenerators.php");
        dp.init(appGrid);
        dp.attachEvent("onAfterUpdate", function (id, action, tid, response) {
            if (action == "inserted") {
                console.log(tid);
                logic.printLabel("generator", tid, 1);
                //callbacks.clearDashboard();
            }
            //if updating a generator then this
            if (action == "updated") {
                //console.log(tid);
                //Print label of updated generator
                logic.printLabel("generator", tid, 1);
                //callbacks.clearDashboard();
            }
        });

    },
    kits: function () {
        homeLayout = mainSidebar.cells("kits").attachLayout({
            pattern: "1C",             // layout's pattern
            skin: "dhx_web",     // optional, layout's skin
            offsets: {top: 0, right: 0, bottom: 0, left: 0},
            cells: [
                {
                    id: "a",
                    text: "Main",
                    collapsed_text: "",
                    header: false,
                    width: 500,
                    height: 300,
                    collapse: false,
                    fix_size: [null, null]
                }
                //{ id: "b", text: "Notifications", collapsed_text: "", header:true, width: 250,height: 0, collapse: false,fix_size:[1,null]},
                //{ id: "c", text: "Worklist", collapsed_text: "", header:true, width: 0,height: 300, collapse: false,fix_size:[null,1]}
            ]
        });

        appToolbar = homeLayout.cells("a").attachToolbar();

        appToolbar.loadStruct(toolbarItems.kits);

        appToolbar.attachEvent("onClick", function (id) {
            switch (id) {
                case "btnAddNew":
                    view.kitEntry();
                    break;
                case "btnInventory":
                    view.kitInventory();
                    callbacks.setToolbarItemStates();
                    break;
                case "btnEdit":
                    view.kitEntry(parseInt(appGrid.getSelectedRowId()));
                    break;
                case "btnReprint":
                    logic.printLabel("generator", parseInt(appGrid.getSelectedRowId()), 1);
                    console.log(parseInt(appGrid.getSelectedRowId));
                    break;
                default:
                    break;
            }
        });


    },
    kitEntry: function (id) {
        var formLayout = homeLayout.cells("a").attachLayout({
            pattern: "1C",             // layout's pattern
            skin: "dhx_web",     // optional, layout's skin
            offsets: {top: 0, right: 0, bottom: 0, left: 0},
            cells: [
                {
                    id: "a",
                    text: "Main",
                    collapsed_text: "",
                    header: false,
                    width: 0,
                    height: 0,
                    collapse: false,
                    fix_size: [null, null]
                }
            ]
        });

        var kitsTabbar = homeLayout.cells("a").attachTabbar({
            tabs: [
                {id: "a1", label: "Tab 1", active: true},
                {id: "a2", label: "Tab 2"},
                {id: "a2", label: "Tab 3"}
            ]
        });


        var kitForm = kitsTabbar.cells("a1").attachForm();
        kitForm.setFontSize("20px");
        kitForm.loadStruct(formItems.kit, function(){
            kitsTabbar.cells("a2").attachObject("tab2");
            kitsTabbar.cells("a3").attachObject("tab3");
        });
        if ( id >= 0){
            kitForm.load("data/formGenerators.php?id="+id);
        }
        // enable validation
        kitForm.enableLiveValidation(true);


        // set event
        // save or cancel
        kitForm.attachEvent("onButtonClick", function (btnName) {
            // save or cancel
            if (btnName == "cancel") {
                mainSidebar.cells("home").setActive(true);
            } else if (generatorForm.validate()) {
                kitForm.save();


            }
        });
        // set Data Processor
        var dp = new dataProcessor("data/formGenerators.php");
        dp.init(kitForm);
        dp.attachEvent("onAfterUpdate", function(id, action, tid, response){
            if (action == "inserted") {
                console.log(tid);
                logic.printLabel("generator",tid,1);
                logic.logger("Generator Added","Added generator wth id:"+tid);
                mainSidebar.cells("home").setActive(true);
            }
            //if updating a generator then this
            if (action == "updated") {
                //console.log(tid);
                //Print label of updated generator
                logic.printLabel("generator",tid,1);
            }
        });
    },


    timeDisplay: function () {
        var tday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var tmonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var d = new Date();
        var nday = d.getDay(), nmonth = d.getMonth(), ndate = d.getDate();
        var nhour = d.getHours(), nmin = d.getMinutes(), ap, nsec = d.getSeconds();
        if (nhour == 0) {
            ap = " AM";
            nhour = 12;
        }
        else if (nhour < 12) {
            ap = " AM";
        }
        else if (nhour == 12) {
            ap = " PM";
        }
        else if (nhour > 12) {
            ap = " PM";
            nhour -= 12;
        }

        if (nmin <= 9) nmin = "0" + nmin;
        if (nsec <= 9) nsec = "0" + nsec;

        //if (name == "Date2") return "<div class='simple_bold'>"+value+"</div>";
        //"<div style='font:31pt Arial; color:#287ec7;'>"+nhour+":"+nmin+":"+nsec+ap+"</div>";

        //document.getElementById("status_txt").textContent = "Initializing.........";
        document.getElementById("date_txt").textContent = tday[nday] + ", " + tmonth[nmonth] + " " + ndate + " " + nhour + ":" + nmin + ":" + nsec + ap;
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
    if (name == "Time") return "<div style='font:31pt Arial; color:#287ec7;'>"+nhour+":"+nmin+":"+nsec+ap+"</div>";
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