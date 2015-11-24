<?php
	require_once('config.php');
	require_once("../js/dhtmlx/chart_connector.php");

	$today = date('Y-m-d');

	$conn = new ChartConnector($conn);
	$conn->enable_log("log.txt",true);
	$conn->render_complex_sql("SELECT eluates.EluateID, eluates.`Elution activity` as ElutionActivity, eluates.`Remaining activity`as RemainingActivity, eluates.`Remaining activity calibration time`,(eluates.`Remaining activity` / eluates.`Elution activity`) * 100 AS percentRemaining,((eluates.`Elution activity` - eluates.`Remaining activity`) / eluates.`Elution activity`) * 100 AS percentUsed  "
			."FROM eluates "
			."WHERE eluates.`Elution time` LIKE '$today%'",
			"EluateID",
			"ElutionActivity, RemainingActivity, percentRemaining, percentUsed");

?>
