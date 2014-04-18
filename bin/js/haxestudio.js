(function ($hx_exports) { "use strict";
$hx_exports.ui = $hx_exports.ui || {};
var FileObject = $hx_exports.FileObject = function() {
	this.file_stack = new Array();
};
FileObject.prototype = {
	add: function(path,content,className) {
		var a = new Array();
		a[0] = path;
		a[1] = content;
		a[2] = className;
		return this.file_stack.push(a);
	}
	,find: function(path) {
		if(this.file_stack.length > 0) {
			var position = 0;
			var _g = 0;
			var _g1 = this.file_stack;
			while(_g < _g1.length) {
				var each = _g1[_g];
				++_g;
				if(each[0] == path) return each; else position += 1;
			}
			return ["not found"];
		} else return ["null"];
	}
	,update_content: function(path,new_content) {
		if(this.file_stack.length > 0) {
			var position = 0;
			var _g = 0;
			var _g1 = this.file_stack;
			while(_g < _g1.length) {
				var each = _g1[_g];
				++_g;
				if(each[0] == path) this.file_stack[position][1] = new_content; else position += 1;
			}
		}
	}
	,remove: function(path) {
		if(this.file_stack.length > 0) {
			var position = 0;
			var _g = 0;
			var _g1 = this.file_stack;
			while(_g < _g1.length) {
				var each = _g1[_g];
				++_g;
				if(each[0] == path) this.file_stack.splice(position,1); else position += 1;
			}
		}
	}
};
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
var Main = $hx_exports.Main = function() { };
Main.main = function() {
	Main.version = "0.2 alpha";
	Main.session = new Session();
	Main.file_stack = new FileObject();
	Main.message = new Message();
	new ui.Notify();
	new ui.FileDialog();
	new ui.ModalDialog();
	Main.plugin_solve_dependency("../plugin");
	Main.plugin_loading_sequence.reverse();
	Main.plugin_load_all("../plugin",Main.plugin_loading_sequence);
};
Main.plugin_load_all = function(path,dependency_sequence) {
	var _g = 0;
	while(_g < dependency_sequence.length) {
		var each = dependency_sequence[_g];
		++_g;
		console.log(each);
		if(each != "") Utils.loadJS(path + "/" + each + "/bin/plugin.js",function(script) {
		}); else continue;
	}
};
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
	var _g1 = 0;
	while(_g1 < plugin.length) {
		var each1 = plugin[_g1];
		++_g1;
		if(each1.dependency.length >= 1) {
			var temp = new Array();
			var key = Reflect.fields(each1.dependency);
			var _g11 = 0;
			while(_g11 < key.length) {
				var each_key = key[_g11];
				++_g11;
				temp.push(Reflect.field(each1.dependency,each_key));
			}
			var _g12 = 0;
			while(_g12 < temp.length) {
				var each2 = temp[_g12];
				++_g12;
				build_load_sequence.push([each1.actualName,each2]);
			}
		} else build_load_sequence.push([each1.actualName,""]);
	}
	var plugin_loading_sequence_obj = tsort(build_load_sequence);
	Main.plugin_loading_sequence = plugin_loading_sequence_obj.path;
};
var Message = function() {
	this.broadcast_message = new Array();
	this.listen_message = new Array();
};
Message.prototype = {
	broadcast: function(message,caller_name,parameter) {
		var temp = new Array();
		temp.push(message);
		temp.push(caller_name);
		this.broadcast_message.push(temp);
		EventBus.dispatch(message,caller_name,parameter);
	}
	,listen: function(message,caller_name,callback_function) {
		var temp = new Array();
		temp.push(message);
		temp.push(caller_name);
		this.listen_message.push(temp);
		EventBus.addEventListener(message,callback_function,caller_name);
	}
	,list_broadcast: function() {
		return this.broadcast_message;
	}
	,list_listen: function() {
		return this.listen_message;
	}
};
var Reflect = function() { };
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		return null;
	}
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
var Session = $hx_exports.Session = function() {
	this.project_xml = "";
	this.project_xml_parameter = "";
	this.project_folder = "";
	this.active_file = "";
};
var Std = function() { };
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
var StringBuf = function() {
	this.b = "";
};
var StringTools = function() { };
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
var js = {};
js.Node = function() { };
js.Node.get_assert = function() {
	return js.Node.require("assert");
};
js.Node.get_childProcess = function() {
	return js.Node.require("child_process");
};
js.Node.get_cluster = function() {
	return js.Node.require("cluster");
};
js.Node.get_crypto = function() {
	return js.Node.require("crypto");
};
js.Node.get_dgram = function() {
	return js.Node.require("dgram");
};
js.Node.get_dns = function() {
	return js.Node.require("dns");
};
js.Node.get_fs = function() {
	return js.Node.require("fs");
};
js.Node.get_http = function() {
	return js.Node.require("http");
};
js.Node.get_https = function() {
	return js.Node.require("https");
};
js.Node.get_net = function() {
	return js.Node.require("net");
};
js.Node.get_os = function() {
	return js.Node.require("os");
};
js.Node.get_path = function() {
	return js.Node.require("path");
};
js.Node.get_querystring = function() {
	return js.Node.require("querystring");
};
js.Node.get_repl = function() {
	return js.Node.require("repl");
};
js.Node.get_tls = function() {
	return js.Node.require("tls");
};
js.Node.get_url = function() {
	return js.Node.require("url");
};
js.Node.get_util = function() {
	return js.Node.require("util");
};
js.Node.get_vm = function() {
	return js.Node.require("vm");
};
js.Node.get___filename = function() {
	return __filename;
};
js.Node.get___dirname = function() {
	return __dirname;
};
js.Node.newSocket = function(options) {
	return new js.Node.net.Socket(options);
};
var Utils = $hx_exports.Utils = function() { };
Utils.checkFileExist = function(filename) {
	return Utils.fs.existsSync(filename);
};
Utils.newFile = function(filename) {
	Utils.fs.openSync(filename,"a+");
};
Utils.readFile = function(filename) {
	var ret = Utils.fs.readFileSync(filename,"utf-8");
	return ret;
};
Utils.saveFile = function(filename,content) {
	Utils.fs.writeFileSync(filename,content);
	console.log("SYSTEM: file saved " + filename);
};
Utils.readDir = function(path) {
	return Utils.fs.readdirSync(path);
};
Utils.loadJS = function(script,callback) {
	$.ajaxSetup({ async : false});
	$.getScript(script,callback(script));
	$.ajaxSetup({ async : true});
};
Utils.loadCSS = function(css) {
	new $("head").append("<link rel='stylesheet' type='text/css' href='" + css + "'/>");
};
Utils.repair_path = function(path) {
	if(Utils.node_os.type() == "Windows_NT") path = StringTools.replace(path,"\\","\\\\"); else {
	}
	return path;
};
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
	var exec_array = [];
	var _g1 = 0;
	while(_g1 < lines_to_exec.length) {
		var each = lines_to_exec[_g1];
		++_g1;
		temp = StringTools.replace(each,"%CD%",join_str_cd);
		temp = StringTools.replace(temp,"%CAT%",cat_service);
		temp = StringTools.replace(temp,"%QUOTE%",quote);
		exec_array.push(temp);
	}
	exec_str = exec_array.join(join_str);
	Utils.node_exec(exec_str,{ },function(error,stdout,stderr) {
		if(error != null) {
			if(stdout != "") notify(stdout,"danger");
		}
		callback(error,stdout,stderr);
	});
};
var haxe = {};
haxe.io = {};
haxe.io.Bytes = function(length,b) {
	this.length = length;
	this.b = b;
};
haxe.io.Bytes.alloc = function(length) {
	var a = new Array();
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		a.push(0);
	}
	return new haxe.io.Bytes(length,a);
};
haxe.io.Bytes.ofString = function(s) {
	var a = new Array();
	var _g1 = 0;
	var _g = s.length;
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
};
haxe.io.Bytes.ofData = function(b) {
	return new haxe.io.Bytes(b.length,b);
};
haxe.io.Bytes.prototype = {
	get: function(pos) {
		return this.b[pos];
	}
	,set: function(pos,v) {
		this.b[pos] = v & 255;
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
			var i1 = _g++;
			b1[i1 + pos] = b2[i1 + srcpos];
		}
	}
	,sub: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
		return new haxe.io.Bytes(len,this.b.slice(pos,pos + len));
	}
	,compare: function(other) {
		var b1 = this.b;
		var b2 = other.b;
		var len;
		if(this.length < other.length) len = this.length; else len = other.length;
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			if(b1[i] != b2[i]) return b1[i] - b2[i];
		}
		return this.length - other.length;
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
				var c21 = b[i++];
				var c3 = b[i++];
				s += fcc((c & 15) << 18 | (c21 & 127) << 12 | c3 << 6 & 127 | b[i++] & 127);
			}
		}
		return s;
	}
	,toString: function() {
		return this.readString(0,this.length);
	}
	,toHex: function() {
		var s = new StringBuf();
		var chars = [];
		var str = "0123456789abcdef";
		var _g1 = 0;
		var _g = str.length;
		while(_g1 < _g) {
			var i = _g1++;
			chars.push(HxOverrides.cca(str,i));
		}
		var _g11 = 0;
		var _g2 = this.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			var c = this.b[i1];
			s.b += String.fromCharCode(chars[c >> 4]);
			s.b += String.fromCharCode(chars[c & 15]);
		}
		return s.b;
	}
	,getData: function() {
		return this.b;
	}
};
haxe.io.Error = { __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] };
haxe.io.Error.Blocked = ["Blocked",0];
haxe.io.Error.Blocked.__enum__ = haxe.io.Error;
haxe.io.Error.Overflow = ["Overflow",1];
haxe.io.Error.Overflow.__enum__ = haxe.io.Error;
haxe.io.Error.OutsideBounds = ["OutsideBounds",2];
haxe.io.Error.OutsideBounds.__enum__ = haxe.io.Error;
haxe.io.Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe.io.Error; return $x; };
js.NodeC = function() { };
var ui = {};
ui.FileDialog = $hx_exports.ui.FileDialog = function() {
};
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
};
ui.ModalDialog = $hx_exports.ui.ModalDialog = function() {
	this.title = "";
	this.id = "";
	this.content = "";
	this.header = true;
	this.footer = true;
	this.ok_text = "";
	this.cancel_text = "";
};
ui.ModalDialog.prototype = {
	updateModalDialog: function() {
		var retStr = ["<div class='modal fade' id='" + this.id + "' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>","<div class='modal-dialog'>","<div class='modal-content'>"].join("\n");
		if(this.header == true) retStr += ["<div class='modal-header'>","<button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>","<h4 class='modal-title'>" + this.title + "</h4>","</div>"].join("\n");
		retStr += ["<div class='modal-body'>",this.content,"</div>"].join("\n");
		if(this.footer == true) retStr += ["<div class='modal-footer'>","<button type='button' class='btn btn-default' data-dismiss='modal'>" + this.cancel_text + "</button>","<button type='button' class='btn btn-primary button_ok'>" + this.ok_text + "</button>","</div>"].join("\n");
		retStr += ["</div>","</div>","</div>"].join("\n");
		new $("#modal_position").html(retStr);
		new $("#style_overide").append("<style>.modal{overflow:hidden}</style>");
	}
	,show: function() {
		var _g = this;
		this.updateModalDialog();
		new $("#" + this.id).modal("show");
		new $("#" + this.id).on("hidden.bs.modal",null,function() {
			new $("#" + _g.id).remove();
		});
	}
	,hide: function() {
		new $("#" + this.id).modal("hide");
	}
};
ui.Notify = $hx_exports.ui.Notify = function() {
	this.type = "";
	this.content = "";
};
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
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
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
Utils.gui = js.Node.require("nw.gui");
Utils.path = js.Node.require("path");
Utils.fs = js.Node.require("fs");
Utils.node_exec = ($_=js.Node.require("child_process"),$bind($_,$_.exec));
Utils.node_os = js.Node.require("os");
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
})(typeof window != "undefined" ? window : exports);

//# sourceMappingURL=haxestudio.js.map