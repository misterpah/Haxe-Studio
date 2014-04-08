package ;

//CodeMirror.hx from "try-haxe"
//https://github.com/clemos/try-haxe/blob/master/src/js/codemirror/CodeMirror.hx
//With few additional functions
//==========

import js.html.*;

typedef Completions = {
list : Array<String>,
from : Pos,
to : Pos,
}

typedef Pos = {
line : Int,
ch : Int
}

typedef MarkedText = {
clear : Void->Void,
find : Void->Pos
}

typedef LineHandle = {};

typedef ChangeEvent = {
from : Pos,
to : Pos,
text : Array<String>,
?next : ChangeEvent
}




@:native('CodeMirror.Doc')extern class Doc 
{
	public function new(body: Dynamic, mode: String);
}

@:native('CodeMirror') extern class CodeMirror {

public static var commands (default,null) : Dynamic<CodeMirror->Void>;
public static function simpleHint( cm : CodeMirror , getCompletions : CodeMirror -> Completions ) : Void;

public static function showHint( cm : CodeMirror , getCompletions : CodeMirror -> Completions ) : Void;

public static function fromTextArea( textarea : Dynamic , ?config : Dynamic ) : CodeMirror;

public static function registerHelper(param1:String, param2:String, onCompletion:Dynamic):Void;

public static function on(object:Dynamic, event:String, callback_function:Dynamic):Void;


public static function Pos(line:Int,ch:Int):Pos;
public function setValue( v : String ) : Void;
public function getValue() : String;
public function refresh() : Void;

public function indexFromPos(position:Pos):Int;

public function getCursor( ?start : Bool ) : Pos;
public function setCursor( pos:Pos ) : Void;

public function getLine(param1:Dynamic):Dynamic;
	
public function firstLine():Dynamic;
public function lastLine():Dynamic;

public function setOption(option:String, value:String):Void;
public function swapDoc(doc:Dynamic):Void;
public function getDoc():Dynamic;

public function markText(from : Pos, to : Pos, className : String ) : MarkedText;

public function setMarker( line : Int , ?text : String , ?className : String ) : LineHandle;
@:overload( function( line : LineHandle ) : Void {})
public function clearMarker(line:Int) : Void;

public function getWrapperElement() : js.html.DOMSelection;

public function somethingSelected() : Bool;
public function focus() : Void;
}
