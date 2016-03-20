/**
 * Created by theokitsos on 6/01/2016.
 */
var adminGrid;
var adminLayout;
var adminToolbar;
var adminForm;
var adminSidebar;
var kitForm;


function adminInit(cell) {

    if (adminLayout == null) {


        // init layout
        adminLayout = cell.attachLayout("1C");
        adminLayout.cells("a").hideHeader();


        // init sidebar
        adminSidebar = adminLayout.cells("a").attachSidebar({
            skin: "dhx_web",
            icons_path: A.imagePath+"sidebar/",
            width: 110,
            template: "text",
            header: false,           // boolean, true to enable the header
            autohide: false,          // boolean, true to enable autohide for navigation bar
            items: [
                {id: "kits", text: "Kits", icon: "kits.png", selected: false},
                {id: "staff", text: "Staff", icon: "staff.png", selected: false},

            ]
        });
        adminLayout.cells("a").hideHeader();
        adminSidebar.attachEvent("onSelect", function(id){
            //mainToolbar.setItemText("title", window.dhx4.template("<span style='font-weight: bold; font-size: 14px;'>#text#</span>", {text:mainSidebar.cells(id).getText().text}));
            switch(id) {

                case "kits":
                    kitEntryForm();

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

        //adminSidebar.cells("kits").setActive(true);



    }

}
window.dhx4.attachEvent("onSidebarSelect", function(id, cell){
    if (id == "admin") adminInit(cell);
});