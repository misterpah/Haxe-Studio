(function(){
	central.event.listen("FileMenu.closeFile",function()
		{
		
		var filename = central.filesystem.fileActive;
		var tabList = editor.list_tab();
		var tabPos = tabList.indexOf(encodeURIComponent(central.filesystem.fileActive));
		
		var next_tab = "";
		if (tabPos == tabList.length-1) // closing the final tab
			{
			next_tab = tabList[tabPos -1];
			}
		else if (tabPos == 0)
			{
			next_tab = tabList[1];
			}
		else
			{
			next_tab = tabList[tabPos +1];
			}
		
		editor.remove_tab(encodeURIComponent(filename));
		filesystem.closeFile(encodeURIComponent(filename));
		editor.setValue("");
		if ($("#editor_tab a").length != 0)
			{
			//editor.create_tab("blank");
			editor.show_tab(next_tab);
			editor.setValue(central.filesystem.fileStack[next_tab].content);
			central.filesystem.fileActive = decodeURIComponent(next_tab)
			editor.show_inspector();
			}
		
		});		
		
})(hs);
