(function ($hx_exports) { "use strict";
$hx_exports.plugin = $hx_exports.plugin || {};
$hx_exports.plugin.misterpah = $hx_exports.plugin.misterpah || {};
var HxOverrides = function() { };
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
var IMap = function() { };
var Session = $hx_exports.Session = function() { };
var Std = function() { };
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
var haxe = {};
haxe.ds = {};
haxe.ds.StringMap = function() { };
haxe.ds.StringMap.__interfaces__ = [IMap];
var js = {};
js.Node = function() { };
var plugin = {};
plugin.misterpah = {};
plugin.misterpah.HaxeServer = $hx_exports.plugin.misterpah.HaxeServer = function() { };
plugin.misterpah.HaxeServer.main = function() {
	plugin.misterpah.HaxeServer.register_listener();
};
plugin.misterpah.HaxeServer.register_listener = function() {
	Main.message.listen("plugin.misterpah.HaxeCheck:versionCheck.complete","plugin.misterpah.HaxeServer",plugin.misterpah.HaxeServer.spawn_server);
};
plugin.misterpah.HaxeServer.spawn_server = function() {
	plugin.misterpah.HaxeServer.haxeCompletionServer = js.Node.require("child_process").spawn("haxe",["--wait","30003"]);
	console.log("Haxe completion server started");
	var application_window = js.Node.require("nw.gui").Window.get();
	application_window.on("close",function() {
		plugin.misterpah.HaxeServer.haxeCompletionServer.kill();
		application_window.close(true);
	});
};
if(Array.prototype.map == null) Array.prototype.map = function(f) {
	var a = [];
	var _g1 = 0;
	var _g = this.length;
	while(_g1 < _g) {
		var i = _g1++;
		a[i] = f(this[i]);
	}
	return a;
};
var module, setImmediate, clearImmediate;
js.Node.setTimeout = setTimeout;
js.Node.clearTimeout = clearTimeout;
js.Node.setInterval = setInterval;
js.Node.clearInterval = clearInterval;
js.Node.global = global;
js.Node.process = process;
js.Node.require = require;
js.Node.console = console;
js.Node.module = module;
js.Node.stringify = JSON.stringify;
js.Node.parse = JSON.parse;
var version = HxOverrides.substr(js.Node.process.version,1,null).split(".").map(Std.parseInt);
if(version[0] > 0 || version[1] >= 9) {
	js.Node.setImmediate = setImmediate;
	js.Node.clearImmediate = clearImmediate;
}
plugin.misterpah.HaxeServer.main();
})(typeof window != "undefined" ? window : exports);

//# sourceMappingURL=plugin.js.map