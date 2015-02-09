# barrage

Extensions to streams (as a mixin)

[![Build Status](https://travis-ci.org/ForbesLindesay/barrage.png?branch=master)](https://travis-ci.org/ForbesLindesay/barrage)
[![Dependency Status](https://gemnasium.com/ForbesLindesay/barrage.png)](https://gemnasium.com/ForbesLindesay/barrage)
[![NPM version](https://badge.fury.io/js/barrage.png)](http://badge.fury.io/js/barrage)

## Installation

    npm install barrage

## API

The main export is `barrage(stream)` which adds the extension methods as helper methods to an existing stream.  If used on node v0.8 it will wrap the stream using `readable-stream`.

It also exports the same API as the `v0.10` stream module with Readable, Writable, Duplex, Transform and PassThrough (except that each one is extended with the `barrage` extensions mixin).

Note that no native modules are affected, all the extensions are safe to use with other non barrage code.

The following extensions are currently added to Barrage Streams:

### barrage.syphon(stream, [options])

This is exactly like the built in `source.pipe(destination, [options])` except that it also forwards any errors emitted by `source` to the `destination`.  When your streams represent transformations, that is usually much more useful than the built in `.pipe`.

### barrage.buffer([encoding], callback)

When the barrage is a readable stream, this method buffers the results and handles errors, resulting in a node.js style `callback` API.  If there is no `encoding` parameter, the callback is called with an `Array` for the result.  If encoding is `'buffer'` then the callback is called with a single `Buffer` for the result.  If any other string is passed as `encoding`, the `encoding` parameter is passed on to `buffer.toString(encoding)` and the result is therefore a `String`

If the callback parameter is absent, a [Promises/A+](http://promises-aplus.github.io/promises-spec/) promise is returned instead.

### barrage.wait(callback)

This works like `barrage.buffer`, except that it does not buffer the result.  It will wait for an `end` or `finish` event and then call the callback.  If an error event is fired, the callback is called with that error. The callback is only ever called once.

If the callback parameter is absent, a [Promises/A+](http://promises-aplus.github.io/promises-spec/) promise is returned instead.

## License

  MIT