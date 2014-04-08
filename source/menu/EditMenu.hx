package menu;
import jQuery.*;
import ui.Menu;

/**
 * ...
 * @author AS3Boyan
 */
class EditMenu extends Menu
{

	public function new() 
	{
		super("Edit");
		create_ui();
		//register_hooks();
	}
	
	function create_ui()
	{
		addMenuItem("HIDE Plugin", "core_plugin_pluginManager", null, null);
		addToDocument();
	}
	
}