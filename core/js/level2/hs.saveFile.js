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
		console.log(filename);
		var _cur = editor.getCursor();
		central.filesystem.fileStack[encodeURIComponent(central.filesystem.fileActive)].content = editor._cm.doc.getValue(); //central.filesystem.fileStack[encodeURIComponent(central.filesystem.fileActive)].doc.getValue();
		filesystem.saveFile(encodeURIComponent(central.filesystem.fileActive));
		$("#editor_tab .active .status_icon").removeClass("glyphicon-record");		
		$("#editor_tab .active .status_icon").addClass("glyphicon-remove-circle");
		});		
})(hs);
