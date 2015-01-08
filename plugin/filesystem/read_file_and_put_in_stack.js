var filesystem = (function(obj)
{
	var _c = central.filesystem;
  	function readFileAndStoreInStack(name)
  		{
  		var deferred = Q.defer();
  		if (name == "")
  			{
  			//console.log("no file selected!");
  			return;
  			}
  		var path = support.node.fs.realpathSync(name);
  		//console.log(path);
  		var path_encoded = encodeURIComponent(path);
  		if (_c.fileStack[path_encoded] == undefined) 
  			{
  			// the file isn't opened yet
  			var content = support.fileRead(path);
  			_c.fileStack[path_encoded] = {'content':content}
  			}
  		else
  			{
  			// file opened before this
  			}
  		obj.fileActive = path;
  		deferred.resolve(path);
  		return deferred.promise;
  		// must have a way to notify privately within the module 
  		}
  		
  	obj.readFile = function(optional_filename)
  		{
  		var readFile = _c.fileActive;
  		if (optional_filename)
  			{
  			readFile = optional_filename;
  			}
  		//readFileAndStoreInStack(readFile);
  		return Q.fcall(readFileAndStoreInStack,readFile);
  		}
  	
	return obj;
})(filesystem);
