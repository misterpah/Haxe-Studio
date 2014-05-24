package plugin.misterpah;

extern class FileAccess
{
	/*
	available DOM message/event on js.Browser.document
	---------------------------------------------------
	plugin.misterpah.FileAccess.new_file().complete
	plugin.misterpah.FileAccess.open_file().complete
	plugin.misterpah.FileAccess.save_file().complete
	plugin.misterpah.FileAccess.close_file().complete
	*/

	static public function main():Void;
	static public function new_file():Void;
	static public function open_file():Void;
	static public function save_file():Void;
	static public function close_file():Void;
}