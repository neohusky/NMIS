<?php
	require_once('config.php');
	require_once('../js/dhtmlx/form_connector.php');
	
//	sleep(1);
	
	$form = new FormConnector($conn);
	$form->enable_log("log.txt",true);
	$form->render_table("kits",
						"kit_id",
						"supplier_name,trade_name,abbreviation,radiopharmaceutical,recon_isotope,qc_required,kit_size,expiry_postprep, recon_requirements, recon_procedure, recon_activity_recommeded, recon_activity_min, recon_activity_max, recon_volume_min, recon_volume_max, recon_volume_recommeded, recon_required, Kit re-order threshold, qc_procedure, kit_volume, manufacture_comments");

?>