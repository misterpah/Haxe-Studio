package menu;
import jQuery.*;
import ui.Menu;

/**
 * ...
 * @author Misterpah
 */
class CompileMenu extends Menu
{

	public function new() 
	{
		super("Compile");
		create_ui();
		//register_hooks();
	}
	
	function create_ui()
	{
		addMenuItem("Flash", "plugin.misterpah.ProjectTree:compile_Flash", null, null);
		addMenuItem("HTML5", "plugin.misterpah.ProjectTree:compile_Html5", null, null);
		addMenuItem("Neko", "plugin.misterpah.ProjectTree:compile_Neko", null, null);
		addMenuItem("Hxml", "plugin.misterpah.ProjectTree:compile_Hxml", null, null);
		addToDocument();
	}
	
}
