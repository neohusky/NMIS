/**
 * Created by theokitsos on 6/01/2016.
 */
var settingsTabbar;
var settingsForm;
var adminSettingsLayout;




function adminSettingsInit(cell) {

    if (adminSettingsLayout == null) {


        // init layout
        adminSettingsLayout = cell.attachLayout("1C");
        adminSettingsLayout.cells("a").hideHeader();

        // attach toolbar

/*        adminKitsToolbar = adminKitsLayout.cells("a").attachToolbar({
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
        });*/

        adminSettingsForm()
    }





}

function adminSettingsForm(){

    var items = [
        { type: "block", id:"tab1",
            list: [
                { type:"fieldset", name:"data1", label:"Dicom Worklist", inputWidth:"auto",
                    list:[
                        { type:"input", name:"DWL_ServerAET", label:"Server AET", labelWidth:"250", inputWidth:"250", labelLeft:"175", labelTop:"50", inputLeft:"175", inputTop:"121"},
                        { type:"input", name:"DWL_ServerIP", label:"Server IP Address", labelWidth:"250", inputWidth:"250", labelLeft:"175", labelTop:"50", inputLeft:"175", inputTop:"171"},
                        { type:"input", name:"DWL_ServerPort", label:"Server AET", labelWidth:"250", inputWidth:"250", labelLeft:"175", labelTop:"50", inputLeft:"175", inputTop:"71"},
                        { type:"input", name:"DWL_OwnAET", label:"NMIS AET", labelWidth:"250", inputWidth:"250", labelLeft:"175", labelTop:"50", inputLeft:"450", inputTop:"71"},
                        { type:"input", name:"DWL_OwnIP", label:"NMIS IP Address", labelWidth:"250", inputWidth:"250", labelLeft:"450", labelTop:"50", inputLeft:"450", inputTop:"121"}
                    ]
                }
            ]},
        // Tab2
        { type: "block", id:"tab2",
            list: [
                { type:"fieldset", name:"data2", label:"DWL Query Parameters", inputWidth:"auto",
                    list:[
                        { type:"input", name:"DWL_RefreshTime", label:"Auto Refresh Time (s)", labelWidth:"250", inputWidth:"250", labelLeft:"450", labelTop:"50", inputLeft:"450", inputTop:"196"},
                        { type:"input", name:"DWL_SearchModality", label:"Modality", labelWidth:"250", inputWidth:"250", labelLeft:"175", labelTop:"50", inputLeft:"175", inputTop:"296"}
                    ]
                }
            ]},

        // Tab3
        { type: "block", id:"tab3",
            list: [
                { type:"fieldset", name:"data3", label:"Application", inputWidth:"auto"	, list:[
                    { type:"input", name:"App_TimeOut", label:"Application Timeout (s)", labelWidth:"250", inputWidth:"400", labelLeft:"450", labelTop:"50", inputLeft:"475", inputTop:"296"},
                    { type:"fieldset", name:"data3", label:"HotlabConnect", inputWidth:"auto"	, list:[
                        { type:"input", name:"App_HotlabConnectServer", label:"Hotlab Connect Server", labelWidth:"250", inputWidth:"400", labelLeft:"250", labelTop:"50", inputLeft:"175", inputTop:"296"},
                        { type:"input", name:"App_HotlabConnectPort", label:"Hotlab Connect Port", labelWidth:"250", inputWidth:"400", labelLeft:"250", labelTop:"50", inputLeft:"175", inputTop:"296"},
                        { type: "block",width: 300,
                            list: [
                                {type: "button", value: "Reboot", name: "reboot"},
                                {type: "newcolumn"},
                                {type: "button", value: "Config", name: "config"}
                            ]
                        }
                    ]}
                ]}
            ]

        },
        // buttons
        { type: "block", id:"buttons", width: 300,
            list: [
                {type: "button", value: "Save", name: "save"},
                {type: "newcolumn"},
                {type: "button", value: "Cancel", name: "cancel"}
            ]
        }

    ];
    //clear the workspace
    //generatorsClearCanvas();

    //attach Tabbar
    settingsTabbar = adminSettingsLayout.cells("a").attachTabbar({
        tabs: [
            {id: "a1", label: "Tab 1", active: true},
            {id: "a2", label: "Tab 2"},
            {id: "a3", label: "Tab 3"}
        ]
    });

    settingsForm = settingsTabbar.cells("a1").attachForm();
    settingsForm.setFontSize("20px");
    settingsForm.loadStruct(items, function(){
        settingsTabbar.cells("a2").attachObject("tab2");
        settingsTabbar.cells("a3").attachObject("tab3");
    });

    settingsForm.load("data/formSettings.php?id=1");
    // enable validation
    settingsForm.enableLiveValidation(true);


    // set event
    settingsForm.attachEvent("onButtonClick", function(btnName) {
        // save or cancel
        if (btnName == "cancel") {
            adminSetingsClearCanvas();
        } else if (btnName == "reboot") {
            callbacks.GetHotlabData("reboot");
        } else if (btnName == "config") {
            callbacks.openHotlabConnectConfig();
        } else if (settingsForm.validate()) {
            settingsForm.save();
            adminSetingsClearCanvas();
        }
    });
    // set Data Processor
    var dp = new dataProcessor("data/FormSettings.php");
    dp.init(settingsForm);


}


function adminSetingsClearCanvas(){
    if (adminSettingsLayout.cells("a").getAttachedObject() != null){
        adminSettingsLayout.cells("a").detachObject()
    }

}




window.dhx4.attachEvent("onSidebarSelect", function(id, cell){
    if (id == "adminSettings") adminSettingsInit(cell);
});