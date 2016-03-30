/**
 * Created by theokitsos on 6/01/2016.
 */

var patientsLayout;
var patientsToolbar;
var patientsGrid;
var generatorID;


function patientInit(cell) {

    if (patientsLayout == null) {

        // init layout
        patientsLayout = cell.attachLayout("1C");
        patientsLayout.cells("a").hideHeader();

        // attach toolbar

        patientsToolbar = patientsLayout.cells("a").attachToolbar({
            icons_size: 24,
            icons_path: A.imagePath+"toolbar/",
            items: [
                {type: "button", id: "btnWorklist", text: "Worklist", img: "", imgdis: "", title: "Worklist"},
                {type: "separator", id: "sep01"},
                {type: "button", id: "btnAllToday", text: "All Today", img: "", title: "All Today"},
                {type: "separator", id: "sep02"},
                {type: "button", id: "btnLast2Days", text: "Last 2 Days", img: "", title: "Last 2 Days"},
                {type: "separator", id: "sep03"},
                {type: "button", id: "btnLast7Days", text: "Last 7 Days", img: "", title: "Last 7 Days"},
                {type: "separator", id: "sep04"},
                {type: "button", id: "btnRefresh", text: "Refresh", img: "", title: "Refresh"}

        ]
    });
        patientsToolbar.attachEvent("onClick", function (id) {
            if (id == "btnWorklist") patientWorklist();
            if (id == "btnRefresh") dicomWorklistRequery()
        });
    }

}

function dicomWorklistRequery(){
    logic.DWLquery();
    dhtmlx.message("Worklist requery in progress");
}


function patientWorklist() {

    //Clear canvas
    patientsClearCanvas();

    patientsGrid = patientsLayout.cells("a").attachGrid();
    patientsGrid.setStyle("", "font-size:20px", "", "");

    patientsGrid.setHeader("Name, Patient ID, DOB, Sex, Procedure");
    patientsGrid.setColTypes("ro,ro,ro,ro,ro");
    patientsGrid.setColSorting('str,str,str,str,str');
    patientsGrid.setInitWidths('250,150,150,50,250');
    //hla.grid.load("data/dwl.php");
    patientsGrid.load("data/gridWorklist.php");
    patientsGrid.init();

    patientsGrid.attachEvent("onRowSelect", function (id,ind) {
        dhtmlx.alert(("Rows with id: " + id + " was selected by user. Index was: " + ind));
    });
}


function patientsClearCanvas(){
    if (patientsLayout.cells("a").getAttachedObject() != null){
        patientsLayout.cells("a").detachObject()
    }

}


window.dhx4.attachEvent("onSidebarSelect", function(id, cell){
    if (id == "patients") patientInit(cell);
});