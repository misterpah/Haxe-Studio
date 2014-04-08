package ;

import js.Node;

import sys.FileSystem;
import sys.FileStat;
import sys.io.File;

import haxe.Http;
import haxe.Timer;
import haxe.io.Bytes;
import haxe.io.BytesBuffer;
import haxe.io.BytesData;
import haxe.io.StringInput;

class TestSys extends haxe.unit.TestCase
{
	public static var TEST_FOLDER :String = "foo";
	
	public function testFileSystem()
	{
		if (FileSystem.exists(TEST_FOLDER)) {
			FileSystem.deleteDirectory(TEST_FOLDER);
		}
		
		assertFalse(FileSystem.exists(TEST_FOLDER));
		
		FileSystem.createDirectory(TEST_FOLDER);
		assertTrue(FileSystem.exists(TEST_FOLDER));
		assertTrue(FileSystem.isDirectory(TEST_FOLDER));
		assertTrue(FileSystem.readDirectory(TEST_FOLDER).length == 0);
		assertEquals( "A", "A" );
		
		var folders = ["A", "B", "C"];
		
		for (f in folders) {
			FileSystem.createDirectory(FileSystem.join(TEST_FOLDER, f));
		}
		
		FileSystem.createDirectory(FileSystem.join(TEST_FOLDER, folders[0], "D"));
		
		trace(FileSystem.readRecursive(TEST_FOLDER));
		
		
		
	}

}
