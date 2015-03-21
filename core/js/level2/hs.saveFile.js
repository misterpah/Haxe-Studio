(function(){
	central.event.listen("FileMenu.saveFile",function()
		{
		var filename = central.filesystem.fileActive;
		
		if (editor.find_tab(encodeURIComponent(filename)) == 0)
			{
			central.filesystem.fileActive = decodeURIComponent($("#editor_tab div.active a").attr("data-path"));
			}
		var filename = central.filesystem.fileActive;
		if (editor.find_tab(encodeURIComponent(filename)) == 0)
			{
			console.log("no active file!");
			return;
			}	
		var _cur = editor.getCursor();
		central.filesystem.fileStack[encodeURIComponent(central.filesystem.fileActive)].content = editor._cm.doc.getValue(); //central.filesystem.fileStack[encodeURIComponent(central.filesystem.fileActive)].doc.getValue();
		
		
		if (central.filesystem.fileActive.indexOf("newFile") == 0)
			{
			filesystem.file_dialogSaveAs()
				.then(function(filename)
					{
					debug.error(filename);
					//central.event.broadcast("filesystem.closeFile","hs.saveFile.js",filename);
					if (support.node.fs.createFileSync(filename))
						{
						support.node.fs.writeFileSync(filename,central.filesystem.fileStack[encodeURIComponent(central.filesystem.fileActive)].content);
						
						editor.remove_tab(encodeURIComponent(central.filesystem.fileActive));
						delete central.filesystem.fileStack[encodeURIComponent(central.filesystem.fileActive)]
						//filesystem.closeFile(encodeURIComponent(filename));
						
						
						
						central.event.broadcast("FileMenu.openFileDirectly","hs.saveFile.js",filename);
						}
					else
						{

						debug.info("File already exists! replacing...");
						support.node.fs.writeFileSync(filename,central.filesystem.fileStack[encodeURIComponent(central.filesystem.fileActive)].content);


						editor.remove_tab(encodeURIComponent(central.filesystem.fileActive));
						delete central.filesystem.fileStack[encodeURIComponent(central.filesystem.fileActive)]

						//central.event.broadcast("filesystem.closeFile","hs.saveFile.js",filename);
						central.event.broadcast("FileMenu.openFileDirectly","hs.saveFile.js",filename);						
						}
					});
			//
			return;
			}
		filesystem.saveFile(encodeURIComponent(central.filesystem.fileActive));
		$("#editor_tab .active .status_icon").removeClass("glyphicon-record");		
		$("#editor_tab .active .status_icon").addClass("glyphicon-remove-circle");
		});		
})(hs);
