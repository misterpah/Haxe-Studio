package sys;

import js.Node;

using StringTools;

#if !macro
/**
	This class allows you to get informations about the files and directories.
**/
class FileSystem 
{
	/**
		Tells if the given file or directory exists.
	**/
	inline public static function exists( path : String ) : Bool
	{
		return Node.fs.existsSync(path);
	}

	/**
		Rename the corresponding file or directory, allow to move it accross directories as well.
	**/
	inline public static function rename( path : String, newpath : String ) : Void
	{
		Node.fs.renameSync(path, newpath);
	}

	/**
		Returns informations for the given file/directory.
	**/
	inline public static function stat( path : String ) : NodeStat
	{
		return Node.fs.statSync(path);
	}

	/**
		Returns the full path for the given path which is relative to the current working directory.
	**/
	inline public static function fullPath( relpath : String ) : String
	{
		return Node.path.resolve(null, relpath);
	}

	/**
		Tells if the given path is a directory. Throw an exception if it does not exists or is not accesible.
	**/
	// inline 
	public static function isDirectory( path : String ) : Bool
	{
		#if debug
			if (!exists(path)) {
				throw "Path doesn't exist: " +path;
			}
		#end
		if (Node.fs.statSync(path).isSymbolicLink()) {
			return false;
		} else {
			return Node.fs.statSync(path).isDirectory();
		}
	}

	/**
		Create the given directory. Not recursive : the parent directory must exists.
	**/
	inline public static function createDirectory( path : String ) : Void
	{
		Node.fs.mkdirSync(path);
	}

	/**
		Delete a given file.
	**/
	inline public static function deleteFile( path : String ) : Void
	{
		Node.fs.unlinkSync(path);
	}
	/**
		Delete a given directory.
	**/
	inline public static function deleteDirectory( path : String ) : Void
	{
		Node.fs.rmdirSync(path);
	}

	/**
		Read all the files/directories stored into the given directory.
	**/
	inline public static function readDirectory( path : String ) : Array<String>
	{
		return Node.fs.readdirSync(path);
	}
	
	inline public static function signature (path) :String
	{
		var shasum = Node.crypto.createHash('md5');
		shasum.update(Node.fs.readFileSync(path));
		return shasum.digest(NodeC.HEX);
	}
	
	inline public static function join(?p1:String, ?p2:String, ?p3:String) :String
	{
		//Node.js throws an exception 
		//https://github.com/yahoo/mojito/pull/1028
		return Node.path.join(p1 == null ? "" : p1, p2 == null ? "" : p2, p3 == null ? "" : p3);
	}
	
	/**
		Read all the files stored into the given directory.
	**/
	public static function readRecursive( path : String, ?filter :String->Bool) : Array<String>
	{
		var files = readRecursiveInternal(path, null, filter);
		return  files == null ? [] :files;
	}
	
	static function readRecursiveInternal (root :String, ?dir :String = "", ?filter :String->Bool)
	{
		if (root == null) {
			return null;
		}
		
		var dirPath = join(root, dir);
		
		if (!(exists(dirPath) && isDirectory(dirPath))) {
			return null;
		}
		
		var result = [];
		
		for (file in readDirectory(dirPath)) {
			var fullPath = join(dirPath, file);
			var relPath = if (dir == "") file else join(dir, file);
			if (exists(fullPath)) {
				if (isDirectory(fullPath)) {
					if (fullPath.fastCodeAt(fullPath.length - 1) == "/".code) {
						// Trim off the trailing slash. On Windows, FileSystem.exists() doesn't find directories
						// with trailing slashes?
						fullPath = fullPath.substr(0, -1);
					}
					
					if (filter != null && !filter(relPath)) {
						continue;
					}
					
					var recursedResults :Array<String> = readRecursiveInternal(root, relPath, filter);
					if (recursedResults != null && recursedResults.length > 0) {
						result = result.concat(recursedResults);
					}
				} else {
					if (filter == null || filter(relPath)) {
						result.push(relPath);
					}
				}
			}
			
		}
		return result;
	}
}
#else
class FileSystem 
{}
#end
