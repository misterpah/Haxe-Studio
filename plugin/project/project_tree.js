var project = (function(obj)
{
	var _c = central;
	var _cp = central.project;
	
			
			
	// open/close folder & show it's content once clicked

	obj.openFolder = function (jquery_obj)
		{
		var html = $(jquery_obj).html();
		var userwantsto = "";
		if (html[0] == "+")	// user want to open folder
			{
			html = html.replace("+","-");	
			userwantsto = "open";
			}
		else if (html[0] == "-")	// user want to close folder
			{
			html = html.replace("-","+");	
			userwantsto = "close";
			}
		$(jquery_obj).html(html);
	
		var path = $(jquery_obj).attr('data-path');
		path = decodeURIComponent(path);
		if (userwantsto == "close")
			{
			$("ul[data-path='"+encodeURIComponent(path)+"']").html("");
			}

		if (userwantsto == "open")
			{
			var folder_content = support.readDir( path);
	
			var OpenFileFunctionString = 'central.event.broadcast("FileMenu.openFileDirectly","project.project_tree.js",($(this).attr("data-path")));';
	
			for (i = 0;i< folder_content.length;i++)
				{
				var isfile = support.isFile(path + support.node.path.sep + folder_content[i]);
				if(isfile)
					{
					var _temp= folder_content[i];
					var _ext = _temp.split(".").pop();
					$("ul[data-path='"+encodeURIComponent(path)+"'").append("<li><a class='file "+_ext+"' data-toggle='context' data-target='#plugin-misterpah-ProjectTree-contextMenu-file' onclick='"+OpenFileFunctionString+"'   data-path='"+encodeURIComponent(path + support.node.path.sep + folder_content[i])+"' href='#'><span class='glyphicon glyphicon-file'></span> &nbsp;"+folder_content[i] +"</a></li>");
					}
				else
					{
					//$("ul[data-path='"+encodeURIComponent(path)+"'").append("<li><a class='folder' data-toggle='context' data-target='#plugin-misterpah-ProjectTree-contextMenu-folder' onclick='"+"'   data-path='"+encodeURIComponent(path + support.node.path.sep + folder_content[i])+"' href='#'>+ <span class='glyphicon glyphicon-folder-open'></span> &nbsp;"+folder_content[i] +"</a><ul data-path='"+encodeURIComponent(path + support.node.path.sep + folder_content[i])+"'></ul></li>");
					$("ul[data-path='"+encodeURIComponent(path)+"'").append("<li><a class='folder'  onClick='project.openFolder($(this))'  data-path='"+encodeURIComponent(path + support.node.path.sep + folder_content[i])+"'>+ <span class='glyphicon glyphicon-folder-open'></span> &nbsp;"+folder_content[i] +"</a><ul data-path='"+encodeURIComponent(path + support.node.path.sep + folder_content[i])+"'></ul></li>");
					}
				}
			}
		obj.set_context_menu();
		};	

			
			
	function build_project_tree(path)
		{
		var folder_content = support.readDir(path);
		for (i = 0;i< folder_content.length;i++)
			{
			var isfile = support.isFile(path + support.node.path.sep + folder_content[i]);
			//console.log(folder_content[i] + " : "+ isfile);
			if (isfile)
				{
				var _temp= folder_content[i];
				var _ext = _temp.split(".").pop();		
				
				
				var OpenFileFunctionString = 'central.event.broadcast("FileMenu.openFileDirectly","project.project_tree.js",($(this).attr("data-path")));';
				
				$("#file_tree").append("<li><a class='file "+_ext+"'  onclick='"+OpenFileFunctionString+"'  data-path='"+encodeURIComponent(path + support.node.path.sep + folder_content[i])+"' ><span class='glyphicon glyphicon-file'></span> &nbsp;"+folder_content[i] +"</a></li>");
				}
			else
				{
				$("#file_tree").append("<li><a class='folder'  onClick='project.openFolder($(this))'  data-path='"+encodeURIComponent(path + support.node.path.sep + folder_content[i])+"'>+ <span class='glyphicon glyphicon-folder-open'></span> &nbsp;"+folder_content[i] +"</a><ul data-path='"+encodeURIComponent(path + support.node.path.sep + folder_content[i])+"'></ul></li>");
				}
			}
		}
			
	obj.create_project_tree = function(scope_folder)
		{
		$("#tree_position").html("");
		$("#tree_position").html("<div id='file_tree_path'></div><ul id='file_tree'></ul>");
		var parent_folder_for_the_current_folder = support.node.path.resolve(central.project.projectFolder+support.node.path.sep+"..");
		
		$("#file_tree_path").html("<a  onClick='project.update_project_tree(\""+parent_folder_for_the_current_folder+"\")'><span class=\"glyphicon glyphicon-arrow-left\"></span>&nbsp;../</a>");
		
		//console.dir(scope_folder)
		build_project_tree(central.project.projectFolder);
		}
	obj.update_project_tree = function(scope_folder)
		{
		obj.project_tree_folder = scope_folder
		$("#tree_position").html("");
		$("#tree_position").html("<div id='file_tree_path'></div><ul id='file_tree'></ul>");
		var parent_folder_for_the_current_folder = support.node.path.resolve(obj.project_tree_folder+support.node.path.sep+"..");
		
		$("#file_tree_path").html("<a  onClick='project.update_project_tree(\""+parent_folder_for_the_current_folder+"\")'><span class=\"glyphicon glyphicon-arrow-left\"></span>&nbsp;../</a>");
		
		//console.dir(scope_folder)
		build_project_tree(scope_folder);
		}		
		
	return obj;
})(project);
