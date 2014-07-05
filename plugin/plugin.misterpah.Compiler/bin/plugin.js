(function ($hx_exports) { "use strict";
$hx_exports.plugin = $hx_exports.plugin || {};
$hx_exports.plugin.misterpah = $hx_exports.plugin.misterpah || {};
var Session = $hx_exports.Session = function() { };
Session.__name__ = ["Session"];
var Std = function() { };
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
};
var Type = function() { };
Type.__name__ = ["Type"];
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
};
var js = {};
js.Boot = function() { };
js.Boot.__name__ = ["js","Boot"];
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js.Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) str2 += ", \n";
		str2 += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
var plugin = {};
plugin.misterpah = {};
plugin.misterpah.Compiler = $hx_exports.plugin.misterpah.Compiler = function() { };
plugin.misterpah.Compiler.__name__ = ["plugin","misterpah","Compiler"];
plugin.misterpah.Compiler.main = function() {
	plugin.misterpah.Compiler.create_ui();
	plugin.misterpah.Compiler.register_listener();
};
plugin.misterpah.Compiler.plugin_path = function() {
	return "../plugin/" + Type.getClassName(plugin.misterpah.Compiler) + "/bin";
};
plugin.misterpah.Compiler.create_ui = function() {
	Utils.loadJS(plugin.misterpah.Compiler.plugin_path() + "/Compiler_ui.js",function() {
	});
	Utils.loadCSS(plugin.misterpah.Compiler.plugin_path() + "/Compiler_ui.css");
};
plugin.misterpah.Compiler.register_listener = function() {
	Main.message.listen("plugin.misterpah.Compiler:compile_request","plugin.misterpah.Compiler",function() {
		plugin.misterpah.Compiler.compile_project();
	});
	Main.message.listen("plugin.misterpah.Compiler:compile_this","plugin.misterpah.Compiler",function(p1,p2) {
		plugin.misterpah.Compiler.compile(p2[0]);
	});
};
plugin.misterpah.Compiler.compile_project = function() {
	var compile_target = $("#compileTarget").val();
	var compile_parameter = $("#compileParameter").val();
	if(compile_parameter.indexOf("custom") == 0) {
		console.log("custom compilation");
		Main.message.broadcast("plugin.misterpah.Compiler:compile:" + Std.string(compile_parameter),"plugin.misterpah.Compiler",null);
		return;
	}
	var compile_string = "lime " + Std.string(compile_parameter) + " " + compile_target;
	if(compile_target == "HXML") compile_string = "haxe %QUOTE%" + Main.session.project_xml + "%QUOTE%";
	console.log(compile_string);
	hs_console("compiling : " + compile_string);
	plugin.misterpah.Compiler.compile(compile_string);
};
plugin.misterpah.Compiler.compile = function(compile_string) {
	Utils.exec(["cd %CD% %QUOTE%" + Main.session.project_folder + "%QUOTE%",compile_string],function(error,stdout,stderr) {
		notify("Compiling complete","success");
		if(stderr != "") {
			localStorage.showError = "true";
			localStorage.compile_error_status = stdout;
			localStorage.compile_error_error = stderr;
			if(error != null) Utils.gui.Window.open("./debugger.html",{ title : "debugger", position : "center", toolbar : false, focus : false});
		}
		if(stderr == "") localStorage.showError = "false";
		console.log(error);
		console.log(stdout);
		console.log(stderr);
	});
};
String.__name__ = ["String"];
Array.__name__ = ["Array"];
plugin.misterpah.Compiler.main();
})(typeof window != "undefined" ? window : exports);

//# sourceMappingURL=plugin.js.map