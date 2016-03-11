var mainSidebar;
var mainToolbar;
var win;
var LoginForm;
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
			//{type: "button", id: "add", img: "add.png"},
			//{type: "button", id: "save", img: "save.png"},
			{type: "button", id: "btnUser", text: "&nbsp;"}
		]
	});
	if (A.UserName = "" || A.UserName === null) {
		mainToolbar.setItemText("btnUser",window.dhx4.template("<span style='font-size: 14px;'>#text#</span>", {text:"Login"}));
	} else {
		mainToolbar.setItemText("btnUser",window.dhx4.template("<span style='font-size: 14px;'>#text#</span>", {text: A.StaffName}));
	}

	loginWindow();


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



function loginWindow(){
	var myForm, formData;

	var myWins= new dhtmlXWindows();
	win = myWins.createWindow("login", 50, 50,300, 300);
	win.hideHeader();
	win.center();
	win.denyMove();
	win.denyResize();
	win.setModal(true);
	win.attachHTMLString('<div class="login_form"><form id="realForm" action="./data/check.php" method="POST" target="submit_ifr"><div id="dhxForm"></div></form></div><iframe border="0" frameBorder="0" name="submit_ifr" class="submit_iframe"></iframe>');

	formData = [
		{type: "settings", position: "label-left", labelWidth: 75, inputWidth: 150},
		{type: "block", blockOffset: 30, offsetTop: 15, width: "auto", list: [
			{type: "label", label: "Please introduce yourself", labelWidth: "auto", offsetLeft: 35},
			{type: "input", label: "Login", name: "dhxform_demo_login", value: "", offsetTop: 20},
			{type: "password", label: "Password", name: "dhxform_demo_pwd", value: ""},
			{type: "button", name: "submit", value: "Let me in", offsetTop: 20, offsetLeft: 72}
		]}
	];

	LoginForm = new dhtmlXForm("dhxForm", formData);

	LoginForm.attachEvent("onButtonClick", function(name) {
		// submit real form when user clicks Submit button on a dhtmlx form
		if (name == "submit") {
			document.getElementById("realForm").submit();
		}
	});

}
//for login form
function submitCallback(status) {
	if (status == 1) {
		A.UserName = LoginForm.getItemValue("dhxform_demo_login");
		logic.getUserDetails();
		//document.location.href = "secret.html";
		win.close();
		//Update toolbar with Logged in user info
		mainToolbar.setItemText("btnUser",window.dhx4.template("<span style='font-size: 14px;'>#text#</span>", {text: A.UserName}));

	} else {
		// reset form
		A.UserName = "";
		dhtmlx.alert("You do not have permission to access this application")
		myForm.setFormData({dhxform_demo_login: "", dhxform_demo_pwd: ""});

	}
}
window.dhx4.attachEvent("init", appInit);
window.dhx4.attachEvent("unload", appUnload);