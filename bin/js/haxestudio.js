(function () { "use strict";
var $estr = function() { return js.Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function inherit() {}; inherit.prototype = from; var proto = new inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var _Either = {}
_Either.Either_Impl_ = function() { }
_Either.Either_Impl_.__name__ = true;
var FileObject = function() {
	this.file_stack = new Array();
};
$hxExpose(FileObject, "FileObject");
FileObject.__name__ = true;
FileObject.prototype = {
	remove: function(path) {
		if(this.file_stack.length > 0) {
			var position = 0;
			var _g = 0, _g1 = this.file_stack;
			while(_g < _g1.length) {
				var each = _g1[_g];
				++_g;
				if(each[0] == path) this.file_stack.splice(position,1); else position += 1;
			}
		}
	}
	,update_content: function(path,new_content) {
		if(this.file_stack.length > 0) {
			var position = 0;
			var _g = 0, _g1 = this.file_stack;
			while(_g < _g1.length) {
				var each = _g1[_g];
				++_g;
				if(each[0] == path) this.file_stack[position][1] = new_content; else position += 1;
			}
		}
	}
	,find: function(path) {
		if(this.file_stack.length > 0) {
			var position = 0;
			var _g = 0, _g1 = this.file_stack;
			while(_g < _g1.length) {
				var each = _g1[_g];
				++_g;
				if(each[0] == path) return each; else position += 1;
			}
			return ["not found"];
		} else return ["null"];
	}
	,add: function(path,content,className) {
		var a = new Array();
		a[0] = path;
		a[1] = content;
		a[2] = className;
		return this.file_stack.push(a);
	}
	,__class__: FileObject
}
var HxOverrides = function() { }
HxOverrides.__name__ = true;
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
}
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
}
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
}
var Lambda = function() { }
Lambda.__name__ = true;
Lambda.indexOf = function(it,v) {
	var i = 0;
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var v2 = $it0.next();
		if(v == v2) return i;
		i++;
	}
	return -1;
}
var Main = function() { }
$hxExpose(Main, "Main");
Main.__name__ = true;
Main.main = function() {
	Main.session = new Session();
	Main.file_stack = new FileObject();
	Main.message = new Message();
	new ui.Notify();
	new ui.FileDialog();
	new ui.ModalDialog();
	Main.plugin_solve_dependency("../plugin");
	Main.plugin_loading_sequence.reverse();
	Main.plugin_load_all("../plugin",Main.plugin_loading_sequence);
	new menu.FileMenu();
	new menu.CompileMenu();
}
Main.plugin_load_all = function(path,dependency_sequence) {
	var _g = 0;
	while(_g < dependency_sequence.length) {
		var each = dependency_sequence[_g];
		++_g;
		console.log(each);
		if(each != "") Utils.loadJS(path + "/" + each + "/bin/plugin.js",function(script) {
		}); else continue;
	}
}
Main.plugin_solve_dependency = function(path) {
	var available_plugin = Utils.readDir(path);
	var plugin = new Array();
	var _g = 0;
	while(_g < available_plugin.length) {
		var each = available_plugin[_g];
		++_g;
		plugin.push(JSON.parse(Utils.readFile(path + "/" + each + "/bin/plugin.json")));
	}
	var build_load_sequence = new Array();
	var _g = 0;
	while(_g < plugin.length) {
		var each = plugin[_g];
		++_g;
		if(each.dependency.length >= 1) {
			var temp = new Array();
			var key = Reflect.fields(each.dependency);
			var _g1 = 0;
			while(_g1 < key.length) {
				var each_key = key[_g1];
				++_g1;
				temp.push(Reflect.field(each.dependency,each_key));
			}
			var _g1 = 0;
			while(_g1 < temp.length) {
				var each2 = temp[_g1];
				++_g1;
				build_load_sequence.push([each.actualName,each2]);
			}
		} else build_load_sequence.push([each.actualName,""]);
	}
	var plugin_loading_sequence_obj = tsort(build_load_sequence);
	Main.plugin_loading_sequence = plugin_loading_sequence_obj.path;
}
var Message = function() {
	this.broadcast_message = new Array();
	this.listen_message = new Array();
};
Message.__name__ = true;
Message.prototype = {
	list_listen: function() {
		return this.listen_message;
	}
	,list_broadcast: function() {
		return this.broadcast_message;
	}
	,listen: function(message,caller_name,action,parameter) {
		var temp = new Array();
		temp.push(message);
		temp.push(caller_name);
		this.listen_message.push(temp);
		new $(js.Browser.document).on(message,action,parameter);
	}
	,broadcast: function(message,caller_name) {
		var temp = new Array();
		temp.push(message);
		temp.push(caller_name);
		this.broadcast_message.push(temp);
		new $(js.Browser.document).triggerHandler(message);
	}
	,__class__: Message
}
var Reflect = function() { }
Reflect.__name__ = true;
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	} catch( e ) {
	}
	return v;
}
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
}
var Session = function() {
	this.project_xml = "";
	this.project_xml_parameter = "";
	this.project_folder = "";
	this.active_file = "";
};
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
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
}
var StringBuf = function() {
	this.b = "";
};
StringBuf.__name__ = true;
StringBuf.prototype = {
	__class__: StringBuf
}
var StringTools = function() { }
StringTools.__name__ = true;
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
}
var js = {}
js.Node = function() { }
js.Node.__name__ = true;
js.Node.get_assert = function() {
	return js.Node.require("assert");
}
js.Node.get_childProcess = function() {
	return js.Node.require("child_process");
}
js.Node.get_cluster = function() {
	return js.Node.require("cluster");
}
js.Node.get_crypto = function() {
	return js.Node.require("crypto");
}
js.Node.get_dgram = function() {
	return js.Node.require("dgram");
}
js.Node.get_dns = function() {
	return js.Node.require("dns");
}
js.Node.get_fs = function() {
	return js.Node.require("fs");
}
js.Node.get_http = function() {
	return js.Node.require("http");
}
js.Node.get_https = function() {
	return js.Node.require("https");
}
js.Node.get_net = function() {
	return js.Node.require("net");
}
js.Node.get_os = function() {
	return js.Node.require("os");
}
js.Node.get_path = function() {
	return js.Node.require("path");
}
js.Node.get_querystring = function() {
	return js.Node.require("querystring");
}
js.Node.get_repl = function() {
	return js.Node.require("repl");
}
js.Node.get_tls = function() {
	return js.Node.require("tls");
}
js.Node.get_url = function() {
	return js.Node.require("url");
}
js.Node.get_util = function() {
	return js.Node.require("util");
}
js.Node.get_vm = function() {
	return js.Node.require("vm");
}
js.Node.get___filename = function() {
	return __filename;
}
js.Node.get___dirname = function() {
	return __dirname;
}
js.Node.newSocket = function(options) {
	return new js.Node.net.Socket(options);
}
var Utils = function() { }
$hxExpose(Utils, "Utils");
Utils.__name__ = true;
Utils.checkFileExist = function(filename) {
	return Utils.fs.existsSync(filename);
}
Utils.newFile = function(filename) {
	Utils.fs.openSync(filename,"a+");
}
Utils.readFile = function(filename) {
	var ret = Utils.fs.readFileSync(filename,"utf-8");
	return ret;
}
Utils.saveFile = function(filename,content) {
	Utils.fs.writeFileSync(filename,content);
	console.log("SYSTEM: file saved " + filename);
}
Utils.readDir = function(path) {
	return Utils.fs.readdirSync(path);
}
Utils.loadJS = function(script,callback) {
	$.ajaxSetup({ async : false});
	$.getScript(script,callback(script));
	$.ajaxSetup({ async : true});
}
Utils.loadCSS = function(css) {
	new $("head").append("<link rel='stylesheet' type='text/css' href='" + css + "'/>");
}
Utils.repair_path = function(path) {
	if(Utils.node_os.type() == "Windows_NT") path = StringTools.replace(path,"\\","\\\\"); else {
	}
	return path;
}
Utils.exec = function(lines_to_exec,callback) {
	var os_type = "";
	var join_str = "";
	var join_str_cd = "";
	var cat_service = "";
	var quote = "";
	var _g = Utils.node_os.type();
	switch(_g) {
	case "Windows_NT":
		os_type = "WINDOWS";
		break;
	case "Linux":
		os_type = "LINUX";
		break;
	default:
		os_type = "OTHER";
	}
	if(os_type == "LINUX") {
		join_str = " ; ";
		join_str_cd = "";
		cat_service = " cat ";
		quote = "\"";
	} else if(os_type == "WINDOWS") {
		join_str = " & ";
		join_str_cd = " /D ";
		cat_service = " type ";
		quote = "\"";
	} else {
		join_str = " ; ";
		join_str_cd = "";
		cat_service = " cat ";
		quote = "\"";
	}
	var exec_str = "";
	var temp = "";
	var _g1 = 0;
	while(_g1 < lines_to_exec.length) {
		var each = lines_to_exec[_g1];
		++_g1;
		temp = StringTools.replace(each,"%CD%",join_str_cd);
		temp = StringTools.replace(temp,"%CAT%",cat_service);
		temp = StringTools.replace(temp,"%QUOTE%",quote);
		exec_str += temp + join_str;
	}
	Utils.node_exec(exec_str,{ },function(error,stdout,stderr) {
		callback(error,stdout,stderr);
	});
}
var haxe = {}
haxe.io = {}
haxe.io.Bytes = function(length,b) {
	this.length = length;
	this.b = b;
};
haxe.io.Bytes.__name__ = true;
haxe.io.Bytes.alloc = function(length) {
	var a = new Array();
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		a.push(0);
	}
	return new haxe.io.Bytes(length,a);
}
haxe.io.Bytes.ofString = function(s) {
	var a = new Array();
	var _g1 = 0, _g = s.length;
	while(_g1 < _g) {
		var i = _g1++;
		var c = s.cca(i);
		if(c <= 127) a.push(c); else if(c <= 2047) {
			a.push(192 | c >> 6);
			a.push(128 | c & 63);
		} else if(c <= 65535) {
			a.push(224 | c >> 12);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		} else {
			a.push(240 | c >> 18);
			a.push(128 | c >> 12 & 63);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		}
	}
	return new haxe.io.Bytes(a.length,a);
}
haxe.io.Bytes.ofData = function(b) {
	return new haxe.io.Bytes(b.length,b);
}
haxe.io.Bytes.prototype = {
	getData: function() {
		return this.b;
	}
	,toHex: function() {
		var s = new StringBuf();
		var chars = [];
		var str = "0123456789abcdef";
		var _g1 = 0, _g = str.length;
		while(_g1 < _g) {
			var i = _g1++;
			chars.push(HxOverrides.cca(str,i));
		}
		var _g1 = 0, _g = this.length;
		while(_g1 < _g) {
			var i = _g1++;
			var c = this.b[i];
			s.b += String.fromCharCode(chars[c >> 4]);
			s.b += String.fromCharCode(chars[c & 15]);
		}
		return s.b;
	}
	,toString: function() {
		return this.readString(0,this.length);
	}
	,readString: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
		var s = "";
		var b = this.b;
		var fcc = String.fromCharCode;
		var i = pos;
		var max = pos + len;
		while(i < max) {
			var c = b[i++];
			if(c < 128) {
				if(c == 0) break;
				s += fcc(c);
			} else if(c < 224) s += fcc((c & 63) << 6 | b[i++] & 127); else if(c < 240) {
				var c2 = b[i++];
				s += fcc((c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127);
			} else {
				var c2 = b[i++];
				var c3 = b[i++];
				s += fcc((c & 15) << 18 | (c2 & 127) << 12 | c3 << 6 & 127 | b[i++] & 127);
			}
		}
		return s;
	}
	,compare: function(other) {
		var b1 = this.b;
		var b2 = other.b;
		var len = this.length < other.length?this.length:other.length;
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			if(b1[i] != b2[i]) return b1[i] - b2[i];
		}
		return this.length - other.length;
	}
	,sub: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
		return new haxe.io.Bytes(len,this.b.slice(pos,pos + len));
	}
	,blit: function(pos,src,srcpos,len) {
		if(pos < 0 || srcpos < 0 || len < 0 || pos + len > this.length || srcpos + len > src.length) throw haxe.io.Error.OutsideBounds;
		var b1 = this.b;
		var b2 = src.b;
		if(b1 == b2 && pos > srcpos) {
			var i = len;
			while(i > 0) {
				i--;
				b1[i + pos] = b2[i + srcpos];
			}
			return;
		}
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			b1[i + pos] = b2[i + srcpos];
		}
	}
	,set: function(pos,v) {
		this.b[pos] = v & 255;
	}
	,get: function(pos) {
		return this.b[pos];
	}
	,__class__: haxe.io.Bytes
}
haxe.io.Error = { __ename__ : true, __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] }
haxe.io.Error.Blocked = ["Blocked",0];
haxe.io.Error.Blocked.toString = $estr;
haxe.io.Error.Blocked.__enum__ = haxe.io.Error;
haxe.io.Error.Overflow = ["Overflow",1];
haxe.io.Error.Overflow.toString = $estr;
haxe.io.Error.Overflow.__enum__ = haxe.io.Error;
haxe.io.Error.OutsideBounds = ["OutsideBounds",2];
haxe.io.Error.OutsideBounds.toString = $estr;
haxe.io.Error.OutsideBounds.__enum__ = haxe.io.Error;
haxe.io.Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe.io.Error; $x.toString = $estr; return $x; }
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
js.Boot.__cast = function(o,t) {
	if(js.Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
}
js.Browser = function() { }
js.Browser.__name__ = true;
js.NodeC = function() { }
js.NodeC.__name__ = true;
var ui = {}
ui.Menu = function(_text,_headerText) {
	this.li = js.Browser.document.createElement("li");
	this.li.className = "dropdown";
	var a = js.Browser.document.createElement("a");
	a.href = "#";
	a.className = "dropdown-toggle";
	a.setAttribute("data-toggle","dropdown");
	a.innerText = _text;
	this.li.appendChild(a);
	this.ul = js.Browser.document.createElement("ul");
	this.ul.className = "dropdown-menu";
	if(_headerText != null) {
		var li_header = js.Browser.document.createElement("li");
		li_header.className = "dropdown-header";
		li_header.innerText = _headerText;
		this.ul.appendChild(li_header);
	}
	this.li.appendChild(this.ul);
};
ui.Menu.__name__ = true;
ui.Menu.prototype = {
	setDisabled: function(indexes) {
		var childNodes = this.ul.childNodes;
		var _g1 = 0, _g = childNodes.length;
		while(_g1 < _g) {
			var i = _g1++;
			var child = js.Boot.__cast(childNodes[i] , Element);
			if(child.className != "divider") {
				if(Lambda.indexOf(indexes,i) == -1) child.className = ""; else child.className = "disabled";
			}
		}
	}
	,addToDocument: function() {
		var div = js.Boot.__cast(js.Browser.document.getElementById("position-navbar") , Element);
		div.appendChild(this.li);
	}
	,addSeparator: function() {
		this.ul.appendChild(new ui.Separator().getElement());
	}
	,addMenuItem: function(_text,_onClickFunctionName,_onClickFunction,_hotkey) {
		this.ul.appendChild(new ui.MenuButtonItem(_text,_onClickFunctionName,_onClickFunction,_hotkey).getElement());
	}
	,__class__: ui.Menu
}
var menu = {}
menu.CompileMenu = function() {
	ui.Menu.call(this,"Compile");
	this.create_ui();
};
menu.CompileMenu.__name__ = true;
menu.CompileMenu.__super__ = ui.Menu;
menu.CompileMenu.prototype = $extend(ui.Menu.prototype,{
	create_ui: function() {
		this.addMenuItem("Flash","plugin.misterpah.ProjectTree:compile_Flash",null,null);
		this.addMenuItem("HTML5","plugin.misterpah.ProjectTree:compile_Html5",null,null);
		this.addMenuItem("Neko","plugin.misterpah.ProjectTree:compile_Neko",null,null);
		this.addMenuItem("Hxml","plugin.misterpah.ProjectTree:compile_Hxml",null,null);
		this.addToDocument();
	}
	,__class__: menu.CompileMenu
});
menu.FileMenu = function() {
	ui.Menu.call(this,"File");
	this.create_ui();
};
menu.FileMenu.__name__ = true;
menu.FileMenu.__super__ = ui.Menu;
menu.FileMenu.prototype = $extend(ui.Menu.prototype,{
	create_ui: function() {
		this.addMenuItem("Open Project...","core:FileMenu.openProject",null,"Ctrl-Shift-O");
		this.addMenuItem("Close Project...","core:FileMenu.closeProject",null);
		this.addSeparator();
		this.addMenuItem("New File...","core:FileMenu.newFile",null,"Ctrl-N");
		this.addMenuItem("Open File...","core:FileMenu.openFile",null,"Ctrl-O");
		this.addMenuItem("Save","core:FileMenu.saveFile",null,"Ctrl-S");
		this.addMenuItem("Close File","core:FileMenu.closeFile",null,"Ctrl-W");
		this.addSeparator();
		this.addMenuItem("Exit","core:FileMenu.exit",function() {
			var application_window = js.Node.require("nw.gui").Window.get();
			application_window.close();
		},"Alt-F4");
		this.addToDocument();
	}
	,__class__: menu.FileMenu
});
ui.FileDialog = function() {
};
$hxExpose(ui.FileDialog, "ui.FileDialog");
ui.FileDialog.__name__ = true;
ui.FileDialog.prototype = {
	show: function(function_name,saveAs) {
		if(saveAs == null) saveAs = false;
		if(saveAs == false) new $("#temp").html("<input id='temp_fileDialog' type='file' />"); else new $("#temp").html("<input id='temp_fileDialog' type='file' nwsaveas />");
		var chooser = new $("#temp_fileDialog");
		chooser.change(function(evt) {
			var filepath = chooser.val();
			function_name(filepath);
		});
		chooser.trigger("click");
	}
	,__class__: ui.FileDialog
}
ui.MenuItem = function() { }
$hxExpose(ui.MenuItem, "ui.MenuItem");
ui.MenuItem.__name__ = true;
ui.MenuItem.prototype = {
	__class__: ui.MenuItem
}
ui.MenuButtonItem = function(_text,_onClickFunctionName,_onClickFunction,_hotkey) {
	var span = null;
	if(_hotkey != null) {
		span = js.Browser.document.createElement("span");
		span.style.color = "silver";
		span.style["float"] = "right";
		span.innerText = _hotkey;
	}
	this.li = js.Browser.document.createElement("li");
	var a = js.Browser.document.createElement("a");
	a.style.left = "0";
	a.setAttribute("onclick","$(document).triggerHandler(\"" + _onClickFunctionName + "\");");
	a.innerText = _text;
	if(span != null) a.appendChild(span);
	this.li.appendChild(a);
	this.registerEvent(_onClickFunctionName,_onClickFunction);
};
$hxExpose(ui.MenuButtonItem, "ui.MenuButtonItem");
ui.MenuButtonItem.__name__ = true;
ui.MenuButtonItem.__interfaces__ = [ui.MenuItem];
ui.MenuButtonItem.prototype = {
	registerEvent: function(_onClickFunctionName,_onClickFunction) {
		if(_onClickFunction != null) new $(js.Browser.document).on(_onClickFunctionName,_onClickFunction);
	}
	,getElement: function() {
		return this.li;
	}
	,__class__: ui.MenuButtonItem
}
ui.Separator = function() {
	this.li = js.Browser.document.createElement("li");
	this.li.className = "divider";
};
ui.Separator.__name__ = true;
ui.Separator.__interfaces__ = [ui.MenuItem];
ui.Separator.prototype = {
	getElement: function() {
		return this.li;
	}
	,__class__: ui.Separator
}
ui.ModalDialog = function() {
	this.title = "";
	this.id = "";
	this.content = "";
	this.header = true;
	this.footer = true;
	this.ok_text = "";
	this.cancel_text = "";
};
$hxExpose(ui.ModalDialog, "ui.ModalDialog");
ui.ModalDialog.__name__ = true;
ui.ModalDialog.prototype = {
	hide: function() {
		new $("#" + this.id).modal("hide");
	}
	,show: function() {
		var _g = this;
		this.updateModalDialog();
		new $("#" + this.id).modal("show");
		new $("#" + this.id).on("hidden.bs.modal",null,function() {
			new $("#" + _g.id).remove();
		});
	}
	,updateModalDialog: function() {
		var retStr = ["<div class='modal fade' id='" + this.id + "' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>","<div class='modal-dialog'>","<div class='modal-content'>"].join("\n");
		if(this.header == true) retStr += ["<div class='modal-header'>","<button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>","<h4 class='modal-title'>" + this.title + "</h4>","</div>"].join("\n");
		retStr += ["<div class='modal-body'>",this.content,"</div>"].join("\n");
		if(this.footer == true) retStr += ["<div class='modal-footer'>","<button type='button' class='btn btn-default' data-dismiss='modal'>" + this.cancel_text + "</button>","<button type='button' class='btn btn-primary button_ok'>" + this.ok_text + "</button>","</div>"].join("\n");
		retStr += ["</div>","</div>","</div>"].join("\n");
		new $("#modal_position").html(retStr);
		new $("#style_overide").append("<style>.modal{overflow:hidden}</style>");
	}
	,__class__: ui.ModalDialog
}
ui.Notify = function() {
	this.type = "";
	this.content = "";
};
$hxExpose(ui.Notify, "ui.Notify");
ui.Notify.__name__ = true;
ui.Notify.prototype = {
	show: function() {
		var type_error = "";
		var type_error_text = "";
		var skip = true;
		if(this.type == "error") {
			type_error = "danger";
			type_error_text = "Error";
			skip = false;
		} else if(this.type == "warning") {
			type_error = "warning";
			type_error_text = "Warning";
			skip = false;
		} else {
			type_error = "warning";
			type_error_text = "";
			skip = false;
		}
		if(skip == false) {
			var retStr = ["<div style=\"margin-left:10px;margin-top:12px;margin-right:10px;\" class=\"alert alert-" + type_error + " fade in\">","<a class=\"close\" data-dismiss=\"alert\" href=\"#\" aria-hidden=\"true\">&times;</a>","<strong>" + type_error_text + " </strong><br/>" + this.content,"</div>"].join("\n");
			new $("#notify_position").html(retStr);
		}
	}
	,__class__: ui.Notify
}
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; };
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; };
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
Utils.gui = js.Node.require("nw.gui");
Utils.path = js.Node.require("path");
Utils.fs = js.Node.require("fs");
Utils.node_exec = ($_=js.Node.require("child_process"),$bind($_,$_.exec));
Utils.node_os = js.Node.require("os");
js.Browser.document = typeof window != "undefined" ? window.document : null;
js.NodeC.UTF8 = "utf8";
js.NodeC.ASCII = "ascii";
js.NodeC.BINARY = "binary";
js.NodeC.BASE64 = "base64";
js.NodeC.HEX = "hex";
js.NodeC.EVENT_EVENTEMITTER_NEWLISTENER = "newListener";
js.NodeC.EVENT_EVENTEMITTER_ERROR = "error";
js.NodeC.EVENT_STREAM_DATA = "data";
js.NodeC.EVENT_STREAM_END = "end";
js.NodeC.EVENT_STREAM_ERROR = "error";
js.NodeC.EVENT_STREAM_CLOSE = "close";
js.NodeC.EVENT_STREAM_DRAIN = "drain";
js.NodeC.EVENT_STREAM_CONNECT = "connect";
js.NodeC.EVENT_STREAM_SECURE = "secure";
js.NodeC.EVENT_STREAM_TIMEOUT = "timeout";
js.NodeC.EVENT_STREAM_PIPE = "pipe";
js.NodeC.EVENT_PROCESS_EXIT = "exit";
js.NodeC.EVENT_PROCESS_UNCAUGHTEXCEPTION = "uncaughtException";
js.NodeC.EVENT_PROCESS_SIGINT = "SIGINT";
js.NodeC.EVENT_PROCESS_SIGUSR1 = "SIGUSR1";
js.NodeC.EVENT_CHILDPROCESS_EXIT = "exit";
js.NodeC.EVENT_HTTPSERVER_REQUEST = "request";
js.NodeC.EVENT_HTTPSERVER_CONNECTION = "connection";
js.NodeC.EVENT_HTTPSERVER_CLOSE = "close";
js.NodeC.EVENT_HTTPSERVER_UPGRADE = "upgrade";
js.NodeC.EVENT_HTTPSERVER_CLIENTERROR = "clientError";
js.NodeC.EVENT_HTTPSERVERREQUEST_DATA = "data";
js.NodeC.EVENT_HTTPSERVERREQUEST_END = "end";
js.NodeC.EVENT_CLIENTREQUEST_RESPONSE = "response";
js.NodeC.EVENT_CLIENTRESPONSE_DATA = "data";
js.NodeC.EVENT_CLIENTRESPONSE_END = "end";
js.NodeC.EVENT_NETSERVER_CONNECTION = "connection";
js.NodeC.EVENT_NETSERVER_CLOSE = "close";
js.NodeC.FILE_READ = "r";
js.NodeC.FILE_READ_APPEND = "r+";
js.NodeC.FILE_WRITE = "w";
js.NodeC.FILE_WRITE_APPEND = "a+";
js.NodeC.FILE_READWRITE = "a";
js.NodeC.FILE_READWRITE_APPEND = "a+";
Main.main();
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

//@ sourceMappingURL=haxestudio.js.map