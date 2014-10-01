var editor = (function(obj)
{
	obj.setValue = function(content)
		{
		return obj._cm.setValue(content);
		}
	obj.setCursor = function(_line,_ch)
		{
		editor._cm.doc.setCursor({line:_line,ch:_ch})
		}
	return obj;
})(editor);
