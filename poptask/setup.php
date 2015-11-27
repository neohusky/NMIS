<HTML>
<head>
<title>
Setup
</title>
</head>
<center>
<div style='width:500px;text-align:left;font-family:"Lucida Sans Unicode", "Lucida Grande", sans-serif; font-size:11px;'>
<H2 style="text-align:center;">Poptask Setup</H2>
<?php
error_reporting(0);
$dbsuccess=false;
$dberror="";
if ($_POST){
############## BEGIN FUNCTIONS ##############################
# FUNCTION TO TEST USERNAME AND PASSWORD IN MYSQL HOST
function db_connect($server, $username, $password, $link = 'db_link') {
	global $$link, $db_error;
	$db_error = false;
	if (!$server) {
		$db_error = 'No Server selected.';
		return false;
	}
	$$link = @mysql_connect($server, $username, $password) or $db_error = mysql_error();
	return $$link;
}
# FUNCTION TO SELECT DATABASE ACCESS
function db_select_db($database) {
	echo mysql_error();
	return mysql_select_db($database);
}
# FUNCTION TO TEST DATABASE ACCESS
function db_test_create_db_permission($database) {
	global $db_error;
	$db_created = false;
	$db_error = false;
	if (!$database) {
		$db_error = 'No Database selected.';
		return false;
	}
	if ($db_error) {
		return false;
	} else {
		if (!@db_select_db($database)) {
			$db_error = mysql_error();
			return false;
		}else {
			return true;
		}
	return true;
	}
}
############## END FUNCTIONS ##############################

	$db = array();
	$db['DB_SERVER'] = trim(stripslashes($_POST['mysqlserver']));
	$db['DB_SERVER_USERNAME'] = trim(stripslashes($_POST['mysqlusername']));
	$db['DB_SERVER_PASSWORD'] = trim(stripslashes($_POST['mysqlpassword']));
	$db['DB_DATABASE'] = trim(stripslashes($_POST['mysqldatabase']));
	$replytoemail = trim(stripslashes($_POST['replytoemail']));
	$db_error = false;
	db_connect($db['DB_SERVER'], $db['DB_SERVER_USERNAME'], $db['DB_SERVER_PASSWORD']);
	if ($db_error == false) {
		if (!db_test_create_db_permission($db['DB_DATABASE'])) {
			$error = $db_error;
		}
	} else {
		$error = $db_error;
	}
	if ($db_error == false) {
	
	$success =true;
	
	$my_file = 'config.ini.php';
	$handle = fopen($my_file, 'w') or die('Cannot open and write to file:  '.$my_file.', please check the web service has write permissions'); 
	$data .= ';<?php '."\r\n".';die(); // For further security '."\r\n".';/* '."\r\n"; 
	$data .= 'host'." = ".$db['DB_SERVER']."\r\n";
	$data .= 'username'." = ".$db['DB_SERVER_USERNAME']."\r\n";
	$data .= 'password'." = ".$db['DB_SERVER_PASSWORD']."\r\n";
	$data .= 'dbname'." = ".$db['DB_DATABASE']."\r\n";
	$data .= ';*/ '."\r\n".';?>';

	fwrite($handle, $data);
	$dbsuccess =true;
	}else{
		$dbsuccess=false;
	}
}if($_GET['s']=="2"){
$createautditsql="
CREATE TABLE IF NOT EXISTS `audit` (
	  `AuditID` int(11) NOT NULL AUTO_INCREMENT,
	  `UserID` int(11) NOT NULL,
	  `Editor` varchar(3000) NOT NULL,
	  `Formname` varchar(30) NOT NULL,
	  `Whenpost` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	  `IP` varchar(30) DEFAULT NULL,
	  KEY `auditID` (`AuditID`)
	) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;";

$createnotify="
CREATE TABLE IF NOT EXISTS `notify` (
	  `NotifyID` int(11) NOT NULL AUTO_INCREMENT,
	  `UserID` int(11) NOT NULL,
	  `TaskID` int(11) DEFAULT NULL,
	  `LastSent` date DEFAULT '0000-00-00',
	  KEY `NotifyID` (`NotifyID`)
	) ENGINE=MyISAM AUTO_INCREMENT=71 DEFAULT CHARSET=latin1;";


$createtaskmaster="
CREATE TABLE IF NOT EXISTS `tasks_master` (
	  `TaskID` int(10) NOT NULL AUTO_INCREMENT,
	  `Title` varchar(200) DEFAULT '0',
	  `Details` varchar(5000) DEFAULT '0',
	  `RRule` varchar(200) DEFAULT '0',
	  `Time` time NOT NULL DEFAULT '00:00:00',
	  `Added` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	  `Active` char(1) DEFAULT 'Y',
	  `Visible` char(1) DEFAULT NULL,
	  `Notify` char(1) DEFAULT 'N',
	  PRIMARY KEY (`TaskID`)
	) ENGINE=MyISAM AUTO_INCREMENT=35 DEFAULT CHARSET=latin1;";


$createtaskworking="
CREATE TABLE IF NOT EXISTS `tasks_working` (
	  `TaskWorkingID` int(10) NOT NULL AUTO_INCREMENT,
	  `TaskID` int(10) DEFAULT '0',
	  `CompletedBy` varchar(100) DEFAULT '0',
	  `Scheduled` datetime DEFAULT NULL,
	  `Completed` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
	  `Notified` char(1) DEFAULT 'N',
	  `Notes` varchar(5000) DEFAULT NULL,
	  PRIMARY KEY (`TaskWorkingID`)
	) ENGINE=MyISAM AUTO_INCREMENT=1209 DEFAULT CHARSET=latin1;";

$createusers="
CREATE TABLE IF NOT EXISTS `users` (
	  `UserID` int(11) NOT NULL AUTO_INCREMENT,
	  `Name` varchar(200) DEFAULT NULL,
	  `Username` varchar(60) DEFAULT NULL,
	  `Password` varchar(100) DEFAULT NULL,
	  `Active` char(1) DEFAULT NULL,
	  `Last_Updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	  `IP` varchar(30) DEFAULT NULL,
	  `email` varchar(200) DEFAULT NULL,
	  `UserLevel` char(1) DEFAULT '1',
	  PRIMARY KEY (`UserID`)
	) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;";


// get the db values
$ini_array = parse_ini_file("config.ini.php");
$dbhost=$ini_array['host'];
$dbname=$ini_array['dbname'];
$dbusername=$ini_array['username'];
$dbpassword=$ini_array['password'];


$g_link = mysql_connect($dbhost, $dbusername, $dbpassword) or die('Could not connect to mysql server.' );
mysql_select_db($dbname, $g_link) or die('Could not select database. Please check config.ini.php if this is your first run please ensure you have run setup.php');


echo "Creating audit Table...";
if(mysql_query($createautditsql)or die("Unable to create audit table:  " . mysql_error())){echo "...Done.<br />";}
echo "Creating notify Table";
if(mysql_query($createnotify)or die("Unable to create notify table: " . mysql_error())){echo "...Done.<br />";}
echo "Creating tasks_master Table";
if(mysql_query($createtaskmaster)or die("Unable to create tasks_master table: " . mysql_error())){echo "...Done.<br />";}
echo "Creating tasks_working Table";
if(mysql_query($createtaskworking)or die("Unable to create tasks_working table: " . mysql_error())){echo "...Done.<br />";}
echo "Creating users Table";
if(mysql_query($createusers)or die("Unable to create users table: " . mysql_error())){echo "...Done.<br />";}
echo "Creating admin user";
if(mysql_query("INSERT INTO `users` (`UserID`, `Name`, `Username`, `Password`, `Active`, `Last_Updated`, `IP`, `email`, `UserLevel`) VALUES  (1, 'admin', 'admin', '96c0771639e98b9008f9cf9a067b1f0cf560ddc8a61b9d656678086441683f1a', 'Y', '2013-11-27 13:15:43', NULL, 'admin@poptask.local', '2');") or die("Unable to insert admin user: " . mysql_error())){
echo "...Done<br /><br /><span style=\"color:RED\" >IMPORTANT: Please delete setup.php for security purposes.</span> <br /><br />Please attempt to login <strong>username: admin password: password</strong> <a href='index.php'>here</a>";
}
die();
}

?>
<?php if (!$dbsuccess){ ?>
<h2>Step 1.</h2>
Welcome to Poptask Setup. <br />
<br />
Please ensure you have installed MySQL Server on your system and have created an empty database for Poptask to connect.<br />
<br /><br />
Enter in your mysql host information and ensure you have connectivity over port 3306 to this server.
<?php if (isset($db_error)){echo "<br /><div style=\"padding-top:20px; color:RED;\">ERROR: Unable to connect to database:<br /><br />".$db_error."</div>";}?>
<form method="POST" action="setup.php">
<table style="width:100%">
<tr><td style='font-size:11px; width:40%'>mySQL Host IP: </td><td style="width:60%;"><input value="<?php echo $db['DB_SERVER'];?>" name="mysqlserver" style="width:100%;" type="text"></td></tr>
<tr><td style='font-size:11px; width:40%'>mySQL Database Name: </td><td style="width:60%;"><input value="<?php echo $db['DB_DATABASE'];?>" name="mysqldatabase" style="width:100%;" type="text"></td></tr>
<tr><td style='font-size:11px;'>mySQL Username: </td><td style="width:60%;"><input value="<?php echo $db['DB_SERVER_USERNAME'];?>" name="mysqlusername" style="width:100%;" type="text"></td></tr>
<tr><td style='font-size:11px;'>mySQL Password: </td><td style="width:60%;"><input value="<?php echo $db['DB_SERVER_PASSWORD'];?>" name="mysqlpassword" style="width:100%;" type="text"></td></tr>
</table>
<br /><br />
<center><br />
<input type="submit" value="Test Settings">
</center>
</div>
</form>
</center>
<?php } if ($dbsuccess){ ?>
<div style="color:green">Congratulations! Database Connected Successfully</div>
<h2>Step 2.</h2>
<a href="setup.php?s=2">Build Database</a>
<?php } ?>
<HTML>
