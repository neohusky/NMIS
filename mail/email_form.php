<?php
switch (@$_GET['do'])
{

    case "send":

        $fname = $_POST['fname'];
        $lname = $_POST['lname'];
        $femail = $_POST['femail'];
        $f2email = $_POST['f2email'];
        $saddy = $_POST['saddy'];
        $scity = $_POST['scity'];
        $szip = $_POST['szip'];
        $fphone1 = $_POST['fphone1'];

        $mname = $_POST['mname'];
        $sapt = $_POST['sapt'];
        $sstate = $_POST['sstate'];
        $scountry = $_POST['scountry'];
        $fphone2 = $_POST['fphone2'];
        $fphone3 = $_POST['fphone3'];
        $fsendmail = $_POST['fsendmail'];
        $secretinfo = $_POST['info'];

        if (!preg_match("/\S+/",$fname))
        {
            unset($_GET['do']);
            $message = "First Name required. Please try again.";
            break;
        }
        if (!preg_match("/\S+/",$lname))
        {
            unset($_GET['do']);
            $message = "Last Name required. Please try again.";
            break;
        }
        if (!preg_match("/^\S+@[A-Za-z0-9_.-]+\.[A-Za-z]{2,6}$/",$femail))
        {
            unset($_GET['do']);
            $message = "Primary Email Address is incorrect. Please try again.";
            break;
        }
        if ($f2email){
            if (!preg_match("/^\S+@[A-Za-z0-9_.-]+\.[A-Za-z]{2,6}$/",$f2email))
            {
                unset($_GET['do']);
                $message = "Secondary Email Address is incorrect. Please try again.";
                break;
            }
        }
        if (!preg_match("/\S+/",$saddy))
        {
            unset($_GET['do']);
            $message = "Street Address required. Please try again.";
            break;
        }
        if (!preg_match("/\S+/",$scity))
        {
            unset($_GET['do']);
            $message = "City required. Please try again.";
            break;
        }
        if (!preg_match("/^[0-9A-Za-z -]+$/",$szip))
        {
            unset($_GET['do']);
            $message = "Zip/Post Code required. Please try again.";
            break;
        }
        if (!preg_match("/^[0-9 #\-\*\.\(\)]+$/",$fphone1))
        {
            unset($_GET['do']);
            $message = "Phone Number 1 required. No letters, please.";
            break;
        }

        if ($secretinfo == "")
        {
            $myemail = "postmaster@example.com";
            $emess = "First Name: ".$fname."\n";
            $emess.= "Middle Name: ".$mname."\n";
            $emess.= "Last Name: ".$lname."\n";
            $emess.= "Email 1: ".$femail."\n";
            $emess.= "Email 2: ".$f2email."\n";
            $emess.= "Street Address: ".$saddy."\nApt/Ste: ".$sapt."\n";
            $emess.= "City: ".$scity."\nState: ".$sstate."\nZip/Post Code:".$szip."\n";
            $emess.= "Country: ".$scountry."\n";
            $emess.= "Phone number 1: ".$fphone1."\n";
            $emess.= "Phone number 2: ".$fphone2."\n";
            $emess.= "Phone number 3: ".$fphone3."\n";
            $emess.= "Comments: ".$fsendmail;
            $ehead = "From: ".$femail."\r\n";
            $subj = "An Email from ".$fname." ".$mname." ".$lname."!";
            $mailsend=mail("$myemail","$subj","$emess","$ehead");
            $message = "Email was sent.";
        }

        unset($_GET['do']);
        header("Location: thank_you.html");
        break;

    default: break;
}
?>