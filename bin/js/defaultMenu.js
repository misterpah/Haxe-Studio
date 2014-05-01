var menubar = new gui.Menu({ type: 'menubar' });
var sub1 = new gui.Menu();

var FileMenu = new gui.Menu();
var CompileMenu = new gui.Menu();
var HelpMenu = new gui.Menu();




FileMenu.append(build_menuitem("Open Project...","core:FileMenu.openProject","Ctrl+Shift+O"));
$.keyStroke( 79, { modKeys: ['ctrlKey','shiftKey'] }, function(){  Main.message.broadcast("core:FileMenu.openProject","shortcut_key",null); }); // CTRL + SHIFT + O

FileMenu.append(build_menuitem("Close Project","core:FileMenu.closeProject",""));
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

CompileMenu.append(build_menuitem("Flash","plugin.misterpah.ProjectTree:compile_Flash",""));
$.keyStroke( 116, {  }, function(){  Main.message.broadcast("plugin.misterpah.ProjectTree:compile_Flash","shortcut_key",null); }); // F5


CompileMenu.append(build_menuitem("HTML5","plugin.misterpah.ProjectTree:compile_Html5",""));
CompileMenu.append(build_menuitem("Neko","plugin.misterpah.ProjectTree:compile_Neko",""));
CompileMenu.append(build_menuitem("Hxml","plugin.misterpah.ProjectTree:compile_Hxml",""));

HelpMenu.append(build_menuitem("Contributors","core:HelpMenu.contribution",""));
Main.message.listen("core:HelpMenu.contribution","menu",function(){
	gui.Window.open("http://www.haxestudio.com/contributors/index.html");
});

HelpMenu.append(build_menuitem("Developer Console","core:HelpMenu.developerTools",""));
Main.message.listen("core:HelpMenu.developerTools","menu",function(){
	gui.Window.get().showDevTools();
});



menubar.append(new gui.MenuItem({ label: 'File', submenu: FileMenu}));
menubar.append(new gui.MenuItem({ label: 'Compile', submenu: CompileMenu}));
menubar.append(new gui.MenuItem({ label: 'Help', submenu: HelpMenu}));
gui.Window.get().menu = menubar;
