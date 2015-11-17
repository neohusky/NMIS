/**
 * Created by nucmed on 17/11/2015.
 */
var settings = {
    form: function () {
        var settingsForm;
        var settingsTabbar;
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
                        { type:"input", name:"App_TimeOut", label:"Application Timeout (s)", labelWidth:"250", inputWidth:"250", labelLeft:"450", labelTop:"50", inputLeft:"450", inputTop:"296"},
                        { type:"fieldset", name:"data3", label:"HotlabConnect", inputWidth:"auto"	, list:[
                            { type:"input", name:"App_HotlabConnectServer", label:"Hotlab Connect Server", labelWidth:"250", inputWidth:"250", labelLeft:"250", labelTop:"50", inputLeft:"175", inputTop:"296"},
                            { type:"input", name:"App_HotlabConnectPort", label:"Hotlab Connect Port", labelWidth:"250", inputWidth:"250", labelLeft:"250", labelTop:"50", inputLeft:"175", inputTop:"296"},
                            { type: "block",width: 300,
                                list: [
                                    {type: "button", value: "reboot", name: "Reboot"},
                                    {type: "newcolumn"},
                                    {type: "button", value: "config", name: "Config"}
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
        callbacks.clearDashboard();
        settingsTabbar = appLayout.cells("a").attachTabbar({
            tabs: [
                {id: "a1", label: "Tab 1", active: true},
                {id: "a2", label: "Tab 2"},
                {id: "a3", label: "Tab 3"}
            ]
        });

        settingsForm = settingsTabbar.cells("a1").attachForm();
        settingsForm.loadStruct(items, function(){
            settingsTabbar.cells("a2").attachObject("tab2");
            settingsTabbar.cells("a3").attachObject("tab3");
        });
    }
};