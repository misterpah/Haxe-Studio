(function(){
	
// ---------------------------------------------------------------------------------------------------------------------------------	
// ---------------------------------------------------------------------------------------------------------------------------------
// BLOCK : Codemirror basics
// ---------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------
	
	var prefix = plugin.misterpah.CodemirrorEditor;
	prefix.shortform = false;
	// theme config.theme;
	Utils.loadCSS(prefix.plugin_path() + prefix.cm_folder +"/theme/"+config.theme+".css");

	$("body").append("<style>.CodeMirror-dialog-top { position:absolute;right:0px;}</style>");
	$("#editor_position").append("<div id='plugin_misterpah_CodemirrorEditor_tab'><ul class='nav nav-tabs'></ul></div>");
	$("#editor_position").append("<div id='plugin_misterpah_CodemirrorEditor_editor' ><textarea id='cm_textarea'></textarea></div>");
	$("#plugin_misterpah_CodemirrorEditor_editor").css("display","none");
	prefix.cm_buffer = {};
	prefix.inline_widget_stack = [];
	prefix.hx_completion_list = [];
	prefix.anywordHint_opened = false;
	prefix.cm = CodeMirror.fromTextArea($("#cm_textarea")[0],
			{
			keyMap : "sublime",
			indentUnit:4,
			tabSize:4,  
			lineNumbers:true,
			indentWithTabs:true,
			cursorHeight:0.85,
			mode:'haxe', 
			theme: config.theme,
			viewportMargin: Infinity,
			/*matchBrackets:true,
			autoCloseBrackets:true,*/
			styleActiveLine: true,
			foldCode:true,
			foldGutter:true,
			showCursorWhenSelecting: true,
			extraKeys: {
				"Ctrl-Space": "anywordCompletion"
				}
			});
			/*
      extraKeys:{
        Enter: function(){
            alert('enter pressed');
        }			
	*/
	
	
	
// ---------------------------------------------------------------------------------------------------------------------------------	
// ---------------------------------------------------------------------------------------------------------------------------------
// BLOCK : Codemirror Haxe Lexer
// ---------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------
	
	// add button to options
	//$("#option_position_buttons div").append('<button onclick="option_position_content_show_tab($(this));"  data-refer="inspector_position" type="button" class="btn btn-default btn_option_position"><span class="glyphicon glyphicon-book"></span></button>');
	//$("#option_position_content").append('<div id="inspector_position" style="display:none;color:#ffffff;"><p>inspector were here</p></div>');



	prefix.gotoline = function(line)
		{
		prefix.cm.setCursor(CodeMirror.Pos(line,0));
		};

	
	Main.message.listen("core:option_position_button:inspector_position","plugin.misterpah.CodemirrorEditor:js:CodemirrorEditor.js",function(){
		prefix.lexer_object = [];
		prefix.lexer_line = 0;
		var obj = prefix.Lex();
		var len = obj.length;
		$("#inspector_position").html("");
		var level = 0;
		var prev_type = "";
		var level_prefix = "";
		$("#inspector_position").append(Main.session.active_file.split(Utils.path.sep).pop()+"<br/>");
		for (var i = 0; i < len; i++)
			{
			var each = prefix.lexer_object[i];
			if (each.type == "class")
				{
				level = 1;
				level_prefix = '<span class="label label-primary">C</span>';
				}
			else if (each.type == "function")
				{
				level = 2;
				level_prefix = '<span class="label label-warning">F</span>';
				}		
			else if (each.type == "variable")
				{
				level = 3;
				level_prefix = '<span class="label label-success">V</span>';
				}
			else if (each.type == "typedef")
				{
				level = 1;
				level_prefix = '<span class="label label-primary">T</span>';
				}					
			var level_prefix2 = "";
			for (var j = 0;j< level;j++)
				{
				level_prefix2 += "";
				}
			level_prefix = level_prefix2 +level_prefix;
			
			var data = each.data;
			
			if (data.indexOf("=") >-1)
				{
				data = data.split("=")[0];
				}
			if (data.indexOf("(") >-1)
				{
				data = data.split("(")[0];
				}
			if (data.indexOf(":") >-1)
				{
				data = data.split(":")[0];
				}						
				
				
			if (data.indexOf("var ") >-1)
				{
				data = data.replace("var "," ");
				}	
			if (data.indexOf("class ") >-1)
				{
				data = data.replace("class "," ");
				}							
			if (data.indexOf("{") >-1)
				{
				data = data.replace("{","");
				}											
						
			if (data.indexOf("typedef ") >-1)
				{
				data = data.replace("typedef "," ");
				}					
			if (data.indexOf("function ") >-1)
				{
				data = data.replace("function "," ");
				}				
			if (data.indexOf("public") >-1)
				{
				data = data.replace("public",'<span class="label label-primary">P</span> ');
				}						
			if (data.indexOf("private") >-1)
				{
				data = data.replace("private",'<span class="label label-default">Pvt</span> ');
				}
			if (data.indexOf("static") >-1)
				{
				data = data.replace("static",'<span class="label label-danger">S</span> ');
				}										
			if (data.indexOf("macro ") >-1)
				{
				data = data.replace("macro ",'<span class="label label-danger">M</span> ');
				}	
			if (data.indexOf("override") >-1)
				{
				data = data.replace("override",'<span class="label label-danger">Ovr</span> ');
				}																										

				
			
			$("#inspector_position").append(""+level_prefix+" <a href='#' onclick='plugin.misterpah.CodemirrorEditor.gotoline("+each.line+");'>"+data+"</a><br/>")
			}
		});
	prefix.Lex = function()
	{
		var loop = true;
		prefix.lexer_line = 0;
		while (loop)
			{
			var input = prefix.cm.getLine(prefix.lexer_line);
			//console.dir(input);
			if (input == undefined | input == null)
				{
				loop = false;
				continue;
				}
			if(input.match(/(.*)var\s(.*)?(=|;)/))
				{
				prefix.lexer_object.push({"type":"variable","data":input.match(/(.*)var\s(.*)?(=|;)/)[0],"line":prefix.lexer_line});
				}
			else if(input.match(/(.*)function(.*)/))
				{
				prefix.lexer_object.push({"type":"function","data":input.match(/(.*)function(.*)/)[0],"line":prefix.lexer_line});
				}
			else if(input.match(/(.*)class(.*)?(\n|{)/))
				{
				prefix.lexer_object.push({"type":"class","data":input.match(/(.*)class(.*)?(\n|{)/)[0],"line":prefix.lexer_line});
				}				
			else if(input.match(/(.*)typedef\s(.*)?(=|;)/))
				{
				prefix.lexer_object.push({"type":"typedef","data":input.match(/(.*)typedef\s(.*)?(=|;)/)[0],"line":prefix.lexer_line});
				}				
			prefix.lexer_line += 1;
			}
		return prefix.lexer_object;
	}
	
// ---------------------------------------------------------------------------------------------------------------------------------	
// ---------------------------------------------------------------------------------------------------------------------------------
// BLOCK : Codemirror Haxe Lexer END
// ---------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------
	
	
	
	
	
	CodeMirror.registerHelper("lint", "haxe");

	CodeMirror.commands.anywordCompletion = function(cm) {
		prefix.cursor_position = prefix.cm.getCursor();
		cm.showHint({hint: prefix.anywordHint});
	};
	


	
	
	
	CodeMirror.on(prefix.cm,"cursorActivity",function(cm){
		var pos = prefix.cm.getCursor();
		var line = prefix.cm.getLine(pos.line);
		var index = prefix.cm.indexFromPos(pos);
		var char = prefix.cm.getValue().charAt(index - 1)[0];
		var pos_minus1 = prefix.cm.posFromIndex(index -1);
		
		
		// reset mechanism for anywordHint
		var splitter = [];
		splitter.push(" ");
		splitter.push("\"");
		splitter.push("'");
		splitter.push(":");
		splitter.push("\t");
		splitter.push("/");
		splitter.push("\\");
		splitter.push("-");
		splitter.push("+");
		splitter.push("'");
		splitter.push("]");
		splitter.push("[");
		splitter.push("(");
		splitter.push(")");

		// special splitter for each languages
		if (prefix.cm.getMode().name == "javascript")
			{
				splitter.push(".");				
			}
		else if (prefix.cm.getMode().name == "haxe")
			{
			}		
		
		
		for (var each in splitter)
			{
			if ( char == splitter[each])
				{
					prefix.anywordHint_opened = false;
					break;
				}
			}
		

		
			
		
		if (line.replace(/\t/g,"") === "") // will open once blank line clicked. not good enough
			{
			//prefix.anywordHint_opened = false;
			}		
	});
	
	
	
	
	
	
	
	CodeMirror.on(prefix.cm,"change",function(cm){
		
		var pos = prefix.cm.getCursor();
		var line = prefix.cm.getLine(pos.line);
		var index = prefix.cm.indexFromPos(pos);
		var char = prefix.cm.getValue().charAt(index - 1)[0];
		var pos_minus1 = prefix.cm.posFromIndex(index -1);
		
		//$("#plugin_misterpah_CodemirrorEditor_tab ul").append("<li><a onclick='plugin.misterpah.CodemirrorEditor.show_me_tab(\""+encodeURIComponent(filename)+"\",\""+mode+"\");' data-path='"+ encodeURIComponent(filename)+"'>"+file_obj[2] +"."+ext+"&nbsp;&nbsp;<span class='status_icon glyphicon glyphicon-remove-circle' data-path='"+ encodeURIComponent(filename)+"'></span></a></li>");
		//encodeURIComponent(filename)
		$("span[data-path='"+encodeURIComponent(Main.session.active_file)+"']").removeClass("glyphicon-remove-circle");
		$("span[data-path='"+encodeURIComponent(Main.session.active_file)+"']").addClass("glyphicon-record");
	
		var trigger_anywordHint_only_when_see_this = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz\t";

		//console.log(trigger_anywordHint_only_when_see_this.search(char));
		if (prefix.anywordHint_opened === false && trigger_anywordHint_only_when_see_this.search(char) > -1)
			{
			prefix.cursor_position = pos_minus1;
			prefix.anywordHint_opened = true;
			cm.showHint({hint: prefix.anywordHint});						
			}

		
		// js hint		
		if (prefix.cm.getMode().name == "javascript")
			{
			prefix.cmOnChangeJS();
			}
		
		// haxe completion
		else if (prefix.cm.getMode().name == "haxe")
			{
			prefix.cmOnChangeHaxe();
			}		
			
		
		
		
		// shortform starts here
		if (prefix.shortform === false) 
			{
			var tabsize = plugin.misterpah.CodemirrorEditor.cm.getOption("tabSize");
			var tabCount = Math.round(pos.ch / tabsize);
			tabSpace = "";
			for (i=0; i<tabCount; i++)
				{
				tabSpace+="\t";
				}
			}
		
		var curline = line.replace(/\t/g,"");
		
		if( prefix.cm.getMode().name == "javascript" )
		{
		if (curline == ":IF:" | curline == ":if:")
			{
			prefix.shortform = true;
			prev_pos = pos;
			prefix.cm.replaceRange("if(  )\n"+tabSpace+"{\n"+tabSpace+"\t\n"+tabSpace+"}\n"+tabSpace+"else\n"+tabSpace+"{\n"+tabSpace+"\t\n"+tabSpace+"}\n",CodeMirror.Pos(pos.line,pos.ch-4),pos); // -4 because :IF: is 4 character				
			prefix.cm.setCursor(CodeMirror.Pos(prev_pos.line,prev_pos.ch));
			prefix.shortform = false;				
			}			
		else if (curline == ":FOR:" | curline == ":for:")
			{
			prefix.shortform = true;
			prev_pos = pos;
			prefix.cm.replaceRange("for(  )\n"+tabSpace+"{\n"+tabSpace+"\t\n"+tabSpace+"}\n",CodeMirror.Pos(pos.line,pos.ch-5),pos);  // -5 because :FOR: is 5 character
			prefix.cm.setCursor(CodeMirror.Pos(prev_pos.line,prev_pos.ch));
			prefix.shortform = false;
			}			
		else if (curline == ":F:" | curline == ":f:")
			{
			prefix.shortform = true;
			prev_pos = pos;
			prefix.cm.replaceRange("function  (  )\n"+tabSpace+"{\n"+tabSpace+"\t\n"+tabSpace+"}\n",CodeMirror.Pos(pos.line,pos.ch-3),pos);  // -3 because :F: is 3 character
			prefix.cm.setCursor(CodeMirror.Pos(prev_pos.line,prev_pos.ch+6));
			prefix.shortform = false;
			}
		else if (curline == ":TRY:" | curline == ":try:")
			{
			prefix.shortform = true;
			prev_pos = pos;
			prefix.cm.replaceRange("try\n"+tabSpace+"{\n"+tabSpace+"\t\n"+tabSpace+"}\n"+tabSpace+"catch(e)\n"+tabSpace+"{\n"+tabSpace+"\t\n"+tabSpace+"}\n",CodeMirror.Pos(pos.line,pos.ch-5),pos);  // -5 because :PF: is 5 character
			prefix.cm.setCursor(CodeMirror.Pos(prev_pos.line+2,prev_pos.ch+1));
			prefix.shortform = false;
			}
		}
		else if( prefix.cm.getMode().name == "haxe" )
		{
		if (curline == ":IF:" | curline == ":if:")
			{
			prefix.shortform = true;
			prev_pos = pos;
			prefix.cm.replaceRange("if(  )\n"+tabSpace+"{\n"+tabSpace+"\t\n"+tabSpace+"}\n"+tabSpace+"else\n"+tabSpace+"{\n"+tabSpace+"\t\n"+tabSpace+"}\n",CodeMirror.Pos(pos.line,pos.ch-4),pos); // -4 because :IF: is 4 character
			prefix.cm.setCursor(CodeMirror.Pos(prev_pos.line,prev_pos.ch));
			prefix.shortform = false;
			}
		else if (curline == ":FOR:" | curline == ":for:")
			{
			prefix.shortform = true;
			prev_pos = pos;
			prefix.cm.replaceRange("for(  in 0...  )\n"+tabSpace+"{\n"+tabSpace+"\t\n"+tabSpace+"}\n",CodeMirror.Pos(pos.line,pos.ch-5),pos);  // -5 because :FOR: is 5 character
			prefix.cm.setCursor(CodeMirror.Pos(prev_pos.line,prev_pos.ch));
			prefix.shortform = false;
			}		
		else if (curline == ":F:" | curline == ":f:")
			{
			prefix.shortform = true;
			prev_pos = pos;
			prefix.cm.replaceRange("private function  (  )\n"+tabSpace+"{\n"+tabSpace+"\t\n"+tabSpace+"}\n",CodeMirror.Pos(pos.line,pos.ch-3),pos);  // -4 because :PF: is 4 character
			prefix.cm.setCursor(CodeMirror.Pos(prev_pos.line,prev_pos.ch+14));
			prefix.shortform = false;
			}		
		else if (curline == ":SF:" | curline == ":sf:")
			{
			prefix.shortform = true;
			prev_pos = pos;
			prefix.cm.replaceRange("static private function  (  )\n"+tabSpace+"{\n"+tabSpace+"\t\n"+tabSpace+"}\n",CodeMirror.Pos(pos.line,pos.ch-4),pos);  // -4 because :PF: is 4 character
			prefix.cm.setCursor(CodeMirror.Pos(prev_pos.line,prev_pos.ch+20));
			prefix.shortform = false;
			}
		else if (curline == ":PF:" | curline == ":pf:")
			{
			prefix.shortform = true;
			prev_pos = pos;
			prefix.cm.replaceRange("public function  (  )\n"+tabSpace+"{\n"+tabSpace+"\t\n"+tabSpace+"}\n",CodeMirror.Pos(pos.line,pos.ch-4),pos);  // -3 because :F: is 3 character
			prefix.cm.setCursor(CodeMirror.Pos(prev_pos.line,prev_pos.ch+12));
			prefix.shortform = false;
			}
		else if (curline == ":SPF:" | curline == ":spf:")
			{
			prefix.shortform = true;
			prev_pos = pos;
			prefix.cm.replaceRange("static public function  (  )\n"+tabSpace+"{\n"+tabSpace+"\t\n"+tabSpace+"}\n",CodeMirror.Pos(pos.line,pos.ch-5),pos);  // -3 because :F: is 3 character
			prefix.cm.setCursor(CodeMirror.Pos(prev_pos.line,prev_pos.ch+18));
			prefix.shortform = false;
			}			
		else if (curline == ":TRY:" | curline == ":try:")
			{
			prefix.shortform = true;
			prev_pos = pos;
			prefix.cm.replaceRange("try\n"+tabSpace+"{\n"+tabSpace+"\t\n"+tabSpace+"}\n"+tabSpace+"catch(e)\n"+tabSpace+"{\n"+tabSpace+"\t\n"+tabSpace+"}\n",CodeMirror.Pos(pos.line,pos.ch-5),pos);  // -5 because :PF: is 5 character
			prefix.cm.setCursor(CodeMirror.Pos(prev_pos.line+2,prev_pos.ch+1));
			prefix.shortform = false;
			}							
		}

		
		});	
	
	
	

	
	
	
	prefix.create_inline_hint = function (line, msg)
		{
		msg = $('<div class="CodeMirror-linewidget"><div class="lint-error">'+msg+'</div></div>')[0];
		return prefix.cm.addLineWidget(line,msg);
		};	
	
	
	// codemirror uses buffer to keep track document.
	// return true if document not opened yet
	// return false if document already opened
	function make_cm_buffer(name,text,mode)
		{
		name = encodeURIComponent(name);
		if (prefix.cm_buffer[name] === undefined)
			{
			prefix.cm_buffer[name] = CodeMirror.Doc(text,mode);
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
		if (prefix.cm_buffer[name] !== null)
			{
			prefix.cm_buffer[name] = null;
			delete prefix.cm_buffer[name];
			return true;
			}
		return false;
		}	

	

	// codemirror uses buffer to keep track document
	function display_buffer(name)
		{
		var buf = prefix.cm_buffer[name];
		if (buf)
			{
			prefix.cm.swapDoc(buf);
			if ($("#plugin_misterpah_CodemirrorEditor_editor").css("display") == "none")
				{
				$("#plugin_misterpah_CodemirrorEditor_editor").css("display","block");
				$("#inspector_position").css("display","block");
				}
			prefix.cm.refresh();
			}
		else
			{
			console.log("no buffer found");
			}
		}

	
	
	
	// show tab and set it as active file
	prefix.show_me_tab = function (name,mode)
		{
		//console.log(name);
		display_buffer(name);
		
		// makes the active tab not-active
		$("#plugin_misterpah_CodemirrorEditor_tab a").each(function(){$(this).parent().removeClass("active");});

		// add active class to user-chosen
		$("#plugin_misterpah_CodemirrorEditor_tab a[data-path='"+name+"']").parent().addClass("active");

		Main.session.active_file = decodeURIComponent(name);	

		Main.message.broadcast("core:option_position_button:inspector_position","plugin.misterpah.CodemirrorEditor:js:CodemirrorEditor.js");

		// resize codemirror to ensure size is correct
		Main.message.broadcast("core:center_resized","plugin.misterpah.CodemirrorEditor:js:CodemirrorEditor.js");
		};

	
	prefix.close_this_tab = function (obj)
	{
		var want_to_close = $(obj).attr("data-path");
		var list_of_tab = [];
		$("#plugin_misterpah_CodemirrorEditor_tab ul li div").each(
				function(){
					list_of_tab.push( $(this).children().attr("data-path") );
				}
			);
		var tab_length = $("#plugin_misterpah_CodemirrorEditor_tab ul li").length;
		var want_to_close_index = list_of_tab.indexOf(want_to_close);
		
		console.log(list_of_tab);
		
		var open_this_tab_next = "";
		console.log(want_to_close_index);
		
		if (want_to_close_index - 1 > 0)
		{
			open_this_tab_next = list_of_tab[want_to_close_index -1];
		}
		else if (want_to_close_index === 0)
		{
			open_this_tab_next = list_of_tab[1];
		}
		else
		{
			open_this_tab_next = list_of_tab[0];	
		}
		
		
		//console.log(open_this_tab_next);

		prefix.show_me_tab(want_to_close);
		Main.message.broadcast("core:FileMenu.closeFile","plugin.misterpah.CodemirrorEditor:js:CodemirrorEditor.js");
		prefix.show_me_tab(open_this_tab_next);
		
		
		
		
		/*
	//console.dir($(obj).attr("data-path"));
	var previous_active = encodeURIComponent(Main.session.active_file);
	
	var want_to_close = $(obj).attr("data-path");
	
	prefix.show_me_tab(want_to_close);
	Main.message.broadcast("core:FileMenu.closeFile","plugin.misterpah.CodemirrorEditor:js:CodemirrorEditor.js");

		
	// open the next-to or previous-to object.
	if (previous_active != want_to_close)
		{
			
		//console.log(previous_active);
		//console.log(previous_active);
		//console.log(want_to_close);
		//prefix.show_me_tab(previous_active);
		}
		*/
	};
	

	// save changes made into the Main.file_stack before saving it
	Main.message.listen("core:FileMenu.saveFile","plugin.misterpah.CodemirrorEditor:js:CodemirrorEditor.js",function()
		{
		// get changes from cm_buffer
		var content_from_buffer = prefix.cm_buffer[encodeURIComponent(Main.session.active_file)].cm.getValue();

		// get active_file 's file_obj
		var file_obj = Main.file_stack.find(Main.session.active_file);

		// update content of active_file
		Main.file_stack.update_content(Main.session.active_file,content_from_buffer);

		// trigger active file to save
		Main.message.broadcast("plugin.misterpah.FileAccess:saveFile","plugin.misterpah.CodemirrorEditor:js:CodemirrorEditor.js");
		$("span[data-path='"+encodeURIComponent(Main.session.active_file)+"']").removeClass("glyphicon-record");
		$("span[data-path='"+encodeURIComponent(Main.session.active_file)+"']").addClass("glyphicon-remove-circle");
		});	

	
	
	
	
	// this function will listen for opened files
	// it will display the file in the Editor
	Main.message.listen("plugin.misterpah.FileAccess:open_file.complete","plugin.misterpah.CodemirrorEditor:js:CodemirrorEditor.js",function()
		{

		// display editor if it's not visible
		if ($("#plugin_misterpah_CodemirrorEditor_editor").css("display") == "none")
			{
			$("#plugin_misterpah_CodemirrorEditor_editor").css("display","block");
			$("#inspector_position").css("display","block");
			}

		var filename = Main.session.active_file;

		// get extension to get mode (which helps syntax highlighting)
		var filename_cp = filename;
		var filename_only = filename_cp.split(Utils.path.sep).pop();
		var ext = filename_cp.split(Utils.path.sep).pop().split(".").pop();
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
		
		
		if (ext == filename_only)
			{
			ext = "";
			}
		
		ext = "." + ext;
		if (ext == ".")
			{
			ext = "";
			}

		// already opened file_obj in Main
		var file_obj = Main.file_stack.find(filename);

		// every file editted should have its own buffer
		var not_opened_yet = make_cm_buffer(filename, file_obj[1],mode);

		// create tab if not available yet
		if (not_opened_yet === true)
			{
			hs_console("open : "+filename);
			$("#plugin_misterpah_CodemirrorEditor_tab ul").append("<li><div><a onclick='plugin.misterpah.CodemirrorEditor.show_me_tab(\""+encodeURIComponent(filename)+"\",\""+mode+"\");' data-path='"+ encodeURIComponent(filename)+"'>"+file_obj[2] +ext+"</a>&nbsp;&nbsp;<span onclick='plugin.misterpah.CodemirrorEditor.close_this_tab($(this));' class='status_icon glyphicon glyphicon-remove-circle' data-path='"+ encodeURIComponent(filename)+"'></span></div></li>");
			}
		// display the tab
		prefix.show_me_tab(encodeURIComponent(filename),mode);

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
		$("#inspector_position").css("display","none");

		// reset active file
		Main.session.active_file = "";
		Main.message.broadcast("plugin.misterpah.CodemirrorEditor:file_closed.complete","plugin.misterpah.CodemirrorEditor:js:CodemirrorEditor.js");
		});	
	
	
	
	




/*
// ---------------------------------------------------------------------------------------------------------------------------------	
// ---------------------------------------------------------------------------------------------------------------------------------
// BLOCK : Codemirror shortform completion (%)
// ---------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------
	
	
	prefix.shortformHint = function (cm,options)
		{
		//var shortform_completion = prefix.scanWordsInEditor();
		var shortform_completion = ['if','while','for'];
		var updated_completion = prefix.shortformHint_update(cm,shortform_completion);
		return updated_completion;
		};

	

	
	
	
	
	prefix.shortformHint_update = function(cm,completion_array)
		{
		var cur = cm.getCursor();
		var curLine = cm.getLine(cur.line);
		var start = prefix.cursor_position.ch;
		end = cur.ch;
		
		
		var value = cm.getRange(CodeMirror.Pos(cur.line,start),CodeMirror.Pos(cur.line,end));
		//console.log(start+"-"+end + ":"+value);
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

	CodeMirror.registerHelper("hint","shortform", prefix.shortformHint);	

*/


	
	
	
	
	
	
	
	
	
// ---------------------------------------------------------------------------------------------------------------------------------	
// ---------------------------------------------------------------------------------------------------------------------------------
// BLOCK : Codemirror anyword completion
// ---------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------
	
	
	prefix.anywordHint = function (cm,options)
		{
		var anyword_completion = prefix.scanWordsInEditor();
		var updated_completion = prefix.anywordHint_update(cm,anyword_completion);
		return updated_completion;
		};

	

	
	
	
	
	prefix.anywordHint_update = function(cm,completion_array)
		{
		var cur = cm.getCursor();
		var curLine = cm.getLine(cur.line);
		var start = prefix.cursor_position.ch;
		end = cur.ch;
		
		
		var value = cm.getRange(CodeMirror.Pos(cur.line,start),CodeMirror.Pos(cur.line,end));
		//console.log(start+"-"+end + ":"+value);
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

	
	
	

	
	
	
	prefix.scanWordsInEditor = function()
	{
		var content = prefix.cm.getValue();
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
	
	prefix.handleCompletion = function(p1,p2,p3)
	{
		if (prefix.cm.getMode().name == "haxe")
			{
			prefix.haxe_handleCompletion(p1,p2);
			}		
	};
	
// ---------------------------------------------------------------------------------------------------------------------------------	
// ---------------------------------------------------------------------------------------------------------------------------------
// BLOCK : Codemirror as a Haxe editor
// ---------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------

	
	
	
	prefix.haxe_handleCompletion = function (p1,p2)
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
				prefix.hx_completion_list = completion_temp;
				CodeMirror.showHint(prefix.cm, prefix.haxeHint);
				}
			catch(err)
				{
				console.dir(p1);
				console.dir(p2);
				console.error('malformed code. halt completion.');
				console.error(err);
				}			
			}
		else if (p2 === "(")
			{
			try
				{	
				completion_temp.push("/* function parameter */");
				completion_temp.push(p1);
				prefix.hx_completion_list = completion_temp;
				CodeMirror.showHint(prefix.cm, prefix.haxeHint);					
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
					//console.log(p1);
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

	
	
	
	
	prefix.haxeHint = function (cm,options)
		{
		var haxe_completion = prefix.hx_completion_list;
		var cur = cm.getCursor();

		var updated_completion = prefix.haxeHint_update(cm,haxe_completion);
		return updated_completion;
		};


	
	
	
	
	prefix.haxeHint_update = function(cm,completion_array)
		{
		var cur = cm.getCursor();

		var start = prefix.cursor_position;
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

	CodeMirror.registerHelper("hint","haxe", prefix.haxeHint);	


	
	
	
		
	prefix.cmOnChangeHaxe = function()
		{
		var pos = prefix.cm.getCursor();
		var index = prefix.cm.indexFromPos(pos);

		if (prefix.cm.getValue().charAt(index - 1) == ".")
			{
				prefix.cursor_position = prefix.cm.getCursor();
				Main.message.broadcast("core:FileMenu.saveFile","plugin.misterpah.CodemirrorEditor:js:CodemirrorEditor.js");
				Main.message.broadcast(
					"plugin.misterpah.CodemirrorEditor.hxCompletion_positional",
					"plugin.misterpah.CodemirrorEditor:js:CodemirrorEditor.js",
					[
						index,
						prefix.handleCompletion,
						"."
					]
				);


			}

		else if (prefix.cm.getValue().charAt(index - 1) == "(")
			{
				prefix.cursor_position = prefix.cm.getCursor();
				Main.message.broadcast("core:FileMenu.saveFile","plugin.misterpah.CodemirrorEditor:js:CodemirrorEditor.js");
				Main.message.broadcast(
					"plugin.misterpah.CodemirrorEditor.hxCompletion_positional",
					"plugin.misterpah.CodemirrorEditor:js:CodemirrorEditor.js",
					[
						index,
						prefix.handleCompletion,
						"("
					]
				);


			}		
		
		else if (prefix.cm.getValue().charAt(index - 1) == ":")
			{
				prefix.cursor_position = prefix.cm.getCursor();
				Main.message.broadcast("core:FileMenu.saveFile","plugin.misterpah.CodemirrorEditor:js:CodemirrorEditor.js");
				Main.message.broadcast(
					"plugin.misterpah.CodemirrorEditor.hxCompletion_positional",
					"plugin.misterpah.CodemirrorEditor:js:CodemirrorEditor.js",
					[
						index,
						prefix.handleCompletion,
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
	prefix.cmOnChangeJS = function()
		{
		clearTimeout(prefix.updateHintsTimeout);
		prefix.updateHintsTimeout = setTimeout(prefix.updateJSHints, 1000);		
		};
	
	// apply hint on the first run
	// only if the file is Javascript
	Main.message.listen("plugin.misterpah.CodemirrorEditor:file_displayed.complete","plugin.misterpah.CodemirrorEditor:js:CodemirrorEditor.js",function(){	
		if (prefix.cm.getMode().name == "javascript")
			{
			setTimeout(prefix.updateJSHints, 500);		
			}		
		});
	
	
	// clear old hint and draw new hint
	prefix.updateJSHints = function()
		{
		// clear all hint
		prefix.clear_hint();
		
		// call hint for javascript
		if(JSHINT(prefix.cm.getValue()) === false) // get all error for javascript
			{
			JSHINT.errors.forEach(function(each)
				{
				var line = each.line -1;
				var msg =  each.reason;
				prefix.inline_widget_stack.push(prefix.create_inline_hint(line,msg));
				});
			}
		};

	prefix.clear_hint = function()
		{
		var len = prefix.inline_widget_stack.length;
		for (i = 0; i < len;i++)
			{
			prefix.cm.removeLineWidget(prefix.inline_widget_stack[i]);
			}
		prefix.inline_widget_stack = [];
		};
	
})();	
