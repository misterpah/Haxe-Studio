package ;

@:keep @:expose class FileObject
{
	private var file_stack:Array<Dynamic>;
	// array[0] = path
	// array[1] = content
	// array[2] = className

	public function new()
		{
		file_stack = new Array<Dynamic>();
		}


	public function add(path:String,content:String,className:String)
		{
		var a = new Array();
		path = Utils.encodeString(path);
		a[0] = path;
		a[1] = content;
		a[2] = className;
		return file_stack.push(a);
		}
	

	public function find(path:String):Array<String>
		{
		path = Utils.encodeString(path);
		if (file_stack.length > 0)
			{
			var position = 0;
			for (each in file_stack)
				{
				if (each[0] == path)
					{
					return each;
					}
				else
					{
					position += 1;	
					}			
				}
			return ["not found"];
			}
		else
			{
			return ["null"];
			}
		}

	public function update_content(path:String,new_content:String)
		{
		path = StringTools.urlEncode(path);
		if (file_stack.length > 0)
			{			
			var position = 0;
			for (each in file_stack)
				{
				if (each[0] == path)
					{
					file_stack[position][1] = new_content;
					}
				else
					{
					position += 1;
					}			
				}
			}
		}

	public function remove(path:String)
		{
		path = StringTools.urlEncode(path);
		if (file_stack.length > 0)
			{			
			var position = 0;
			for (each in file_stack)
				{
				if (each[0] == path)
					{
					//return each;
					//each[1] = new_content;
					file_stack.splice(position,1);
					//[position][1] = new_content;
					}
				else
					{
					position += 1;
					}			
				}
			}
		}

}