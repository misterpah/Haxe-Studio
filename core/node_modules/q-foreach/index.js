module.exports = function(Q) {
	Q.forEach = function(arr, callback, thisArg) {
		var cb = callback,
			that = thisArg,
			deferred = Q.defer(),
			cur = undefined,
			rets = [],
			i = undefined;

		for (i in arr)
			if (cur) {
				cur = cur.then(internal(arr[i]));
			} else {
				cur = callback.apply(that, [arr[i]]);
			}

		if (!i)
			throw Error('Have to provide at least a one item length array or an object with keys to qForEach');

		cur.then(function(value) {
			deferred.resolve(rets.concat(value));
		}, function(err) {
			throw err;
		});

		return deferred.promise;

		function internal() {
			var args = arguments;
			return function(value) {
				rets.push(value);
				return cb.apply(that, args);
			}
		}
	}
};