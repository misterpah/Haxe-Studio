(function ($hx_exports) { "use strict";
$hx_exports.plugin = $hx_exports.plugin || {};
$hx_exports.plugin.misterpah = $hx_exports.plugin.misterpah || {};
var IMap = function() { };
IMap.__name__ = true;
var Session = $hx_exports.Session = function() { };
Session.__name__ = true;
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
};
var haxe = {};
haxe.ds = {};
haxe.ds.StringMap = function() { };
haxe.ds.StringMap.__name__ = true;
haxe.ds.StringMap.__interfaces__ = [IMap];
var js = {};
js.Boot = function() { };
js.Boot.__name__ = true;
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
plugin.misterpah.HaxeCheck = $hx_exports.plugin.misterpah.HaxeCheck = function() { };
plugin.misterpah.HaxeCheck.__name__ = true;
plugin.misterpah.HaxeCheck.main = function() {
	plugin.misterpah.HaxeCheck.register_listener();
	plugin.misterpah.HaxeCheck.check_haxe();
};
plugin.misterpah.HaxeCheck.register_listener = function() {
	Main.message.listen("plugin.misterpah.HaxeCheck:versionCheck.complete","plugin.misterpah.HaxeCheck",plugin.misterpah.HaxeCheck.versionCheck_complete);
};
plugin.misterpah.HaxeCheck.versionCheck_complete = function() {
	var version_split = plugin.misterpah.HaxeCheck.haxe_version.split(".");
	if(version_split[0] == "3") console.log("Haxe 3 installed"); else {
		console.log("old version of Haxe is installed: " + Std.string(version_split));
		alert("please upgrade your Haxe. Download it at http://haxe.org/download");
	}
};
plugin.misterpah.HaxeCheck.check_haxe = function() {
	Utils.exec(["haxe -version"],function(error,stdout,stderr) {
		if(error == null) {
			plugin.misterpah.HaxeCheck.haxe_version = stderr;
			Main.message.broadcast("plugin.misterpah.HaxeCheck:versionCheck.complete","plugin.misterpah.HaxeCheck",null);
		} else {
			console.log(error);
			console.log(stdout);
			console.log(stderr);
			alert("Haxe isn't available on this computer OR there's something wrong with your installation. Please download & re-install Haxe version 3. You may download it at http://haxe.org/download");
		}
	});
};
String.__name__ = true;
Array.__name__ = true;
plugin.misterpah.HaxeCheck.main();
})(typeof window != "undefined" ? window : exports);

//# sourceMappingURL=plugin.js.map