(function(){
	
// ---------------------------------------------------------------------------------------------------------------------------------	
// ---------------------------------------------------------------------------------------------------------------------------------
// BLOCK : Codemirror basics
// ---------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------
	
	$("body").append("<style>.CodeMirror-dialog-top { position:absolute;right:0px;}</style>");
	$("#editor_position").append("<div id='plugin_misterpah_CodemirrorEditor_tab'><ul class='nav nav-tabs'></ul></div>");
	$("#editor_position").append("<div id='plugin_misterpah_CodemirrorEditor_editor'><textarea id='cm_textarea'></textarea></div>");
	$("#plugin_misterpah_CodemirrorEditor_editor").css("display","none");
	plugin.misterpah.CodemirrorEditor.cm_buffer = {};
	plugin.misterpah.CodemirrorEditor.inline_widget_stack = [];
	plugin.misterpah.CodemirrorEditor.hx_completion_list = [];
	plugin.misterpah.CodemirrorEditor.anywordHint_opened = false;
	plugin.misterpah.CodemirrorEditor.cm = CodeMirror.fromTextArea($("#cm_textarea")[0],
			{
			keyMap : "sublime",
			indentUnit:4,
			tabSize:4,  
			lineNumbers:true,
			indentWithTabs:true,
			cursorHeight:0.85,
			mode:'haxe', 
			theme:'monokai',
			viewportMargin: Infinity,
			/*matchBrackets:true,
			autoCloseBrackets:true,*/
			foldCode:true,
			foldGutter:true,
			styleActiveLine:true,
			showCursorWhenSelecting: true,
			extraKeys: {"Ctrl-Space": "anywordCompletion"}
			});
	
	CodeMirror.commands.anywordCompletion = function(cm) {
		plugin.misterpah.CodemirrorEditor.cursor_position = plugin.misterpah.CodemirrorEditor.cm.getCursor();
		cm.showHint({hint: plugin.misterpah.CodemirrorEditor.anywordHint});
	};
	
	
	
	
	CodeMirror.on(plugin.misterpah.CodemirrorEditor.cm,"cursorActivity",function(cm){
		var pos = plugin.misterpah.CodemirrorEditor.cm.getCursor();
		var line = plugin.misterpah.CodemirrorEditor.cm.getLine(pos.line);
		var index = plugin.misterpah.CodemirrorEditor.cm.indexFromPos(pos);
		var char = plugin.misterpah.CodemirrorEditor.cm.getValue().charAt(index - 1)[0];
		var pos_minus1 = plugin.misterpah.CodemirrorEditor.cm.posFromIndex(index -1);
		
		var splitter = [];
		if (plugin.misterpah.CodemirrorEditor.cm.getMode().name == "javascript")
			{
				splitter.push(".");
				splitter.push(" ");
				splitter.push("(");
				splitter.push(")");
				splitter.push("\"");
				splitter.push("'");
				splitter.push(":");
			}
		else if (plugin.misterpah.CodemirrorEditor.cm.getMode().name == "haxe")
			{
				splitter.push(" ");
				splitter.push("\"");
				splitter.push("'");
				splitter.push(":");
			}		
		
		
		for (var each in splitter)
			{
				if ( char == splitter[each])
					{
						plugin.misterpah.CodemirrorEditor.anywordHint_opened = false;
						break;
					}
			}

		if (line === "") // will open once blank line clicked. not good enough
			{
			//plugin.misterpah.CodemirrorEditor.anywordHint_opened = false;
			}		
	});
	
	
	
	
	
	
	
	CodeMirror.on(plugin.misterpah.CodemirrorEditor.cm,"change",function(cm){
		
		var pos = plugin.misterpah.CodemirrorEditor.cm.getCursor();
		var line = plugin.misterpah.CodemirrorEditor.cm.getLine(pos.line);
		var index = plugin.misterpah.CodemirrorEditor.cm.indexFromPos(pos);
		var char = plugin.misterpah.CodemirrorEditor.cm.getValue().charAt(index - 1)[0];
		var pos_minus1 = plugin.misterpah.CodemirrorEditor.cm.posFromIndex(index -1);

		
		if (plugin.misterpah.CodemirrorEditor.anywordHint_opened === false)
			{
			plugin.misterpah.CodemirrorEditor.cursor_position = pos_minus1;
			plugin.misterpah.CodemirrorEditor.anywordHint_opened = true;
			cm.showHint({hint: plugin.misterpah.CodemirrorEditor.anywordHint});						
			}
		
		// js hint		
		if (plugin.misterpah.CodemirrorEditor.cm.getMode().name == "javascript")
			{
			plugin.misterpah.CodemirrorEditor.cmOnChangeJS();
			}
		
		// haxe completion
		else if (plugin.misterpah.CodemirrorEditor.cm.getMode().name == "haxe")
			{
			plugin.misterpah.CodemirrorEditor.cmOnChangeHaxe();
			}		
		});	
	
	
	
	
	plugin.misterpah.CodemirrorEditor.create_inline_hint = function (line, msg)
		{
		msg = $('<div class="CodeMirror-linewidget"><div class="lint-error">'+msg+'</div></div>')[0];
		return plugin.misterpah.CodemirrorEditor.cm.addLineWidget(line,msg);
		};	
	
	
	// codemirror uses buffer to keep track document.
	// return true if document not opened yet
	// return false if document already opened
	function make_cm_buffer(name,text,mode)
		{
		name = encodeURIComponent(name);
		if (plugin.misterpah.CodemirrorEditor.cm_buffer[name] === undefined)
			{
			plugin.misterpah.CodemirrorEditor.cm_buffer[name] = CodeMirror.Doc(text,mode);
			return true;
			}
		return false; 
		}

	// codemirror uses buffer to keep track document.
	// returns true if remove successfull
	// returns false if remove not successfull
	function remove_cm_buffer(name)
		{
		name = encodeURIComponent(name);
		if (plugin.misterpah.CodemirrorEditor.cm_buffer[name] !== null)
			{
			plugin.misterpah.CodemirrorEditor.cm_buffer[name] = null;
			delete plugin.misterpah.CodemirrorEditor.cm_buffer[name];
			return true;
			}
		return false;
		}	

	

	// codemirror uses buffer to keep track document
	function display_buffer(name)
		{
		var buf = plugin.misterpah.CodemirrorEditor.cm_buffer[encodeURIComponent(name)];
		plugin.misterpah.CodemirrorEditor.cm.swapDoc(buf);
		if ($("#plugin_misterpah_CodemirrorEditor_editor").css("display") == "none")
			{
			$("#plugin_misterpah_CodemirrorEditor_editor").css("display","block");
			}
		plugin.misterpah.CodemirrorEditor.cm.refresh();
		}

	
	
	
	// show tab and set it as active file
	plugin.misterpah.CodemirrorEditor.show_me_tab = function (name,mode)
		{
		display_buffer(name);
		
		// makes the active tab not-active
		$("#plugin_misterpah_CodemirrorEditor_tab a").each(function(){$(this).parent().removeClass("active");});

		Main.session.active_file = name;	

		// add active class to user-chosen
		$("#plugin_misterpah_CodemirrorEditor_tab a[data-path='"+encodeURIComponent(name)+"']").parent().addClass("active");

		// resize codemirror to ensure size is correct
		Main.message.broadcast("core:center_resized","plugin.misterpah.CodemirrorEditor:js:CodemirrorEditor.js");
		};

	
	
	

	// save changes made into the Main.file_stack before saving it
	Main.message.listen("core:FileMenu.saveFile","plugin.misterpah.CodemirrorEditor:js:CodemirrorEditor.js",function()
		{
		// get changes from cm_buffer
		var content_from_buffer = plugin.misterpah.CodemirrorEditor.cm_buffer[encodeURIComponent(Main.session.active_file)].cm.getValue();

		// get active_file 's file_obj
		var file_obj = Main.file_stack.find(Main.session.active_file);

		// update content of active_file
		Main.file_stack.update_content(Main.session.active_file,content_from_buffer);

		// trigger active file to save
		Main.message.broadcast("plugin.misterpah.FileAccess:saveFile","plugin.misterpah.CodemirrorEditor:js:CodemirrorEditor.js");
		});	

	
	
	
	
	// this function will listen for opened files
	// it will display the file in the Editor
	Main.message.listen("plugin.misterpah.FileAccess:open_file.complete","plugin.misterpah.CodemirrorEditor:js:CodemirrorEditor.js",function()
		{

		// display editor if it's not visible
		if ($("#plugin_misterpah_CodemirrorEditor_editor").css("display") == "none")
			{
			$("#plugin_misterpah_CodemirrorEditor_editor").css("display","block");
			}

		var filename = Main.session.active_file;

		// get extension to get mode (which helps syntax highlighting)
		var filename_cp = filename;
		var ext = filename_cp.split("/").pop().split(".").pop();
		var mode = "";
		if (ext == "hx")
			{
			mode = "haxe";
			}
		else if (ext == "xml")
			{
			mode = "xml";
			}
		else if (ext == "js")
			{
			mode = "javascript";
			}

		// already opened file_obj in Main
		var file_obj = Main.file_stack.find(filename);

		// every file editted should have its own buffer
		var not_opened_yet = make_cm_buffer(filename, file_obj[1],mode);

		// create tab if not available yet
		if (not_opened_yet === true)
			{
			hs_console("open : "+filename);
			$("#plugin_misterpah_CodemirrorEditor_tab ul").append("<li><a onclick='plugin.misterpah.CodemirrorEditor.show_me_tab(\""+filename+"\",\""+mode+"\");' data-path='"+ encodeURIComponent(filename)+"'>"+file_obj[2] +"."+ext+"</a></li>");
			}

		// display the tab
		plugin.misterpah.CodemirrorEditor.show_me_tab(filename,mode);

		// always broadcast event after function complete. this will encourage people to expand this plugin
		Main.message.broadcast("plugin.misterpah.CodemirrorEditor:file_displayed.complete","plugin.misterpah.CodemirrorEditor:js:CodemirrorEditor.js");
	});
	
	
	
	

	// listen for close file	
	Main.message.listen("plugin.misterpah.FileAccess:close_file.complete","plugin.misterpah.CodemirrorEditor:js:CodemirrorEditor.js",function()
		{
		var filename = Main.session.active_file;

		// remove tab
		$("#plugin_misterpah_CodemirrorEditor_tab a[data-path='"+ encodeURIComponent(filename)+"']").parent().remove();

		remove_cm_buffer(filename);

		// hide Editor.	
		$("#plugin_misterpah_CodemirrorEditor_editor").css("display","none");

		// reset active file
		Main.session.active_file = "";
		Main.message.broadcast("plugin.misterpah.CodemirrorEditor:file_closed.complete","plugin.misterpah.CodemirrorEditor:js:CodemirrorEditor.js");
		});	
	
	
	
	
	
	
	
	
	
	
	
	
	
// ---------------------------------------------------------------------------------------------------------------------------------	
// ---------------------------------------------------------------------------------------------------------------------------------
// BLOCK : Codemirror anyword completion
// ---------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------
	
	
	plugin.misterpah.CodemirrorEditor.anywordHint = function (cm,options)
		{
		var anyword_completion = plugin.misterpah.CodemirrorEditor.scanWordsInEditor();
		var updated_completion = plugin.misterpah.CodemirrorEditor.anywordHint_update(cm,anyword_completion);
		return updated_completion;
		};

	

	
	
	
	
	plugin.misterpah.CodemirrorEditor.anywordHint_update = function(cm,completion_array)
		{
		var cur = cm.getCursor();
		var curLine = cm.getLine(cur.line);
		var start = plugin.misterpah.CodemirrorEditor.cursor_position.ch;
		end = cur.ch;
		
		
		var value = cm.getRange(CodeMirror.Pos(cur.line,start),CodeMirror.Pos(cur.line,end));
		console.log(start+"-"+end + ":"+value);
		var new_completion = [];
		for (var i = 0;i < completion_array.length;i++)
			{
			var cur_completion = completion_array[i];
			
			var clone = cur_completion;
			clone1 = clone.toLowerCase();
			clone2 = clone.toUpperCase();
			if (clone1.indexOf(value) === 0)
				{
				new_completion.push(cur_completion);
				}
			else if (clone2.indexOf(value) === 0)
				{
				new_completion.push(cur_completion);
				}
			else if (cur_completion.indexOf(value) === 0)
				{
				new_completion.push(cur_completion);
				}								
			}  

		return {list:new_completion,from:CodeMirror.Pos(cur.line,start),to:CodeMirror.Pos(cur.line,end)};
		};

	CodeMirror.registerHelper("hint","anyword", plugin.misterpah.CodemirrorEditor.anywordHint);	

	
	
	
	
	
	plugin.misterpah.CodemirrorEditor.scanWordsInEditor = function()
	{
		var content = plugin.misterpah.CodemirrorEditor.cm.getValue();
		if (content === "")
			{
			return;
			}
		var content_array = content.split("\n");
		
		var completion_array = [];
		for (var each in content_array)
			{
				var curline = content_array[each];
				curline = curline.replace(/\=/g," ");
				curline = curline.replace(/\[/g," ");
				curline = curline.replace(/\]/g," ");
				curline = curline.replace(/\(/g," ");
				curline = curline.replace(/\)/g," ");
				curline = curline.replace(/"/g," ");
				curline = curline.replace(/'/g," ");
				curline = curline.replace(/;/g," ");
				curline = curline.replace(/\//g," ");
				curline = curline.replace(/</g," ");
				curline = curline.replace(/>/g," ");
				curline = curline.replace(/\{/g," ");
				curline = curline.replace(/\}/g," ");
				curline = curline.replace(/\t/g," ");
				curline = curline.replace(/\@/g," ");
				
				// remove arithmetic 
				curline = curline.replace(/\+/g," ");
				curline = curline.replace(/\-/g," ");
				curline = curline.replace(/\*/g," ");
				// divide already above
				
				
				
				// smart replacing so we can get words
				curline = curline.replace(/\:/g," "); 
				curline = curline.replace(/\./g," "); 
				curline = curline.replace(/\,/g," "); 
				
				var curline_array = curline.split(" ");
				//console.log(curline_array);
				for (var each2 in curline_array)
					{
						if (!isNaN(parseInt(curline_array[each2])))
							{
								continue;
							}
						if(curline_array[each2] !== "") // (!== operator) doesnt work!
							{
								completion_array.push(curline_array[each2]);
							}
					}
			}
		
		var names = completion_array;
		var uniqueNames = [];
		$.each(names, function(i, el){
			if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
		});
		completion_array = uniqueNames;
		delete names;
		delete uniqueNames;
		
		return completion_array;
	};
	
	plugin.misterpah.CodemirrorEditor.handleCompletion = function(p1,p2,p3)
	{
		if (plugin.misterpah.CodemirrorEditor.cm.getMode().name == "haxe")
			{
			plugin.misterpah.CodemirrorEditor.haxe_handleCompletion(p1,p2);
			}		
	};
	
// ---------------------------------------------------------------------------------------------------------------------------------	
// ---------------------------------------------------------------------------------------------------------------------------------
// BLOCK : Codemirror as a Haxe editor
// ---------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------

	
	
	
	plugin.misterpah.CodemirrorEditor.haxe_handleCompletion = function (p1,p2)
		{
		// prepare completion to add into hx_completion_list
		var completion_temp = [];
		if (p2 === ".") // dot completion
			{
			try
				{
				for (count = 0 ; count < p1.i.length;count++)
					{
					completion_temp.push(p1.i[count].n);
					}
				plugin.misterpah.CodemirrorEditor.hx_completion_list = completion_temp;
				CodeMirror.showHint(plugin.misterpah.CodemirrorEditor.cm, plugin.misterpah.CodemirrorEditor.haxeHint);
				}
			catch(err)
				{
				console.error('malformed code. halt completion.');
				}			
			}
		else if (p2 === "(")
			{
			try
				{	
				completion_temp.push("/* function parameter */");
				completion_temp.push(p1);
				plugin.misterpah.CodemirrorEditor.hx_completion_list = completion_temp;
				CodeMirror.showHint(plugin.misterpah.CodemirrorEditor.cm, plugin.misterpah.CodemirrorEditor.haxeHint);					
				}
			catch(err)
				{
					console.error('malformed code. halt completion.');
				}
			}
		else if (p2 === ":")
			{
			try
				{	
					console.log(p1);
				/*
				completion_temp.push(" function parameter ");
				completion_temp.push(p1);
				plugin.misterpah.CodemirrorEditor.hx_completion_list = completion_temp;
				CodeMirror.showHint(plugin.misterpah.CodemirrorEditor.cm, plugin.misterpah.CodemirrorEditor.haxeHint);					
				*/
				}
			catch(err)
				{
					console.error('malformed code. halt completion.');
				}
			}		
		};

	
	
	
	
	plugin.misterpah.CodemirrorEditor.haxeHint = function (cm,options)
		{
		var haxe_completion = plugin.misterpah.CodemirrorEditor.hx_completion_list;
		var cur = cm.getCursor();

		var updated_completion = plugin.misterpah.CodemirrorEditor.haxeHint_update(cm,haxe_completion);
		return updated_completion;
		};


	
	
	
	
	plugin.misterpah.CodemirrorEditor.haxeHint_update = function(cm,completion_array)
		{
		var cur = cm.getCursor();

		var start = plugin.misterpah.CodemirrorEditor.cursor_position;
		var end = CodeMirror.Pos(cur.line,cur.ch);
		//console.log(start);
		//console.log(end);

		var value = cm.getRange(start,end);

		var new_completion = [];
		for (var i = 0;i < completion_array.length;i++)
			{
			var cur_completion = completion_array[i];
			var clone = cur_completion;
			clone1 = clone.toLowerCase();
			clone2 = clone.toUpperCase();
			if (clone1.indexOf(value) !== -1)
				{
				new_completion.push(cur_completion);
				}
			else if (clone2.indexOf(value) !== -1)
				{
				new_completion.push(cur_completion);
				}
			else if (cur_completion.indexOf(value) !== -1)
				{
				new_completion.push(cur_completion);
				}
				
			}  

		return {list:new_completion,from:start,to:end};
		};

	CodeMirror.registerHelper("hint","haxe", plugin.misterpah.CodemirrorEditor.haxeHint);	


	
	
	
	
	
	
	plugin.misterpah.CodemirrorEditor.cmOnChangeHaxe = function()
		{
		var pos = plugin.misterpah.CodemirrorEditor.cm.getCursor();
		var index = plugin.misterpah.CodemirrorEditor.cm.indexFromPos(pos);

		/*
		// automatic top level completion 
		var line_content = plugin.misterpah.CodemirrorEditor.cm.getLine(pos.line);	
		if (line_content.trim() === "") // top level completion only works on the blank line
			{

				//Main.message.broadcast("core:FileMenu.saveFile","plugin.misterpah.CodemirrorEditor:js:CodemirrorEditor.js");
				
				Main.message.broadcast(
					"plugin.misterpah.CodemirrorEditor.hxCompletion_topLevel",
					"plugin.misterpah.CodemirrorEditor:js:CodemirrorEditor.js",
					[
						index,
						plugin.misterpah.CodemirrorEditor.handleCompletion
					]
				);
				
			}
		*/
		if (plugin.misterpah.CodemirrorEditor.cm.getValue().charAt(index - 1) == ".")
			{
				plugin.misterpah.CodemirrorEditor.cursor_position = plugin.misterpah.CodemirrorEditor.cm.getCursor();
				Main.message.broadcast("core:FileMenu.saveFile","plugin.misterpah.CodemirrorEditor:js:CodemirrorEditor.js");
				Main.message.broadcast(
					"plugin.misterpah.CodemirrorEditor.hxCompletion_positional",
					"plugin.misterpah.CodemirrorEditor:js:CodemirrorEditor.js",
					[
						index,
						plugin.misterpah.CodemirrorEditor.handleCompletion,
						"."
					]
				);


			}
		
		else if (plugin.misterpah.CodemirrorEditor.cm.getValue().charAt(index - 1) == "(")
			{
				plugin.misterpah.CodemirrorEditor.cursor_position = plugin.misterpah.CodemirrorEditor.cm.getCursor();
				Main.message.broadcast("core:FileMenu.saveFile","plugin.misterpah.CodemirrorEditor:js:CodemirrorEditor.js");
				Main.message.broadcast(
					"plugin.misterpah.CodemirrorEditor.hxCompletion_positional",
					"plugin.misterpah.CodemirrorEditor:js:CodemirrorEditor.js",
					[
						index,
						plugin.misterpah.CodemirrorEditor.handleCompletion,
						"("
					]
				);


			}		
		
		else if (plugin.misterpah.CodemirrorEditor.cm.getValue().charAt(index - 1) == ":")
			{
				plugin.misterpah.CodemirrorEditor.cursor_position = plugin.misterpah.CodemirrorEditor.cm.getCursor();
				Main.message.broadcast("core:FileMenu.saveFile","plugin.misterpah.CodemirrorEditor:js:CodemirrorEditor.js");
				Main.message.broadcast(
					"plugin.misterpah.CodemirrorEditor.hxCompletion_positional",
					"plugin.misterpah.CodemirrorEditor:js:CodemirrorEditor.js",
					[
						index,
						plugin.misterpah.CodemirrorEditor.handleCompletion,
						":"
					]
				);


			}			
		};
	
	
// ---------------------------------------------------------------------------------------------------------------------------------	
// ---------------------------------------------------------------------------------------------------------------------------------
// BLOCK : Codemirror as a javascript editor
// ---------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------


	// execute every cm.on(change) triggered
	// only if the file is javascript
	plugin.misterpah.CodemirrorEditor.cmOnChangeJS = function()
		{
		clearTimeout(plugin.misterpah.CodemirrorEditor.updateHintsTimeout);
		plugin.misterpah.CodemirrorEditor.updateHintsTimeout = setTimeout(plugin.misterpah.CodemirrorEditor.updateJSHints, 1000);		
		};
	
	// apply hint on the first run
	// only if the file is Javascript
	Main.message.listen("plugin.misterpah.CodemirrorEditor:file_displayed.complete","plugin.misterpah.CodemirrorEditor:js:CodemirrorEditor.js",function(){	
		if (plugin.misterpah.CodemirrorEditor.cm.getMode().name == "javascript")
			{
			setTimeout(plugin.misterpah.CodemirrorEditor.updateJSHints, 100);		
			}		
		});
	
	
	// clear old hint and draw new hint
	plugin.misterpah.CodemirrorEditor.updateJSHints = function()
		{
		// clear all hint
		plugin.misterpah.CodemirrorEditor.clear_hint();
		
		// call hint for javascript
		if(JSHINT(plugin.misterpah.CodemirrorEditor.cm.getValue()) === false) // get all error for javascript
			{
			JSHINT.errors.forEach(function(each)
				{
				var line = each.line -1;
				var msg =  each.reason;
				plugin.misterpah.CodemirrorEditor.inline_widget_stack.push(plugin.misterpah.CodemirrorEditor.create_inline_hint(line,msg));
				});
			}
		};

	plugin.misterpah.CodemirrorEditor.clear_hint = function()
		{
		var len = plugin.misterpah.CodemirrorEditor.inline_widget_stack.length;
		for (i = 0; i < len;i++)
			{
			plugin.misterpah.CodemirrorEditor.cm.removeLineWidget(plugin.misterpah.CodemirrorEditor.inline_widget_stack[i]);
			}
		plugin.misterpah.CodemirrorEditor.inline_widget_stack = [];
		};
	
})();	