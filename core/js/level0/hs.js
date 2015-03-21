var hs = (function(obj)
{
	central.hs = {};
	obj.loadAllCoreJS = function()
		{
		loadEverythingInCoreSlashJSFolderWithSomeException();
		}	
		
	obj.loadLevel1 = function()
		{
		return loadLevel1js();
		}
	
	function loadLevel1js()
		{
		var deferred = Q.defer();
		var jsLevel1 = support.readDir("../core/js/level1");
		
		var promises = [];
		for (var i = 0; i < jsLevel1.length;i++)
			{
			promises.push(support.loadJSPromise("../core/js/level1/"+jsLevel1[i]));
			}	
		Q.all(promises).then(function()
			{
			deferred.resolve(["level1 loaded",jsLevel1]);
			});
		return deferred.promise;	
		}
		
	obj.loadLevel2 = function()
		{
		return loadLevel2js();
		}
	
	function loadLevel2js()
		{
		var deferred = Q.defer();
		var jsLevel1 = support.readDir("../core/js/level2");
		
		var promises = [];
		for (var i = 0; i < jsLevel1.length;i++)
			{
			promises.push(support.loadJSPromise("../core/js/level2/"+jsLevel1[i]));
			}	
		Q.all(promises).then(function()
			{
			deferred.resolve(["level2 loaded",jsLevel1]);
			});
		return deferred.promise;	
		}		
		
	
	
	
	

obj.executeFunctionByNameDefered = function (functionName, context,execute /*, args */) {
var defer = Q.defer()

  if (execute == undefined)
  	{
  	execute = true;
  	}
  var args = [].slice.call(arguments).splice(3);
  var namespaces = functionName.split(".");
  var func = namespaces.pop();
  for(var i = 0; i < namespaces.length; i++) {
    context = context[namespaces[i]];
  }
  if (execute == true)
  	{
  	context[func].apply(this, args);
  	defer.resolve(["ok",functionName]);
  	}
  else
  	{
  	context[func];
  	defer.resolve(["fail",functionName]);
  	}
  return defer.promise;
}	


	
	
	
obj.executeFunctionByName = function (functionName, context,execute /*, args */) {
  if (execute == undefined)
  	{
  	execute = true;
  	}
  var args = [].slice.call(arguments).splice(3);
  var namespaces = functionName.split(".");
  var func = namespaces.pop();
  for(var i = 0; i < namespaces.length; i++) {
    context = context[namespaces[i]];
  }
  if (execute == true)
  	{
  	return context[func].apply(this, args);
  	}
  else
  	{
  	return context[func];
  	}
}	
	
obj.load_all_plugins = function()
	{
	return loadAllPlugin();
	}
	
function loadAllPlugin()
	{
	var deferred = Q.defer();
	var plugins = support.readDir("../plugin");
	var promises = [];
	for (var i = 0; i < plugins.length;i++)
		{
		promises.push(support.loadJSPromise("../plugin/"+plugins[i]+"/main.js"));
		}		
	Q.all(promises).then(function()
		{
		deferred.resolve(["plugin loaded",plugins]);
		});
	return deferred.promise;
	};		
	
	
	
obj.init = function()
	{
	Q.fcall(function()
		{
		return hs.loadLevel1();
		})
	.then(function(data)
		{
		//console.dir(data);
		return hs.loadLevel2();
		})
	.then(function(data)
		{
		return hs.load_all_plugins();
		
		})		
	.then(function(data)
		{
		
		var promises = [];
		for (var i = 0; i < data[1].length;i++)
			{
				promises.push(hs.executeFunctionByNameDefered(data[1][i]+".init",window));
				console.log(data[1][i]);
				$("#loadingStatus").html('<p>execute plugin : '+data[1][i]+'</p>')
			}
			
		
		Q.all(promises).then(function(results)
			{
			results.forEach(function(result)
				{
				debug.info ("execute plugin "+result[1]);
				})
			central.event.broadcast("hs.init","hs.js","complete");
			});
		}).done();
	}
	
obj.integrate = function()
	{
	var plugins = support.readDir("../plugin");
	var promises = [];
	for (var i = 0; i < plugins.length;i++)
		{
		var keys = Object.keys(window[plugins[i]]);
		
		if (keys.indexOf("integrate") != -1)
			{
			//console.log("Run integration for plugin "+plugins[i]);
			debug.info ("integrate plugin "+plugins[i]);
			hs.executeFunctionByName(plugins[i]+".integrate",window);
			}
		}	
	$("#loadingStatus").html('<p>loading complete</p>');	
	
	debug.info ("<b>[Haxe Studio Ready]</b>");
	
	setTimeout(function()
		{
		central.event.broadcast("HaxeStudio.ready","hs.js");
		},1000);
	};

	return obj;
})(hs || {});
