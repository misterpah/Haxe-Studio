package menu;

import ui.*;
import jQuery.*;

class NewProject
{

	private var registered_type:Array<Dynamic>;

	public function new()
	{
		trace("register newproject");
		registered_type = new Array();

		//create_ui();
		register_hook();
	}

	private function register_hook()
	{
		//core_project_newProject
		new JQuery(js.Browser.document).on("core_project_newProject",new_project_ui);
		new JQuery(js.Browser.document).on("core_project_registerNewTypeProject",registerNewType);
	}


	private function registerNewType(event,data)
	{
		//trace(event);
		registered_type.push(data);
	}

	private function new_project_ui()
	{
		trace("haha");

		var retStr = "";
		retStr += '<div class="row">';
		for (each in 0...registered_type.length)
		{
			var cur = registered_type[each];
			trace(cur.get("plugin_name"));
			retStr += [
			'<div class="col-xs-2">',
					'<label>',
					'<img width=64 class="img-rounded" src="'+cur.get("plugin_image")+'" />',
					'<p class="text-center"><input type="radio" name="NewProject_radio" value="'+cur.get("plugin_name")+'" /><br/>'+cur.get("plugin_name")+'</p>',
					'</label>',
			'</div>'].join("\n");
		}
		retStr += '</div>';



		var radio_plugin_name = new Array();
		for (each in 0...registered_type.length)
		{
			var cur = registered_type[each];
			//trace(cur.get("plugin_name"));
			retStr += [
			'<div id="radio_'+cur.get("plugin_name")+'" style="display:none;">',
			'<h2>'+cur.get("plugin_name")+'</h2>',
			'<p>'+cur.get("plugin_description")+'</p>',
			'<p><b>Help:</b> '+cur.get("plugin_help")+'</p>',
			'<p><b>This will execute:</b> '+cur.get("plugin_execute")+'</p>',
			//'<p><b>Project Name:</b> <input style="width:100%;" id="projectName_'+cur.get("plugin_name")+'" value="" /></p>',
			'<p><b>With optional parameter:</b> <input style="width:100%;" id="optional_'+cur.get("plugin_name")+'" value="'+cur.get("plugin_extraParam")+'" /></p>',
			'</div>'
			].join("\n");

			radio_plugin_name.push("radio_"+cur.get("plugin_name"));
		}

		retStr += '<br/>';
		retStr += '<button style="display:none;" id="NewProject_submit" type="button" class="btn btn-primary btn-lg btn-block">Create Project</button>';



		var dialog = new ui.ModalDialog();
		dialog.title = "New Project";
		dialog.id="new_project_modal_id";
		dialog.content=retStr;
		dialog.header = true;
		dialog.footer = false;
		dialog.show();


		new JQuery("input[name='NewProject_radio']").on("click",function()
			{
				new JQuery("#NewProject_submit").css('display','block');
				for (each in 0...radio_plugin_name.length)
				{
					//trace(radio_plugin_name[each]);
					new JQuery("#"+radio_plugin_name[each]).css("display","none");
				}
				var selected = new JQuery("input[name='NewProject_radio']:checked").val();
				//selected.css("display","block");
				new JQuery("#radio_"+selected).css("display","block");
			});

		new JQuery("#NewProject_submit").on("click",function(){
			var selected = new JQuery("input[name='NewProject_radio']:checked").val();
			
			for (each in 0...registered_type.length)
				{			
				var cur = registered_type[each];
				//cur.get("plugin_name");
				if (selected == cur.get("plugin_name"))
					{
					//var project_name = new JQuery("#projectName_"+cur.get("plugin_name")).val();
					var execute = cur.get("plugin_execute");
					var optional = new JQuery("#optional_"+cur.get("plugin_name")).val();
					Utils.system_create_project( execute + " "+optional);
					dialog.hide();
					}
				}
			});

	}
}