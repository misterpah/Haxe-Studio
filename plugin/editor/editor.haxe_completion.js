var editor = (function(obj)
{

	function haxeHint_update(cm,completion_array)
		{
		if (completion_array.length <1)
			{
			console.log("no completion.stop");
			}
		var cur = obj.getCursor();
		var curLine = cm.getLine(cur.line);
		var start = cur.ch;
		var end = start;
		
		var splitter = [];
		splitter.push(".");
		
		var _index = cm.indexFromPos(cur);
		var _index_0char = cm.indexFromPos({line:cur.line,ch:0});
		var s = 0;
		var loop = true;
		while(loop)
			{
			var _char = obj.getValue().charAt(_index - s);
			var available = splitter.indexOf(_char);
			
			if (available != -1 )
				{
				start = cur.ch -s +1;
				loop = false;
				}
				
			// when completion on the start of the line
			if (_index -s <= _index_0char)
				{
				start = cur.ch -s ;
				loop = false;				
				}
			
			// when the words are too long
			if (s > 128)
				{
				loop = false;
				}
			s+= 1;
			}
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



	
	obj.haxeHint = function (cm,options)
		{
		var _index = cm.indexFromPos(obj.getCursor());
		
		var data = $.xml2json(haxe_server.haxeCompletionResult);
		console.dir(data.i);
		
		var updated_completion = {
			'list':['testing','haxe','completion'],
			'from':obj._cm.getCursor(),
			'to':obj._cm.getCursor()
			}
				
				
		return updated_completion;
		
		
		
		
		
		};
	CodeMirror.registerHelper("hint","haxe", obj.haxeHint);	
		
	return obj;
})(editor);
