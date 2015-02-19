var lib_integration = (function(obj)
{
	var _c = central.filesystem;


	function hook_event()
	{
	central.event.listen("FileMenu.newProject",function()
		{
		obj.openNewProjectWindow();
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
		return privateFunctionIntegrate();
		}
		
		
		
		
	return obj;
})(lib_integration);
