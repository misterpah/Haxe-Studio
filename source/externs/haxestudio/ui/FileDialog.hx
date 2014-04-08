package ui;

@:native('ui.FileDialog') extern class FileDialog
{
public function new():Void;
public function show(function_name:Dynamic, saveAs:Bool=false):Void;
}