function debug_callback( level ) {
	var args = Array.prototype.slice.call( arguments, 1 );

	var d = new Date();
	var n = d.getUTCFullYear()+"/"+d.getUTCMonth()+"/"+d.getUTCDate()+" "+d.getHours() +":"+d.getMinutes() +":"+d.getSeconds() ;
	
	debugTime = "<div class='debug-time'>"+n+"</div>";
	debugText = "<div class='debug-text'>"+args+"</div>";
	var icon = '';
	if (level == "debug")
		{
		icon = '<span class="glyphicon glyphicon-asterisk" aria-hidden="true"></span>';
		}
	else if (level == "info")
		{
		icon = '<span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>';
		}			
	else if (level == "error")
		{
		icon = '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>';
		}			
	debugIcon = "<div class='debug-icon'>"+icon+"</div>"
	
	$("#debug").prepend( "<div style='clear:both;margin-bottom:2px;' class='debug-level-"+level+"'>"+debugIcon+" "+debugTime+debugText+"<div style='clear:both;'> </div></div>");
};

debug.setCallback( debug_callback,true);


function showHideDebug()
{
if ($(".debug-level-debug").css("display") == "none")
	{
	removeStyle("debuglog");
	}
else
	{
	addStyle("debuglog",".debug-level-debug{display:none;}");
	}
}



function addStyle(id,style)
{
$("body").append("<style id='"+id+"'>"+style+"</style>");
}

function removeStyle(id)
{
$("#"+id).remove();
}
