package js.node;

import js.Node;

typedef ForeverChild = {> EventEmitter,
}

typedef Forever = {
	function load (config :Dynamic) :Void;
	function start (file :String, options :Dynamic) :Void;
	function startDaemon (file :String, options :Dynamic) :Void;
	function stop (index :Int) :Void;
	function list (?format :Bool, ?procs :Dynamic) :Void;
	function cleanUp (?cleanLogs :Bool, ?allowManager :Bool) :EventEmitter;
	function getAllProcesses (?findDead :Bool) :Array<ProcessData>;
}

typedef ProcessData = {
	var options :Array<Dynamic>;
	var file :String;
	var sourceDir :String;
	//Others
}

class ForeverUtil 
{
	// public static function create( script :String, options :Dynamic) : ForeverChild 
	// {
	// 	var forever = Node.require('forever');
	// 	trace(Reflect.fields(forever));
	// 	var scriptName = script;
	// 	return untyped new forever.Forever(script, options);
	// }
}
