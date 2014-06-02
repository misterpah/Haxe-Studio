$("#tree_position").html("");
var folder_content = Utils.readDir(Main.session.project_folder);

function openMe(obj)
	{
	var path = $(obj).attr('data-path');
	console.dir(path);
	Main.message.broadcast("plugin.misterpah.FileAccess:OpenFileDirectly","plugin.misterpah.ProjectTree",path);
	}

function openFolder(obj)
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
		console.dir(path);
		var folder_content = Utils.readDir(path);
	
	
		for (i = 0;i< folder_content.length;i++)
			{
			var isfile = Utils.isFile(path + Utils.path.sep + folder_content[i]);
			if(isfile)
				{
				var _temp= folder_content[i];
				var _ext = _temp.split(".").pop();
				$("ul[data-path='"+path+"'").append("<li><a class='file "+_ext+"' onclick='openMe($(this));'   data-path='"+path + Utils.path.sep + folder_content[i]+"' href='#'><span class='glyphicon glyphicon-file'></span> &nbsp;"+folder_content[i] +"</a></li>");
				}
			else
				{
				$("ul[data-path='"+path+"'").append("<li><a class='folder' onclick='openFolder($(this));'   data-path='"+path + Utils.path.sep + folder_content[i]+"' href='#'>+ <span class='glyphicon glyphicon-folder-open'></span> &nbsp;"+folder_content[i] +"</a><ul data-path='"+path + Utils.path.sep + folder_content[i]+"'></ul></li>");
				}
			}
		}
	//Main.message.broadcast("plugin.misterpah.FileAccess:OpenFileDirectly","plugin.misterpah.ProjectTree",path);
	}

$("#tree_position").html("<ul id='file_tree'></ul>");
for (i = 0;i< folder_content.length;i++)
	{
	var isfile = Utils.isFile(Main.session.project_folder + Utils.path.sep + folder_content[i]);
	if (isfile)
		{
		var _temp= folder_content[i];
		var _ext = _temp.split(".").pop();		
		$("#file_tree").append("<li><a class='file "+_ext+"' onclick='openMe($(this));'  data-path='"+Main.session.project_folder + Utils.path.sep + folder_content[i]+"' href='#'><span class='glyphicon glyphicon-file'></span> &nbsp;"+folder_content[i] +"</a></li>");
		}
	else
		{
		$("#file_tree").append("<li><a class='folder' onClick='openFolder($(this))'  data-path='"+Main.session.project_folder + Utils.path.sep + folder_content[i]+"'>+ <span class='glyphicon glyphicon-folder-open'></span> &nbsp;"+folder_content[i] +"</a><ul data-path='"+Main.session.project_folder + Utils.path.sep + folder_content[i]+"'></ul></li>");	
		}
	}
