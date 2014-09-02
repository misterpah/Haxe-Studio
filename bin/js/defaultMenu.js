var menubar = new gui.Menu({ type: 'menubar' });

var sub1 = new gui.Menu();

var FileMenu = new gui.Menu();
var ToolsMenu = new gui.Menu();
var HelpMenu = new gui.Menu();
FileMenu.append(build_menuitem("Open Folder","core:FileMenu.openFolder","Ctrl+Shift+F"));
$.keyStroke( 70, { modKeys: ['ctrlKey','shiftKey'] }, function(){  Main.message.broadcast("core:FileMenu.openProject","shortcut_key",null); }); // CTRL + SHIFT + F

FileMenu.append(build_seperator());
FileMenu.append(build_menuitem("New Project","core:FileMenu.newProject","Ctrl+Shift+N"));
$.keyStroke( 78, { modKeys: ['ctrlKey','shiftKey'] }, function(){  Main.message.broadcast("core:FileMenu.openProject","shortcut_key",null); }); // CTRL + SHIFT + N

FileMenu.append(build_menuitem("Open Project...","core:FileMenu.openProject","Ctrl+Shift+O"));
$.keyStroke( 79, { modKeys: ['ctrlKey','shiftKey'] }, function(){  Main.message.broadcast("core:FileMenu.openProject","shortcut_key",null); }); // CTRL + SHIFT + O

FileMenu.append(build_menuitem("Close Project","core:FileMenu.closeProject","Ctrl+Shift+W"));
FileMenu.append(build_seperator());
FileMenu.append(build_menuitem("New File...","core:FileMenu.newFile","Ctrl+N"));

$.keyStroke( 78, { modKeys: ['ctrlKey'] }, function(){  Main.message.broadcast("core:FileMenu.newFile","shortcut_key",null); }); // CTRL + N

FileMenu.append(build_menuitem("Open File...","core:FileMenu.openFile","Ctrl+O"));
$.keyStroke( 79, { modKeys: ['ctrlKey'] }, function(){  Main.message.broadcast("core:FileMenu.openFile","shortcut_key",null); }); // CTRL + O

FileMenu.append(build_menuitem("Save File","core:FileMenu.saveFile","Ctrl+S"));
$.keyStroke( 83, { modKeys: ['ctrlKey'] }, function(){  Main.message.broadcast("core:FileMenu.saveFile","shortcut_key",null); }); // CTRL + S

FileMenu.append(build_menuitem("Close File","core:FileMenu.closeFile","Ctrl+W"));
$.keyStroke( 87, { modKeys: ['ctrlKey'] }, function(){  Main.message.broadcast("core:FileMenu.closeFile","shortcut_key",null); }); // CTRL + W

FileMenu.append(build_seperator());

FileMenu.append(build_menuitem("Exit","core:FileMenu.exit","Alt+F4"));
Main.message.listen("core:FileMenu.exit","menu",function(){
	gui.Window.get().close();
});




ToolsMenu.append(build_menuitem("Manage Plugin","core:ToolsMenu.managePlugin",""));


ToolsMenu.append(build_menuitem("Configure Haxe Studio","core:ToolsMenu.configureHS",""));
Main.message.listen("core:ToolsMenu.configureHS","menu",function(){
	Main.message.broadcast("plugin.misterpah.FileAccess:OpenFileDirectly","menu","./hs-config.js");
});



ToolsMenu.append(build_menuitem("Developer Console","core:ToolsMenu.developerTools",""));
Main.message.listen("core:ToolsMenu.developerTools","menu",function(){
	gui.Window.get().showDevTools();
});
ToolsMenu.append(build_seperator());
ToolsMenu.append(build_menuitem("Restart HaxeStudio","core:ToolsMenu.ReloadHaxeStudio",""));
Main.message.listen("core:ToolsMenu.ReloadHaxeStudio","menu",function(){
	hs_reload();
});


HelpMenu.append(build_menuitem("Contributors","core:HelpMenu.contribution",""));
Main.message.listen("core:HelpMenu.contribution","menu",function(){
	gui.Window.open("http://www.haxestudio.com/contributors.html");
});
HelpMenu.append(build_seperator());

HelpMenu.append(build_menuitem("Check for update","core:HelpMenu.update",""));
Main.message.listen("core:HelpMenu.update","menu",function(){
	localStorage.version = Main.version;
	gui.Window.open("./update.html");
});




menubar.append(new gui.MenuItem({ label: 'File', submenu: FileMenu}));
menubar.append(new gui.MenuItem({ label: 'Tools', submenu: ToolsMenu}));
menubar.append(new gui.MenuItem({ label: 'Help', submenu: HelpMenu}));
gui.Window.get().menu = menubar;
