package ;

import js.Node;

/**
  * Nodejs Sys class.
  * http://haxe.org/api/sys/
  * Currently incomplete, but should be straightforward to fill in the missing calls.
  */
class Sys
{
	public static function args () :Array<String>
	{
		return Node.process.argv;
	}

	public static function getEnv (key :String) :String
	{
		return Reflect.field(Node.process.env, key);
	}

	public static function environment () : haxe.ds.StringMap<String>
	{
		return Node.process.env;
	}

	public static function exit (code :Int) :Void
	{
		Node.process.exit(code);
	}

	/**
		Gives the most precise timestamp value (in seconds).
	**/
	public static function time () :Float
	{
		return Date.now().getTime() / 1000;
	}

}
