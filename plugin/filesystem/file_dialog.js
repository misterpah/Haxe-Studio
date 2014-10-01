var filesystem = (function(obj)
{
	var _c = central.filesystem;
	
	function openFileDialog()
		{
		jQuery("#temp").append('<input style="display:none;" id="fileDialog" type="file" />');
		var name = '#fileDialog';
		var chooser = $(name);
		chooser.change(function(evt) 
			{
			_c.fileActive = $(this).val();
			$("#temp").html("");
			});
		chooser.trigger('click');  
		}
		
	obj.file_dialog = function()
		{
		openFileDialog();
		}
		
	return obj;
})(filesystem);
