package js.browser;

@:native("PUBNUB")
extern
class PubNub extends js.pubnub.PubNub {

  public static function init(Setup : Dynamic) : PubNub;

  private static function __init__() : Void untyped {
    #if !noEmbedJSPubNub
		haxe.macro.Tools.includeFile("js/browser/js/pubnub-3.1.min.js");
		#end    
	}
}
