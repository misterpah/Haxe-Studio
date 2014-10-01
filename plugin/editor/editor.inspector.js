var editor = (function(obj)
{
	function lexForSpecialInterestWords ()
	{
	var lexer_object = [];
	var loop = true;
	var lexer_line = 0;
	while (loop)
		{
		var input = obj._cm.getLine(lexer_line);
		//console.dir(input);
		if (input == undefined | input == null)
			{
			loop = false;
			continue;
			}
		if(input.match(/(.*)var\s(.*)?(=|;)/))
			{
			lexer_object.push({"type":"variable","data":input.match(/(.*)var\s(.*)?(=|;)/)[0],"line":lexer_line});
			}
		else if(input.match(/(.*)function(.*)/))
			{
			lexer_object.push({"type":"function","data":input.match(/(.*)function(.*)/)[0],"line":lexer_line});
			}
		else if(input.match(/(.*)class(.*)?(\n|{)/))
			{
			lexer_object.push({"type":"class","data":input.match(/(.*)class(.*)?(\n|{)/)[0],"line":lexer_line});
			}				
		else if(input.match(/(.*)typedef\s(.*)?(=|;)/))
			{
			lexer_object.push({"type":"typedef","data":input.match(/(.*)typedef\s(.*)?(=|;)/)[0],"line":lexer_line});
			}				
		lexer_line += 1;
		}
	return lexer_object;
	}



	function addLexToSidebar(lexer_object)
		{
		for (var i = 0; i < lexer_object.length; i++)
			{
			var each = lexer_object[i];
			if (each.type == "class")
				{
				level = 1;
				level_prefix = '<span class="label label-primary">C</span>';
				}
				
			else if (each.type == "function")
				{
				level = 2;
				level_prefix = '<span class="label label-warning">F</span>';
				}
				
			else if (each.type == "variable")
				{
				level = 3;
				level_prefix = '<span class="label label-success">V</span>';
				}
			else if (each.type == "typedef")
				{
				level = 1;
				level_prefix = '<span class="label label-primary">T</span>';
				}					
			var level_prefix2 = "";
			for (var j = 0;j< level;j++)
				{
				level_prefix2 += "";
				}
			level_prefix = level_prefix2 +level_prefix;
			
			var data = each.data;
			
			if (data.indexOf("=") >-1)
				{
				data = data.split("=")[0];
				}
			if (data.indexOf("(") >-1)
				{
				data = data.split("(")[0];
				}
			if (data.indexOf(":") >-1)
				{
				data = data.split(":")[0];
				}						
			if (data.indexOf("extends") >-1)
				{
				data = data.split("extends")[0];
				}	
			if (data.indexOf(";") >-1)
				{
				data = data.split(";")[0];
				}									
				
			if (data.indexOf("var ") >-1)
				{
				data = data.replace("var "," ");
				}	
			if (data.indexOf("class ") >-1)
				{
				data = data.replace("class "," ");
				}							
			if (data.indexOf("{") >-1)
				{
				data = data.replace("{","");
				}											
						
			if (data.indexOf("typedef ") >-1)
				{
				data = data.replace("typedef "," ");
				}					
			if (data.indexOf("function ") >-1)
				{
				data = data.replace("function "," ");
				}				
			if (data.indexOf("public") >-1)
				{
				data = data.replace("public",'<span class="label label-primary">P</span> ');
				}						
			if (data.indexOf("private") >-1)
				{
				data = data.replace("private",'<span class="label label-default">Pvt</span> ');
				}
			if (data.indexOf("static") >-1)
				{
				data = data.replace("static",'<span class="label label-default">S</span> ');
				}										
			if (data.indexOf("macro ") >-1)
				{
				data = data.replace("macro ",'<span class="label label-danger">M</span> ');
				}	
			if (data.indexOf("override") >-1)
				{
				data = data.replace("override",'<span class="label label-danger">Ovr</span> ');
				}																															

				
			
			$("#inspector_position").append(""+level_prefix+" <a href='#' onclick='editor.setCursor("+each.line+",0);'>"+data+"</a><br/>")
			}		
		}



	var lex_obj;
	obj.show_inspector = function()
		{
		lex_obj = lexForSpecialInterestWords();
		//console.dir(lex_obj);
		$("#inspector_position").html("");
		addLexToSidebar(lex_obj);
		
		//return lex_obj;
		//return obj._cm.getValue();
		}
		
		
	return obj;
})(editor);
