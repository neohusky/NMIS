<?php


//"http://192.168.0.205:8080/upload/"
//Generator.zpl

function SendLabel($target,$file)
{
    //$target = "http://192.168.0.205:8080/labelupload/";

# http://php.net/manual/en/curlfile.construct.php

// Create a CURLFile object / procedural method
//$cfile = curl_file_create('resource/test.png','image/png','testpic'); // try adding
    $cfile = curl_file_create($file);
// Create a CURLFile object / oop method
#$cfile = new CURLFile('resource/test.png','image/png','testpic'); // uncomment and use if the upper procedural method is not working.

// Assign POST data
    $imgdata = array('upl' => $cfile);

    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $target);
    curl_setopt($curl, CURLOPT_USERAGENT, 'Opera/9.80 (Windows NT 6.2; Win64; x64) Presto/2.12.388 Version/12.15');
    curl_setopt($curl, CURLOPT_HTTPHEADER, array('User-Agent: Opera/9.80 (Windows NT 6.2; Win64; x64) Presto/2.12.388 Version/12.15', 'Referer: http://someaddress.tld', 'Content-Type: multipart/form-data'));
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false); // stop verifying certificate
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_POST, true); // enable posting
    curl_setopt($curl, CURLOPT_POSTFIELDS, $imgdata); // post images
    curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true); // if any redirection after upload
    $r = curl_exec($curl);
    curl_close($curl);


}
function HotlabConnectURL($mysqlconn)
{
//define the uploadroute
    $uploadroute = "/zplprint/";

    $sql = "Select App_HotlabConnectServer,App_HotlabConnectPort
		FROM nmis.settings
		WHERE id = 1";

    $result = mysql_query( $sql, $mysqlconn );

    if (!$result) {
        $message  = 'Invalid query: ' . mysql_error() . "\n";
        $message .= 'Whole query: ' . $query;
        die($message);
    }
    while ($row = mysql_fetch_assoc($result)) {

        $server = $row['App_HotlabConnectServer'];
        $port = $row['App_HotlabConnectPort'];


    }
    $URL = "http://" . $server . ":" . $port . $uploadroute;

 return $URL;


}