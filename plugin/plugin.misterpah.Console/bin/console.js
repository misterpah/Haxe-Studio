function hs_console(message)
	{
	var a = new Date();
	var datetime = a.getDate() +"/"+ a.getMonth() +"/"+a.getFullYear() + " @ " + a.getHours() + ":"+a.getMinutes()+":"+a.getSeconds();
	$("#console_content").prepend("<tr><td>"+datetime+"</td><td>"+message+"</td></tr>");
	}
	
(function()
{
$("#bottom_position").append("<div id='plugin_misterpah_console'></div>");

var console_table = ['<table class="table">',
'<thead>',
'<tr>',
'<th>date@time</th>',
'<th>log</th>',
'</tr>',
'</thead>',
'<tbody id="console_content">',
'</tbody>',
'</table>'].join("\n");

$("#plugin_misterpah_console").append(console_table);
hs_console("Starts Haxe Studio");
})();


