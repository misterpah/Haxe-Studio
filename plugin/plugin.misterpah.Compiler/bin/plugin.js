(function ($hx_exports) { "use strict";
$hx_exports.plugin = $hx_exports.plugin || {};
$hx_exports.plugin.misterpah = $hx_exports.plugin.misterpah || {};
var Session = $hx_exports.Session = function() { };
var plugin = {};
plugin.misterpah = {};
plugin.misterpah.Compiler = $hx_exports.plugin.misterpah.Compiler = function() { };
plugin.misterpah.Compiler.main = function() {
	plugin.misterpah.Compiler.register_listener();
};
plugin.misterpah.Compiler.register_listener = function() {
	Main.message.listen("plugin.misterpah.ProjectTree:compile_Hxml","plugin.misterpah.Compiler",function() {
		plugin.misterpah.Compiler.compile_to_target("HXML");
	});
	Main.message.listen("plugin.misterpah.ProjectTree:compile_Flash","plugin.misterpah.Compiler",function() {
		plugin.misterpah.Compiler.compile_to_target("LIME-FLASH");
	});
	Main.message.listen("plugin.misterpah.ProjectTree:compile_Neko","plugin.misterpah.Compiler",function() {
		plugin.misterpah.Compiler.compile_to_target("LIME-NEKO");
	});
	Main.message.listen("plugin.misterpah.ProjectTree:compile_Html5","plugin.misterpah.Compiler",function() {
		plugin.misterpah.Compiler.compile_to_target("LIME-HTML5");
	});
	Main.message.listen("plugin.misterpah.ProjectTree:compile_Android","plugin.misterpah.Compiler",function() {
		plugin.misterpah.Compiler.compile_to_target("LIME-ANDROID");
	});
};
plugin.misterpah.Compiler.compile_to_target = function(target) {
	var compile_string = "";
	switch(target) {
	case "HXML":
		compile_string = "haxe %QUOTE%" + Main.session.project_xml + "%QUOTE%";
		break;
	case "LIME-FLASH":
		compile_string = "lime test flash";
		break;
	case "LIME-NEKO":
		compile_string = "lime test neko";
		break;
	case "LIME-HTML5":
		compile_string = "lime test html5";
		break;
	case "LIME-ANDROID":
		compile_string = "lime test android";
		break;
	default:
		console.log("wat?");
		return;
	}
	notify("Compiling to " + target,"info");
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
plugin.misterpah.Compiler.main();
})(typeof window != "undefined" ? window : exports);

//# sourceMappingURL=plugin.js.map