support.build_modal = function(title,content,functionAfterClose,closeButton)
	{
	delete(sessionStorage.genModalClicked);
	closeButton = (typeof closeButton === "undefined") ? "Close" : closeButton;
	if ($(".sweet-alert").css("display") != "none")
		{
		console.log("splash aren't closed yet.");
		return;
		}
	
	if ($("#genModal").html() != undefined)
		{
		console.log("only 1 modal per time");
		return;
		}
	var clicked_input = "";
	var ret =
	['<div class="modal fade" id="genModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">',
'  <div class="modal-dialog">',
'    <div class="modal-content">',
'      <div class="modal-header">',
'        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
'        <h4 class="modal-title" id="myModalLabel">'+title+'</h4>',
'      </div>',
'      <div class="modal-body">',
content,
'      </div>',
'      <div class="modal-footer">',
'        <button type="button" class="btn btn-default" onClick="sessionStorage.genModalClicked=\'true\'"  data-dismiss="modal"  >'+closeButton+'</button>',
'      </div>',
'    </div>',
'  </div>',
'</div>'].join("\n");	
$("body").append(ret);

	$('#genModal').modal('show');
		
	$('#genModal').on('shown.bs.modal', function (e) {
		$("#genmodal button").focus();
		});
	
	
	$('#genModal').on('hidden.bs.modal', function (e) {
	
		Q.fcall(function()
			{
			return functionAfterClose();
			})
		.then(function()
			{
  			$("#genModal").remove();
  			});
	});
	}



