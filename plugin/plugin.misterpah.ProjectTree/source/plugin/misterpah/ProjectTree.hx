package plugin.misterpah;
import jQuery.*;
import js.Browser;

@:keep @:expose class ProjectTree
{
	static private var plugin:Map<String,String>;

    static public function main():Void
    {
	    create_ui(); //-- no need because it already listened to system_parse_project.complete
		register_listener();
    }
    
	private static function plugin_path():String
	{
	return "../plugin/" + Type.getClassName(ProjectTree) +"/bin";
	}
    
	public function  (  )
	{
		
	}
	
	private function  (  )
	{
		
	}
	
	static private function  (  )
	{
		
	}
	
	:spf:




	static public function register_listener():Void
	{
		//Main.message.listen("plugin.misterpah.ProjectAccess:system_parse_project.complete","plugin.misterpah.ProjectTree",create_ui);
		Main.message.listen("plugin.misterpah.ProjectAccess:close_project.complete","plugin.misterpah.ProjectTree",reset_tree);
		//Main.message.listen("core:FileMenu.openFolder.complete","plugin.misterpah.ProjectTree:js:projectTree.js",_openFolder_complete);
	}
	
	static public function _openFolder_complete():Void
		{
		untyped ProjectTree.show_project_tree(Main.session.project_folder,false);
		}
	
	
	static public function reset_tree():Void
	{
	untyped $("#tree_position").html("<br/><ul id='file_tree'></ul>");
		/*
	if (Main.session.project_xml != "")
		{
		var ret = ['<p style="color:#ffffff" class="shadowme">Haxe Studio v<span class="hs_version"></span>',
		'<br/>',
		'===========<br/>',
		'how to use Haxe Studio (correctly) : <br/>',
		'<ol>',
		'<li style="color:#ffffff">Create a New Project or Open Project. </li>',
		'<li style="color:#ffffff">Then open the desired file(s)</li>',
		'</ol>',
		'</p>'].join("\n");		
	
	
		untyped $("#tree_position").html(ret);	
		untyped $(".hs_version").html(Main.version);
		}
		*/
	
	}
	
	static public function create_ui():Void
	{
	Utils.loadJS(plugin_path() + "/projectTree.js",function(){});
	Utils.loadCSS(plugin_path() + "/projectTree.css");
	}
	
	



	
}
