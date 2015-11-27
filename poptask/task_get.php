<?php
include_once("db_connect.php");

$mysqli=connectdb();
$taskid = $_GET['taskid'];

$stmt = $mysqli->prepare("SELECT Title, Details, RRule, Time FROM tasks_master WHERE TaskID=?");

if(!$stmt->bind_param('i',  $_GET['taskid'])){
    echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
}
$stmt->execute();
$stmt->bind_result($rtasktitle, $rtaskdetails, $rrrule, $rtime);

$json = array();
while($row = $stmt->fetch()){
	$breaks = array("<br />","<br>","<br/>");  
	$rtaskdetails = str_ireplace($breaks, "\r\n", $rtaskdetails);
		
	$json[0]['Title'] = $rtasktitle;
	$json[0]['Details'] = $rtaskdetails;
	$json[0]['RRule'] = $rrrule;
	$json[0]['TheTime'] = substr($rtime,0,-3);
}
echo json_encode($json);
$mysqli->close();
exit;
?>
