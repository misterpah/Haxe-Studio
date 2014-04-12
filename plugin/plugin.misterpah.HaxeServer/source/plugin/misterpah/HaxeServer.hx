package plugin.misterpah;
import jQuery.*;
import js.Browser;

@:keep @:expose class HaxeServer
{
	static private var plugin:Map<String,String>;

	static private var haxeCompletionServer:js.Node.NodeChildProcess;
    static public function main():Void
    {
		register_listener();
    }

	static public function register_listener():Void
	{
		Main.message.listen("plugin.misterpah.HaxeCheck:versionCheck.complete","plugin.misterpah.HaxeServer",spawn_server);
	}

	
	static private function spawn_server():Void
	{
		haxeCompletionServer = js.Node.childProcess.spawn("haxe", ["--wait", "30003"]);	
		trace("Haxe completion server started");

		var application_window = js.Node.require('nw.gui').Window.get();
		application_window.on("close",function(){haxeCompletionServer.kill(); application_window.close(true);});
	}
	


	
}
