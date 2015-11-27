<?php
$bypass=true;
error_reporting(E_ALL);
ini_set('display_errors', '1');
include_once('db_connect.php');
$mysqlim=connectdb(true);
$mysqlim2=connectdb(true);
//Send the mail for stuff coming due that hasnt been completed yet
$mailstmt = $mysqlim->prepare("SELECT notify.NotifyID, tasks_working.Scheduled, tasks_master.Title, users.Email, CURRENT_TIMESTAMP from tasks_working LEFT JOIN tasks_master on tasks_master.TaskID=tasks_working.TaskID LEFT JOIN notify ON notify.TaskID=tasks_master.TaskID LEFT JOIN users on notify.UserID=users.UserID WHERE tasks_working.Scheduled<DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 30 MINUTE) AND tasks_master.Active='Y' AND notify.LastSent<>DATE(NOW()) AND users.Active='Y' AND (tasks_working.CompletedBy='' OR tasks_working.CompletedBy IS NULL OR tasks_working.CompletedBy=0)");

$mailstmt->execute();
$mailstmt->bind_result($rmid, $rmscheduled, $rmtitle, $rmemail, $thistime);

$mailstmt2 = $mysqlim2->prepare("UPDATE notify SET LastSent = NOW() WHERE NotifyID = ?");
	
while($mailstmt->fetch()){
	echo $thistime."Mail to be sent to ".$rmemail." for ".$rmtitle." scheduled for ".$rmscheduled."<br />";
	$to = $rmemail;
	$subject = "Task Reminder: ".$rmtitle;
	$body = "Due: ".$rmscheduled."\r\n"."Title: ".$rmtitle;
	$headers = 'From: t-sirt-alerts@telecom.co.nz' . "\r\n" .
	   'Reply-To: t-sirt-alerts@telecom.co.nz' . "\r\n" .
	   'X-Mailer: PHP/' . phpversion();
	if (mail($to, $subject, $body, $headers)) {
	   echo("Email successfully sent!<br />");
	  } else {
	   echo("Email delivery failed -> Please check you web servers mail settings <br />");	  }
	if(!$mailstmt2->bind_param('i', $rmid)){
		echo "Binding parameters failed: (" . $mailstmt2->errno . ") " . $mailstmt2->error;
	}		
	if(!$mailstmt2->execute()){
		$json[0]['Result'] = "Failed";
		$json[0]['Message'] = "Failed to set notification sent NotifyID ".$rmnotify." error message: (" . $mailstmt2->errno . ") " . $mailstmt2->error;
	}
}

$mysqlim->close();
$mysqlim2->close();

//Generate the tasks
generate_tasks();
?>
