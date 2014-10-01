var hs = (function(obj)
{


	
function scanPluginFolderForListOfPlugin()
	{
	central.hs.available_plugin = [];
	central.hs.available_plugin = support.readDir("../plugin");
	};	
	
function loadAllPluginFromCentralHsAvailable_plugin()
	{
	central.hs.loaded_plugin = [];
	for (var i = 0;i < central.hs.available_plugin.length;i++)
		{
		//console.log("loading plugin "+central.hs.available_plugin[i]);
		support.loadJS("../plugin/"+central.hs.available_plugin[i]+"/main.js");
		central.hs.loaded_plugin.push(central.hs.available_plugin[i]);
		}
	};	

function executeFunctionByName(functionName, context,execute /*, args */) {
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


function initializeAllLoadedPlugin()
	{
	for (var i = 0 ; i < central.hs.loaded_plugin.length;i++)
		{
		executeFunctionByName(central.hs.loaded_plugin[i]+".init",window);
		}
	}
	
function registerAllPluginServicesIntoCentral()
	{
	for (var i = 0 ; i < central.hs.loaded_plugin.length;i++)
		{
		var available_services = executeFunctionByName(central.hs.loaded_plugin[i]+".services",window,false);
		for (key in available_services)
			{
				if (available_services.hasOwnProperty(key)) 
					{
					central.services[key] = executeFunctionByName(central.hs.loaded_plugin[i]+".services."+key,window,false);
					}
			}
		}	
	}


obj.init = function()
	{
	scanPluginFolderForListOfPlugin();
	loadAllPluginFromCentralHsAvailable_plugin();
	initializeAllLoadedPlugin();
	
	
	// openup all the default
	//cant use this. inter-plugin communication are prohibited.
	//registerAllPluginServicesIntoCentral();
	}
	
	

return obj;
})(hs);
	

