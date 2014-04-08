package ;

/**
 * ...
 * @author ...
 */
@:native('JSON') extern class JSON
{

	public function new() 
	{
	}
	public static function stringify(object:Dynamic):String;
	public static function parse(object:String):Dynamic;
	
}
