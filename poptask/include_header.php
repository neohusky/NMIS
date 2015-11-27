<div class="header">

<span style="float:right;padding-top:6px;">
<?php
//Calculate how many overdue tasks there is 
$overduesstmt = $mysqli->prepare("SELECT tasks_working.TaskWorkingID
FROM tasks_working 
RIGHT JOIN tasks_master ON tasks_working.TaskID=tasks_master.TaskID
WHERE 
 tasks_master.Active='Y' 
 AND tasks_working.CompletedBy='0'
 AND tasks_working.Scheduled BETWEEN '1999-12-31 00:00:59' AND ?");

$countviewingdateto = date('Y-m-d H:i:s');

if(!$overduesstmt->bind_param('s', $countviewingdateto)){
		echo "Binding parameters failed: (" . $overduesstmt->errno . ") " . $overduesstmt->error;
}

if(!$overduesstmt->execute()){
	echo "Error executing statement: (" . $overduesstmt->errno . ") " . $overduesstmt->error;
}else{
	$overduesstmt->store_result();
	$overduecount = $overduesstmt->num_rows;
}
$overduesstmt->close();
?>
<button id="overduebutton">Overdues <?php echo "(".$overduecount.")";?></button>
<button id="settingsbutton">Settings</button> 
<ul id="menu">
<?php if($_SESSION['level']>1){?><li><a href="user_list.php">Users</a></li><?php } ?>
<li><a href="task_list.php">Tasks</a></li>
</ul>

<button id="accountbutton"><?php echo $_SESSION['username'];?></button> 

<ul id="menu2">
<li><a href="user_list.php">My Account</a></li>
<li><a href="login.php?type=logout">Logout</a></li>
</ul>

</span>


<div >
<table>
<tr><td>
<img  src="img/logo.fw.png">

</td><td style="padding-left:20px; vertical-align:middle;">
<input READONLY="readonly" type="text" id="dateselector" value="<?php 
if (isset($_GET['date'])){
	echo date('D d F Y', strtotime(str_replace('-', '/', $viewingdate)));
}else{ 
	echo date("D d F Y"); 
}

?>">
<div style="display: inline-block; vertical-align: top; margin-top:5px;">
<div id="todaybutton" style="cursor:pointer;" title="Today" class="ui-icon ui-icon-radio-off">Today</div> 
</div>


</td></tr>
</table>


<input type="hidden" id="phpDate" value="<?php 
if(isset($_GET['date'])){
	echo $_GET['date'];
}else{
	echo date("Y-m-d");
}
?>" />
</div></div>
</div>

	<script>
	$(function() {
		$( "#menu" ).menu().hide();
		$( "#menu2" ).menu().hide();
		
		$( "#settingsbutton" ).button({
		  icons: {
			primary: "ui-icon-wrench",
			secondary: "ui-icon-triangle-1-s"
		  }
		}).click(function(){
			 var menu = $("#menu").show().position({
				my: "left top",
				at: "left bottom",
				of: this
				});
				$( document ).one( "click", function() {
					menu.hide();
				});
				return false;
		});		
		
		$( "#overduebutton" ).button({
		  icons: {
			primary: "ui-icon-flag"
		  }
		}).click(function(){
			var uri = "index.php?type=overdue";
			window.location.href = uri;
		});
		
		$( "#accountbutton" ).button({
		  icons: {
			primary: "ui-icon-person",
			secondary: "ui-icon-triangle-1-s"
		  }
		}).click(function(){
			 var menu = $("#menu2").show().position({
				my: "left top",
				at: "left bottom",
				of: this
				});
				$( document ).one( "click", function() {
					menu.hide();
				});
				return false;
		});
		
		$( "#todaybutton" ).click(function(){
			var uri = "index.php";
			window.location.href = uri;
		}).hover(
			function(){ $(this).removeClass('ui-icon-radio-off'), $(this).addClass('ui-icon-bullet') },
			function(){ $(this).removeClass('ui-icon-bullet'), $(this).addClass('ui-icon-radio-off') }
		);
		

		$( "#dateselector" ).datepicker({ dateFormat: "D dd MM yy", altField: "#phpDate", altFormat: "yy-mm-dd", altTimeFormat:"HH:mm", maxDate: '30' } ).change(function(){
		var uri = "index.php?date="+$("#phpDate").val();
			window.location.href = uri;
		});
		
		
		
	});
</script>
<style type="text/css">
	.ui-button{ 
		font-size: 12px;
	}
	.ui-button-text-only .ui-button-text { 
		padding: .05em .6em .2em; 
	}
	.ui-menu { 
		position: absolute; 
		width: 130px; 
	}
	li.underline { 
		border-bottom-style: solid; 
		border-bottom-width:1px; 
	} 
</style>
