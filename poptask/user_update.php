<?php
include_once('db_connect.php');
$mysqli = connectdb();




//If we are adding a user;
if($_GET['type']=='a'){
	if($_SESSION['level']<2){
		exit;
	}

	$password = hash("sha256", $_POST['password'] . "the world is a vamp1re");
	if($_POST['username']!=""){
		$statement = $mysqli->prepare("INSERT INTO users (Name, Username, Password, Active, Email, UserLevel) VALUES (?,?,?,'Y', ?,?)");
		if(!$statement->bind_param('sssss', $_POST['name'], $_POST['username'], $password, $_POST['email'], $_POST['userlevel'])){
	                echo "Binding parameters failed: (" . $statement->errno . ") " . $statement->error;

		}
	if(!$statement->execute()){
		$json[0]['Result'] = "Failed";
		$json[0]['Message'] = "Failed to add user error message: (" . $statement->errno . ") " . $statement->error;
		audit("useradd", "Failed Added user ".mysqli_insert_id($mysqli), true);
	}else{
		$json[0]['Result'] = "Success";
		$json[0]['Message'] = "Successfully added user ".mysqli_insert_id($mysqli);
		audit("useradd", "Success Added user ".mysqli_insert_id($mysqli), true);
	}
	echo json_encode($json);
	$mysqli->close();
	exit;
	}
}

if($_SESSION['level']<2){
        if($_POST['userid']!=$_SESSION['userid']){
                exit;
        }
}

//If this is an update
if($_GET['type']=='b'){
	$json = array();
	//check if its an admin, if not admin dont let them change the permissions of the user they are editing
	if ($_SESSION['level']<2){
		//dont change the password if nothing was entered.
		if($_POST['password']!=""){
		$password = hash("sha256", $_POST['password'] . "the world is a vamp1re");
		$statement = $mysqli->prepare("UPDATE users SET Name=?, Username=?, Password=?, Email=?  WHERE UserID=?");
		if(!$statement->bind_param('ssssi', $_POST['name'], $_POST['username'], $password, $_POST['email'], $_POST['userid'])){
			echo "Binding parameters failed: (" . $statement->errno . ") " . $statement->error;
		}
		}else if ($_POST['password']==""){
		$statement = $mysqli->prepare("UPDATE users SET Name=?, Username=?, Email=? WHERE UserID=?");
		if(!$statement->bind_param('sssi', $_POST['name'], $_POST['username'], $_POST['email'], $_POST['userid'])){
			echo "Binding parameters failed: (" . $statement->errno . ") " . $statement->error;
		}
		}
	}else{
		//dont change the password if nothing was entered.
		if($_POST['password']!=""){
		$password = hash("sha256", $_POST['password'] . "the world is a vamp1re");
		$statement = $mysqli->prepare("UPDATE users SET Name=?, Username=?, Password=?, Email=?, UserLevel=? WHERE UserID=?");
		if(!$statement->bind_param('sssssi', $_POST['name'], $_POST['username'], $password, $_POST['email'], $_POST['userlevel'], $_POST['userid'])){
			echo "Binding parameters failed: (" . $statement->errno . ") " . $statement->error;
		}
		}else if ($_POST['password']==""){
		$statement = $mysqli->prepare("UPDATE users SET Name=?, Username=?, Email=?, UserLevel=? WHERE UserID=?");
		if(!$statement->bind_param('ssssi', $_POST['name'], $_POST['username'], $_POST['email'], $_POST['userlevel'], $_POST['userid'])){
			echo "Binding parameters failed: (" . $statement->errno . ") " . $statement->error;
		}
		}
	}
	if(!$statement->execute()){
		$json[0]['Result'] = "Failed";
		$json[0]['Message'] = "Failed to updated UserID ".$_POST['userid']." error message: (" . $statement->errno . ") " . $statement->error;
		audit("useredit", "Failed Added update user ".$_POST['userid'], true);
		exit;
	}else{
		$mysqli2 = connectdb();
		$stmt = $mysqli2->prepare("SELECT Name, Username from users WHERE UserID=?");
		if(!$stmt->bind_param('i', $_POST['userid'])){
			$json[0]['Result'] = "Failed";
			$json[0]['Message'] = "Failed to get user details for UserID ".$_POST['userid']." error message: (" . $statement->errno . ") " . $statement->error;
			audit("useredit", "Failed Added getting user details ".$_POST['userid'], true);
			exit;
		}else{
		$stmt->execute();
		$stmt->bind_result($rname, $rusername);
		$stmt->fetch();
		$mysqli2->close();

		$json[0]['Result'] = "Success";
		$json[0]['Name'] = $rname;
		$json[0]['Username'] = $rusername;
		$json[0]['Message'] = "Successfully updated UserID ".$_POST['userid'];
		audit("useredit", "Success Updated user ".$_POST['userid'], true);
		}
	}
	echo json_encode($json);
	$mysqli->close();
	exit;
}


//If this is to disable a user
if($_GET['type']=='c'){
	$statement = $mysqli->prepare("UPDATE users SET Active = IF(Active = 'N', 'Y', 'N') WHERE UserID=?");
	if(!$statement->bind_param('i', $_GET['userid'])){
		echo "Binding parameters failed: (" . $statement->errno . ") " . $statement->error;
	}		
	if(!$statement->execute()){
		$json[0]['Result'] = "Failed";
		$json[0]['Message'] = "Failed to updated UserID ".$_GET['userid']." error message: (" . $statement->errno . ") " . $statement->error;
	}else{
		$mysqli2 = connectdb();
		$stmt = $mysqli2->prepare("SELECT Active from users WHERE UserID=?");
		if(!$stmt->bind_param('i', $_GET['userid'])){
			$json[0]['Result'] = "Failed";
			$json[0]['Message'] = "Failed to get task active status UserID ".$_GET['userid']." error message: (" . $statement->errno . ") " . $statement->error;
		}else{
		$stmt->execute();
		$stmt->bind_result($rtaskactive);
		$stmt->fetch();
		$mysqli2->close();
		$json[0]['Result'] = "Success";
		$json[0]['Active'] = $rtaskactive;
		$json[0]['Message'] = "Successfully updated userid ".$_GET['userid'];
		}
	}
	audit("userdisable", $json[0]['Result']." ".$json[0]['Message']." POSTDATA:".implode(",",$_POST)." GETDATA:".implode(",",$_GET), true);
	echo json_encode($json);
	$mysqli->close();
	exit;
}


?>
