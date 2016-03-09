<?php
    require_once('config.php');
	require_once('../js/dhtmlx/grid_connector.php');

	$grid = new GridConnector($conn);
 	$grid->enable_log("log.txt",true);

    $grid->render_complex_sql(
    "SELECT `DicomWorklist`.* FROM DicomWorklist INNER JOIN DicomWorklistExclude ON `DicomWorklist`.`RequestedProcedureDescription` = `DicomWorklistExclude`.`RequestedProcedureDescription`",
    "StudyInstanceUID",
    "PatientName, PatientID, PatientDOB, PatientSex, RequestedProcedureDescription, CurrentPatientLocation, Modality");


?>
