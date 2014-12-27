var editor = (function(obj)
{
	var plugin_path = "../plugin/editor";
	obj.plugin_path = plugin_path;
	var cm_version = "codemirror-4.2";
	obj._cm = "";
	var timerVar ="";

	
	// wait for editor to be loaded. as soon as its loaded, open editor
	function timerVarCheckIf() {
		if (obj.create_editor != undefined)
			{
			timerVarStop();
			obj.create_editor();
			obj._cm.refresh();
			}
	}

	function timerVarStop() 
		{
		clearInterval(timerVar);
		}

	obj.init = function()
		{
		central.editor = {};
		
		
		//editor dependencies
		var cm_folder = plugin_path+"/"+cm_version;
		support.loadJS(cm_folder+"/lib/codemirror.js");
		support.loadJS(cm_folder+"/keymap/sublime.js");
		support.loadJS(cm_folder+"/mode/haxe/haxe.js");
		support.loadJS(cm_folder+"/mode/javascript/javascript.js");
		support.loadJS(cm_folder+"/mode/xml/xml.js");
		support.loadJS(cm_folder+"/addon/selection/active-line.js");
		support.loadJS(cm_folder+"/addon/hint/show-hint.js");
		support.loadCSS(cm_folder+"/addon/hint/show-hint.css");
		support.loadCSS(cm_folder+"/lib/codemirror.css");
		support.loadCSS(cm_folder +"/theme/"+config.editor_theme+".css");

		//plugin extra files
		
		support.loadJS(plugin_path+"/editor.create_editor.js");
		support.loadJS(plugin_path+"/editor.inspector.js");
		support.loadJS(plugin_path+"/editor.anyword_completion.js");
		support.loadJS(plugin_path+"/editor.haxe_completion.js");
		
		
		support.loadJS(plugin_path+"/editor.get__.js");
		support.loadJS(plugin_path+"/editor.set__.js");
		support.loadJS(plugin_path+"/editor.tab.js");
		
		support.loadJS(plugin_path+"/editor.syntax_checker.js");
		
		// wait for editor to be loaded. as soon as its loaded, open editor
		timerVar = setInterval(function(){timerVarCheckIf()}, 100);
		};
		
	central.event.listen("window_resized",function()
		{
		var max_height = $("#content_position").outerHeight();
		var tab_height = $("#editor_tab").outerHeight();
		$(".CodeMirror").height(max_height - tab_height +"px")		
		});
				
	obj.destroy = function()
		{
		};
		
	return obj;
})(editor||{});
