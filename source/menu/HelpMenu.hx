package menu;
import jQuery.*;
import ui.Menu;

/**
 * ...
 * @author AS3Boyan
 */
class HelpMenu extends Menu
{
	public function new() 
	{
		super("Help");
		create_ui();
		Main.message.listen("core:HelpMenu.contribution","core:helpMenu",contribution_page);
	}
	
	function create_ui()
	{
		var gui = untyped require('nw.gui');	
		addMenuItem("Contributors", "core:HelpMenu.contribution" ,function(){contribution_page();}, "");
		addMenuItem("IDE debugger", "core:HelpMenu.ideDebugger" ,function(){ide_debugger_page();}, "");
		addMenuItem("Developer Tools", "core:HelpMenu.developerTools" ,function(){untyped Utils.gui.Window.get().showDevTools();}, "");				
		addToDocument();
	}
	
	function ide_debugger_page()
	{
	untyped gui.Window.open("./ide_debugger.html",{title:"IDE Debugger",focus:false,nodejs:true});
	}
	
	function contribution_page()
	{
	//untyped Utils.gui.Window.open("./contributors/contributors.html",{title:"HIDE contributors",position: 'center',toolbar:false,focus:true});
	untyped gui.Window.open("http://www.haxestudio.com/contributors/index.html");
	}
}
