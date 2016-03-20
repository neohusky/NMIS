<?php
/**
 * Created by PhpStorm.
 * User: nucmed
 * Date: 4/03/2016
 * Time: 3:27 PM
 */
header("Content-Type: text/html; charset=utf-8");

if (@$_REQUEST["dhxform_demo_login"] == "theok" && @$_REQUEST["dhxform_demo_pwd"] == "theok") {
    $state = 1;
} else {
    $state = 0;
}

print_r("<meta http-equiv='Content-Type' content='text/html; charset=UTF-8'/>");
print_r("<script> try { parent.submitCallback(".$state."); } catch(e) {};</script>");
?>