var editor = (function(obj)
{
	var splitted_content = [];
	var status_for_the_splitted_content_semicolon = [];
	var error_for_the_splitted_content = [];


	function endsWith(str, suffix) {
		return str.indexOf(suffix, str.length - suffix.length) !== -1;
	}


	function splitContentWithLineAsSeperatorAndThenWithSpaceAsSeperator(content)
		{
			var content = content.split("\n");
			
			for (var i = 0;i < content.length;i++)
				{
				var curLine = content[i];
				var cur_line_splitted_by_space = curLine.split(" ");
				splitted_content.push(cur_line_splitted_by_space);
				}
				
			// remove comment from the content;
			for (var i = 0; i < splitted_content.length;i++)
				{
				var curLine = splitted_content[i];
				console.log(curLine);
				for (var j = 0;j < curLine.length;j++)
					{
					if(curLine[j].indexOf("//"))
						{
						break;
						}
					}
				if (j > 0)
					{
					console.log(i);
					splitted_content[i] = curLine.splice(0,j);
					}
				}
		}
	
	function checkEndsWithSemicolon()
		{
		for (var i = 0;i < splitted_content.length;i++)
			{
			var curLine = splitted_content[i];
			var endWordInTheLine = curLine[curLine.length -1];
			status_for_the_splitted_content_semicolon[i] = endsWith(endWordInTheLine,";");
			}
		}
		
	function checkWhyForLinesWithNoSemicolon()
		{
		var no_error = false;
		var have_error = true;
		
		for (var i = 0;i < status_for_the_splitted_content_semicolon.length;i++)
			{
			var curLine = status_for_the_splitted_content_semicolon[i];
			if (curLine == true)
				{
				error_for_the_splitted_content[i] = no_error;
				}
			else if (curLine == false)
				{
				// check if the line is space
				if (splitted_content[i][0] == "" | splitted_content[i][0] == "\t")
					{
					error_for_the_splitted_content[i] = no_error;
					}
				else
					{
					error_for_the_splitted_content[i] = have_error;
					}
				}
			}		
		
		}
		
	function displayTheErrorLines()
		{
		for (var i = 0;i < error_for_the_splitted_content.length;i++)
			{
			if (error_for_the_splitted_content[i] == true)
				{
				console.log(splitted_content[i]);
				}
			}
		}


	

	obj.check_syntax_haxe = function()
		{
		splitContentWithLineAsSeperatorAndThenWithSpaceAsSeperator(obj.getValue());
		checkEndsWithSemicolon()
		checkWhyForLinesWithNoSemicolon();
		displayTheErrorLines();
		//return error_for_the_splitted_content;
		}
	return obj;
})(editor);
