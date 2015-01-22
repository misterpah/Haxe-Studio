(function(){	
	// ctrl/meta + `
	$.keyStroke( 192, { modKeys: [config.ctrlOrMeta] }, function(){   
	console.log($("#floating_position").css("display"));
	
		if ($("#floating_position").css("display") == "block")
			{
			$("#floating_position").css("display","none");
			$("#content_position").css("height","100%");
			central.event.broadcast("window_resized","index","");
			debug.debug("console","hide");
			}
		else
			{
			$("#floating_position").css("display","block");
			$("#content_position").css("height","70%");
			central.event.broadcast("window_resized","index","");
			debug.debug("console","show");
			}
	});
})(hs);
