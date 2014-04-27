if ( typeof String.prototype.startsWith != 'function' ) {
  String.prototype.startsWith = function( str ) {
    return this.substring( 0, str.length ) === str;
  }
};


if ( typeof String.prototype.endsWith != 'function' ) {
  String.prototype.endsWith = function( str ) {
    return this.substring( this.length - str.length, this.length ) === str;
  }
};

function hs_event_dashboard()
{
gui.Window.open("./ide_debugger.html",{title:"IDE Debugger",focus:false,nodejs:true});
}

function hs_compile_all_plugin()
	{
	var dirname = process.execPath.substr(0,process.execPath.lastIndexOf('/'));
	var plugin_path = dirname+"/../../plugin/";
	
	
	var plugin_list = Utils.readDir("../plugin");
	for (var i=0;i<plugin_list.length;i++)
		{
		Utils.exec(["cd %CD% "+plugin_path+plugin_list[i]+"/source","haxe build.hxml"],function(p1,p2,p3)
			{
			if (p3 != "")
				{
				notify(p3,"danger");
				console.dir(p3);
				console.log("--------------");
				}
			else
				{
				notify("compile ok!","success");								
				console.log("ok");
				}
			});
		}
	var core_path = dirname+"/../../source";
		Utils.exec(["cd %CD% "+core_path,"haxe build.hxml"],function(p1,p2,p3)
			{
			if (p3 != "")
				{
				notify(p3,"danger");								
				console.dir(p3);
				console.log("--------------");
				}
			else
				{
				notify("core compile ok!","success");
				console.log("core ok");
				}
			});
	
	
	
	}
	
	
function notify(message,type)
	{
	if (Main.error_code[message] != null)
		{
		message = Main.error_code[message];
		}
	
	var closable =true;
	var fadeout = { enabled: true, delay: 3000 }
	var glyphicon = '';
	if (type=="danger")
		{
		closable = false;
		fadeout ={ enabled: true, delay: 10000 }
		glyphicon = '<span class="glyphicon glyphicon-warning-sign"></span>'
		}

	if (type=="info")
		{
		closable = true;
		fadeout ={ enabled: true, delay: 3000 }
		glyphicon = '<span class="glyphicon glyphicon-info-sign"></span>'
		}
		
	
	$('.bottom-right').notify({
		message: { text: message},
		type :type, // info,success,warning,danger,inverse,blackgloss
		closable:closable,
		fadeOut:fadeout,
		glyphicon:glyphicon
		}).show(); // for the ones that aren't closable and don't fade out there is a .hide() function.
	}	
