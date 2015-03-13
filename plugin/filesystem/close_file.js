var filesystem = (function(obj)
{
	var _c = central.filesystem;
  	function closeTheFileAndRemoveItFromFileStack(name)
  		{
  		if (name == "")
  			{
  			console.log("no file selected!");
  			return;
  			}
  		var path_encoded = encodeURIComponent(name);
  		delete _c.fileStack[path_encoded];
  		central.event.broadcast("filesystem.closeFile","filesystem",name);
  		}
  		
  	obj.closeFile = function(optional_filename)
  		{
  		var readFile = _c.fileActive;
  		if (optional_filename)
  			{
  			readFile = optional_filename;
  			}
  		closeTheFileAndRemoveItFromFileStack(readFile);
  		}
  	
	return obj;
})(filesystem);
