/**
 * Created by theokitsos on 13/10/2015.
 */
function onReboot() {

    window.location.href = "/reboot";
    alert("Rebooting Hotlab Connect!");
    //document.getElementById('myFrame').src = "http://10.7.145.156:8080/reboot";
    document.getElementById('myFrame').src = "/reboot";
};
function onShutdown() {

    window.location.href = "/shutdown";
    alert("Shutting down Hotlab Connect!");
    document.getElementById('myFrame').src = "/shutdown";
};
function onResetComm() {

    window.location.href = "/resetcomm";
};
function onPrintTest() {
    urlName = "/zpltest";


    var popup = window.open(urlName, "",'width=100,height=100');

    setTimeout(function(){popup.close()},1000);

    //window.location.href = "/zpltest";

   // window.location.href = "/";


};
function onCalReading() {

    document.getElementById('myFrame').src = "/getCalReading";
};
function onBarcode() {

    document.getElementById('myFrame').src = "/getBarcode";
};
function onCommPortList() {

    document.getElementById('myFrame').src = "/getCommPorts";
};
function onCalStatus() {

    document.getElementById('myFrame').src = "/getCalStatus";
};

function AsyncConfirmYesNo(title, msg, yesFn, noFn) {
    var $confirm = $("#modalConfirmYesNo");
    $confirm.modal('show');
    $("#lblTitleConfirmYesNo").html(title);
    $("#lblMsgConfirmYesNo").html(msg);
    $("#btnYesConfirmYesNo").off('click').click(function () {
        yesFn();
        $confirm.modal("hide");
    });
    $("#btnNoConfirmYesNo").off('click').click(function () {
        noFn();
        $confirm.modal("hide");
    });
}

function ShowConfirmYesNo() {
    AsyncConfirmYesNo(
        "Yes & No Confirmation Box",
        "Are you hungry?",
        MyYesFunction,
        MyNoFunction
    );
}


function MyYesFunction() {
    alert("Time to get off your workstation!");
    $("#lblTestResult").html("You are hungry");
}
function MyNoFunction() {
    alert("Well... just continue working.");
    $("#lblTestResult").html("You are not hungry");
}

function onRebootConfirm() {
    AsyncConfirmYesNo(
        "Reboot Confirmation",
        "Are you sure you want to reboot Hotlab Connect?",
        onReboot,doNothing
    );
}

function onShutdown() {
    AsyncConfirmYesNo(
        "Shutdown Confirmation",
        "Are you sure you want to shutdown Hotlab Connect?",
        onShutdown,doNothing
    );
}
function doNothing() {

}