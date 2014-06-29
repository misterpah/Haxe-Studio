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
	Main.message.listen("plugin.misterpah.FileAccess:saveFile","plugin.misterpah.FileAccess",plugin.misterpah.FileAccess.save_file);
	Main.message.listen("core:FileMenu.closeFile","plugin.misterpah.FileAccess",plugin.misterpah.FileAccess.close_file);
	Main.message.listen("plugin.misterpah.FileAccess:OpenFileDirectly","plugin.misterpah.FileAccess",plugin.misterpah.FileAccess.openFileDirectly);
};
plugin.misterpah.FileAccess.new_file = function() {
	var file_dialog = new ui.FileDialog();
	file_dialog.show(plugin.misterpah.FileAccess.newFileHandler,true);
};
plugin.misterpah.FileAccess.newFileHandler = function(path) {
	Utils.newFile(path);
	plugin.misterpah.FileAccess.openFileHandler(path,true);
	Main.message.broadcast("plugin.misterpah.FileAccess:new_file.complete","plugin.misterpah.FileAccess",null);
};
plugin.misterpah.FileAccess.open_file = function() {
	var filedialog = new ui.FileDialog();
	filedialog.show(plugin.misterpah.FileAccess.openFileHandler);
};
plugin.misterpah.FileAccess.openFileDirectly = function(event,path) {
	console.log("open directly detected. redirected to plugin.misterpah.FileAccess.openFileHandler");
	path = fs.realpathSync(path);
	plugin.misterpah.FileAccess.openFileHandler(path,false);
};
plugin.misterpah.FileAccess.openFileHandler = function(path,newFile) {
	if(newFile == null) newFile = false;
	path = fs.realpathSync(path);
	console.log("open file : " + path);
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
		Main.session.active_file = fs.realpathSync(path);
		Main.message.broadcast("plugin.misterpah.FileAccess:open_file.complete","plugin.misterpah.FileAccess",null);
		if(newFile == true) Main.message.broadcast("core:FileMenu.saveFile","plugin.misterpah.FileAccess",null);
	} else {
		Main.session.active_file = fs.realpathSync(path);
		Main.message.broadcast("plugin.misterpah.FileAccess:open_file.complete","plugin.misterpah.FileAccess",null);
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
