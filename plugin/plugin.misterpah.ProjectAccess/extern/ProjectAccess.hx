package plugin.misterpah;

extern class FileAccess
{
	/*
	message : broadcast
	---------------------------------------------------
	plugin.misterpah.ProjectAccess,open_project().complete
	plugin.misterpah.ProjectAccess,close_project().complete
	*/
	
	static public function main():Void;
	static public function open_project():Void;
	static public function close_project(event,path:String):Void;
}