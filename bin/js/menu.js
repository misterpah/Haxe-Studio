// Create an empty menu

function build_menuitem(label,message_name,shortcut_key)
	{
	if (shortcut_key != "")
		{	
		shortcut = "    ["+shortcut_key+"]";
		}
	else
		{
		shortcut = "";
		}
	var temp = new gui.MenuItem(
		{
		label : label+shortcut,
		click : function () {Main.message.broadcast(message_name,"menu",null);}
		});
	return temp;
	}
	
function build_seperator()
	{
	return new gui.MenuItem({ type: 'separator' });
	}

	

