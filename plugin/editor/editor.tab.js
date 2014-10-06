var editor = (function(obj)
{
	
	function makeTheTabActive(encoded_filename)
		{
		$("#editor_tab a").each(function(){$(this).parent().removeClass("active");});
		// add active class to user-chosen
		$("#editor_tab a[data-path='"+encoded_filename+"']").parent().addClass("active");
		
		}

	function makeANewTabIfTabBlankIsNotAvailable(filename)
		{
		var tabName = filename.split(support.node.path.sep).pop();
		$("#editor_tab ul").append("<li><div><a onclick='editor.switch_tab($(this));' data-path='"+ encodeURIComponent(filename)+"'>"+tabName+"</a>&nbsp;&nbsp;<span onclick='editor.close_tab($(this));' class='status_icon glyphicon glyphicon-remove-circle' data-path='"+ encodeURIComponent(filename)+"'></span></div></li>");
		}


	obj.remove_tab = function(encoded_filename)
		{
		$("#editor_tab a[data-path='"+encoded_filename+"']").parent().remove()
		}

	obj.create_tab = function(filename)
		{
		makeANewTabIfTabBlankIsNotAvailable(filename)
		}


	obj.show_tab = function(encoded_filename)
		{
		makeTheTabActive(encoded_filename);
		}

	obj.find_tab = function(encoded_filename)
		{
		return $("#editor_tab a[data-path='"+encoded_filename+"']").length;
		}
		
	obj.list_tab = function()
		{
		var ret = []; 
		$("#editor_tab a").each(function()
			{
			ret.push($(this).attr("data-path"));
			});
		return ret;
		}
		
	obj.close_tab = function(clicked_obj)
		{
		obj.switch_tab(clicked_obj);
		central.event.broadcast("FileMenu.closeFile","editor.tab.js","");
		}
	obj.switch_tab = function(clicked_obj)
		{
		if ($("#editor_tab div.active a").attr("data-path") != undefined)
			{
			central.filesystem.fileActive = decodeURIComponent($("#editor_tab div.active a").attr("data-path"));
			central.filesystem.fileStack[encodeURIComponent(central.filesystem.fileActive)].content = obj.getValue();
			}
		makeTheTabActive(clicked_obj.attr('data-path'));
		obj.setValue(central.filesystem.fileStack[clicked_obj.attr('data-path')].content);
		central.filesystem.fileActive = decodeURIComponent(clicked_obj.attr('data-path'));
		obj.show_inspector();
		}
		
	return obj;	
})(editor);
