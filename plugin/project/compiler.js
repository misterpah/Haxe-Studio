var project = (function(obj)
{
	var _c = central;
	var _cp = central.project;

	central.event.listenFrom("compile_request","project.compile_project.js",function(data){
		var compile_string = "lime "+data.message.parameter+" "+data.message.target;
		console.dir(compile_string);
		
		support.exec(["cd %CD% %QUOTE%"+central.project.projectFolder+"%QUOTE%",compile_string],function(error,stdout,stderr){
			$("#compiler_error").html("");
			console.dir(error);
			console.dir(stdout);
			console.dir(stderr);
			if (error != null)
				{
				$("#compiler_error").append("<div style='color:#000000;' class='well'>"+stderr+"</div>");
				}
			});
		});
	
	return obj;
})(project);
