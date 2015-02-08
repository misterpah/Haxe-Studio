var plugin_template = (function(obj)
{
	var plugin_path = "../plugin/plugin_template";
	obj.plugin_path = plugin_path;
	
	obj.init = function()
		{
		central.plugin_template = {};
		support.loadJS(plugin_path+"/integrate.js");
		};
		
	obj.destroy = function()
		{
		console.log('destroy');
		};
		
	return obj;
})(plugin_template||{});
