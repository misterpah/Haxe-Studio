(function ($hx_exports) { "use strict";
$hx_exports.plugin = $hx_exports.plugin || {};
$hx_exports.plugin.misterpah = $hx_exports.plugin.misterpah || {};
var IMap = function() { };
var Session = $hx_exports.Session = function() { };
var haxe = {};
haxe.ds = {};
haxe.ds.StringMap = function() { };
haxe.ds.StringMap.__interfaces__ = [IMap];
var plugin = {};
plugin.misterpah = {};
plugin.misterpah.NewProject = $hx_exports.plugin.misterpah.NewProject = function() { };
plugin.misterpah.NewProject.main = function() {
	plugin.misterpah.NewProject.register_listener();
};
plugin.misterpah.NewProject.create_new_project = function() {
	plugin.misterpah.NewProject.new_project_window = gui.Window.open("../plugin/plugin.misterpah.NewProject/bin/newProject.html",{ title : "Create New Project", focus : true, nodejs : true, min_width : 1024, min_height : 500, toolbar : false});
	plugin.misterpah.NewProject.new_project_window.on('plugin.misterpah.NewProject:project_created', function(path,folder,name){console.dir(path + Utils.path.sep +folder + Utils.path.sep + name); Main.session.project_xml = path + Utils.path.sep + folder +Utils.path.sep + name; plugin.misterpah.NewProject.new_project_window.close(); Main.message.broadcast('plugin.misterpah.ProjectAccess:open_project_auto');});
	plugin.misterpah.NewProject.new_project_window.on('plugin.misterpah.NewProject:setProjectXML', function(projectXml){ Main.session.project_xml = projectXml});
	plugin.misterpah.NewProject.new_project_window.on('plugin.misterpah.NewProject:autoOpenProject', function(){ plugin.misterpah.NewProject.new_project_window.close(); Main.message.broadcast('plugin.misterpah.ProjectAccess:open_project_auto');});
};
plugin.misterpah.NewProject.register_listener = function() {
	Main.message.listen("core:FileMenu.newProject","plugin.misterpah.NewProject",plugin.misterpah.NewProject.create_new_project);
};
plugin.misterpah.NewProject.main();
})(typeof window != "undefined" ? window : exports);

//# sourceMappingURL=plugin.js.map