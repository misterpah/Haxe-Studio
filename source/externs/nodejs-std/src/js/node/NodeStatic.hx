package js.node;
//https://npmjs.org/package/node-static

import js.Node;
typedef  StaticServer = {
	function serve(req :NodeHttpServerReq, res :NodeHttpServerResp, ?handler :Dynamic->Dynamic->Void) :Void;
	function serveFile(filePath :String, httpStatus :Int, something :Dynamic, req :NodeHttpServerReq, res :NodeHttpServerResp, ?handler :Dynamic->Dynamic->Void) :Void;
	var root :String;
}

class NodeStatic
{
	public static function Server (pathToServe :String) :StaticServer
	{
		var watchedFolder = pathToServe;
		var node_static = untyped __js__("require('node-static')");
		return untyped __js__("new node_static.Server(watchedFolder)");
	}
}
