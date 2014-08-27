function hs_console(message)
	{
	var a = new Date();
	var datetime = a.getDate() +"/"+ a.getMonth() +"/"+a.getFullYear() + " @ " + a.getHours() + ":"+a.getMinutes()+":"+a.getSeconds();
	//$("#console_content").prepend("<tr><td>"+datetime+"</td><td>"+message+"</td></tr>");
	$("#console_content").prepend("<b>"+message+"</b><br/><small>"+datetime+"</small><br/><br/>");
	}
	
(function()
{
$("#console_position").html("");
/*
var console_table = ['<table class="table">',
'<thead>',
'<tr>',
'<th>date@time</th>',
'<th>log</th>',
'</tr>',
'</thead>',
'<tbody id="console_content" style="color:#ffffff">',
'</tbody>',
'</table>'].join("\n");
*/
$("#console_position").append('<div id="console_content" style="color:#ffffff;word-wrap:break-word;"></div>');
hs_console("Starts Haxe Studio");
})();


