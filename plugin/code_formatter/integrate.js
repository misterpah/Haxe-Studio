var code_formatter = (function(obj)
{
	var _c = central.filesystem;
	
	function privateFunctionIntegrate()
		{
		if (config.code_formatter_config == undefined)
			{
			config.code_formatter_config = "sample configuration";
			}

		$(".Plugin_dropdown ul").append(support.dropdownMenuItem("Prettify code","code_formatter:prettify_this_code",""));
		}
		
	obj.integrate = function()
		{
		return privateFunctionIntegrate();
		}
		
	central.event.listen("code_formatter:prettify_this_code",function(p1,p2)
		{
		if (typeof editor == "undefined")
			{
			debug.error('Fail to prettify code! Plugin "code_formatter" require plugin "editor"');
			return;
			}
		var input = editor._cm.doc.getValue();
		if (input == "")
			{
			debug.error("Are you trying to prettify a blank file ?");
			return;
			}
			
		var extension = central.filesystem.fileActive.split(support.node.path.sep).pop().endsWith(".hx")
		if (extension != true)
			{
			debug.error("this plugin only prettify Haxe code");
			return;
			}
			
		support.exec([
			"cd %CD% %QUOTE%"+support.node.path.resolve(obj.plugin_path)+"%QUOTE%",
			"neko prettify.n "+central.filesystem.fileActive
			],function(p1,p2,p3){
			if (p1 == "null" || p1 == null) { editor._cm.doc.setValue(p2); return;}
			//if (p1 && p1.code){debug.error("<b>[ERR]</b><br/>" + p1.message.split("\n")[1]  ); return;}
			//if (p1 && p1.indexOf("Error") == 0) { debug.error(p1); }
			if (p1 != "") { debug.debug("p1:"+p1); }
			if (p2 != "") { debug.debug("p2:"+p2); }
			if (p3 != "") { debug.debug("p3:"+p3); }
			});			
			
		//console.log(p1);
		//console.log(p2);
		//console.log("code formatter !");
		/*
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
		*/
		});
		
	return obj;
})(code_formatter);
