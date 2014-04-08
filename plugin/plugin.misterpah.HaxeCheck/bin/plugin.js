(function () { "use strict";
var Session = function() { }
$hxExpose(Session, "Session");
Session.__name__ = true;
Session.prototype = {
	__class__: Session
}
var Std = function() { }
Std.__name__ = true;
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
var js = {}
js.Boot = function() { }
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
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
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
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
}
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
plugin.misterpah.HaxeCheck = function() { }
$hxExpose(plugin.misterpah.HaxeCheck, "plugin.misterpah.HaxeCheck");
plugin.misterpah.HaxeCheck.__name__ = true;
plugin.misterpah.HaxeCheck.main = function() {
	plugin.misterpah.HaxeCheck.register_listener();
	plugin.misterpah.HaxeCheck.check_haxe();
}
plugin.misterpah.HaxeCheck.register_listener = function() {
	Main.message.listen("plugin.misterpah.HaxeCheck:versionCheck.complete","plugin.misterpah.HaxeCheck",plugin.misterpah.HaxeCheck.versionCheck_complete,null);
}
plugin.misterpah.HaxeCheck.versionCheck_complete = function() {
	var version_split = plugin.misterpah.HaxeCheck.haxe_version.split(".");
	if(version_split[0] == "3") console.log("Haxe 3 installed"); else {
		console.log("old version of Haxe is installed: " + Std.string(version_split));
		alert("please upgrade your Haxe. Download it at http://haxe.org/download");
	}
}
plugin.misterpah.HaxeCheck.check_haxe = function() {
	Utils.exec(["haxe -version"],function(error,stdout,stderr) {
		if(error == null) {
			plugin.misterpah.HaxeCheck.haxe_version = stderr;
			Main.message.broadcast("plugin.misterpah.HaxeCheck:versionCheck.complete","plugin.misterpah.HaxeCheck");
		} else {
			console.log(error);
			console.log(stdout);
			console.log(stderr);
			alert("Haxe isn't available on this computer OR there's something wrong with your installation. Please download & re-install Haxe version 3. You may download it at http://haxe.org/download");
		}
	});
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
plugin.misterpah.HaxeCheck.main();
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

//@ sourceMappingURL=plugin.js.map