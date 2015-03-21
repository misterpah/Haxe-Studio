var project = (function(obj)
{
	var _c = central;
	var _cp = central.project;

	function build_userInterface_lime()
		{
		var compile_target = ['<select width="100%" style="width:100%;" id="compileTarget" class="btn-group-sm">',
		'<option>flash</option>',
		'<option>html5</option>',
		'<option>neko -32</option>',
		'<option>neko -64</option>',
		'<option>linux</option>',
		'<option>mac</option>',
		'<option>windows</option>',
		'<option>android</option>',
		'<option>ios</option>',
		'<option>tizen</option>',
		'<option>webos</option>',
		'<option>blackberry</option>',
		'<option>HXML</option>',
		'</select>'].join('\n');


		var compile_parameter = ['<select width="100%" style="width:100%;" id="compileParameter" class="btn-group-sm">',
		'<option>test</option>',
		'<option>test -Ddebug</option>',
		'<option>run</option>',
		'<option>build</option>',
		'</select>'].join('\n');

		$("#compiler_target").html(compile_target);
		$("#compiler_parameter").html(compile_parameter);
		$("#compiler_button_compile").append('<p style="padding-left:5px;"><button style="width:100%;" type="button" onclick="project.compile_project_request()" class="btn btn-default btn-xs shadowme"><b>Compile</b></button></p>');
		$("#compiler_button_checkError").append('<p style="padding-left:5px;"><button style="width:100%;" type="button" onclick="central.event.broadcast(\'ToolsMenu.checkForError\',\'compile.ui.js\',\'\');" class="btn btn-default btn-xs shadowme">Check Error</button></p>');
		
		central.event.broadcast("display_compiler.complete","project.compile_project","");
		}

	obj.compile_project_request = function()
		{
		console.dir($("#compileParameter").val());
		console.dir($("#compileTarget").val());
		central.event.broadcast("compile_request","project.compile_project.js",{"parameter":$("#compileParameter").val(),"target":$("#compileTarget").val(),"compiler":"lime"});
		};

	obj.compile_project_ui = function()
		{
		if(typeof $("#compiler_target").html() == "undefined")
			{
			$("#main_menu").append("<li style='margin-top:6px;margin-right:6px;' id='compiler_target'></li>");
			}
		if(typeof $("#compiler_parameter").html() == "undefined")
			{			
			$("#main_menu").append("<li style='margin-top:6px' id='compiler_parameter'></li>");
			}
		if(typeof $("#compiler_button_compile").html() == "undefined")
			{			
			$("#main_menu").append("<li style='margin-top:6px' id='compiler_button_compile'></li>");
			}		
		if(typeof $("#compiler_button_checkError").html() == "undefined")
			{			
			$("#main_menu").append("<li style='margin-top:6px' id='compiler_button_checkError'></li>");
			}					
		build_userInterface_lime();
		}
	central.event.listen("openProject.complete",obj.compile_project_ui);
		
	return obj;
})(project);
