var haxe_server = (function(obj)
{
	var _c = central;
	var _chs = central.haxe_server;

	obj.haxeCompletionResult = "";
	
	function getHaxeCompletion(port,position,file)
		{
		obj.haxeCompletionResult = "";
		var waiting = true;
		support.exec([
			"cd %CD% %QUOTE%"+central.project.projectFolder+"%QUOTE%",
			"haxe --connect "+port+" "+central.project.projectParameter+" --display %QUOTE%"+file+"%QUOTE%@"+position
			],function(p1,p2,p3){
				//console.dir(p1);
				//console.dir(p2);
				//console.dir(p3);
				if (p1 == null) // no error
					{
					waiting = false;
					obj.haxeCompletionResult = p3;
					central.event.broadcast("haxeCompletionComplete","haxe_completion.js","");
					}
			});
		}
		
	obj.haxe_completion = function(position,filename)
		{
		getHaxeCompletion(config.haxe_port,position,filename);
		}		
	return obj;
})(haxe_server);
