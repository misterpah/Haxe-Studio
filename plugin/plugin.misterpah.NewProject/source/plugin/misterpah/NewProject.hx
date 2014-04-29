package plugin.misterpah;
import jQuery.*;
import js.Browser;

@:keep @:expose class NewProject
{
	static private var plugin:Map<String,String>;
	
    static public function main():Void
    {
		register_listener();
    }
	
	
	private static function create_new_project():Void
	{
	untyped gui.Window.open("../plugin/plugin.misterpah.NewProject/bin/newProject.html",{title:"Create New Project",focus:true,nodejs:true,min_width:"800px",min_height:"500px"});
	}		
	
	static public function register_listener():Void
	{	
	Main.message.listen("core:FileMenu.newProject","plugin.misterpah.NewProject",create_new_project);
	
	}

	
}
