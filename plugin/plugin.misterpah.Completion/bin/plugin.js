(function ($hx_exports) { "use strict";
$hx_exports.plugin = $hx_exports.plugin || {};
$hx_exports.plugin.misterpah = $hx_exports.plugin.misterpah || {};
var Session = $hx_exports.Session = function() { };
Session.__name__ = ["Session"];
var Type = function() { };
Type.__name__ = ["Type"];
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
};
var haxe = {};
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
};
haxe.Timer.prototype = {
	stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
};
var plugin = {};
plugin.misterpah = {};
plugin.misterpah.Completion = $hx_exports.plugin.misterpah.Completion = function() { };
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
};
plugin.misterpah.Completion.register_listener = function() {
	Main.message.listen("plugin.misterpah.Completion:static_completion","plugin.misterpah.Completion",plugin.misterpah.Completion.static_completion);
	Main.message.listen("plugin.misterpah.Completion:dynamic_completion","plugin.misterpah.Completion",plugin.misterpah.Completion.dynamic_completion);
};
plugin.misterpah.Completion.get_completion_from_server = function(position,callback) {
	var path = Main.session.active_file;
	Utils.exec(["cd %CD% %QUOTE%" + Main.session.project_folder + "%QUOTE%","haxe --connect 30003 " + Main.session.project_xml_parameter + " --display %QUOTE%" + path + "%QUOTE%@" + position],function(p1,p2,p3) {
		callback(p1,p2,p3);
	});
};
plugin.misterpah.Completion.dynamic_completion = function() {
	plugin.misterpah.Completion.get_completion_from_server(sessionStorage.cursor_index,function(stderr) {
		plugin.misterpah.Completion.build_completion(stderr,"dynamic");
	});
};
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
};
plugin.misterpah.Completion.build_completion = function(data,completion_type) {
	if(completion_type == null) completion_type = "static";
	var completion_array = $.xml2json(data);
	var completion_list = new Array();
	var compile_completion = new Array();
	if(completion_type == "static") {
		if(typeof(completion_array) == "string") {
			var single_completion = new Array();
			single_completion.push("--single completion--");
			single_completion.push(completion_array);
			var _g1 = 0;
			var _g = single_completion.length;
			while(_g1 < _g) {
				var each = _g1++;
				var cur_item = new Array();
				cur_item.push(single_completion[each]);
				compile_completion.push(cur_item);
			}
			sessionStorage.build_completion = JSON.stringify(compile_completion);
			plugin.misterpah.Completion.save_completion();
		} else {
			var _g11 = 0;
			var _g2 = completion_array.i.length;
			while(_g11 < _g2) {
				var each1 = _g11++;
				var cur_item1 = new Array();
				cur_item1.push(completion_array.i[each1].n);
				compile_completion.push(cur_item1);
			}
			sessionStorage.build_completion = JSON.stringify(compile_completion);
			plugin.misterpah.Completion.save_completion();
		}
	} else if(completion_type == "dynamic") {
		sessionStorage.static_completion = JSON.stringify(completion_array);
		Main.message.broadcast("plugin.misterpah.Editor:build_completion.complete.dynamic","plugin.misterpah.Editor",null);
	}
};
plugin.misterpah.Completion.save_completion = function() {
	console.log("building completion");
	var find_completion = sessionStorage.find_completion;
	var completion_content = sessionStorage.build_completion;
	Utils.newFile(Main.session.project_folder + Utils.path.sep + "completion" + Utils.path.sep + find_completion + ".completion");
	Utils.saveFile(Main.session.project_folder + Utils.path.sep + "completion" + Utils.path.sep + find_completion + ".completion",completion_content);
	haxe.Timer.delay(function() {
		Main.message.broadcast("plugin.misterpah.Completion:static_completion","plugin.misterpah.Completion",null);
	},1000);
};
String.__name__ = ["String"];
Array.__name__ = ["Array"];
plugin.misterpah.Completion.main();
})(typeof window != "undefined" ? window : exports);
