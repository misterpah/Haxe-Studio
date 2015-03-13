var file_tree = (function(obj)
{
	var plugin_path = "../plugin/file_tree";
	obj.plugin_path = plugin_path;
	
	obj.init = function()
		{
		central.file_tree = {};
		support.loadJS(plugin_path+"/integrate.js");
		support.loadCSS(plugin_path+"/file_tree.css");
		};
		
	obj.destroy = function()
		{
		console.log('destroy');
		};
		
	return obj;
})(file_tree||{});
