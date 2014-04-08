package haxe;

import js.Node;

class Json
{
	inline public static function stringify (obj :Dynamic, ?replacer : Dynamic -> Dynamic -> Dynamic, ?insertion :Dynamic) :String
	{
		return Node.stringify(obj, replacer, insertion);
	}
	
	inline public static function parse (jsonString :String) :Dynamic
	{
		return Node.parse(jsonString);
	}
}
