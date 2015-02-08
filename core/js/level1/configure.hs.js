central.event.listen("ToolsMenu.configureHS",function(){
	//central.event.broadcast("FileMenu.openFileDirectly","project.project_tree.js",encodeURIComponent(support.node.path.resolve('./config.js')));
	
	Q.fcall(function()
		{
		return support.fileRead("./hs.config.json");
		})
	.then(function(data)
		{
		support.build_modal("configure Haxe Studio",'<div id="metawidget"></div><style>.metawidget_parent{padding-bottom:10px;}</style>',function()
			{
			var temp = {}
			for (var i = 0;i< $("#genModal input").length;i++)
				{
				name =  $("#genModal input")[i].name;
				value = $("#genModal input")[i].value;
				temp[name] = value;
				}
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

