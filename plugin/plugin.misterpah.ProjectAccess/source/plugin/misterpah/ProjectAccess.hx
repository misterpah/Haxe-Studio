package plugin.misterpah;
import jQuery.*;
import js.Browser;

@:keep @:expose class ProjectAccess
{
	static private var plugin:Map<String,String>;
	static private var previous_project_xml:String;

    static public function main():Void
    {
	register_listener();
	register_shortcutkey();
    }
	
	static private function register_shortcutkey():Void
	{
	
	}	
	
	static public function register_listener():Void
	{
	Main.message.listen("core:FileMenu.openProject","plugin.misterpah.ProjectAccess",open_project);
	Main.message.listen("core:FileMenu.closeProject","plugin.misterpah.ProjectAccess",close_project);
	Main.message.listen("plugin.misterpah.ProjectAccess","plugin.misterpah.ProjectAccess",parse_project_complete);
	Main.message.listen("plugin.misterpah.ProjectAccess:open_project_auto","plugin.misterpah.ProjectAccess",open_project_auto);
	}
	
	
	
	static public function open_project_auto():Void
	{
        parse_project();	
	}	
	
    static public function open_project():Void
    {
        var filedialog = new ui.FileDialog();
		filedialog.show(openProjectHandler);
    }

    static private function openProjectHandler(path:String,newFile:Bool=false):Void
    {
		previous_project_xml = Main.session.project_xml;
        Main.session.project_xml = path;
        parse_project();
    }	
	
	static private function parse_project_complete():Void
	{
		Main.message.broadcast("plugin.misterpah.ProjectAccess:open_project.complete","plugin.misterpah.ProjectAccess",null);
	}
	
	
    private static function close_project()
    {
    	trace("closing project");
        Main.session.project_xml = '';
        Main.session.project_folder = '';
        Main.session.project_xml_parameter = '';
		Main.message.broadcast("plugin.misterpah.ProjectAccess:close_project.complete","plugin.misterpah.ProjectAccess",null);
    }
    
    
    
	public static function parse_project()
    {
		var exec_str = "";
		var filename = Main.session.project_xml;
		var temp = filename.split(".");
		var filename_ext = temp.pop();

	    var projectFolder = filename.split(Utils.path.sep);
	    projectFolder.pop();
	    Main.session.project_folder = projectFolder.join(Utils.path.sep);		

		//trace(filename_ext);
	    
	    var compiler = "";
	    if (filename_ext == "xml")
	    	{
	    	compiler = "lime display -hxml flash";
	    	}
	    else if (filename_ext == "hxml")
	    	{
	    	compiler = "%CAT% \""+filename+"\"";
	    	}
		else
			{
				trace("unknown filetype. discard");
				Main.session.project_xml = previous_project_xml;
				return;
			}
		Utils.exec(["cd %CD% \""+Main.session.project_folder+"\"",compiler],function(error,stdout,stderr)
			{
				//trace(error);trace(stdout);trace(stderr);
				if (error != null) // error 
				{
					untyped notify(stderr,"danger");
					Main.session.project_xml = "";					
				}
				else
				{
					var content_push:Array<String> = new Array();
					var content:Array<String> = stdout.split("\n");

					var i = 0;
					for (i in 0...content.length)
					{
						var cur = content[i];				
						for (arg in ['-lib', '-cp', '-main', '-D']) 
						{
							if (cur.indexOf(arg) == 0) // starts with
							{
								content_push.push(cur);
								break;
							}
						}                       

					}

			        Main.session.project_xml_parameter = content_push.join(' ');					

			        //trace(Main.session.project_xml_parameter);
					if (Main.session.project_xml_parameter != "")
						{
						untyped notify("Project opened","success");
						Main.message.broadcast("plugin.misterpah.ProjectAccess:system_parse_project.complete","plugin.misterpah.ProjectAccess",[]);
						}
				} // stdout != ""
			
			});	    	
	    
	    /*
		if (filename_ext == "xml")
		{
			switch (Utils.getOS()) 
			{
				case Utils.WINDOWS:
					exec_str = "cd /D " + '"'+ Main.session.project_folder +'"'+" & lime display -hxml flash";
				case Utils.LINUX:
					exec_str = "cd " +'"'+ Main.session.project_folder +'"'+ " ; lime display -hxml flash";
				default:
					
			}
		}
		else if (filename_ext == "hxml")
		{
			switch (Utils.getOS()) 
			{
				case Utils.WINDOWS:
					exec_str = "cd /D "+'"'+ Main.session.project_folder +'"'+" & type "+'"'+ filename+'"';
				case Utils.LINUX:
					exec_str = "cd " +'"'+ Main.session.project_folder +'"'+ " ; cat "+'"'+filename+'"';
				default:
					
			}							
		}
		trace(exec_str);
		*/
		/*
		Utils.exec(exec_str,
			{},
			function(error, stdout:String,stderr:String){
				
				var the_error = false;
				if (stderr != "") {the_error = true;}
				if (the_error == true)
				{
					trace(error);trace(stdout);trace(stderr);
					var notify = new ui.Notify();
					notify.type = "error";
					notify.content = "not a valid Haxe Project File ( XML / HXML )";
					notify.show();	
					Main.session.project_xml = "";					
				}
				else
				{
					//new JQuery('#projectContent').html(stdout);
					var content_push:Array<String> = new Array();
					var content:Array<String> = stdout.split("\n");
					var i = 0;
					for (i in 0...content.length)
					{
						var cur = content[i];
						
						for (arg in ['-lib', '-cp', '-main', '-D']) 
						{
							if (cur.indexOf(arg) == 0) // starts with
							{
								content_push.push(cur);
								break;
							}
						}                       
					}
			        Main.session.project_xml_parameter = content_push.join(' ');					
			        //trace(Main.session.project_xml_parameter);
					if (Main.session.project_xml_parameter != "")
					{
						Main.message.broadcast("core:utils.system_parse_project.complete","core:utils");
					}
				} // stdout != ""
			});
		*/
	
	}           
    
}
