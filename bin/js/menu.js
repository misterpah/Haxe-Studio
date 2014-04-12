// Create an empty menu
console.dir(gui.Window.get().menu);
var menubar = new gui.Menu({ type: 'menubar' });
var sub1 = new gui.Menu();

var FileMenu = new gui.Menu();
var CompileMenu = new gui.Menu();
var HelpMenu = new gui.Menu();

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

	
menubar.append(new gui.MenuItem({ label: 'File', submenu: FileMenu}));
menubar.append(new gui.MenuItem({ label: 'Compile', submenu: CompileMenu}));
menubar.append(new gui.MenuItem({ label: 'Help', submenu: HelpMenu}));
gui.Window.get().menu = menubar;
