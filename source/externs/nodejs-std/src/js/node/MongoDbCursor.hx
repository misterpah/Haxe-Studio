package js.node;

import js.node.MongoDBTypes;
import js.node.MongoDbCollection;
import js.node.MongoDb;

/**
 * ...
 * @author sledorze
 */

typedef QueryCommand = Dynamic

@:native("Cursor")
extern
class Cursor<Document> {

  public function new(db : Db, collection : Collection<Document>, selector : Dynamic, fields : Dynamic, skip : Int, limit : Int, sort : Dynamic, hint : Dynamic, explain : Bool, snapshot : Bool, timeout : Int, tailable : Bool, batchSize : Int):Void;

	private static function __init__() : Void untyped {
    var req = Node.require('mongodb');
	  Cursor = req.Cursor;
	}

  public var db : Db;
  public var collection : Collection<Document>;
  public var selector : Dynamic;
  public var fields : Dynamic;
  public var skipValue : Bool;
  public var limitValue : Int;
  public var sortValue : Dynamic;
  public var hint : Dynamic;
  public var explainValue : Bool;
  public var snapshot : Bool;
  public var timeout : Int;
  public var tailable : Bool;
  public var batchSizeValue : Int;

  public var totalNumberOfRecords : Int;
  public var items : Array<Document>;
  public var cursorId : Dynamic;

  // State variables for the cursor
  public var state : Int;
  // Keep track of the current query run
  public var queryRun : Bool;
  public var getMoreTimer : Bool;
  public var collectionName : String;


/**
 * Resets this cursor to its initial state. All settings like the query string,
 * tailable, batchSizeValue, skipValue and limits are preserved.
 */
  public function rewind () : Void;

/**
 * Returns an array of documents. The caller is responsible for making sure that there
 * is enough memory to store the results. Note that the array only contain partial
 * results when this cursor had been previouly accessed. In that case,
 * {@link Cursor<Document>#rewind} can be used to reset the cursor.
 *
 * @param callBack {function(Error, Array<Object>)} This will be called after executing
 *     this method successfully. The first paramter will contain the Error object if an
 *     error occured, or null otherwise. The second paramter will contain an array of
 *     BSON deserialized objects as a result of the query.
 *
 *     Error cases include:
 *     <ol>
 *       <li>Attempting to call this method with a tailable cursor.</li>
 *     </ol>
 *
 * @see Cursor<Document>#rewind
 * @see Cursor<Document>#each
 */
  public function toArray (callBack : Error -> Array<Document> -> Void) : Void;

/**
 * Iterates over all the documents for this cursor. As with {@link Cursor<Document>#toArray},
 * not all of the elements will be iterated if this cursor had been previouly accessed.
 * In that case, {@link Cursor<Document>#rewind} can be used to reset the cursor. However, unlike
 * {@link Cursor<Document>#toArray}, the cursor will only hold a maximum of batch size elements
 * at any given time if batch size is specified. Otherwise, the caller is responsible
 * for making sure that the entire result can fit the memory.
 *
 * @param callBack {function(Error, Object)} This will be called for while iterating
 *     every document of the query result. The first paramter will contain the Error
 *     object if an error occured, or null otherwise. While the second paramter will
 *     contain the document.
 *
 * @see Cursor<Document>#rewind
 * @see Cursor<Document>#toArray
 * @see Cursor<Document>#batchSize
 */
  public function each (callBack : Error -> Document -> Void) : Void;

/**
 * Determines how many result the query for this cursor will return
 *
 * @param callBack {function(?Error, ?number)} This will be after executing this method.
 *     The first paramter will contain the Error object if an error occured, or null
 *     otherwise. While the second paramter will contain the number of results or null
 *     if an error occured.
 */

  public function count (callBack : Error -> Int -> Void) : Void;

/**
 * Sets the sort parameter of this cursor to the given value.
 *
 * This method has the following method signatures:
 * (keyOrList, callBack)
 * (keyOrList, direction, callBack)
 *
 * @param keyOrList {string|Array<Array<string|object> >} This can be a string or an array.
 *     If passed as a string, the string will be the field to sort. If passed an array,
 *     each element will represent a field to be sorted and should be an array that contains
 *     the format [string, direction]. Example of a valid array passed:
 *
 *     <pre><code>
 *     [
 *       ["id", "asc"], //direction using the abbreviated string format
 *       ["name", -1], //direction using the number format
 *       ["age", "descending"], //direction using the string format
 *     ]
 *     </code></pre>
 *
 * @param direction {string|number} This determines how the results are sorted. "asc",
 *     "ascending" or 1 for asceding order while "desc", "desceding or -1 for descending
 *     order. Note that the strings are case insensitive.
 * @param callBack {?function(?Error, ?Cursor<Document>)} This will be called after executing
 *     this method. The first parameter will contain an error object when the
 *     cursor is already closed while the second parameter will contain a reference
 *     to this object upon successful execution.
 *
 * @return {Cursor<Document>} an instance of this object.
 *
 * @see Cursor<Document>#formatSortValue
 */

  @:overload(function(keyList : Array<Array<Dynamic>>, ?callBack : Error -> Cursor<Document> -> Void) : Cursor<Document> {})
  @:overload(function(key : String, direction : Int, ?callBack : Error -> Cursor<Document> -> Void) : Cursor<Document> {})
  public function sort(key : String, direction : String, ?callBack : Error -> Cursor<Document> -> Void) : Cursor<Document>;

/**
 * Sets the limit parameter of this cursor to the given value.
 *
 * @param limit {Number} The new limit.
 * @param callBack {?function(?Error, ?Cursor<Document>)} This will be called after executing
 *     this method. The first parameter will contain an error object when the
 *     limit given is not a valid number or when the cursor is already closed while
 *     the second parameter will contain a reference to this object upon successful
 *     execution.
 *
 * @return {Cursor<Document>} an instance of this object.
 */
  public function limit(limit : Int, ?callBack : Error -> Cursor<Document> -> Void) : Cursor<Document>;

/**
 * Sets the skip parameter of this cursor to the given value.
 *
 * @param skip {Number} The new skip value.
 * @param callBack {?function(?Error, ?Cursor<Document>)} This will be called after executing
 *     this method. The first parameter will contain an error object when the
 *     skip value given is not a valid number or when the cursor is already closed while
 *     the second parameter will contain a reference to this object upon successful
 *     execution.
 *
 * @return {Cursor<Document>} an instance of this object.
 */
  public function skip(skip : Int, ?callBack : Error -> Cursor<Document> -> Void) : Cursor<Document>;

/**
 * Sets the batch size parameter of this cursor to the given value.
 *
 * @param batchSize {Number} The new batch size.
 * @param callBack {?function(?Error, ?Cursor<Document>)} This will be called after executing
 *     this method. The first parameter will contain an error object when the
 *     batchSize given is not a valid number or when the cursor is already closed while
 *     the second parameter will contain a reference to this object upon successful
 *     execution.
 *
 * @return {Cursor<Document>} an instance of this object.
 */
  public function batchSize(batchSize : Int, callBack : Error -> Cursor<Document> -> Void) : Cursor<Document>;

/**
 * @return {number} The number of records to request per batch.
 */

  public function limitRequest() : Int;

/**
 * Generates a QueryCommand object using the parameters of this cursor.
 *
 * @return {QueryCommand} The command object
 */
  public function generateQueryCommand () : QueryCommand;

/**
 * @return {Object} Returns an object containing the sort value of this cursor with
 *     the proper formatting that can be used internally in this cursor.
 */
  public function formattedOrderClause () : Dynamic;

/**
 * Converts the value of the sort direction into its equivalent numerical value.
 *
 * @param sortDirection {String|number} Range of acceptable values:
 *     'ascending', 'descending', 'asc', 'desc', 1, -1
 *
 * @return {number} The equivalent numerical value
 * @throws Error if the given sortDirection is invalid
 */
  @:overload(function(sortDirection : Int) : Int { })
  public function formatSortValue (sortDirection : String) : Int;

/**
 * Gets the next document from the database.
 *
 * @param callBack {function(?Error, ?Object)} This will be called after executing
 *     this method. The first parameter will contain an error object on error while
 *     the second parameter will contain a document from the returned result or null
 *     if there are no more results.
 *
 * @see Cursor<Document>#limit
 * @see Cursor<Document>#batchSize
 */
  public function nextObject(callBack : Error -> Document -> Void) : Void;

/**
 * Gets more results from the database if any.
 *
 * @param callBack {function(?Error, ?Object)} This will be called after executing
 *     this method. The first parameter will contain an error object on error while
 *     the second parameter will contain a document from the returned result or null
 *     if there are no more results.
 */
  public function getMore(callBack : Error -> Document -> Void) : Void;

/**
 * Gets a detailed information about how the query is performed on this cursor and how
 * long it took the database to process it.
 *
 * @param callBack {function(null, Object)} This will be called after executing this
 *     method. The first parameter will always be null while the second parameter
 *     will be an object containing the details.
 *
 * @see http://www.mongodb.org/display/DOCS/Optimization#Optimization-Explain
 */

  public function explain (callBack : Error -> Document -> Void) : Void;

  @:overload(function() : js.Node.NodeEventEmitter { })
  public function streamRecords (options : Dynamic) : js.Node.NodeEventEmitter;

/**
 * Close this cursor.
 *
 * @param callBack {?function(null, ?Object)} This will be called after executing
 *     this method. The first parameter will always contain null while the second
 *     parameter will contain a reference to this cursor.
 */
  public function close(callBack : Error -> Cursor<Document> -> Void) : Void;

/**
 * @return true if this cursor is closed
 */
  public function isClosed () : Bool;
}
