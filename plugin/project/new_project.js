var project = (function(obj)
{
	var _c = central;
	var _cp = central.project;

	obj.new_project_window = "";
	
	
	obj.new_project = function()
		{
		obj.new_project_window = window.open('../plugin/project/new_project.html');
		

		
		//support.node.fs.mkdirSync(folderName+support.node.path.sep+projectName);
		}
		
	return obj;
})(project);
