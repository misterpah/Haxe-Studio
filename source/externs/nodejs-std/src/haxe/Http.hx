/*
 * Copyright (c) 2005, The haXe Project Contributors
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *   - Redistributions of source code must retain the above copyright
 *     notice, this list of conditions and the following disclaimer.
 *   - Redistributions in binary form must reproduce the above copyright
 *     notice, this list of conditions and the following disclaimer in the
 *     documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE HAXE PROJECT CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE HAXE PROJECT CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
 * LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
 * OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH
 * DAMAGE.
 */
package haxe;

import js.Node;

class Http {
	public var url : String;
	public var async : Bool;
	var postData : String;
	#if haxe3
	var headers : Map<String, String>;
	var params : Map<String, String>;
	#else
	var headers : Hash<String>;
	var params : Hash<String>;
	#end
	

	/**
	 * @param	url
	 */
	public function new( url : String ) {
		this.url = url;
		#if haxe3
		headers = new Map();
		params = new Map();
		#else
		headers = new Hash();
		params = new Hash();
		#end
		async = true; //Ignored, Node.js doing sync requests???
	}

	public function setHeader( header : String, value : String ) {
		headers.set(header,value);
	}

	public function setParameter( param : String, value : String ) {
		params.set(param,value);
	}

	public function setPostData( data : String ) {
		postData = data;
	}

	public function request( post : Bool ) : Void {
		var me = this,
			options : Dynamic = {},
			uri = postData,
			is_secure = url.substring(0, 8) == "https://";
		
		if (url.substring(0, 7) == "http://") {
			url = url.substr(7);
		} else if(is_secure) {
			url = url.substr(8);
		}
		
		var urlTokens = url.split("/");
		var host = urlTokens.shift();
		options.path = urlTokens.length > 0 ? "/" + urlTokens.join("/") : "/";
		
		var hostTokens = host.split(":");
		if (hostTokens != null && hostTokens.length > 1) {
			options.host = hostTokens[0];
			options.port = Std.parseInt(hostTokens[1]);
		} else {
			options.host = host;
		}
		
		if( uri != null ) {
			post = true;
		} else {
			for( p in params.keys() ) {
				if( uri == null ) {
					uri = "";
				} else {
					uri += "&";
				}
				uri += StringTools.urlEncode(p)+"="+StringTools.urlEncode(params.get(p));
			}
		}
		
		if (uri != null) {
			var question = url.split("?").length <= 1;
			options.path += (question ? "?" : "&") + uri;
			uri = null;
		}
		
		options.method = post ? 'POST' : 'GET';
		
		if( headers.get("Content-Type") == null && post && postData == null ) {
			headers.set("Content-Type", "application/x-www-form-urlencoded");
		}
		
		if (headers.iterator().hasNext()) {
			if (options.headers == null) {
				options.headers = {};
			}
			for( h in headers.keys()) {
				Reflect.setField(options.headers, h, headers.get(h));
			}
		}
			
		var service : { function request(options:Dynamic,res:NodeHttpClientResp->Void):NodeHttpClientReq; } = null;
		if(is_secure)
			service = Node.https;
		else
			service = Node.http;

		var request : NodeHttpClientReq = service.request(options, function(response :NodeHttpClientResp) {
			var responseData = '';
			response.setEncoding('utf8');
			var s = try response.statusCode catch( e : Dynamic ) 0;
				
			if( response.statusCode != null ) {
				me.onStatus(response.statusCode);
			}
			if( response.statusCode != null && response.statusCode >= 200 && response.statusCode < 400 ) {

			} else {
				switch( s ) {
					case 0:
						me.onError("Failed to connect or resolve host");
					case 12029:
						me.onError("Failed to connect to host");
					case 12007:
						me.onError("Unknown host");
					default:
						me.onError("Http Error #"+response.statusCode);
				}
			}
				
			response.on('data', function(chunk :String) {
				responseData += chunk;
			});
			
			response.once('end', function() {
				response.removeAllListeners("data");
				response.removeAllListeners("end");
				
				if (responseData != null) {
					onData(responseData);
				}
				responseData = null;
			});
			response.once('close', function() {
				if (responseData != null) {
					onData(responseData);
				}
				responseData = null;
			});
			
			response.once('error', function(error :Dynamic) {
				me.onError("Http Response Error: " + error);
			});
		});

		request.on('error', function(error :Dynamic) {
			me.onError("Http Request Error: " + error);
		});
			
		request.end();
	}

	public dynamic function onData( data : String ) {
	}

	public dynamic function onError( msg : String ) {
	}

	public dynamic function onStatus( status : Int ) {
	}

	public static function requestUrl( url : String ) : String {
		var h = new Http(url);
		h.async = false;
		var r = null;
		h.onData = function(d){
			r = d;
		}
		h.onError = function(e){
			throw e;
		}
		h.request(false);
		return r;
	}
}
