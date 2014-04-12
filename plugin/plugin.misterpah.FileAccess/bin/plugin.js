(function () { "use strict";
var HxOverrides = function() { }
HxOverrides.__name__ = true;
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
}
var Session = function() { }
$hxExpose(Session, "Session");
Session.__name__ = true;
Session.prototype = {
	__class__: Session
}
var StringTools = function() { }
StringTools.__name__ = true;
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	return slen >= elen && HxOverrides.substr(s,slen - elen,elen) == end;
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
plugin.misterpah.FileAccess = function() { }
$hxExpose(plugin.misterpah.FileAccess, "plugin.misterpah.FileAccess");
plugin.misterpah.FileAccess.__name__ = true;
plugin.misterpah.FileAccess.main = function() {
	plugin.misterpah.FileAccess.register_listener();
	plugin.misterpah.FileAccess.register_shortcutkey();
}
plugin.misterpah.FileAccess.register_shortcutkey = function() {
	$.keyStroke(78,{ modKeys : ["ctrlKey"]},function() {
		Main.message.broadcast("core:FileMenu.newFile","plugin.misterpah.FileAccess",null);
	});
	$.keyStroke(79,{ modKeys : ["ctrlKey"]},function() {
		Main.message.broadcast("core:FileMenu.openFile","plugin.misterpah.FileAccess",null);
	});
	$.keyStroke(83,{ modKeys : ["ctrlKey"]},function() {
		Main.message.broadcast("core:FileMenu.saveFile","plugin.misterpah.FileAccess",null);
	});
	$.keyStroke(87,{ modKeys : ["ctrlKey"]},function() {
		Main.message.broadcast("core:FileMenu.closeFile","plugin.misterpah.FileAccess",null);
	});
}
plugin.misterpah.FileAccess.register_listener = function() {
	Main.message.listen("core:FileMenu.newFile","plugin.misterpah.FileAccess",plugin.misterpah.FileAccess.new_file);
	Main.message.listen("core:FileMenu.openFile","plugin.misterpah.FileAccess",plugin.misterpah.FileAccess.open_file);
	Main.message.listen("core:FileMenu.saveFile","plugin.misterpah.FileAccess",plugin.misterpah.FileAccess.save_file);
	Main.message.listen("core:FileMenu.closeFile","plugin.misterpah.FileAccess",plugin.misterpah.FileAccess.close_file);
}
plugin.misterpah.FileAccess.new_file = function() {
	var file_dialog = new ui.FileDialog();
	file_dialog.show(plugin.misterpah.FileAccess.newFileHandler,true);
}
plugin.misterpah.FileAccess.newFileHandler = function(path) {
	console.log(path);
	if(StringTools.endsWith(path,"hx") == false) path += ".hx";
	Utils.newFile(path);
	plugin.misterpah.FileAccess.openFileHandler(path,true);
	Main.message.broadcast("plugin.misterpah.FileAccess:new_file.complete","plugin.misterpah.FileAccess",null);
}
plugin.misterpah.FileAccess.open_file = function() {
	var filedialog = new ui.FileDialog();
	filedialog.show(plugin.misterpah.FileAccess.openFileHandler);
}
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
}
plugin.misterpah.FileAccess.save_file = function() {
	var path = Main.session.active_file;
	var file_obj = Main.file_stack.find(path);
	Utils.saveFile(path,file_obj[1]);
	Main.message.broadcast("plugin.misterpah.FileAccess:save_file.complete","plugin.misterpah.FileAccess",null);
}
plugin.misterpah.FileAccess.close_file = function() {
	var path = Main.session.active_file;
	Main.file_stack.remove(path);
	Main.message.broadcast("plugin.misterpah.FileAccess:close_file.complete","plugin.misterpah.FileAccess",null);
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
plugin.misterpah.FileAccess.main();
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
