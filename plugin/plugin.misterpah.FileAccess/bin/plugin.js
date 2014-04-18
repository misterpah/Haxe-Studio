(function ($hx_exports) { "use strict";
$hx_exports.plugin = $hx_exports.plugin || {};
$hx_exports.plugin.misterpah = $hx_exports.plugin.misterpah || {};
var HxOverrides = function() { };
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
var StringTools = function() { };
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	return slen >= elen && HxOverrides.substr(s,slen - elen,elen) == end;
};
var haxe = {};
haxe.ds = {};
haxe.ds.StringMap = function() { };
haxe.ds.StringMap.__interfaces__ = [IMap];
var plugin = {};
plugin.misterpah = {};
plugin.misterpah.FileAccess = $hx_exports.plugin.misterpah.FileAccess = function() { };
plugin.misterpah.FileAccess.main = function() {
	plugin.misterpah.FileAccess.register_listener();
	plugin.misterpah.FileAccess.register_shortcutkey();
};
plugin.misterpah.FileAccess.register_shortcutkey = function() {
};
plugin.misterpah.FileAccess.register_listener = function() {
	Main.message.listen("core:FileMenu.newFile","plugin.misterpah.FileAccess",plugin.misterpah.FileAccess.new_file);
	Main.message.listen("core:FileMenu.openFile","plugin.misterpah.FileAccess",plugin.misterpah.FileAccess.open_file);
	Main.message.listen("core:FileMenu.saveFile","plugin.misterpah.FileAccess",plugin.misterpah.FileAccess.save_file);
	Main.message.listen("core:FileMenu.closeFile","plugin.misterpah.FileAccess",plugin.misterpah.FileAccess.close_file);
};
plugin.misterpah.FileAccess.new_file = function() {
	var file_dialog = new ui.FileDialog();
	file_dialog.show(plugin.misterpah.FileAccess.newFileHandler,true);
};
plugin.misterpah.FileAccess.newFileHandler = function(path) {
	console.log(path);
	if(StringTools.endsWith(path,"hx") == false) path += ".hx";
	Utils.newFile(path);
	plugin.misterpah.FileAccess.openFileHandler(path,true);
	Main.message.broadcast("plugin.misterpah.FileAccess:new_file.complete","plugin.misterpah.FileAccess",null);
};
plugin.misterpah.FileAccess.open_file = function() {
	var filedialog = new ui.FileDialog();
	filedialog.show(plugin.misterpah.FileAccess.openFileHandler);
};
plugin.misterpah.FileAccess.openFileHandler = function(path,newFile) {
	if(newFile == null) newFile = false;
	path = Utils.repair_path(path);
	var find = Main.file_stack.find(path);
	if(find[0] == "null" || find[0] == "not found") {
		var content = Utils.readFile(path);
		var filename_split = path.split(Utils.path.sep);
		var className = filename_split[filename_split.length - 1].split(".")[0];
		if(newFile == true) {
			var new_content = ["package;","","class " + className,"{","}"].join("\n");
			content = new_content;
		}
		Main.file_stack.add(path,content,className);
		Main.session.active_file = path;
		Main.message.broadcast("plugin.misterpah.FileAccess:open_file.complete","plugin.misterpah.FileAccess",null);
		if(newFile == true) Main.message.broadcast("core:FileMenu.saveFile","plugin.misterpah.FileAccess",null);
	}
};
plugin.misterpah.FileAccess.save_file = function() {
	var path = Main.session.active_file;
	var file_obj = Main.file_stack.find(path);
	Utils.saveFile(path,file_obj[1]);
	Main.message.broadcast("plugin.misterpah.FileAccess:save_file.complete","plugin.misterpah.FileAccess",null);
};
plugin.misterpah.FileAccess.close_file = function() {
	var path = Main.session.active_file;
	Main.file_stack.remove(path);
	Main.message.broadcast("plugin.misterpah.FileAccess:close_file.complete","plugin.misterpah.FileAccess",null);
};
plugin.misterpah.FileAccess.main();
})(typeof window != "undefined" ? window : exports);
