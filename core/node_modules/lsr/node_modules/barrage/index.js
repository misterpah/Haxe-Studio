'use strict'

var Promise = require('promise')

var old = !require('stream').Transform
var stream = old ? require('readable-stream') : require('stream')

module.exports = barrage
function barrage(s, prototype) {
  if (old && !prototype) {
    if (!(s instanceof stream.Readable || s instanceof stream.Writable)) {
      var os = s
      s = new stream.Readable({objectMode: true})
      s.wrap(os)
    }
  }
  s.syphon = syphon
  s.wait = wait
  s.buffer = buffer
  return s
}
barrage.Readable = load('Readable')
barrage.Writable = load('Writable')
barrage.Duplex = load('Duplex')
barrage.Transform = load('Transform')
barrage.PassThrough = load('PassThrough')



function load(clsName) {
  var cls = stream[clsName]
  function Barrage() {
    return cls.apply(this, arguments)
  }
  Barrage.prototype = Object.create(cls.prototype)
  barrage(Barrage.prototype, true)
  return Barrage
}

/* Extensions */

function syphon(stream, options) {
  this.on('error', stream.emit.bind(stream, 'error'))
  return this.pipe(stream, options)
}

function wait(callback) {
  var self = this
  var p = new Promise(function (resolve, reject) {
    self.on('error', reject)
    self.on('finish', resolve)
    self.on('end', resolve)
    self.on('close', resolve)
    if (typeof self.resume === 'function') self.resume()
  })
  return p.nodeify(callback)
}

function buffer(encoding, callback) {
  if (typeof encoding === 'function') callback = encoding, encoding = undefined

  var self = this
  var p = new Promise(function (resolve, reject) {
    var dest = new stream.Writable({decodeStrings: !!encoding, objectMode: !encoding})
    var erred = false
    var body = []
    dest._write = function (chunk, encoding, callback) {
      if (!erred) {
        body.push(chunk)
      }
      callback()
    }
    dest.on('error', function (err) {
      reject(err)
      erred = true
    })
    dest.on('finish', function () {
      if (erred) return
      if (encoding === 'buffer') resolve(Buffer.concat(body))
      else if (encoding) resolve(Buffer.concat(body).toString(encoding))
      else resolve(body)
    })
    self.syphon(dest)
  })
  return p.nodeify(callback)
}