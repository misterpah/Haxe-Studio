var support = {};
support.node = {};
support.node.fs = require("fs-extra");
//require("fs-extra");

support.node.os = require("os");
support.node.gui = require('nw.gui');

support.node.exec = require('child_process').exec;
support.node.spawn = require('child_process').spawn;
support.node.path = require("path");


support.loadJSPromise = function(_script)
	{
	var deferred = Q.defer();
	$.getScript( _script )
	  .done(function( script, textStatus ) {
		//console.log( textStatus );
		debug.debug("loadJS","success",_script);
		deferred.resolve("[loadjs][success]"+_script);
	  })
	  .fail(function( jqxhr, settings, exception ) {
		throw new Error("Can't load "+_script);
	});	
	return deferred.promise;
	};


support.loadJS = function(script)
	{
    $.ajax({
        url: script,
        dataType: "script",
        async: false,
        success: function () 
        	{
        		debug.debug("loadJS",script,"success");
		    },
		    error: function () 
		    {
			    debug.debug("loadJS",script,"fail");
		    }
			});	
	};
	
	
support.loadCSS = function(css)
	{
	$("body").append('<link rel="stylesheet" type="text/css" href="'+css+'" />');
	}
	


support.dirRead = support.readDir; // alias
support.readDir = function(path)
	{
	return support.node.fs.readdirSync(path);
	}
	
support.fileExist = function(filename)
	{
	return support.node.fs.existsSync(filename);
	}
	
support.fileNew = function(filename)
	{
	support.node.fs.openSync(filename,"a+");
	}

support.fileRead = function(filename)
	{
	return support.node.fs.readFileSync(filename,"utf-8");
	}

support.isFile = function(path)
	{
	var stat = support.node.fs.statSync(path);
	return stat.isFile();
	}


support.fileSave = function(filename, content)
	{
	support.node.fs.writeFileSync(filename, content);
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
	if (shortcut_key != "") { shortcut_key = "<kbd>"+shortcut_key+"</kbd>";}
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
	
	var ret = ['<li class="dropdown '+label+'_dropdown">',
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
	var temp_callback = function () 
		{
		callback();
		unwatch(variable,attribute,temp_callback);
		}
	watch(variable,attribute,temp_callback);
	}



support.watch = function (variable,attribute,callback)
	{
	if (callback.name == "")
		{
		}
	watch(variable,attribute,callback);
	}

support.unwatch = function (variable,attribute,callback)
	{
	if (callback.name == "")
		{
		}
	unwatch(variable,attribute,callback);
	}

support.makeSidePanel = function(id,title,content,show)
	{
	var collapse_yes = 'in';
	if  (typeof show !== 'undefined')
		{
		collapse_yes = '';
		}

					  	
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
'<div id="'+id+'Content" class="panel-collapse collapse '+collapse_yes+'" role="tabpanel" aria-labelledby="'+id+'">',
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
	debug.debug(exec_str);
	support.node.exec(exec_str,{ },function(error,stdout,stderr) {
		if(error != null) {
			//if(stdout != "") notify(stdout,"danger");
		}
		callbackFunction(error,stdout,stderr);
	});


}


function getParameterInFunction(func) {
  var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
  var ARGUMENT_NAMES = /([^\s,]+)/g;
  var fnStr = func.toString().replace(STRIP_COMMENTS, '');
  var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
  if(result === null)
     result = [];
  return result;
}


