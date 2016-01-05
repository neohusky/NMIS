/**
 * Created by nucmed on 17/11/2015.
 */
var combo;
var view;
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

        var items = [
            {type: "settings", position: "label-left", labelWidth: "250", inputWidth: "260"},
            {
                type: "fieldset", name: "data", label: "Generator Entry", inputWidth: "auto",
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
        appForm = genLayout.cells("b").attachForm();
        //generatorForm = appLayout.cells("a").attachForm();
        appForm.setFontSize("20px");
        appForm.loadStruct(items, function () {
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


    timeDisplay: function () {
        var tday = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
        var tmonth = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
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