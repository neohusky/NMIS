<?php
function getRemoteIPAddress() {
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        return $_SERVER['HTTP_CLIENT_IP'];

    } else if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) { 
        return $_SERVER['HTTP_X_FORWARDED_FOR'];
    }
    return $_SERVER['REMOTE_ADDR'];
}

function audit($formname, $editor, $bypass=false){
	include_once("db_connect.php");
	if($bypass){
		$mysqli = connectdb(true);
	}else{
		$mysqli = connectdb();
	}
	$statement = $mysqli->prepare("INSERT INTO audit (UserID, Formname, Editor, IP) VALUES (?,?,?,?)");
	
	if(isset($_SESSION['userid'])){
		$thisuser=$_SESSION['userid'];
	}else{
		$thisuser="0";
	}
		if(!$statement->bind_param('ssss', $thisuser, $formname, $editor, getRemoteIPAddress())){
	                echo "Binding parameters failed: (" . $statement->errno . ") " . $statement->error;

		}
	$statement->execute();
	$mysqli->close();
}
function make_links_clickable($text){
    return preg_replace('!(((f|ht)tp(s)?://)[-a-zA-Z?-??-?()0-9@:%_+.~#?&;//=]+)!i', '<a href="$1">$1</a>', $text);
}

function generate_tasks($verbose=true){
include_once('when/When.php');
$mysqli=connectdb(true);
$mysqli2=connectdb(true);
$mysqli3=connectdb(true);
$start = new DateTime();

$stmt = $mysqli->prepare("Select TaskID, Title, Details, RRule, Time FROM tasks_master WHERE Active='Y'");

$stmt->execute();
$stmt->bind_result($rtaskid, $rtitle, $rdetails, $rrrule, $rtime);

while($stmt->fetch()){
	$r = new When();
	$r->recur($start)->rrule($rrrule.";COUNT=30");
	if($verbose){echo $rtaskid." ".$rtitle." ".$rrrule." ".$rdetails."<br />";}
	while($result = $r->next())
	{
		if (strtotime($result->format('Y-m-d')) < strtotime('+30 days')){
			$nextime=$result->format('Y-m-d') . ' ' . $rtime;
			if($verbose){echo $nextime." ";}
			
			$checkexistingstmt = $mysqli3->query("SELECT TaskWorkingID FROM tasks_working WHERE TaskID=$rtaskid AND Scheduled='$nextime'");
			
			if($checkexistingstmt->num_rows > 0){
				if($verbose){echo " - Already exists... skipping!!<br />";}
			}else{
				$statement = $mysqli2->prepare("INSERT INTO tasks_working (TaskID, Scheduled) Values (?,?)");
				if(!$statement->bind_param('is', $rtaskid, $nextime)){
					if($verbose){echo "Binding parameters failed: (" . $statement->errno . ") " . $statement->error;}

				}
				if(!$statement->execute()){
					if($verbose){echo " - Executing query failed: (" . $statement->errno . ") " . $statement->error;}
				}else{
					if($verbose){echo " - Sucessfully added task<br />";}
				}		
			}			
		}
	}
}
$mysqli3->close();
$mysqli2->close();
$mysqli->close();

}
?>
