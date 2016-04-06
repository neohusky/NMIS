/**
 * Created by theokitsos on 6/01/2016.
 */

var homeLayout;
var homeToolbar;
var gridPatients;

var chartKit;

var tm = null; // this is timeout variable

function homeInit(cell) {

    if (homeLayout == null) {

        // init layout
        homeLayout = cell.attachLayout("3U");
        //hide all cell Headers
        homeLayout.cells("a").hideHeader();
        homeLayout.cells("b").hideHeader();


        homeLayout.cells("c").hideHeader();
        // attach toolbar to Cell"a"

        ///////homeToolbar = homeLayout.cells("a").attachToolbar({

        // attach toolbar to full screen
        homeToolbar = cell.attachToolbar({
            icons_size: 24,
            icons_path: A.imagePath+"toolbar/",
            items: [
                {type: "button", id: "btnRefreshList", text: "Refresh List", img: "plus.png", imgdis: "", title: "Add New"},
                {type: "separator", id: "sep01"},
                {type: "button", id: "btnDecommission", text: "Label 2", img: "", title: "Decommission"},
                {type: "separator", id: "sep02"},
                {type: "button", id: "btnInventory", text: "Label 3", img: "", title: "Inventory"}
        ]
    });
        homeToolbar.attachEvent("onClick", function (id) {
            if (id == "btnRefreshList") refreshWorklist();
            if (id == "btnDecommission") generatorsDecommission();
            if (id == "btnInventory") generatorsInventory();
            if (id == "btnEdit") generatorsFillForm(generatorsGrid.getSelectedRowId());
            if (id == "btnReprint") contactsInit(cell);
        });
    }
    //Load Grid into Cell "c"
    gridWorklist("c");
    //Load Grid into Cell "a"
    chartKits("a");

    homeRefresh =  setInterval( function() {

        dhtmlx.message("Worklist grid refreshed interval =" + A.HomeScreenRefresh);
    }, A.HomeScreenRefresh );
}

function gridWorklist(cell) {
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
        dhtmlx.alert("Rows with id: " + id + " was selected by user. Index was: " + ind);
    });


}



function refreshWorklist(){
        gridPatients.clearAll();
        gridPatients.load("data/gridWorklist.php"); //same connector's URI

}

// this function will triggered each time ahen user do something
// that may consider valid action
// this will clear current timer and launch the new one




function chartKits(cell) {
    chartKit = homeLayout.cells(cell).attachChart({

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
}

window.dhx4.attachEvent("onSidebarSelect", function(id, cell){
    if (id == "home") homeInit(cell);
});