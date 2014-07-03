var restify = require('restify');

hs_server = require('restify').createServer({
		  name: 'HaxeStudio restify server',
		  version: '1.0.0'
		});

hs_server_port = 8080;




		

(function(){
hs_server.use(restify.acceptParser(hs_server.acceptable));
hs_server.use(restify.queryParser());
hs_server.use(restify.bodyParser());

var isPortTaken = function(port, fn) {
  var net = require('net')
  var tester = net.createServer()
  .once('error', function (err) {
    if (err.code != 'EADDRINUSE') return fn(err)
    fn(null, true)
  })
  .once('listening', function() {
    tester.once('close', function() { fn(null, false) })
    .close()
  })
  .listen(port)
}


isPortTaken(hs_server_port,start_hs_server);

function start_hs_server(p1,p2)
{
	if (p2 == false)
		{
		hs_server.listen(hs_server_port, function () {
		  console.log('%s listening at %s', hs_server.name, hs_server.url);
		});
		}
}


hs_server.get('/', function (req, res, next) {
  data['result'] = req.params;
  res.setHeader('content-type', 'text/txt');
  res.end("This is a server spawned by Haxe Studio. ");
  return next();
});	

hs_server.get('crossdomain.xml', function (req, res, next) {
  res.setHeader('content-type', 'application/xml');
  res.end('<?xml version="1.0"?><cross-domain-policy><allow-access-from domain="*" /></cross-domain-policy>');
  return next();
});

/*

SAMPLE FOR POST REQUEST

hs_server.post('/result', function (req, res, next) {
console.dir(req.params);

// you must return this line.
res.send("<?xml version=\"1.0\"?>\n<!DOCTYPE cross-domain-policy SYSTEM \"/xml/dtds/cross-domain-policy.dtd\">\n<cross-domain-policy><allow-access-from domain=\"*\" to-ports=\"*\" /></cross-domain-policy>");
return next();
});	
*/

})();
