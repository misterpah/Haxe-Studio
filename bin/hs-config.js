/**************************************************
* HAXE STUDIO
* Configuration file
*
* please save & restart Haxe Studio after editing.
*
**************************************************/

var config = {};
try
	{
	config.theme = "base16-monokai-dark";
	config.restify_port = 8080;
	
	// all of this must sums up to 12
	config.option_position_width=3; // a.k.a. the left panel
	config.content_position_width=6; // a.k.a. the editor
	config.content_status_position_width=3; // a.k.a. the right panel
	}





/**************************************************
* HAXE STUDIO
* Configuration file
*
* FAILSAFE MECHANISM
* DON'T EDIT ANYTHING AFTER THIS LINE !
*
**************************************************/


catch(e)
{
	alert('you have an error in hs-config.js . please fix it! \n'+ e);
	// default value for Haxe Studio.
	config.theme = "base16-monokai-dark";
	config.restify_port = 8080;

	// all of this must sums up to 12
	config.option_position_width=3;
	config.content_position_width=6;
	config.content_status_position_width=3;

	
}
