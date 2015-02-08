central.event.listen("ToolsMenu.configureHS",function(){
	//central.event.broadcast("FileMenu.openFileDirectly","project.project_tree.js",encodeURIComponent(support.node.path.resolve('./config.js')));
	
	Q.fcall(function()
		{
		return JSON.stringify(config);//support.fileRead("./hs.config.json");
		})
	.then(function(data)
		{
		//console.log(config);

//var available_theme = [];

var available_theme = "";
var temp = support.readDir(editor.cm_path+"/theme/");
for (var z = 0; z < temp.length;z++)
	{
	//available_theme.push(temp[z].split(".css")[0])
	available_theme += "<option value='"+temp[z].split(".css")[0]+"'>"+temp[z].split(".css")[0]+"</option>";
	}


		
		var content = 
['<div id="metawidget">',
'		<select id="editor_theme">',
available_theme,
'		</select>',
'</div>',
'<style>',
'.metawidget_parent',
'{',
'padding-bottom:10px;',
'}',
'</style>'].join("\n");		
		
		support.build_modal("configure Haxe Studio",content,function()
			{
			var temp = {}
			for (var i = 0;i< $("#genModal input").length;i++)
				{
				name =  $("#genModal input")[i].name;
				value = $("#genModal input")[i].value;
				temp[name] = value;
				}

			temp['editor_theme'] = $("#genModal [name=editor_theme]").val();

			//console.log(temp);
			support.fileSave("./hs.config.json",JSON.stringify(temp));
			}
			);
		data = JSON.parse(data);
		//console.log(data);
		var mw = new metawidget.Metawidget( document.getElementById( 'metawidget' ),{layout:new metawidget.bootstrap.layout.BootstrapDivLayout({'divStyleClasses':['metawidget_parent'],'labelStyleClass':"metawidget_label"})});
		mw.toInspect = data;
		mw.buildWidgets();		
		
		})
	.then(function(data)
		{
		$(".metawidget_label").parent().each(function(){$(this).addClass("col-md-6")})
		});
		
		
	});

