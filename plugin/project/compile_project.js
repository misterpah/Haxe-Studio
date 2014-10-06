var project = (function(obj)
{
	var _c = central;
	var _cp = central.project;

	function build_userInterface()
		{
		$("#compiler_position").html("");
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

		//$("#compiler_position").attr("style","padding:10px;");
		$("#compiler_position").append("<br/>");
		$("#compiler_position").append(compile_target);
		$("#compiler_position").append("<br/><br/>");
		$("#compiler_position").append(compile_parameter);
		$("#compiler_position").append("<br/><br/>");
		$("#compiler_position").append('<button style="width:100%;" type="button" onclick="project.compile_project_request()" class="btn btn-danger btn-xs shadowme">Compile</button>');
		$("#compiler_position").append("<br/><br/>");
		$("#compiler_position").append("<br/><br/>");
		$("#compiler_position").append("<div id='compiler_error'></div>");
		
		central.event.broadcast("display_compiler.complete","project.compile_project","");
		}

	obj.compile_project_request = function()
		{
		console.dir($("#compileParameter").val());
		console.dir($("#compileTarget").val());
		central.event.broadcast("compile_request","project.compile_project.js",{"parameter":$("#compileParameter").val(),"target":$("#compileTarget").val()});
		};

	obj.compile_project_ui = function(filename)
		{
		build_userInterface();
		}
	return obj;
})(project);
