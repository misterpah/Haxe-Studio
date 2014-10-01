(function(){
	central.event.listen("FileMenu.closeFile",function()
		{
		
		var filename = central.filesystem.fileActive;
		
		editor.remove_tab(encodeURIComponent(filename));
		filesystem.closeFile(encodeURIComponent(filename));
		editor.setValue("");
		if ($("#editor_tab a").length == 0)
			{
			//editor.create_tab("blank");
			}
		
		});		
		
})(hs);
