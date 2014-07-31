package plugin.misterpah;
import jQuery.*;
import js.Browser;

@:keep @:expose class NewProject
{
	static private var plugin:Map<String,String>;
	static private var new_project_window:Dynamic;
	
    static public function main():Void
    {
		register_listener();
    }
	
	
	private static function create_new_project():Void
	{
	new_project_window = untyped gui.Window.open("../plugin/plugin.misterpah.NewProject/bin/newProject.html",{title:"Create New Project",focus:true,nodejs:true,min_width:1024,min_height:500,toolbar:false});
	untyped __js__("plugin.misterpah.NewProject.new_project_window.on('plugin.misterpah.NewProject:project_created', function(path,folder,name){console.dir(path + Utils.path.sep +folder + Utils.path.sep + name); Main.session.project_xml = path + Utils.path.sep + folder +Utils.path.sep + name; plugin.misterpah.NewProject.new_project_window.close(); Main.message.broadcast('plugin.misterpah.ProjectAccess:open_project_auto');})");
	
	
	untyped __js__("plugin.misterpah.NewProject.new_project_window.on('plugin.misterpah.NewProject:setProjectXML', function(projectXml){ Main.session.project_xml = projectXml})");
	untyped __js__("plugin.misterpah.NewProject.new_project_window.on('plugin.misterpah.NewProject:autoOpenProject', function(){ plugin.misterpah.NewProject.new_project_window.close(); Main.message.broadcast('plugin.misterpah.ProjectAccess:open_project_auto');})");
	}		
	
	static public function register_listener():Void
	{	
	Main.message.listen("core:FileMenu.newProject","plugin.misterpah.NewProject",create_new_project);
	}



}
