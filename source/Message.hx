package;
import jQuery.*;

class Message
{
	private var broadcast_message:Array<Array<String>>;
	private var listen_message:Array<Array<String>>;
	
	public function new()
	{
		broadcast_message = new Array();
		listen_message = new Array();
	}
	
	public function broadcast(message:String,caller_name:String,parameter:Array<Dynamic>)
	{
		var temp = new Array();
		temp.push(message);
		temp.push(caller_name);	
		broadcast_message.push(temp);
		untyped EventBus.dispatch(message,caller_name,parameter);
	}
	
	public function listen(message:String,caller_name:String,callback_function:Dynamic)
	{
		var temp = new Array();
		temp.push(message);	
		temp.push(caller_name);
		listen_message.push(temp);
		untyped EventBus.addEventListener(message,callback_function, caller_name);
	}
	
	public function list_broadcast()
	{
		return broadcast_message;
	}

	public function list_listen()
	{
		return listen_message;
	}	
}
