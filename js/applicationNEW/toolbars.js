/**
 * Created by nucmed on 17/11/2015.
 */
var toolbarItems = {
    generator: [
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
    ],
    home: [
        {type: "button", id: "btnDecomission", text: "Decomission", img: "", imgdis: "", title: "Add New"},
        {type: "separator", id: "sep01"},
        {type: "button", id: "btnWaste", text: "Waste", img: "", title: "Inventory"},
        {type: "separator", id: "sep02"},
        {type: "button", id: "btnPrintTest", text: "PrintTest", img: "", title: "PrintTest"},
        {type: "separator", id: "sep03"},
        {type: "button", id: "btnPrintBatchTest", text: "PrintBatchTest", img: "", title: "PrintBatchTest"},
        {type: "separator", id: "sep04"}
    ],
    patient: [
        {type: "button", id: "btnWorklist", text: "Worklist", img: "", imgdis: "", title: "Worklist"},
        {type: "separator", id: "sep01"},
        {type: "button", id: "btnAllToday", text: "All Today", img: "", title: "All Today"},
        {type: "separator", id: "sep02"},
        {type: "button", id: "btnLast2Days", text: "Last 2 Days", img: "", title: "Last 2 Days"},
        {type: "separator", id: "sep03"},
        {type: "button", id: "btnLast7Days", text: "Last 7 Days", img: "", title: "Last 7 Days"},
        {type: "separator", id: "sep04"}
    ],
    doses: [
        {type: "button", id: "btnDispense", text: "Dispense", img: "", imgdis: "", title: "Worklist"}
    ],
    admin: [
        {type: "button", id: "btnDispense", text: "Dispense", img: "", imgdis: "", title: "Worklist"}
    ]
};