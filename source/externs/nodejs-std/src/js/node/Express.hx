package js.node;

import js.node.Connect;
import js.Node;
import js.node.EveryAuth;

/**
 * ...
 * @author sledorze
 */

typedef ExpressHttpServerReq = { > NodeHttpServerReq,
	var session : Session;
	var body : Dynamic;
}

typedef ExpressHttpServerResp = { > NodeHttpServerResp,
	function render(name : String, params : Dynamic) : Void;
	function redirect(url : String) : Void;
  
  @:overload(function () : Void {})
  @:overload(function (value : String, code : Int) : Void {})
  @:overload(function (type : String, value : Dynamic, code : Int) : Void {})
  function send(value : Dynamic) : Void;
}


typedef AddressAndPort = {
  address : String,
  port : Int
}

typedef ExpressServer = {
	@:overload(function(f: Dynamic->ExpressHttpServerReq->ExpressHttpServerResp->Dynamic->Void):Void { } )
	@:overload(function(f: ExpressHttpServerReq->ExpressHttpServerResp->Dynamic->Void):Void { } )
	function use (?middlewareMountPoint :Dynamic, middleware :Dynamic) :ConnectServer;
	function get(path : String, f : ExpressHttpServerReq ->  ExpressHttpServerResp -> Void) : Void;
	function post(path : String, f : ExpressHttpServerReq ->  ExpressHttpServerResp -> Void) : Void;

	
	function listen (port :Int, ?address :String) :Void;

  function address() : AddressAndPort;
}

extern
class Express {

	public function createServer (a1 :Dynamic, ?a2 :Dynamic, ?a3 :Dynamic, ?a4 :Dynamic, ?a5 :Dynamic, ?a6 :Dynamic, ?a7 :Dynamic, ?a8 :Dynamic, ?a9 :Dynamic) :ExpressServer;

	public function cookieParser() :MiddleWare;
	public function bodyParser() :MiddleWare;
	public function session(params :Dynamic) :Void;
	public function router(routes :Dynamic->Void) :Void;
	public function Static (path :String, ?options :Dynamic) :MiddleWare;
	public function errorHandler (options :Dynamic) :MiddleWare;

	public function logger() : MiddleWare;

	inline public static function static_(exp : Express, path : String, ?option : Dynamic) : MiddleWare {
		var x = exp;
		var p = path;
		var o = option;
		return untyped __js__("x.static(p, o)");
	}
}
