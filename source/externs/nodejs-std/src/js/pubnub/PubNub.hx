package js.pubnub;

/**
 * ...
 * @author sledorze
 */

typedef Setup = {
  publish_key : String,
  subscribe_key : String,
  secret_key  : Bool,
  ssl : String,
  origin : String, //'pubsub.pubnub.com'
}
 
/*  'callback is a reserved word'*/
typedef HistoryArgs = {
  channel  : String, // 'my_chat_channel',
  limit    : Int, // Int
  callBack : Array<String> -> Void //function(messages) { console.log(messages) }
}


typedef PublishArgs = {
  channel : String, //'my_chat_channel',
  message : String //'hello!'
}

/* 'callback is a reserved word'*/
typedef PublishArgsWithCallback = {
  channel : String, //'my_chat_channel',
  message : String, //'hello!'
  callBack : String -> Void
}

@:native("PubNub")
extern
class PubNub {

  /**
  *    PUBNUB.history({
  *        channel  : 'my_chat_channel',
  *        limit    : 100,
  *        callBack : function(messages) { console.log(messages) }
  *    });
  */
  public function history(args : HistoryArgs) : Void;
  
  /**
  *    PUBNUB.time(function(time){ console.log(time) });
  */
  public function time(cb : String -> Void) : Void;

  /**
  *    PUBNUB.publish({
  *        channel : 'my_chat_channel',
  *        message : 'hello!'
  *    }, callback); // String  or  [ 0, 'Disconnected' ]
  */
  @:overload(function publish(args : PublishArgsWithCallback) : Void {})
  @:overload(function publish(args : PublishArgs) : Void {})
  public function publish(args : PublishArgs, cb : String -> Void) : Void;
  

  /**
  *    PUBNUB.unsubscribe({ channel : 'my_chat' });
  */
  public function unsubscribe(args : { channel : String } ) : Void;
  
  /**
  *    PUBNUB.subscribe({
  *        channel  : 'my_chat'
  *        callBack : function(message) { console.log(message) }
  *    });
  */
  public function subscribe (args : { channel : String, callBack : String -> Void, error : Void -> Void } ) : Void;
}