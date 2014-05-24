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
plugin.misterpah.ManagePlugin = $hx_exports.plugin.misterpah.ManagePlugin = function() { };
plugin.misterpah.ManagePlugin.main = function() {
	plugin.misterpah.ManagePlugin.register_listener();
};
plugin.misterpah.ManagePlugin.function_page_index = function() {
	plugin.misterpah.ManagePlugin.window_index = gui.Window.open("../plugin/plugin.misterpah.ManagePlugin/bin/index.html",{ title : "Manage Plugin", focus : true, nodejs : true, min_width : 1024, min_height : 500, toolbar : true});
};
plugin.misterpah.ManagePlugin.register_listener = function() {
	Main.message.listen("core:ToolsMenu.managePlugin","plugin.misterpah.ManagePlugin",plugin.misterpah.ManagePlugin.function_page_index);
};
plugin.misterpah.ManagePlugin.main();
})(typeof window != "undefined" ? window : exports);

//# sourceMappingURL=plugin.js.map