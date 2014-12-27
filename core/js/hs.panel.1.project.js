(function(){	
	var tree_position_content = [
	'<div id="tree_position" style="max-height:150px;overflow:scroll;">',
	'<div style="color:#ffffff;" class="shadowme">',
	'<br/>',
	'<button type="button" class="btn btn-primary btn-block" onclick=\'central.event.broadcast("FileMenu.newProject","index.html:button:right_part","");\'>New Project</button>',
	'<br/>',
	'<button type="button" class="btn btn-primary btn-block" onclick=\'central.event.broadcast("FileMenu.openProject","index.html:button:right_part","");\'>Open Project</button>',
	'</div>',
	'</div>',
	].join("\n");
	$("#power_menu").append(support.makeSidePanel("ProjectPanel","Project",tree_position_content));
})(hs);
