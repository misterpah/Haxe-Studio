var fs      = require('fs')
  , request = require('request') // mikeal/request
;


function wget(options, callback) {
	if (typeof options === 'string') {
		options  = { url: options };
	}
	options      = options  || {};
	callback     = callback || function (){};
	var src      = options.url || options.uri || options.src
	  , parts    = src.split('/')
	  , file     = parts[parts.length-1]
	;
	parts        = file.split('?');
	file         = parts[0];
	parts        = file.split('#');
	file         = parts[0];
	options.dest = options.dest || './';
	if (options.dest.substr(options.dest.length-1,1) == '/') {
		options.dest = options.dest + file;
	}


	function handle_request_callback(err, res, body) {
		if (err) {
			callback(err);
		} else {
			var data = {
				filepath: options.dest
			};
			if (res && res.headers) {
				data.headers = res.headers
			}
			callback(err, data);
		}
	}


	if (options.dry) {
		handle_request_callback(null, {}, { filepath: options.dest });
		return options.dest;
	} else {
		try {
			request(options, handle_request_callback).pipe(fs.createWriteStream(options.dest));
		} catch (err) {
			callback(err);
		}
	}
}

module.exports = wget;