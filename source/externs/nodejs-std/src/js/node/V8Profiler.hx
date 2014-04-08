package js.node;

typedef V8Profiler = {
	function startProfiling(key :String) :Void;
	function stopProfiling(key :String) :Void;
	function takeSnapshot(key :String) :Void;
}
