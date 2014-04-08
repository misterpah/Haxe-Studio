package ui;

import jQuery.*;

@:keep @:expose @:native("ui.Notify") class Notify
{
	public  var type:String;
	public  var content:String;
	
	
	
	public function new()
	{	
		type = '';
		content = '';
	}// end new
	
	
	
	public  function show()
	{
		var type_error = '';
		var type_error_text = '';
		var skip = true;
		
		if (type == "error")
		{
			type_error = "danger";
			type_error_text = "Error";
			skip = false;
		}
		else if (type == "warning")
		{
			type_error = "warning";
			type_error_text = "Warning";
			skip = false;
		}
		else 
		{
			type_error = "warning";
			type_error_text = "";
			skip = false;			
		}

	
		if (skip == false)
		{
			var retStr = ['<div style="margin-left:10px;margin-top:12px;margin-right:10px;" class="alert alert-'+type_error+' fade in">',
			'<a class="close" data-dismiss="alert" href="#" aria-hidden="true">&times;</a>',
			'<strong>'+type_error_text+' </strong><br/>'+content,
			'</div>'].join("\n");
			
			 new JQuery('#notify_position').html(retStr);  
		}
	} // end show
}