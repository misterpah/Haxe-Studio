var editor = (function(obj)
{
	obj.haxeCompletionIsActive = false;
	obj.anyWordCompletionIsActive = false;
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
						"Cmd-Space": "completion"
						}
					});  		
			
			obj._cm.on("change",function(cm)
				{
				var _char = obj.getValue().charAt(cm.indexFromPos(cm.getCursor()) -1);
				var triggerAnywordCompletion = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_".split("");
				var availableInWords = triggerAnywordCompletion.indexOf(_char);

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
				console.log(start);
				var char_at_minus1 = obj.getValue().charAt(cm.indexFromPos({line:cur.line,ch:start-1}));
				console.log(char_at_minus1);
				
				
				
				
				
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
		};
		
	central.editor.isEditorOpened = false;
	return obj;
})(editor);
