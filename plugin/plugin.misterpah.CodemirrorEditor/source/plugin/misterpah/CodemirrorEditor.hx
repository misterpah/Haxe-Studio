package plugin.misterpah;
import jQuery.*;
import js.Browser;

@:keep @:expose class CodemirrorEditor
{
	private static var cm:Dynamic;
	private static var cm_buffer:Dynamic;
	private static var cm_folder = "/codemirror-4.2";

	private static function plugin_path():String
	{
		return "../plugin/" + Type.getClassName(CodemirrorEditor) +"/bin";
	}

	static public function main():Void
	{
		create_ui();
		register_listener();
	}

	private static function create_ui():Void
	{
		Utils.loadJS(plugin_path()+cm_folder+"/lib/codemirror.js",function(){});
		// addons
		
		Utils.loadJS(plugin_path() +cm_folder+"/addon/search/searchcursor.js",function(){});
		Utils.loadJS(plugin_path() +cm_folder+"/addon/search/search.js",function(){});
		Utils.loadJS(plugin_path() +cm_folder+"/addon/edit/matchbrackets.js",function(){});
		Utils.loadJS(plugin_path() +cm_folder+"/addon/edit/closebrackets.js",function(){});
		Utils.loadJS(plugin_path() +cm_folder+"/addon/fold/brace-fold.js",function(){});
		
		Utils.loadJS(plugin_path() +cm_folder+"/addon/fold/foldcode.js",function(){});
		Utils.loadCSS(plugin_path() +cm_folder+"/addon/fold/foldgutter.css");

		Utils.loadJS(plugin_path() +cm_folder+"/addon/dialog/dialog.js",function(){});
		Utils.loadCSS(plugin_path() +cm_folder+"/addon/dialog/dialog.css");
		
		Utils.loadJS(plugin_path() +cm_folder+"/addon/hint/show-hint.js",function(){});
		Utils.loadCSS(plugin_path()+cm_folder+"/addon/hint/show-hint.css");
		
			
		// keymap
		Utils.loadJS(plugin_path() +cm_folder+"/keymap/sublime.js",function(){});		
		
		//supporting 3 type of files. HAXE, JS, XML.
		Utils.loadJS(plugin_path() +cm_folder+"/mode/haxe/haxe.js",function(){});
		Utils.loadJS(plugin_path() +cm_folder+"/mode/javascript/javascript.js",function(){});
		Utils.loadJS(plugin_path() +cm_folder+"/mode/xml/xml.js",function(){});

		Utils.loadCSS(plugin_path()+cm_folder+"/lib/codemirror.css");
		Utils.loadCSS(plugin_path() +cm_folder+"/theme/monokai.css");
		Utils.loadJS(plugin_path()+"/CodemirrorEditor.js",function(){});
		Utils.loadJS(plugin_path()+"/CodemirrorEditor_resizer.js",function(){});
		Utils.loadJS(plugin_path()+"/jshint.js",function(){});
	}

	static public function register_listener():Void
	{
		// listener are implemented in /CodemirrorEditor.js
	}
}
