# wgetjs [![NPM version](https://badge.fury.io/js/wgetjs.png?branch=master)](http://badge.fury.io/js/wgetjs) [![Build Status](https://travis-ci.org/angleman/wgetjs.png?branch=master)](https://travis-ci.org/angleman/wgetjs) [![Dependency Status](https://gemnasium.com/angleman/wgetjs.png?branch=master)](https://gemnasium.com/angleman/wgetjs) [![License](http://badgr.co/use/MIT.png?bg=%234ed50e)](#licensemit)

Ultra simple async retrieval of remote files over http or https


## Install

```
npm install wgetjs
```

## Usage

```javascript
var wget = require('wgetjs');

wget(url);

wget(url, callback);

wget({url: url, dest: destination_folder_or_filename}, callback);

wget({url: url, dry: true}); // dry run, nothing loaded, callback passing parsed options as data
```

## Examples

```javascript
var wget = require('wgetjs');

wget('https://raw.github.com/angleman/wgetjs/master/angleman.png');   // angleman.png saved to current folder

wget({
		url:  'https://raw.github.com/angleman/wgetjs/master/package.json',
		dest: '/tmp/',      // destination path or path with filenname, default is ./
		timeout: 2000       // duration to wait for request fulfillment in milliseconds, default is 2 seconds
	},
	function (error, response, body) {
		if (error) {
			console.log(error);            // error encountered
		} else {
			console.log(response.headers); // response headers
			console.log(body);             // content of package
		}
	}
);

// dry run
wget({
	url: 'https://raw.github.com/angleman/wgetjs/master/package.json',
	dest: '/tmp/',
	dry: true
	}, function(err, data) {        // data: { headers:{...}, filepath:'...' }
		console.log(data.filepath); // '/tmp/package.json'
	}
})
```

## License: MIT

Dependencies:

[![request](http://badgr.co/request/Apache*.png?bg=%23339e00 "request@2.27.0 Apache (text scan guess)")](http://github.com/mikeal/request)
