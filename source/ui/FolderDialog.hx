package ui;

import jQuery.*;
import js.Browser;


@:keep @:expose @:native("ui.FolderDialog") class FolderDialog
{
	public function new():Void
	{
	}
	
	public function show(function_name)
		{
		new JQuery('#temp').html("<input id='temp_folderDialog' type='file' nwdirectory />");

		var chooser = new JQuery("#temp_folderDialog");
		chooser.change(function(evt) {
			var filepath = chooser.val();
			//new JQuery(js.Browser.document).triggerHandler(event_name,filepath);
			//untyped $(document).triggerHandler(event_name,filepath);
			function_name(filepath);
			});
		chooser.trigger('click'); 
		}
}
