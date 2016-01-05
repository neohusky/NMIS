/**
 * Created by theokitsos on 28/12/2015.
 */
var mySidebars = {};
var mySidebarItems = {
    recent: [
        {id: "documents", text: "Documents", icon: "documents.png"},
        {id: "music", text: "Music", icon: "music.png"},
        {id: "pictures", text: "Pictures", icon: "pictures.png"},
        {id: "video", text: "Video", icon: "video.png"}
    ],
    pc: [
        {id: "disk_c", text: "Windows (C:)", icon: "disk_c.png"},
        {id: "disk_d", text: "Data (D:)", icon: "disk_d.png"},
        {id: "disk_e", text: "DVD RW (E:)", icon: "disk_e.png"}
    ]
};
function doOnLoad() {
    mySidebars.main = new dhtmlXSideBar({
        parent: "sidebarObj",
        icons_path: "../common/win_16x16/",
        width: 130,
        items: [
            {id: "recent", text: "Recent", icon: "recent.png"},
            {id: "pc", text: "PC", icon: "desktop.png"}
        ]
    });

    // allow click for already selected
    mySidebars.main._setItemActive2 = mySidebars.main._setItemActive;
    mySidebars.main._setItemActive = function(id, callEvent) {
        if (this.conf.selected == id && callEvent == true) {
            this.callEvent("onSelect", [this.conf.selected, this.conf.selected]);
            return;
        }
        this._setItemActive2.apply(this, arguments);
    };

    // control nested sidebars
    mySidebars.main.attachEvent("onSelect", function(id){
        // attach on first activation
        if (mySidebars[id] == null) {
            mySidebars[id] = mySidebars.main.cells(id).attachSidebar({
                icons_path: "../common/win_16x16/",
                autohide: true,
                width: 130,
                items: mySidebarItems[id]
            });
            mySidebars[id].attachEvent("onSelect", function(id){
                this.cells(id).attachHTMLString("<div style='font-family: Tahoma,Helvetica; font-size: 11px; padding: 6px 10px; text-align: center;'>"+this.cells(id).getText().text+"</div>");
            });
        }
        if (mySidebars[id].conf.last_id2 == id && mySidebars[id].sideCover != null) {
            mySidebars[id].hideSide();
        } else {
            mySidebars[id].showSide();
            mySidebars[id].conf.last_id2 = id;
        }
        //mySidebars[id].showSide();

    });
    mySidebars.main.cells("recent").setActive(true);
}