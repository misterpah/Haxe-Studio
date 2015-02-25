var lib_integration = (function(obj)
{
	
	obj.new_class = function()
		{
		//console.log('new class');
		var filename = "";
		
		var sep = support.node.path.sep;
		var showEverything = true;
		var configJson = {};
		var snipets_list = [];
		if (support.node.fs.existsSync(central.project.projectFolder+"/haxestudio.config"))
			{
			
			try
				{
				configJson = JSON.parse(support.fileRead(central.project.projectFolder+"/haxestudio.config"));
				var snipets_dir_list = support.readDir(obj.plugin_path+sep+"template"+sep+configJson['base_library']+sep+"snipets");

				for (var i = 0; i < snipets_dir_list.length;i++)
					{
					var name = snipets_dir_list[i].split(".")[0];
					snipets_list[name] = name;
					}

				showEverything = false;
				}
			catch(err)
				{
				debug.debug("malformed haxestudio.json");
				}
			
			}
		
		
		if (showEverything == true)
			{
			//console.log("show everything");
			}
		else
			{
			//console.log(snipets_list);
			
			var snipets_object = {};
			for (each in snipets_list)
				{
				snipets_object[each] = {};
				snipets_object[each]['config'] = JSON.parse(support.fileRead(obj.plugin_path+sep+"template"+sep+configJson['base_library']+sep+"snipets"+sep+each+".json"));
				snipets_object[each]['content'] = support.fileRead(obj.plugin_path+sep+"template"+sep+configJson['base_library']+sep+"snipets"+sep+each+".hx")
				}
				
			//console.log(snipets_object);

			var content = 
			['<div id="metawidget">',
			'<p>Choose one of the pre-defined snipets</p>',
			'<select id="snipets_list"></select>',
			'<div style="margin-top:10px;" id="metawidget_container"></div>',
			'<div class="well"><pre id="snipets_generated"></pre></div>',
			'</div>',
			'<style>',
			'.metawidget_parent',
			'{',
			'padding-bottom:10px;',
			'}',
			'</style>'].join("\n");			

		

			support.build_modal("New Class",content,function()
				{
				if (sessionStorage.genModalClicked == "true")
					{				
				
					var folderName = filename.split(sep)
					folderName.pop()
					folderName = folderName.join(sep)
					console.log(folderName);
					console.log(filename);
					if (support.node.fs.existsSync(folderName) == false)
						{
						support.node.fs.mkdirpSync(folderName);
						}
					
					if (support.node.fs.existsSync(filename) == false)
						{
						support.fileSave(filename,$("#snipets_generated").html());
						debug.info('Class created!');
						}
					else
						{
						debug.error('Class already available!');
						}	
					}
				},"Create !");
		
			$("#snipets_list").append("<option value='null'>choose ...</option>");
			for (each in snipets_list)
				{
				$("#snipets_list").append("<option value='"+each+"'>"+each+"</option>");
				}
				
				
				
			var generated_snipets = "";	
			
			
			

			
			
			$("#snipets_list").change(function()
				{
				var chosen_snipets = $("#snipets_list").val();
				if (chosen_snipets != "null")
					{
					//console.log(chosen_snipets);
					//metawidget_container
					var template_variables = snipets_object[chosen_snipets]['config']['snipets_variables'];
					
					var template_variables_with_prefix = [];
					for (each in template_variables)
						{
						template_variables_with_prefix.push([each, "%"+configJson['base_library'].toUpperCase() + ":"+ each.toUpperCase()+"%"] );
						}
									
					//console.log(snipets_object[chosen_snipets]['config']['snipets_variables']);
					$("#metawidget_container").html("");
					var mw = new metawidget.Metawidget( document.getElementById( 'metawidget_container' ),{layout:new metawidget.bootstrap.layout.BootstrapDivLayout({'divStyleClasses':['metawidget_parent'],'labelStyleClass':"metawidget_label"})});
					mw.toInspect = snipets_object[chosen_snipets]['config']['snipets_variables'];
					mw.buildWidgets();						
				
					
					generated_snipets = snipets_object[chosen_snipets]['content'];
					var updated_var = {};
					for (var i = 0; i <template_variables_with_prefix.length;i++)
						{
						var value = $("input#"+template_variables_with_prefix[i][0]).val();
						var pattern = template_variables_with_prefix[i][1];
						generated_snipets = generated_snipets.replace(pattern,value);
						updated_var[template_variables_with_prefix[i][0]] = value;
						}
					$("#snipets_generated").html(generated_snipets);					
					if (typeof updated_var['Package'] != "undefined")
						{
						var package_folder = "";
						if (updated_var['Package'] != "")
							{
							package_folder = updated_var['Package'].replace(".",sep);
							}
						}
					
					filename = central.project.projectFolder + sep +configJson['source_folder']+sep+ package_folder + sep + updated_var['Class'] +".hx";					
					
					
					$(".metawidget_parent input").on("input",function()
						{
						generated_snipets = snipets_object[chosen_snipets]['content'];
						
						var updated_var = {};
						for (var i = 0; i <template_variables_with_prefix.length;i++)
							{
							var value = $("input#"+template_variables_with_prefix[i][0]).val();
							var pattern = template_variables_with_prefix[i][1];
							generated_snipets = generated_snipets.replace(pattern,value);
							updated_var[template_variables_with_prefix[i][0]] = value;
							}
						$("#snipets_generated").html(generated_snipets);
						//console.log(updated_var);
						if (typeof updated_var['Package'] != "undefined")
							{
							var package_folder = "";
							if (updated_var['Package'] != "")
								{
								package_folder = updated_var['Package'].replace(".",sep);
								}
							}
						
						filename = central.project.projectFolder + sep +configJson['source_folder']+sep+ package_folder + sep + updated_var['Class'] +".hx";
						});
					}
				});

			}
		}
		
	return obj;
})(lib_integration);
