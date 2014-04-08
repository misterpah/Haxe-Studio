package menu;
import jQuery.*;
import ui.Menu;

/**
 * ...
 * @author AS3Boyan
 */
class FileMenu extends Menu
{

	public function new() 
	{
		super("File");
		create_ui();
	}
	
	function create_ui()
	{
		//addMenuItem("New Project...", "core:FileMenu.newProject", null, "Ctrl-Shift-N");
		addMenuItem("Open Project...", "core:FileMenu.openProject" ,null, "Ctrl-Shift-O");
		addMenuItem("Close Project...", "core:FileMenu.closeProject", null);
		addSeparator();
		addMenuItem("New File...", "core:FileMenu.newFile", null, "Ctrl-N");
		addMenuItem("Open File...", "core:FileMenu.openFile", null, "Ctrl-O");
		addMenuItem("Save", "core:FileMenu.saveFile", null, "Ctrl-S");
		addMenuItem("Close File", "core:FileMenu.closeFile", null, "Ctrl-W");
		addSeparator();
		addMenuItem("Exit", "core:FileMenu.exit", function(){var application_window = js.Node.require('nw.gui').Window.get();application_window.close();}, "Alt-F4");
		addToDocument();
	}
}
