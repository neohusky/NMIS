var mainSidebar;
var mainToolbar;

function appInit() {

	// init sidebar
	mainSidebar = new dhtmlXSideBar({
		parent: document.body,
		skin: "dhx_web",
		icons_path: A.imagePath+"sidebar/",
		width: 110,
		template: "icons_text",
		items: [
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

	// init toolbar
	mainToolbar = mainSidebar.attachToolbar({
		icons_size: 32,
		icons_path: A.imagePath+"toolbar/",
		items: [
			{type: "text", id: "title", text: "&nbsp;"},
			{type: "spacer"},
			{type: "button", id: "add", img: "add.png"},
			{type: "button", id: "save", img: "save.png"}
		]
	});

	mainSidebar.attachEvent("onSelect", function(id){
		mainToolbar.setItemText("title", window.dhx4.template("<span style='font-weight: bold; font-size: 14px;'>#text#</span>", {text:mainSidebar.cells(id).getText().text}));
		window.dhx4.callEvent("onSidebarSelect", [id, this.cells(id)]);
	});

	mainSidebar.cells("home").setActive(true);

}

function appUnload() {
	if (mainSidebar != null && mainSidebar.unload != null) {
		mainSidebar.unload();
		mainSidebar = null;
	}
}

window.dhx4.attachEvent("init", appInit);
window.dhx4.attachEvent("unload", appUnload);