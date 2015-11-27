<?php
include_once('db_connect.php');
$mysqli = connectdb();

//check if admin and if not kick out
if($_SESSION['level']<2){
	exit;
}

//If this is a toggle Active of On-Off
if($_GET['type']=='a'){


	$statement = $mysqli->prepare("UPDATE tasks_master SET Active = IF(Active = 'N', 'Y', 'N') WHERE TaskID=?");
	if(!$statement->bind_param('i', $_GET['taskid'])){
		echo "Binding parameters failed: (" . $statement->errno . ") " . $statement->error;
	}
	
	if(!$statement->execute()){
		$json[0]['Result'] = "error";
		$json[0]['Message'] = "Failed to updated TaskID ".$_GET['taskid']." error message: (" . $statement->errno . ") " . $statement->error;
	}else{
		$mysqli2 = connectdb();
		$stmt = $mysqli2->prepare("SELECT Active from tasks_master WHERE TaskID=?");
		if(!$stmt->bind_param('i', $_GET['taskid'])){
			$json[0]['Result'] = "error";
			$json[0]['Message'] = "Failed to get task active status TaskID ".$_GET['taskid']." error message: (" . $statement->errno . ") " . $statement->error;
		}else{
			//If we could get the status then go through and cleanup the tasks in the future that we will no longer use.
			$mysqli3 = connectdb();
			$deletestmt = $mysqli3->query("DELETE a FROM tasks_working a INNER JOIN tasks_master b ON a.TaskID=b.TaskID WHERE Scheduled > CURRENT_TIMESTAMP AND Active='N';");
			if($deletestmt){
				$stmt->execute();
				$stmt->bind_result($rtaskactive);
				$stmt->fetch();
				$mysqli2->close();
				$json[0]['Result'] = "success";
				if ($rtaskactive=="Y"){
					$json[0]['Frame'] = '<div id="2active'.$_GET['taskid'].'" style="display: inline-block;">
						<span style="margin-top:-1px;" class="ui-icon ui-icon-circle-check" title="This task is enabled"></span>
					</div>';
				}else{
					$json[0]['Frame'] = "";
				}
			
				$json[0]['Message'] = "Successfully updated TaskID ".$_GET['taskid']. " now set ".$rtaskactive;
			}else{
				$json[0]['Result'] = "error";
				$json[0]['Message'] = "Task toggled but failed to delete the future tasks ".$_GET['taskid']." error message: (" . $statement->errno . ") " . $statement->error;
			}
				
		}
	}
	generate_tasks(false);
	audit("tasktoggleactive", $json[0]['Result']." ".$json[0]['Message']." POSTDATA:".implode(",",$_POST)." GETDATA:".implode(",",$_GET), true);
	echo json_encode($json);
	$mysqli->close();
	exit;
}

//If this is an update
if($_GET['type']=='b'){
	$json = array();
	$statement = $mysqli->prepare("UPDATE tasks_master SET Title=?, Details=?, RRule=?, Time=? WHERE TaskID=?");
	if(!$statement->bind_param('ssssi', $_POST['title'], $_POST['details'], $_POST['rrule'], $_POST['time'], $_POST['taskid'])){
		echo "Binding parameters failed: (" . $statement->errno . ") " . $statement->error;
	}		
	if(!$statement->execute()){
		$json[0]['Result'] = "error";
		$json[0]['Message'] = "Failed to updated TaskID ".$_POST['taskid']." error message: (" . $statement->errno . ") " . $statement->error;
	}else{
		$mysqli2 = connectdb();
		$stmt = $mysqli2->prepare("SELECT Title from tasks_master WHERE TaskID=?");
		if(!$stmt->bind_param('i', $_POST['taskid'])){
			$json[0]['Result'] = "error";
			$json[0]['Message'] = "Failed to get task title for TaskID ".$_POST['taskid']." error message: (" . $statement->errno . ") " . $statement->error;
		}else{
		$stmt->execute();
		$stmt->bind_result($rtasktitle);
		$stmt->fetch();
		$mysqli3 = connectdb();
		$deletestmt = $mysqli3->prepare("DELETE a FROM tasks_working a INNER JOIN tasks_master b ON a.TaskID=b.TaskID WHERE Scheduled > CURRENT_TIMESTAMP AND a.TaskID=?");
		$deletestmt->bind_param('i', $_POST['taskid']);
                $deletestmt->execute();
		$mysqli3->close();
		$mysqli2->close();

		$json[0]['Result'] = "success";
		$json[0]['Title'] = $rtasktitle;
		$json[0]['Message'] = "Successfully updated TaskID ".$_POST['taskid'];
		}
	}
	generate_tasks(false);
	audit("taskupdate", $json[0]['Result']." ".$json[0]['Message']." POSTDATA:".implode(",",$_POST)." GETDATA:".implode(",",$_GET), true);
	echo json_encode($json);
	$mysqli->close();
	exit;
}
//add task
if($_GET['type']=='c'){
	if($_POST['title']!=""){
		$statement = $mysqli->prepare("INSERT INTO tasks_master (Title, Details, RRule, Time, Visible) VALUES (?,?,?,?,'Y')");
		if(!$statement->bind_param('ssss', $_POST['title'], nl2br($_POST['details']), $_POST['rrule'], $_POST['time'])){
	                echo "Binding parameters failed: (" . $statement->errno . ") " . $statement->error;

		}
	if(!$statement->execute()){
		$json[0]['Result'] = "error";
		$json[0]['Message'] = "Failed to add TaskID error message: (" . $statement->errno . ") " . $statement->error;
	}else{
		$json[0]['Result'] = "success";
		$json[0]['Message'] = "Successfully added TaskID ".mysqli_insert_id($mysqli);
	}
	generate_tasks(false);
	audit("taskadd", $json[0]['Result']." ".$json[0]['Message']." POSTDATA:".implode(",",$_POST)." GETDATA:".implode(",",$_GET), true);
	echo json_encode($json);
	$mysqli->close();
	exit;
	}
}

//If this is a hide(delete a task)
if($_GET['type']=='d'){
	//check if admin and if not kick out
	if($_SESSION['level']<2){
		exit;
	}

	$statement = $mysqli->prepare("UPDATE tasks_master SET Visible = 'N', Active='N' WHERE TaskID=?");
	if(!$statement->bind_param('i', $_GET['taskid'])){
		echo "Binding parameters failed: (" . $statement->errno . ") " . $statement->error;
	}		
	if(!$statement->execute()){
		$json[0]['Result'] = "error";
		$json[0]['Message'] = "Failed to delete TaskID ".$_GET['taskid']." error message: (" . $statement->errno . ") " . $statement->error;
	}else{
		$json[0]['Result'] = "success";
		$json[0]['Message'] = "Successfully deleted TaskID ".$_GET['taskid'];
	}
	generate_tasks(false);
	audit("taskdelete", $json[0]['Result']." ".$json[0]['Message']." POSTDATA:".implode(",",$_POST)." GETDATA:".implode(",",$_GET), true);
	echo json_encode($json);
	$mysqli->close();
        $mysqli3 = connectdb();
        $mysqli3->query("DELETE a FROM tasks_working a INNER JOIN tasks_master b ON a.TaskID=b.TaskID WHERE Scheduled > CURRENT_TIMESTAMP AND Active='N'");
	
	exit;
}

//If this is toggle notification for a user
if($_GET['type']=='e'){
	$exists=false;
	$mysqlim = connectdb();
	$checkstmt = $mysqlim->prepare("SELECT NotifyID FROM notify WHERE TaskID=? AND UserID=?");
	if(!$checkstmt->bind_param('ii', $_GET['taskid'], $_SESSION['userid'])){
		echo "Binding parameters failed: (" . $checkstmt->errno . ") " . $checkstmt->error;
	}
	$checkstmt->execute();
	$checkstmt->bind_result($rmid);

	while($checkstmt->fetch()){
		$exists=true;
	}

	if($exists){
		$statement = $mysqli->prepare("DELETE FROM notify WHERE TaskID=? AND UserID=?");	
		if(!$statement->bind_param('ii', $_GET['taskid'], $_SESSION['userid'])){
	        echo "Binding parameters failed: (" . $statement->errno . ") " . $statement->error;
		}
		if(!$statement->execute()){
			$json[0]['Result'] = "error";
			$json[0]['Message'] = "Failed to remove notify for TaskID ".$_GET['taskid']." error message: (" . $statement->errno . ") " . $statement->error;
		}else{
			$json[0]['Result'] = "success";
			$json[0]['Frame'] = '';
			$json[0]['Message'] = "Successfully removed notify TaskID ".$_GET['taskid'];
		}
	}else{
		$statement = $mysqli->prepare("INSERT INTO notify (TaskID, UserID) VALUES (?,?)");
		if(!$statement->bind_param('ii', $_GET['taskid'], $_SESSION['userid'])){
	                echo "Binding parameters failed: (" . $statement->errno . ") " . $statement->error;
		}
		if(!$statement->execute()){
			$json[0]['Result'] = "error";
			$json[0]['Message'] = "Failed to added notify for ".$_GET['taskid']." error message: (" . $statement->errno . ") " . $statement->error;
		}else{
			$json[0]['Result'] = "success";
			$json[0]['Frame'] = '<div id="mail'.$_GET['taskid'].'" style="display: inline-block; cursor:pointer;">
			<span style="margin-top:-1px;" class="ui-icon uis-icon-clock usercompletedselect" title="You have email notifications for this task"></span>
		</div>';
			$json[0]['Message'] = "Successfully added notify for TaskID ".$_GET['taskid'];
		}
	}
	generate_tasks(false);
	audit("notifytoggle", $json[0]['Result']." ".$json[0]['Message']." POSTDATA:".implode(",",$_POST)." GETDATA:".implode(",",$_GET), true);
	echo json_encode($json);
	

	$mysqli->close();
	exit;
}

?>
