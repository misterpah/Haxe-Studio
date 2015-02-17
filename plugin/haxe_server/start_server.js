var haxe_server = (function(obj)
{
	var _c = central;
	var _chs = central.haxe_server;

	obj.haxe_server_spawn = "";
	
	function startTheHaxeServerOnPort(port)
		{
		obj.haxe_server_spawn = support.node.spawn("haxe", ["--wait", port]);
		sessionStorage.haxeServerStarted = true;
		}
		
	function killHaxeServer()
		{
		obj.haxe_server_spawn.kill();	
		}
			

	obj.start_haxe_server = function(filename)
		{
		startTheHaxeServerOnPort(config.haxe_port);
		}		
	obj.stop_haxe_server = function()
		{
		killHaxeServer();
		}
		
		
	if (sessionStorage.haxeServerStarted == undefined) // false
		{
		obj.start_haxe_server();
		}		
		
	return obj;
})(haxe_server);
