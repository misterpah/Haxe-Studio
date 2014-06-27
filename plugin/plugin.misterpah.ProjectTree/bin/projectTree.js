	$("#tree_position").html("");
	plugin.misterpah.ProjectTree.projectFolder = "";
	plugin.misterpah.ProjectTree.context_menu_target = "";


	// open file if it's clicked
	plugin.misterpah.ProjectTree.openMe = function (obj)
		{
		var path = $(obj).attr('data-path');
		Main.message.broadcast("plugin.misterpah.FileAccess:OpenFileDirectly","plugin.misterpah.ProjectTree",path);
		}

	// open/close folder & show it's content once clicked
	plugin.misterpah.ProjectTree.openFolder = function (obj)
		{
		var html = $(obj).html();
		var userwantsto = "";
		if (html[0] == "+")	 // user want to open folder
			{
			html = html.replace("+","-");	
			userwantsto = "open";
			}
		else if (html[0] == "-")	 // user want to close folder
			{
			html = html.replace("-","+");	
			userwantsto = "close";
		
			}
		$(obj).html(html);
	
		var path = $(obj).attr('data-path');
	
		if (userwantsto == "close")
			{
			$("ul[data-path='"+path+"']").html("");
			}

		if (userwantsto == "open")
			{
			var folder_content = Utils.readDir(path);
	
			for (i = 0;i< folder_content.length;i++)
				{
				var isfile = Utils.isFile(path + Utils.path.sep + folder_content[i]);
				if(isfile)
					{
					var _temp= folder_content[i];
					var _ext = _temp.split(".").pop();
					$("ul[data-path='"+path+"'").append("<li><a class='file "+_ext+"' data-toggle='context' data-target='#plugin-misterpah-ProjectTree-contextMenu-file' onclick='plugin.misterpah.ProjectTree.openMe($(this));'   data-path='"+path + Utils.path.sep + folder_content[i]+"' href='#'><span class='glyphicon glyphicon-file'></span> &nbsp;"+folder_content[i] +"</a></li>");
					}
				else
					{
					$("ul[data-path='"+path+"'").append("<li><a class='folder' data-toggle='context' data-target='#plugin-misterpah-ProjectTree-contextMenu-folder' onclick='plugin.misterpah.ProjectTree.openFolder($(this));'   data-path='"+path + Utils.path.sep + folder_content[i]+"' href='#'>+ <span class='glyphicon glyphicon-folder-open'></span> &nbsp;"+folder_content[i] +"</a><ul data-path='"+path + Utils.path.sep + folder_content[i]+"'></ul></li>");
					}
				}
			}
		plugin.misterpah.ProjectTree.set_context_menu();
		}


	plugin.misterpah.ProjectTree.folder_menu = new gui.Menu();
	plugin.misterpah.ProjectTree.folder_menu.append(new gui.MenuItem(
		{ 
			label: 'Show this folder',  
			click: function() 
			{
				var path = $(plugin.misterpah.ProjectTree.context_menu_target[1]).attr("data-path");
				plugin.misterpah.ProjectTree.show_project_tree(path);
			}
		}
	));

	
	plugin.misterpah.ProjectTree.file_menu = new gui.Menu();
	plugin.misterpah.ProjectTree.file_menu.append(new gui.MenuItem(
		{ 
			label: 'nothing yet',  
			click: function() 
			{
			}
		}
	));

	plugin.misterpah.ProjectTree.set_context_menu = function ()
		{
			
		$("a.folder").on("contextmenu", function(e) {
		plugin.misterpah.ProjectTree.folder_menu.popup(e.originalEvent.x + 1, e.originalEvent.y +1); // offset 1px to fix bug
		plugin.misterpah.ProjectTree.context_menu_target = ['folder',e.target]
		//e.preventDefault();
		});

		$("a.file").on("contextmenu", function(e) {
		plugin.misterpah.ProjectTree.file_menu.popup(e.originalEvent.x + 1, e.originalEvent.y +1); // offset 1px to fix bug
		plugin.misterpah.ProjectTree.context_menu_target = ['file',e.target]
		//e.preventDefault();
		});
			
		}

	plugin.misterpah.ProjectTree.show_project_tree = function (project_folder)
		{
		//var folder_content = Utils.readDir(Main.session.project_folder);
		plugin.misterpah.ProjectTree.projectFolder = project_folder;
		var folder_content = Utils.readDir(project_folder);
		
		$("#tree_position").html("<br/><div id='file_tree_path'></div><ul id='file_tree'></ul>");
		$("#file_tree_path").html("<a onClick='plugin.misterpah.ProjectTree.show_project_tree(plugin.misterpah.ProjectTree.projectFolder+Utils.path.sep+\"..\")'><span class=\"glyphicon glyphicon-upload\"></span>&nbsp;Go up one folder</a>");
		
		//Utils.fs.realpathSync("/home/pah/temporary/abc/..")
		
		
		
		for (i = 0;i< folder_content.length;i++)
			{
			var isfile = Utils.isFile(project_folder + Utils.path.sep + folder_content[i]);
			if (isfile)
				{
				var _temp= folder_content[i];
				var _ext = _temp.split(".").pop();		
				$("#file_tree").append("<li><a class='file "+_ext+"'  onclick='plugin.misterpah.ProjectTree.openMe($(this));'  data-path='"+project_folder + Utils.path.sep + folder_content[i]+"' href='#'><span class='glyphicon glyphicon-file'></span> &nbsp;"+folder_content[i] +"</a></li>");
				}
			else
				{
				$("#file_tree").append("<li><a class='folder'  onClick='plugin.misterpah.ProjectTree.openFolder($(this))'  data-path='"+project_folder + Utils.path.sep + folder_content[i]+"'>+ <span class='glyphicon glyphicon-folder-open'></span> &nbsp;"+folder_content[i] +"</a><ul data-path='"+project_folder + Utils.path.sep + folder_content[i]+"'></ul></li>");	
				}
			}
			
		plugin.misterpah.ProjectTree.set_context_menu();
		}
		
	plugin.misterpah.ProjectTree.show_project_tree(Main.session.project_folder);

