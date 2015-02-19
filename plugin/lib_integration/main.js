var lib_integration = (function(obj)
{
	var plugin_path = "../plugin/lib_integration";
	obj.plugin_path = plugin_path;
	
	obj.init = function()
		{
		central.lib_integration = {};
		support.loadJS(plugin_path+"/integrate.js");
		support.loadJS(plugin_path+"/new_project.js");
		};
		
	obj.destroy = function()
		{
		console.log('destroy');
		};
		
	return obj;
})(lib_integration||{});
