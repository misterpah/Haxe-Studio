$("#compiler_position").html("");

var compile_target = ['<select id="compileTarget" class="btn-group-sm">',
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


var compile_parameter = ['<select id="compileParameter" class="btn-group-sm">',
'<option>test</option>',
'<option>run</option>',
'<option>build</option>',
'</select>'].join('\n');

function compile_request()
	{
	Main.message.broadcast("plugin.misterpah.Compiler:compile_request","plugin.misterpah.Compiler:js:Compiler_ui.js");
	}

$("#compiler_position").append(compile_target);
$("#compiler_position").append("&nbsp;&nbsp;");
$("#compiler_position").append(compile_parameter);
$("#compiler_position").append("&nbsp;&nbsp;");
$("#compiler_position").append('<button type="button" onclick="compile_request()" class="btn btn-danger btn-xs shadowme">Compile</button>');