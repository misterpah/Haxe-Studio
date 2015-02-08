var plugin_template = (function(obj)
{
	var _c = central.filesystem;
	
	function privateFunctionIntegrate()
		{
		console.log("this is a private function test");
		console.log("integration script complete");
		}
		
	obj.integrate = function()
		{
		return privateFunctionIntegrate();
		}
		
	return obj;
})(plugin_template);
