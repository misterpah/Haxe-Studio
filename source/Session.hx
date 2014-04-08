package ;

@:keep @:expose  class Session
{
	public var project_xml:String;
	public var project_xml_parameter:String;
	public var project_folder:String;
	public var active_file:String;

	public function new()
	{
		project_xml = "";
		project_xml_parameter = "";
		project_folder = "";
		active_file = "";
	}
}