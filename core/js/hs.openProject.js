(function(){
	central.event.listen("FileMenu.openProject",function()
		{
		var tempFunc = function(){
			central.event.broadcast("fileActiveChanged","hs.openProject.js","")
			;}
		support.watchOnce(central.filesystem,'fileActive',tempFunc);
		filesystem.file_dialog();
		});
		
	central.event.listenFrom("fileActiveChanged","hs.openProject.js",function()
		{
		//changes detected!
		var filename = central.filesystem.fileActive;
		project.open_project(filename);
		
		
		var tempFunc = function(){
			central.event.broadcast("projectParameterChanged","hs.openProject.js","")
			;}		
		support.watchOnce(central.project,"projectParameter",tempFunc);
		});		
		
	central.event.listenFrom("projectParameterChanged","hs.openProject.js",function()
		{
		central.project.projectOpened = true;
		project.create_project_tree(central.project.projectParameter);
		central.event.broadcast("openProject.complete","hs.openProject.js","");
		
		});		
})(hs);
