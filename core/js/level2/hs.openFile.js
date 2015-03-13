(function(){
	central.event.listen("FileMenu.openFile",function()
		{
		filesystem.file_dialog() 
			.then(function(filename)  // check if file already opened
				{
				if (central.filesystem.fileStack[encodeURIComponent(filename)] != undefined)
					{
					return ["isOpen",filename];
					}
				else
					{
					return ["notOpen",filename];
					}
				})
				
			.then( function(data) // if file not opened, open it
				{
				if ( data[0] == "notOpen" && support.isFile(data[1]) )
					{
					var filename = data[1];
					filesystem.readFile(filename);
					return ["opened",filename];
					}
				}) // end then
				
			.then(function(data) // if successful open, apply to editor
				{
				central.filesystem.fileActive = data[1];
				if (editor.find_tab(encodeURIComponent(central.filesystem.fileActive)) == 0)
					{
					editor.create_tab(central.filesystem.fileActive);
					var doc = CodeMirror.Doc(central.filesystem.fileStack[encodeURIComponent(central.filesystem.fileActive)].content,"haxe");
					central.filesystem.fileStack[encodeURIComponent(central.filesystem.fileActive)].doc = doc
					}
				if ($("#editor_editor").css("display") == "none")
					{
					$("#editor_editor").css("display","block");
					}
				editor.setDoc(central.filesystem.fileStack[encodeURIComponent(central.filesystem.fileActive)].doc)
				editor.show_tab(encodeURIComponent(central.filesystem.fileActive));
				editor.show_inspector();
				central.event.broadcast("openFile.complete","hs.openFile.js","");
				}); // end then
		});
	
	
	central.event.listen("FileMenu.openFileDirectly",function(data)
		{
		Q.fcall(function()
			{
			return decodeURIComponent(data.message);
			})
			.then(function(filename)
				{
				if (central.filesystem.fileStack[encodeURIComponent(filename)] != undefined)
					{
					return ["isOpen",filename];
					}
				else
					{
					return ["notOpen",filename];
					}
				})
				
			.then( function(data)
				{
				if ( data[0] == "notOpen" && support.isFile(data[1]) )
					{
					var filename = data[1];
					filesystem.readFile(filename);
					return ["opened",filename];
					}
				else if (data[0] == "isOpen")
					{
					var filename = data[1];
					return ["opened",filename];
					}
				}) // end then
				
			.then(function(data)
				{
				
				central.filesystem.fileActive = data[1];
				if (editor.find_tab(encodeURIComponent(central.filesystem.fileActive)) == 0)
					{
					editor.create_tab(central.filesystem.fileActive);
					var doc = CodeMirror.Doc(central.filesystem.fileStack[encodeURIComponent(central.filesystem.fileActive)].content,"haxe");
					central.filesystem.fileStack[encodeURIComponent(central.filesystem.fileActive)].doc = doc
					}
				if ($("#editor_editor").css("display") == "none")
					{
					$("#editor_editor").css("display","block");
					}					
				editor.setDoc(central.filesystem.fileStack[encodeURIComponent(central.filesystem.fileActive)].doc)
				editor.show_tab(encodeURIComponent(central.filesystem.fileActive));
				editor.show_inspector();
				central.event.broadcast("openFile.complete","hs.openFile.js","");
				});
		});
})(hs);
