var lib_integration = (function(obj)
{

	function hook_event()
	{
	central.event.listen("FileMenu.newProject",function()
		{
		obj.openNewProjectWindow();
		});	
		
		
	central.event.listen("FileMenu.newFile",function()
		{
		obj.new_class();
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
