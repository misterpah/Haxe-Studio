gui.Window.get().on("resize",function(){resize_codemirror();});
gui.Window.get().on("maximize",function(){resize_codemirror();});
gui.Window.get().on("unmaximize",function(){resize_codemirror();});
	
	

function resize_codemirror()
	{
	console.log("resize!");
	console.log($("html").height());	
	$(".CodeMirror").css("height",$("html").height() - 30 +"px");
	$("document").css("height", $("html").height() - 30 + "px");
	}
