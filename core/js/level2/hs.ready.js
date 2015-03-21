(function(){

central.event.listen("HaxeStudio.ready",function()
	{
	central.event.broadcast("FileMenu.blankFile","","");
	});

})(hs);
