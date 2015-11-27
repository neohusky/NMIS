<?php
include_once("db_connect.php");

$mysqli=connectdb();
$mysqli2=connectdb();
?>
<!doctype html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"></meta>
    <title>Poptask</title>
	<?php include('script_declarations.php'); ?>

	<link type="text/css" href="rec/lib/jquery.tools.dateinput.css" rel="stylesheet"></link>
	<link type="text/css" href="rec/lib/jquery.tools.overlay.css" rel="stylesheet"></link>
	<link type="text/css" href="rec/src/jquery.recurrenceinput.css" rel="stylesheet"></link>
    <script type="text/javascript" src="rec/lib/jquery.tmpl-beta1.js"></script>
    <script type="text/javascript" src="rec/lib/jquery.tools.dateinput-1.2.7.js"></script>
    <script type="text/javascript" src="rec/lib/jquery.tools.overlay-1.2.7.js"></script>
    <script type="text/javascript" src="rec/src/jquery.recurrenceinput.js"></script>

	<script>
	$(function() {
	var selecteditems;
	$('.taskrow').click(function(){
		selecteditem = $(this).attr("taskid");
		$('.taskrow').removeClass("selectedrow");
<?php if($_SESSION['level']>1){?>
		$('#editbutton').prop("disabled", false).removeClass("ui-state-disabled");
		$('#enablebutton').prop("disabled", false).removeClass("ui-state-disabled");
		$('#deletebutton').prop("disabled", false).removeClass("ui-state-disabled");
		$('#disablebutton').prop("disabled", false).removeClass("ui-state-disabled");
<?php } ?>
		$('#mailbutton').prop("disabled", false).removeClass("ui-state-disabled");
		$(this).addClass("selectedrow");
		$(this).removeClass("rowhover");
	});

	<?php if($_SESSION['level']<2){?>
	$('#addbutton').prop("disabled", true).addClass("ui-state-disabled");
	<?php } ?>
	$(".taskrow").hover(function() {
		$(this).addClass("rowhover");
	}, function() {
		$(this).removeClass("rowhover");
	});
		
	$.pnotify.defaults.styling = "jqueryui";
	$.pnotify.defaults.history = false;
	$( document ).tooltip();
	<?php if(isset($_GET['result'])){
		if($_GET['result']=="s"){
		?>
	$.pnotify({
			title: 'Success',
			text: 'Task successfully added',
			type: 'Success'
	});
		<?php
		}else if($_GET['result']=="es"){
		?>
	$.pnotify({
			title: 'Success',
			text: 'Task sucessfully saved',
			type: 'Success'
	});
		<?php
		}
	}
	?>

		//Add button
		$( "#addbutton" ).button({
		  icons: {
			primary: "ui-icon-plus"
		  }
		}).click(function(){
		$( "#adddialog" ).dialog({ 
			autoOpen: false,
			title: "Add Task",
			width: "700px",
			modal: false,
			buttons: {
				Save: function() {
				 if($("#addform")[0].checkValidity()){

					$("#addform").submit(function(){
						$.post($(this).attr('action'), $(this).serialize(), function(json) {
	      				if(json[0].Result=='success'){
							var uri = "task_list.php?result=s";
							window.location.href = uri;
						}else{
							$.pnotify({
								title: json[0].Result,
								text: json[0].Message,
								type: json[0].Result
							});
						}
      					
					}, 'json');
						return false;
					});
					$("#addform").submit();
				  }else{
						$.pnotify({
							   title: 'Invalid form entries',
							   text: 'Please complete all the fields marked red',
							   type: 'Error'
						});
						}

				},
				Close: function() {
					$( this ).dialog( "close" );
				}
			}
		});
		
		$("#recurrenceinput2").recurrenceinput();

		$( "#adddialog" ).dialog( "open" );

		});
		
		//Generate scripts button
		$( "#generatebutton" ).button({
		  icons: {
			primary: "ui-icon-script"
		  }
		}).click(function(){
			window.location = "task_populator.php"
		});
		
		//Edit button 
		$( "#editbutton" ).button({
		  icons: {
			primary: "ui-icon-wrench"
		  }
		}).click(function(){
			$( "#editdialog" ).dialog({ 
				autoOpen: false,
				title: "Edit Task",
				width: "700px",
				modal: false,
				buttons: {
					Save: function() {
						$thisdialog = $( this );

						$("#editform").submit(function(){
							$.post($(this).attr('action'), $(this).serialize(), function(json) {
		
							if(json[0].Result=='success'){
								var uri = "task_list.php?result=es";
								window.location.href = uri;
								$thisdialog.dialog( "close" );
							}else{
								$.pnotify({
									title: json[0].Result,
									text: json[0].Message,
									type: json[0].Result
								});
							}
							
		
						}, 'json');
							return false;
						});
						$("#editform").submit();
					},
					Close: function() {
						$( this ).dialog( "close" );
						location.reload();
					}
				}
			});
			
			//Get the values to populate into the edit box fields.
			
			var url="task_get.php?taskid="+selecteditem;
			
			$.getJSON(url,function(json){ 
				$("#detailinput").val(json[0].Details);
				$("#titleinput").val(json[0].Title);
				$("#recurrenceinput").val(json[0].RRule);
				$("#timeinput").val(json[0].TheTime);
				$("#rruleholder").text(json[0].RRule);
				$("#taskidhidden").val(selecteditem);
				$("#recurrenceinput").recurrenceinput();
				//Open the dialog once the values have been loaded
				$( "#editdialog" ).dialog( "open" );
			});
			
		}).prop("disabled", true).addClass("ui-state-disabled");
		
		//Toggle enabled button
		$( "#enablebutton" ).button({
		  icons: {
			primary: "ui-icon-check"
		  }
		}).click(function(){
			var url="task_update.php?type=a&taskid="+selecteditem;
			
			$.getJSON(url,function(json){ 
				$('#2active'+selecteditem).remove();
				$("#active"+selecteditem).append(json[0].Frame);
				
			});
		}).prop("disabled", true).addClass("ui-state-disabled");

		//Reminder Button
		$( "#mailbutton" ).button({
		  icons: {
			primary: "ui-icon-mail-closed"
		  }
		}).click(function(){
			var url="task_update.php?type=e&taskid="+selecteditem;
			
			$.getJSON(url,function(json){ 

				$('#mail'+selecteditem).remove();
				$("#notify"+selecteditem).append(json[0].Frame);
				
			});
		}).prop("disabled", true).addClass("ui-state-disabled");

		//Delete Button
		$( "#deletebutton" ).button({
		  icons: {
			primary: "ui-icon-closethick"
		  }
		}).click(function(){
			$('<div></div>').appendTo('body')
                    .html('<div><h6>Are you sure you want to delete the selected task?</h6></div>')
                    .dialog({
                        modal: true, title: 'Delete message', zIndex: 10000, autoOpen: true,
                        width: '300', resizable: false,
                        buttons: {
                            Yes: function () {
								var url="task_update.php?type=d&taskid="+selecteditem;
								
								$.getJSON(url,function(json){ 
									
									if(json[0].Result=="success"){
										$('#task'+selecteditem).hide();
										$.pnotify({
											title: json[0].Result,
											text: json[0].Message,
											type: json[0].Result
										});
						
									}else{
										$.pnotify({
											title: json[0].Result,
											text: json[0].Message,
											type: json[0].Result
										});	
									}
									
								});
			                $(this).dialog("close");
                            },
                            No: function () {
                                $(this).dialog("close");
                            }
                        },
                        close: function (event, ui) {
                            $(this).remove();
                        }
                    });
                    
		
		}).prop("disabled", true).addClass("ui-state-disabled");

		

	});
  </script>
</head>

<body>
<?php include('include_header.php');?>
<div class="actionbar">
<div style="padding:5px;">
<button id="addbutton">Add Task</button>
<button id="editbutton">Edit</button>
<button id="enablebutton">Toggle Enabled</button>
<button id="mailbutton" title="Get an email reminder 15min before a task due if it hasnt been completed">Toggle Reminder</button>
<button id="deletebutton">Delete</button>
<button id="generatebutton" href="task_populator.php" title="Regenerate the tasks for the future (this is cron'd for every 15 min)">Generate 
Tasks</button>
</div>
</div>

<table class="workingtable">
<tr>
<th>Task ID</th><th>Title</th><th>RRule</th><th>Reminder</th><th>Enabled</th>
</tr>
<?php
$stmt = $mysqli->prepare("SELECT TaskID, Title, Details, RRule, Time, Active FROM tasks_master WHERE Visible='Y' ORDER BY Title ASC");
$stmt->execute();
$stmt->bind_result($rtaskid, $rtitle, $rdetails, $rrrule, $rtime, $ractive);
      
while($stmt->fetch()){
echo "<tr class='taskrow' id='task".$rtaskid."' taskid='".$rtaskid."'><td style='width:5%'>".$rtaskid."</td><td id='title".$rtaskid."'>".$rtitle."</td><td>".$rrrule."</td><td id='notify".$rtaskid."'>";
$stmt2 = $mysqli2->prepare("SELECT TaskID FROM notify WHERE UserID=? AND TaskID=?");

if(!$stmt2->bind_param('ii',  $_SESSION['userid'], $rtaskid)){
    echo "Binding parameters failed: (" . $stmt2->errno . ") " . $stmt2->error;
}
$stmt2->execute();
$stmt2->bind_result($rnotify);
$stmt2->fetch();
$stmt2->close();
if($rnotify==$rtaskid){
	echo '<div id="mail'.$rtaskid.'" style="display: inline-block;">
    <span style="margin-top:-1px;" class="ui-icon ui-icon-clock" title="You have reminders turn on for this task"></span>
</div>';
}
echo "</td><td style='vertical-align:top;' id='active".$rtaskid."'>";
if ($ractive=="Y"){
echo '<div id="2active'.$rtaskid.'" style="display: inline-block;">
    <span style="margin-top:-1px;" class="ui-icon ui-icon-circle-check" title="This task is enabled"></span>
</div>';
}
echo "</td></tr>";
}
?>
</table>

<div id="adddialog" style="display:none; width:700px;">
        <form name="addform" action="task_update.php?type=c" method="POST" id="addform">
        Title: <input type="text" name="title" required=""/>
        Details:<textarea name="details" style="height:300px;" required=""></textarea>
		Time (eg 17:00):<input type="text" name="time" required="">
        RRule:<input type="text" name="rrule" id="recurrenceinput2">
	</form>
</div>

<div id="editdialog" style="display:none; width:700px;">
	<form  action="task_update.php?type=b" method="POST" id="editform">
	Title: <input type="text" name="title" id="titleinput" />
	Details:<textarea id="detailinput" name="details" style="height:300px;"></textarea>
	Time (eg 17:00):<input type="text" name="time" id="timeinput">
	RRule: <span id="rruleholder">None</span><input type="text" name="rrule" id="recurrenceinput">
	<input type="hidden" name="taskid" id="taskidhidden">
	</form>
</div>
</body>
</html>
