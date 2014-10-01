var project = (function(obj)
{

	
	
	
	obj.set_context_menu = function ()
		{
		var folder_menu = new support.node.gui.Menu();
		folder_menu.append(new support.node.gui.MenuItem(
			{ 
				label: 'Show this folder',  
				click: function() 
				{
					//var path = $(obj.context_menu_target[1]).attr("data-path");
					//obj.show_project_tree(decodeURIComponent(path));
				}
			}
		));


		var file_menu = new support.node.gui.Menu();
		file_menu.append(new support.node.gui.MenuItem(
			{ 
				label: 'Open File',
				click: function() 
				{
					//obj.openMe($(obj.context_menu_target[1]));
				}
			}
		));

		file_menu.append(new support.node.gui.MenuItem(
			{ 
				label: 'Set as Project File',
				click: function() 
				{
					//var path = $(obj.context_menu_target[1]).attr("data-path");
					//plugin.misterpah.ProjectAccess.openProjectHandler(Utils.fs.realpathSync(decodeURIComponent(path)));
				}
			}
		));	


			
		$("a.folder").on("contextmenu", function(e) {
			folder_menu.popup(e.originalEvent.x + 1, e.originalEvent.y +1); // offset 1px to fix bug
			context_menu_target = ['folder',e.target];
			});

		$("a.file").on("contextmenu", function(e) {
			file_menu.popup(e.originalEvent.x + 1, e.originalEvent.y +1); // offset 1px to fix bug
			context_menu_target = ['file',e.target];
			});
			
		};	
	
	
	
	return obj;
})(project);
