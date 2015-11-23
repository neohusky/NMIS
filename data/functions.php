<?php
/**
 * Created by PhpStorm.
 * User: theokitsos
 * Date: 23/11/2015
 * Time: 8:16 PM
 */
function RemainingActivity($A0, $StartDate, $EndDate, $HalfLife) {
    $Start = strtotime($StartDate);
    $End= strtotime($EndDate);
    $interval  = abs($End - $Start);
    $minutes   = round($interval / 60);

    //echo $Time.'minutes';
    echo "Time elapsed " . $minutes . " minutes. ";
    $At= $A0 * exp((-log(2)/$HalfLife * $minutes));

    return $At;

}