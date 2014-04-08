package;
import jQuery.*;

extern class Message
{
	public function broadcast(message:String,caller_name:String):Void;
	public function listen(message:String,caller_name:String,action:Dynamic,parameter:Map<String,Dynamic>):Void;
	public function list_message():Array<String>;
}