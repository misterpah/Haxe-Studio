package nodejs.connect;

import js.Node;

extern class Utils
{
	public var brokenPause(default, null) : Bool;
	public function hasBody(req : NodeHttpClientReq) : Bool;
	public function mime(req : NodeHttpClientReq) : String;
	public function error(code : Int, msg : String) : Error;
	public function md5(str : String, ?encoding : String) : String;
	public function merge(a : {}, b : {}) : {};
	public function escape(html : String) : String;
	// TODO: DEPRECATED?
	public function sign(val : String, secret : String) : String;
	// TODO: DEPRECATED?
	public function unsign(val : String, secret : String) : Bool;
	public function parseSignedCookies(obj : {}, secret : String) : {}; // TODO: Dynamic<String> ?
	public function parseSignedCookie(str : String, secret : String) : String; // TODO: Dynamic<String> ?
	public function parseJSONCookies(obj : {}) : {}; // TODO: Dynamic ?
	public function parseJSONCookie(str : String, secret : String) : {}; // TODO: Dynamic ?
	public function pause() : Pause;
	public function removeContentHeaders(res : NodeHttpServerResp) : Void;
	public function conditionalGET(req : NodeHttpClientReq) : Bool;
	public function unauthorized(res : NodeHttpServerResp, realm : String) : Void;
	public function notModified(res : NodeHttpServerResp) : Void;
	// TODO: implement Stat
	//public function etag(stat : Stat) : String;
	public function parseCacheControl(str : String) : {}; // TODO: Dynamic ?
	public function parseUrl(req : NodeHttpClientReq) : {}; // TODO: Dynamic ?
	public function parseBytes(size : String) : Int; // TODO: Dynamic ?
}