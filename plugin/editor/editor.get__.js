var editor = (function(obj)
{
	obj.getValue = function()
		{
		return obj._cm.getValue();
		}
		
	obj.getCursor = function()
		{
		return obj._cm.getCursor();
		}
		
	return obj;
})(editor);
