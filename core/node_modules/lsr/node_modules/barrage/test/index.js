'use strict'

var assert = require('assert')
var s = require('stream').Transform ? require('stream') : require('readable-stream')
var b = require('../')

var old = !require('stream').Transform

describe('barrage(stream) mixin', function () {
  if (old) {
    describe('in v0.8 and earlier', function () {
      it('wraps the read side of the stream using `readable-stream`', function (done) {
        var r = new (require('stream'))()
        var wrapped = b(r)
        assert(wrapped instanceof s.Readable)
        r.emit('data', 'foo')
        setTimeout(function () {
          wrapped.buffer(function (err, data) {
            if (err) return done(err)
            assert.deepEqual(['foo', 'bar'], data)
            done()
          })
        }, 20)
        r.emit('data', 'bar')
        r.emit('end')
      })
    })
  } else {
    describe('in v0.10 and later', function () {
      it('returns `stream` as a mixin', function () {
        var r = new s.Readable()
        var w = new s.Writable()
        var t = new s.Transform()
        assert(b(r) === r)
        assert(b(w) === w)
        assert(b(t) === t)
      })
    })
  }
})

function streamType(name, type) {
  describe('barrage.' + name, function () {
    var i = new b[name]()
    it('is an instance of stream.' + name, function () {
      assert(i instanceof s[name])
    })
    it('is not the same as stream.' + name, function () {
      assert(b[name] != s[name])
    })
    it('is a ' + type + ' barrage', function () {
      if (type === 'readable' || type === 'writable') {
        assert(typeof i.syphon === 'function')
        assert(typeof i.buffer === 'function')
        assert(typeof i.wait === 'function')
      } else {
        throw new Error('unrecognized type')
      }
    })
  })
}
streamType('Readable', 'readable')
streamType('Writable', 'writable')
streamType('Duplex', 'readable')
streamType('Transform', 'readable')
streamType('PassThrough', 'readable')

describe('barrage extensions', function () {
  describe('BarrageStream#syphon', function () {
    it('pipes data', function (done) {
      var source = new b.Readable()
      source._read = function () {
        this.push('foo')
        this.push('bar')
        this.push(null)
      }
      var dest = new b.PassThrough()
      source.syphon(dest)
      var data = []
      dest
        .on('error', done)
        .on('data', function (chunk) {
          data.push(chunk)
        })
        .on('end', function () {
          assert.equal('foobar', data.join(''))
          done()
        })
    })
    it('pipes errors', function (done) {
      var singleton = {}
      var source = new b.Readable()
      source._read = function () {
      }
      var dest = new b.PassThrough()
      source.syphon(dest)
      dest.on('error', function(err) {
        assert.equal(singleton, err)
        done()
      })
      source.emit('error', singleton)
    })
  })
  describe('BarrageStream#wait', function () {
    it('waits for `finish` or `end` events and catches `error` events', function (done) {
      var source = new b.Readable()
      source._read = function () {
        this.push('foo')
        this.push('bar')
        this.push(null)
      }
      source.wait(function (err, data) {
        if (err) return done(err)
        assert.equal(undefined, data)
        var sourceB = new b.Readable()
        sourceB._read = function () {
        }
        var singleton = {}
        sourceB.wait(function (err) {
          assert.equal(singleton, err)
          done()
        })
        sourceB.emit('error', singleton)
      })
    })
  })
  describe('BarrageStream#buffer', function () {
    it('buffers the content of a Readable stream and catches `error` events', function (done) {
      var source = new b.Readable({objectMode: true})
      source._read = function () {
        this.push('foo')
        this.push('bar')
        this.push(null)
      }
      source.buffer(function (err, data) {
        if (err) return done(err)
        assert.deepEqual(['foo', 'bar'], data)
        var sourceB = new b.Readable({objectMode: false})
        sourceB._read = function () {
          this.push('foo')
          this.push('bar')
          this.push(null)
        }
        sourceB.buffer('buffer', function (err, data) {
          if (err) return done(err)
          assert(Buffer.isBuffer(data))
          assert.equal('foobar', data.toString())

          var sourceC = new b.Readable({objectMode: false})
          sourceC._read = function () {
            this.push('foo')
            this.push('bar')
            this.push(null)
          }
          sourceC.buffer('utf8', function (err, data) {
            if (err) return done(err)
            assert(typeof data === 'string')
            assert.equal('foobar', data)

            var sourceD = new b.Readable()
            sourceD._read = function () {
            }
            var singleton = {}
            sourceD.buffer(function (err) {
              assert.equal(singleton, err)
              done()
            })
            sourceD.emit('error', singleton)
          })
        })
      })
    })
  })
})