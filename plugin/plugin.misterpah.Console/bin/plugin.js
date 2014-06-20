(function ($hx_exports) { "use strict";
$hx_exports.plugin = $hx_exports.plugin || {};
$hx_exports.plugin.misterpah = $hx_exports.plugin.misterpah || {};
var Type = function() { };
Type.__name__ = ["Type"];
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
};
var plugin = {};
plugin.misterpah = {};
plugin.misterpah.Console = $hx_exports.plugin.misterpah.Console = function() { };
plugin.misterpah.Console.__name__ = ["plugin","misterpah","Console"];
plugin.misterpah.Console.plugin_path = function() {
	return "../plugin/" + Type.getClassName(plugin.misterpah.Console) + "/bin";
};
plugin.misterpah.Console.main = function() {
	plugin.misterpah.Console.create_ui();
	plugin.misterpah.Console.register_listener();
};
plugin.misterpah.Console.create_ui = function() {
	Utils.loadJS(plugin.misterpah.Console.plugin_path() + "/console.js",function() {
	});
};
plugin.misterpah.Console.register_listener = function() {
};
String.__name__ = ["String"];
Array.__name__ = ["Array"];
plugin.misterpah.Console.main();
})(typeof window != "undefined" ? window : exports);

//# sourceMappingURL=plugin.js.map