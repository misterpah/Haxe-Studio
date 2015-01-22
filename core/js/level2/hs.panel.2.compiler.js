(function(){	
	var content = [
	'<div id="compiler_position" style="padding:5px;">',
	'<p style="color:#ffffff" class="shadowme">',
	'Open project first',
	'</p>',
	'</div>',
	].join("\n");
	$("#power_menu").append(support.makeSidePanel("CompilerPanel","Compiler",content));
	//$(".content_status_position").append(support.collapsible("compiler_position","Compiler","open project"));  
})(hs);
