<?php
	require_once('config.php');
	require_once("../codebase/dhtmlx/grid_connector.php");



	$conn = new GridConnector($conn);
 	$conn->enable_log("log.txt",true);

	$conn->render_complex_sql(
			"SELECT * FROM generators WHERE decommission_date IS NULL",
			"generator_id",
			"generator_id,batch_number ,supplier_name ,arrival_date ,arrival_username,decommission_date,decommission_username,return_date,qc_moly_status,qc_alum__status,qc_visual_status,site");


?>

