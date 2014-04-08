package js.node;

import js.Node;

private typedef Binary = Dynamic;

/**
 * ...
 * @author sledorze
 */

@:native("Connection")
extern
class Connection {

  public function open () : Void;

  public function close () : Void;

  @:overload(function (command : Dynamic) : Void {})
  public function send (command : String) : Void;

  public function sendwithoutReconnect (command : Dynamic) : Void;


	public function new(host : String, port : Int, autoReconnect : Bool):Void;

	private static function __init__() : Void untyped {
	  Connection = Node.require('mongodb').Connection;
	}

  // from js.Node.NodeEventEmitter
  public function addListener(event:String,fn: NodeListener):Dynamic;
  public function on(event:String,fn:NodeListener):Dynamic;
  public function once(event:String,fn:NodeListener):Void;
  public function removeListener(event:String,listener:NodeListener):Void;
  public function removeAllListeners(event:String):Void;
  public function listeners(event:String):Array<NodeListener>;
  public function setMaxListeners(m:Int):Void;
  public function emit(event:String,?arg1:Dynamic,?arg2:Dynamic,?arg3:Dynamic):Void;
}


@:native("ServerPair")
extern
class ServerPair {
	public function new(leftServer : Server, rightServer : Server):Void;

  public var leftServer : Server;
  public var rightServer : Server;

  public var master : Dynamic;
  public var target : Dynamic;

  public var servers : Null<Array<Server>>;

  public var autoReconnect(default, null) : Void -> Bool;
  public var masterConnection(default, null) : Void -> Null<Connection>;

  public function setTarget(target : Dynamic) : Void;

	private static function __init__() : Void untyped {
	  ServerPair = Server.ServerPair; // well behaving solution??
	}
}

@:native("ServerCluster")
extern
class ServerCluster {
	public function new(servers : Array<Server>):Void;

  public var master : Dynamic;
  public var target : Dynamic;

  public var autoReconnect(default, null) : Void -> Bool;
  public var masterConnection(default, null) : Void -> Null<Connection>;

  public function setTarget(target : Dynamic) : Void;

	private static function __init__() : Void untyped {
	  ServerCluster = Server.ServerCluster; // well behaving solution??
	}
}

@:native("Server")
extern
class Server {

  /**
   * @param	callBack : Dynamic because not sure the callBack will be called by connection.. (from source code inspection - dynamic is a smell ^^)..
   */
  public function close (callBack : Dynamic) : Void;


  /**
  * ReplSetServers constructor provides master-slave functionality
  *
  * @param serverArr{Array of type Server}
  * @return constructor of ServerCluster
  *
  */
  public static function ReplSetServers (serverArr : Array<Server>) : ServerCluster;


	public function new(host : String, port : Int, options : Dynamic):Void;

	private static function __init__() : Void untyped {
	  Server = Node.require('mongodb').Server;
	}
}

