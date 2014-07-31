package plugin.misterpah;
import jQuery.*;
import js.Browser;

@:keep @:expose class FileAccess
{
	static private var plugin:Map<String,String>;

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
	Main.message.listen("core:FileMenu.newFile","plugin.misterpah.FileAccess",new_file);
	Main.message.listen("core:FileMenu.openFile","plugin.misterpah.FileAccess",open_file);
	
	// prevent direct file access to save, because editor wants to save it's changes first
	//Main.message.listen("core:FileMenu.saveFile","plugin.misterpah.FileAccess",save_file);
	Main.message.listen("plugin.misterpah.FileAccess:saveFile","plugin.misterpah.FileAccess",save_file);	
	
	Main.message.listen("core:FileMenu.closeFile","plugin.misterpah.FileAccess",close_file);
	Main.message.listen("plugin.misterpah.FileAccess:OpenFileDirectly","plugin.misterpah.FileAccess",openFileDirectly);

	}
	
    static public function new_file():Void
    {
        var file_dialog = new ui.FileDialog();
		file_dialog.show(newFileHandler,true);
    }

    static private function newFileHandler(path:String):Void
    {
        //trace(path);
		/*
        if (StringTools.endsWith(path,"hx") == false)
        {
            path += ".hx";
        }
		*/
        Utils.newFile(path);
        openFileHandler(path,true);
		Main.message.broadcast("plugin.misterpah.FileAccess:new_file.complete","plugin.misterpah.FileAccess",null);
    }	
	
    static public function open_file():Void
    {
        var filedialog = new ui.FileDialog();
		filedialog.show(openFileHandler);		
    }

	static private function openFileDirectly(event:Dynamic,path:String):Void
	{
	//trace("open directly detected. redirected to plugin.misterpah.FileAccess.openFileHandler");
	//trace(path);
    path = untyped fs.realpathSync(path);
	openFileHandler(path,false);
	}

    static private function openFileHandler(path:String,newFile:Bool=false):Void
    {
		//path = untyped Utils.repair_path(path);
		path = untyped fs.realpathSync(path);
		//trace("open file : " + path);

        var find = Main.file_stack.find(path);
        if (find[0] == "null" || find[0] == "not found")
        {
            var content = Utils.readFile(path);
            var filename_split = path.split(Utils.path.sep);
			//trace(filename_split);
            var className = filename_split[filename_split.length-1].split('.')[0];
			//trace(className);
            if (newFile == true)
                {
                var new_content = ["package;",
                                    "",
                                    "class "+className,
                                    "{",
                                    "}"].join("\n");  
                content = new_content;                  
                }
            Main.file_stack.add(path,content,className);
            Main.session.active_file = untyped fs.realpathSync(path);
			Main.message.broadcast("plugin.misterpah.FileAccess:open_file.complete","plugin.misterpah.FileAccess",null);
	        if (newFile == true)
                {
                Main.message.broadcast("core:FileMenu.saveFile","plugin.misterpah.FileAccess",null);
                }
        }
        else // file already opened.
        {
        Main.session.active_file = untyped fs.realpathSync(path);
        Main.message.broadcast("plugin.misterpah.FileAccess:open_file.complete","plugin.misterpah.FileAccess",null);
        }
    }

    static public function save_file()
    {
        var path = Main.session.active_file;
        var file_obj = Main.file_stack.find(path);
        Utils.saveFile(path,file_obj[1]);
		Main.message.broadcast("plugin.misterpah.FileAccess:save_file.complete","plugin.misterpah.FileAccess",null);
    }

    static public function close_file()
    {
        var path = Main.session.active_file;
        Main.file_stack.remove(path);
		Main.message.broadcast("plugin.misterpah.FileAccess:close_file.complete","plugin.misterpah.FileAccess",null);
    }    
}
