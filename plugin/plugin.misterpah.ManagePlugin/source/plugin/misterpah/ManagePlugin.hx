package plugin.misterpah;
import jQuery.*;
import js.Browser;

@:keep @:expose class ManagePlugin
{
	static private var plugin:Map<String,String>;
	static private var window_index:Dynamic;
	static private var plugin_conf:Dynamic;
	
    static public function main():Void
    {
		register_listener();
    }
	
	
	private static function function_page_index():Void
	{
	window_index = untyped gui.Window.open("../plugin/plugin.misterpah.ManagePlugin/bin/index.html",{title:"Manage Plugin",focus:true,nodejs:true,min_width:1024,min_height:500,toolbar:false});
	//untyped __js__("plugin.misterpah.ManagePlugin.window_index.on('plugin.misterpah.NewProject:project_created', function(path,folder,name){console.dir(path + Utils.path.sep +folder + Utils.path.sep + name); Main.session.project_xml = path + Utils.path.sep + folder +Utils.path.sep + name; plugin.misterpah.NewProject.new_project_window.close(); Main.message.broadcast('plugin.misterpah.ProjectAccess:open_project_auto');})");
	}		
	
	static public function register_listener():Void
	{	
	Main.message.listen("core:ToolsMenu.managePlugin","plugin.misterpah.ManagePlugin",function_page_index);
	}



}
