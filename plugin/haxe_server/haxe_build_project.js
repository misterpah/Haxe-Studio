var haxe_server = (function(obj)
{
	var _c = central;
	var _chs = central.haxe_server;

	obj.haxeCompletionResult = "";
	
	function buildProjectToFindError(buildTarget)
		{
		obj.haxeCompletionResult = "";
		var waiting = true;
		support.exec([
			"cd %CD% %QUOTE%"+central.project.projectFolder+"%QUOTE%",
			"lime build "+buildTarget
			],function(p1,p2,p3){
			if (p1 == "null" || p1 == null) { debug.info("<b>[NO ERR]</b>"); return;}
			if (p1 && p1.code){debug.error("<b>[ERR]</b><br/>" + p1.message.split("\n")[1]  ); return;}
			//if (p1 && p1.indexOf("Error") == 0) { debug.error(p1); }
			if (p1 != "") { debug.debug("p1:"+p1); }
			if (p2 != "") { debug.debug("p2:"+p2); }
			if (p3 != "") { debug.debug("p3:"+p3); }
			});
		}
		
	obj.haxe_build_project = function()
		{
		var compile_target;
		if ($("#compileTarget").val() != undefined)
			{
				compile_target = $("#compileTarget").val();
			}
		else
			{
				compile_target = config.defaultBuild;
			}
		buildProjectToFindError(compile_target);
		}		
	return obj;
})(haxe_server);
