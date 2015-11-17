<?php

/**
 * Created by PhpStorm.
 * User: nucmed
 * Date: 2/11/15
 * Time: 1:36 PM
 */
include('handler.php');

$id  = $_REQUEST['id'];

require_once('../data/config.php');


//$sql = "Select id,BatchNo, Supplier, ArrivalDate, Username
//		FROM nmis.generators
//		WHERE id = $id";

//$result = mysql_query( $sql, $conn );
//
//if (!$result) {
//    $message  = 'Invalid query: ' . mysql_error() . "\n";
//    $message .= 'Whole query: ' . $query;
//    die($message);
//}
//while ($row = mysql_fetch_assoc($result)) {

//    $PatientName = $row['BatchNo'];
//    $DOBdate = date_create($row['DOB']);
//    $DOB = date_format($DOBdate,"d/m/Y");
//    $MRN = $row['MRN'];
//    $Activty = $row['Activity'];
//    $Isotope = $row['Isotope'];
//    $Radpharm = $row['Radpharm'];
//    $Study = $row['Study'];
//    $DispensedDate = date_create($row['DispensedDate']);
//    $DispensedDateTime = date_format($DispensedDate,"d/m/Y H:i:s");
//    $DoseId= "D".$row['id'];
//    $StaffId= $row['StaffId'];

$PatientName = "KITSOS, THEO";
$DOB = "20/05/1978";
$MRN = "12345678";
$Activty = "1234";
$Isotope = "Technetium-99m";
$Radpharm = "DTPA";
$Study = "GFR (DTPA)";
$DispensedDateTime = "01/01/2000 13:10:10";
$Code= "D".$id;
$StaffId= "TKITS";


    //echo $row['id'] . " " . $BatchNo . " " . $Supplier . " " . $ArrivalDate ." " . $Username ."\n";
//}

///define the barcode.
//Use http://labelary.com/viewer.html

$labelcode =<<<AAA
^XA

^CF0,40
^FO150,10^FDCAUTION - RADIOISOTOPE^FS

^CF0,50
^FO10,50^FD$PatientName^FS

^CFA,18,12
^FO10,90^FDDOB: $DOB   MRN: $MRN^FS

^CF0,40,42
^FO10,130^FD$Activty MBq $Isotope $Radpharm^FS

^CFI,40,20
^FO10,160^FD$Study^FS

^CF0,35
^FO10,220^FDDispensed: $DispensedDateTime	SyrID: $Code^FS
^CF0,35
^FO10,270^FDTech Draw:	$StaffId	Tech Inj:	Site:^FS

^FX Radiation Logo
^FO520,220^GFA,1530,1530,17,,::Q0C,P03EP07,P07EP0FC,O01FFP0FE,O03FFO01FF8,O07FF8N01FFC,O0IF8N03FFE,N01IFCN07IF,N03IFEN07IF8,N07IFEN0JFC,N0KFN0JFE,M01KFM01KF,M01KF8L01KF,M03KFCL03KF8,M07KFCL07KFC,M07KFEL07KFC,M0LFEL0LFE,L01MFL0LFE,L01MFK01MF,L03MF8J01MF,L03MFCJ03MF8,L03MFCJ07MF8,L07MFEJ07MFC,L07MFEJ0NFC,L0OFJ0NFC,L0OFI01NFE,L0NFEJ0NFE,L0NFCJ07MFE,K01NF8J03NF,K01NFK01NF,K01MFE007C00NF,K01MFE01FF00NF,K01MFC07FF807MF,K01MFC07FFC07MF,K01MF80IFE03MF,K01MF81JF03MF,:K01MF01JF01MF,K01MF01JF01MF8,T01JF01MF,T01JF,::U0IFE,U07FFC,U03FF8,U01FF,V07C,,:::T01I02,T03F01F,T03JF8,T07JF8,T07JFC,T0KFC,S01KFE,:S03LF,S03LF8,S07LF8,S07LFC,S0MFC,R01MFE,R01NF,R03NF,R03NF8,R07NF8,R0OFC,:Q01OFE,Q01PF,Q03PF,Q03PF8,Q07PF8,Q07PFC,Q03PF8,Q01OFE,R07NF8,S0MFE,S01LF,T01JF,,::^FS

^XZ

AAA;



$URL = HotlabConnectURL($conn);

$zplURL = $URL.$Code."/".rawurlencode($labelcode);
//$zplURL = $URL.$Barcode."/".rawurldecode($labelcode);
//echo $zplURL;
$curl = curl_init();
curl_setopt ($curl, CURLOPT_URL, $zplURL);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

$result = curl_exec ($curl);
curl_close ($curl);
echo $result;
