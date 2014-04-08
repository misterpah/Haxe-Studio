package nodejs;

import nodejs.connect.*;
import js.Node;

extern class Connect extends Middlewares
{
	public var version(default, null) : String;
	public var mime(default, null) : Mime;
	public var middleware(default, null) : Middlewares;
	public var utils(default, null) : Utils;
	public function createServer(?mid1 : Middleware, ?mid2 : Middleware, ?mid3 : Middleware, ?mid4 : Middleware, ?mid5 : Middleware, ?mid6 : Middleware) : App;
	public static var instance(get, null) : Connect;
	static inline function get_instance() : Connect return js.Node.require("connect");
}

/*
typedef ConnectHttpServerRequest = {>NodeHttpServerReq

}

typedef ConnectHttpServerResponse = {>NodeHttpServerResp

}
*/