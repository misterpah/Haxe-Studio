var lib_integration = (function(obj)
{

	function hook_event()
	{
	central.event.listen("FileMenu.newProject",function()
		{
		obj.openNewProjectWindow();
		});	
		
		
	central.event.listen("FileMenu.newClass",function()
		{
		obj.new_class();
		});			

	central.event.listen("openProject.complete",function()
		{
		if (support.node.fs.existsSync(central.project.projectFolder+"/haxestudio.config"))
			{
			configJson = JSON.parse(support.fileRead(central.project.projectFolder+"/haxestudio.config"));
			var sep = support.node.path.sep;
			var libraryJson = JSON.parse(support.fileRead(obj.plugin_path+sep+"template"+sep+configJson['base_library']+sep+"config.json"));
			//console.dir(libraryJson);
			libraryJson['name'] = configJson['base_library'];
			central.lib_integration.libConfig = libraryJson;
			}



		});
	central.event.listen("display_compiler.complete",function()
		{
		var waitingForLibConfig = setInterval(function()
			{
			if (central.lib_integration.libConfig != "")
				{
				clearInterval(waitingForLibConfig);
				if (typeof central.lib_integration.libConfig['supported_target'] != "undefined")
					{
					debug.info("Removing non-supported target for library "+central.lib_integration.libConfig['name']);
					$("#compileTarget option").each(function(){
						if (central.lib_integration.libConfig['supported_target'].indexOf($(this).html()) == -1)
							{
							$(this).remove();
							}
						});
					}						
				}
			},500);
		});
	}	

	
	function privateFunctionIntegrate()
		{
		if (config.lib_integration_config == undefined)
			{
			config.lib_integration_config = "sample configuration";
			}
			
		hook_event();
		//console.log("this is a private function test");
		//console.log("integration script complete");
		}
		
	obj.integrate = function()
		{
		central.lib_integration.libConfig = "";
		return privateFunctionIntegrate();
		}
		
		
		
		
	return obj;
})(lib_integration);
