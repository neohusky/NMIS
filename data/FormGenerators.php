<?php
	require_once('config.php');
	require_once('../js/dhtmlx/form_connector.php');
	
//	sleep(1);
	
	$form = new FormConnector($conn);
	$form->enable_log("log.txt",true);
	$form->render_table("generators",
						"id",
						"id,BatchNo,Supplier,ArrivalDate,Username");
?>