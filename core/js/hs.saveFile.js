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
		//console.log(_cur);
		central.filesystem.fileStack[encodeURIComponent(central.filesystem.fileActive)].content = central.filesystem.fileStack[encodeURIComponent(central.filesystem.fileActive)].doc.getValue();
		filesystem.saveFile(encodeURIComponent(central.filesystem.fileActive));
		
		//editor.setCursor(_cur.line,_cur.ch);		

		});		
})(hs);
