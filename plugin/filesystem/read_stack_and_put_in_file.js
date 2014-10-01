var filesystem = (function(obj)
{
	var _c = central.filesystem;
  	function readStackAndStoreInFile(name)
  		{
  		var path_decoded = decodeURIComponent(name);
  		//console.log(path_decoded);
  		//console.log(_c.fileStack[name].content);
  		support.fileSave(path_decoded,_c.fileStack[name].content);
  		/*
  		if (_c.fileStack[name] != undefined) 
  			{
  			
  			}
  		*/
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
