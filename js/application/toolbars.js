/**
 * Created by nucmed on 17/11/2015.
 */
var toolbar = {
    // Toolbar methods

    // Main Toolbar
    main: function () {
        // create toolbar
        var appToolbar;
        var items = [
            {type: "button", id: "btnHome", text: "", img: "home.png", imgdis: "", title: "Home"},
            {type: "separator", id: "sep01"},
            {type: "button", id: "btnPatients", text: "", img: "patients.png", title: "Worklists"},
            {type: "separator", id: "sep02"},
            {type: "button", id: "btnGenerators", text: "", img: "generators.png", title: "Generators"},
            {type: "button", id: "btnEluates", text: "", img: "eluates.png", title: "Eluates"},
            {type: "button", id: "btnKits", text: "", img: "kits.png", title: "Kits"},
            {type: "button", id: "btnDoses", text: "", img: "doses.png", title: "Dose"},
            {type: "button", id: "btnOrdering", text: "", img: "ordering.png", title: "Ordering"},
            {type: "button", id: "btnAdmin", text: "", img: "admin.png", title: "Administration"},
            {type: "button", id: "btnSettings", text: "", img: "settings.png", title: "settings"},
            {type: "button", id: "btnLogout", text: "", img: "exit.png", title: "logout"},
            {type: "button", id: "btnUser", text: "user", img: "user.png", title: ""}

        ];
        appToolbar = appLayout.attachToolbar();
        appToolbar.setIconsPath(config.iconPath);
        appToolbar.setIconSize(48);
        appToolbar.loadStruct(items);


        // attach toolbar events
        appToolbar.attachEvent("onClick", function (id) {
            switch (id) {
                case "btnHome": toolbar.home(); break;
                case "btnPatients": callbacks.removeClick(); break;
                case "btnGenerators": toolbar.generators(); break;
                case "btnEluates": callbacks.removeClick(); break;
                case "btnKits": callbacks.addClick(); break;
                case "btnDoses": callbacks.removeClick(); break;
                case "btnOrdering": callbacks.addClick(); break;
                case "btnAdmin": callbacks.removeClick(); break;
                case "btnSettings": settings.form(); break;
                case "btnLogout": callbacks.addClick(); break;
                case "btnUser": callbacks.removeClick(); break;
                default: break;
            }
        });

    },
    generators: function () {
        var subToolbar;
        var items = [
            {type: "button", id: "btnAddNew", text: "AddNew", img: "", imgdis: "", title: "Add New"},
            {type: "separator", id: "sep01"},
            {type: "button", id: "btnDecommission", text: "Decommission", img: "", title: "Decommission"},
            {type: "separator", id: "sep02"},
            {type: "button", id: "btnInventory", text: "Inventory", img: "", title: "Inventory"},
            {type: "separator", id: "sep03"}
        ];

        callbacks.clearDashboard();

        subToolbar = appLayout.cells("a").attachToolbar();
        subToolbar.loadStruct(items);
        // attach toolbar events
        subToolbar.attachEvent("onClick", function (id) {
            switch (id) {
                case "btnAddNew": callbacks.showPopup(); break;
                case "btnDecommission": dhtmlx.alert("generator:Decomission"); break;
                case "btnInventory": dhtmlx.alert("Inventory"); break;
                default: break;
            }
        });
    },
    home: function () {
        var subToolbar;
        var items = [
            {type: "button", id: "btnDecomission", text: "Decomission", img: "", imgdis: "", title: "Add New"},
            {type: "separator", id: "sep01"},
            {type: "button", id: "btnWaste", text: "Waste", img: "", title: "Inventory"},
            {type: "separator", id: "sep02"}
        ];

        callbacks.clearDashboard();
        
        subToolbar = appLayout.cells("a").attachToolbar();
        subToolbar.loadStruct(items);

        subToolbar.attachEvent("onClick", function (id) {
            switch (id) {
                case "btnDecomission": dhtmlx.alert("home:Decomission"); break;
                case "btnWaste": dhtmlx.alert("home:Waste"); break;

                default: break;
            }
        });
    }
};



