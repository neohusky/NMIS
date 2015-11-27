<?php
include_once("db_connect.php");

$mysqli=connectdb();
$userid = $_GET['userid'];

if($_SESSION['level']<2){
	if($userid!=$_SESSION['userid']){
		exit;
	}
}

$stmt = $mysqli->prepare("SELECT Name, Username, Email, UserLevel FROM users WHERE UserID=?");

if(!$stmt->bind_param('i',  $userid)){
    echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
}
$stmt->execute();
$stmt->bind_result($rname, $rusername, $remail, $ruserlevel);

$json = array();
while($row = $stmt->fetch()){

	$json[0]['Name'] = $rname;
	$json[0]['Email'] = $remail;
	$json[0]['Username'] = $rusername;
	$json[0]['UserLevel'] = $ruserlevel;
}
echo json_encode($json);
$mysqli->close();
exit;
?>
