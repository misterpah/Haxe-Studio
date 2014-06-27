(function ($hx_exports) { "use strict";
$hx_exports.plugin = $hx_exports.plugin || {};
$hx_exports.plugin.misterpah = $hx_exports.plugin.misterpah || {};
var IMap = function() { };
IMap.__name__ = ["IMap"];
var Session = $hx_exports.Session = function() { };
Session.__name__ = ["Session"];
var Type = function() { };
Type.__name__ = ["Type"];
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
};
var haxe = {};
haxe.ds = {};
haxe.ds.StringMap = function() { };
haxe.ds.StringMap.__name__ = ["haxe","ds","StringMap"];
haxe.ds.StringMap.__interfaces__ = [IMap];
var plugin = {};
plugin.misterpah = {};
plugin.misterpah.ProjectTree = $hx_exports.plugin.misterpah.ProjectTree = function() { };
plugin.misterpah.ProjectTree.__name__ = ["plugin","misterpah","ProjectTree"];
plugin.misterpah.ProjectTree.main = function() {
	plugin.misterpah.ProjectTree.create_ui();
	plugin.misterpah.ProjectTree.register_listener();
};
plugin.misterpah.ProjectTree.plugin_path = function() {
	return "../plugin/" + Type.getClassName(plugin.misterpah.ProjectTree) + "/bin";
};
plugin.misterpah.ProjectTree.register_listener = function() {
	Main.message.listen("plugin.misterpah.ProjectAccess:system_parse_project.complete","plugin.misterpah.ProjectTree",plugin.misterpah.ProjectTree.create_ui);
	Main.message.listen("plugin.misterpah.ProjectAccess:close_project.complete","plugin.misterpah.ProjectTree",plugin.misterpah.ProjectTree.reset_tree);
};
plugin.misterpah.ProjectTree.reset_tree = function() {
	$("#tree_position").html("<br/><ul id='file_tree'></ul>");
};
plugin.misterpah.ProjectTree.create_ui = function() {
	Utils.loadJS(plugin.misterpah.ProjectTree.plugin_path() + "/projectTree.js",function() {
	});
	Utils.loadCSS(plugin.misterpah.ProjectTree.plugin_path() + "/projectTree.css");
};
String.__name__ = ["String"];
Array.__name__ = ["Array"];
plugin.misterpah.ProjectTree.main();
})(typeof window != "undefined" ? window : exports);

//# sourceMappingURL=plugin.js.map