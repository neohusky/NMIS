/**
 * Created by theokitsos on 28/12/2015.
 */
var sidebar = {
    main: function () {

        mainSidebar = appLayout.cells("a").attachSidebar({
            //parent:         "sidebarObj",   // id/object, container for sidebar
            skin: "dhx_web",  // string, sidebar skin, optional
            template: "icons_text",      // string, used template, "details" by default
            icons_path:   config.iconPath,
            single_cell: false,           // boolean, true to enable the single cell mode
            //bubble:         6,              // number, colored marker showing notifications count
            width: 110,            // number, width of the left part
            header: false,           // boolean, true to enable the header
            autohide: false,          // boolean, true to enable autohide for navigation bar
            //xml:            "sidebar.xml",  // string, path to xml config, optional
            //json:           "sidebar.json", // string, path to json config, optional
            //onload:         function(){},   // function, callback for xml/json, optional
            items: [
                // items config
                { id: "home", text: "Home",icon: "home.png",selected: true},
                { id: "patients", text: "Patients",icon: "patients.png",selected: false},
                { id: "generators", text: "Generators",icon: "generators.png",selected: false},
                { id: "eluates", text: "Eluates",icon: "eluates.png",selected: false},
                { id: "kits", text: "Kits",icon: "kits.png",selected: false},
                { id: "ordering", text: "Ordering",icon: "ordering.png",selected: false},
                { id: "sep01", type: "separator", selected: false},
                { id: "admin", text: "Administration",icon: "admin.png",selected: false}
            ]
        });
        appLayout.cells("a").hideHeader();
        mainSidebar.cells("home").attachEvent("onSelect",view.dashboard());
        mainSidebar.cells("generators").attachEvent("onSelect",view.generators());
    }

};