package js.node;
import js.Node;

/**
 * ...
 * @author sledorze
 */

class JsHelper {
		
	inline public static function ifNull<T>(alt : T, v : T) : T return
		v == null?alt:v
}