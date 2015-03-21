var filesystem = (function(obj)
{
	var _c = central.filesystem;
	
	
	function openFolderDialog()
		{
		jQuery("#temp").html('<input style="display:none;" id="folderDialog" type="file" nwdirectory/>');
		var name = '#folderDialog';
		var chooser = $(name);
		chooser.change(function(evt) 
			{
			_c.folderActive = $(this).val();
			$("#temp").html("");
			});
		chooser.trigger('click');  
		}
		
	obj.folder_dialog = function()
		{
		openFolderDialog();
		}
		
	return obj;
})(filesystem);
