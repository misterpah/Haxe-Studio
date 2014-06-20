
	




gui.Window.get().on("resize",function(){resize_codemirror();});	
gui.Window.get().on("maximize",function(){resize_codemirror();});
gui.Window.get().on("unmaximize",function(){resize_codemirror();});


Main.message.listen("core:center_resized","plugin.misterpah.Editor:js_file:editor_resizer",function(){
	//console.log("resizing");
	resize_codemirror();
	//console.log("resize complete");
	});
function resize_codemirror()
	{
	//$(".CodeMirror").width($("#editor_position").width() +"px")
	$(".CodeMirror").height($(".ui-layout-center").height() -30 +"px") // -30 is for the tab
	/*
	console.log("resize!");
	console.log($("html").height());	
	$(".CodeMirror").css("height",$("html").height() - 30 +"px");
	$("document").css("height", $("html").height() - 30 + "px");
	*/
	}
