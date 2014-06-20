(function ($hx_exports) { "use strict";
$hx_exports.plugin = $hx_exports.plugin || {};
$hx_exports.plugin.misterpah = $hx_exports.plugin.misterpah || {};
var Session = $hx_exports.Session = function() { };
Session.__name__ = ["Session"];
var Type = function() { };
Type.__name__ = ["Type"];
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
};
var plugin = {};
plugin.misterpah = {};
plugin.misterpah.Compiler = $hx_exports.plugin.misterpah.Compiler = function() { };
plugin.misterpah.Compiler.__name__ = ["plugin","misterpah","Compiler"];
plugin.misterpah.Compiler.main = function() {
	plugin.misterpah.Compiler.create_ui();
	plugin.misterpah.Compiler.register_listener();
};
plugin.misterpah.Compiler.plugin_path = function() {
	return "../plugin/" + Type.getClassName(plugin.misterpah.Compiler) + "/bin";
};
plugin.misterpah.Compiler.create_ui = function() {
	Utils.loadJS(plugin.misterpah.Compiler.plugin_path() + "/Compiler_ui.js",function() {
	});
	Utils.loadCSS(plugin.misterpah.Compiler.plugin_path() + "/Compiler_ui.css");
};
plugin.misterpah.Compiler.register_listener = function() {
	Main.message.listen("plugin.misterpah.Compiler:compile_request","plugin.misterpah.Compiler",function() {
		plugin.misterpah.Compiler.compile_project();
	});
};
plugin.misterpah.Compiler.compile_project = function() {
	var compile_target = $("#compileTarget").val();
	var compile_parameter = $("#compileParameter").val();
	var compile_string = "lime " + compile_parameter + " " + compile_target;
	if(compile_target == "HXML") compile_string = "haxe %QUOTE%" + Main.session.project_xml + "%QUOTE%";
	console.log(compile_string);
	hs_console("compiling : " + compile_string);
	Utils.exec(["cd %CD% %QUOTE%" + Main.session.project_folder + "%QUOTE%",compile_string],function(error,stdout,stderr) {
		notify("Compiling complete","success");
		if(stderr != "") {
			localStorage.showError = "true";
			localStorage.compile_error_status = stdout;
			localStorage.compile_error_error = stderr;
			if(error != null) Utils.gui.Window.open("./debugger.html",{ title : "debugger", position : "center", toolbar : false, focus : false});
		}
		if(stderr == "") localStorage.showError = "false";
		console.log(error);
		console.log(stdout);
		console.log(stderr);
	});
};
String.__name__ = ["String"];
Array.__name__ = ["Array"];
plugin.misterpah.Compiler.main();
})(typeof window != "undefined" ? window : exports);

//# sourceMappingURL=plugin.js.map