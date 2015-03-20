var ctrlOrMeta = "";
if (config.ctrlOrMeta == "ctrlKey")
	{
	ctrlOrMeta = "Ctrl";
	}
else if (config.ctrlOrMeta == "metaKey")
	{
	ctrlOrMeta = "Meta";
	}

var file_menu = [];
file_menu.push(support.dropdownMenuItem("New Project","FileMenu.newProject",ctrlOrMeta+"+Shift+N"));
$.keyStroke( 78, { modKeys: [config.ctrlOrMeta,'shiftKey'] }, function(){  central.event.broadcast("FileMenu.newProject","shortcut_key",""); });

file_menu.push(support.dropdownMenuItem("Open Project...","FileMenu.openProject",ctrlOrMeta+"+Shift+O"));
$.keyStroke( 79, { modKeys: [config.ctrlOrMeta,'shiftKey'] }, function(){  central.event.broadcast("FileMenu.openProject","shortcut_key",""); });
/*
file_menu.push(support.dropdownMenuItem("Close Project","FileMenu.closeProject",ctrlOrMeta+"+Shift+W"));
$.keyStroke( 87, { modKeys: [config.ctrlOrMeta,'shiftKey'] }, function(){  central.event.broadcast("FileMenu.closeFile","shortcut_key",""); });
*/
file_menu.push(support.dropdownMenuItemSeperator());
file_menu.push(support.dropdownMenuItem("New File...","FileMenu.newFile",ctrlOrMeta+"+N"));
$.keyStroke( 78, { modKeys: [config.ctrlOrMeta] }, function(){  central.event.broadcast("FileMenu.newFile","shortcut_key",""); }); // CTRL + N

file_menu.push(support.dropdownMenuItem("Open File...","FileMenu.openFile",ctrlOrMeta+"+O"));
$.keyStroke( 79, { modKeys: [config.ctrlOrMeta] }, function(){  central.event.broadcast("FileMenu.openFile","shortcut_key",""); }); // CTRL + O

file_menu.push(support.dropdownMenuItem("Save File","FileMenu.saveFile",ctrlOrMeta+"+S"));
$.keyStroke( 83, { modKeys: [config.ctrlOrMeta] }, function(){  central.event.broadcast("FileMenu.saveFile","shortcut_key",""); }); // CTRL + S

file_menu.push(support.dropdownMenuItem("Close File","FileMenu.closeFile",ctrlOrMeta+"+W"));
$.keyStroke( 87, { modKeys: [config.ctrlOrMeta] }, function(){  central.event.broadcast("FileMenu.closeFile","shortcut_key",""); }); // CTRL + W

file_menu.push(support.dropdownMenuItemSeperator());

file_menu.push(support.dropdownMenuItem("Exit","FileMenu.exit","Alt+F4"));
central.event.listen("FileMenu.exit",function(){
gui.Window.get().close();
});


var file_dropdown = support.dropdownMenu("File",file_menu.join("\n"));
$("#main_menu").append(file_dropdown);


var tools_menu = [];

central.event.listen("ToolsMenu.checkForError",function(){
	haxe_server.haxe_build_project();
	});


tools_menu.push(support.dropdownMenuItem("Configure HaxeStudio","ToolsMenu.configureHS",""));

tools_menu.push(support.dropdownMenuItem("Developer Console","ToolsMenu.developerTools",""));
central.event.listen("ToolsMenu.developerTools",function(){
gui.Window.get().showDevTools();
});

tools_menu.push(support.dropdownMenuItemSeperator());	

tools_menu.push(support.dropdownMenuItem("Restart HaxeStudio","ToolsMenu.ReloadHaxeStudio",""));
central.event.listen("ToolsMenu.ReloadHaxeStudio",function(){
gui.Window.get().reload();
});

var tools_dropdown = support.dropdownMenu("Tools",tools_menu.join("\n"));
$("#main_menu").append(tools_dropdown);

var plugin_menu = [];

plugin_menu.push(support.dropdownMenuItem("Sample Plugin","PluginMenu.sample_plugin",""));
central.event.listen("PluginMenu.sample_plugin",function(){
debug.info("this is a sample plugin");
});	


var plugin_dropdown = support.dropdownMenu("Plugin",plugin_menu.join("\n"));
$("#main_menu").append(plugin_dropdown);



var help_menu = [];

help_menu.push(support.dropdownMenuItem("Help","HelpMenu.help",''));
central.event.listen("HelpMenu.help",function(){
gui.Window.open("./about/help.html",{
		"title": "Help",
		"toolbar": true,
		"frame": true,
		"position": "center",
		"show": true,
	});
});	


help_menu.push(support.dropdownMenuItem("Update","HelpMenu.update",''));
central.event.listen("HelpMenu.update",function(){
gui.Window.open("../update/update.html",{
		"title": "Update",
		"toolbar": false,
		"frame": true,
		"position": "center",
		"show": true,

	});
});	

help_menu.push(support.dropdownMenuItem("Contributors","HelpMenu.contribution",""));
central.event.listen("HelpMenu.contribution",function(){
gui.Window.open("http://www.haxestudio.com/contributors.html");
});	



help_menu.push(support.dropdownMenuItemSeperator());



help_menu.push(support.dropdownMenuItem("About","HelpMenu.about",''));
central.event.listen("HelpMenu.about",function(){
gui.Window.open("./about/about.html",{
		"title": "About",
		"toolbar": false,
		"frame": true,
		"position": "center",
		"show": true,

	});
});	





var help_dropdown = support.dropdownMenu("Help",help_menu.join("\n"));
$("#main_menu").append(help_dropdown);


