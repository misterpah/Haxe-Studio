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
plugin.misterpah.Completion = $hx_exports.plugin.misterpah.Completion = function() { };
plugin.misterpah.Completion.__name__ = ["plugin","misterpah","Completion"];
plugin.misterpah.Completion.main = function() {
	var plugin_path = ".." + Utils.path.sep + "plugin" + Utils.path.sep + Type.getClassName(plugin.misterpah.Completion) + Utils.path.sep + "bin";
	Utils.loadJS(plugin_path + "/regex.execAll.js",function() {
	});
	Utils.loadJS(plugin_path + "/mkdir.js",function() {
	});
	Utils.loadJS(plugin_path + "/jquery.xml2json.js",function() {
	});
	console.log("Completion server Started");
	plugin.misterpah.Completion.register_listener();
};
plugin.misterpah.Completion.register_listener = function() {
	Main.message.listen("plugin.misterpah.Completion:static_completion","plugin.misterpah.Completion",plugin.misterpah.Completion.get_completion_new);
	Main.message.listen("plugin.misterpah.Completion:dynamic_completion","plugin.misterpah.Completion",plugin.misterpah.Completion.get_completion_new);
};
plugin.misterpah.Completion.get_completion_from_server = function(position,callback) {
	var path = Main.session.active_file;
	Utils.exec(["cd %CD% %QUOTE%" + Main.session.project_folder + "%QUOTE%","haxe --connect 30003 " + Main.session.project_xml_parameter + " --display %QUOTE%" + path + "%QUOTE%@" + position],function(p1,p2,p3) {
		callback(p1,p2,p3);
	});
};
plugin.misterpah.Completion.get_completion_new = function() {
	plugin.misterpah.Completion.get_completion_from_server(sessionStorage.cursor_index,function(p1,p2,p3) {
		plugin.misterpah.Completion.build_completion_new(p3);
	});
};
plugin.misterpah.Completion.build_completion_new = function(p3) {
	if(p3.startsWith("Error") == true) return; else if(p3.startsWith("<list>") == true) {
		var completion_array = $.xml2json(p3);
		var completion = new Array();
		var _g1 = 0;
		var _g = completion_array.i.length;
		while(_g1 < _g) {
			var each = _g1++;
			completion.push(completion_array.i[each].n);
		}
		sessionStorage.static_completion = JSON.stringify(completion);
		Main.message.broadcast("plugin.misterpah.Completion:static_completion.complete","plugin.misterpah.Completion",null);
	} else if(p3.startsWith("<type>") == true) {
		var completion_array1 = $.xml2json(p3);
		sessionStorage.build_completion = JSON.stringify(completion_array1);
		Main.message.broadcast("plugin.misterpah.Editor:build_completion.complete.dynamic","plugin.misterpah.Editor",null);
	} else {
		sessionStorage.build_completion = JSON.stringify(p3);
		Main.message.broadcast("plugin.misterpah.Editor:build_completion.complete.dynamic","plugin.misterpah.Editor",null);
	}
};
String.__name__ = ["String"];
Array.__name__ = ["Array"];
plugin.misterpah.Completion.main();
})(typeof window != "undefined" ? window : exports);
