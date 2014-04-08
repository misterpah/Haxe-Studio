(function () { "use strict";
var Session = function() { }
$hxExpose(Session, "Session");
Session.__name__ = true;
Session.prototype = {
	__class__: Session
}
var js = {}
js.Boot = function() { }
js.Boot.__name__ = true;
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) {
					if(cl == Array) return o.__enum__ == null;
					return true;
				}
				if(js.Boot.__interfLoop(o.__class__,cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
}
var plugin = {}
plugin.misterpah = {}
plugin.misterpah.ProjectAccess = function() { }
$hxExpose(plugin.misterpah.ProjectAccess, "plugin.misterpah.ProjectAccess");
plugin.misterpah.ProjectAccess.__name__ = true;
plugin.misterpah.ProjectAccess.main = function() {
	plugin.misterpah.ProjectAccess.register_listener();
	plugin.misterpah.ProjectAccess.register_shortcutkey();
}
plugin.misterpah.ProjectAccess.register_shortcutkey = function() {
	$.keyStroke(79,{ modKeys : ["ctrlKey","shiftKey"]},function() {
		Main.message.broadcast("core:FileMenu.openProject","plugin.misterpah.FileAccess");
	});
}
plugin.misterpah.ProjectAccess.register_listener = function() {
	Main.message.listen("core:FileMenu.openProject","plugin.misterpah.ProjectAccess",plugin.misterpah.ProjectAccess.open_project,null);
	Main.message.listen("core:FileMenu.closeProject","plugin.misterpah.ProjectAccess",plugin.misterpah.ProjectAccess.close_project,null);
	Main.message.listen("plugin.misterpah.ProjectAccess","plugin.misterpah.ProjectAccess",plugin.misterpah.ProjectAccess.parse_project_complete,null);
}
plugin.misterpah.ProjectAccess.open_project = function() {
	var filedialog = new ui.FileDialog();
	filedialog.show(plugin.misterpah.ProjectAccess.openProjectHandler);
}
plugin.misterpah.ProjectAccess.openProjectHandler = function(path,newFile) {
	if(newFile == null) newFile = false;
	Main.session.project_xml = path;
	plugin.misterpah.ProjectAccess.parse_project();
}
plugin.misterpah.ProjectAccess.parse_project_complete = function() {
	Main.message.broadcast("plugin.misterpah.ProjectAccess:open_project.complete","plugin.misterpah.ProjectAccess");
}
plugin.misterpah.ProjectAccess.close_project = function() {
	Main.session.project_xml = "";
	Main.session.project_folder = "";
	Main.session.project_xml_parameter = "";
	Main.message.broadcast("plugin.misterpah.ProjectAccess:close_project.complete","plugin.misterpah.ProjectAccess");
}
plugin.misterpah.ProjectAccess.parse_project = function() {
	var exec_str = "";
	var filename = Main.session.project_xml;
	var temp = filename.split(".");
	var filename_ext = temp.pop();
	var projectFolder = filename.split(Utils.path.sep);
	projectFolder.pop();
	Main.session.project_folder = projectFolder.join(Utils.path.sep);
	var compiler = "";
	if(filename_ext == "xml") compiler = "lime display -hxml flash"; else if(filename_ext == "hxml") compiler = "%CAT% \"" + filename + "\"";
	Utils.exec(["cd %CD% \"" + Main.session.project_folder + "\"",compiler],function(error,stdout,stderr) {
		var the_error = false;
		if(stderr != "") the_error = true;
		if(the_error == true) {
			console.log(error);
			console.log(stdout);
			console.log(stderr);
			var notify = new ui.Notify();
			notify.type = "error";
			notify.content = "not a valid Haxe Project File ( XML / HXML )";
			notify.show();
			Main.session.project_xml = "";
		} else {
			var content_push = new Array();
			var content = stdout.split("\n");
			var i = 0;
			var _g1 = 0, _g = content.length;
			while(_g1 < _g) {
				var i1 = _g1++;
				var cur = content[i1];
				var _g2 = 0, _g3 = ["-lib","-cp","-main","-D"];
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
			if(Main.session.project_xml_parameter != "") Main.message.broadcast("plugin.misterpah.ProjectAccess:system_parse_project.complete","plugin.misterpah.ProjectAccess");
		}
	});
}
String.prototype.__class__ = String;
String.__name__ = true;
Array.prototype.__class__ = Array;
Array.__name__ = true;
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
plugin.misterpah.ProjectAccess.main();
function $hxExpose(src, path) {
	var o = typeof window != "undefined" ? window : exports;
	var parts = path.split(".");
	for(var ii = 0; ii < parts.length-1; ++ii) {
		var p = parts[ii];
		if(typeof o[p] == "undefined") o[p] = {};
		o = o[p];
	}
	o[parts[parts.length-1]] = src;
}
})();
