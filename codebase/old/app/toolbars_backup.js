/**
 * Created by nucmed on 17/11/2015.
 */
var toolbar = {
    // Toolbar methods

    // Main Toolbar
    main: function () {
        // create toolbar
        var items = [
            {type: "buttonTwoState", id: "btnHome", text: "", img: "home.png", imgdis: "", title: "Home"},
            {type: "separator", id: "sep01"},
            {type: "buttonTwoState", id: "btnPatients", text: "", img: "patients.png", imgdis: "", title: "Worklists"},
            {type: "separator", id: "sep02"},
            {type: "buttonTwoState", id: "btnGenerators", text: "", img: "generators.png", imgdis: "", title: "Generators"},
            {type: "buttonTwoState", id: "btnEluates", text: "", img: "eluates.png",imgdis: "", title: "Eluates"},
            {type: "buttonTwoState", id: "btnKits", text: "", img: "kits.png", imgdis: "", title: "Kits"},
            {type: "buttonTwoState", id: "btnDoses", text: "", img: "doses.png", imgdis: "", title: "Dose"},
            {type: "buttonTwoState", id: "btnOrdering", text: "", img: "ordering.png", imgdis: "", title: "Ordering"},
            {type: "buttonTwoState", id: "btnAdmin", text: "", img: "admin.png", imgdis: "", title: "Administration"},
            {type: "buttonTwoState", id: "btnSettings", text: "", img: "settings.png", imgdis: "", title: "settings"},
            {type: "buttonTwoState", id: "btnLogout", text: "", img: "exit.png", imgdis: "", title: "logout"},
            {type: "buttonTwoState", id: "btnUser", text: "user", img: "user.png", imgdis: "", title: ""},
            {type: "buttonInput", id: "txtBarcode",title:"Barcode", width: "120"	}
        ];
        appToolbar = appLayout.attachToolbar();
        appToolbar.setIconsPath(config.iconPath);
        appToolbar.setIconSize(48);
        appToolbar.loadStruct(items,function(){

        });
        appToolbar.addSpacer("btnUser");

        // attach toolbar events
        appToolbar.attachEvent("onClick", function (id) {
            switch (id) {
                case "btnHome": toolbar.home(); break;
                case "btnPatients": toolbar.patient(); break;
                case "btnGenerators": toolbar.generators(); break;
                case "btnEluates": toolbar.eluates(); break;
                case "btnKits": toolbar.kits(); break;
                case "btnDoses": toolbar.doses(); break;
                case "btnOrdering": toolbar.ordering(); break;
                case "btnAdmin": toolbar.admin(); break;
                case "btnSettings": view.settings(); break;
                case "btnLogout": callbacks.addClick(); break;
                case "btnUser": callbacks.removeClick(); break;
                default: break;
            }
        });
        appToolbar.attachEvent("onEnter", function (id, value) {
            dhtmlx.message("<b>onEnter event</b>was fired for input "+id+" and the value was "+value);
        });
        appToolbar.attachEvent("onStateChange", function (id,state) {;
            appToolbar.forEachItem(function(itemid){
                if (itemid!== id) {
                    appToolbar.setItemState(itemid, false);
                }
                else {
                    if (state = true) {
                        appToolbar.setItemState(itemid, true)
                    }
                }
            });
            switch (id) {
                case "btnHome": toolbar.home(); break;
                case "btnPatients": toolbar.patient(); break;
                case "btnGenerators": toolbar.generators(); break;
                case "btnEluates": toolbar.eluates(); break;
                case "btnKits": toolbar.kits(); break;
                case "btnDoses": toolbar.doses(); break;
                case "btnOrdering": toolbar.ordering(); break;
                case "btnAdmin": toolbar.admin(); break;
                case "btnSettings": view.settings(); break;
                case "btnLogout": callbacks.addClick(); break;
                case "btnUser": callbacks.removeClick(); break;
                default: break;
            }
        });
    },
    generators: function () {

        var items = [
            {type: "button", id: "btnAddNew", text: "AddNew", img: "", imgdis: "", title: "Add New"},
            {type: "separator", id: "sep01"},
            {type: "button", id: "btnDecommission", text: "Decommission", img: "", title: "Decommission"},
            {type: "separator", id: "sep02"},
            {type: "button", id: "btnInventory", text: "Inventory", img: "", title: "Inventory"},
            {type: "separator", id: "sep03"},
            {type: "button", id: "btnEdit", text: "Edit", img: "", title: "Edit", enabled:"false"},
            {type: "separator", id: "sep04", hidden: "true", enabled:"false"},
            {type: "button", id: "btnReprint", text: "Reprint", img: "", title: "Reprint", enabled:"false"},
            {type: "separator", id: "sep05", hidden: "true", enabled:"false"}
        ];

        callbacks.clearDashboard();

        appSubToolbar = appLayout.cells("a").attachToolbar();
        appSubToolbar.loadStruct(items);
        // Setup toolbar
        // attach toolbar events
        appSubToolbar.attachEvent("onClick", function (id) {
            switch (id) {
                case "btnAddNew": view.generatorEntry(); break;
                case "btnDecommission": dhtmlx.alert("generator:Decomission"); break;
                case "btnInventory": view.generatorGrid();
                    callbacks.setToolbarItemStates();
                    break;
                case "btnEdit": view.generatorEntry(parseInt(appGrid.getSelectedRowId())); break;
                case "btnReprint": logic.printLabel("generator",parseInt(appGrid.getSelectedRowId()),1);
                    console.log(parseInt(appGrid.getSelectedRowId));
                    break;
                default: break;
            }
        });
    },
    home: function () {

        var items = [
            {type: "button", id: "btnDecomission", text: "Decomission", img: "", imgdis: "", title: "Add New"},
            {type: "separator", id: "sep01"},
            {type: "button", id: "btnWaste", text: "Waste", img: "", title: "Inventory"},
            {type: "separator", id: "sep02"},
            {type: "button", id: "btnPrintTest", text: "PrintTest", img: "", title: "PrintTest"},
            {type: "separator", id: "sep03"},
            {type: "button", id: "btnPrintBatchTest", text: "PrintBatchTest", img: "", title: "PrintBatchTest"},
            {type: "separator", id: "sep04"}
        ];

        callbacks.clearDashboard();
        //appSubToolbar = new dhtmlXToolbarObject("tlb");
        appSubToolbar = appLayout.cells("a").attachToolbar();
        appSubToolbar.loadStruct(items);

        appSubToolbar.attachEvent("onClick", function (id) {
            switch (id) {
                case "btnDecomission": dhtmlx.alert("home:Decomission"); break;
                case "btnWaste": dhtmlx.alert("home:Waste"); break;
                case "btnPrintTest": logic.printLabel("generator",2,3); break;
                case "btnPrintBatchTest": logic.getLastAddedId("generator"); break;
                default: break;
            }
        });
        view.dashboard();

    },
    patient: function () {

        var items = [
            {type: "button", id: "btnWorklist", text: "Worklist", img: "", imgdis: "", title: "Worklist"},
            {type: "separator", id: "sep01"},
            {type: "button", id: "btnAllToday", text: "All Today", img: "", title: "All Today"},
            {type: "separator", id: "sep02"},
            {type: "button", id: "btnLast2Days", text: "Last 2 Days", img: "", title: "Last 2 Days"},
            {type: "separator", id: "sep03"},
            {type: "button", id: "btnLast7Days", text: "Last 7 Days", img: "", title: "Last 7 Days"},
            {type: "separator", id: "sep04"}
        ];

        callbacks.clearDashboard();

        appSubToolbar = appLayout.cells("a").attachToolbar();
        appSubToolbar.loadStruct(items);

        appSubToolbar.attachEvent("onClick", function (id) {
            switch (id) {
                case "btnWorklist": view.patientWorklist(); break;
                case "btnAllToday": dhtmlx.alert("All Today"); break;
                case "btnLast2Days": dhtmlx.alert("Last 2 Days"); break;
                case "btnLast7Days": dhtmlx.alert("Last 7 Days"); break;
                default: break;
            }
        });
    },
    doses: function () {

        var items = [
            {type: "button", id: "btnDispense", text: "Dispense", img: "", imgdis: "", title: "Worklist"}

        ];

        callbacks.clearDashboard();

        appSubToolbar = appLayout.cells("a").attachToolbar();
        appSubToolbar.loadStruct(items);

        appSubToolbar.attachEvent("onClick", function (id) {
            switch (id) {
                case "btnDispense": view.dispensePtDose(); break;
                default: break;
            }
        });
    },
    admin: function () {
        callbacks.clearDashboard();
        view.admin();
    }
};
