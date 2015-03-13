var filesystem = (function(obj)
{
	var plugin_path = "../plugin/filesystem";
	obj.plugin_path = plugin_path;
	obj.services = {};
	
	
	obj.integrate = function()
		{
		central.event.listen("filesystem.closeFile",function()
			{
			if ($("#editor_tab div").length == 0)
				{
				$("#editor_editor").css("display","none");
				}		
			});
		};
		
	return obj;
})(filesystem||{});		
