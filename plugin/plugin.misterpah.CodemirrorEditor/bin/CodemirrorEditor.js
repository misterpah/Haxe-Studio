// no DOM leaking, no worries
(function(){
	$("body").append("<style>.CodeMirror-dialog-top { position:absolute;right:0px;}</style>");
	$("#editor_position").append("<div id='plugin_misterpah_CodemirrorEditor_tab'><ul class='nav nav-tabs'></ul></div>");
	$("#editor_position").append("<div id='plugin_misterpah_CodemirrorEditor_editor'><textarea id='cm_textarea'></textarea></div>");
	$("#plugin_misterpah_CodemirrorEditor_editor").css("display","none");
	plugin.misterpah.CodemirrorEditor.cm_buffer = {};
	plugin.misterpah.CodemirrorEditor.cm = CodeMirror.fromTextArea( $("#cm_textarea")[0],
																   {
																	   keyMap : "sublime",
																	   lineNumbers:true,
																	   indentUnit:4,
																	   tabSize:4,     	
																	   indentWithTabs:true,
																	   cursorHeight:0.85,
																	   mode:'haxe', 
																	   theme:'monokai',
																	   viewportMargin: Infinity,
																	   matchBrackets:true,
																	   autoCloseBrackets:true,
																	   foldCode:true,
																	   foldGutter:true,
																	   styleActiveLine:true,
																	   showCursorWhenSelecting: true
																   });

	


	
// codemirror uses buffer to keep track document.
// return true if document not opened yet
// return false if document already opened
function make_cm_buffer(name,text,mode)
{
	name = encodeURIComponent(name);
	if (plugin.misterpah.CodemirrorEditor.cm_buffer[name] == null)
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
	if (plugin.misterpah.CodemirrorEditor.cm_buffer[name] != null)
		{
		plugin.misterpah.CodemirrorEditor.cm_buffer[name] = undefined;
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
plugin.misterpah.CodemirrorEditor.show_me_tab = function (name,mode){
	//console.log("executed!");
	//console.log(name);
	display_buffer(name);
	// makes the active tab not-active
	$("#plugin_misterpah_CodemirrorEditor_tab a").each(function(){$(this).parent().removeClass("active")});
	
	Main.session.active_file = name;	
	
	// add active class to user-chosen
	$("#plugin_misterpah_CodemirrorEditor_tab a[data-path='"+encodeURIComponent(name)+"']").parent().addClass("active");
	
	// resize codemirror to ensure size is correct
	Main.message.broadcast("core:center_resized","plugin.misterpah.CodemirrorEditor:js:CodemirrorEditor.js");
	}


// save changes made into the Main.file_stack before saving it
Main.message.listen("core:FileMenu.saveFile","plugin.misterpah.CodemirrorEditor:js:CodemirrorEditor.js",function(){
	// get changes from cm_buffer
	var content_from_buffer = plugin.misterpah.CodemirrorEditor.cm_buffer[encodeURIComponent(Main.session.active_file)].cm.getValue();

	// get active_file 's file_obj
	var file_obj = Main.file_stack.find(Main.session.active_file);

	// update content of active_file
	Main.file_stack.update_content(Main.session.active_file,content_from_buffer);
	
	// trigger active file to save
	Main.message.broadcast("plugin.misterpah.FileAccess:saveFile","plugin.misterpah.CodemirrorEditor:js:CodemirrorEditor.js");
});


// this function will listen for opened files and will display in the Editor
Main.message.listen("plugin.misterpah.FileAccess:open_file.complete","plugin.misterpah.CodemirrorEditor:js:CodemirrorEditor.js",function(){
	console.log("opening console");
	// display editor if it's not visible
	if ($("#plugin_misterpah_CodemirrorEditor_editor").css("display") == "none")
		{
		$("#plugin_misterpah_CodemirrorEditor_editor").css("display","block");
		}
		
	//console.log("opened!");
	
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
	if (not_opened_yet == true)
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
Main.message.listen("plugin.misterpah.FileAccess:close_file.complete","plugin.misterpah.CodemirrorEditor:js:CodemirrorEditor.js",function(){
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
	
	
	
})();


