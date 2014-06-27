package plugin.misterpah;
import jQuery.*;
import js.Browser;

@:keep @:expose class Completion
{

	private static function plugin_path():String
	{
	return "../plugin/" + Type.getClassName(Completion) +"/bin";
	}

	static public function main():Void
	{
		create_ui();
		register_listener();
	}

	private static function create_ui():Void
	{
		Utils.loadJS(plugin_path() + "/jquery_xml2json.js",function(){});
		Utils.loadJS(plugin_path() + "/Completion.js",function(){});
	}

	static public function register_listener():Void
	{
		// listener is inside Completion.js
	}
}