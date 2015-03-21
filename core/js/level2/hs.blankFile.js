(function(){
	central.event.listen("FileMenu.blankFile",function()
		{
		var loop = true;
		var counter = 1;
		while (loop)
			{
			console.log(counter);
			if (typeof central.filesystem.fileStack[encodeURIComponent("newFile "+counter)] != "undefined")
				{
				counter +=1 ;
				
				}
			else if (typeof central.filesystem.fileStack[encodeURIComponent("newFile "+counter)] == "undefined")
				{
				loop = false
				}
			}
			central.filesystem.fileStack[encodeURIComponent("newFile "+counter)] = {"content":""}
			central.filesystem.fileActive = "newFile "+counter;
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
		
			
		});
})(hs);



