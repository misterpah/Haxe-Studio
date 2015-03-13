var project = (function(obj)
{
	var plugin_path = "../plugin/project";
	obj.plugin_path = plugin_path;
	
	obj.init = function()
		{
		central.project = {};
		//support.loadJS(plugin_path+"/new_project.js");
		support.loadJS(plugin_path+"/open_project.js");
		support.loadJS(plugin_path+"/project_tree.js");
		support.loadJS(plugin_path+"/compile.ui.js");
		
		support.loadJS(plugin_path+"/compile.js");
		
		};
		
	obj.destroy = function()
		{
		console.log('destroy');
		};
		
	return obj;
})(project||{});
