package js.node;

import js.node.MongoDBTypes;
import js.node.MongoDbCursor;
import js.node.MongoDb;

/**
 * ...
 * @author sledorze
 */
typedef Stats = {
  processtime: Int,
  counts: Int
}

@:native("Collection")
extern
class Collection<Document> {

  @:overload(function(doc : Document, callBack : Error -> Array<Document> -> Void) : Collection<Document> {})
  @:overload(function(doc : Document, options : Dynamic) : Collection<Document> {})
  public function insert(doc : Document, options : Dynamic, callBack : Error -> Array<Document> -> Void) : Collection<Document>;

  // throws if name is malformed
  public function checkCollectionName (collectionName : String) : Void;

  @:overload(function (callBack : Error -> Collection<Document> -> Void) : Void {})
  @:overload(function (selector : Dynamic, callBack : Error -> Collection<Document> -> Void) : Void {})
  public function remove (selector : Dynamic, options : Dynamic, callBack : Error -> Collection<Document> -> Void) : Void;



  public function rename (collectionName : String, callBack : Error -> Collection<Document> -> Void) : Void;

  @:overload(function(docs : Array<Document>, callBack : Error -> Array<Document> -> Void) : Collection<Document> {})
  @:overload(function(docs : Array<Document>, options : Dynamic) : Collection<Document> {})
  public function insertAll(docs : Array<Document>, options : Dynamic, callBack : Error -> Array<Document> -> Void) : Collection<Document>;



  @:overload(function(doc : Document, callBack : Error -> Document -> Void) : Collection<Document> {})
  @:overload(function(doc : Document, options : Dynamic) : Collection<Document> {})
  public function save (doc : Document, options : Dynamic, callBack : Error -> Document -> Void) : Void;

/**
  Update a single document in this collection.
    spec - a associcated array containing the fields that need to be present in
      the document for the update to succeed

    document - an associated array with the fields to be updated or in the case of
      a upsert operation the fields to be inserted.

  Options:
    upsert - true/false (perform upsert operation)
    multi - true/false (update all documents matching spec)
    safe - true/false (perform check if the operation failed, required extra call to db)
**/
  @:overload(function(spec : Dynamic, document : Dynamic, options : Dynamic, callBack : Error -> Void) : Void {})
  @:overload(function(spec : Dynamic, document : Dynamic, options : Dynamic) : Void {})
  public function update(spec : Dynamic, document : Dynamic, callBack : Error -> Void) : Void;

/**
  Fetch a distinct collection
**/
  @:overload(function(key : String, callBack : Error -> Dynamic -> Void) : Void {})
  public function distinct(key : String, query : Dynamic, callBack : Error -> Dynamic -> Void) : Void;


  @:overload(function(callBack : Error -> Int -> Void) : Void {})
  public function count (query : Dynamic, callBack : Error -> Int -> Void) : Void;

  public function drop (callBack : Error -> Bool -> Void) : Void;

/**
  Fetch and update a collection
  query:        a filter for the query
  sort:         if multiple docs match, choose the first one in the specified sort order as the object to manipulate
  update:       an object describing the modifications to the documents selected by the query
  options:
    remove:   set to a true to remove the object before returning
    new:      set to true if you want to return the modified object rather than the original. Ignored for remove.
    upsert:       true/false (perform upsert operation)
**/
  @:overload(function(query : Dynamic, callBack : Error -> Document -> Void) : Void {})
  @:overload(function(query : Dynamic, sort : Array<Dynamic>, callBack : Error -> Document -> Void) : Void {})
  @:overload(function(query : Dynamic, sort : Array<Dynamic>, update : Dynamic, callBack : Error -> Document -> Void) : Void {})
  public function findAndModify(query : Dynamic, sort : Array<Dynamic>, update : Dynamic, options : Dynamic, callBack : Error -> Document -> Void) : Void;

/**
 * Various argument possibilities
 * 1 callBack?
 * 2 selector, callBack?,
 * 2 callBack?, options  // really?!
 * 3 selector, fields, callBack?
 * 3 selector, options, callBack?
 * 4,selector, fields, options, callBack?
 * 5 selector, fields, skip, limit, callBack?
 * 6 selector, fields, skip, limit, timeout, callBack?
 *
 * Available options:
 * limit, sort, fields, skip, hint, explain, snapshot, timeout, tailable, batchSize
 */
  @:overload(function() : Cursor<Document> {})
  @:overload(function(fields : Dynamic) : Cursor<Document> {})
  @:overload(function(options : Dynamic) : Cursor<Document> {})
  @:overload(function(selector : Dynamic, fields : Dynamic) : Cursor<Document> {})
  @:overload(function(selector : Dynamic, options : Dynamic) : Cursor<Document> {})
  @:overload(function(selector : Dynamic, fields : Dynamic, options : Dynamic) : Cursor<Document> {})
  @:overload(function(selector : Dynamic, fields : Dynamic, skip : Int, limit : Int) : Cursor<Document> {})
  @:overload(function(selector : Dynamic, fields : Dynamic, skip : Int, limit : Int, timeout : Int) : Cursor<Document> {})
  @:overload(function(callBack : Error -> Cursor<Document> -> Void) : Void {})
  @:overload(function(fields : Dynamic, callBack : Error -> Cursor<Document> -> Void) : Void {})
  @:overload(function(callBack : Error -> Cursor<Document> -> Void, options : Dynamic) : Void {})
  @:overload(function(selector : Dynamic, fields : Dynamic, callBack : Error -> Cursor<Document> -> Void) : Void {})
  @:overload(function(selector : Dynamic, options : Dynamic, callBack : Error -> Cursor<Document> -> Void) : Void {})
  @:overload(function(selector : Dynamic, fields : Dynamic, options : Dynamic, callBack : Error -> Cursor<Document> -> Void) : Void {})
  @:overload(function(selector : Dynamic, fields : Dynamic, skip : Int, limit : Int, callBack : Error -> Cursor<Document> -> Void) : Void {})
  public function find(selector : Dynamic, fields : Dynamic, skip : Int, limit : Int, timeout : Int, callBack : Error -> Cursor<Document> -> Void) : Void;


  @:overload(function(hint : Array<Dynamic>) : Void {}) // or Array<String> ??
  @:overload(function(hint : String) : Void {})
  public function normalizeHintField (hint : Dynamic) : Dynamic;

  @:overload(function(callBack : Error -> Document -> Void) : Void {})
  @:overload(function(queryObject : Dynamic, callBack : Error -> Document -> Void) : Void {})
  public function findOne(queryObject : Dynamic, options : Dynamic, callBack : Error -> Document -> Void) : Void;

  public function createIndex(fieldOrSpec : Dynamic, unique : Bool, callBack : Error -> String -> Void) : Void;

  public function ensureIndex (fieldOrSpec : Dynamic, unique : Bool, callBack : Error -> String -> Void) : Void;

  public function indexInformation (callBack : Error -> Dynamic -> Void) : Void;

  public function dropIndex (indexName : String, callBack : Error -> Bool -> Void) : Void;

  public function dropIndexes(callBack : Error -> Bool -> Void) : Void;


  @:overload(function(map : String, reduce : String, callBack : Error -> Collection<Document> -> Stats -> Void) : Void {})
  @:overload(function(map : String, reduce : String, options : Dynamic, callBack : Error -> Collection<Document> -> Stats -> Void) : Void {})
  @:overload(function(map : String, reduce : String, callBack : Error -> Collection<Document> -> Void) : Void {})
  @:overload(function(map : String, reduce : String, options : Dynamic, callBack : Error -> Collection<Document> -> Void) : Void {})
  @:overload(function(map : Void -> Void, reduce : Dynamic -> Array<Dynamic> -> Dynamic, callBack : Error -> Collection<Document> -> Stats -> Void) : Void {})
  @:overload(function(map : Void -> Void, reduce : Dynamic -> Array<Dynamic> -> Dynamic, options : Dynamic, callBack : Error -> Collection<Document> -> Stats -> Void) : Void {})
  @:overload(function(map : Void -> Void, reduce : Dynamic -> Array<Dynamic> -> Dynamic, callBack : Error -> Collection<Document> -> Void) : Void {})
  public function mapReduce(map : Void -> Void, reduce : Dynamic -> Array<Dynamic> -> Dynamic, options : Dynamic, callBack : Error -> Collection<Document> -> Void) : Void;



  @:overload(function(keys : Dynamic, condition : Dynamic, initial : Dynamic, callBack : Error -> Dynamic -> Void) : Void {})
  @:overload(function(keys : Dynamic, condition : Dynamic, initial : Dynamic, reduce : Dynamic -> Dynamic -> Void, callBack : Error -> Dynamic -> Void) : Void {})
  public function group (keys : Dynamic, condition : Dynamic, initial : Dynamic, reduce : Dynamic -> Dynamic -> Void, command : Bool, callBack : Error -> Dynamic -> Void) : Void;


  public function options(callBack : Error -> Dynamic -> Void) : Void;


  public function new(db : Db, collectionName : String, pkFactory : Dynamic):Void; // ??

	private static function __init__() : Void untyped {
    var req = Node.require('mongodb');
	  Collection = req.Collection;
	}

  public var hint : Dynamic; // ??
}
