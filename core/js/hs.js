var hs = (function(obj)
{
	central.hs = {};
	obj.loadAllCoreJS = function()
		{
		loadEverythingInCoreSlashJSFolderWithSomeException();
		}	
	
	function loadEverythingInCoreSlashJSFolderWithSomeException()
		{
		var list_of_files = support.readDir("../core/js");
	
		for (var i = 0;i < list_of_files.length;i++)
			{
			/*
			if(sessionStorage.doNotLoadAgain)
				{
				var doNotLoadAgain = JSON.parse(sessionStorage.doNotLoadAgain);
				if (doNotLoadAgain.indexOf(list_of_files[i]) != -1)
					{
					continue;
					}
				}
			*/		
			// these files were loaded 
			var dontLoadThisFile = [];
			dontLoadThisFile.push("hs.js");
			dontLoadThisFile.push("support.js");
			if (dontLoadThisFile.indexOf(list_of_files[i]) == -1)
				{
				//console.log("loading "+list_of_files[i]);
				support.loadJS("../core/js/"+list_of_files[i]);
				}
			}
		//sessionStorage.doNotLoadAgain = JSON.stringify(["menu.js","server.js"]);
		sessionStorage.isHaxeStudioExecutedBefore = true;
		}
	return obj;
})(hs || {});
