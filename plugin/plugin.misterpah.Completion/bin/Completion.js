(function(){
	
	plugin.misterpah.Completion.completion_positional = function(position,callback,string_that_call_completion) 
		{
		var path = Main.session.active_file;

		Utils.exec( 
			[
			"cd %CD% %QUOTE%"+Main.session.project_folder+"%QUOTE%",
			"haxe --connect 30003 "+Main.session.project_xml_parameter+" --display %QUOTE%"+path+"%QUOTE%@"+position
			],
			function(p1,p2,p3)
				{
				var return_this = [];
				try 
					{
						return_this = $.xml2json(p3);
					}
				catch(err)
					{
						return_this = ['no completion found'];
					}
				callback(return_this,string_that_call_completion,null);
				}
			);
		};

	
	plugin.misterpah.Completion.completion_topLevel = function(position,callback) 
		{
		var path = Main.session.active_file;

		Utils.exec( 
			[
			"cd %CD% %QUOTE%"+Main.session.project_folder+"%QUOTE%",
			"haxe --connect 30003 "+Main.session.project_xml_parameter+" --display %QUOTE%"+path+"%QUOTE%@"+position +"@toplevel"
			],
			function(p1,p2,p3)
				{
				callback(p1,p2,p3);
				}
			);
		};
	
	
	
	
	// Top Level completion
	Main.message.listen("plugin.misterpah.CodemirrorEditor.hxCompletion_topLevel","plugin.misterpah.Completion:js:Completion.js",function(event,data)
		{
			plugin.misterpah.Completion.completion_topLevel(data[0],data[1]);
		});
	
	// completion via position
	Main.message.listen("plugin.misterpah.CodemirrorEditor.hxCompletion_positional","plugin.misterpah.Completion:js:Completion.js",function(event,data)
		{
			plugin.misterpah.Completion.completion_positional(data[0],data[1],data[2]);
		});
	
	
})();