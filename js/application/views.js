/**
 * Created by nucmed on 17/11/2015.
 */
var view = {
    settings: function () {
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
        callbacks.clearDashboard();
        settingsTabbar = appLayout.cells("a").attachTabbar({
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
                callbacks.clearDashboard();
            } else if (btnName == "reboot") {
                callbacks.GetHotlabData("reboot");
            } else if (btnName == "config") {
                callbacks.openHotlabConnectConfig();
            } else if (settingsForm.validate()) {
                settingsForm.save();
                callbacks.clearDashboard();
            }
        });
        // set Data Processor
        var dp = new dataProcessor("data/FormSettings.php");
        dp.init(settingsForm);


    },
    generatorEntry: function (id) {

            var items = [
                {type: "settings", position:"label-left", labelWidth:"250", inputWidth:"250" },
                { type: "fieldset", name: "data", label: "Generator Entry", inputWidth: "auto",
                    list: [

                        {type: "input", name: "id", label: "id", tooltip: "id", required: "false", hidden: "true"},
                        {
                            type: "input",
                            name: "BatchNo",
                            label: "Batch No",
                            tooltip: "Supplier Batch Number",
                            required: "true",
                            validate: "NotEmpty",
                            hidden: "false"
                        },
                        {
                            type: "combo",
                            name: "Supplier",
                            label: "Supplier",
                            value: "",
                            tooltip: "Supplier Name",
                            required: "true",
                            validate: "NotEmpty",
                            filtering: "true",
                            connector: "data/lstSuppliers.php"
                        },
                        {
                            type: "calendar",
                            name: "ArrivalDate",
                            label: "ArrivalDate",
                            value: "",
                            dateFormat: "%Y-%m-%d %H:%i:%s",
                            enableTime: "true",
                            calendarPosition: "right",
                            tooltip: "Arrival Date",
                            required: "true",
                            validate: "NotEmpty",
                            hidden: "false"
                        },
                        {
                            type: "input",
                            name: "Username",
                            label: "StaffID",
                            tooltip: "Username",
                            required: "true",
                            validate: "NotEmpty",
                            hidden: "false"
                        }
                    ]
                },


                // buttons
                {
                    type: "block", id: "buttons", width: 300,
                    list: [
                        {type: "button", value: "Save", name: "save"},
                        {type: "newcolumn"},
                        {type: "button", value: "Cancel", name: "cancel"}
                    ]
                }
            ];
            //callbacks.clearDashboard();

            generatorForm = appLayout.cells("a").attachForm();
            generatorForm.setFontSize("20px");
            generatorForm.loadStruct(items,function() {
                //mainForm.setItemFocus("BatchNo");
                generatorForm.setItemValue("ArrivalDate",callbacks.getDateTime());
                generatorForm.setItemValue("Username",config.UserName);
            });
            if ( id >= 0){
                generatorForm.load("data/FormGenerators.php?id="+id);
            }
            // enable validation
            generatorForm.enableLiveValidation(true);


            // set event
            // save or cancel
            generatorForm.attachEvent("onButtonClick", function (btnName) {
                // save or cancel
                if (btnName == "cancel") {
                    callbacks.clearDashboard();
                } else if (generatorForm.validate()) {
                    generatorForm.save();
                    callbacks.clearDashboard();
                }
            });
            // set Data Processor
            var dp = new dataProcessor("data/FormGenerators.php");
            dp.init(generatorForm);
    },
    generatorGrid : function() {

        appGrid = appLayout.cells("a").attachGrid();
        appGrid.setImagePath(config.imagePath);
        appGrid.setHeader("id, BatchNo, Supplier, ArrivalDate");
        appGrid.setColTypes("ro,ro,ro,ro");
        appGrid.setColSorting('str,str,str,str');
        appGrid.setInitWidths('*,*,*,*');
        appGrid.load("data/gridGenerators.php");
        appGrid.init();

        appGrid.attachEvent("onRowDblClicked", function(rowId){
            console.log(rowId);
            view.generatorEntry(parseInt(rowId));
        });
        appGrid.attachEvent("onRowSelect", function(rowId){
            callbacks.setToolbarItemStates();
        });

    }
};