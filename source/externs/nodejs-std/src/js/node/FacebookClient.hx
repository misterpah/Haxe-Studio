package js.node;
import js.Node;

/**
 * ...
 * @author sledorze
 */

@:native("FacebookClient")
extern
class FacebookClient {
	
	public function getSessionByAccessToken(access_token : Dynamic) : (FacebookSession -> Void) -> Void;
	
	public function new():Void; 

	private static function __init__() : Void untyped { 
	  FacebookClient = Node.require('facebook-client').FacebookClient; 
	}
	
}

typedef FacebookSession = {
	function graphCall(path : String, ?params : Dynamic, ?method : String) : Dynamic -> Void;
	
	function restCall (method : String, ?params : Dynamic) : Dynamic -> Void;
	
	function getId() : Dynamic -> Void;
	
	function isValid() : Bool -> Void;
	
	function getMeta() : Dynamic -> Void;
	
	function retrieveAccessToken(code : String, redirect_uri : String) : Void -> Void;
	
	function injectAccessToken(access_token : String) : Void -> Void;
}