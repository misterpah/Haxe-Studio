function haxeHint(cm,options)
  {
  cm = plugin.misterpah.Editor.cm;

  var haxe_completion = plugin.misterpah.Editor.completion_list;
  var cur = cm.getCursor();

  var updated_completion = update_completion(cm,haxe_completion);
  return updated_completion;
  }


function update_completion(cm,completion_array)
{
  var cur = cm.getCursor();
  var start = CodeMirror.Pos(cur.line,parseInt(sessionStorage.cursor_pos));  
  var end = CodeMirror.Pos(cur.line,cur.ch);

  var value = cm.getRange(start,end);
  
  var new_completion = [];
  for (var i = 0;i < completion_array.length;i++)
    {
      var cur_completion = completion_array[i];
      if (cur_completion.indexOf(value) == 0)
        {
          new_completion.push(cur_completion);
        }
    }  

  return {list:new_completion,from:start,to:end};
}

CodeMirror.registerHelper("hint","haxe", haxeHint);
