var file_tree = (function(obj)
{
	var idFileTree = "plugin_file_tree";
	function privateFunctionIntegrate()
		{
		if (config.file_tree_config == undefined)
			{
			config.file_tree_config = "sample configuration";
			}
		console.log("this is a private function test");
		console.log("integration script complete");
		}
		
		
	function makeFolderContent(type,filepath,id_to_put_content)
		{
		var icon = "";
		var name = "";
		var path = "";
		var li_id = "";
		var onclick = "";
		var className = "";
		if (type == "file")
			{
			icon = '<span class="glyphicon glyphicon-file"></span>';
			name = filepath.split(support.node.path.sep).pop();
			path = filepath;
			var re = new RegExp(support.node.path.sep, 'g');
			li_id = path.replace(re, '_');			
			className = "file"
			onclick = 'central.event.broadcast(\'FileMenu.openFileDirectly\',\'file_tree.makeFolderContent\',\''+encodeURIComponent(path)+'\');';
			}
		else
			{
			icon = '<span class="glyphicon glyphicon-folder-open"></span>';
			name = filepath.split(support.node.path.sep).pop();
			path = filepath;
			var re = new RegExp(support.node.path.sep, 'g');
			li_id = path.replace(re, '_');
			className = "folder"
			onclick = 'file_tree.showSubFolderContent(\''+path+'\',\''+li_id+'\');';
			}
		if (id_to_put_content == "0")
			{
			
			
//<a class="file xml" onclick="central.event.broadcast(&quot;FileMenu.openFileDirectly&quot;,&quot;project.project_tree.js&quot;,($(this).attr(&quot;data-path&quot;)));" data-path="%2Fhome%2Fpah%2Fdevelopment%2Fabangjambu%2FProject.xml"><span class="glyphicon glyphicon-file"></span> &nbsp;Project.xml</a>			
			$("#"+idFileTree+" ul").append('<li id="'+li_id+'"><a class="'+className+'" onClick="'+onclick+'">'+icon+' '+name+'</a></li>');
			}
		else
			{
			$("#"+id_to_put_content+" ul").append('<li id="'+li_id+'"><a class="'+className+'" onClick="'+onclick+'">'+icon+' '+name+'</a></li>');
			}
		}
	
	
	obj.showSubFolderContent = function(path,id)
		{
		var folder_content = support.readDir(path);
		if ( typeof($("#"+id+" ul").html() ) == "undefined")
			{
			$("#"+id).append("<ul></ul>");
			for (each in folder_content)
				{
				var isfile = support.isFile(path + support.node.path.sep + folder_content[each]);
				var content_type = "folder";
				if (isfile)
					{
					content_type = "file";
					}
				makeFolderContent(content_type,path + support.node.path.sep+folder_content[each],id);
				}		
			}
		else
			{
			$("#"+id+" ul").remove();
			}
		}
	
	obj.showFolder = function()
		{
		$("#"+idFileTree+" ul").html("");
		if (typeof central.project.projectOpened != "undefined")
			{
			var folder_content = support.readDir(central.project.projectFolder);
			//$("#"+idFileTree+" input").val(central.project.projectFolder.split(support.node.path.sep).join( " "+support.node.path.sep+" "));
			$("#"+idFileTree+" input").val(central.project.projectFolder);
			$(".openProjectGlyph").css("color","#e18728");
			for (each in folder_content)
				{
				var isfile = support.isFile(central.project.projectFolder + support.node.path.sep + folder_content[each]);
				var content_type = "folder";
				if (isfile)
					{
					content_type = "file";
					}
				makeFolderContent(content_type,central.project.projectFolder + support.node.path.sep+folder_content[each],"0");
				}
			}
		}
		
	obj.integrate = function()
		{
		
		

//    <button onclick='central.event.broadcast(\"FileMenu.openProject\",\"bigButton\",\"\");' type='button' style='white-space:normal' class='btn btn-primary btn-lg btn-block'>Choose Project</button>
    
var ui = ['<div class="input-group" style="padding:10px">',
'<input style="height:28px;" type="text" class="form-control" placeholder="Choose Project">',
'<span class="input-group-btn">',
'<button onclick="central.event.broadcast(\'FileMenu.openProject\',\'bigButton\',\'\');"  class="btn btn-default" type="button" data-toggle="tooltip" data-placement="bottom" title="Tooltip on bottom"><span style="color:#000000" class="openProjectGlyph glyphicon glyphicon-folder-open" ></span></button>',
'</span>',
'</div>'].join("\n"); 		
		
		$(".option_position").append("<div id='"+idFileTree+"'>"+ui+"<ul style='padding-left:0px;'></ul></div>");
		central.event.listen("openProject.complete",obj.showFolder);
		}
		
	return obj;
})(file_tree);
