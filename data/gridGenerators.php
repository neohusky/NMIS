<?php
	require_once('config.php');
	require_once("../js/dhtmlx/grid_connector.php");



	$conn = new GridConnector($conn);
 	$conn->enable_log("log.txt",true);
	$conn->render_table("Generators",
						"id",
						"id, BatchNo, Supplier, ArrivalDate");
?>
