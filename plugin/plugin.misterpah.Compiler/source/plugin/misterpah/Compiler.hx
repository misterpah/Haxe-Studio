package plugin.misterpah;
import jQuery.*;
import js.Browser;
import Utils;
import Main;

@:keep @:expose class Compiler
{
    static public function main():Void
    {
		register_listener();
    }

	static public function register_listener():Void
	{
		Main.message.listen("plugin.misterpah.ProjectTree:compile_Hxml","plugin.misterpah.Compiler",function(){compile_to_target("HXML");});
		Main.message.listen("plugin.misterpah.ProjectTree:compile_Flash","plugin.misterpah.Compiler",function(){compile_to_target("LIME-FLASH");});
		Main.message.listen("plugin.misterpah.ProjectTree:compile_Neko","plugin.misterpah.Compiler",function(){compile_to_target("LIME-NEKO");});
		Main.message.listen("plugin.misterpah.ProjectTree:compile_Html5","plugin.misterpah.Compiler",function(){compile_to_target("LIME-HTML5");});
		Main.message.listen("plugin.misterpah.ProjectTree:compile_Android","plugin.misterpah.Compiler",function(){compile_to_target("LIME-ANDROID");});
	}
	
	static public function compile_to_target(target:String):Void
		{
		var compile_string = "";
		switch( target ) {
		case "HXML":
		    compile_string = "haxe %QUOTE%"+Main.session.project_xml+"%QUOTE%";
		case "LIME-FLASH":
		    compile_string = "lime test flash";
		case "LIME-NEKO":
		    compile_string = "lime test neko";
		case "LIME-HTML5":
		    compile_string = "lime test html5";		    
		case "LIME-ANDROID":
		    compile_string = "lime test android";
		default:
		    trace("wat?");
		    return;
		}		
		
		
		Utils.exec(["cd %CD% %QUOTE%"+Main.session.project_folder+"%QUOTE%",
			compile_string],function(error,stdout,stderr){
				if (stderr != "")
				{
					untyped localStorage.showError = "true";
					untyped localStorage.compile_error_status = stdout;
					untyped localStorage.compile_error_error = stderr;
					Utils.gui.Window.open("./debugger.html",{title:"debugger",position: 'center',toolbar:false,focus:false});
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
