<?php
    require_once("../codebase/dhtmlx/combo_connector.php");
	require_once('config.php');


    $data = new ComboConnector($conn);
    $data->enable_log("log.txt",true);


    $data->render_sql("SELECT DISTINCT `supplier_name` FROM `suppliers` ","supplier_name","supplier_name");
?>
