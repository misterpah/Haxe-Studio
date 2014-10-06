(function(){
	central.event.listen("FileMenu.openFile",function()
		{
		var tempFunc = function(){
			central.event.broadcast("fileActiveChanged","hs.openFile.js","")
			;}
		support.watchOnce(central.filesystem,'fileActive',tempFunc);
		filesystem.file_dialog();
		});
		
	central.event.listenFrom("fileActiveChanged","hs.openFile.js",function()
		{
		var filename = central.filesystem.fileActive;
		
		if (central.filesystem.fileStack[encodeURIComponent(central.filesystem.fileActive)] != undefined)
			{
			console.log('file already opened!');
			central.event.broadcast("fileOpened","hs.openFile.js","");
			}
		
		if( support.isFile(filename) )
			{
			var tempFunc = function()
				{
				console.log("changed!");
				central.event.broadcast("fileOpened","hs.openFile.js","");
				}			
			//support.watchOnce(central.filesystem.fileStack,encodeURIComponent(filename),tempFunc);
			filesystem.readFile(filename);
			
			// waiting for file to read
			var loop = true;
			while(loop)
				{
				if (central.filesystem.fileStack[encodeURIComponent(filename)] != undefined)
					{
					loop = false;
					}
				}
			central.event.broadcast("fileOpened","hs.openFile.js","");
			}
		});		
		
		
	central.event.listenFrom("fileOpened","hs.openFile.js",function()
		{
		if (editor.find_tab(encodeURIComponent(central.filesystem.fileActive)) == 0)
			{
			editor.create_tab(central.filesystem.fileActive);
			}
		editor.setValue(central.filesystem.fileStack[encodeURIComponent(central.filesystem.fileActive)].content);
		editor.show_tab(encodeURIComponent(central.filesystem.fileActive));
		editor.show_inspector();
		central.event.broadcast("openFile.complete","hs.openFile.js","");
		});		
	
	
	central.event.listen("FileMenu.openFileDirectly",function(data)
		{
		//console.dir(data);
		central.filesystem.fileActive = decodeURIComponent(data.message);
		central.event.broadcast("fileActiveChanged","hs.openFile.js","");
		});
})(hs);
