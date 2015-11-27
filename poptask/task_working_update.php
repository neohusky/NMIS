<?php
error_reporting(0);
ini_set('display_errors', '1');

include_once("db_connect.php");
$mysqli = connectdb();
//If we are getting a GET
//set as completed;
if($_GET['type']=="a"){
	if(isset($_GET['taskid'])){
		if($_GET['taskid']!=""){
			$statement = $mysqli->prepare("UPDATE tasks_working SET CompletedBy=? WHERE TaskWorkingID=?");
			if(!$statement->bind_param('si', $_SESSION['userid'], $_GET['taskid'])){
				echo "Binding parameters failed: (" . $statement->errno . ") " . $statement->error;
			}		
			if(!$statement->execute()){
				$json[0]['Result'] = "Failed";
				$json[0]['Message'] = "Failed to updated Task ".$_GET['taskid']." error message: (" . $statement->errno . ") " . $statement->error;
			}else{
				$json[0]['Result'] = "Success";
				$json[0]['Message'] = "Successfully set completed TaskID_working ".$_GET['taskid']." by user ".$_SESSION['userid'];
			}
			audit("taskworkingcomplete", $json[0]['Result']." ".$json[0]['Message']." POSTDATA:".implode(",",$_POST)." GETDATA:".implode(",",$_GET), true);
			header("Location: index.php?date=".$_GET['date']);
			$mysqli->close();
			exit;
		}
	}
}

//Set as uncomplted
if($_GET['type']=="b"){
	if(isset($_GET['taskid'])){
		if($_GET['taskid']!=""){
			$statement = $mysqli->prepare("UPDATE tasks_working SET CompletedBy='0' WHERE TaskWorkingID=?");
			if(!$statement->bind_param('i', $_GET['taskid'])){
				echo "Binding parameters failed: (" . $statement->errno . ") " . $statement->error;
			}		
			if(!$statement->execute()){
				$json[0]['Result'] = "Failed";
				$json[0]['Message'] = "Failed to updated Task ".$_GET['taskid']." error message: (" . $statement->errno . ") " . $statement->error;
			}else{
				$json[0]['Result'] = "Success";
				$json[0]['Message'] = "Successfully set uncomplete TaskID_working ".$_GET['taskid']." by user ".$_SESSION['userid'];
			}
			audit("taskworkinguncomplete", $json[0]['Result']." ".$json[0]['Message']." POSTDATA:".implode(",",$_POST)." GETDATA:".implode(",",$_GET), true);
			header("Location: index.php?date=".$_GET['date']);
			exit;
		}
	}
}

//Update Notes
if($_POST['type']=="c"){
	if(isset($_POST['taskid'])){
		if($_POST['taskid']!=""){
			$statement = $mysqli->prepare("UPDATE tasks_working SET Notes=? WHERE TaskWorkingID=?");
			if(!$statement->bind_param('si', $_POST['notes'], $_POST['taskid'])){
				echo "Binding parameters failed: (" . $statement->errno . ") " . $statement->error;
			}		
			if(!$statement->execute()){
				$json[0]['Result'] = "error";
				$json[0]['Message'] = "Failed to updated notes for ".$_POST['taskid']." error message: (" . $statement->errno . ") " . $statement->error;
			}else{
				$json[0]['Result'] = "success";
				$json[0]['Message'] = "Successfully saved notes";
			}
			audit("taskworkingnotesupdate", $json[0]['Result']." ".$json[0]['Message']." POSTDATA:".implode(",",$_POST)." GETDATA:".implode(",",$_GET), true);
			echo json_encode($json);
			exit;
		}
	}
}
?>