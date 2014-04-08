package sys;

/**
	File informations, as given by [sys.FileSystem.stat]
**/
typedef FileStat = {
	/** the user group id for the file **/
	var gid : Int;
	/** the user id for the file **/
	var uid : Int;
	/** the last access time for the file (when enabled by the file system) **/
	var atime : Date;
	/** the last modification time for the file **/
	var mtime : Date;
	/** the creation time for the file **/
	var ctime : Date;
	/** the size of the file **/
	var size : Int;
	var dev : Int;
	var ino : Int;
	var nlink : Int;
	var rdev : Int;
	var mode : Int;
}
