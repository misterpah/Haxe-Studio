package plugin.misterpah;
import jQuery.*;
import js.Browser;

@:keep @:expose class Console
{
	public static var console:Array<String>;
	private static function plugin_path():String
	{
	return "../plugin/" + Type.getClassName(Console) +"/bin";
	}

	static public function main():Void
	{
		create_ui();
		register_listener();
	}

	private static function create_ui():Void
	{
		Utils.loadJS(plugin_path()+"/console.js",function(){});
	}

	static public function register_listener():Void
	{
		
	}
}