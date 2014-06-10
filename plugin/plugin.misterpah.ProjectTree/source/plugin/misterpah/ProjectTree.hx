package plugin.misterpah;
import jQuery.*;
import js.Browser;

@:keep @:expose class ProjectTree
{
	static private var plugin:Map<String,String>;

    static public function main():Void
    {
		register_listener();
    }
    
	private static function plugin_path():String
	{
	return "../plugin/" + Type.getClassName(ProjectTree) +"/bin";
	}
    

	static public function register_listener():Void
	{
		Main.message.listen("plugin.misterpah.ProjectAccess:system_parse_project.complete","plugin.misterpah.ProjectTree",create_ui);
		Main.message.listen("plugin.misterpah.ProjectAccess:close_project.complete","plugin.misterpah.ProjectTree",reset_tree);
	}
	
	
	static public function reset_tree():Void
	{
	untyped $("#tree_position").html("<br/><ul id='file_tree'></ul>");
	}
	
	static public function create_ui():Void
	{
	Utils.loadJS(plugin_path() + "/projectTree.js",function(){});
	Utils.loadCSS(plugin_path() + "/projectTree.css");
	}
	
	



	
}
