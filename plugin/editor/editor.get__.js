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

	obj.getDoc = function()
		{
		return obj._cm.getDoc();
		}		
		
	return obj;
})(editor);
