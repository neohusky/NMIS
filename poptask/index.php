<?php
include_once("db_connect.php");
include_once("functions.php");
$mysqli=connectdb();

//Get the date user has requested or choose today if none.
if (isset($_GET['date'])){
	$viewingdate = $_GET['date'];
}else{
	$viewingdate = date("m-j-Y");
}
$viewingdate = date('Y-m-d H:i:s', strtotime(str_replace('-', '/', $viewingdate)));

if (isset($_GET['type'])){
	if($_GET['type']=="overdue"){
		$overdues=true;
	}else{
		$overdues=false;
	}
}?>
<!doctype html> 
<html>
 
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"></meta>
    <title>Poptask</title>
	<?php include('script_declarations.php'); ?>

	<script>
	$(function() {
			
	$.pnotify.defaults.styling = "jqueryui";
	$.pnotify.defaults.history = false;
        $( document ).tooltip();
		$( ".usercompletedselect" ).click(function() {
			var taskid = $(this).attr("taskid");
			var thisdate = '<?php echo date('Y-m-d', strtotime(str_replace('-', '/', $viewingdate))); ?>';
			
			$.get( "task_working_update.php?type=a&taskid="+taskid+"&date="+thisdate , function() {
			<?php if($overdues){?>
				$("#task"+taskid).html("<div style='width:100%; text-align:right'><a style='text-decoration:none;' href='task_working_update.php?type=b&taskid="+taskid+"&date="+thisdate+"'>Undo</a></div>");
			<?php }else{ ?>
				location.reload();
			<?php } ?>
			});
			
		});
		$( ".useruncompletedselect" ).click(function() {
			var taskid = $(this).attr("taskid");
			var thisdate = '<?php echo date('Y-m-d', strtotime(str_replace('-', '/', $viewingdate))); ?>';
			$.get( "task_working_update.php?type=b&taskid="+taskid+"&date="+thisdate , function() {
				location.reload();
			});

		});	
		

		
		$( ".moredetailbtn" ).click(function(){
			if($(this).text()=="more..."){
				var curHeight = $(this).prev().height();
				$(this).prev().css('height', 'auto');
				$(this).prev().prev().find(".completedtime").animate({opacity:1});
				$(this).prev().css('color', '#000');
				var autoHeight = $(this).prev().height()+5;
				$(this).prev().height(curHeight).animate({height: autoHeight}, 400);
				$(this).text('');
			}else{

			}
		});
		$(".completedtime").animate({opacity:0});
		$('.notes').watermark('notes...');
		$( ".notesavebtn" ).button({
				  icons: {
					primary: "ui-icon-disk"
				  }
		}).click(function(){
			var notes = $(this).parent().find(".notes").val();
			var taskid = $(this).parent().find(".notes").attr("taskid");
			$.post( "task_working_update.php", { type: "c", taskid: taskid, notes: notes  }, function(json) {
						
						$.pnotify({
								title: json[0].Result,
								text: json[0].Message,
								type: json[0].Result
						});

			}, 'json');
						return false;
			});
	});
  </script>
  <style type="text/css">
.ui-button{ 
    font-size: 8px;
}
.ui-button-text-only .ui-button-text { 
    padding: .05em .6em .2em; 
}
</style>

</head>

<body>

<?php 
$i=1;
include('include_header.php');?>
<?php
$stmt = $mysqli->prepare("Select tasks_working.TaskWorkingID, tasks_master.Title, tasks_working.Scheduled, users.Name, tasks_working.Completed, tasks_working.TaskID, tasks_master.Details, tasks_master.RRule, tasks_working.CompletedBy, notify.NotifyID, tasks_working.Notes
FROM tasks_working 
RIGHT JOIN tasks_master ON tasks_working.TaskID=tasks_master.TaskID
LEFT JOIN users ON tasks_working.CompletedBy=users.UserID
LEFT JOIN notify ON ?=notify.UserID AND tasks_working.TaskID = notify.TaskID
WHERE 
 tasks_working.Scheduled BETWEEN ? AND ?
 AND CompletedBy LIKE ?
 AND tasks_master.Active LIKE ?
ORDER BY tasks_working.Scheduled ASC");

$completedby = "%";
$isactive = "%";
$viewingdateto = substr($viewingdate, 0, 10)." 23:59:59";
if($overdues){
	$viewingdate = "1999-12-31 00:00:59";
	$viewingdateto = date('Y-m-d H:i:s');
	$completedby = "0";
	$isactive = "Y";
}

if(!$stmt->bind_param('issss', $_SESSION['userid'], $viewingdate, $viewingdateto, $completedby, $isactive)){
		echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
}

$stmt->execute();
$stmt->bind_result($rtaskworkingid, $rtasktitle, $rscheduled, $rtaskcompletedby, $rtaskcompletedtime, $rstaskid, $rtaskdetail, $rrrule, $rtaskcompletedbyid, $rnotifyid, $rnotes);
while($stmt->fetch()){
?>
<div class="taskitem" id="task<?php echo $rtaskworkingid;?>" style="<?php if ($i==1){echo "margin-top:10px;"; $i++;}?> <?php if($rtaskcompletedby!=""){echo "opacity:0.4;";}?>">
<div style="width:100%; height:100%;">
<div style="float:right; text-align:right;">
<table style="width:100%;"><tr><td style="text-align:right;">
<?php
if ($rtaskcompletedby==""){
        echo "Not Completed";
}else{
        echo $rtaskcompletedby;
}
echo "</td><td style='width:16px'>";
if($rtaskcompletedbyid==$_SESSION['userid']){
echo '<div style="display: inline-block; cursor:pointer;  vertical-align: middle; margin-top:-4px;">
    <span taskid="'.$rtaskworkingid.'"  class="ui-icon ui-icon-circle-close useruncompletedselect" title="Clear completed user"></span>
</div>';
}else{
echo '<div style="display: inline-block; cursor:pointer;  vertical-align: middle; margin-top:-4px;">
    <span taskid="'.$rtaskworkingid.'"  class="ui-icon ui-icon-circle-check usercompletedselect" title="Mark completed by me"></span>
</div>';
} ?>
</td></tr></table>
<span class="completedtime" title="Last changed" style="font-size:9px;"><?php echo $rtaskcompletedtime;?></span>
</div>

<?php echo $rscheduled; if($rnotifyid!=''){?>
<div style="display: inline-block; vertical-align: middle; margin-top:-4px;">
 <span style="margin-top:-1px;" class="ui-icon ui-icon-clock" title="You have reminders turned on for this task"></span>
</div>
<?php } ?><br />

<span style="font-size:26px;"><?php echo $rtasktitle;?></div>
<div class="moredetail"  <?php if($rtaskcompletedby!=""){echo "style='height:0px;'";}?>><?php echo make_links_clickable(nl2br($rtaskdetail)); ?>
	<div style="width:100%; text-align:right; ">
	<textarea taskid="<?php echo $rtaskworkingid;?>" class="notes" style="margin-top:10px; width:100%; border:1px solid #C0C0C0;"><?php echo $rnotes;?></textarea>
	<div class="notesavebtn">Save</div>
	</div>
</div>

<div class="moredetailbtn">more...</div>
 
</div>

</div>

<?php
}
$mysqli->close();
?>

</table>

</body>
</html>
