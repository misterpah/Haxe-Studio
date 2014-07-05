package plugin.misterpah;
import jQuery.*;
import js.Browser;
import Utils;
import Main;

@:keep @:expose class Compiler
{
    static public function main():Void
    {
    	create_ui();
		register_listener();
    }
	
	private static function plugin_path():String
	{
	return "../plugin/" + Type.getClassName(Compiler) +"/bin";
	}
    	
    
    static public function create_ui():Void
    {
		Utils.loadJS(plugin_path() + "/Compiler_ui.js",function(){});
		Utils.loadCSS(plugin_path() + "/Compiler_ui.css");
    }

	static public function register_listener():Void
	{
		Main.message.listen("plugin.misterpah.Compiler:compile_request","plugin.misterpah.Compiler",function(){compile_project();});
		Main.message.listen("plugin.misterpah.Compiler:compile_this","plugin.misterpah.Compiler",function(p1,p2){compile(p2[0]);});
	}

	static public function compile_project():Void
		{
		var compile_target = untyped $("#compileTarget").val();
		var compile_parameter = untyped $("#compileParameter").val();
		
		
		if (compile_parameter.indexOf("custom") == 0)
			{
			trace("custom compilation");
			Main.message.broadcast("plugin.misterpah.Compiler:compile:"+compile_parameter,"plugin.misterpah.Compiler",null);
			return;
			}
		
		
		var compile_string = "lime "+compile_parameter+" "+compile_target;
		
		if (compile_target == "HXML")
			{
			compile_string = "haxe %QUOTE%"+Main.session.project_xml+"%QUOTE%";
			}
		
		trace(compile_string);
		untyped hs_console("compiling : " +compile_string);
		compile(compile_string);
		}
	
	static private function compile(compile_string)
		{
		Utils.exec(["cd %CD% %QUOTE%"+Main.session.project_folder+"%QUOTE%",
			compile_string],function(error,stdout,stderr)
				{
				untyped notify("Compiling complete","success");
				if (stderr != "")
					{
					untyped localStorage.showError = "true";
					untyped localStorage.compile_error_status = stdout;
					untyped localStorage.compile_error_error = stderr;
					if (error != null) // error 
						{
						Utils.gui.Window.open("./debugger.html",{title:"debugger",position: 'center',toolbar:false,focus:false});
						}
					}
					if (stderr == "")
						{
						untyped localStorage.showError = "false";
						}				
					trace(error);
					trace(stdout);
					trace(stderr);
				});	
		}
}
