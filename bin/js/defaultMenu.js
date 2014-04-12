FileMenu.append(build_menuitem("Open Project...","core:FileMenu.openProject","Ctrl+Shift+O"));
FileMenu.append(build_menuitem("Close Project","core:FileMenu.closeProject",""));
FileMenu.append(build_seperator());
FileMenu.append(build_menuitem("New File...","core:FileMenu.newFile","Ctrl+N"));
FileMenu.append(build_menuitem("Open File...","core:FileMenu.openFile","Ctrl+O"));
FileMenu.append(build_menuitem("Save File","core:FileMenu.saveFile","Ctrl+S"));
FileMenu.append(build_menuitem("Close File","core:FileMenu.closeFile","Ctrl+W"));
FileMenu.append(build_seperator());
FileMenu.append(build_menuitem("Exit","core:FileMenu.exit","Alt+F4"));
Main.message.listen("core:FileMenu.exit","menu",function(){
	gui.Window.get().close();
});



HelpMenu.append(build_menuitem("Contributors","core:HelpMenu.contribution",""));
Main.message.listen("core:HelpMenu.contribution","menu",function(){
	gui.Window.open("http://www.haxestudio.com/contributors/index.html");
});

HelpMenu.append(build_menuitem("Developer Console","core:HelpMenu.developerTools",""));
Main.message.listen("core:HelpMenu.developerTools","menu",function(){
	gui.Window.get().showDevTools();
});

HelpMenu.append(build_menuitem("IDE debugger","core:HelpMenu.ideDebugger",""));
Main.message.listen("core:HelpMenu.ideDebugger","menu",function(){
	gui.Window.open("./ide_debugger.html",{title:"IDE Debugger",focus:false,nodejs:true});
});

