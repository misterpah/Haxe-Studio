var haxe_server = (function(obj)
{

function list_of_known_pointofentry(name)
{
ret = {};
// default
ret[name] = '';
ret['flixel-addons'] = 'flixel';
ret['flixel-ui']= 'flixel';

return ret[name];
}


obj.library_completion_pointOfEntry = function(name)
	{
	return list_of_known_pointofentry(name);
	}

return obj;
})(haxe_server);
