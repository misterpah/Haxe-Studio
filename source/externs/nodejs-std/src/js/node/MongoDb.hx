package js.node;

import js.Node;

import js.node.MongoDBTypes;
import js.node.MongoDbCursor;
import js.node.MongoDbConnection;
import js.node.MongoDbCollection;


/**
 * Externs for mongodb natives
 * ...
 * @author sledorze
 */

/* To Implement (these are 'new's)
class BsonSerializer {
  new client.bson_serializer.Long(numberString)
  new client.bson_serializer.ObjectID(hexString)
  new client.bson_serializer.Timestamp()  // the actual unique number is generated on insert.
  new client.bson_serializer.DBRef(collectionName, id, dbName)
  new client.bson_serializer.Binary(buffer)  // takes a string or Buffer
  new client.bson_serializer.Code(code, [context])  
}
*/
class MongoIdHelper {
  
  inline public static function cleanId<Document>(data: Document) : Document {
    untyped data._id = Std.string(data._id);
    return data;
  }
  
  inline public static function cleanIds(datas: Array<Document>) : Array<Document> {
    for (data in datas) {
      untyped data._id = Std.string(data._id);
    }
    return datas;
  }
  
  inline public static function mongoIdStr(db : Db, x : String) : Dynamic return
    untyped db.bson_serializer.ObjectID(x)
  
  inline public static function mongoId<T>(db : Db, x : T) : Dynamic return
    untyped db.bson_serializer.ObjectID(untyped x._id)
}

@:native("Db")
extern
class Db {

//  public var bson_serializer : BsonSerializer;
  
  public function open(callBack : Dynamic -> Db -> Void) : Void;
  public function close() : Void;
  public function admin(callBack : Error -> Admin -> Void) : Void;


  @:overload(function () : Cursor<Document> {})
  @:overload(function (callBack : Error -> Cursor<Document> -> Void) : Void {})
  public function collectionsInfo(collection_name : String, callBack : Error -> Cursor<Document> -> Void) : Void;

  @:overload(function (callBack : Error -> Array<Document> -> Void) : Void {})
  public function collectionNames(collection_name : String, callBack : Error -> Array<Document> -> Void) : Void;

  public function collection<Document>(collectionName : String, callBack : Error -> Collection<Document> -> Void) : Void;
  public function collections(callBack : Error -> Array<Collection<Document>> -> Void) : Void;

  @:overload(function (code : Dynamic, callBack : Error -> String -> Void) : Void {})
  public function eval(code : Dynamic, parameters : Dynamic, callBack : Error -> String -> Void) : Void;

  public function dereference (dbRef : DBRef, callBack : Error -> Dynamic -> Void) : Void;

  public function authenticate (username : String, password : String, callBack : Error -> Bool -> Void) : Void;

  public function addUser (username : String, password : String, callBack : Error -> Dynamic -> Void) : Void;

  public function removeUser (username : String, callBack : Error -> Bool -> Void) : Void;

  public function logout (callBack : Error -> Dynamic -> Void) : Void;

  public function createCollection<Document> (collectionName : String, options : Dynamic, callBack : Error -> Collection<Document> -> Void) : Void;

  public function command (selector : String /*?*/, callBack : Error -> Dynamic -> Void /*?*/) : Void;

  public function dropCollection (collectionName : String, callBack : Error -> Bool -> Void) : Void;

  public function renameCollection (fromCollection : String, toCollection : String, callBack : Error -> Dynamic /*?*/ -> Void) : Void;

  public function lastError (callBack : Error -> Array<Dynamic> /*?*/ -> Void) : Void;
  public function error (callBack : Error -> Dynamic /*?*/ -> Void) : Void;

  public function lastStatus(callBack : Error -> Dynamic -> Void) : Void;

  public function previousErrors(callBack : Error -> Dynamic -> Void) : Void;

  public function executeDbCommand(command_hash : Dynamic, callBack : Error -> Dynamic -> Void) : Void;

  /**
    Resets the error history of the mongo instance
  **/
  public function resetErrorHistory(callBack : Error -> Dynamic -> Void) : Void;

  /**
    Create an index on a collection
  **/
  @:overload(function (collectionName : String, fieldOrSpec : Dynamic, callBack : Error -> String -> Void) {})
  public function createIndex (collectionName : String, fieldOrSpec : Dynamic, unique : Bool, callBack : Error -> String -> Void) : Void;

  /**
    Ensure index, create an index if it does not exist
  **/
  @:overload(function (collectionName : String, fieldOrSpec : Dynamic, callBack : Error -> String -> Void) {})
  public function ensureIndex (collectionName : String, fieldOrSpec : Dynamic, unique : Bool, callBack : Error -> String -> Void) : Void;

  /**
    Fetch the cursor information
  **/
  public function cursorInfo (callBack : Error -> Document -> Void) : Void;

  /**
    Drop Index on a collection
  **/
  public function dropIndex (collectionName : String, indexName : String, callBack : Error -> Bool -> Void) : Void;

  /**
    Index Information
  **/
  @:overload(function (callBack : Error -> Dynamic -> Void) {})
  public function indexInformation(collectionName : String, callBack : Error -> Dynamic -> Void) : Void;

  /**
    Database Drop Command
  **/
  public function dropDatabase (callBack : Error -> Bool -> Void) : Void;

  /**
    Execute db command
  **/
  public function executeCommand (db_command : Dynamic, callBack : Error -> Dynamic -> Void) : Void;

  public static function connect(?url : String, callBack : Error -> Db -> Void) : Void;


  /**
  * Checks for latest master by calling isMasterCommand on each server
  * of serverConfig
  * @param dbcopy{instance of db}
  *
  **/
  public function checkMaster_(dbcopy : Db, returnback : Error -> String -> Db) : Void;

	public function new(databaseName : String, serverConfig : Server, options : Dynamic):Void;

	private static function __init__() : Void untyped {
    var req = Node.require('mongodb');
	  Db = req.Db;
    connect = req.connect;
	}

  // from js.Node.NodeEventEmitter
  public function addListener(event:String,fn: NodeListener):Dynamic;
  public function on(event:String,fn:NodeListener):Dynamic;
  public function once(event:String,fn:NodeListener):Void;
  public function removeListener(event:String,listener:NodeListener):Void;
  public function removeAllListeners(event:String):Void;
  public function listeners(event:String):Array<NodeListener>;
  public function setMaxListeners(m:Int):Void;
  public function emit(event:String,?arg1:Dynamic,?arg2:Dynamic,?arg3:Dynamic):Void;
}
