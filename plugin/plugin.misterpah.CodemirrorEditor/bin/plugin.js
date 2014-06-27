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
plugin.misterpah.CodemirrorEditor = $hx_exports.plugin.misterpah.CodemirrorEditor = function() { };
plugin.misterpah.CodemirrorEditor.__name__ = ["plugin","misterpah","CodemirrorEditor"];
plugin.misterpah.CodemirrorEditor.plugin_path = function() {
	return "../plugin/" + Type.getClassName(plugin.misterpah.CodemirrorEditor) + "/bin";
};
plugin.misterpah.CodemirrorEditor.main = function() {
	plugin.misterpah.CodemirrorEditor.create_ui();
	plugin.misterpah.CodemirrorEditor.register_listener();
};
plugin.misterpah.CodemirrorEditor.create_ui = function() {
	Utils.loadJS(plugin.misterpah.CodemirrorEditor.plugin_path() + plugin.misterpah.CodemirrorEditor.cm_folder + "/lib/codemirror.js",function() {
	});
	Utils.loadJS(plugin.misterpah.CodemirrorEditor.plugin_path() + plugin.misterpah.CodemirrorEditor.cm_folder + "/addon/search/searchcursor.js",function() {
	});
	Utils.loadJS(plugin.misterpah.CodemirrorEditor.plugin_path() + plugin.misterpah.CodemirrorEditor.cm_folder + "/addon/search/search.js",function() {
	});
	Utils.loadJS(plugin.misterpah.CodemirrorEditor.plugin_path() + plugin.misterpah.CodemirrorEditor.cm_folder + "/addon/edit/matchbrackets.js",function() {
	});
	Utils.loadJS(plugin.misterpah.CodemirrorEditor.plugin_path() + plugin.misterpah.CodemirrorEditor.cm_folder + "/addon/edit/closebrackets.js",function() {
	});
	Utils.loadJS(plugin.misterpah.CodemirrorEditor.plugin_path() + plugin.misterpah.CodemirrorEditor.cm_folder + "/addon/fold/brace-fold.js",function() {
	});
	Utils.loadJS(plugin.misterpah.CodemirrorEditor.plugin_path() + plugin.misterpah.CodemirrorEditor.cm_folder + "/addon/fold/foldcode.js",function() {
	});
	Utils.loadCSS(plugin.misterpah.CodemirrorEditor.plugin_path() + plugin.misterpah.CodemirrorEditor.cm_folder + "/addon/fold/foldgutter.css");
	Utils.loadJS(plugin.misterpah.CodemirrorEditor.plugin_path() + plugin.misterpah.CodemirrorEditor.cm_folder + "/addon/dialog/dialog.js",function() {
	});
	Utils.loadCSS(plugin.misterpah.CodemirrorEditor.plugin_path() + plugin.misterpah.CodemirrorEditor.cm_folder + "/addon/dialog/dialog.css");
	Utils.loadJS(plugin.misterpah.CodemirrorEditor.plugin_path() + plugin.misterpah.CodemirrorEditor.cm_folder + "/addon/hint/show-hint.js",function() {
	});
	Utils.loadCSS(plugin.misterpah.CodemirrorEditor.plugin_path() + plugin.misterpah.CodemirrorEditor.cm_folder + "/addon/hint/show-hint.css");
	Utils.loadJS(plugin.misterpah.CodemirrorEditor.plugin_path() + plugin.misterpah.CodemirrorEditor.cm_folder + "/keymap/sublime.js",function() {
	});
	Utils.loadJS(plugin.misterpah.CodemirrorEditor.plugin_path() + plugin.misterpah.CodemirrorEditor.cm_folder + "/mode/haxe/haxe.js",function() {
	});
	Utils.loadJS(plugin.misterpah.CodemirrorEditor.plugin_path() + plugin.misterpah.CodemirrorEditor.cm_folder + "/mode/javascript/javascript.js",function() {
	});
	Utils.loadJS(plugin.misterpah.CodemirrorEditor.plugin_path() + plugin.misterpah.CodemirrorEditor.cm_folder + "/mode/xml/xml.js",function() {
	});
	Utils.loadCSS(plugin.misterpah.CodemirrorEditor.plugin_path() + plugin.misterpah.CodemirrorEditor.cm_folder + "/lib/codemirror.css");
	Utils.loadCSS(plugin.misterpah.CodemirrorEditor.plugin_path() + plugin.misterpah.CodemirrorEditor.cm_folder + "/theme/monokai.css");
	Utils.loadJS(plugin.misterpah.CodemirrorEditor.plugin_path() + "/CodemirrorEditor.js",function() {
	});
	Utils.loadJS(plugin.misterpah.CodemirrorEditor.plugin_path() + "/CodemirrorEditor_resizer.js",function() {
	});
	Utils.loadJS(plugin.misterpah.CodemirrorEditor.plugin_path() + "/jshint.js",function() {
	});
};
plugin.misterpah.CodemirrorEditor.register_listener = function() {
};
String.__name__ = ["String"];
Array.__name__ = ["Array"];
plugin.misterpah.CodemirrorEditor.cm_folder = "/codemirror-4.2";
plugin.misterpah.CodemirrorEditor.main();
})(typeof window != "undefined" ? window : exports);

//# sourceMappingURL=plugin.js.map