
import sys.FileSystem;

class Macro
{
	#if haxe3 macro #else @:macro #end 
	public static function makeSys ()
	{
		haxe.macro.Compiler.define("nodejs");
		// haxe.macro.Context.warning("in macro", haxe.macro.Context.currentPos());
		// haxe.macro.Compiler.define("sys");
		// haxe.macro.Context.warning("in macro: " + FileSystem.exists("foo"), haxe.macro.Context.currentPos());
		var date = Date.now().toString();
        		return haxe.macro.Context.makeExpr(date, haxe.macro.Context.currentPos());
	}
	
}
