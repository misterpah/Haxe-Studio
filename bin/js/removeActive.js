function reset_active_tab()
	{
	$("#misterpah_editor_tabs_position a").each(function(){ $(this).parent().removeClass("active"); });
	}
