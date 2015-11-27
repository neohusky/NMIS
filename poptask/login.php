<?php
if (!file_exists("config.ini.php")) {
	echo "<h2>Error: The file config.ini.php doesnt exist. Please run setup.php if to create this file.</h2>";
}
if(isset($_GET['type'])){
	if($_GET['type']=="logout"){
		session_start();
		$_SESSION['userid']="";
		$_SESSION['loggedin']=false;
		$_SESSION['username']="";
		session_destroy();
		$message="Successfully logged out";
	}
}

if(isset($_POST['username'])){
	$message = "Sorry incorrect username or password entered.";
	include_once("db_connect.php");
	$mysqli=connectdb(true);
	$stmt = $mysqli->prepare("SELECT UserID, Password, UserLevel FROM users WHERE Username=? AND Active='Y'");

	if(!$stmt->bind_param('s', $_POST['username'])){
		echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
	}
	
	$stmt->execute();
	$stmt->bind_result($ruserid, $rpassword, $rlevel);
	while($stmt->fetch()){
		$hashedpass=hash("sha256", $_POST['password'] . "the world is a vamp1re");
		if($rpassword==$hashedpass){
			session_start();
			$_SESSION['userid']=$ruserid;
			$_SESSION['username']=$_POST['username'];
			$_SESSION['loggedin']=true;
			$_SESSION['level']=$rlevel;
			audit("login", "Success: ".$_POST['username'], $bypass=false);
			header("Location:index.php");
			exit;
		}else{
			$_SESSION['userid']="";
			$_SESSION['loggedin']=false;
		}
	}
	audit("login", "Failed Login: ".$_POST['username'], true);
}
?><!DOCTYPE html>
<!--[if lt IE 7 ]> <html lang="en" class="ie6 ielt8"> <![endif]-->
<!--[if IE 7 ]>    <html lang="en" class="ie7 ielt8"> <![endif]-->
<!--[if IE 8 ]>    <html lang="en" class="ie8"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--> <html lang="en"> <!--<![endif]-->
<head>
<meta charset="utf-8">
<title>Poptask</title>
<link rel="stylesheet" type="text/css" href="css/login.css" />
</head>

<body>
<div class="container">
	<section id="content">
		<form action="login.php" method="POST">
			<img src="img/logo.fw.png">
			<div>
				<input type="text" placeholder="Username" required="" id="username" name="username"  autocomplete="off" />
			</div>
			<div>
				<input type="password" placeholder="Password" id="password" name="password"  autocomplete="off" />
			</div>
			<div>
				<input type="submit" value="Log in" />	
			</div>
		</form><!-- form -->
		<?php if(isset($message)){?>
		<div class="button">
				<?php echo $message;?>
		</div>
		<?php }?>
	</section><!-- content -->
</div><!-- container -->
</body>
</html>
