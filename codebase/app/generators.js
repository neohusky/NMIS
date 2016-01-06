/**
 * Created by theokitsos on 6/01/2016.
 */
var generatorsGrid;
var generatorsLayout;
var generatorsToolbar;
var generatorsForm;
var generatorsID;


function generatorsInit(cell) {

    if (generatorsLayout == null) {

        // init layout
        generatorsLayout = cell.attachLayout("1C");
        generatorsLayout.cells("a").hideHeader();

        // attach toolbar

        generatorsToolbar = generatorsLayout.cells("a").attachToolbar({
            icons_size: 24,
            icons_path: A.imagePath+"toolbar/",
            items: [
                {type: "button", id: "btnAddNew", text: "AddNew", img: "plus.png", imgdis: "", title: "Add New"},
                {type: "separator", id: "sep01"},
                {type: "button", id: "btnDecommission", text: "Decommission", img: "", title: "Decommission"},
                {type: "separator", id: "sep02"},
                {type: "button", id: "btnInventory", text: "Inventory", img: "", title: "Inventory"},
                {type: "separator", id: "sep03"},
                {type: "button", id: "btnEdit", text: "Edit", img: "", title: "Edit", enabled:"false"},
                {type: "separator", id: "sep04", hidden: "true", enabled:"false"},
                {type: "button", id: "btnReprint", text: "Reprint", img: "", title: "Reprint", enabled:"false"},
                {type: "separator", id: "sep05", hidden: "true", enabled:"false"}
        ]
    });
        generatorsToolbar.attachEvent("onClick", function (id) {
            if (id == "btnAddNew") generatorsFillForm();
            if (id == "btnDecommission") contactsInit(cell);
            if (id == "btnInventory") generatorsInventory();
            if (id == "btnEdit") generatorsFillForm(generatorsGrid.getSelectedRowId());
            if (id == "btnReprint") contactsInit(cell);
        });
    }

}

function generatorsInventory(id){
    // attach grid
    generatorsGrid = generatorsLayout.cells("a").attachGrid();
    generatorsGrid.setImagePath(A.imagePath);
    generatorsGrid.setStyle("", "font-size:20px","", "");
    generatorsGrid.setHeader("id, BatchNo, Supplier, ArrivalDate, Username");
    generatorsGrid.attachHeader("&nbsp;,#text_filter,#combo_filter,&nbsp;,#select_filter");
    generatorsGrid.setColumnIds("id,BatchNo,Supplier,ArrivalDate,Username");         //sets the columns' ids
    generatorsGrid.setDateFormat("%Y-%m-%d %H:%i:%s");
    generatorsGrid.setColTypes("ro,ro,ro,dhxCalendar,ro");
    generatorsGrid.setColSorting('str,str,str,date,str');
    generatorsGrid.setInitWidths('100,120,220,120,150');
    generatorsGrid.load("data/gridGenerators.php",function(){
        //select previously edited row
        if ( id >= 0){
            generatorsGrid.setSelectedRow(id);
        }
    });
    generatorsGrid.init();


    generatorsGrid.attachEvent("onRowSelect", function() {
        if (generatorsGrid.getSelectedRowId()) {
            generatorsToolbar.enableItem("btnEdit");
            generatorsToolbar.enableItem("sep04");
            generatorsToolbar.enableItem("btnReprint");
            generatorsToolbar.enableItem("sep05");
        } else {
            generatorsToolbar.disableItem("btnEdit");
            generatorsToolbar.disableItem("sep04");
            generatorsToolbar.disableItem("btnReprint");
            generatorsToolbar.disableItem("sep05");
        }
    });


}

function generatorsFillForm(id){

    var items = [
        {type: "settings", position: "label-left", labelWidth: 130, inputWidth: 260},
        {type: "input",     name: "id",             label: "id",            tooltip: "id",  required: "false", hidden: "true", offsetTop: 40},
        {type: "input",     name: "BatchNo",        label: "Batch No",      tooltip: "Supplier Batch Number", required: "true", validate: "NotEmpty", hidden: "false"},
        {type: "combo",     name: "Supplier",       label: "Supplier",      tooltip: "Supplier Name", required: "true", validate: "NotEmpty", filtering: "true", connector: "data/lstSuppliers.php"},
        {type: "calendar",  name: "ArrivalDate",    label: "ArrivalDate",   dateFormat: "%Y-%m-%d %H:%i:%s", enableTime: "true", calendarPosition: "right", tooltip: "Arrival Date", required: "true", validate: "NotEmpty", hidden: "false"},
        {type: "input",     name: "Username",       label: "StaffID",       tooltip: "Username", required: "true", validate: "NotEmpty", hidden: "false"},
        { type: "block", id: "buttons", width: 300,
            list: [
                {type: "button", value: "Save", name: "save"},
                {type: "newcolumn"},
                {type: "button", value: "Cancel", name: "cancel"}
            ]}
    ];
    generatorsForm = generatorsLayout.cells("a").attachForm();
    generatorsForm.setFontSize("20px");
    generatorsForm.loadStruct(items,function() {
        generatorsForm.setItemFocus("BatchNo");
        generatorsForm.setItemValue("ArrivalDate",logic.getDateTime());
        generatorsForm.setItemValue("Username", A.UserName);
        combo = generatorsForm.getCombo("Supplier");
    });

    if ( id >= 0){
        generatorsForm.load("data/formGenerators.php?id="+id);
    }
    // enable validation
    generatorsForm.enableLiveValidation(true);

    generatorsForm.setSizes();

    // set event
    // save or cancel
    generatorsForm.attachEvent("onButtonClick", function (btnName) {
        // save or cancel
        if (btnName == "cancel") {
            generatorsForm.unload();
        } else if (generatorsForm.validate()) {
            generatorsForm.save();


        }
    });
    // set Data Processor
    var dp = new dataProcessor("data/formGenerators.php");
    dp.init(generatorsForm);
    dp.attachEvent("onAfterUpdate", function(id, action, tid, response){
        if (action == "inserted") {
            console.log(tid);
            logic.printLabel("generator",tid,1);
            logic.logger("Generator Added","Added generator wth id:"+tid);
            generatorsForm.unload();
        }
        //if updating a generator then this
        if (action == "updated") {
            //console.log(tid);
            generatorsID = tid;
            //Print label of updated generator
            logic.printLabel("generator",tid,1);

            generatorsForm.unload();
            generatorsInventory(generatorsID);



            

        }
    });
}

window.dhx4.attachEvent("onSidebarSelect", function(id, cell){
    if (id == "generators") generatorsInit(cell);
});