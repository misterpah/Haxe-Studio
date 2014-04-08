package sys.io;

import js.Node;

class File
{
	public static function append( path : String, ?binary : Bool ) : FileOutput
	{
		throw "Not implemented";
		return null;
	}
	
	public static function copy( src : String, dst : String ) : Void
	{
		var content = Node.fs.readFileSync(src);
		Node.fs.writeFileSync(dst, content);
	}
	
	public static function getBytes( path : String ) : haxe.io.Bytes
	{
		var o = Node.fs.openSync(path, "r");
		var s = Node.fs.fstatSync(o);
		var len = s.size, pos = 0;
		var bytes = haxe.io.Bytes.alloc(s.size);
		while( len > 0 ) {
			var r = Node.fs.readSync(o, bytes.getData(), pos, len, null);
			pos += r;
			len -= r;
		}
		Node.fs.closeSync(o);
		return bytes;
	}
	
	public static function getContent( path : String ) : String
	{
		// return Node.fs.readFileSync(path, NodeC.UTF8);
		return Node.fs.readFileSync(path);
	}
	
	// public static function read( path : String, ?binary : Bool ) : FileInput
	// {
	// 	throw "Not implemented";
	// 	return null;
	// }
	
	// public static function saveBytes( path : String, bytes : Bytes ) : Void
	// {
	// 	throw "Not implemented";
	// 	return null;
	// }
	
	public static function saveContent( path : String, content : String ) : Void
	{
		Node.fs.writeFileSync(path, content);
	}
	
	public static function write( path : String, ?binary : Bool ) : FileOutput
	{
		throw "Not implemented";
		return null;
	}
	
}
