(function ($hx_exports) { "use strict";
$hx_exports.plugin = $hx_exports.plugin || {};
$hx_exports.plugin.misterpah = $hx_exports.plugin.misterpah || {};
var HxOverrides = function() { };
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Lambda = function() { };
Lambda.__name__ = ["Lambda"];
Lambda.indexOf = function(it,v) {
	var i = 0;
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var v2 = $it0.next();
		if(v == v2) return i;
		i++;
	}
	return -1;
};
var Session = $hx_exports.Session = function() { };
Session.__name__ = ["Session"];
Session.prototype = {
	__class__: Session
};
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
js.Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else return o.__class__;
};
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
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
};
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
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js.Boot.__interfLoop(js.Boot.getClass(o),cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js.Boot.__cast = function(o,t) {
	if(js.Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
};
var plugin = {};
plugin.misterpah = {};
plugin.misterpah.Editor = $hx_exports.plugin.misterpah.Editor = function() { };
plugin.misterpah.Editor.__name__ = ["plugin","misterpah","Editor"];
plugin.misterpah.Editor.main = function() {
	plugin.misterpah.Editor.init();
};
plugin.misterpah.Editor.plugin_path = function() {
	return "../plugin/" + Type.getClassName(plugin.misterpah.Editor) + "/bin";
};
plugin.misterpah.Editor.init = function() {
	plugin.misterpah.Editor.doc_buffer = { };
	plugin.misterpah.Editor.widgetStack = new Array();
	plugin.misterpah.Editor.tab_index = new Array();
	plugin.misterpah.Editor.tab_cursor = new Array();
	plugin.misterpah.Editor.completion_list = new Array();
	plugin.misterpah.Editor.track_cursor = true;
	Utils.loadJS(plugin.misterpah.Editor.plugin_path() + "/codemirror-3.15/lib/codemirror.js",function() {
	});
	Utils.loadJS(plugin.misterpah.Editor.plugin_path() + "/codemirror-3.15/mode/haxe/haxe.js",function() {
	});
	Utils.loadJS(plugin.misterpah.Editor.plugin_path() + "/codemirror-3.15/addon/edit/matchbrackets.js",function() {
	});
	Utils.loadJS(plugin.misterpah.Editor.plugin_path() + "/codemirror-3.15/addon/edit/closebrackets.js",function() {
	});
	Utils.loadJS(plugin.misterpah.Editor.plugin_path() + "/codemirror-3.15/addon/fold/foldcode.js",function() {
	});
	Utils.loadJS(plugin.misterpah.Editor.plugin_path() + "/codemirror-3.15/addon/fold/foldgutter.js",function() {
	});
	Utils.loadJS(plugin.misterpah.Editor.plugin_path() + "/codemirror-3.15/addon/selection/active-line.js",function() {
	});
	Utils.loadJS(plugin.misterpah.Editor.plugin_path() + "/codemirror-3.15/addon/hint/show-hint.js",function() {
	});
	Utils.loadJS(plugin.misterpah.Editor.plugin_path() + "/js/codemirror.hint.haxe.js",function() {
	});
	Utils.loadJS(plugin.misterpah.Editor.plugin_path() + "/editor_hint.js",function() {
	});
	Utils.loadCSS(plugin.misterpah.Editor.plugin_path() + "/editor.css");
	Utils.loadCSS(plugin.misterpah.Editor.plugin_path() + "/codemirror-3.15/lib/codemirror.css");
	Utils.loadCSS(plugin.misterpah.Editor.plugin_path() + "/codemirror-3.15/addon/hint/show-hint.css");
	Utils.loadCSS(plugin.misterpah.Editor.plugin_path() + "/codemirror-3.15/theme/base16-dark.css");
	plugin.misterpah.Editor.create_ui();
	plugin.misterpah.Editor.register_hooks();
	sessionStorage.static_completion = "";
};
plugin.misterpah.Editor.register_hooks = function() {
	plugin.misterpah.Editor.cursor_type = "";
	new $(window.document).on("show.bs.tab",null,function(e) {
		var target = new $(e.target);
		plugin.misterpah.Editor.show_tab(target.attr("data-path"),false);
		var tab_number = Lambda.indexOf(plugin.misterpah.Editor.tab_index,Main.session.active_file);
		var unshowed_tab = plugin.misterpah.Editor.tab_cursor[tab_number];
		var cursor_pos = CodeMirror.Pos(unshowed_tab[0],unshowed_tab[1]);
		plugin.misterpah.Editor.cm.setCursor(cursor_pos);
	});
	Main.message.listen("plugin.misterpah.FileAccess:open_file.complete","plugin.misterpah.Editor",function() {
		new $("#editor_position").css("display","block");
		plugin.misterpah.Editor.make_tab();
	});
	new $(window).on("resize",null,function() {
		plugin.misterpah.Editor.editor_resize();
	});
	Main.message.listen("plugin.misterpah.FileAccess:close_file.complete","plugin.misterpah.Editor",plugin.misterpah.Editor.close_tab);
	Main.message.listen("plugin.misterpah.Completion:static_completion.complete","plugin.misterpah.Editor",plugin.misterpah.Editor.handle_static_completion);
	Main.message.listen("plugin.misterpah.Editor:build_completion.complete.dynamic","plugin.misterpah.Editor",plugin.misterpah.Editor.handle_dynamic_completion);
};
plugin.misterpah.Editor.create_ui = function() {
	new $("#editor_position").css("display","none");
	new $("#editor_position").append("<div  id='misterpah_editor_tabs_position'><ul class='nav nav-tabs'></ul></div>");
	new $("#editor_position").append("<div class='ui-layout-center' id='misterpah_editor_cm_position'></div>");
	new $("#misterpah_editor_cm_position").append("<textarea style='display:none;' name='misterpah_editor_cm_name' id='misterpah_editor_cm'></textarea>");
	plugin.misterpah.Editor.cm = CodeMirror.fromTextArea($("#misterpah_editor_cm")[0],{ lineNumbers : true, indentUnit : 4, tabSize : 4, indentWithTabs : true, cursorHeight : 0.85, mode : "haxe", theme : "base16-dark", viewportMargin : Infinity, matchBrackets : true, autoCloseBrackets : true, foldCode : true, foldGutter : true, styleActiveLine : true});
	CodeMirror.on(plugin.misterpah.Editor.cm,"cursorActivity",function(cm) {
		if(plugin.misterpah.Editor.track_cursor == true) {
			var path = Main.session.active_file;
			var tab_number = Lambda.indexOf(plugin.misterpah.Editor.tab_index,path);
			var cursor = cm.getCursor();
			plugin.misterpah.Editor.tab_cursor[tab_number] = [cursor.line,cursor.ch];
		}
		if(cm.getCursor().line != sessionStorage.hint_pos) {
			if(plugin.misterpah.Editor.widgetStack.length > 0) {
				var _g = 0;
				var _g1 = plugin.misterpah.Editor.widgetStack;
				while(_g < _g1.length) {
					var each = _g1[_g];
					++_g;
					cm.removeLineWidget(each);
				}
			}
		}
	});
	CodeMirror.on(plugin.misterpah.Editor.cm,"change",function(cm1) {
		var path1 = Main.session.active_file;
		if(path1 == "") return;
		var file_obj = Main.file_stack.find(path1);
		Main.file_stack.update_content(path1,cm1.getValue());
		var cursor_pos = cm1.indexFromPos(cm1.getCursor());
		sessionStorage.cursor_index = cursor_pos;
		sessionStorage.keypress = cm1.getValue().charAt(cursor_pos - 1);
		if(cm1.getValue().charAt(cursor_pos - 1) == ".") plugin.misterpah.Editor.request_static_completion(cm1); else if(cm1.getValue().charAt(cursor_pos - 1) == "(") {
			sessionStorage.hint_pos = cm1.getCursor().line;
			plugin.misterpah.Editor.request_dynamic_completion(cm1);
		}
	});
};
plugin.misterpah.Editor.openBuffer = function(name,text) {
	plugin.misterpah.Editor.doc_buffer[name] = CodeMirror.Doc(text,"haxe");
};
plugin.misterpah.Editor.selectBuffer = function(editor,name) {
	var buf = plugin.misterpah.Editor.doc_buffer[name];
	if(buf.getEditor()) buf = buf.linkedDoc({ sharedHist : true});
	var old = editor.swapDoc(buf);
	editor.refresh();
};
plugin.misterpah.Editor.request_static_completion = function(cm) {
	console.log("request_static_completion");
	console.log("tokenizing terms");
	plugin.misterpah.Editor.cursor_type = ".";
	sessionStorage.cursor_pos = cm.getCursor().ch;
	sessionStorage.cursor_pos_line = cm.getCursor().line;
	var cursor_temp = cm.getCursor();
	cursor_temp.ch = cursor_temp.ch - 1;
	var seekToken = true;
	var token_array = new Array();
	while(seekToken) {
		var before_token = cm.getTokenAt(cursor_temp);
		token_array.push(before_token);
		var cursor_check_before_token = CodeMirror.Pos(cursor_temp.line,before_token.start - 1);
		var before_before_token = cm.getTokenAt(cursor_check_before_token);
		if(before_before_token.type == null) seekToken = false; else cursor_temp = cursor_check_before_token;
	}
	token_array.reverse();
	var completion_str_array = new Array();
	var _g = 0;
	while(_g < token_array.length) {
		var each = token_array[_g];
		++_g;
		completion_str_array.push(each.string);
	}
	sessionStorage.find_completion = completion_str_array.join(".");
	console.log("token is : " + sessionStorage.find_completion);
	console.log("tokenizing terms completed.");
	console.log("invoke static completion");
	Main.message.broadcast("core:FileMenu.saveFile","plugin.misterpah.Editor",null);
	Main.message.broadcast("plugin.misterpah.Completion:static_completion","plugin.misterpah.Editor",null);
};
plugin.misterpah.Editor.request_dynamic_completion = function(cm) {
	console.log("request_dynamic_completion");
	Main.message.broadcast("core:FileMenu.saveFile","plugin.misterpah.Editor",null);
	plugin.misterpah.Editor.cursor_type = "(";
	sessionStorage.cursor_pos = cm.getCursor().ch;
	console.log("invoke dynamic completion");
	Main.message.broadcast("plugin.misterpah.Completion:dynamic_completion","plugin.misterpah.Editor",null);
};
plugin.misterpah.Editor.handle_static_completion = function() {
	console.log("preparing static completion");
	var completion_array = JSON.parse(sessionStorage.static_completion);
	console.log(completion_array);
	plugin.misterpah.Editor.completion_list = new Array();
	var temp = completion_array;
	var _g = 0;
	while(_g < temp.length) {
		var each = temp[_g];
		++_g;
		var fname = each[0];
		plugin.misterpah.Editor.completion_list.push(fname);
	}
	console.log("invoke show completion");
	CodeMirror.showHint(plugin.misterpah.Editor.cm,haxeHint);
	sessionStorage.static_completion = "";
};
plugin.misterpah.Editor.handle_dynamic_completion = function() {
	console.log("preparing dynamic completion");
	var completion_array = JSON.parse(sessionStorage.static_completion);
	console.log(completion_array);
	plugin.misterpah.Editor.widgetStack.push(inline_hint(plugin.misterpah.Editor.cm.getCursor().line,completion_array));
};
plugin.misterpah.Editor.editor_resize = function() {
	var win = Utils.gui.Window.get();
	var win_height;
	win_height = js.Boot.__cast(win.height , Int);
	var doc_height = new $(window.document).height();
	var tab_height = new $("#misterpah_editor_tabs_position a").height();
	new $(".CodeMirror").css("height",Std.string(doc_height - 30) + "px");
	new $(".CodeMirror").css("overflow-x","hidden");
};
plugin.misterpah.Editor.close_tab = function() {
	var path = Main.session.active_file;
	if(path != "") {
		$("#misterpah_editor_tabs_position a[data-path='" + path + "']").remove();
		delete_buffered_document(path);
		Main.session.active_file = "";
		var len = $("#misterpah_editor_tabs_position a").length;
		if(len < 1) new $("#editor_position").css("display","none"); else new $("#misterpah_editor_cm_position").css("display","none");
	}
};
plugin.misterpah.Editor.make_tab = function() {
	var path = Main.session.active_file;
	var file_obj = Main.file_stack.find(path);
	plugin.misterpah.Editor.openBuffer(path,file_obj[1]);
	new $("#editor_position").css("display","block");
	$("#misterpah_editor_tabs_position ul").append("<li><a onclick='plugin.misterpah.Editor.show_tab(\"" + path + "\");' data-path='" + path + "'>" + file_obj[2] + "</a></li>");
	plugin.misterpah.Editor.show_tab(path,true);
};
plugin.misterpah.Editor.show_tab = function(path,tabShow) {
	if(tabShow == null) tabShow = true;
	plugin.misterpah.Editor.selectBuffer(plugin.misterpah.Editor.cm,path);
	Main.session.active_file = path;
	if(tabShow == true) {
		reset_active_tab();
		$("#misterpah_editor_tabs_position a[data-path='" + path + "']").parent().addClass("active");
	}
	new $("#misterpah_editor_cm_position").css("display","block");
	plugin.misterpah.Editor.cm.refresh();
};
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
String.prototype.__class__ = String;
String.__name__ = ["String"];
Array.__name__ = ["Array"];
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
plugin.misterpah.Editor.main();
})(typeof window != "undefined" ? window : exports);
