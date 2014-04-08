package ui;

@:native('ui.Notify') extern class Notify
{
public  var type:String;
public  var content:String;

public function new():Void;
public function show():Void;
}