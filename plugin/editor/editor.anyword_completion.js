var editor = (function(obj)
{
obj.library_completion = false;
function scanWordsInEditor()
	{
		var content = obj.getValue();
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


	function anywordHint_update(cm,completion_array)
		{
		if (completion_array.length <1)
			{
			console.log("no completion.stop");
			}
		var cur = obj.getCursor();
		var curLine = cm.getLine(cur.line);
		var start = cur.ch;
		var end = start;
		//console.log(curLine);
		//console.log(cur.ch);
		
		var splitter = [];
		/*
		~!@#$%^&*()_+{}|:"<>?`-=[]\;',./
		*/
		
		splitter.push("~");
		splitter.push("!");
		splitter.push("@");
		splitter.push("#");
		splitter.push("$");
		splitter.push("%");
		splitter.push("^");
		splitter.push("&");
		splitter.push("*");
		splitter.push("(");
		splitter.push(")");
		splitter.push("_");
		splitter.push("+");
		splitter.push("{");
		splitter.push("}");
		splitter.push("|");
		splitter.push(":");
		splitter.push("\"");
		splitter.push("<");
		splitter.push(">");
		splitter.push("?");
		splitter.push("`");
		splitter.push("-");
		splitter.push("=");
		splitter.push("[");		
		splitter.push("]");
		splitter.push("\\");
		splitter.push(";");
		splitter.push("'");
		splitter.push(",");
		splitter.push(".");
		splitter.push("/");

		splitter.push(" ");
		splitter.push("\t");
		splitter.push("\r");
		splitter.push("	");
		

		var triggerAnywordCompletion = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_".split("");
		
		
		var _index = cm.indexFromPos(cur);
		var _index_0char = cm.indexFromPos({line:cur.line,ch:0});
		//console.log(_index);

		var _char = obj.getValue().charAt(_index-1);
		var available = triggerAnywordCompletion.indexOf(_char);
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
				var available = triggerAnywordCompletion.indexOf(_char);
				//console.log(_char+" "+available); 
				if (available == -1)
					{
					start = cur.ch -s+1;
					loop = false;
					}
				s += 1;
				}
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



	
	obj.anywordHint = function (cm,options)
		{
		var anyword_completion = scanWordsInEditor();
		//console.log(anyword_completion);
		if (anyword_completion != undefined)
			{
			var updated_completion = anywordHint_update(obj._cm,anyword_completion);
			}
		else
			{
			var updated_completion = [];
			}
		return updated_completion;
		};
	CodeMirror.registerHelper("hint","anyword", obj.anywordHint);	





		
	return obj;
})(editor);
