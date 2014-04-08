package ;

@:keep @:expose extern class FileObject
{	
	private var file_stack:Array<Dynamic>;
	
	public function new():Void;	
	public function find(path:String):Array<String>;
	public function update_content(path:String,new_content:String):Void;
	public function remove(path:String):Void;
	public function add(path:String,content:String,className:String):Array<String>;	
}