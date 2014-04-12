package;
import Utils;
import core.*;
import js.html.Document;
import jQuery.*;
@:keep @:expose class Main 
{
	static public var session:Session;
	static public var message:Message;
	static public var file_stack:FileObject;
	private static var plugin_loading_sequence:Array<String>;
	
	
	static public function main():Void
		{
		session = new Session();
		file_stack = new FileObject();
		message = new Message();
		
		// init ui
		new ui.Notify();
		new ui.FileDialog();
    	new ui.ModalDialog();
		
		
		
		
		//Utils.exec(["uname -m","cd %CD% ~","ls"],function(error,stdout,stderr){trace(error);trace(stdout);trace(stderr);});
		plugin_solve_dependency("../plugin");
		plugin_loading_sequence.reverse();
		plugin_load_all("../plugin",plugin_loading_sequence);
		
		//new menu.FileMenu();
		//new menu.CompileMenu();
		//new menu.HelpMenu();		
		}
	
	
	static public function plugin_load_all(path:String,dependency_sequence:Array<String>)
		{
		for (each in dependency_sequence)
			{
			trace(each);
			if (each != "")
				{
				Utils.loadJS(path+"/"+each+"/bin/plugin.js",function(script){});
				}
			else
				{
				continue;
				}
			}				
		}
	
	static public function plugin_solve_dependency(path:String)
		{
		var available_plugin = Utils.readDir(path);
		
		var plugin = new Array();
		for (each in available_plugin)
			{
			plugin.push(JSON.parse(Utils.readFile(path+"/"+each+"/bin/plugin.json")));
			}
		
		var build_load_sequence = new Array();
		for (each in plugin)
			{
			if (each.dependency.length >= 1)
				{
				var temp = new Array();
			
				// reconstruct variable because "each.dependency" can't be access by array;
				var key = Reflect.fields(each.dependency);
				for (each_key in key)
					{
					temp.push(Reflect.field(each.dependency, each_key));
					}
				
				for (each2 in temp)
					{
					build_load_sequence.push([each.actualName,each2]);
					}
				}
			else
				{
				build_load_sequence.push( [each.actualName,""]);
				}
			}
		var plugin_loading_sequence_obj = untyped tsort(build_load_sequence);
		plugin_loading_sequence = untyped plugin_loading_sequence_obj.path;		
		}
		
}
