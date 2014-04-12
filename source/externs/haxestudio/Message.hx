package;
import jQuery.*;

extern class Message
{
	public function broadcast(message:String,caller_name:String,parameter:Array<Dynamic>):Void;
	public function listen(message:String,caller_name:String,callback_function:Dynamic):Void;
	public function list_message():Array<String>;
	public function list_broadcast():Array<String>;
}
