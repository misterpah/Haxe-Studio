(function(){
	central.event.listen("FileMenu.openProject",function()
		{
		filesystem.file_dialog()
			.then(function(filename)
				{
				return project.open_project(filename);
				})
			.then(function(data)
				{
				if (data != "fail")
					{
					central.project.projectOpened = true;
					central.event.broadcast("openProject.complete","hs.openProject.js","");
					}
				})
		});
		
	central.event.listen("FileMenu.openProjectDirect",function(p1)
		{
		Q.fcall(function()
				{
				return project.open_project(p1['message']);
				})
			.then(function(data)
				{
				if (data != "fail")
					{
					central.project.projectOpened = true;
					central.event.broadcast("openProject.complete","hs.openProject.js","");
					}
				})
		});		
		
})(hs);
