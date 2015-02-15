var code_formatter = (function(obj)
{
	var plugin_path = "../plugin/code_formatter";
	obj.plugin_path = plugin_path;
	
	obj.init = function()
		{
		central.code_formatter = {};
		support.loadJS(plugin_path+"/integrate.js");
		};
		
	obj.destroy = function()
		{
		console.log('destroy');
		};
		
	return obj;
})(code_formatter||{});
