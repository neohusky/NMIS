<?php
	require_once('config.php');
	require_once("../codebase/dhtmlx/chart_connector.php");

	$today = date('Y-m-d');

	$conn = new ChartConnector($conn);
 	$conn->enable_log("log.txt",true);
	$conn->render_complex_sql(
			"SELECT kitpreparations.`Radiopharmaceutical ID`, kittypes.Abbreviation, kitpreparations.`Isotope activity`, kitpreparations.`Remaining activity` as RemainingActivity,(kitpreparations.`Remaining activity` / kitpreparations.`Isotope activity`) * 100 AS percentRemaining,((kitpreparations.`Isotope activity` - kitpreparations.`Remaining activity`) / kitpreparations.`Isotope activity`) * 100 AS percentUsed "
			."FROM kitpreparations INNER JOIN kits ON kitpreparations.`Batch ID` = kits.`Batch ID` INNER JOIN kittypes ON kits.`Kit ID` = kittypes.`Kit ID` "
			."WHERE kitpreparations.`Preparation time` LIKE '$today%'",
			"Radiopharmaceutical ID",
			"Abbreviation, InitialActivity, RemainingActivity, percentRemaining, percentUsed");


?>
