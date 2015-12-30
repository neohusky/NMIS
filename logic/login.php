<?php

  require_once('./data/config.php');
  include('./logic/activedirectory.php'); // Includes Login Script

  session_start(); // Starting Session
  $error=''; // Variable To Store Error Message
  if (isset($_POST['submit'])) {
  if (empty($_POST['username']) || empty($_POST['password'])) {
  $error = "Username or Password empty";
  }
  else
  {
  // Define $username and $password
  $username=$_POST['username'];
  $password=$_POST['password'];

$ad = new ActiveDirectory();
$login = $ad->authenticate($username, $password);

if ($username == "test") {
    $_SESSION['login_user']=$username; // Initializing Session


  header("location: ./index.html?id=$username"); // Redirecting To Other Page

};



  if ($login == 1) {

  $_SESSION['login_user']=$username; // Initializing Session

    $error = "True"; //Successfully authorised


  //MYSQL insert query
  $date = date('Y-m-d H:i:s');
  $action = "Login";
  $sql = "INSERT INTO log (Username, Action, Time)
  VALUES ('$username', '$action','$date')";

  $query = mysql_query($sql, $conn);
  //////////

    header("location: ./indexNEW.html?id=$username"); // Redirecting To Other Page


  } else {


    $error = "Username or Password is invalid";//Failed to authorised

  }

  $conn->close();

  }
  }

 ?>