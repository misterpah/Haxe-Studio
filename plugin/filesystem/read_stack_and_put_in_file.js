var filesystem = (function(obj)
{
	var _c = central.filesystem;
  	function readStackAndStoreInFile(name)
  		{
  		var path_decoded = decodeURIComponent(name);
  		support.fileSave(path_decoded,_c.fileStack[name].content);
  		}
  		
  	obj.saveFile = function(encoded_filename)
  		{
  		var readFile = encodeURIComponent(_c.fileActive);
  		if (encoded_filename)
  			{
  			readFile = encoded_filename;
  			}
  		readStackAndStoreInFile(readFile);
  		}
  	
	return obj;
})(filesystem);
