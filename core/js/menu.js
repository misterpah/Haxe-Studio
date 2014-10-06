// to ensure GUI aren't drawed twice.

	var gui = support.node.gui;
	var menubar = new gui.Menu({ type: 'menubar' });

	var FileMenu = new gui.Menu();

	var ctrlOrMeta = "";
	if (config.ctrlOrMeta == "ctrlKey")
		{
		ctrlOrMeta = "Ctrl";
		}
	else if (config.ctrlOrMeta == "metaKey")
		{
		ctrlOrMeta = "Meta";
		}
	/*
	FileMenu.append(support.build_menuitem("Open Folder","FileMenu.openFolder",ctrlOrMeta+"+Shift+F"));
	$.keyStroke( 70, { modKeys: [config.ctrlOrMeta,'shiftKey'] }, function(){  central.event.broadcast("FileMenu.openProject","shortcut_key",""); });
	
	FileMenu.append(support.build_seperator());
	*/
	FileMenu.append(support.build_menuitem("New Project","FileMenu.newProject",ctrlOrMeta+"+Shift+N"));
	$.keyStroke( 78, { modKeys: [config.ctrlOrMeta,'shiftKey'] }, function(){  central.event.broadcast("FileMenu.openProject","shortcut_key",""); });

	FileMenu.append(support.build_menuitem("Open Project...","FileMenu.openProject",ctrlOrMeta+"+Shift+O"));
	$.keyStroke( 79, { modKeys: [config.ctrlOrMeta,'shiftKey'] }, function(){  central.event.broadcast("FileMenu.openProject","shortcut_key",""); }); // CTRL + SHIFT + O

	FileMenu.append(support.build_menuitem("Close Project","FileMenu.closeProject",ctrlOrMeta+"+Shift+W"));
	FileMenu.append(support.build_seperator());
	FileMenu.append(support.build_menuitem("New File...","FileMenu.newFile",ctrlOrMeta+"+N"));
	$.keyStroke( 78, { modKeys: [config.ctrlOrMeta] }, function(){  central.event.broadcast("FileMenu.newFile","shortcut_key",""); }); // CTRL + N

	FileMenu.append(support.build_menuitem("Open File...","FileMenu.openFile",ctrlOrMeta+"+O"));
	$.keyStroke( 79, { modKeys: [config.ctrlOrMeta] }, function(){  central.event.broadcast("FileMenu.openFile","shortcut_key",""); }); // CTRL + O

	FileMenu.append(support.build_menuitem("Save File","FileMenu.saveFile",ctrlOrMeta+"+S"));
	$.keyStroke( 83, { modKeys: [config.ctrlOrMeta] }, function(){  central.event.broadcast("FileMenu.saveFile","shortcut_key",""); }); // CTRL + S

	FileMenu.append(support.build_menuitem("Close File","FileMenu.closeFile",ctrlOrMeta+"+W"));
	$.keyStroke( 87, { modKeys: [config.ctrlOrMeta] }, function(){  central.event.broadcast("FileMenu.closeFile","shortcut_key",""); }); // CTRL + W

	FileMenu.append(support.build_seperator());
	FileMenu.append(support.build_menuitem("Exit","FileMenu.exit","Alt+F4"));


	/*
	var EditMenu = new gui.Menu();
	EditMenu.append(support.build_menuitem("Prettify code","EditMenu.prettifyCode",""));
	*/


	var ToolsMenu = new gui.Menu();
	ToolsMenu.append(support.build_menuitem("Manage Plugin","ToolsMenu.managePlugin",""));
	ToolsMenu.append(support.build_menuitem("Configure Haxe Studio","ToolsMenu.configureHS",""));

	ToolsMenu.append(support.build_menuitem("Developer Console","ToolsMenu.developerTools",""));


	ToolsMenu.append(support.build_seperator());
	ToolsMenu.append(support.build_menuitem("Restart HaxeStudio","ToolsMenu.ReloadHaxeStudio",""));




	var HelpMenu = new gui.Menu();
	HelpMenu.append(support.build_menuitem("Contributors","HelpMenu.contribution",""));

	HelpMenu.append(support.build_seperator());
	HelpMenu.append(support.build_menuitem("Check for update","HelpMenu.update",""));


	menubar.append(new gui.MenuItem({ label: 'File', submenu: FileMenu}));
	//menubar.append(new gui.MenuItem({ label: 'Edit', submenu: EditMenu}));
	menubar.append(new gui.MenuItem({ label: 'Tools', submenu: ToolsMenu}));
	menubar.append(new gui.MenuItem({ label: 'Help', submenu: HelpMenu}));


	gui.Window.get().menu = menubar;
	



central.event.listen("ToolsMenu.configureHS",function(){
	central.event.broadcast("FileMenu.openFileDirectly","project.project_tree.js",encodeURIComponent(support.node.path.resolve('./config.js')));
	});
	
central.event.listen("FileMenu.exit",function(){
gui.Window.get().close();
});

central.event.listen("ToolsMenu.developerTools",function(){
gui.Window.get().showDevTools();
});

central.event.listen("ToolsMenu.ReloadHaxeStudio",function(){
gui.Window.get().reload();
});

central.event.listen("HelpMenu.contribution",function(){
gui.Window.open("http://www.haxestudio.com/contributors.html");
});	

central.event.listen("ToolsMenu.managePlugin",function(){
gui.Window.open("./plugin_manager.html",{
		"title": "Update Haxe Studio",
		"toolbar": true,
		"frame": true,
		"position": "center",
		"show": true
	});
});	



central.event.listen("HelpMenu.update",function(){
gui.Window.open("./update.html",{
		"title": "Update Haxe Studio",
		"toolbar": false,
		"frame": true,
		"position": "center",
		"show": true
	});
});	



