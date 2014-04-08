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
	
	public function broadcast(message:String,caller_name:String)
	{
		var temp = new Array();
		temp.push(message);
		temp.push(caller_name);	
		broadcast_message.push(temp);
		new JQuery(js.Browser.document).triggerHandler(message);
	}
	
	public function listen(message:String,caller_name:String,action:Dynamic,parameter:Map<String,Dynamic>)
	{
		var temp = new Array();
		temp.push(message);	
		temp.push(caller_name);
		listen_message.push(temp);
		new JQuery(js.Browser.document).on(message,action,parameter);
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