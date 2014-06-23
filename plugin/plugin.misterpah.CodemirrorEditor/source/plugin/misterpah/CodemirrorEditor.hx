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
		
		//supporting 3 type of files. HAXE, JS, XML.
		Utils.loadJS(plugin_path() +cm_folder+"/mode/haxe/haxe.js",function(){});
		Utils.loadJS(plugin_path() +cm_folder+"/mode/javascript/javascript.js",function(){});
		Utils.loadJS(plugin_path() +cm_folder+"/mode/xml/xml.js",function(){});
		
		Utils.loadCSS(plugin_path()+cm_folder+"/lib/codemirror.css");
		Utils.loadCSS(plugin_path() +cm_folder+"/theme/base16-dark.css");
		Utils.loadJS(plugin_path()+"/CodemirrorEditor.js",function(){});
	}

	static public function register_listener():Void
	{
	}
}
