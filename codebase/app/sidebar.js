/**
 * Created by theokitsos on 28/12/2015.
 */
var mainSidebar;
var mySidebars = {};
var mySidebarItems = {
    recent: [
        {id: "documents", text: "Documents", icon: "documents.png"},
        {id: "music", text: "Music", icon: "music.png"},
        {id: "pictures", text: "Pictures", icon: "pictures.png"},
        {id: "video", text: "Video", icon: "video.png"}
    ],
    admin: [
        {id: "setting1", text: "setting1", icon: "disk_c.png"},
        {id: "setting2", text: "setting2", icon: "disk_d.png"},
        {id: "setting3", text: "setting3", icon: "disk_e.png"}
    ]
};
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
                {id: "home", text: "Home", icon: "home.png", selected: false},
                {id: "patients", text: "Patients", icon: "patients.png", selected: false},
                {id: "generators", text: "Generators", icon: "generators.png", selected: false},
                {id: "eluates", text: "Eluates", icon: "eluates.png", selected: false},
                {id: "kits", text: "Kits", icon: "kits.png", selected: false},
                {id: "ordering", text: "Ordering", icon: "ordering.png", selected: false},
                {id: "sep01", type: "separator", selected: false},
                {id: "admin", text: "Administration", icon: "admin.png", selected: false}
            ]
        });
        appLayout.cells("a").hideHeader();


        // allow click for already selected
        mainSidebar._setItemActive2 = mainSidebar._setItemActive;
        mainSidebar._setItemActive = function(id, callEvent) {
            if (this.conf.selected == id && callEvent == true) {
                this.callEvent("onSelect", [this.conf.selected, this.conf.selected]);
                return;
            }
            this._setItemActive2.apply(this, arguments);
        };
        //mainSidebar.cells("home").attachEvent("onSelect",view.dashboard());
        //mainSidebar.cells("generators").attachEvent("onSelect",view.generators());

        mainSidebar.attachEvent("onSelect", function(id){

            switch(id) {

                case "home":
                    view.dashboard();

                    break;
                case "generators":
                    view.generators();
                    break;
                case "kits":
                    view.kits();
                    break;
                case "admin":
                    this.cells(id).attachHTMLString("<div style='font-family: Tahoma,Helvetica; font-size: 11px; padding: 6px 10px; text-align: center;'>"+this.cells(id).getText().text+"</div>");
                    dhtmlx.message(mainSidebar[id]);

                    break;

            }

        });
        mainSidebar.cells("home").setActive(true);
    }
};