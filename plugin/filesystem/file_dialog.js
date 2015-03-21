var filesystem = (function(obj)
{
	var _c = central.filesystem;
	
	function openFileDialog()
		{
		var deferred = Q.defer();
		jQuery("#temp").html('<input style="display:none;" id="fileDialog" type="file" />');
		$('#fileDialog').trigger('click');  
		$('#fileDialog').change(function(evt) 
			{
			$("#temp").html("");
			deferred.resolve($(this).val());
			});
		return deferred.promise;
		}
		
	obj.file_dialog = function()
		{
		return Q.fcall(openFileDialog);
		}
		
	return obj;
})(filesystem);
