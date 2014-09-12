(function(){
	/// resize mechanism
	/*
	gui.Window.get().on("resize",function(){resize_codemirror();});	
	gui.Window.get().on("maximize",function(){resize_codemirror();});
	gui.Window.get().on("unmaximize",function(){resize_codemirror();});
	*/
	Main.message.listen("core:center_resized","plugin.misterpah.CodemirrorEditor:js_file:editor_resizer",function()
						{
							resize_codemirror();
						});
	
	function resize_codemirror()
	{
		var content_height = $("#content_position").height();
		var tab_height = $("#plugin_misterpah_CodemirrorEditor_tab").height();
		$(".CodeMirror").height( content_height-tab_height+"px" ); // -30 is for the tab
		$("#inspector_position").height( content_height-30+"px" ); // -30 is for the tab
	}
	/// resize mechanism ends
})();
