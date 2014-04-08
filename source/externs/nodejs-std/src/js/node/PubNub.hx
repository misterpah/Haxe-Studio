package js.node;

@:native("PubNub")
extern
class PubNub extends js.pubnub.PubNub {

  public static function init(Setup : Dynamic) : PubNub;
    
  private static function __init__() : Void untyped {
    init = Node.require('./pubnub.js').init;
	}
}