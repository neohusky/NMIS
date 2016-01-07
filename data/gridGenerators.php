<?php
	require_once('config.php');
	require_once("../codebase/dhtmlx/grid_connector.php");



	$conn = new GridConnector($conn);
 	$conn->enable_log("log.txt",true);
	$conn->render_table("Generators",
						"generator_id",
						"generator_id,batch_number ,supplier_name ,arrival_date ,arrival_username,decommission_date,decommission_username");
?>

