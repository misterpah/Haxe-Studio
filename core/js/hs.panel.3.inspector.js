(function(){	
	var content = [
	'<div id="inspector_position" style="max-height:150px;overflow:scroll;padding:5px;">',
	'<div style="color:#ffffff;" class="shadowme">',
	'<p>nothing detected</p>',
	'</div>',
	'</div>',
	].join("\n");
	$("#power_menu").append(support.makeSidePanel("InspectorPanel","Inspector",content));
})(hs);
