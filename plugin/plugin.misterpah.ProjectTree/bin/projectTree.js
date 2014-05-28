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
	html[0] = "-";
	$(obj).html(html);
	var path = $(obj).attr('data-path');
	var level = parseInt($(obj).attr('data-level'));
	level +=1 ;
	console.dir(path);
	var folder_content = Utils.readDir(path);
	//console.dir(folder_content);
	
	var spacer = "";
	var limiter = level *4;
	for (i = 0; i < limiter;i++)
		{
		spacer += "&nbsp;";
		}
	
	for (i = 0;i< folder_content.length;i++)
		{
		var isfile = Utils.isFile(path + Utils.path.sep + folder_content[i]);
		if(isfile)
			{
			$(obj).after("<br/><a onclick='openMe($(this));' data-level='"+level+"' data-path='"+path + Utils.path.sep + folder_content[i]+"' href='#'>"+spacer+folder_content[i] +"</a>");
			}
		else
			{
			$(obj).after("<br/><a onclick='openFolder($(this));' data-level='"+level+"' data-path='"+path + Utils.path.sep + folder_content[i]+"' href='#'>"+spacer+"+"+folder_content[i] +"</a>");
			}
		
		
		}
	
	//Main.message.broadcast("plugin.misterpah.FileAccess:OpenFileDirectly","plugin.misterpah.ProjectTree",path);
	}


for (i = 0;i< folder_content.length;i++)
	{
	var isfile = Utils.isFile(Main.session.project_folder + Utils.path.sep + folder_content[i]);
	if (isfile)
		{
		$("#tree_position").append("<a onclick='openMe($(this));' data-level='0' data-path='"+Main.session.project_folder + Utils.path.sep + folder_content[i]+"' href='#'>"+folder_content[i] +"</a><br/>");	
		}
	else
		{
		$("#tree_position").append("<a onClick='openFolder($(this))' data-level='0' data-path='"+Main.session.project_folder + Utils.path.sep + folder_content[i]+"'>+"+folder_content[i] +"</a><br/>");	
		}
	}
