package js.node;
/**
 * ...
 * @author dionjw
 */
 
//https://github.com/Worlize/WebSocket-Node
//https://github.com/Worlize/WebSocket-Node/wiki/Documentation
//See http://lib.haxe.org/p/remoting for a demo 

import js.Node; // http://lib.haxe.org/p/nodejs

extern class NodeEventEmitter {// from js.Node.NodeEventEmitter
  public function addListener(event:String,fn: NodeListener):Dynamic;
  public function on(event:String,fn:NodeListener):Dynamic;
  public function once(event:String,fn:NodeListener):Void;
  public function removeListener(event:String,listener:NodeListener):Void;
  public function removeAllListeners(event:String):Void;
  public function listeners(event:String):Array<NodeListener>;
  public function setMaxListeners(m:Int):Void;
  public function emit(event:String,?arg1:Dynamic,?arg2:Dynamic,?arg3:Dynamic):Void;
}

typedef WebSocketMessage = {
	var type :String;
	@:optional
	var utf8Data :String;
	@:optional
	var binaryData :Dynamic;
}

typedef WebSocketClientConfig = {
	@:optional
	var webSocketVersion :Int;
	@:optional
	var closeTimeout :Int;
	//More not added yet, see:
	//https://github.com/Worlize/WebSocket-Node/wiki/Documentation
}

extern class WebSocketClient extends NodeEventEmitter {
    public function new(?clientConfig :WebSocketClientConfig):Void;
    public function connect(requestUrl :String, ?requestedProtocols :Array<String>, ?origin :String):Void;
}

typedef WebSocketConnection = {> NodeEventEmitter,
	var closeDescription :String;
	var closeReasonCode :Int;
	var socket :Dynamic;
	var protocol :String;
	var extensions :String;
	var remoteAddress :String;
	var webSocketVersion :String;
	var connected :Bool;
	function close() :Void;
	function drop(?reasonCode :Int, ?description :String) :Void;
	function sendUTF(data :String) :Void;
	function sendBytes(data :Dynamic) :Void;
	function send(data :Dynamic) :Void;
	function ping(data :Dynamic) :Void;
	function pong(data :Dynamic) :Void;
	function sendFrame(webSocketFrame :Dynamic) :Void;
}

typedef WebSocketRequest = {> NodeEventEmitter,
	var httpRequest :String;
	var host :String;
	var resource :String;
	var resourceURL :String;
	var remoteAddress :String;
	var webSocketVersion :Float;
	var origin :String;
	var requestedExtensions :Array<Dynamic>;
	var requestedProtocols :Array<String>;
	function accept(acceptedProtocol :String, allowedOrigin :String) :WebSocketConnection;
	function reject(?httpStatus :Int, ?reason :String) :Void;
}

typedef WebSocketServerConfig = {
	var httpServer :NodeHttpServer;
	@:optional
	var autoAcceptConnections :Bool;
}
extern class WebSocketServer extends NodeEventEmitter {
    public function new(?serverConfigArr :Array<WebSocketServerConfig>):Void;
    public function mount(config :WebSocketServerConfig) :Void;
    public function unmount() :Void;
    public function closeAllConnections() :Void;
    public function shutDown() :Void;
    public var connections :Array<WebSocketConnection>;
}
