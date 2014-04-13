package tools;

/**
 * ...
 * @author AS3Boyan
 */

//Neko script for haxelib
//Compiles to run.n

class Run
{
	public static function main()
	{
		var process = new sys.io.Process("haxelib", ["path", "Haxe-Studio"]);
		var output = process.stdout.readAll().toString();		
		var path:String = output.split("\n")[0];

		Sys.command("haxelib", ["run", "node-webkit", StringTools.trim(path)]);
	}
	
	public static function combine(firstPath:String, secondPath:String):String
	{
		if (!StringTools.endsWith(firstPath, "\\") && !StringTools.endsWith(firstPath, "/"))
		{
			firstPath += "/";
		}
		
		return firstPath + secondPath;
	}
}
