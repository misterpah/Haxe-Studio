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
		
		//var splitter = [];
		//splitter.push(".");
		
		var findTheseWords = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_".split("");
		
		
		var _index = cm.indexFromPos(cur);
		var _index_0char = cm.indexFromPos({line:cur.line,ch:0});
		//console.log(_index);

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
				//console.log(_char+" "+available); 
				if (available == -1)
					{
					start = cur.ch -s+1;
					loop = false;
					}
				s += 1;
				}
			}
		
		/*
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
		*/
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
		//var _index = cm.indexFromPos(obj.getCursor());

		
		// setting up position
		var cur = obj.getCursor();
		var findTheseWords = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_1234567890".split("");
		
		var _index = cm.indexFromPos(cur);
		var _index_0char = cm.indexFromPos({line:cur.line,ch:0});
		//console.log(_index);

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
		


		
		var data = $.xml2json(haxe_server.haxeCompletionResult);

		
		
		
		if (typeof data == "string")
			{
			showThisList = [data];
			}
		else
			{
			var availableCompletion = [];
			if (data.i.length == undefined)
				{
				availableCompletion = [data.i.n];
				}
			else
				{
				for (var i = 0;i < data.i.length;i++)
					{
					availableCompletion.push(data.i[i].n);
					}
				}
		
		console.dir(availableCompletion);
		console.log(typeof availableCompletion);		
		
			var showThisList = []
			
			if ( availableCompletion.length >0)
				{
				showThisList = availableCompletion;
				}
			else
				{
				showThisList = ["no completion found"];
				}
			
			
			if (showThisList[0] != "no completion found")
				{
				var ret = haxeHint_update(obj._cm,showThisList);	
				showThisList = ret.list;
				}
			}
	
		var updated_completion = {
			'list':showThisList,
			'from':CodeMirror.Pos(cur.line,start),
			'to':obj._cm.getCursor()
			}
				
				
		return updated_completion;
		
		
		
		
		
		};
		


obj.haxeHint_roundBracket_hint = function ()
	{
	
	obj._cm.on("completionSelected",function()
		{
		$("#completion_desc").css("display","block");
		//console.log('completionSelected');
		//.offset()
		var data = $.xml2json(haxe_server.haxeCompletionResult);
		var n = $(".CodeMirror-hint-active").html();
		
		for (each in data.i) 
			{ 
			//console.log(data.i[each]);
			
			//console.log(prefix.hx_completion_list_all[each].n)
			if (data.i[each].n == n)
				{
				var str= data.i[each].d;
				str = str.split("*");
				str = str.join("<br/><br/>");
				$("#completion_desc").html("<b>"+data.i[each].n+"</b><br/><small>"+data.i[each].t+"</small><p>"+str+"</p>");	
				}
			}	
			
			
		});
	
	
	
	obj._cm.on("completionShowed",function()
		{
		CodeMirror.signal(obj._cm, "completionSelected", obj._cm);
		
		var w = Math.ceil($(".CodeMirror-hints").offset().left + $(".CodeMirror-hints").width()) +20;
		var h = $(".CodeMirror-hints").offset().top;
		$("#completion_desc").css("top",h+"px");
		$("#completion_desc").css("left",w+"px");
				
		});

	obj._cm.on("startCompletion",function()
		{
		//console.log('startCompletion');
		if (!obj.haxeCompletionIsActive)
			{
			return;
			}
		var ret = [];
		ret.push("<div class='custom_completion well' style='display:none;z-index:999;position:absolute;width:300px;max-height:200px;overflow-y:scroll;' id='completion_desc'>");
			ret.push("<p>anyword completion</p>");
		ret.push("</div>");
		ret = ret.join("\n");


	
		$("body").append(ret);
	
		$("#completion_desc").css("top",$(".CodeMirror textarea").offset().top+10+"px");
		$("#completion_desc").css("left",$(".CodeMirror textarea").offset().left+280+"px");
		//prefix.cm.addWidget({line:prefix.cm.doc.getCursor().line-5,ch:prefix.cm.doc.getCursor().ch},$(ret)[0]);		


		var data = $.xml2json(haxe_server.haxeCompletionResult);
		var n = $(".CodeMirror-hint-active").html();
		});
		
	obj._cm.on("endCompletion",function()
		{
		//console.log('endCompletion');
		$("#completion_desc").remove();	
		});		
		
	}		
		
		
		
	CodeMirror.registerHelper("hint","haxe", obj.haxeHint);	
	
	return obj;
})(editor);
