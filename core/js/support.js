var support = {};
support.node = {};
support.node.fs = require("fs");
support.node.os = require("os");
support.node.gui = require('nw.gui');

support.node.exec = require('child_process').exec;
support.node.spawn = require('child_process').spawn;
support.node.path = require("path");

support.loadJS = function(script)
	{
    $.ajax({
        url: script,
        dataType: "script",
        async: false,
        success: function () 
        	{
        		//gvar.event.broadcast("loadJS","support.loadJS",{'status':"success","file":script});
		    },
		    error: function () 
		    {
			    ////gvar.event.broadcast("loadJS:error","support.loadJS",script);
			    //gvar.event.broadcast("loadJS","support.loadJS",{'status':"fail","file":script});
		    }
			});	
	};
	
	
support.loadCSS = function(css)
	{
	$("body").append('<link rel="stylesheet" type="text/css" href="'+css+'" />');
	/*
    $.ajax({
          url: css,
          dataType: 'css',
          success: function(){                  
                $('<link rel="stylesheet" type="text/css" href="'+href+'" />').appendTo("head");
                //$("body").append('<link rel="stylesheet" type="text/css" href="'+css+'" />');
                ////gvar.event.broadcast("loadCSS:success","support.loadCSS",css);
            },
		  error: function () {
			    ////gvar.event.broadcast("loadCSS:error","support.loadCSS",css);
		    }            
	    });	
	*/
	}
	


support.dirRead = support.readDir; // alias
support.readDir = function(path)
	{
	////gvar.event.broadcast("read_directory:start","support.readDir",path);
	return support.node.fs.readdirSync(path);
	}
	
support.fileExist = function(filename)
	{
	return support.node.fs.existsSync(filename);
	}
	
support.fileNew = function(filename)
	{
	////gvar.event.broadcast("file_new:start","support.fileNew",filename);	
	support.node.fs.openSync(filename,"a+");
	////gvar.event.broadcast("file_new:end","support.fileNew",filename);	
	}

support.fileRead = function(filename)
	{
	////gvar.event.broadcast("file_read:start","support.fileRead",filename);	
	return support.node.fs.readFileSync(filename,"utf-8");
	}

support.isFile = function(path)
	{
	var stat = support.node.fs.statSync(path);
	return stat.isFile();
	}


support.fileSave = function(filename, content)
	{
	////gvar.event.broadcast("file_save:start","support.fileSave",filename);	
	support.node.fs.writeFileSync(filename, content);
	////gvar.event.broadcast("file_save:end","support.fileSave",filename);	
	}	
	

support.collapsible = function(id,title,content)
	{
	var ret = ['<div style="margin:10px; ">',
	'<div class="panel panel-default">',
	'<div class="panel-heading">',
	title,
	'</div>',
	'<div id="'+id+'"class="panel-body" style="max-height:200px;overflow:scroll;">',
	content,
	'</div>',
	'</div>			',
	'</div>	'].join("\n");
	return ret;
	}

support.dropdownMenuItemSeperator = function()
	{
	return '<li class="divider"></li>';
	}

support.dropdownMenuItem = function(label,message_name,shortcut_key)
	{
	var event = 'central.event.broadcast("'+message_name+'","menu","");'
	var ret = ["<li>",
	"<a onclick='"+event+"'>",
	label,
	"<div style='display:inline;float:right'>",
	shortcut_key,
	"</div>",
	"</a>",
	"</li>"].join("");
	return ret;
	}

support.dropdownMenu = function(label,dropdownContent)
	{
	/*
	<li class="dropdown">
	  <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Help <span class="caret"></span></a>
	  <ul class="dropdown-menu" role="menu">
		<li><a href="#">Contribution</a></li>
		<li class="divider"></li>
		<li><a href="#">Check for update <div style="display:inline;float:right;"><span class="label label-primary">Ctrl</span> <span class="label label-success">U</span></div></a></li>
	  </ul>
	</li>		
	*/
	
	var ret = ['<li class="dropdown">',
	'<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">'+label+' <span class="caret"></span></a>',
	'<ul class="dropdown-menu" role="menu">',
	dropdownContent,
	'</ul>',
	'</li>'].join("");
	
	return ret;
	}
	
	
support.build_menuitem = function(label,message_name,shortcut_key)
	{
	if (shortcut_key != "")
		{	
		shortcut = "    ["+shortcut_key+"]";
		}
	else
		{
		shortcut = "";
		}
	var temp = new gui.MenuItem(
		{
		label : label+shortcut,
		click : function () 
			{
			central.event.broadcast(message_name,"menu","");
			}
		});
	return temp;
	}
	
support.build_seperator = function()
	{
	return new gui.MenuItem({ type: 'separator' });
	}


support.watchOnce = function(variable,attribute,callback)
	{
	//console.log("watchOnce "+variable+"["+attribute+"]");
	var temp_callback = function () 
		{
		//console.log('should be watching once :'+attribute);
		callback();
		unwatch(variable,attribute,temp_callback);
		}
	watch(variable,attribute,temp_callback);
	}



support.watch = function (variable,attribute,callback)
	{
	//console.log("watch "+variable+"["+attribute+"]");
	if (callback.name == "")
		{
		////console.log("anonymous function detected. please use non-anonymous function (function with names).");
		}
	watch(variable,attribute,callback);
	}

support.unwatch = function (variable,attribute,callback)
	{
	//console.log("unwatch "+variable+"["+attribute+"]");
	if (callback.name == "")
		{
		////console.log("anonymous function detected. please use non-anonymous function (function with names).");
		}
	unwatch(variable,attribute,callback);
	}

support.makeSidePanel = function(id,title,content)
	{
	

					  	
	parentId = "power_menu";
var ret = [
'<div class="panel panel-default">',
'<div class="panel-heading" role="tab" id="'+id+'">',
'<a class="collapsed" data-toggle="collapse" data-parent="#'+/*parentId+*/'" href="#'+id+'Content" aria-expanded="true" aria-controls="'+id+'Content">',
'<h4 class="panel-title">',
title,
'</h4>',
'</a>',
'</div>',
'<div id="'+id+'Content" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="'+id+'">',
'<div class="panel-body content">',
content,
'</div>',
'</div>',
'</div>'
].join("\n");
	
	return ret;
	}


support.exec = function (lines_to_exec,callbackFunction) 
{
	var os_type = "";
	var join_str = "";
	var join_str_cd = "";
	var cat_service = "";
	var quote = "";
	var _g = support.node.os.type();
	switch(_g) {
	case "Windows_NT":
		os_type = "WINDOWS";
		break;
	case "Linux":
		os_type = "LINUX";
		break;
	default:
		os_type = "OTHER";
	}
	if(os_type == "LINUX") {
		join_str = " ; ";
		join_str_cd = "";
		cat_service = " cat ";
		quote = "\"";
	} else if(os_type == "WINDOWS") {
		join_str = " & ";
		join_str_cd = " /D ";
		cat_service = " type ";
		quote = "\"";
	} else {
		join_str = " ; ";
		join_str_cd = "";
		cat_service = " cat ";
		quote = "\"";
	}
	var exec_str = "";
	var temp = "";
	var exec_array = [];
	var _g1 = 0;
	while(_g1 < lines_to_exec.length) {
		var each = lines_to_exec[_g1];
		++_g1;
		temp = each.replace(/%CD%/g,join_str_cd);
		temp = temp.replace(/%CAT%/g,cat_service);
		temp = temp.replace(/%QUOTE%/g,quote);
		exec_array.push(temp);
	}
	exec_str = exec_array.join(join_str);
	support.node.exec(exec_str,{ },function(error,stdout,stderr) {
		if(error != null) {
			//if(stdout != "") notify(stdout,"danger");
		}
		//support.node.execResult = {"error":error,"stdout":stdout,"stderr":stderr};
		callbackFunction(error,stdout,stderr);
	});


}
	
	
	

