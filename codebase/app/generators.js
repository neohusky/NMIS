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
            if (id == "btnDecommission") generatorsDecommission();
            if (id == "btnInventory") generatorsInventory();
            if (id == "btnEdit") generatorsFillForm(generatorsGrid.getSelectedRowId());
            if (id == "btnReprint") contactsInit(cell);
        });
    }

}

function generatorsInventory(id){

    //clear the workspace
    generatorsClearCanvas();
    // attach grid
    generatorsGrid = generatorsLayout.cells("a").attachGrid();
    generatorsGrid.setImagePath(A.imagePath);
    generatorsGrid.setStyle("", "font-size:20px","", "","","");
    generatorsGrid.setHeader("id, BatchNo, Supplier, Arrival, Arrival User, Decommission, Decommission User");
    generatorsGrid.attachHeader("&nbsp;,#text_filter,#combo_filter,&nbsp;,#select_filter,&nbsp;,#select_filter");
    generatorsGrid.setColumnIds("generator_id,batch_number,supplier_name,arrival_date,arrival_username,decommission_date,decommission_username");         //sets the columns' ids
    generatorsGrid.setDateFormat("%Y-%m-%d %H:%i:%s");
    generatorsGrid.setColTypes("ro,ro,ro,dhxCalendar,ro,dhxCalendar,ro");
    generatorsGrid.setColSorting('int,str,str,date,str,date,str');

    generatorsGrid.setInitWidths('100,120,220,200,150,200,150');
    generatorsGrid.load("data/gridGenerators.php",function(){
        generatorsGrid.sortRows(0,"int","des");
        //select previously edited row
        if ( id >= 0){
            generatorsGrid.setSelectedRow(id);
        }
    });
    generatorsGrid.sortRows(0,"int","des");
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
function generatorsClearCanvas(){
    if (generatorsLayout.cells("a").getAttachedObject() != null){
        generatorsLayout.cells("a").detachObject()
    }

}
function generatorsDecommission() {
    var formbarcode;
    var items = [
        {type: "settings", position: "label-left", labelWidth: 130, inputWidth: 260},
        {type: "container",     name: "gridActiveGenerators",       hidden: "false", inputWidth: 950,inputHeight:300,offsetTop: 40},
        {type: "input",     name: "barcode",        label: "Barcode",      tooltip: "barcode", validate: "NotEmpty", hidden: "false",offsetTop: 40},
        {type: "calendar",  name: "decommission_date",    label: "Decommission Date",   dateFormat: "%Y-%m-%d %H:%i:%s", enableTime: "true", calendarPosition: "right", tooltip: "Arrival Date", required: "true", validate: "NotEmpty", hidden: "false"},
        {type: "input",     name: "decommission_username",       label: "Username",       tooltip: "Username", required: "true", validate: "NotEmpty", hidden: "false"},
        { type: "block", id: "buttons", width: 300,
            list: [
                {type: "button", value: "Decommission", name: "Decommission"},
                {type: "newcolumn"},
                {type: "button", value: "Cancel", name: "cancel"}
            ]}
    ];
    //clear the workspace
    generatorsClearCanvas();
    //attach form
    generatorsForm = generatorsLayout.cells("a").attachForm();
    generatorsForm.setFontSize("20px");
    generatorsForm.loadStruct(items,function() {
        generatorsForm.setItemFocus("batch_number");
        generatorsForm.setItemValue("decommission_date",logic.getDateTime());
        generatorsForm.setItemValue("decommission_username", A.UserName);
    });

    generatorsGrid = new dhtmlXGridObject(generatorsForm.getContainer('gridActiveGenerators'));
    generatorsGrid.setImagePath(A.imagePath);
    generatorsGrid.setStyle("", "font-size:20px","", "","","");
    generatorsGrid.setHeader("id, BatchNo, Supplier, Arrival, Arrival User, Decommission");
    generatorsGrid.attachHeader("&nbsp;,#text_filter,#combo_filter,&nbsp;,#select_filter,&nbsp;");
    generatorsGrid.setColumnIds("generator_id,batch_number,supplier_name,arrival_date,arrival_username,decommission_date");         //sets the columns' ids
    generatorsGrid.setDateFormat("%Y-%m-%d %H:%i:%s");
    generatorsGrid.setColTypes("ro,ro,ro,ro,ro,ro");
    generatorsGrid.setColSorting('int,str,str,date,str,date');

    generatorsGrid.setInitWidths('100,120,220,200,150,200');
    generatorsGrid.load("data/gridGeneratorsActive.php",function(){
        generatorsGrid.sortRows(3,"date","des");

    });

    generatorsGrid.init();

    // set event
    // Decommission or cancel
    generatorsForm.attachEvent("onButtonClick", function (btnName) {
        // save or cancel
        formbarcode = generatorsForm.getItemValue("barcode");
        if (btnName == "cancel") {
            generatorsForm.unload();
        } else if (!formbarcode) {
            dhtmlx.alert("Please scan a barcode")
        } else if (generatorsGrid.isItemExists(formbarcode) == true) {
            //message-related initialization
            dhtmlx.confirm({
                title: "Close",
                type:"confirm-warning",
                text: "Are you sure you want to do it?",
                callback: function() {dhtmlx.message("User Pressed Yes");}
            });
        } else dhtmlx.alert("Please scan a valid generator")
    });
}



function generatorsFillForm(id){

    var items = [
        {type: "settings", position: "label-left", labelWidth: 130, inputWidth: 260},
        {type: "input",     name: "generator_id",       label: "id",            tooltip: "id",  required: "false", hidden: "true", offsetTop: 40},
        {type: "input",     name: "batch_number",       label: "Batch No",      tooltip: "Supplier Batch Number", required: "true", validate: "NotEmpty", hidden: "false"},
        {type: "combo",     name: "supplier_name",      label: "Supplier",      tooltip: "Supplier Name", required: "true", validate: "NotEmpty", filtering: "true", connector: "data/lstSuppliers.php"},
        {type: "calendar",  name: "arrival_date",       label: "ArrivalDate",   dateFormat: "%Y-%m-%d %H:%i:%s", enableTime: "true", calendarPosition: "right", tooltip: "Arrival Date", required: "true", validate: "NotEmpty", hidden: "false"},
        {type: "input",     name: "arrival_username",   label: "StaffID",       tooltip: "Username", required: "true", validate: "NotEmpty", hidden: "false"},
        { type: "block", id: "buttons", width: 300,
            list: [
                {type: "button", value: "Save", name: "Save"},
                {type: "newcolumn"},
                {type: "button", value: "Cancel", name: "cancel"}
            ]}
    ];
    //clear the workspace
    generatorsClearCanvas();

    //attach form
    generatorsForm = generatorsLayout.cells("a").attachForm();
    generatorsForm.setFontSize("20px");
    generatorsForm.loadStruct(items,function() {
        generatorsForm.setItemFocus("batch_number");
        generatorsForm.setItemValue("arrival_date",logic.getDateTime());
        generatorsForm.setItemValue("arrival_username", A.UserName);
        combo = generatorsForm.getCombo("supplier_name");
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