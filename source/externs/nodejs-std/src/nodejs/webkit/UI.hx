package nodejs.webkit;

@:native('nodejs.webkit.$ui')
class UI {
	
	static function __init__() : Void untyped {
		__js__("nodejs.webkit.$ui = require('nw.gui')");
	}
}
