var editor = (function(obj)
{
	var splitted_content = [];
	var status_content = [];

	function endsWith(str, suffix) {
		return str.indexOf(suffix, str.length - suffix.length) !== -1;
	}


	function splitContentWithLineAsSeperator(content)
		{
			splitted_content = content.split("\n");
		}
		
	function checkLinesForPattern()
		{
		
			var ends_with_semicolon = [];
			//remove comment & spaces after semicolon
			for (var i = 0; i < splitted_content.length;i++)
				{
				splitted_content[i] = splitted_content[i].split("//")[0];
				//splitted_content[i] = splitted_content[i].split(" ").pop().join(" ");
				//console.log(splitted_content[i]);
				}
				
			for (var i = 0; i < splitted_content.length;i++)
				{
				var curLine = splitted_content[i];
				ends_with_semicolon[i] = endsWith(curLine,";");
				}			
			
			//
			/*
			for (var i = 0; i < splitted_content.length;i++)
				{
				if (ends_with_semicolon[i] == false)
					{
						// check if it's a newline
						if (splitted_content[i].split(" ")[0] == "")
							{
							status_content[i] = 'ok';
							}
						else if (splitted_content[i].split(" ")[0] == "{")
							{
							status_content[i] = 'ok';
							}
						else
							{
							status_content[i] = 'ko';
							}
					}
				}
			*/
		}



	

	obj.check_syntax_haxe = function()
		{
		splitContentWithLineAsSeperator(obj.getValue());
		checkLinesForPattern()
		}
	return obj;
})(editor);
