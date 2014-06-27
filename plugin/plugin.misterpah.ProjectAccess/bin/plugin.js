(function ($hx_exports) { "use strict";
$hx_exports.plugin = $hx_exports.plugin || {};
$hx_exports.plugin.misterpah = $hx_exports.plugin.misterpah || {};
var IMap = function() { };
var Session = $hx_exports.Session = function() { };
var haxe = {};
haxe.ds = {};
haxe.ds.StringMap = function() { };
haxe.ds.StringMap.__interfaces__ = [IMap];
var plugin = {};
plugin.misterpah = {};
plugin.misterpah.ProjectAccess = $hx_exports.plugin.misterpah.ProjectAccess = function() { };
plugin.misterpah.ProjectAccess.main = function() {
	plugin.misterpah.ProjectAccess.register_listener();
	plugin.misterpah.ProjectAccess.register_shortcutkey();
};
plugin.misterpah.ProjectAccess.register_shortcutkey = function() {
};
plugin.misterpah.ProjectAccess.register_listener = function() {
	Main.message.listen("core:FileMenu.openProject","plugin.misterpah.ProjectAccess",plugin.misterpah.ProjectAccess.open_project);
	Main.message.listen("core:FileMenu.closeProject","plugin.misterpah.ProjectAccess",plugin.misterpah.ProjectAccess.close_project);
	Main.message.listen("plugin.misterpah.ProjectAccess","plugin.misterpah.ProjectAccess",plugin.misterpah.ProjectAccess.parse_project_complete);
	Main.message.listen("plugin.misterpah.ProjectAccess:open_project_auto","plugin.misterpah.ProjectAccess",plugin.misterpah.ProjectAccess.open_project_auto);
};
plugin.misterpah.ProjectAccess.open_project_auto = function() {
	plugin.misterpah.ProjectAccess.parse_project();
};
plugin.misterpah.ProjectAccess.open_project = function() {
	var filedialog = new ui.FileDialog();
	filedialog.show(plugin.misterpah.ProjectAccess.openProjectHandler);
};
plugin.misterpah.ProjectAccess.openProjectHandler = function(path,newFile) {
	if(newFile == null) newFile = false;
	plugin.misterpah.ProjectAccess.previous_project_xml = Main.session.project_xml;
	Main.session.project_xml = path;
	plugin.misterpah.ProjectAccess.parse_project();
};
plugin.misterpah.ProjectAccess.parse_project_complete = function() {
	Main.message.broadcast("plugin.misterpah.ProjectAccess:open_project.complete","plugin.misterpah.ProjectAccess",null);
};
plugin.misterpah.ProjectAccess.close_project = function() {
	console.log("closing project");
	Main.session.project_xml = "";
	Main.session.project_folder = "";
	Main.session.project_xml_parameter = "";
	Main.message.broadcast("plugin.misterpah.ProjectAccess:close_project.complete","plugin.misterpah.ProjectAccess",null);
};
plugin.misterpah.ProjectAccess.parse_project = function() {
	var exec_str = "";
	var filename = Main.session.project_xml;
	var temp = filename.split(".");
	var filename_ext = temp.pop();
	var projectFolder = filename.split(Utils.path.sep);
	projectFolder.pop();
	Main.session.project_folder = projectFolder.join(Utils.path.sep);
	var compiler = "";
	if(filename_ext == "xml") compiler = "lime display -hxml flash"; else if(filename_ext == "hxml") compiler = "%CAT% \"" + filename + "\""; else {
		console.log("unknown filetype. discard");
		Main.session.project_xml = plugin.misterpah.ProjectAccess.previous_project_xml;
		return;
	}
	Utils.exec(["cd %CD% \"" + Main.session.project_folder + "\"",compiler],function(error,stdout,stderr) {
		console.log(error);
		console.log(stdout);
		console.log(stderr);
		if(error != null) {
			notify(stderr,"danger");
			Main.session.project_xml = "";
		} else {
			var content_push = new Array();
			var content = stdout.split("\n");
			var i = 0;
			var _g1 = 0;
			var _g = content.length;
			while(_g1 < _g) {
				var i1 = _g1++;
				var cur = content[i1];
				var _g2 = 0;
				var _g3 = ["-lib","-cp","-main","-D"];
				while(_g2 < _g3.length) {
					var arg = _g3[_g2];
					++_g2;
					if(cur.indexOf(arg) == 0) {
						content_push.push(cur);
						break;
					}
				}
			}
			Main.session.project_xml_parameter = content_push.join(" ");
			if(Main.session.project_xml_parameter != "") {
				notify("Project opened","success");
				Main.message.broadcast("plugin.misterpah.ProjectAccess:system_parse_project.complete","plugin.misterpah.ProjectAccess",[]);
			}
		}
	});
};
plugin.misterpah.ProjectAccess.main();
})(typeof window != "undefined" ? window : exports);
