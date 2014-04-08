package ui;

import jQuery.*;

@:keep @:expose @:native("ui.ModalDialog") class ModalDialog
{
	public var id:String;
	public var title:String;
	public var content:String;
	public var ok_text:String;
	public var cancel_text:String;
	public var footer:Bool;
	public var header:Bool;
	
	
	
	public function new()
	{
		title = '';
		id = '';
		content = '';
		header = true;
		footer = true;
		ok_text = '';
		cancel_text = '';
	}
	
	public function updateModalDialog()
	{
		var retStr = ["<div class='modal fade' id='"+id+"' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>",
				   "<div class='modal-dialog'>",
				   "<div class='modal-content'>"].join("\n");

		if (header == true)
		{
			retStr += ["<div class='modal-header'>",
			"<button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>",
			"<h4 class='modal-title'>"+title+"</h4>",
			"</div>"].join("\n");
		}

		retStr += 	["<div class='modal-body'>",
					content,
					"</div>"].join("\n");


		if (footer == true)
			{
			retStr += [	"<div class='modal-footer'>",
						"<button type='button' class='btn btn-default' data-dismiss='modal'>"+cancel_text+"</button>",
						"<button type='button' class='btn btn-primary button_ok'>"+ok_text+"</button>",
						"</div>"].join("\n");
			}


		retStr +=	["</div>",
					"</div>",
					"</div>"].join("\n");

		new JQuery("#modal_position").html(retStr);
		new JQuery("#style_overide").append("<style>.modal{overflow:hidden}</style>");
	}
	
	public function show()
	{
		updateModalDialog();	
	
		// using untyped
		// http://haxe.org/doc/js/extern_libraries
		untyped new JQuery("#"+id).modal("show");
		
		new JQuery('#'+id).on('hidden.bs.modal', function () {
			new JQuery("#"+id).remove();
		});			
		
	}
	
	public function hide()
	{
		// using untyped
		// http://haxe.org/doc/js/extern_libraries
		untyped new JQuery("#"+id).modal("hide");
	}
}