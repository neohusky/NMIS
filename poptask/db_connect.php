<?php
include_once('functions.php');


function connectdb($bypass=false){


	// Parse with sections
	session_start();
	$ini_array = parse_ini_file("config.ini.php");
	$dbhost=$ini_array['host'];
	$dbname=$ini_array['dbname'];
	$dbusername=$ini_array['username'];
	$dbpassword=$ini_array['password'];
	
	if((isset($_SESSION['loggedin'])==true)||$bypass){
		$mysqli = new mysqli($dbhost, $dbusername, $dbpassword, $dbname, 3306);
		if ($mysqli->connect_errno) {
				echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
				exit;
		}
		return $mysqli;
	}else{
		header("Location:login.php");
		exit;
	}
}
?>
