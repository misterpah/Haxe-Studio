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
		Main.message.listen("core:HelpMenu.contribution","core:helpMenu",contribution_page,null);
	}
	
	function create_ui()
	{
		var gui = untyped require('nw.gui');	
		addMenuItem("Contributors", "core:HelpMenu.contribution" ,null, "");
		addMenuItem("Developer Tools", "core:HelpMenu.developerTools" ,function(){Utils.gui.Window.get().showDevTools();}, "");				
		addToDocument();
	}
	
	function contribution_page()
	{
	 Utils.gui.Window.open("./contributors/contributors.html",{title:"HIDE contributors",position: 'center',toolbar:false,focus:true});
	}
}
