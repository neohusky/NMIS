<?php
/**
 * Created by PhpStorm.
 * User: theokitsos
 * Date: 23/11/2015
 * Time: 9:33 PM
 */
require_once('config.php');
require_once('functions.php');



$today = date('Y-m-d');

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql=  "SELECT eluates.EluateID, eluates.`Elution time`, eluates.`Elution activity`, eluates.`Remaining activity`, eluates.`Remaining activity calibration time`
		FROM eluates
		WHERE `eluates`.`Elution time` like '$today%'";
$retval = mysql_query( $sql, $conn );

if(! $retval )
{
    die('Could not get data: ' . mysql_error());
}

while ($row = mysql_fetch_array($retval, MYSQL_ASSOC))
{
    $id= $row['EluateID'];
    $time= $row['Remaining activity calibration time'];
    $Activity = $row['Remaining activity'];

    $TimeNew= date('Y-m-d H:i:s');
    $HalfLife = 6.02 * 60; //Tc99m halflife in minutes
    $ActivityNew= RemainingActivity($Activity,$time,$TimeNew,$HalfLife);


    UpdateElutionActivity($conn,$id,$ActivityNew,$TimeNew);

}

echo "Fetched data successfully\n";
mysql_close($conn);




