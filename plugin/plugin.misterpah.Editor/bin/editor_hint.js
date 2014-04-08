
function inline_hint(line, msg)
{
msg = $('<div class="CodeMirror-linewidget"><div class="lint-error">'+msg+'</div></div>')[0];
return plugin.misterpah.Editor.cm.addLineWidget(line,msg);
}
