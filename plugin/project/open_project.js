var project = (function(obj)
{
	var _c = central;
	var _cp = central.project;

	function checkIfPassedFileIsAProjectFile(filename)
		{
		if (!filename)
			{
			return false;
			}
		var ext = filename.split(".").pop();
		var compiler = "";
		if (ext == "xml")
			{
			compiler = "lime display -hxml flash";
			return compiler;
			}
		else if (ext == "hxml")
			{
			compiler = "%CAT% \""+filename+"\"";
			return compiler;
			}
		else
			{
			console.log("File are not a valid Haxe Project.");
			return false;
			}
		}	
		
	function parseTheProjectForProjectParameters(filename,compiler)
		{
		var folder_for_filename = filename.split(support.node.path.sep);
		folder_for_filename.pop();
		folder_for_filename = folder_for_filename.join(support.node.path.sep);
		_cp.projectFolder = folder_for_filename;
		_cp.projectFile = filename;
		support.exec(["cd %CD% \""+_cp.projectFolder+"\"",compiler],function(error,stdout,stderr)
			{
			var result = {"error":error,"stdout":stdout,"stderr":stderr};
			var stdout = result['stdout'].split("\n");
	
			var output = [];
			for (var i = 0; i< stdout.length;i++)
				{
				var cur = stdout[i];
				if (cur.indexOf("-lib") == 0)
					{
					output.push(cur);
					}
				if (cur.indexOf("-cp") == 0)
					{
					output.push(cur);
					}		
				if (cur.indexOf("-main") == 0)
					{
					output.push(cur);
					}			
				if (cur.indexOf("-D") == 0)
					{
					output.push(cur);
					}
				}
			output = output.join(" ");
			_cp.projectParameter = output;
			_c.filesystem.fileActive = "";
			});		
		}
			
	obj.open_project = function(filename)
		{
		var compiler = checkIfPassedFileIsAProjectFile(filename);
		if (compiler)
			{
			parseTheProjectForProjectParameters(filename,compiler);
			}
		else
			{
			console.log("no project opened");
			}
		}
	return obj;
})(project);
