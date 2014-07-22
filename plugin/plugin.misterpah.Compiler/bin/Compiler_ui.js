
	var prefix = plugin.misterpah.Compiler;
	var prefix_str = "plugin.misterpah.Compiler";
	
	Main.message.listen("plugin.misterpah.ProjectAccess:close_project.complete","plugin.misterpah.Compiler:js:Compiler_ui.js",function()
		{
		$("#compiler_position").html("");
		});


	Main.message.listen("plugin.misterpah.ProjectAccess:system_parse_project.complete","plugin.misterpah.Compiler:js:Compiler_ui.js",function()
		{

		$("#compiler_position").html("");
		prefix.compile_target = ['<select width="100%" style="width:100%;" id="compileTarget" class="btn-group-sm">',
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


		prefix.compile_parameter = ['<select width="100%" style="width:100%;" id="compileParameter" class="btn-group-sm">',
		'<option>test</option>',
		'<option>test -Ddebug</option>',
		'<option>run</option>',
		'<option>build</option>',
		'</select>'].join('\n');

		prefix.compile_request = function()
			{
			Main.message.broadcast("plugin.misterpah.Compiler:compile_request","plugin.misterpah.Compiler:js:Compiler_ui.js");
			};
		//$("#compiler_position").attr("style","padding:10px;");
		$("#compiler_position").append("<br/>");
		$("#compiler_position").append(prefix.compile_target);
		$("#compiler_position").append("<br/><br/>");
		$("#compiler_position").append(prefix.compile_parameter);
		$("#compiler_position").append("<br/><br/>");
		$("#compiler_position").append('<button style="width:100%;" type="button" onclick="'+prefix_str+'.compile_request()" class="btn btn-danger btn-xs shadowme">Compile</button>');
		
		
		Main.message.broadcast("plugin.misterpah.Compiler:display_compiler.complete","plugin.misterpah.Compiler:js:Compiler_ui.js");
		});

