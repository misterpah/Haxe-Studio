package ui;
import jQuery.JQuery;
import js.Browser;
import js.html.AnchorElement;
import js.html.DivElement;
import js.html.Element;
import js.html.LIElement;
import js.html.LinkElement;
import js.html.MouseEvent;
import js.html.NodeList;
import js.html.SpanElement;
import js.html.UListElement;

/**
 * ...
 * @author AS3Boyan
 */

@:keep @:expose interface MenuItem
{
	public function getElement():Element;
}
 
@:keep @:expose class MenuButtonItem implements MenuItem
{	
	var li:LIElement;
	
	public function new(_text:String, _onClickFunctionName:String, _onClickFunction:Void->Void, ?_hotkey:String)
	{		
		var span:SpanElement = null;
		
		if (_hotkey != null)
		{
			span = Browser.document.createSpanElement();
			span.style.color = "silver";
			span.style.float = "right";
			span.innerText = _hotkey;
		}
		
		li = Browser.document.createLIElement();		
		
		var a:AnchorElement = Browser.document.createAnchorElement();
		a.style.left = "0";
		
		a.setAttribute("onclick", "$(document).triggerHandler(\"" + _onClickFunctionName + "\");");
		
		a.innerText = _text;
		
		if (span != null)
		{
			a.appendChild(span);
		}
		
		li.appendChild(a);
		
		registerEvent(_onClickFunctionName, _onClickFunction);
	}
	
	public function getElement():LIElement
	{
		return li;
	}
	
	public function registerEvent(_onClickFunctionName, _onClickFunction:Dynamic):Void
	{
		if (_onClickFunction != null) 
		{
			new JQuery(js.Browser.document).on(_onClickFunctionName, _onClickFunction);
		}
	}
}

class Separator implements MenuItem
{
	var li:LIElement;
	
	public function new()
	{
		li = Browser.document.createLIElement();
		li.className = "divider";
	}
	
	public function getElement():Element
	{
		return li;
	}
}
 
class Menu
{
	var li:LIElement;
	var ul:UListElement;
	
	public function new(_text:String, ?_headerText:String) 
	{
		li = Browser.document.createLIElement();
		li.className = "dropdown";
		
		var a:AnchorElement = Browser.document.createAnchorElement();
		a.href = "#";
		a.className = "dropdown-toggle";
		a.setAttribute("data-toggle", "dropdown");
		a.innerText = _text;
		li.appendChild(a);
		
		ul = Browser.document.createUListElement();
		ul.className = "dropdown-menu";
		
		if (_headerText != null)
		{
			var li_header:LIElement = Browser.document.createLIElement();
			li_header.className = "dropdown-header";
			li_header.innerText = _headerText;
			ul.appendChild(li_header);
		}
		
		li.appendChild(ul);
	}
	
	public function addMenuItem(_text:String, _onClickFunctionName:String, _onClickFunction:Void->Void, ?_hotkey:String):Void
	{
		ul.appendChild(new MenuButtonItem(_text, _onClickFunctionName, _onClickFunction, _hotkey).getElement());
	}
	
	public function addSeparator():Void
	{
		ul.appendChild(new Separator().getElement());
	}
	
	public function addToDocument():Void
	{	
		var div:Element = cast(Browser.document.getElementById("position-navbar"), Element);
		div.appendChild(li);
	}
	
	public function setDisabled(indexes:Array<Int>):Void
	{
		var childNodes:NodeList = ul.childNodes;
		
		for (i in 0...childNodes.length)
		{
			var child:Element = cast(childNodes[i], Element);
			
			if (child.className != "divider")
			{
				if (Lambda.indexOf(indexes, i) == -1)
				{
					child.className = "";
				}
				else
				{
					child.className = "disabled";
				}
			}
			
		}
	}
	
}