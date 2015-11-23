<?php
/**
 * Created by PhpStorm.
 * User: theokitsos
 * Date: 23/11/2015
 * Time: 9:33 PM
 */
require_once('config.php');
require_once('functions.php');

echo RemainingActivity(1000,'2015-11-23 09:00:00','2015-11-24 09:00:00',1440);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$today = date('Y-m-d');
$sql=  "UPDATE `eluates`
		SET `eluates`.`Remaining activity` = 30000
		WHERE `eluates`.`Elution time` like '$today%'";
$retval = mysql_query( $sql, $conn );
if(! $retval )
{
    die('Could not update data: ' . mysql_error());
}
echo "Updated data successfully\n";
mysql_close($conn);
