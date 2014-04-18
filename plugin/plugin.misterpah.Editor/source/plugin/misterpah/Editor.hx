package plugin.misterpah;
import jQuery.*;
import js.Browser;
import ui.*;
import Utils;
import CodeMirror;

@:keep @:expose class Editor
{
    private static var tab_index:Array<String>;
    private static var tab_cursor:Array<Array<Int>>;
    
    private static var cm:CodeMirror;
    
   	public static var completion_list:Array<Array<String>>;
    private static var cursor_type:String;
    private static var track_cursor:Bool;
	
	private static var widgetStack:Array<Dynamic>;
	
    static public function main():Void
    {
	init();
    }
	
	private static function plugin_path():String
	{
	return "../plugin/" + Type.getClassName(Editor) +"/bin";
	}
	
	
	
	
    public static function init()
    {
    	untyped plugin.misterpah.Editor.doc_buffer = {};
    	widgetStack = new Array();
        tab_index = new Array();
        tab_cursor = new Array();
        completion_list = new Array();
        track_cursor = true;

		
		Utils.loadJS(plugin_path() +"/codemirror-3.15/lib/codemirror.js",function(){});
		Utils.loadJS(plugin_path() +"/codemirror-3.15/mode/haxe/haxe.js",function(){});
		
		Utils.loadJS(plugin_path() +"/codemirror-3.15/addon/edit/matchbrackets.js",function(){});
		Utils.loadJS(plugin_path() +"/codemirror-3.15/addon/edit/closebrackets.js",function(){});
		Utils.loadJS(plugin_path() +"/codemirror-3.15/addon/fold/foldcode.js",function(){});
		Utils.loadJS(plugin_path() +"/codemirror-3.15/addon/fold/foldgutter.js",function(){});
		Utils.loadJS(plugin_path() +"/codemirror-3.15/addon/selection/active-line.js",function(){});
		Utils.loadJS(plugin_path() +"/codemirror-3.15/addon/hint/show-hint.js",function(){});
		
		Utils.loadJS(plugin_path() +"/js/codemirror.hint.haxe.js",function(){});
		
		
		
		Utils.loadJS(plugin_path() +"/editor_hint.js",function(){});
		Utils.loadCSS(plugin_path() +"/editor.css");
		
		
        Utils.loadCSS(plugin_path() +"/codemirror-3.15/lib/codemirror.css");
        Utils.loadCSS(plugin_path() +"/codemirror-3.15/addon/hint/show-hint.css");
		Utils.loadCSS(plugin_path() +"/codemirror-3.15/theme/base16-dark.css");
        create_ui();
        register_hooks(); 
        untyped sessionStorage.static_completion = "";
    }



    public static function register_hooks()
    {
        cursor_type = "";
        new JQuery(js.Browser.document).on("show.bs.tab",function(e):Void
            {
                var target = new JQuery(e.target);
                show_tab(target.attr("data-path"),false);

                //var file_obj = Main.file_stack.find(Main.session.active_file);
                var tab_number = Lambda.indexOf(tab_index,Main.session.active_file);        
                var unshowed_tab = tab_cursor[tab_number];
                var cursor_pos = CodeMirror.Pos(unshowed_tab[0],unshowed_tab[1]);
                cm.setCursor(cursor_pos);
            });

			
			
		Main.message.listen("plugin.misterpah.FileAccess:open_file.complete","plugin.misterpah.Editor", function()
            {
            new JQuery("#editor_position").css("display","block");
			make_tab();
            }
		);

        new JQuery(js.Browser.window).on("resize",function()
            {
            editor_resize();
            });


		Main.message.listen("plugin.misterpah.FileAccess:close_file.complete","plugin.misterpah.Editor",close_tab);
    	Main.message.listen("plugin.misterpah.Completion:static_completion.complete","plugin.misterpah.Editor",handle_static_completion);
    	Main.message.listen("plugin.misterpah.Editor:build_completion.complete.dynamic","plugin.misterpah.Editor",handle_dynamic_completion);
    	
    }





    public static function create_ui()
    {

        new JQuery("#editor_position").css("display","none");
        new JQuery("#editor_position").append("<div  id='misterpah_editor_tabs_position'><ul class='nav nav-tabs'></ul></div>");
        new JQuery("#editor_position").append("<div class='ui-layout-center' id='misterpah_editor_cm_position'></div>");
        new JQuery("#misterpah_editor_cm_position").append("<textarea style='display:none;' name='misterpah_editor_cm_name' id='misterpah_editor_cm'></textarea>");
        
        
        cm = untyped CodeMirror.fromTextArea($("#misterpah_editor_cm")[0],
        	{
            lineNumbers:true,
            indentUnit:4,
            tabSize:4,     	
            indentWithTabs:true,
           	cursorHeight:0.85,
            mode:'haxe', 
            theme:'base16-dark',
	        viewportMargin: Infinity,
            matchBrackets:true,
            autoCloseBrackets:true,
            foldCode:true,
            foldGutter:true,
            styleActiveLine:true                      
        	}
        );

        CodeMirror.on(cm,"cursorActivity",function(cm){
            if (track_cursor == true)
                {
                var path = Main.session.active_file;
                var tab_number = Lambda.indexOf(tab_index,path);
                var cursor = cm.getCursor();
                tab_cursor[tab_number] = [cursor.line, cursor.ch];  
                }
                

            if ( cm.getCursor().line != untyped sessionStorage.hint_pos )
            	{
		    	if (widgetStack.length > 0) // close hint when change line
		    		{
		    		for (each in widgetStack)
		    			{
		    			cm.removeLineWidget(each);
		    			}

		    		}
		    	}
            });
        
        CodeMirror.on(cm,"change",function(cm){
            var path = Main.session.active_file;
            if (path == "") {return;}
            var file_obj = Main.file_stack.find(path);
            Main.file_stack.update_content(path,cm.getValue());
            var cursor_pos = cm.indexFromPos(cm.getCursor());
            untyped sessionStorage.cursor_index = cursor_pos;
            untyped sessionStorage.keypress = cm.getValue().charAt(cursor_pos - 1);
            if (cm.getValue().charAt(cursor_pos - 1) == '.')
            	{
            	request_static_completion(cm);
            	}
            else if (cm.getValue().charAt(cursor_pos - 1) == '(')
            	{
            	untyped sessionStorage.hint_pos = cm.getCursor().line;
            	request_dynamic_completion(cm);
            	}
            });
        //editor_resize();
    }
    
    public static function openBuffer(name:String,text:String)
    	{
    	untyped plugin.misterpah.Editor.doc_buffer[name] = CodeMirror.Doc(text,"haxe");
    	/*
function openBuffer(name, text, mode) {
  buffers[name] = CodeMirror.Doc(text, mode);
  var opt = document.createElement("option");
  opt.appendChild(document.createTextNode(name));
  sel_top.appendChild(opt);
  sel_bot.appendChild(opt.cloneNode(true));
}    	
*/
    	}
    	
    	
    public static function selectBuffer(editor:Dynamic, name:String)
    	{
    	var buf = untyped plugin.misterpah.Editor.doc_buffer[name];
    	untyped if (buf.getEditor()) buf = buf.linkedDoc({sharedHist: true});
    	var old = editor.swapDoc(buf);
		editor.refresh();
	 	}
    	

	 
	public static function request_static_completion(cm)
		{
		trace("request_static_completion");
		trace("tokenizing terms");
        cursor_type = ".";
        untyped sessionStorage.cursor_pos = cm.getCursor().ch;
        untyped sessionStorage.cursor_pos_line = cm.getCursor().line;
        var cursor_temp = cm.getCursor();
        cursor_temp.ch = cursor_temp.ch -1;
        var seekToken = true;
        var token_array:Array<Dynamic> = new Array();
        while (seekToken)
            {
            var before_token = cm.getTokenAt(cursor_temp);
            token_array.push(before_token);
            var cursor_check_before_token =  CodeMirror.Pos(cursor_temp.line, before_token.start -1);
            var before_before_token = (cm.getTokenAt(cursor_check_before_token));
            if (before_before_token.type == null)
            	{
            	seekToken = false;
            	}
            else
            	{
            	cursor_temp = cursor_check_before_token;
            	}
            }
		token_array.reverse();
		var completion_str_array = new Array();
		for (each in token_array)
			{
			completion_str_array.push(each.string);
			}
		untyped sessionStorage.find_completion = completion_str_array.join(".");
		trace("token is : "+untyped sessionStorage.find_completion);
		trace("tokenizing terms completed.");
		trace('invoke static completion');
		Main.message.broadcast("core:FileMenu.saveFile","plugin.misterpah.Editor",null);
		Main.message.broadcast("plugin.misterpah.Completion:static_completion","plugin.misterpah.Editor",null);
		}
	
	public static function request_dynamic_completion(cm)
	{
	trace("request_dynamic_completion");
	Main.message.broadcast("core:FileMenu.saveFile","plugin.misterpah.Editor",null);
	cursor_type = "(";
	untyped sessionStorage.cursor_pos = cm.getCursor().ch;
	trace('invoke dynamic completion');
	Main.message.broadcast("plugin.misterpah.Completion:dynamic_completion","plugin.misterpah.Editor",null);
	}
	 


   static private function handle_static_completion()
    {
    	trace("preparing static completion");
        var completion_array:Dynamic = untyped JSON.parse(sessionStorage.static_completion);
        trace(completion_array);

		completion_list = new Array();
        var temp:Array<String> = completion_array;
        
		for (each in temp)
			{
			var fname = untyped each[0];
			completion_list.push(fname);
			}
		trace("invoke show completion");
		CodeMirror.showHint(cm,untyped haxeHint);
		untyped sessionStorage.static_completion = "";
    }    

   static private function handle_dynamic_completion()
    {
    	trace("preparing dynamic completion");
        var completion_array:Dynamic = untyped JSON.parse(sessionStorage.static_completion);
        trace(completion_array);
        widgetStack.push(untyped inline_hint(cm.getCursor().line,completion_array));

    }



	
    private static function editor_resize()
        {
        var win = Utils.gui.Window.get();
        var win_height = cast(win.height,Int);
        var doc_height = new JQuery(js.Browser.document).height();

        var tab_height = new JQuery("#misterpah_editor_tabs_position a").height();
        //trace(win_height);
        //trace(doc_height);
        //trace(tab_height);
        new JQuery(".CodeMirror").css("height", Std.string(doc_height - 30) +"px");
        new JQuery(".CodeMirror").css("overflow-x", "hidden");
        }

    private static function close_tab()
    {
        var path = Main.session.active_file; 
        if (path != "")
        	{
		    untyped $("#misterpah_editor_tabs_position a[data-path='"+path+"']").remove();
		    untyped delete_buffered_document(path);
		    Main.session.active_file = '';
		    
		    var len = untyped $("#misterpah_editor_tabs_position a").length;
		    if (len < 1)
		    	{
		    	new JQuery("#editor_position").css("display","none");
		    	}
		    else
		    	{
		    	new JQuery("#misterpah_editor_cm_position").css("display","none");
		    	}
		    }
    }


    private static function make_tab()
	    {
        var path = Main.session.active_file;
        var file_obj = Main.file_stack.find(path);    
        openBuffer(path, file_obj[1]);
        new JQuery("#editor_position").css("display","block");
        untyped $("#misterpah_editor_tabs_position ul").append("<li><a onclick='plugin.misterpah.Editor.show_tab(\""+path+"\");' data-path='"+path+"'>"+file_obj[2]+"</a></li>");
        show_tab(path,true);
    	}   

    private static function show_tab(path:String,tabShow:Bool=true)
    {
	    selectBuffer(cm,path);
	    Main.session.active_file = path;
        if (tabShow == true)
            {
            untyped reset_active_tab();
            untyped $("#misterpah_editor_tabs_position a[data-path='"+path+"']").parent().addClass("active");
            }
                       
        new JQuery("#misterpah_editor_cm_position").css("display","block"); 

        cm.refresh();

    }	

}
