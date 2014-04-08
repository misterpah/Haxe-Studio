package js.node;

/**
 * ...
 * @author sledorze
 */

typedef SocketIo = {
	function listen(?server : Dynamic, ?options : Dynamic, ?fn : Dynamic) : SocketIoManager;
}

typedef NodeListener = Dynamic -> Void;

extern
class SocketNamespace {

//  public static function SocketNamespace (socket : Dynamic, name : String) : Void;
  public function send(data : Dynamic, fn : Dynamic) : SocketNamespace;
  public function disconnect () : SocketNamespace;

  // from js.Node.NodeEventEmitter
  public function addListener(event:String,fn:NodeListener):Dynamic;
  public function on(event:String,fn:NodeListener):Dynamic;
  public function once(event:String,fn:NodeListener):Void;
  public function removeListener(event:String,listener:NodeListener):Void;
  public function removeAllListeners(event:String):Void;
  public function listeners(event:String):Array<NodeListener>;
  public function setMaxListeners(m:Int):Void;

	@:overload(function(name : String) : SocketNamespace{ } )
  public function emit(event:String,?arg1:Dynamic,?arg2:Dynamic,?arg3:Dynamic):Void;
}

typedef SocketIoManager = {

	var store(default, null) : Dynamic;
	var log(default, null) : Dynamic;
	@:native("static") var static_(default, null) : Dynamic;

	function get(key : Dynamic) : Dynamic;
	function set(key : Dynamic, value : Dynamic) : SocketIoManager;
	function enable(key : Dynamic) : SocketIoManager;
	function disable(key : Dynamic) : SocketIoManager;

	function enabled(key : Dynamic) : Bool;
	function disabled(key : Dynamic) : Bool;

	@:overload(function(fn : Void -> Void):SocketIoManager {})
	@:overload(function(fn : SocketIoManager -> Void):SocketIoManager {})
	function configure(env : Dynamic, fn : SocketIoManager -> Void) : SocketIoManager;

	function of(nsp : Dynamic) : SocketNamespace;
}
