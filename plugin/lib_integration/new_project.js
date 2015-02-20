var lib_integration = (function(obj)
{
	var _c = central;
	var _cp = central.lib_integration;

	obj._windowObj_NewProject = "";
	
	
	
	obj.create_project = function(libraryName,projectPath,projectVar)
		{
		console.log(libraryName);
		console.log(projectPath);
		console.dir(projectVar);
		var sep = support.node.path.sep;
		//project_obj.projectName = projectVar;
		//project_obj.projectBase = projectBase;
		var folder = projectPath + sep + projectVar['Name'];
		if (support.node.fs.existsSync(folder))
			{
			//exists
			//alert("Folder Name Clashed. Please choose another project Name");
			debug.error("There's already project with that name.");
			return;
			}
		support.node.fs.mkdirSync(folder);
		//console.log(obj.plugin_path + sep +"template"+sep+ libraryName + sep + "project_template");
		support.node.fs.copySync(support.node.path.resolve(obj.plugin_path + sep +"template"+sep+ libraryName + sep + "project_template"),folder);
		//console.log('finish copied');
		
		// APPLY TO RELATED FILES
		var libConfigJson = JSON.parse(support.fileRead(obj.plugin_path +"/template/"+libraryName+"/config.json"));
		console.log(libConfigJson);
		
		
		
		var apply_to_these_files = libConfigJson['apply_template_variables'];
		var template_variables = libConfigJson['template_variables'];
		
		var template_variables_with_prefix = [];
		for (each in template_variables)
			{
			template_variables_with_prefix.push([each, "%"+libraryName.toUpperCase() + ":"+ each.toUpperCase()+"%"] );
			}

		//console.log(template_variables_with_prefix);
		for (var i = 0; i < apply_to_these_files.length;i++)
			{
			var cur = projectPath + sep + projectVar['Name'] +  sep + apply_to_these_files[i];
			
			var cur_content = support.fileRead(cur);
			console.log(cur_content);

			for (var j = 0; j < template_variables_with_prefix.length;j++)
				{
				var var_to_replace = template_variables_with_prefix[j][0];
				var value_var_to_replace = projectVar[var_to_replace];
				cur_content = cur_content.replace(template_variables_with_prefix[j][1],value_var_to_replace);
				}
			support.fileSave(cur,cur_content);
			}
		debug.info("project created!");	
		
		if (typeof project == undefined)
			{
			debug.error("Plugin 'Project' not found!");
			return;
			}
		central.event.broadcast("FileMenu.openProjectDirect","lib_integration:create_project",projectPath+sep+projectVar['Name']+sep+libConfigJson['project_file']);
		};
	
	
	obj.newProjectWindowConfigure = function(newProjectResult)
		{
		var available_library = support.readDir(obj.plugin_path +"/template");
		
		var configJson = {};
		for (var i = 0;i < available_library.length;i++)
			{
			var libName = available_library[i];
			var libConfigJson = JSON.parse(support.fileRead(obj.plugin_path +"/template/"+libName+"/config.json"));
			
			var libPath = obj.plugin_path +"/template/"+libName;
			libConfigJson['path'] = libPath;
			configJson[libName] = libConfigJson;
			}
		console.log(configJson)
		
		if (newProjectResult['library_to_use'] == "null")
			{
			debug.debug("no library chosen");
			return ;
			}
		var currentLibrary = configJson[newProjectResult['library_to_use']];
				

		var content = 
		['<div id="metawidget">',
		'<h2 class="text-center">'+newProjectResult['library_to_use']+'</h2>',
		'<div class="text-center"><img width="100px" src="'+currentLibrary['path']+'/'+currentLibrary['image']+'"/></div>',
		'<br/>',
		'<input class="form-control" name="projectFolder" id="projectFolder" style="width:100%" type="file" nwdirectory />',
		'<div id="metawidget_container"></div>',
		'</div>',
		'<style>',
		'.metawidget_parent',
		'{',
		'padding-bottom:10px;',
		'}',
		'</style>'].join("\n");			

		

		support.build_modal("New Project : Configuration",content,function()
			{
			
			var temp = {}

			for (var i = 0;i< $("#genModal input").length;i++)
				{
				name =  $("#genModal input")[i].name;
				value = $("#genModal input")[i].value;
				temp[name] = value;
				}
				
			var projectFolder = $("#genModal #projectFolder").val()
			
			if (sessionStorage.genModalClicked == "true")
				{
				obj.create_project(newProjectResult['library_to_use'],projectFolder,temp);
				}
			},"Create !");
			
		var mw = new metawidget.Metawidget( document.getElementById( 'metawidget_container' ),{layout:new metawidget.bootstrap.layout.BootstrapDivLayout({'divStyleClasses':['metawidget_parent'],'labelStyleClass':"metawidget_label"})});
		mw.toInspect = currentLibrary['template_variables'];
		mw.buildWidgets();	
		}

	
	obj.openNewProjectWindow = function()
		{
		var available_library = support.readDir(obj.plugin_path +"/template");
		
		var available_library_string = "";
		available_library_string += "<option value='null'>Choose Library</option>";
		for (var z = 0; z < available_library.length;z++)
			{
			available_library_string += "<option value='"+available_library[z]+"'>"+available_library[z]+"</option>";
			}


		
		var content = 
		['<div id="metawidget">',
		'<p>Choose library</p>',
		'		<select id="library_to_use">',
		available_library_string,
		'		</select>',
		'</div>',
		'<style>',
		'.metawidget_parent',
		'{',
		'padding-bottom:10px;',
		'}',
		'</style>'].join("\n");		
		
		support.build_modal("New Project",content,function()
			{
			var temp = {}

			for (var i = 0;i< $("#genModal input").length;i++)
				{
				name =  $("#genModal input")[i].name;
				value = $("#genModal input")[i].value;
				temp[name] = value;
				}
				
			temp['library_to_use'] = $("#genModal #library_to_use").val();
			
			
			if (sessionStorage.genModalClicked == "true")
				{
				setTimeout(function()
					{
					obj.newProjectWindowConfigure(temp);
					},500);				
				}			
			
			//console.log(temp);
			
			},"Next");

		var mw = new metawidget.Metawidget( document.getElementById( 'metawidget' ),{layout:new metawidget.bootstrap.layout.BootstrapDivLayout({'divStyleClasses':['metawidget_parent'],'labelStyleClass':"metawidget_label"})});
		mw.toInspect = {};
		mw.buildWidgets();	
		
		}
		
	return obj;
})(lib_integration);
