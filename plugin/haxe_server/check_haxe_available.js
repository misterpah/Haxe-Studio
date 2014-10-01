var haxe_server = (function(obj)
{
	var _c = central;
	var _chs = central.haxe_server;

	obj.haxe_available = false;
	obj.haxe_version = "";
	var minimum_version = "3";
	
	function isHaxeAvailableAndProperlyConfigured()
		{
		support.exec(["haxe -version"],function(error,stdout,stderr)
			{
			if (stderr.indexOf(minimum_version) == 0)
				{
				obj.haxe_available = true;
				obj.haxe_version = stderr;
				}
			});		
		}
		
	obj.check_haxe_installed = function(filename)
		{
		isHaxeAvailableAndProperlyConfigured();
		}		

	return obj;
})(haxe_server);
