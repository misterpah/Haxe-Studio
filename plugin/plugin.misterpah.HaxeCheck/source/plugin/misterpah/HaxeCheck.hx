package plugin.misterpah;
import jQuery.*;
import js.Browser;

@:keep @:expose class HaxeCheck
{
	static private var plugin:Map<String,String>;
	static private var haxe_version:String;
	
    static public function main():Void
    {
		register_listener();
		check_haxe();
    }
	
	static public function register_listener():Void
	{	
		Main.message.listen("plugin.misterpah.HaxeCheck:versionCheck.complete","plugin.misterpah.HaxeCheck",versionCheck_complete);
	}

	static public function versionCheck_complete():Void
	{
		var version_split = haxe_version.split(".");
		if (version_split[0] == "3")
		{
			trace("Haxe 3 installed");
		}
		else
		{
			trace("old version of Haxe is installed: "+ version_split);
			untyped alert("please upgrade your Haxe. Download it at http://haxe.org/download");
		}
	}

	
	static public function check_haxe():Void
	{
	Utils.exec(["haxe -version"],function(error,stdout,stderr)
		{
		if (error == null ) // haxe is available
			{
			haxe_version = stderr;
			Main.message.broadcast("plugin.misterpah.HaxeCheck:versionCheck.complete","plugin.misterpah.HaxeCheck",null);
			}
		else // haxe is not available
			{
			trace(error);
			trace(stdout);
			trace(stderr);
			untyped alert("Haxe isn't available on this computer OR there's something wrong with your installation. Please download & re-install Haxe version 3. You may download it at http://haxe.org/download");
			}
		});
	} 
}
