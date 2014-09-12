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
	static public var version:String;
	private static var plugin_loading_sequence:Array<String>;
	
	
	static public function main():Void
		{
		}

	static public function run_haxe_studio():Void
		{
		version = "0.4.4";
		session = new Session();
		file_stack = new FileObject();
		message = new Message();
		
		// init ui
		new ui.Notify();
		new ui.FileDialog();
		new ui.FolderDialog();
    	new ui.ModalDialog();
		//Main.file_stack.find()

		var root_path = untyped root;
		
		var filename = "./hs-plugin.json";

		var data = untyped {};
		var ret = "";
		// load plugin from config file
		var scan_plugin = true;
			
		if (Utils.checkFileExist(filename)) 
			{ 
			ret = Utils.readFile(filename);
			try {
				data = untyped JSON.parse(ret); 
				scan_plugin = false;
				} 
			catch( unknown : Dynamic ) 
				{
			   	trace("Unknown exception : "+Std.string(unknown));
				}
			}
		else
			{
			Utils.newFile(root_path+Utils.path.sep+"bin"+Utils.path.sep+ "hs-plugin.json");
			scan_plugin = true;
			}
			
		if (scan_plugin == true) // must refresh the plugin
			{ 
			var available_plugin = Utils.readDir("../plugin");
			untyped data.load_plugin = available_plugin;
			var saveThis = untyped JSON.stringify(data);
			Utils.saveFile(root_path+Utils.path.sep+"bin"+Utils.path.sep+ "hs-plugin.json", saveThis);
			}

		plugin_solve_dependency(data.load_plugin);
		plugin_loading_sequence.reverse();
		untyped localStorage.plugin_loading_sequence = JSON.stringify(plugin_loading_sequence);
		plugin_load_all(root_path+"/plugin",plugin_loading_sequence);
		}
	
	
	static public function plugin_load_all(path:String,dependency_sequence:Array<String>)
		{
		for (each in dependency_sequence)
			{
			if (each != "")
				{				
				untyped console.debug(each);
				Utils.loadJS(path+"/"+each+"/bin/plugin.js",function(script){});
				}
			else
				{
				continue;
				}
			}				
		}
	
	static public function plugin_solve_dependency(available_plugin:Array<String>)
		{
		var plugin = new Array();
		for (each in available_plugin)
			{
			if (untyped fs.existsSync("../plugin/"+each+"/bin/plugin.json"))
				{
				plugin.push(JSON.parse(Utils.readFile("../plugin/"+each+"/bin/plugin.json")));
				}
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
