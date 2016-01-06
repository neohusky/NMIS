<?php
/**
 * Created by PhpStorm.
 * User: nucmed
 * Date: 6/01/2016
 * Time: 10:36 AM
 */
require_once('config.php');

$action =  $_REQUEST['action'];
$username = $_REQUEST['username'];
$description = $_REQUEST['description'];
$date = date('Y-m-d H:i:s');




$sql = "INSERT INTO log (datetime, username, action, description)
  VALUES ('$date','$username', '$action','$description')";


// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$query = mysql_query($sql, $conn);

echo "Log updated\n";