(function () { "use strict";
var Session = function() { }
$hxExpose(Session, "Session");
Session.__name__ = ["Session"];
Session.prototype = {
	__class__: Session
}
var Type = function() { }
Type.__name__ = ["Type"];
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
}
var haxe = {}
haxe.Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.delay = function(f,time_ms) {
	var t = new haxe.Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
}
haxe.Timer.prototype = {
	run: function() {
		console.log("run");
	}
	,stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,__class__: haxe.Timer
}
var js = {}
js.Boot = function() { }
js.Boot.__name__ = ["js","Boot"];
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
plugin.misterpah.Completion = function() { }
$hxExpose(plugin.misterpah.Completion, "plugin.misterpah.Completion");
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
}
plugin.misterpah.Completion.register_listener = function() {
	Main.message.listen("plugin.misterpah.Completion:static_completion","plugin.misterpah.Completion",plugin.misterpah.Completion.static_completion);
	Main.message.listen("plugin.misterpah.Completion:dynamic_completion","plugin.misterpah.Completion",plugin.misterpah.Completion.dynamic_completion);
}
plugin.misterpah.Completion.get_completion_from_server = function(position,callback) {
	var path = Main.session.active_file;
	Utils.exec(["cd %CD% %QUOTE%" + Main.session.project_folder + "%QUOTE%","haxe --connect 30003 " + Main.session.project_xml_parameter + " --display %QUOTE%" + path + "%QUOTE%@" + position],function(p1,p2,p3) {
		callback(p1,p2,p3);
	});
}
plugin.misterpah.Completion.dynamic_completion = function() {
	plugin.misterpah.Completion.get_completion_from_server(sessionStorage.cursor_index,function(stderr) {
		plugin.misterpah.Completion.build_completion(stderr,"dynamic");
	});
}
plugin.misterpah.Completion.static_completion = function() {
	console.log("check for static completion");
	var find_completion = sessionStorage.find_completion;
	var file = "";
	if(Utils.checkFileExist(Main.session.project_folder + Utils.path.sep + "completion") == false) make_dir(Main.session.project_folder + Utils.path.sep + "completion");
	var file_exists = Utils.checkFileExist(Main.session.project_folder + Utils.path.sep + "completion" + Utils.path.sep + find_completion + ".completion");
	if(file_exists) {
		console.log("static completion found");
		console.log("fetching static completion");
		file = Utils.readFile(Main.session.project_folder + Utils.path.sep + "completion" + Utils.path.sep + find_completion + ".completion");
		sessionStorage.static_completion = file;
		console.log("fetching completed");
		console.log("invoke display completion");
		Main.message.broadcast("plugin.misterpah.Completion:static_completion.complete","plugin.misterpah.Completion",null);
	} else {
		console.log("no static completion found");
		console.log("Generating static completion.");
		plugin.misterpah.Completion.get_completion_from_server(sessionStorage.cursor_index,function(p1,p2,p3) {
			plugin.misterpah.Completion.build_completion(p3,"static");
		});
	}
}
plugin.misterpah.Completion.build_completion = function(data,completion_type) {
	if(completion_type == null) completion_type = "static";
	var completion_array = $.xml2json(data);
	var completion_list = new Array();
	var compile_completion = new Array();
	if(completion_type == "static") {
		if(js.Boot.__instanceof(completion_array,String)) {
			var single_completion = new Array();
			single_completion.push("--single completion--");
			single_completion.push(completion_array);
			var _g1 = 0, _g = single_completion.length;
			while(_g1 < _g) {
				var each = _g1++;
				var cur_item = new Array();
				cur_item.push(single_completion[each]);
				compile_completion.push(cur_item);
			}
			sessionStorage.build_completion = JSON.stringify(compile_completion);
			plugin.misterpah.Completion.save_completion();
		} else {
			var _g1 = 0, _g = completion_array.i.length;
			while(_g1 < _g) {
				var each = _g1++;
				var cur_item = new Array();
				cur_item.push(completion_array.i[each].n);
				compile_completion.push(cur_item);
			}
			sessionStorage.build_completion = JSON.stringify(compile_completion);
			plugin.misterpah.Completion.save_completion();
		}
	} else if(completion_type == "dynamic") {
		sessionStorage.static_completion = JSON.stringify(completion_array);
		Main.message.broadcast("plugin.misterpah.Editor:build_completion.complete.dynamic","plugin.misterpah.Editor",null);
	}
}
plugin.misterpah.Completion.save_completion = function() {
	console.log("building completion");
	var find_completion = sessionStorage.find_completion;
	var completion_content = sessionStorage.build_completion;
	Utils.newFile(Main.session.project_folder + Utils.path.sep + "completion" + Utils.path.sep + find_completion + ".completion");
	Utils.saveFile(Main.session.project_folder + Utils.path.sep + "completion" + Utils.path.sep + find_completion + ".completion",completion_content);
	haxe.Timer.delay(function() {
		Main.message.broadcast("plugin.misterpah.Completion:static_completion","plugin.misterpah.Completion",null);
	},1000);
}
String.prototype.__class__ = String;
String.__name__ = ["String"];
Array.prototype.__class__ = Array;
Array.__name__ = ["Array"];
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
plugin.misterpah.Completion.main();
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
