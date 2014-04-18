
function inline_hint(line, msg)
{
msg = $('<div class="CodeMirror-linewidget"><div class="lint-error">'+msg+'</div></div>')[0];
return plugin.misterpah.Editor.cm.addLineWidget(line,msg);
}

function reset_active_tab()
	{
	$("#misterpah_editor_tabs_position a").each(function(){ $(this).parent().removeClass("active"); });
	}

function delete_buffered_document(path)
	{
	delete plugin.misterpah.Editor.doc_buffer[path];
	}

	

