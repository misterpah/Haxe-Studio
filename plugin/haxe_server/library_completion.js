var haxe_server = (function(obj)
{
	var _c = central;
	var _chs = central.haxe_server;

	obj.available_library = {};
	//obj.available_class_in_library = {};
	_c.haxe_server.available_class_in_library = {};
	central.event.listen("project.open_project:project_loaded",function()
		{
		obj.library_completion();
		})
	
	function getLibraryCompletion()
		{
		var deferred = Q.defer();
		support.exec([
			"cd %CD% %QUOTE%"+central.project.projectFolder+"%QUOTE%",
			"lime display -hxml flash "
			],function(p1,p2,p3){
				if (p1 == null) // no error
					{
					deferred.resolve([p1,p2,p3]);
					}
				else if (p1 != null)
					{
					debug.error("<b>[Library completion Error]</b><br/>"+p3);
					deferred.resolve(['error']);
					}
			});
		return deferred.promise;
		}
		
		
	function fetchAllFiles()
		{
		var ret = {};
		for (key in obj.available_library)
			{
			var temp = lsr.sync(obj.available_library[key]);
			ret[key] = temp;
			}
		return ret;
		}
		
	obj.library_completion = function()
		{
		build_library_completion();
		setTimeout(function()
			{
			//console.log(obj.available_library);
			obj.scan_library();
			console.log(obj.available_class_in_library);
			},2000);
		}		


	obj.scan_library = function()
		{
		var file_only = [];
		var file_stat = fetchAllFiles();
		for (key in file_stat)
			{
			for (var i = 0;i < file_stat[key].length;i++)
				{
				if(file_stat[key][i].isFile())
					{
					var path = file_stat[key][i]['path'];
					if (path.endsWith(".hx") == false)
						{
						continue;
						}
					path = path.split(support.node.path.sep);
					path.pop();
					path.shift();
					path = path.join(".");
					
					var name = file_stat[key][i]['name'].split(".")[0];
					
					var lib = [key,path,name].join(".");
					
					var point_of_entry = obj.library_completion_pointOfEntry(key);
					if (point_of_entry != "")
						{
						//var point_of_entry = obj.library_completion_pointOfEntry(lib_name);
						var lib = [point_of_entry,path,name].join(".");
						}
					
					lib = lib.replace("..",".");
					file_only.push(lib);
					}
				}
			}
		_c.haxe_server.available_class_in_library = file_only;
		}
		
	obj.find_in_library = function(text)
		{
		var ret = []
		for (var i = 0; i < _c.haxe_server.available_class_in_library.length;i++)
			{
			var cur = _c.haxe_server.available_class_in_library[i];
			cur = cur.toLowerCase();
			//console.log(cur +" ,"+ )
			if (cur.indexOf(text.toLowerCase()) != -1)
				{
				ret.push(_c.haxe_server.available_class_in_library[i]);
				}
			}
		return ret;
		}	

		
	function build_library_completion ()	
		{
		
		Q.fcall(function()
			{
			return getLibraryCompletion();
			})
		.then(function(data)
			{
			if (data[0] == null) // okey!
				{
				var param = data[1].split("\n");
				
				var scan_folders = [];
				for (var i = 0;i < param.length;i++)
					{
					if (param[i].indexOf("-cp ") == 0)
						{
						scan_folders.push(param[i].split("-cp ")[1]);
						}
					}
				return scan_folders;
				}
			else
				{
				return false;
				}
			})
		.then(function(data)
			{
			
			for (var i = 0; i < data.length;i++)
				{
				value = data[i];
				if (support.node.fs.existsSync(value + support.node.path.sep+"haxelib.json") )
					{
					var lib_name = JSON.parse(support.node.fs.readFileSync(value + support.node.path.sep+"haxelib.json")).name;
					var path = value +""+ support.node.path.sep +""+ lib_name ;
					console.log(lib_name);
					var point_of_entry = obj.library_completion_pointOfEntry(lib_name);
					if (point_of_entry != "")
						{
						path_split = path.split(support.node.path.sep)
						path_split.pop()
						path = path_split.join(support.node.path.sep);
						path = path +support.node.path.sep+ point_of_entry;
						}
					console.log(path);
					if (support.node.fs.existsSync(path))
						{
						obj.available_library[lib_name] = path;
						}
					}
				}
			
			})
		.done();
			/*
		.then(function(data)
			{
			
			var defer2 = Q.defer();
			Q.forEach(data, function (value) {
			  var defer = Q.defer();
			  setTimeout(function () {
				defer.resolve(lsr(value));
			  },100);
			  return defer.promise;
			}).then(function (resolutions)
			{
			  defer2.resolve(resolutions);
			  //console.log('All 5 items completed!',resolutions); // Will output the order in which items were done... [5,4,3,2,1]
			});			
			return defer2.promise;
					
			var ret = {};
			for (var i= 0;i< data.length;i++)
				{
				ret[data] = lsr(data[i]);
				}
			return ret;
			
			})
			
		.then(function(data)
			{
			console.log(data);
			})

		.then(function(data)
			{
			console.log(data);
			for (var i = 0;i < data.length;i++)
				{
				var cur = data[i];
				for (var j = 0; j < cur.length;j++)
					{
					if( cur[j].endsWith(".hx"))
						{
						console.log(cur[j]);
						cur[j].split(support.node.path.sep).pop()
						
						}
					
					}
				}
			})
			*/
		//getHaxeCompletion(config.haxe_port,position,filename);
		}		
	return obj;
})(haxe_server);
