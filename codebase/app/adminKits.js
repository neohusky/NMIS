/**
 * Created by theokitsos on 6/01/2016.
 */
var adminKitsGrid;
var adminKitsLayout;
var adminKitsToolbar;
var adminKitsForm;



function adminKitsInit(cell) {

    if (adminKitsLayout == null) {


        // init layout
        adminKitsLayout = cell.attachLayout("1C");
        adminKitsLayout.cells("a").hideHeader();

        // attach toolbar

        adminKitsToolbar = adminKitsLayout.cells("a").attachToolbar({
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
        adminKitsToolbar.attachEvent("onClick", function (id) {
            if (id == "btnAddNew") generatorsFillForm();
            if (id == "btnDecommission") generatorsDecommission();
            if (id == "btnInventory") generatorsInventory();
            if (id == "btnEdit") generatorsFillForm(generatorsGrid.getSelectedRowId());
            if (id == "btnReprint") contactsInit(cell);
        });
    }





}

function kitEntryForm(id){

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
    //generatorsClearCanvas();

    //attach form
    kitForm = adminSidebar.cells("kits").attachForm();
    kitForm.setFontSize("20px");
    kitForm.loadStruct(items,function() {
        kitForm.setItemFocus("batch_number");
        kitForm.setItemValue("arrival_date",logic.getDateTime());
        kitForm.setItemValue("arrival_username", A.UserName);
        combo = kitForm.getCombo("supplier_name");
    });

    if ( id >= 0){
        kitForm.load("data/formGenerators.php?id="+id);
    }
    // enable validation
    kitForm.enableLiveValidation(true);

    kitForm.setSizes();

    // set event
    // save or cancel
    kitForm.attachEvent("onButtonClick", function (btnName) {
        // save or cancel
        if (btnName == "cancel") {
            kitForm.unload();
        } else if (generatorsForm.validate()) {
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
            kitForm.unload();
        }
        //if updating a generator then this
        if (action == "updated") {
            //console.log(tid);
            generatorsID = tid;
            //Print label of updated generator
            logic.printLabel("generator",tid,1);

            kitForm.unload();
            //generatorsInventory(generatorsID);





        }
    });
}







window.dhx4.attachEvent("onSidebarSelect", function(id, cell){
    if (id == "adminKits") adminInit(cell);
});