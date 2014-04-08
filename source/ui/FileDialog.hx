package ui;

import jQuery.*;
import js.Browser;


@:keep @:expose @:native("ui.FileDialog") class FileDialog
{
	public function new():Void
	{
	}
	
	public function show(function_name, saveAs:Bool=false)
	{
		if (saveAs == false)
		{
		new JQuery('#temp').html("<input id='temp_fileDialog' type='file' />");
		}
		else
		{
		new JQuery('#temp').html("<input id='temp_fileDialog' type='file' nwsaveas />");			
		}


		var chooser = new JQuery("#temp_fileDialog");
		chooser.change(function(evt) {
			var filepath = chooser.val();
			//new JQuery(js.Browser.document).triggerHandler(event_name,filepath);
			//untyped $(document).triggerHandler(event_name,filepath);
			function_name(filepath);
			});
		chooser.trigger('click'); 

	}
}
