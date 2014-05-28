package;

@:keep @:expose extern class Utils{
	public static var gui;
	public static var path;

	//public static var os;
	//public static var exec;
	//public static var sys;
	//public static var nwworkingdir:String;
	
	//public static var window:Dynamic;
	/*
	public static var WINDOWS:Int;
	public static var LINUX:Int;
	public static var OTHER:Int;
    */
    //public static function getOS():Int;
	//public static function plugin_path(className:Dynamic):String;
    //public static function capitalize(myString:String):String;
    public static function exec(lines_to_exec:Array<String>,callback:Dynamic):Void;
    public static function checkFileExist(filename:String):Bool;
    public static function readFile(filename:String):Dynamic;
    public static function newFile(filename:String):Dynamic;
    public static function saveFile(filename:String, content:String):Dynamic;
    public static function loadJS(script:String,callback:Dynamic):Dynamic;
    public static function loadCSS(css:String):Dynamic;
    public static function isFile(filename:String):Bool;
    
    //public static function getClassName():String;
    //public static function system_get_completion(position:Int,callback:Dynamic):Dynamic;
    //public static function system_create_project(exec_str:String):Dynamic;
    //public static function system_parse_project():Dynamic;
    //public static function register_plugin(plugin_credentials:Map<String,String>):Void;
}
