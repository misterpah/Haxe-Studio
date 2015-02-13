var editor = (function(obj)
{
	obj.haxeCompletionIsActive = false;
	obj.anyWordCompletionIsActive = false;
	
	obj.libraryHint_list = [];
	obj.is_library_completion = false;
	function openEditor()
  		{
  		if (central.editor.isEditorOpened == false)
  			{
  			//console.log("opening Editor");
			$("body").append("<style>.CodeMirror-dialog-top { position:absolute;right:0px;}</style>");
			$("#editor_position").prepend("<div id='editor_tab'><ul class='nav nav-tabs'></ul></div>");
			$("#editor_position").append("<div id='editor_editor' ><textarea id='cm_textarea'></textarea></div>");
			$("#editor_editor").css("display","none");
  			
  			central.editor.isEditorOpened = true;
  			$("#editor_editor").css("display","block");

			obj._cm = CodeMirror.fromTextArea($("#cm_textarea")[0],
					{
					keyMap : "sublime",
					theme: config.editor_theme,
					lineNumbers:true,
					indentUnit:4,
					tabSize:4,  
				
					indentWithTabs:true,
					cursorHeight:0.85,
					mode:'haxe',
				
					/*viewportMargin: Infinity,
					matchBrackets:true,*/
					autoCloseBrackets:true,
					styleActiveLine: true,
					foldCode:true,
					foldGutter:true,
					showCursorWhenSelecting: true,
					extraKeys: {
						"Ctrl-Space": "completion",
						"Cmd-Space": "completion",
						"Ctrl-1": "library_completion",
						"Cmd-1": "library_completion",
						"Ctrl-Tab": "nextTab",
						"Cmd-Tab": "nextTab",
						"Shift-Ctrl-Tab": "previousTab",
						"Shift-Cmd-Tab": "previousTab"
						}
					});  		
			
			obj._cm.on("change",function(cm)
				{
				if (obj.is_library_completion == true)
					{
					return;
					}
				var _char = obj.getValue().charAt(cm.indexFromPos(cm.getCursor()) -1);
				var triggerAnywordCompletion = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_".split("");
				var availableInWords = triggerAnywordCompletion.indexOf(_char);
				
				//$("#editor_tab .status_icon[data-path='%2Fhome%2Fpah%2Fdevelopment%2FAbangJambu%2Fsource%2FMenuState.hx']")
				$("#editor_tab .active .status_icon").removeClass("glyphicon-remove-circle");
				$("#editor_tab .active .status_icon").addClass("glyphicon-record");
				
				
				if (availableInWords != -1 && obj.anyWordCompletionIsActive == false && obj.haxeCompletionIsActive == false)
					{
					obj.anyWordCompletionIsActive = true;
					editor.anywordHint();
					cm.showHint({hint: editor.anywordHint,completeSingle:false});
					}
				if (availableInWords == -1)
					{
					obj.anyWordCompletionIsActive = false;
					obj.haxeCompletionIsActive = false;
					}					
				});
				
			obj.addLine = function (content,line)
				{
				obj._cm.doc.replaceRange(content,{'line':line,'ch':0});
				//obj._cm.doc.replaceRange("\r\n",{'line':line,'ch':content.length-1});
				}
				
			CodeMirror.commands.library_completion = function(cm) {				
				console.log("library completion ctrl+1");
				obj.is_library_completion = true;
				var cur = obj.getCursor();
				var _index = cm.indexFromPos(cur);
				var _char = obj.getValue().charAt(_index - 1);
				
				var findTheseWords = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_.".split("");
		
		
				var _index = cm.indexFromPos(cur);
				var _index_0char = cm.indexFromPos({line:cur.line,ch:0});
				
				var start;
				var _char = obj.getValue().charAt(_index-1);
				var available = findTheseWords.indexOf(_char);
				if (available == -1)
					{
					start = cur.ch;
					}
				else if (available != -1)
					{
					var s = 1;
					var loop = true;			
					while(loop)
						{
						var _char = obj.getValue().charAt(_index -s);
						var available = findTheseWords.indexOf(_char);
						if (available == -1)
							{
							start = cur.ch -s+1;
							loop = false;
							}
						s += 1;
						}
					}
				
				var char_at_minus1 = obj.getValue().charAt(cm.indexFromPos({line:cur.line,ch:start-1}));

				var find_this_word = cm.getLine(cur.line).slice(start,cur.ch);
				var available_library = haxe_server.find_in_library(find_this_word);
				//console.log(available_library);
				if (available_library.length > 0)
					{
					var useThis = available_library[0];
					//console.log(useThis);
					var replaceTheText = useThis.split(".").pop();
					editor._cm.doc.replaceRange(replaceTheText,{'line':cur.line,'ch':start},{'line':cur.line,'ch':cur.ch});

					central.event.broadcast("library_completion","editor.library_completion",useThis);
					}
				else
					{
					obj.is_library_completion = false;
					}
			};
			
			
			central.event.listen("library_completion",function(p1,p2)
				{
				
				
				var a = obj.getValue().split("\n");
				var addAtThisPos = 0;
				var library_already_available = false;
				for(each in a){
				
					if (a[each].indexOf(p1.message) != -1)
						{
						library_already_available = true
						}
					
				
					if(a[each].indexOf("import") != -1) {
						addAtThisPos = parseInt(each)+1;
						}
					}				
				if (library_already_available == false)
					{
					obj._cm.doc.replaceRange("import "+p1.message+";\n",{'line':addAtThisPos,'ch':0});
					}
					
				obj.is_library_completion = false;
				});

			CodeMirror.commands.nextTab = function(cm) {
			console.log("next tab");
			var tab_active = $("#editor_tab ul li div.active a").attr("data-path");
			var tab_list = [];
			$("#editor_tab ul li div a").each(function(){
				tab_list.push($(this).attr("data-path"));
				})
				
			var index = tab_list.indexOf(tab_active);
			console.log(index);			
			var index_plus = index+1;

			var show_tab = "";
			if (index_plus < tab_list.length)
				{
				show_tab = tab_list[index_plus];
				console.log(show_tab);
				editor.switch_tab($("#editor_tab ul li div a[data-path='"+show_tab+"']"));
				}
			}
			
			CodeMirror.commands.previousTab = function(cm) {
			console.log("previous tab");
			
			var tab_active = $("#editor_tab ul li div.active a").attr("data-path");
			var tab_list = [];
			$("#editor_tab ul li div a").each(function(){
				tab_list.push($(this).attr("data-path"));
				})
				
			var index = tab_list.indexOf(tab_active);
			
			var index_plus = index+1;
			var index_minus = index-1;
			var show_tab = "";
			if (index_minus >= 0)
				{
				show_tab = tab_list[index_minus];
				editor.switch_tab($("#editor_tab ul li div a[data-path='"+show_tab+"']"));
				}
			
			
			}			


			CodeMirror.commands.completion = function(cm) {
				console.log("completion ctrlspace");
				var cur = obj.getCursor();
				var _index = cm.indexFromPos(cur);
				var _char = obj.getValue().charAt(_index - 1);
				
				var findTheseWords = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_".split("");
		
		
				var _index = cm.indexFromPos(cur);
				var _index_0char = cm.indexFromPos({line:cur.line,ch:0});
				
				var start;
				var _char = obj.getValue().charAt(_index-1);
				var available = findTheseWords.indexOf(_char);
				if (available == -1)
					{
					start = cur.ch;
					}
				else if (available != -1)
					{
					var s = 1;
					var loop = true;			
					while(loop)
						{
						var _char = obj.getValue().charAt(_index -s);
						var available = findTheseWords.indexOf(_char);
						if (available == -1)
							{
							start = cur.ch -s+1;
							loop = false;
							}
						s += 1;
						}
					}
				//console.log(start);
				var char_at_minus1 = obj.getValue().charAt(cm.indexFromPos({line:cur.line,ch:start-1}));
				//console.log(char_at_minus1);
				
				
				if (char_at_minus1 == "(" ) // should fetch haxe completion
					{
					obj.haxeCompletionIsActive = true;
					var _index = cm.indexFromPos({line:cur.line,ch:start});
					central.event.broadcast("FileMenu.saveFile","editor.haxe_completion.js","");
					haxe_server.haxe_completion(_index,central.filesystem.fileActive);	
					var myVar = setInterval(function(myVar)
						{
						if (haxe_server.haxeCompletionResult != "")
							{
							clearMyVar();
							}
						}, 100);
					function clearMyVar()
						{
						clearInterval(myVar);
						cm.showHint({hint: editor.haxeHint,completeSingle:false});
						}
					}
				else
					{
					if (obj.haxeCompletionIsActive == false)
						{
						editor.anywordHint();
						cm.showHint({hint: editor.anywordHint,completeSingle:false});
						}
					}				
				
				
				if (char_at_minus1 == "." ) // should fetch haxe completion
					{
					obj.haxeCompletionIsActive = true;
					var _index = cm.indexFromPos({line:cur.line,ch:start});
					central.event.broadcast("FileMenu.saveFile","editor.haxe_completion.js","");
					haxe_server.haxe_completion(_index,central.filesystem.fileActive);	
					var myVar = setInterval(function(myVar)
						{
						if (haxe_server.haxeCompletionResult != "")
							{
							clearMyVar();
							}
						}, 100);
					function clearMyVar()
						{
						clearInterval(myVar);
						cm.showHint({hint: editor.haxeHint,completeSingle:false});
						}
					}
				else
					{
					if (obj.haxeCompletionIsActive == false)
						{
						var curline_val = cm.getLine(cur.line);
						editor.anywordHint();
						cm.showHint({hint: editor.anywordHint,completeSingle:false});
						}
					}
			};

			/*
			var filename = "blank";
			$("#editor_tab ul").append("<li><div><a onclick='' data-path='"+ encodeURIComponent(filename)+"'>"+filename+"</a>&nbsp;&nbsp;<span onclick='close_this_tab($(this));' class='status_icon glyphicon glyphicon-remove-circle' data-path='"+ encodeURIComponent(filename)+"'></span></div></li>");
			central.editor.active_tab = filename;
			*/
			var content_height = $("#content_position").height();
			var tab_height = $("#editor_tab").height();
			$(".CodeMirror").height( content_height-tab_height+"px" ); // -30 is for the tab
			$("#inspector_position").height( content_height-30+"px" ); // -30 is for the tab
  			}
  		}


		
	obj.create_editor = function()
		{
		openEditor();
		obj.show_tab(central.editor.active_tab);
		obj.haxeHint_roundBracket_hint();
		};
		
	central.editor.isEditorOpened = false;
	return obj;
})(editor);
