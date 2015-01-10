package;
import jQuery.*;
import js.Browser;
import js.Node;
import haxe.macro.Context;
import haxe.macro.Expr;

@:keep @:expose class Utils
	{
	public static var gui = Node.require("nw.gui");
	public static var path = Node.path;
	
	
	private static var fs:js.Node.NodeFS = Node.fs;
	private static var node_exec = Node.childProcess.exec;
	private static var node_os = Node.os;
	
	
	public static function checkFileExist(filename:String):Bool
		{
		return Utils.fs.existsSync(filename);
		}
	
	// file manipulation
	public static function newFile(filename:String):Void
		{
		fs.openSync(filename,"a+");
		}

	public static function readFile(filename:String):String
    	{
		return fs.readFileSync(filename,"utf-8");
    	}


	public static function saveFile(filename:String, content:String):Void
    	{
		fs.writeFileSync(filename, content);
		trace("file saved.");
    	}
    
	public static function isFile(filename:String):Bool
		{
		var stats = fs.statSync(filename);
		var ret = false;
		if (stats.isFile())
			{
			ret = true;
			}
		return ret;
		}
	public static function encodeString(input:String):String
		{
			return StringTools.urlEncode(input);
		}
		
	public static function decodeString(input:String):String
		{
			return StringTools.urlDecode(input);
		}

	// folder manipulation
    public static function readDir(path:String):Array<String>
    	{
    	return fs.readdirSync(path);
	    }
    
    
    // support
    
    
    macro public static function getClassName():ExprOf<String> {
        return { expr: EConst(CString(Context.getLocalClass().toString())), pos: Context.currentPos() }
    }    
    
	public static function loadJS(script:String,callback:Dynamic):Void
		{
		JQueryStatic.ajaxSetup({async:false});
		untyped $.getScript(script,function(){Main.session.js_loaded.push(script);callback(script);});
		//JQueryStatic.getScript(script,function(){/*Main.session.js_loaded.push(script);callback(script);*/});
		JQueryStatic.ajaxSetup({async:true});
		}
		
	public static function loadCSS(css:String):Void
		{
		Main.session.css_loaded.push(css);
		new JQuery("head").append("<link rel='stylesheet' type='text/css' href='"+css+"'/>");
		}
		
		
	public static function repair_path(path:String):String
		{
			trace("depecrated. don't use Utils.repair_path anymore!");
			return path;
			/*
		if (node_os.type() == "Windows_NT")
			{
			path = StringTools.replace(path,"\\", "\\\\");		
			}
		else
			{
			}
		return path;
			*/
		}		
		
	public static function exec(lines_to_exec:Array<String>,callback:Dynamic)
		{
		var os_type = "";
		var join_str = "";
		var join_str_cd = "";
		var cat_service = "";
		var quote = "";
		
		switch(node_os.type())
	        {
			case "Windows_NT":
				os_type = "WINDOWS";
			case "Linux":
				os_type = "LINUX";
			case _:
				os_type = "OTHER";
    	    }

		if (os_type  == "LINUX")
			{
			join_str = " ; ";
			join_str_cd = "";
			cat_service = " cat ";
			quote = '"';
			}
		else if (os_type  == "WINDOWS")
			{
			join_str = " & ";
			join_str_cd = " /D ";
			cat_service = " type ";
			quote = '"';
			}			
		else // mac
			{
			join_str = " ; ";
			join_str_cd = "";
			cat_service = " cat ";
			quote = '"';
			}
		
		var exec_str = "";
		var temp = "";
		var exec_array:Array<String> = [];
		
		for (each in lines_to_exec)
			{
			//trace(each);
			temp = StringTools.replace(each,"%CD%", join_str_cd);
			temp = StringTools.replace(temp,"%CAT%", cat_service);
			temp = StringTools.replace(temp,"%QUOTE%", quote);
			exec_array.push(temp);
			}
		exec_str = exec_array.join(join_str);
		//trace (exec_str);
		node_exec(exec_str,{},function(error, stdout:String,stderr:String){
			if (error != null) // error
				{
				if (stdout!="")
					{
					untyped notify(stdout,"danger");
					}
				}
			//trace(error);
			//trace(stdout);
			//trace(stderr);
			callback(error, stdout,stderr);
			});
		}	
		
    
	}