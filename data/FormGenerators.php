<?php
	require_once('config.php');
	require_once('../codebase/dhtmlx/form_connector.php');
	
//	sleep(1);
	
	$form = new FormConnector($conn);
	$form->enable_log("log.txt",true);
	$form->render_table("generators",
						"generator_id",
						"generator_id,batch_number,supplier_name,arrival_date,arrival_username");
?>