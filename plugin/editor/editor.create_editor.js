var editor = (function(obj)
{
	
	
	function openEditor()
  		{
  		if (central.editor.isEditorOpened == false)
  			{
  			//console.log("opening Editor");
			$("body").append("<style>.CodeMirror-dialog-top { position:absolute;right:0px;}</style>");
			$("#editor_position").append("<div id='editor_tab'><ul class='nav nav-tabs'></ul></div>");
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
						"Ctrl-Space": "anywordCompletion"
						}
					});  		

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
