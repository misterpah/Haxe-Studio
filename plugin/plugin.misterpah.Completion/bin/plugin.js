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
plugin.misterpah.Completion = $hx_exports.plugin.misterpah.Completion = function() { };
plugin.misterpah.Completion.__name__ = ["plugin","misterpah","Completion"];
plugin.misterpah.Completion.plugin_path = function() {
	return "../plugin/" + Type.getClassName(plugin.misterpah.Completion) + "/bin";
};
plugin.misterpah.Completion.main = function() {
	plugin.misterpah.Completion.create_ui();
	plugin.misterpah.Completion.register_listener();
};
plugin.misterpah.Completion.create_ui = function() {
	Utils.loadJS(plugin.misterpah.Completion.plugin_path() + "/jquery_xml2json.js",function() {
	});
	Utils.loadJS(plugin.misterpah.Completion.plugin_path() + "/Completion.js",function() {
	});
};
plugin.misterpah.Completion.register_listener = function() {
};
String.__name__ = ["String"];
Array.__name__ = ["Array"];
plugin.misterpah.Completion.main();
})(typeof window != "undefined" ? window : exports);

//# sourceMappingURL=plugin.js.map