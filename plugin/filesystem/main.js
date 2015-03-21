var filesystem = (function(obj)
{
	var plugin_path = "../plugin/filesystem";
	obj.plugin_path = plugin_path;
	obj.services = {};
	
	
	obj.init = function()
		{
		central.filesystem = {};
		central.filesystem.fileActive = "";
		central.filesystem.fileStack = {};
		support.loadJS(plugin_path+"/file_dialog.js");
		support.loadJS(plugin_path+"/file_dialog_saveAs.js");
		
		support.loadJS(plugin_path+"/folder_dialog.js");
		support.loadJS(plugin_path+"/close_file.js");
		support.loadJS(plugin_path+"/read_file_and_put_in_stack.js");
		support.loadJS(plugin_path+"/read_stack_and_put_in_file.js");
		
		support.loadJS(plugin_path+"/integrate.js");
		
		
		
		};
		
	obj.destroy = function()
		{
		console.log('destroy');
		};
		
	return obj;
})(filesystem||{});
