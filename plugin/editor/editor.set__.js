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
	obj.setDoc = function(doc)
		{
		var oldDoc = editor._cm.swapDoc(doc);
		return oldDoc;
		}
	return obj;
})(editor);
