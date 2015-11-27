<?php
include_once("db_connect.php");
$mysqli=connectdb();
?>
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

		var selecteditems;
		$( "#addbutton" ).button({
		  icons: {
			primary: "ui-icon-plus"
		  }
		}).click(function(){
		
		$( "#adddialog" ).dialog({ 
			autoOpen: false,
			title: "Add User",
			width: "700px",
			modal: false,
			buttons: {
				Save: function() {
					if($("#addform")[0].checkValidity()){

					$("#addform").submit(function(){
						$.post($(this).attr('action'), $(this).serialize(), function(json) {
	      					if(json[0].Result=='Success'){
							location.reload();
						}else{
						$.pnotify({
                                                	title: 'error',
	                                                text: 'Error Updating User '.json[0].Message,
	                                                type: 'error'
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
                                               type: 'error'
                                        });
					}
				},
				Close: function() {
					$( this ).dialog( "close" );
				}
			}
		});

		$( "#adddialog" ).dialog( "open" );
		});
		$( "#editbutton" ).button({
		  icons: {
			primary: "ui-icon-wrench"
		  }
		}).click(function(){

			$( "#editdialog" ).dialog({ 
				autoOpen: false,
				title: "Edit User",
				width: "700px",
				modal: true,
				buttons: {
					Save: function() {
						$thisdialog = $( this );
						$("#editform").submit(function(){
							$.post($(this).attr('action'), $(this).serialize(), function(json) {
		
	      					if(json[0].Result=='Success'){
							$("#name"+selecteditem).html(json[0].Name);
							$("#username"+selecteditem).html(json[0].Username);
							$thisdialog.dialog( "close" )
							$.pnotify({
								title: 'Success',
								text: 'User Updated Successfully',
								type: 'success'
							});
						}else{
							$.pnotify({
								title: 'error',
								text: 'Error Updating User '.json[0].Message,
								type: 'error'
							});

						}
	      					
		
						}, 'json');
							return false;
						});
						$("#editform").submit();
					},
					Close: function() {
						$( this ).dialog( "close" );
						$("#nameinput").val('');
		                                $("#usernameinput").val('');
                		                $("#emailinput").val('');
	                                	$("#passwordinput").val(null);
        		                        $("#useridhidden").val('');
                        		        $("#userlevel").val('');

					}
				}
			});				
			
			
			//Get the values to populate into the edit box fields.
		
			var url="user_get.php?userid="+selecteditem;
			
			$.getJSON(url,function(json){ 
	
				$("#nameinput").val(json[0].Name);
				$("#usernameinput").val(json[0].Username);
				$("#emailinput").val(json[0].Email);
				$("#passwordinput").val(null);
				$("#useridhidden").val(selecteditem);
				$("#userlevel").val(json[0].UserLevel);
				$( "#editdialog" ).dialog( "open" );
			});
			
			
		}).prop("disabled", true).addClass("ui-state-disabled");
		$( "#enablebutton" ).button({
		  icons: {
			primary: "ui-icon-closethick"
		  }
		}).click(function(){
			$('<div></div>').appendTo('body')
                    .html('<div><h6>Are you sure you want to delete the selected user?</h6></div>')
                    .dialog({
                        modal: true, title: 'Delete message', zIndex: 10000, autoOpen: true,
                        width: '300', resizable: false,
                        buttons: {
                            Yes: function () {
                           	var url="user_update.php?type=c&userid="+selecteditem;
				$.getJSON(url,function(json){ 
					if(json[0].Result=="Success"){
						$("#user"+selecteditem).hide(); 
						$.pnotify({
							title: 'Success',
							text: 'User Deleted',
							type: 'success'
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
		
		
		$('.userrow').click(function(){
			selecteditem = $(this).attr("userid");
			$('.userrow').removeClass("selectedrow");
			<?php if($_SESSION['level']>=2){	?>
				$('#enablebutton').prop("disabled", false).removeClass("ui-state-disabled");
			<?php } ?>
			$('#editbutton').prop("disabled", false).removeClass("ui-state-disabled");
			$(this).toggleClass("selectedrow");
			$(this).removeClass("rowhover");
		});

		$(".userrow").hover(function() {
			$(this).addClass("rowhover");
		}, function() {
			$(this).removeClass("rowhover");
		});
		<?php if($_SESSION['level']<2){	?>
			$('#addbutton').prop("disabled", true).addClass("ui-state-disabled");
		<?php } ?>


	});
  </script>
</head>

<body>

<?php include('include_header.php');?>
<div class="actionbar">
<div style="padding:5px;">
<button id="addbutton">Add User</button>
<button id="editbutton">Edit</button>
<button id="enablebutton">Delete</button>
</div>
</div>
<div style="padding:0px;">
<table class="workingtable">
<tr>
<th>User ID</th><th>Name</th><th>Username</th>
</tr>
<?php
if($_SESSION['level']<2){ 
	$stmt = $mysqli->prepare("Select UserID, Name, Username FROM users WHERE Active='Y' AND UserID=? ORDER BY Name ASC");
	$stmt->bind_param("i", $_SESSION['userid']); 
}else {   
	$stmt = $mysqli->prepare("Select UserID, Name, Username FROM users WHERE Active='Y' ORDER BY Name ASC");

}
$stmt->execute();
$stmt->bind_result($ruserid, $rname, $rusername);
      
while($stmt->fetch()){
echo "<tr class='userrow' id='user".$ruserid."' userid='".$ruserid."'><td style='width:5%'>".$ruserid."</td><td id='name".$ruserid."'>".$rname."</td><td id='username".$ruserid."'>".$rusername."</td></tr>";
}
?>
</table>
</div>
<?php if($_SESSION['level']>1){ ?>
<div id="adddialog" style="display:none; width:700px;">
        <form name="addform" action="user_update.php?type=a" method="POST" id="addform">
        Name: <input type="text" name="name" required="">
        Username: <input type="text" name="username"  autocomplete="off" required="">
        Email: <input type="email" name="email"  autocomplete="off" required="">
	User Type: <select name="userlevel" style="width:100%;"><option value="1" SELECTED>Normal User</option><option value="2">Administrator</option></select>
        Password: <input type="password" name="password"  autocomplete="off" required="">
	</form>
</div>
<?php } ?>
<div id="editdialog" style="display:none; width:700px;">
	<form name="editform" action="user_update.php?type=b" method="POST" id="editform">
	Name: <input type="text" name="name" id="nameinput" >
	Username: <input type="text" name="username" id="usernameinput" >
	Email: <input type="text" name="email" id="emailinput"  autocomplete="off"  >
	User Type: <select <?php if ($_SESSION['level']<2){echo "DISABLED";}?> id="userlevel" name="userlevel" style="width:100%;"><option value="1" SELECTED>Normal User</option><option value="2">Administrator</option></select>
	Password: <input type="password" name="password" id="passwordinput" >
	<input type="hidden" name="userid" id="useridhidden">
	</form>
</div>
</body>
</html>
