(function(){
	/// resize mechanism
	gui.Window.get().on("resize",function(){resize_codemirror();});	
	gui.Window.get().on("maximize",function(){resize_codemirror();});
	gui.Window.get().on("unmaximize",function(){resize_codemirror();});

	Main.message.listen("core:center_resized","plugin.misterpah.Editor:js_file:editor_resizer",function()
						{
							resize_codemirror();
						});
	function resize_codemirror()
	{
		$(".CodeMirror").height($(".ui-layout-center").height() -30 +"px") // -30 is for the tab
	}
	/// resize mechanism ends
})();