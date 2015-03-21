var filesystem = (function(obj)
{
	var _c = central.filesystem;
	
	function openFileDialogSaveAs()
		{
		var deferred = Q.defer();
		jQuery("#temp").html('<input style="display:none;" id="fileDialog" nwsaveas type="file" />');
		$('#fileDialog').trigger('click');  
		$('#fileDialog').change(function(evt) 
			{
			$("#temp").html("");
			deferred.resolve($(this).val());
			});
		return deferred.promise;
		}
		
	obj.file_dialogSaveAs = function()
		{
		return Q.fcall(openFileDialogSaveAs);
		}
		
	return obj;
})(filesystem);
