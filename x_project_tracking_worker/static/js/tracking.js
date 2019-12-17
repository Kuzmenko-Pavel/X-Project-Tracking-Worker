;(function() {
var underscore, ytl, get_action, cid, actions, settings, post_array, iframe_form, image, beacon, transport, track_actions, callAction, callMethod, processing, c_cheker, url_cheker, auto_goals, main;
(function () {
  /* jshint ignore:start */
  //     Underscore.js 1.9.1
  //     http://underscorejs.org
  //     (c) 2009-2018 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
  //     Underscore may be freely distributed under the MIT license.
  (function () {
    // Baseline setup
    // --------------
    // Establish the root object, `window` (`self`) in the browser, `global`
    // on the server, or `this` in some virtual machines. We use `self`
    // instead of `window` for `WebWorker` support.
    var root = typeof self == 'object' && self.self === self && self || typeof global == 'object' && global.global === global && global || this || {};
    // Save the previous value of the `_` variable.
    var previousUnderscore = root._;
    // Save bytes in the minified (but not gzipped) version:
    var ArrayProto = Array.prototype, ObjProto = Object.prototype;
    var SymbolProto = typeof Symbol !== 'undefined' ? Symbol.prototype : null;
    // Create quick reference variables for speed access to core prototypes.
    var push = ArrayProto.push, slice = ArrayProto.slice, toString = ObjProto.toString, hasOwnProperty = ObjProto.hasOwnProperty;
    // All **ECMAScript 5** native function implementations that we hope to use
    // are declared here.
    var nativeIsArray = Array.isArray, nativeKeys = Object.keys, nativeCreate = Object.create;
    // Naked function reference for surrogate-prototype-swapping.
    var Ctor = function () {
    };
    // Create a safe reference to the Underscore object for use below.
    var _ = function (obj) {
      if (obj instanceof _)
        return obj;
      if (!(this instanceof _))
        return new _(obj);
      this._wrapped = obj;
    };
    // Export the Underscore object for **Node.js**, with
    // backwards-compatibility for their old module API. If we're in
    // the browser, add `_` as a global object.
    // (`nodeType` is checked to ensure that `module`
    // and `exports` are not HTML elements.)
    if (typeof exports != 'undefined' && !exports.nodeType) {
      if (typeof module != 'undefined' && !module.nodeType && module.exports) {
        exports = module.exports = _;
      }
      exports._ = _;
    } else {
      root._ = _;
    }
    // Current version.
    _.VERSION = '1.9.1';
    // Internal function that returns an efficient (for current engines) version
    // of the passed-in callback, to be repeatedly applied in other Underscore
    // functions.
    var optimizeCb = function (func, context, argCount) {
      if (context === void 0)
        return func;
      switch (argCount == null ? 3 : argCount) {
      case 1:
        return function (value) {
          return func.call(context, value);
        };
      // The 2-argument case is omitted because we’re not using it.
      case 3:
        return function (value, index, collection) {
          return func.call(context, value, index, collection);
        };
      case 4:
        return function (accumulator, value, index, collection) {
          return func.call(context, accumulator, value, index, collection);
        };
      }
      return function () {
        return func.apply(context, arguments);
      };
    };
    var builtinIteratee;
    // An internal function to generate callbacks that can be applied to each
    // element in a collection, returning the desired result — either `identity`,
    // an arbitrary callback, a property matcher, or a property accessor.
    var cb = function (value, context, argCount) {
      if (_.iteratee !== builtinIteratee)
        return _.iteratee(value, context);
      if (value == null)
        return _.identity;
      if (_.isFunction(value))
        return optimizeCb(value, context, argCount);
      if (_.isObject(value) && !_.isArray(value))
        return _.matcher(value);
      return _.property(value);
    };
    // External wrapper for our callback generator. Users may customize
    // `_.iteratee` if they want additional predicate/iteratee shorthand styles.
    // This abstraction hides the internal-only argCount argument.
    _.iteratee = builtinIteratee = function (value, context) {
      return cb(value, context, Infinity);
    };
    // Some functions take a variable number of arguments, or a few expected
    // arguments at the beginning and then a variable number of values to operate
    // on. This helper accumulates all remaining arguments past the function’s
    // argument length (or an explicit `startIndex`), into an array that becomes
    // the last argument. Similar to ES6’s "rest parameter".
    var restArguments = function (func, startIndex) {
      startIndex = startIndex == null ? func.length - 1 : +startIndex;
      return function () {
        var length = Math.max(arguments.length - startIndex, 0), rest = Array(length), index = 0;
        for (; index < length; index++) {
          rest[index] = arguments[index + startIndex];
        }
        switch (startIndex) {
        case 0:
          return func.call(this, rest);
        case 1:
          return func.call(this, arguments[0], rest);
        case 2:
          return func.call(this, arguments[0], arguments[1], rest);
        }
        var args = Array(startIndex + 1);
        for (index = 0; index < startIndex; index++) {
          args[index] = arguments[index];
        }
        args[startIndex] = rest;
        return func.apply(this, args);
      };
    };
    // An internal function for creating a new object that inherits from another.
    var baseCreate = function (prototype) {
      if (!_.isObject(prototype))
        return {};
      if (nativeCreate)
        return nativeCreate(prototype);
      Ctor.prototype = prototype;
      var result = new Ctor();
      Ctor.prototype = null;
      return result;
    };
    var shallowProperty = function (key) {
      return function (obj) {
        return obj == null ? void 0 : obj[key];
      };
    };
    var has = function (obj, path) {
      return obj != null && hasOwnProperty.call(obj, path);
    };
    var deepGet = function (obj, path) {
      var length = path.length;
      for (var i = 0; i < length; i++) {
        if (obj == null)
          return void 0;
        obj = obj[path[i]];
      }
      return length ? obj : void 0;
    };
    // Helper for collection methods to determine whether a collection
    // should be iterated as an array or as an object.
    // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
    // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
    var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
    var getLength = shallowProperty('length');
    var isArrayLike = function (collection) {
      var length = getLength(collection);
      return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
    };
    // Collection Functions
    // --------------------
    // The cornerstone, an `each` implementation, aka `forEach`.
    // Handles raw objects in addition to array-likes. Treats all
    // sparse array-likes as if they were dense.
    _.each = _.forEach = function (obj, iteratee, context) {
      iteratee = optimizeCb(iteratee, context);
      var i, length;
      if (isArrayLike(obj)) {
        for (i = 0, length = obj.length; i < length; i++) {
          iteratee(obj[i], i, obj);
        }
      } else {
        var keys = _.keys(obj);
        for (i = 0, length = keys.length; i < length; i++) {
          iteratee(obj[keys[i]], keys[i], obj);
        }
      }
      return obj;
    };
    // Return the results of applying the iteratee to each element.
    _.map = _.collect = function (obj, iteratee, context) {
      iteratee = cb(iteratee, context);
      var keys = !isArrayLike(obj) && _.keys(obj), length = (keys || obj).length, results = Array(length);
      for (var index = 0; index < length; index++) {
        var currentKey = keys ? keys[index] : index;
        results[index] = iteratee(obj[currentKey], currentKey, obj);
      }
      return results;
    };
    // Create a reducing function iterating left or right.
    var createReduce = function (dir) {
      // Wrap code that reassigns argument variables in a separate function than
      // the one that accesses `arguments.length` to avoid a perf hit. (#1991)
      var reducer = function (obj, iteratee, memo, initial) {
        var keys = !isArrayLike(obj) && _.keys(obj), length = (keys || obj).length, index = dir > 0 ? 0 : length - 1;
        if (!initial) {
          memo = obj[keys ? keys[index] : index];
          index += dir;
        }
        for (; index >= 0 && index < length; index += dir) {
          var currentKey = keys ? keys[index] : index;
          memo = iteratee(memo, obj[currentKey], currentKey, obj);
        }
        return memo;
      };
      return function (obj, iteratee, memo, context) {
        var initial = arguments.length >= 3;
        return reducer(obj, optimizeCb(iteratee, context, 4), memo, initial);
      };
    };
    // **Reduce** builds up a single result from a list of values, aka `inject`,
    // or `foldl`.
    _.reduce = _.foldl = _.inject = createReduce(1);
    // The right-associative version of reduce, also known as `foldr`.
    _.reduceRight = _.foldr = createReduce(-1);
    // Return the first value which passes a truth test. Aliased as `detect`.
    _.find = _.detect = function (obj, predicate, context) {
      var keyFinder = isArrayLike(obj) ? _.findIndex : _.findKey;
      var key = keyFinder(obj, predicate, context);
      if (key !== void 0 && key !== -1)
        return obj[key];
    };
    // Return all the elements that pass a truth test.
    // Aliased as `select`.
    _.filter = _.select = function (obj, predicate, context) {
      var results = [];
      predicate = cb(predicate, context);
      _.each(obj, function (value, index, list) {
        if (predicate(value, index, list))
          results.push(value);
      });
      return results;
    };
    // Return all the elements for which a truth test fails.
    _.reject = function (obj, predicate, context) {
      return _.filter(obj, _.negate(cb(predicate)), context);
    };
    // Determine whether all of the elements match a truth test.
    // Aliased as `all`.
    _.every = _.all = function (obj, predicate, context) {
      predicate = cb(predicate, context);
      var keys = !isArrayLike(obj) && _.keys(obj), length = (keys || obj).length;
      for (var index = 0; index < length; index++) {
        var currentKey = keys ? keys[index] : index;
        if (!predicate(obj[currentKey], currentKey, obj))
          return false;
      }
      return true;
    };
    // Determine if at least one element in the object matches a truth test.
    // Aliased as `any`.
    _.some = _.any = function (obj, predicate, context) {
      predicate = cb(predicate, context);
      var keys = !isArrayLike(obj) && _.keys(obj), length = (keys || obj).length;
      for (var index = 0; index < length; index++) {
        var currentKey = keys ? keys[index] : index;
        if (predicate(obj[currentKey], currentKey, obj))
          return true;
      }
      return false;
    };
    // Determine if the array or object contains a given item (using `===`).
    // Aliased as `includes` and `include`.
    _.contains = _.includes = _.include = function (obj, item, fromIndex, guard) {
      if (!isArrayLike(obj))
        obj = _.values(obj);
      if (typeof fromIndex != 'number' || guard)
        fromIndex = 0;
      return _.indexOf(obj, item, fromIndex) >= 0;
    };
    // Invoke a method (with arguments) on every item in a collection.
    _.invoke = restArguments(function (obj, path, args) {
      var contextPath, func;
      if (_.isFunction(path)) {
        func = path;
      } else if (_.isArray(path)) {
        contextPath = path.slice(0, -1);
        path = path[path.length - 1];
      }
      return _.map(obj, function (context) {
        var method = func;
        if (!method) {
          if (contextPath && contextPath.length) {
            context = deepGet(context, contextPath);
          }
          if (context == null)
            return void 0;
          method = context[path];
        }
        return method == null ? method : method.apply(context, args);
      });
    });
    // Convenience version of a common use case of `map`: fetching a property.
    _.pluck = function (obj, key) {
      return _.map(obj, _.property(key));
    };
    // Convenience version of a common use case of `filter`: selecting only objects
    // containing specific `key:value` pairs.
    _.where = function (obj, attrs) {
      return _.filter(obj, _.matcher(attrs));
    };
    // Convenience version of a common use case of `find`: getting the first object
    // containing specific `key:value` pairs.
    _.findWhere = function (obj, attrs) {
      return _.find(obj, _.matcher(attrs));
    };
    // Return the maximum element (or element-based computation).
    _.max = function (obj, iteratee, context) {
      var result = -Infinity, lastComputed = -Infinity, value, computed;
      if (iteratee == null || typeof iteratee == 'number' && typeof obj[0] != 'object' && obj != null) {
        obj = isArrayLike(obj) ? obj : _.values(obj);
        for (var i = 0, length = obj.length; i < length; i++) {
          value = obj[i];
          if (value != null && value > result) {
            result = value;
          }
        }
      } else {
        iteratee = cb(iteratee, context);
        _.each(obj, function (v, index, list) {
          computed = iteratee(v, index, list);
          if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
            result = v;
            lastComputed = computed;
          }
        });
      }
      return result;
    };
    // Return the minimum element (or element-based computation).
    _.min = function (obj, iteratee, context) {
      var result = Infinity, lastComputed = Infinity, value, computed;
      if (iteratee == null || typeof iteratee == 'number' && typeof obj[0] != 'object' && obj != null) {
        obj = isArrayLike(obj) ? obj : _.values(obj);
        for (var i = 0, length = obj.length; i < length; i++) {
          value = obj[i];
          if (value != null && value < result) {
            result = value;
          }
        }
      } else {
        iteratee = cb(iteratee, context);
        _.each(obj, function (v, index, list) {
          computed = iteratee(v, index, list);
          if (computed < lastComputed || computed === Infinity && result === Infinity) {
            result = v;
            lastComputed = computed;
          }
        });
      }
      return result;
    };
    // Shuffle a collection.
    _.shuffle = function (obj) {
      return _.sample(obj, Infinity);
    };
    // Sample **n** random values from a collection using the modern version of the
    // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
    // If **n** is not specified, returns a single random element.
    // The internal `guard` argument allows it to work with `map`.
    _.sample = function (obj, n, guard) {
      if (n == null || guard) {
        if (!isArrayLike(obj))
          obj = _.values(obj);
        return obj[_.random(obj.length - 1)];
      }
      var sample = isArrayLike(obj) ? _.clone(obj) : _.values(obj);
      var length = getLength(sample);
      n = Math.max(Math.min(n, length), 0);
      var last = length - 1;
      for (var index = 0; index < n; index++) {
        var rand = _.random(index, last);
        var temp = sample[index];
        sample[index] = sample[rand];
        sample[rand] = temp;
      }
      return sample.slice(0, n);
    };
    // Sort the object's values by a criterion produced by an iteratee.
    _.sortBy = function (obj, iteratee, context) {
      var index = 0;
      iteratee = cb(iteratee, context);
      return _.pluck(_.map(obj, function (value, key, list) {
        return {
          value: value,
          index: index++,
          criteria: iteratee(value, key, list)
        };
      }).sort(function (left, right) {
        var a = left.criteria;
        var b = right.criteria;
        if (a !== b) {
          if (a > b || a === void 0)
            return 1;
          if (a < b || b === void 0)
            return -1;
        }
        return left.index - right.index;
      }), 'value');
    };
    // An internal function used for aggregate "group by" operations.
    var group = function (behavior, partition) {
      return function (obj, iteratee, context) {
        var result = partition ? [
          [],
          []
        ] : {};
        iteratee = cb(iteratee, context);
        _.each(obj, function (value, index) {
          var key = iteratee(value, index, obj);
          behavior(result, value, key);
        });
        return result;
      };
    };
    // Groups the object's values by a criterion. Pass either a string attribute
    // to group by, or a function that returns the criterion.
    _.groupBy = group(function (result, value, key) {
      if (has(result, key))
        result[key].push(value);
      else
        result[key] = [value];
    });
    // Indexes the object's values by a criterion, similar to `groupBy`, but for
    // when you know that your index values will be unique.
    _.indexBy = group(function (result, value, key) {
      result[key] = value;
    });
    // Counts instances of an object that group by a certain criterion. Pass
    // either a string attribute to count by, or a function that returns the
    // criterion.
    _.countBy = group(function (result, value, key) {
      if (has(result, key))
        result[key]++;
      else
        result[key] = 1;
    });
    var reStrSymbol = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
    // Safely create a real, live array from anything iterable.
    _.toArray = function (obj) {
      if (!obj)
        return [];
      if (_.isArray(obj))
        return slice.call(obj);
      if (_.isString(obj)) {
        // Keep surrogate pair characters together
        return obj.match(reStrSymbol);
      }
      if (isArrayLike(obj))
        return _.map(obj, _.identity);
      return _.values(obj);
    };
    // Return the number of elements in an object.
    _.size = function (obj) {
      if (obj == null)
        return 0;
      return isArrayLike(obj) ? obj.length : _.keys(obj).length;
    };
    // Split a collection into two arrays: one whose elements all satisfy the given
    // predicate, and one whose elements all do not satisfy the predicate.
    _.partition = group(function (result, value, pass) {
      result[pass ? 0 : 1].push(value);
    }, true);
    // Array Functions
    // ---------------
    // Get the first element of an array. Passing **n** will return the first N
    // values in the array. Aliased as `head` and `take`. The **guard** check
    // allows it to work with `_.map`.
    _.first = _.head = _.take = function (array, n, guard) {
      if (array == null || array.length < 1)
        return n == null ? void 0 : [];
      if (n == null || guard)
        return array[0];
      return _.initial(array, array.length - n);
    };
    // Returns everything but the last entry of the array. Especially useful on
    // the arguments object. Passing **n** will return all the values in
    // the array, excluding the last N.
    _.initial = function (array, n, guard) {
      return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
    };
    // Get the last element of an array. Passing **n** will return the last N
    // values in the array.
    _.last = function (array, n, guard) {
      if (array == null || array.length < 1)
        return n == null ? void 0 : [];
      if (n == null || guard)
        return array[array.length - 1];
      return _.rest(array, Math.max(0, array.length - n));
    };
    // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
    // Especially useful on the arguments object. Passing an **n** will return
    // the rest N values in the array.
    _.rest = _.tail = _.drop = function (array, n, guard) {
      return slice.call(array, n == null || guard ? 1 : n);
    };
    // Trim out all falsy values from an array.
    _.compact = function (array) {
      return _.filter(array, Boolean);
    };
    // Internal implementation of a recursive `flatten` function.
    var flatten = function (input, shallow, strict, output) {
      output = output || [];
      var idx = output.length;
      for (var i = 0, length = getLength(input); i < length; i++) {
        var value = input[i];
        if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
          // Flatten current level of array or arguments object.
          if (shallow) {
            var j = 0, len = value.length;
            while (j < len)
              output[idx++] = value[j++];
          } else {
            flatten(value, shallow, strict, output);
            idx = output.length;
          }
        } else if (!strict) {
          output[idx++] = value;
        }
      }
      return output;
    };
    // Flatten out an array, either recursively (by default), or just one level.
    _.flatten = function (array, shallow) {
      return flatten(array, shallow, false);
    };
    // Return a version of the array that does not contain the specified value(s).
    _.without = restArguments(function (array, otherArrays) {
      return _.difference(array, otherArrays);
    });
    // Produce a duplicate-free version of the array. If the array has already
    // been sorted, you have the option of using a faster algorithm.
    // The faster algorithm will not work with an iteratee if the iteratee
    // is not a one-to-one function, so providing an iteratee will disable
    // the faster algorithm.
    // Aliased as `unique`.
    _.uniq = _.unique = function (array, isSorted, iteratee, context) {
      if (!_.isBoolean(isSorted)) {
        context = iteratee;
        iteratee = isSorted;
        isSorted = false;
      }
      if (iteratee != null)
        iteratee = cb(iteratee, context);
      var result = [];
      var seen = [];
      for (var i = 0, length = getLength(array); i < length; i++) {
        var value = array[i], computed = iteratee ? iteratee(value, i, array) : value;
        if (isSorted && !iteratee) {
          if (!i || seen !== computed)
            result.push(value);
          seen = computed;
        } else if (iteratee) {
          if (!_.contains(seen, computed)) {
            seen.push(computed);
            result.push(value);
          }
        } else if (!_.contains(result, value)) {
          result.push(value);
        }
      }
      return result;
    };
    // Produce an array that contains the union: each distinct element from all of
    // the passed-in arrays.
    _.union = restArguments(function (arrays) {
      return _.uniq(flatten(arrays, true, true));
    });
    // Produce an array that contains every item shared between all the
    // passed-in arrays.
    _.intersection = function (array) {
      var result = [];
      var argsLength = arguments.length;
      for (var i = 0, length = getLength(array); i < length; i++) {
        var item = array[i];
        if (_.contains(result, item))
          continue;
        var j;
        for (j = 1; j < argsLength; j++) {
          if (!_.contains(arguments[j], item))
            break;
        }
        if (j === argsLength)
          result.push(item);
      }
      return result;
    };
    // Take the difference between one array and a number of other arrays.
    // Only the elements present in just the first array will remain.
    _.difference = restArguments(function (array, rest) {
      rest = flatten(rest, true, true);
      return _.filter(array, function (value) {
        return !_.contains(rest, value);
      });
    });
    // Complement of _.zip. Unzip accepts an array of arrays and groups
    // each array's elements on shared indices.
    _.unzip = function (array) {
      var length = array && _.max(array, getLength).length || 0;
      var result = Array(length);
      for (var index = 0; index < length; index++) {
        result[index] = _.pluck(array, index);
      }
      return result;
    };
    // Zip together multiple lists into a single array -- elements that share
    // an index go together.
    _.zip = restArguments(_.unzip);
    // Converts lists into objects. Pass either a single array of `[key, value]`
    // pairs, or two parallel arrays of the same length -- one of keys, and one of
    // the corresponding values. Passing by pairs is the reverse of _.pairs.
    _.object = function (list, values) {
      var result = {};
      for (var i = 0, length = getLength(list); i < length; i++) {
        if (values) {
          result[list[i]] = values[i];
        } else {
          result[list[i][0]] = list[i][1];
        }
      }
      return result;
    };
    // Generator function to create the findIndex and findLastIndex functions.
    var createPredicateIndexFinder = function (dir) {
      return function (array, predicate, context) {
        predicate = cb(predicate, context);
        var length = getLength(array);
        var index = dir > 0 ? 0 : length - 1;
        for (; index >= 0 && index < length; index += dir) {
          if (predicate(array[index], index, array))
            return index;
        }
        return -1;
      };
    };
    // Returns the first index on an array-like that passes a predicate test.
    _.findIndex = createPredicateIndexFinder(1);
    _.findLastIndex = createPredicateIndexFinder(-1);
    // Use a comparator function to figure out the smallest index at which
    // an object should be inserted so as to maintain order. Uses binary search.
    _.sortedIndex = function (array, obj, iteratee, context) {
      iteratee = cb(iteratee, context, 1);
      var value = iteratee(obj);
      var low = 0, high = getLength(array);
      while (low < high) {
        var mid = Math.floor((low + high) / 2);
        if (iteratee(array[mid]) < value)
          low = mid + 1;
        else
          high = mid;
      }
      return low;
    };
    // Generator function to create the indexOf and lastIndexOf functions.
    var createIndexFinder = function (dir, predicateFind, sortedIndex) {
      return function (array, item, idx) {
        var i = 0, length = getLength(array);
        if (typeof idx == 'number') {
          if (dir > 0) {
            i = idx >= 0 ? idx : Math.max(idx + length, i);
          } else {
            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
          }
        } else if (sortedIndex && idx && length) {
          idx = sortedIndex(array, item);
          return array[idx] === item ? idx : -1;
        }
        if (item !== item) {
          idx = predicateFind(slice.call(array, i, length), _.isNaN);
          return idx >= 0 ? idx + i : -1;
        }
        for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
          if (array[idx] === item)
            return idx;
        }
        return -1;
      };
    };
    // Return the position of the first occurrence of an item in an array,
    // or -1 if the item is not included in the array.
    // If the array is large and already in sort order, pass `true`
    // for **isSorted** to use binary search.
    _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
    _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);
    // Generate an integer Array containing an arithmetic progression. A port of
    // the native Python `range()` function. See
    // [the Python documentation](http://docs.python.org/library/functions.html#range).
    _.range = function (start, stop, step) {
      if (stop == null) {
        stop = start || 0;
        start = 0;
      }
      if (!step) {
        step = stop < start ? -1 : 1;
      }
      var length = Math.max(Math.ceil((stop - start) / step), 0);
      var range = Array(length);
      for (var idx = 0; idx < length; idx++, start += step) {
        range[idx] = start;
      }
      return range;
    };
    // Chunk a single array into multiple arrays, each containing `count` or fewer
    // items.
    _.chunk = function (array, count) {
      if (count == null || count < 1)
        return [];
      var result = [];
      var i = 0, length = array.length;
      while (i < length) {
        result.push(slice.call(array, i, i += count));
      }
      return result;
    };
    // Function (ahem) Functions
    // ------------------
    // Determines whether to execute a function as a constructor
    // or a normal function with the provided arguments.
    var executeBound = function (sourceFunc, boundFunc, context, callingContext, args) {
      if (!(callingContext instanceof boundFunc))
        return sourceFunc.apply(context, args);
      var self = baseCreate(sourceFunc.prototype);
      var result = sourceFunc.apply(self, args);
      if (_.isObject(result))
        return result;
      return self;
    };
    // Create a function bound to a given object (assigning `this`, and arguments,
    // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
    // available.
    _.bind = restArguments(function (func, context, args) {
      if (!_.isFunction(func))
        throw new TypeError('Bind must be called on a function');
      var bound = restArguments(function (callArgs) {
        return executeBound(func, bound, context, this, args.concat(callArgs));
      });
      return bound;
    });
    // Partially apply a function by creating a version that has had some of its
    // arguments pre-filled, without changing its dynamic `this` context. _ acts
    // as a placeholder by default, allowing any combination of arguments to be
    // pre-filled. Set `_.partial.placeholder` for a custom placeholder argument.
    _.partial = restArguments(function (func, boundArgs) {
      var placeholder = _.partial.placeholder;
      var bound = function () {
        var position = 0, length = boundArgs.length;
        var args = Array(length);
        for (var i = 0; i < length; i++) {
          args[i] = boundArgs[i] === placeholder ? arguments[position++] : boundArgs[i];
        }
        while (position < arguments.length)
          args.push(arguments[position++]);
        return executeBound(func, bound, this, this, args);
      };
      return bound;
    });
    _.partial.placeholder = _;
    // Bind a number of an object's methods to that object. Remaining arguments
    // are the method names to be bound. Useful for ensuring that all callbacks
    // defined on an object belong to it.
    _.bindAll = restArguments(function (obj, keys) {
      keys = flatten(keys, false, false);
      var index = keys.length;
      if (index < 1)
        throw new Error('bindAll must be passed function names');
      while (index--) {
        var key = keys[index];
        obj[key] = _.bind(obj[key], obj);
      }
    });
    // Memoize an expensive function by storing its results.
    _.memoize = function (func, hasher) {
      var memoize = function (key) {
        var cache = memoize.cache;
        var address = '' + (hasher ? hasher.apply(this, arguments) : key);
        if (!has(cache, address))
          cache[address] = func.apply(this, arguments);
        return cache[address];
      };
      memoize.cache = {};
      return memoize;
    };
    // Delays a function for the given number of milliseconds, and then calls
    // it with the arguments supplied.
    _.delay = restArguments(function (func, wait, args) {
      return setTimeout(function () {
        return func.apply(null, args);
      }, wait);
    });
    // Defers a function, scheduling it to run after the current call stack has
    // cleared.
    _.defer = _.partial(_.delay, _, 1);
    // Returns a function, that, when invoked, will only be triggered at most once
    // during a given window of time. Normally, the throttled function will run
    // as much as it can, without ever going more than once per `wait` duration;
    // but if you'd like to disable the execution on the leading edge, pass
    // `{leading: false}`. To disable execution on the trailing edge, ditto.
    _.throttle = function (func, wait, options) {
      var timeout, context, args, result;
      var previous = 0;
      if (!options)
        options = {};
      var later = function () {
        previous = options.leading === false ? 0 : _.now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout)
          context = args = null;
      };
      var throttled = function () {
        var now = _.now();
        if (!previous && options.leading === false)
          previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
          if (timeout) {
            clearTimeout(timeout);
            timeout = null;
          }
          previous = now;
          result = func.apply(context, args);
          if (!timeout)
            context = args = null;
        } else if (!timeout && options.trailing !== false) {
          timeout = setTimeout(later, remaining);
        }
        return result;
      };
      throttled.cancel = function () {
        clearTimeout(timeout);
        previous = 0;
        timeout = context = args = null;
      };
      return throttled;
    };
    // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds. If `immediate` is passed, trigger the function on the
    // leading edge, instead of the trailing.
    _.debounce = function (func, wait, immediate) {
      var timeout, result;
      var later = function (context, args) {
        timeout = null;
        if (args)
          result = func.apply(context, args);
      };
      var debounced = restArguments(function (args) {
        if (timeout)
          clearTimeout(timeout);
        if (immediate) {
          var callNow = !timeout;
          timeout = setTimeout(later, wait);
          if (callNow)
            result = func.apply(this, args);
        } else {
          timeout = _.delay(later, wait, this, args);
        }
        return result;
      });
      debounced.cancel = function () {
        clearTimeout(timeout);
        timeout = null;
      };
      return debounced;
    };
    // Returns the first function passed as an argument to the second,
    // allowing you to adjust arguments, run code before and after, and
    // conditionally execute the original function.
    _.wrap = function (func, wrapper) {
      return _.partial(wrapper, func);
    };
    // Returns a negated version of the passed-in predicate.
    _.negate = function (predicate) {
      return function () {
        return !predicate.apply(this, arguments);
      };
    };
    // Returns a function that is the composition of a list of functions, each
    // consuming the return value of the function that follows.
    _.compose = function () {
      var args = arguments;
      var start = args.length - 1;
      return function () {
        var i = start;
        var result = args[start].apply(this, arguments);
        while (i--)
          result = args[i].call(this, result);
        return result;
      };
    };
    // Returns a function that will only be executed on and after the Nth call.
    _.after = function (times, func) {
      return function () {
        if (--times < 1) {
          return func.apply(this, arguments);
        }
      };
    };
    // Returns a function that will only be executed up to (but not including) the Nth call.
    _.before = function (times, func) {
      var memo;
      return function () {
        if (--times > 0) {
          memo = func.apply(this, arguments);
        }
        if (times <= 1)
          func = null;
        return memo;
      };
    };
    // Returns a function that will be executed at most one time, no matter how
    // often you call it. Useful for lazy initialization.
    _.once = _.partial(_.before, 2);
    _.restArguments = restArguments;
    // Object Functions
    // ----------------
    // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
    var hasEnumBug = !{ toString: null }.propertyIsEnumerable('toString');
    var nonEnumerableProps = [
      'valueOf',
      'isPrototypeOf',
      'toString',
      'propertyIsEnumerable',
      'hasOwnProperty',
      'toLocaleString'
    ];
    var collectNonEnumProps = function (obj, keys) {
      var nonEnumIdx = nonEnumerableProps.length;
      var constructor = obj.constructor;
      var proto = _.isFunction(constructor) && constructor.prototype || ObjProto;
      // Constructor is a special case.
      var prop = 'constructor';
      if (has(obj, prop) && !_.contains(keys, prop))
        keys.push(prop);
      while (nonEnumIdx--) {
        prop = nonEnumerableProps[nonEnumIdx];
        if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
          keys.push(prop);
        }
      }
    };
    // Retrieve the names of an object's own properties.
    // Delegates to **ECMAScript 5**'s native `Object.keys`.
    _.keys = function (obj) {
      if (!_.isObject(obj))
        return [];
      if (nativeKeys)
        return nativeKeys(obj);
      var keys = [];
      for (var key in obj)
        if (has(obj, key))
          keys.push(key);
      // Ahem, IE < 9.
      if (hasEnumBug)
        collectNonEnumProps(obj, keys);
      return keys;
    };
    // Retrieve all the property names of an object.
    _.allKeys = function (obj) {
      if (!_.isObject(obj))
        return [];
      var keys = [];
      for (var key in obj)
        keys.push(key);
      // Ahem, IE < 9.
      if (hasEnumBug)
        collectNonEnumProps(obj, keys);
      return keys;
    };
    // Retrieve the values of an object's properties.
    _.values = function (obj) {
      var keys = _.keys(obj);
      var length = keys.length;
      var values = Array(length);
      for (var i = 0; i < length; i++) {
        values[i] = obj[keys[i]];
      }
      return values;
    };
    // Returns the results of applying the iteratee to each element of the object.
    // In contrast to _.map it returns an object.
    _.mapObject = function (obj, iteratee, context) {
      iteratee = cb(iteratee, context);
      var keys = _.keys(obj), length = keys.length, results = {};
      for (var index = 0; index < length; index++) {
        var currentKey = keys[index];
        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
      }
      return results;
    };
    // Convert an object into a list of `[key, value]` pairs.
    // The opposite of _.object.
    _.pairs = function (obj) {
      var keys = _.keys(obj);
      var length = keys.length;
      var pairs = Array(length);
      for (var i = 0; i < length; i++) {
        pairs[i] = [
          keys[i],
          obj[keys[i]]
        ];
      }
      return pairs;
    };
    // Invert the keys and values of an object. The values must be serializable.
    _.invert = function (obj) {
      var result = {};
      var keys = _.keys(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        result[obj[keys[i]]] = keys[i];
      }
      return result;
    };
    // Return a sorted list of the function names available on the object.
    // Aliased as `methods`.
    _.functions = _.methods = function (obj) {
      var names = [];
      for (var key in obj) {
        if (_.isFunction(obj[key]))
          names.push(key);
      }
      return names.sort();
    };
    // An internal function for creating assigner functions.
    var createAssigner = function (keysFunc, defaults) {
      return function (obj) {
        var length = arguments.length;
        if (defaults)
          obj = Object(obj);
        if (length < 2 || obj == null)
          return obj;
        for (var index = 1; index < length; index++) {
          var source = arguments[index], keys = keysFunc(source), l = keys.length;
          for (var i = 0; i < l; i++) {
            var key = keys[i];
            if (!defaults || obj[key] === void 0)
              obj[key] = source[key];
          }
        }
        return obj;
      };
    };
    // Extend a given object with all the properties in passed-in object(s).
    _.extend = createAssigner(_.allKeys);
    // Assigns a given object with all the own properties in the passed-in object(s).
    // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
    _.extendOwn = _.assign = createAssigner(_.keys);
    // Returns the first key on an object that passes a predicate test.
    _.findKey = function (obj, predicate, context) {
      predicate = cb(predicate, context);
      var keys = _.keys(obj), key;
      for (var i = 0, length = keys.length; i < length; i++) {
        key = keys[i];
        if (predicate(obj[key], key, obj))
          return key;
      }
    };
    // Internal pick helper function to determine if `obj` has key `key`.
    var keyInObj = function (value, key, obj) {
      return key in obj;
    };
    // Return a copy of the object only containing the whitelisted properties.
    _.pick = restArguments(function (obj, keys) {
      var result = {}, iteratee = keys[0];
      if (obj == null)
        return result;
      if (_.isFunction(iteratee)) {
        if (keys.length > 1)
          iteratee = optimizeCb(iteratee, keys[1]);
        keys = _.allKeys(obj);
      } else {
        iteratee = keyInObj;
        keys = flatten(keys, false, false);
        obj = Object(obj);
      }
      for (var i = 0, length = keys.length; i < length; i++) {
        var key = keys[i];
        var value = obj[key];
        if (iteratee(value, key, obj))
          result[key] = value;
      }
      return result;
    });
    // Return a copy of the object without the blacklisted properties.
    _.omit = restArguments(function (obj, keys) {
      var iteratee = keys[0], context;
      if (_.isFunction(iteratee)) {
        iteratee = _.negate(iteratee);
        if (keys.length > 1)
          context = keys[1];
      } else {
        keys = _.map(flatten(keys, false, false), String);
        iteratee = function (value, key) {
          return !_.contains(keys, key);
        };
      }
      return _.pick(obj, iteratee, context);
    });
    // Fill in a given object with default properties.
    _.defaults = createAssigner(_.allKeys, true);
    // Creates an object that inherits from the given prototype object.
    // If additional properties are provided then they will be added to the
    // created object.
    _.create = function (prototype, props) {
      var result = baseCreate(prototype);
      if (props)
        _.extendOwn(result, props);
      return result;
    };
    // Create a (shallow-cloned) duplicate of an object.
    _.clone = function (obj) {
      if (!_.isObject(obj))
        return obj;
      return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
    };
    // Invokes interceptor with the obj, and then returns obj.
    // The primary purpose of this method is to "tap into" a method chain, in
    // order to perform operations on intermediate results within the chain.
    _.tap = function (obj, interceptor) {
      interceptor(obj);
      return obj;
    };
    // Returns whether an object has a given set of `key:value` pairs.
    _.isMatch = function (object, attrs) {
      var keys = _.keys(attrs), length = keys.length;
      if (object == null)
        return !length;
      var obj = Object(object);
      for (var i = 0; i < length; i++) {
        var key = keys[i];
        if (attrs[key] !== obj[key] || !(key in obj))
          return false;
      }
      return true;
    };
    // Internal recursive comparison function for `isEqual`.
    var eq, deepEq;
    eq = function (a, b, aStack, bStack) {
      // Identical objects are equal. `0 === -0`, but they aren't identical.
      // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
      if (a === b)
        return a !== 0 || 1 / a === 1 / b;
      // `null` or `undefined` only equal to itself (strict comparison).
      if (a == null || b == null)
        return false;
      // `NaN`s are equivalent, but non-reflexive.
      if (a !== a)
        return b !== b;
      // Exhaust primitive checks
      var type = typeof a;
      if (type !== 'function' && type !== 'object' && typeof b != 'object')
        return false;
      return deepEq(a, b, aStack, bStack);
    };
    // Internal recursive comparison function for `isEqual`.
    deepEq = function (a, b, aStack, bStack) {
      // Unwrap any wrapped objects.
      if (a instanceof _)
        a = a._wrapped;
      if (b instanceof _)
        b = b._wrapped;
      // Compare `[[Class]]` names.
      var className = toString.call(a);
      if (className !== toString.call(b))
        return false;
      switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN.
        if (+a !== +a)
          return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
      case '[object Symbol]':
        return SymbolProto.valueOf.call(a) === SymbolProto.valueOf.call(b);
      }
      var areArrays = className === '[object Array]';
      if (!areArrays) {
        if (typeof a != 'object' || typeof b != 'object')
          return false;
        // Objects with different constructors are not equivalent, but `Object`s or `Array`s
        // from different frames are.
        var aCtor = a.constructor, bCtor = b.constructor;
        if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor && _.isFunction(bCtor) && bCtor instanceof bCtor) && ('constructor' in a && 'constructor' in b)) {
          return false;
        }
      }
      // Assume equality for cyclic structures. The algorithm for detecting cyclic
      // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
      // Initializing stack of traversed objects.
      // It's done here since we only need them for objects and arrays comparison.
      aStack = aStack || [];
      bStack = bStack || [];
      var length = aStack.length;
      while (length--) {
        // Linear search. Performance is inversely proportional to the number of
        // unique nested structures.
        if (aStack[length] === a)
          return bStack[length] === b;
      }
      // Add the first object to the stack of traversed objects.
      aStack.push(a);
      bStack.push(b);
      // Recursively compare objects and arrays.
      if (areArrays) {
        // Compare array lengths to determine if a deep comparison is necessary.
        length = a.length;
        if (length !== b.length)
          return false;
        // Deep compare the contents, ignoring non-numeric properties.
        while (length--) {
          if (!eq(a[length], b[length], aStack, bStack))
            return false;
        }
      } else {
        // Deep compare objects.
        var keys = _.keys(a), key;
        length = keys.length;
        // Ensure that both objects contain the same number of properties before comparing deep equality.
        if (_.keys(b).length !== length)
          return false;
        while (length--) {
          // Deep compare each member
          key = keys[length];
          if (!(has(b, key) && eq(a[key], b[key], aStack, bStack)))
            return false;
        }
      }
      // Remove the first object from the stack of traversed objects.
      aStack.pop();
      bStack.pop();
      return true;
    };
    // Perform a deep comparison to check if two objects are equal.
    _.isEqual = function (a, b) {
      return eq(a, b);
    };
    // Is a given array, string, or object empty?
    // An "empty" object has no enumerable own-properties.
    _.isEmpty = function (obj) {
      if (obj == null)
        return true;
      if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj)))
        return obj.length === 0;
      return _.keys(obj).length === 0;
    };
    // Is a given value a DOM element?
    _.isElement = function (obj) {
      return !!(obj && obj.nodeType === 1);
    };
    // Is a given value an array?
    // Delegates to ECMA5's native Array.isArray
    _.isArray = nativeIsArray || function (obj) {
      return toString.call(obj) === '[object Array]';
    };
    // Is a given variable an object?
    _.isObject = function (obj) {
      var type = typeof obj;
      return type === 'function' || type === 'object' && !!obj;
    };
    // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError, isMap, isWeakMap, isSet, isWeakSet.
    _.each([
      'Arguments',
      'Function',
      'String',
      'Number',
      'Date',
      'RegExp',
      'Error',
      'Symbol',
      'Map',
      'WeakMap',
      'Set',
      'WeakSet'
    ], function (name) {
      _['is' + name] = function (obj) {
        return toString.call(obj) === '[object ' + name + ']';
      };
    });
    // Define a fallback version of the method in browsers (ahem, IE < 9), where
    // there isn't any inspectable "Arguments" type.
    if (!_.isArguments(arguments)) {
      _.isArguments = function (obj) {
        return has(obj, 'callee');
      };
    }
    // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
    // IE 11 (#1621), Safari 8 (#1929), and PhantomJS (#2236).
    var nodelist = root.document && root.document.childNodes;
    if (typeof /./ != 'function' && typeof Int8Array != 'object' && typeof nodelist != 'function') {
      _.isFunction = function (obj) {
        return typeof obj == 'function' || false;
      };
    }
    // Is a given object a finite number?
    _.isFinite = function (obj) {
      return !_.isSymbol(obj) && isFinite(obj) && !isNaN(parseFloat(obj));
    };
    // Is the given value `NaN`?
    _.isNaN = function (obj) {
      return _.isNumber(obj) && isNaN(obj);
    };
    // Is a given value a boolean?
    _.isBoolean = function (obj) {
      return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
    };
    // Is a given value equal to null?
    _.isNull = function (obj) {
      return obj === null;
    };
    // Is a given variable undefined?
    _.isUndefined = function (obj) {
      return obj === void 0;
    };
    // Shortcut function for checking if an object has a given property directly
    // on itself (in other words, not on a prototype).
    _.has = function (obj, path) {
      if (!_.isArray(path)) {
        return has(obj, path);
      }
      var length = path.length;
      for (var i = 0; i < length; i++) {
        var key = path[i];
        if (obj == null || !hasOwnProperty.call(obj, key)) {
          return false;
        }
        obj = obj[key];
      }
      return !!length;
    };
    // Utility Functions
    // -----------------
    // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
    // previous owner. Returns a reference to the Underscore object.
    _.noConflict = function () {
      root._ = previousUnderscore;
      return this;
    };
    // Keep the identity function around for default iteratees.
    _.identity = function (value) {
      return value;
    };
    // Predicate-generating functions. Often useful outside of Underscore.
    _.constant = function (value) {
      return function () {
        return value;
      };
    };
    _.noop = function () {
    };
    // Creates a function that, when passed an object, will traverse that object’s
    // properties down the given `path`, specified as an array of keys or indexes.
    _.property = function (path) {
      if (!_.isArray(path)) {
        return shallowProperty(path);
      }
      return function (obj) {
        return deepGet(obj, path);
      };
    };
    // Generates a function for a given object that returns a given property.
    _.propertyOf = function (obj) {
      if (obj == null) {
        return function () {
        };
      }
      return function (path) {
        return !_.isArray(path) ? obj[path] : deepGet(obj, path);
      };
    };
    // Returns a predicate for checking whether an object has a given set of
    // `key:value` pairs.
    _.matcher = _.matches = function (attrs) {
      attrs = _.extendOwn({}, attrs);
      return function (obj) {
        return _.isMatch(obj, attrs);
      };
    };
    // Run a function **n** times.
    _.times = function (n, iteratee, context) {
      var accum = Array(Math.max(0, n));
      iteratee = optimizeCb(iteratee, context, 1);
      for (var i = 0; i < n; i++)
        accum[i] = iteratee(i);
      return accum;
    };
    // Return a random integer between min and max (inclusive).
    _.random = function (min, max) {
      if (max == null) {
        max = min;
        min = 0;
      }
      return min + Math.floor(Math.random() * (max - min + 1));
    };
    // A (possibly faster) way to get the current timestamp as an integer.
    _.now = Date.now || function () {
      return new Date().getTime();
    };
    // List of HTML entities for escaping.
    var escapeMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      '\'': '&#x27;',
      '`': '&#x60;'
    };
    var unescapeMap = _.invert(escapeMap);
    // Functions for escaping and unescaping strings to/from HTML interpolation.
    var createEscaper = function (map) {
      var escaper = function (match) {
        return map[match];
      };
      // Regexes for identifying a key that needs to be escaped.
      var source = '(?:' + _.keys(map).join('|') + ')';
      var testRegexp = RegExp(source);
      var replaceRegexp = RegExp(source, 'g');
      return function (string) {
        string = string == null ? '' : '' + string;
        return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
      };
    };
    _.escape = createEscaper(escapeMap);
    _.unescape = createEscaper(unescapeMap);
    // Traverses the children of `obj` along `path`. If a child is a function, it
    // is invoked with its parent as context. Returns the value of the final
    // child, or `fallback` if any child is undefined.
    _.result = function (obj, path, fallback) {
      if (!_.isArray(path))
        path = [path];
      var length = path.length;
      if (!length) {
        return _.isFunction(fallback) ? fallback.call(obj) : fallback;
      }
      for (var i = 0; i < length; i++) {
        var prop = obj == null ? void 0 : obj[path[i]];
        if (prop === void 0) {
          prop = fallback;
          i = length;  // Ensure we don't continue iterating.
        }
        obj = _.isFunction(prop) ? prop.call(obj) : prop;
      }
      return obj;
    };
    // Generate a unique integer id (unique within the entire client session).
    // Useful for temporary DOM ids.
    var idCounter = 0;
    _.uniqueId = function (prefix) {
      var id = ++idCounter + '';
      return prefix ? prefix + id : id;
    };
    // By default, Underscore uses ERB-style template delimiters, change the
    // following template settings to use alternative delimiters.
    _.templateSettings = {
      evaluate: /<%([\s\S]+?)%>/g,
      interpolate: /<%=([\s\S]+?)%>/g,
      escape: /<%-([\s\S]+?)%>/g
    };
    // When customizing `templateSettings`, if you don't want to define an
    // interpolation, evaluation or escaping regex, we need one that is
    // guaranteed not to match.
    var noMatch = /(.)^/;
    // Certain characters need to be escaped so that they can be put into a
    // string literal.
    var escapes = {
      '\'': '\'',
      '\\': '\\',
      '\r': 'r',
      '\n': 'n',
      '\u2028': 'u2028',
      '\u2029': 'u2029'
    };
    var escapeRegExp = /\\|'|\r|\n|\u2028|\u2029/g;
    var escapeChar = function (match) {
      return '\\' + escapes[match];
    };
    // JavaScript micro-templating, similar to John Resig's implementation.
    // Underscore templating handles arbitrary delimiters, preserves whitespace,
    // and correctly escapes quotes within interpolated code.
    // NB: `oldSettings` only exists for backwards compatibility.
    _.template = function (text, settings, oldSettings) {
      if (!settings && oldSettings)
        settings = oldSettings;
      settings = _.defaults({}, settings, _.templateSettings);
      // Combine delimiters into one regular expression via alternation.
      var matcher = RegExp([
        (settings.escape || noMatch).source,
        (settings.interpolate || noMatch).source,
        (settings.evaluate || noMatch).source
      ].join('|') + '|$', 'g');
      // Compile the template source, escaping string literals appropriately.
      var index = 0;
      var source = '__p+=\'';
      text.replace(matcher, function (match, escape, interpolate, evaluate, offset) {
        source += text.slice(index, offset).replace(escapeRegExp, escapeChar);
        index = offset + match.length;
        if (escape) {
          source += '\'+\n((__t=(' + escape + '))==null?\'\':_.escape(__t))+\n\'';
        } else if (interpolate) {
          source += '\'+\n((__t=(' + interpolate + '))==null?\'\':__t)+\n\'';
        } else if (evaluate) {
          source += '\';\n' + evaluate + '\n__p+=\'';
        }
        // Adobe VMs need the match returned to produce the correct offset.
        return match;
      });
      source += '\';\n';
      // If a variable is not specified, place data values in local scope.
      if (!settings.variable)
        source = 'with(obj||{}){\n' + source + '}\n';
      source = 'var __t,__p=\'\',__j=Array.prototype.join,' + 'print=function(){__p+=__j.call(arguments,\'\');};\n' + source + 'return __p;\n';
      var render;
      try {
        render = new Function(settings.variable || 'obj', '_', source);
      } catch (e) {
        e.source = source;
        throw e;
      }
      var template = function (data) {
        return render.call(this, data, _);
      };
      // Provide the compiled source as a convenience for precompilation.
      var argument = settings.variable || 'obj';
      template.source = 'function(' + argument + '){\n' + source + '}';
      return template;
    };
    // Add a "chain" function. Start chaining a wrapped Underscore object.
    _.chain = function (obj) {
      var instance = _(obj);
      instance._chain = true;
      return instance;
    };
    // OOP
    // ---------------
    // If Underscore is called as a function, it returns a wrapped object that
    // can be used OO-style. This wrapper holds altered versions of all the
    // underscore functions. Wrapped objects may be chained.
    // Helper function to continue chaining intermediate results.
    var chainResult = function (instance, obj) {
      return instance._chain ? _(obj).chain() : obj;
    };
    // Add your own custom functions to the Underscore object.
    _.mixin = function (obj) {
      _.each(_.functions(obj), function (name) {
        var func = _[name] = obj[name];
        _.prototype[name] = function () {
          var args = [this._wrapped];
          push.apply(args, arguments);
          return chainResult(this, func.apply(_, args));
        };
      });
      return _;
    };
    // Add all of the Underscore functions to the wrapper object.
    _.mixin(_);
    // Add all mutator Array functions to the wrapper.
    _.each([
      'pop',
      'push',
      'reverse',
      'shift',
      'sort',
      'splice',
      'unshift'
    ], function (name) {
      var method = ArrayProto[name];
      _.prototype[name] = function () {
        var obj = this._wrapped;
        method.apply(obj, arguments);
        if ((name === 'shift' || name === 'splice') && obj.length === 0)
          delete obj[0];
        return chainResult(this, obj);
      };
    });
    // Add all accessor Array functions to the wrapper.
    _.each([
      'concat',
      'join',
      'slice'
    ], function (name) {
      var method = ArrayProto[name];
      _.prototype[name] = function () {
        return chainResult(this, method.apply(this._wrapped, arguments));
      };
    });
    // And some jQuery specific helpers
    _.inArray = function (elem, arr, i) {
      var len;
      if (arr) {
        if (_.indexOf) {
          return _.indexOf.call(arr, elem, i);
        }
        len = arr.length;
        i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
        for (; i < len; i++) {
          // Skip accessing in sparse arrays
          if (i in arr && arr[i] === elem) {
            return i;
          }
        }
      }
      return -1;
    };
    var class2type = {};
    // Populate the class2type map
    _.each('Boolean Number String Function Array Date RegExp Object'.split(' '), function (name, i) {
      class2type['[object ' + name + ']'] = name.toLowerCase();
    });
    _.type = function (obj) {
      return obj == null ? String(obj) : class2type[toString.call(obj)] || 'object';
    };
    var optionsCache = {};
    function createOptions(options) {
      var object = optionsCache[options] = {};
      _.each(options.split(/\s+/), function (flag) {
        object[flag] = true;
      });
      return object;
    }
    _.Callbacks = function (options) {
      // Convert options from String-formatted to Object-formatted if needed
      // (we check in cache first)
      options = typeof options === 'string' ? optionsCache[options] || createOptions(options) : _.extend({}, options);
      var
        // Last fire value (for non-forgettable lists)
        memory,
        // Flag to know if list was already fired
        fired,
        // Flag to know if list is currently firing
        firing,
        // First callback to fire (used internally by add and fireWith)
        firingStart,
        // End of the loop when firing
        firingLength,
        // Index of currently firing callback (modified by remove if needed)
        firingIndex,
        // Actual callback list
        list = [],
        // Stack of fire calls for repeatable lists
        stack = !options.once && [],
        // Fire callbacks
        fire,
        // Actual Callbacks object
        self = {
          // Add a callback or a collection of callbacks to the list
          add: function () {
            if (list) {
              // First, we save the current length
              var start = list.length;
              (function add(args) {
                _.each(args, function (arg) {
                  var type = _.type(arg);
                  if (type === 'function') {
                    if (!options.unique || !self.has(arg)) {
                      list.push(arg);
                    }
                  } else if (arg && arg.length && type !== 'string') {
                    // Inspect recursively
                    add(arg);
                  }
                });
              }(arguments));
              // Do we need to add the callbacks to the
              // current firing batch?
              if (firing) {
                firingLength = list.length;  // With memory, if we're not firing then
                                             // we should call right away
              } else if (memory) {
                firingStart = start;
                fire(memory);
              }
            }
            return this;
          },
          // Remove a callback from the list
          remove: function () {
            if (list) {
              _.each(arguments, function (arg) {
                var index;
                while ((index = _.inArray(arg, list, index)) > -1) {
                  list.splice(index, 1);
                  // Handle firing indexes
                  if (firing) {
                    if (index <= firingLength) {
                      firingLength--;
                    }
                    if (index <= firingIndex) {
                      firingIndex--;
                    }
                  }
                }
              });
            }
            return this;
          },
          // Control if a given callback is in the list
          has: function (fn) {
            return _.inArray(fn, list) > -1;
          },
          // Remove all callbacks from the list
          empty: function () {
            list = [];
            return this;
          },
          // Have the list do nothing anymore
          disable: function () {
            list = stack = memory = undefined;
            return this;
          },
          // Is it disabled?
          disabled: function () {
            return !list;
          },
          // Lock the list in its current state
          lock: function () {
            stack = undefined;
            if (!memory) {
              self.disable();
            }
            return this;
          },
          // Is it locked?
          locked: function () {
            return !stack;
          },
          // Call all callbacks with the given context and arguments
          fireWith: function (context, args) {
            args = args || [];
            args = [
              context,
              args.slice ? args.slice() : args
            ];
            if (list && (!fired || stack)) {
              if (firing) {
                stack.push(args);
              } else {
                fire(args);
              }
            }
            return this;
          },
          // Call all the callbacks with the given arguments
          fire: function () {
            self.fireWith(this, arguments);
            return this;
          },
          // To know if the callbacks have already been called at least once
          fired: function () {
            return !!fired;
          }
        };
      fire = function (data) {
        memory = options.memory && data;
        fired = true;
        firingIndex = firingStart || 0;
        firingStart = 0;
        firingLength = list.length;
        firing = true;
        for (; list && firingIndex < firingLength; firingIndex++) {
          if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
            memory = false;
            // To prevent further calls using add
            break;
          }
        }
        firing = false;
        if (list) {
          if (stack) {
            if (stack.length) {
              fire(stack.shift());
            }
          } else if (memory) {
            list = [];
          } else {
            self.disable();
          }
        }
      };
      return self;
    };
    _.Deferred = function (func) {
      var deferred = {}, tuples = [
          // action, add listener, listener list, final state
          [
            'resolve',
            'done',
            _.Callbacks('once memory'),
            'resolved'
          ],
          [
            'reject',
            'fail',
            _.Callbacks('once memory'),
            'rejected'
          ],
          [
            'notify',
            'progress',
            _.Callbacks('memory')
          ]
        ], state = 'pending', promise = {
          state: function () {
            return state;
          },
          always: function () {
            deferred.done(arguments).fail(arguments);
            return this;
          },
          then: function () {
            var fns = arguments;
            return _.Deferred(function (newDefer) {
              _.each(tuples, function (tuple, i) {
                var action = tuple[0], fn = fns[i];
                // deferred[ done | fail | progress ] for forwarding actions to newDefer
                deferred[tuple[1]](_.isFunction(fn) ? function () {
                  var returned;
                  try {
                    returned = fn.apply(this, arguments);
                  } catch (e) {
                    newDefer.reject(e);
                    return;
                  }
                  if (returned && _.isFunction(returned.promise)) {
                    returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify);
                  } else {
                    newDefer[action !== 'notify' ? 'resolveWith' : action + 'With'](this === deferred ? newDefer : this, [returned]);
                  }
                } : newDefer[action]);
              });
              fns = null;
            }).promise();
          },
          // Get a promise for this deferred
          // If obj is provided, the promise aspect is added to the object
          promise: function (obj) {
            return obj != null ? _.extend(obj, promise) : promise;
          }
        };
      // Keep pipe for back-compat
      promise.pipe = promise.then;
      // Add list-specific methods
      _.each(tuples, function (tuple, i) {
        var list = tuple[2], stateString = tuple[3];
        // promise[ done | fail | progress ] = list.add
        promise[tuple[1]] = list.add;
        // Handle state
        if (stateString) {
          list.add(function () {
            // state = [ resolved | rejected ]
            state = stateString;  // [ reject_list | resolve_list ].disable; progress_list.lock
          }, tuples[i ^ 1][2].disable, tuples[2][2].lock);
        }
        // deferred[ resolve | reject | notify ] = list.fire
        deferred[tuple[0]] = list.fire;
        deferred[tuple[0] + 'With'] = list.fireWith;
      });
      // Make the deferred a promise
      promise.promise(deferred);
      // Call given func if any
      if (func) {
        func.call(deferred, deferred);
      }
      // All done!
      return deferred;
    };
    _.when = function (subordinate) {
      var i = 0, resolveValues = _.type(subordinate) === 'array' && arguments.length === 1 ? subordinate : slice.call(arguments), length = resolveValues.length;
      if (_.type(subordinate) === 'array' && subordinate.length === 1) {
        subordinate = subordinate[0];
      }
      // the count of uncompleted subordinates
      var remaining = length !== 1 || subordinate && _.isFunction(subordinate.promise) ? length : 0,
        // the master Deferred. If resolveValues consist of only a single Deferred, just use that.
        deferred = remaining === 1 ? subordinate : _.Deferred(),
        // Update function for both resolve and progress values
        progressValues, updateFunc = function (i, contexts, values) {
          return function (value) {
            contexts[i] = this;
            values[i] = arguments.length > 1 ? slice.call(arguments) : value;
            if (values === progressValues) {
              deferred.notifyWith(contexts, values);
            } else if (!--remaining) {
              deferred.resolveWith(contexts, values);
            }
          };
        }, progressContexts, resolveContexts;
      // add listeners to Deferred subordinates; treat others as resolved
      if (length > 1) {
        progressValues = new Array(length);
        progressContexts = new Array(length);
        resolveContexts = new Array(length);
        for (; i < length; i++) {
          if (resolveValues[i] && _.isFunction(resolveValues[i].promise)) {
            resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues));
          } else {
            --remaining;
          }
        }
      }
      // if we're not waiting on anything, resolve the master
      if (!remaining) {
        deferred.resolveWith(resolveContexts, resolveValues);
      }
      return deferred.promise();
    };
    // Extracts the result from a wrapped and chained object.
    _.prototype.value = function () {
      return this._wrapped;
    };
    // Provide unwrapping proxy for some methods used in engine operations
    // such as arithmetic and JSON stringification.
    _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;
    _.prototype.toString = function () {
      return String(this._wrapped);
    };
    // AMD registration happens at the end for compatibility with AMD loaders
    // that may not enforce next-turn semantics on modules. Even though general
    // practice for AMD registration is to be anonymous, underscore registers
    // as a named module because, like jQuery, it is a base library that is
    // popular enough to be bundled in a third party lib, but not be part of
    // an AMD load request. Those cases could generate an error when an
    // anonymous define() is called outside of a loader request.
    if (true) {
      underscore = function () {
        return _;
      }();
    }
  }());
  ytl = function (_) {
    var prototype = 'prototype';
    var passiveSupported = false;
    var modern = window.addEventListener;
    var add = modern ? 'addEventListener' : 'attachEvent';
    var rem = modern ? 'removeEventListener' : 'detachEvent';
    var pre = modern ? '' : 'on';
    try {
      var options = Object.defineProperty({}, 'passive', {
        get: function () {
          passiveSupported = true;
        }
      });
      window[add](pre + 'test', null, options);
      window[rem](pre + 'test', null, options);
    } catch (err) {
    }
    var YottosLib = function () {
    };
    YottosLib[prototype].on_event = function (evnt, elem, callback, context, once) {
      var func = _.bind(callback, context || elem);
      var opt = { once: once || false };
      if (passiveSupported) {
        opt.passive = true;
      }
      elem[add](pre + evnt, func, opt);
      return func;
    };
    YottosLib[prototype].off_event = function (evnt, elem, func) {
      elem[rem](pre + evnt, func);
    };
    YottosLib[prototype].on_load = function (win, callback, context) {
      var fn = _.bind(callback, context || win);
      var done = false;
      var top = true;
      var doc = win.document;
      var root = doc.documentElement;
      var init = function (e) {
        if (e.type === 'readystatechange' && doc.readyState !== 'complete') {
          return;
        }
        (e.type === 'load' ? win : doc)[rem](pre + e.type, init, false);
        if (!done && (done = true)) {
          fn.call(win, e.type || e);
        }
      };
      var poll = function () {
        try {
          root.doScroll('left');
        } catch (e) {
          setTimeout(poll, 50);
          return;
        }
        init('poll');
      };
      if (doc.readyState === 'complete') {
        fn.call(win, 'lazy');
      } else {
        if (!modern && root.doScroll) {
          try {
            top = !win.frameElement;
          } catch (e) {
          }
          if (top) {
            poll();
          }
        }
        doc[add](pre + 'DOMContentLoaded', init, false);
        doc[add](pre + 'readystatechange', init, false);
        win[add](pre + 'load', init, false);
      }
    };
    YottosLib[prototype].post_exists = function () {
      var post = false;
      var postMessage = 'postMessage';
      if (window[postMessage]) {
        post = true;
      }
      return post;
    };
    YottosLib[prototype].getQueryVariable = function (variable) {
      var query = window.location.search.substring(1);
      var vars = query.split('&');
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) === variable) {
          return decodeURIComponent(pair[1]);
        }
      }
      return '';
    };
    YottosLib[prototype].getCook = function (cookiename) {
      var cookiestring = new RegExp('' + cookiename + '[^;]+').exec(document.cookie);
      return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./, '') : '');
    };
    YottosLib[prototype].setCook = function (name, value, options) {
      var defaults = { path: '/' };
      if (window.location.protocol === 'https:') {
        defaults.secure = true;
        defaults.same_site = 'None';
      }
      options = _.extend(options || {}, defaults);
      if (options.expires && options.expires.toUTCString) {
        options.expires = options.expires.toUTCString();
      }
      var updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
      for (var optionKey in options) {
        if (options.hasOwnProperty(optionKey)) {
          var optionValue = options[optionKey];
          if (optionValue !== '') {
            updatedCookie += '; ' + optionKey;
            updatedCookie += '=' + optionValue;
          }
        }
      }
      console.log(updatedCookie);
      document.cookie = updatedCookie;
    };
    YottosLib[prototype].isGuid = function (stringToTest) {
      if (stringToTest[0] === '{') {
        stringToTest = stringToTest.substring(1, stringToTest.length - 1);
      }
      var regexGuid = /^(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}$/gi;
      return regexGuid.test(stringToTest);
    };
    var isBlob = function isBlob(val) {
      return val instanceof Blob;
    };
    function sendBeacon(url, data) {
      var event = window.event && window.event.type;
      var sync = event === 'unload' || event === 'beforeunload';
      var xhr = 'XMLHttpRequest' in window ? new window.XMLHttpRequest() : new window.ActiveXObject('Microsoft.XMLHTTP');
      xhr.open('POST', url, !sync);
      xhr.withCredentials = true;
      xhr.setRequestHeader('Accept', '*/*');
      if (_.isString(data)) {
        xhr.setRequestHeader('Content-Type', 'text/plain; charset=utf-8');
        xhr.responseType = 'text';
      } else if (isBlob(data) && data.type) {
        xhr.setRequestHeader('Content-Type', data.type);
      }
      try {
        xhr.send(data);
      } catch (error) {
        return false;
      }
      return true;
    }
    if (!('navigator' in window)) {
      window.navigator = {};
    }
    if (typeof this.navigator.sendBeacon !== 'function') {
      window.navigator.sendBeacon = sendBeacon.bind(window);
    }
    YottosLib[prototype].sendBeacon = function (url, data) {
      return window.navigator.sendBeacon(url, data);
    };
    return new YottosLib();
  }(underscore);
  get_action = function (_) {
    var getAction = function (e) {
      var tracker = 'default';
      var action = 'default';
      var value = 'default';
      var data = {};
      if (e) {
        var key = e[0];
        var val = e[1];
        var dat = e[2];
        if (!_.isString(key) || !_.isString(val)) {
          return undefined;
        }
        // if (_.isNaN(dat) || _.isNull(dat) || _.isUndefined(dat)){
        //     var a = key.split('.')[0];
        //     if(_.find(['init'], function(e){ return e  === a; })){
        //         dat = {};
        //     }
        //     else {
        //         return undefined;
        //     }
        // }
        if (key) {
          key = key.split('.');
          if (key.length === 1) {
            action = key[0];
          } else if (key.length === 2) {
            tracker = key[0];
            action = key[1];
          }
        }
        if (val) {
          value = val;
        }
        if (dat) {
          data = dat;
        }
        return [
          tracker,
          action,
          value,
          data
        ];
      }
    };
    return getAction;
  }(underscore);
  cid = function (YottosLib, getAction) {
    var cid = function () {
      var c = '';
      var yt_url_cid = YottosLib.getQueryVariable('yt_cid');
      var yt_cook_cid = YottosLib.getCook('yt_cid');
      if (YottosLib.isGuid(yt_url_cid)) {
        c = yt_url_cid;
      } else {
        if (YottosLib.isGuid(yt_cook_cid)) {
          c = yt_cook_cid;
        }
      }
      if (YottosLib.isGuid(c)) {
        YottosLib.setCook('yt_cid', c, { 'max-age': 7200 });
      }
      return c;
    };
    return cid;
  }(ytl, get_action);
  actions = function (_, cid) {
    var defaults_tracker = {
      'id': '',
      'time': 365,
      'cid': '',
      'gender': null,
      'price': null,
      'content_name': '',
      'content_category': '',
      'content_type': 'product',
      'currency': 'UAH',
      'relevant': true,
      'auto_goals': true
    };
    defaults_tracker.cid = cid();
    var actions = {};
    actions['init'] = function (tracker, val, data) {
      var page_view = false;
      if (this.trakers[tracker] !== undefined) {
        page_view = true;
      }
      var defer = new _.Deferred();
      this.trakers[tracker] = _.extend(this.trakers[tracker] || {}, _.defaults(_.pick(data, _.allKeys(defaults_tracker)), defaults_tracker));
      this.trakers[tracker]['id'] = val;
      this.trakers[tracker].cd = this.cd;
      this.trakers[tracker].dl = this.dl;
      this.trakers[tracker].rl = this.rl;
      this.trakers[tracker].content_type = this.content_type;
      this.trakers[tracker].content_category = this.content_category;
      this.trakers[tracker].content_name = this.content_name;
      if (data['set'] && _.isObject(data['set'])) {
        _.each(data['set'], function (value, key) {
          this.callMethod(tracker + '.set', key, value);
        }, this);
      }
      if (data['track'] && _.isObject(data['track'])) {
        _.each(data['track'], function (value, key) {
          this.callMethod(tracker + '.track', key, value);
        }, this);
      }
      if (!page_view) {
        this.callMethod(tracker + '.track', 'PageView', {});
      }
      defer.resolveWith(this);
      return defer;
    };
    actions['set'] = function (tracker, val, data) {
      var defer = new _.Deferred();
      var ext = {};
      ext[val] = data;
      this.trakers[tracker] = _.extend(this.trakers[tracker] || {}, ext);
      defer.resolveWith(this);
      return defer;
    };
    actions['track'] = function (tracker, val, data) {
      var defer = new _.Deferred();
      if (val === 'remarketing') {
        if (data['add']) {
          this.callMethod(tracker + '.track', 'ViewContent', {});
        }
        if (data['remove']) {
          this.callMethod(tracker + '.track', 'Purchase', {});
        }
        defer.resolveWith(this);
      } else {
        if (this.track_actions[val] && this.trakers[tracker]) {
          this.track_actions[val].call(this, this.trakers[tracker], data, defer);
        } else {
          defer.resolveWith(this);
        }
      }
      return defer;
    };
    actions['trackCustom'] = function (tracker, val, data) {
      var defer = new _.Deferred();
      if (this.track_actions[val] && this.trakers[tracker]) {
        this.track_actions[val].call(this, this.trakers[tracker], data, defer);
      } else {
        defer.resolveWith(this);
      }
      return defer;
    };
    return actions;
  }(underscore, cid);
  settings = {
    // rg: 'https://rg.yottos.com',
    rg: 'http://0.0.0.0:10000',
    rgt: '/pixel/track'
  };
  post_array = function () {
    var post_array = function (obj) {
      var post_message = 'postMessage';
      this.stack = [];
      this.obj = obj;
      this.test = undefined;
      this.callHandler = function () {
        if (this.test) {
          while (this.stack.length) {
            this.postMessage(this.stack.shift());
          }
        }
      };
      this[post_message] = function (msg, origin) {
        if (msg) {
          origin = origin || '*';
          var target = this.obj.iframe;
          if (target.contentWindow && target.contentWindow[post_message]) {
            window.t = target;
            target.contentWindow[post_message]('ytt_iframe:' + msg, origin);
          }
        }
      };
      this.push = function (obj) {
        if (this.obj.post_exists) {
          this.stack.push(obj);
          this.callHandler();
        }
      };
      this.ping = function (origin) {
        if (this.test === undefined) {
          this.pong(origin);
        } else if (this.test === false) {
          this.test = true;
          this.callHandler();
        }
      };
      this.pong = function (origin) {
        this.test = false;
        this[post_message]('ping', origin);
      };
      this.init = function () {
        this[post_message]('ping');
        this.test = undefined;
      };
    };
    return post_array;
  }();
  iframe_form = function (_, PostArray, YottosLib) {
    return function (url, data) {
      var url_parser = document.createElement('a');
      url_parser.href = url;
      var origin = url_parser.protocol.concat('//').concat(url_parser.host);
      var object = this;
      var iframe = 'iframe';
      var form = 'form';
      var addParameter = 'addParameter';
      object.time = new Date().getTime();
      object.defer = new _.Deferred();
      object.name = 'y_iframe_' + object.time;
      try {
        object[iframe] = document.createElement('<iframe name=' + object.name + '>');
      } catch (ex) {
        object[iframe] = document.createElement('iframe');
        object[iframe].name = object.name;
      }
      object.post_exists = YottosLib.post_exists();
      object.parent_el = document.createElement('div');
      object.parent_el.style.display = 'none';
      object.parent_el.style.width = '0px';
      object.parent_el.style.height = '0px';
      if (object.parent_el.attachShadow) {
        try {
          object.root = object.parent_el.attachShadow({ mode: 'closed' });
        } catch (err) {
          object.root = object.parent_el;
        }
      } else if (object.parent_el.createShadowRoot) {
        try {
          object.root = object.parent_el.createShadowRoot();
        } catch (err) {
          object.root = object.parent_el;
        }
      } else {
        object.root = object.parent_el;
      }
      object[form] = document.createElement(form);
      object[iframe].id = object.name;
      object[form].target = object.name;
      object[form].method = 'POST';
      object[form].action = url;
      object[iframe].style.width = '0px';
      object[iframe].marginHeight = '0px';
      object[iframe].marginWidth = '0px';
      object[iframe].style.height = '0px';
      object[form].style.width = '0px';
      object[form].style.height = '0px';
      object[form].style.border = '0px';
      object[iframe].style.border = '0px';
      object[iframe].style.margin = '0px';
      object[form].style.margin = '0px';
      object[iframe].style.display = 'none';
      object[form].style.display = 'none';
      object[iframe].style.visibility = 'hidden';
      object[form].style.visibility = 'hidden';
      object[iframe].style.position = 'absolute';
      object[form].style.position = 'absolute';
      object[iframe].scrolling = 'no';
      object[iframe].vspace = '0';
      object[iframe].hspace = '0';
      object[iframe].frameborder = '0';
      object[iframe].allowtransparency = 'true';
      object[addParameter] = function (value, parameter) {
        if (_.isNull(value) || _.isUndefined(value) || _.isNaN(value)) {
          return;
        }
        var hiddenField = document.createElement('input');
        hiddenField.setAttribute('type', 'hidden');
        hiddenField.setAttribute('name', parameter);
        hiddenField.setAttribute('value', value);
        this[form].appendChild(hiddenField);
      };
      object.post = new PostArray(object);
      object.message_handler = function (e) {
        if (e && e.data) {
          if (typeof e.data === 'string') {
            var name = e.data.split(':')[0];
            var action = e.data.split(':')[1];
            console.log(e.data);
            if ('ytt_iframe' === name) {
              if (this.post[action]) {
                this.post[action](e.origin);
              }
            }
          }
        }
      };
      object.message_fun = YottosLib.on_event('message', window, object.message_handler, object);
      object.root.appendChild(this[iframe]);
      object.root.appendChild(this[form]);
      object.send = function () {
        document.body.appendChild(this.parent_el);
        this[iframe].onload = _.bind(function (e) {
          YottosLib.off_event('message', window, object.message_fun);
          this.parent_el.remove();
          this.defer.resolve();
        }, this);
        this[iframe].onerror = _.bind(function (e) {
          YottosLib.off_event('message', window, object.message_fun);
          this.parent_el.remove();
          this.defer.resolve();
        }, this);
        this[form].submit();
      };
      _.each(data, object[addParameter], this);
      object.send();
      return object;
    };
  }(underscore, post_array, ytl);
  image = function (_) {
    return function (url, data) {
      var object = this;
      object.time = new Date().getTime();
      object.defer = new _.Deferred();
      object.name = 'y_image_' + object.time;
      object.image = new Image(1, 1);
      object.image.onload = function () {
        object.defer.resolve();
      };
      object.image.onerror = function () {
        object.defer.resolve();
      };
      var params = '';
      for (var key in data) {
        if (params !== '') {
          params += '&';
        }
        params += key + '=' + encodeURIComponent(data[key]);
      }
      object.image.src = url + (url.indexOf('.png') < 0 ? '.png' : '') + (url.indexOf('?') < 0 ? '?' : '&') + params;
      return object;
    };
  }(underscore);
  beacon = function (_, YottosLib) {
    return function (url, data) {
      var object = this;
      object.defer = new _.Deferred();
      var params = '';
      for (var key in data) {
        if (params !== '') {
          params += '&';
        }
        params += key + '=' + encodeURIComponent(data[key]);
      }
      YottosLib.sendBeacon(url + (url.indexOf('.beacon') < 0 ? '.beacon' : ''), params);
      return object;
    };
  }(underscore, ytl);
  transport = function (_, settings, Iframe_form, Image, Beacon) {
    return function (defer, data, type) {
      var url;
      var dummy;
      if (type === 'frame') {
        url = settings.rg + settings.rgt;
        dummy = new Iframe_form(url, data);
      } else if (type === 'image') {
        url = settings.rg + settings.rgt;
        dummy = new Image(url, data);
      } else if (type === 'beacon') {
        url = settings.rg + settings.rgt;
        dummy = new Beacon(url, data);
      } else {
        url = settings.rg + settings.rgt;
        dummy = new Iframe_form(url, data);
      }
      dummy.defer.done(_.bind(function () {
        defer.resolveWith(this);
      }, this));
    };
  }(underscore, settings, iframe_form, image, beacon);
  track_actions = function (_, transport) {
    var converter = function (val, key) {
      var r = null;
      if (key === 'gender') {
        if (_.isBoolean(val) || _.isNumber(val)) {
          if (Boolean(val)) {
            r = 'w';
          } else {
            r = 'm';
          }
        } else if (_.isString(val)) {
          r = val;
        }
      } else {
        r = val;
      }
      return r;
    };
    var track_actions = {};
    track_actions['AddPaymentInfo'] = function (tracker, data, defer) {
      var d = _.extend({}, tracker, data, { action: 'AddPaymentInfo' });
      transport.call(this, defer, _.mapObject(d, converter), 'frame');
    };
    track_actions['AddToCart'] = function (tracker, data, defer) {
      var d = _.extend({}, tracker, data, { action: 'AddToCart' });
      transport.call(this, defer, _.mapObject(d, converter), 'frame');
    };
    track_actions['AddToWishlist'] = function (tracker, data, defer) {
      var d = _.extend({}, tracker, data, { action: 'AddToWishlist' });
      transport.call(this, defer, _.mapObject(d, converter), 'frame');
    };
    track_actions['CompleteRegistration'] = function (tracker, data, defer) {
      var d = _.extend({}, tracker, data, { action: 'CompleteRegistration' });
      transport.call(this, defer, _.mapObject(d, converter), 'frame');
    };
    track_actions['Contact'] = function (tracker, data, defer) {
      var d = _.extend({}, tracker, data, { action: 'Contact' });
      transport.call(this, defer, _.mapObject(d, converter), 'frame');
    };
    track_actions['CustomizeProduct'] = function (tracker, data, defer) {
      var d = _.extend({}, tracker, data, { action: 'CustomizeProduct' });
      transport.call(this, defer, _.mapObject(d, converter), 'frame');
    };
    track_actions['Donate'] = function (tracker, data, defer) {
      var d = _.extend({}, tracker, data, { action: 'Donate' });
      transport.call(this, defer, _.mapObject(d, converter), 'frame');
    };
    track_actions['FindLocation'] = function (tracker, data, defer) {
      var d = _.extend({}, tracker, data, { action: 'FindLocation' });
      transport.call(this, defer, _.mapObject(d, converter), 'frame');
    };
    track_actions['InitiateCheckout'] = function (tracker, data, defer) {
      var d = _.extend({}, tracker, data, { action: 'AddPaymentInfo' });
      transport.call(this, defer, _.mapObject(d, converter), 'frame');
    };
    track_actions['Lead'] = function (tracker, data, defer) {
      var d = _.extend({}, tracker, data, { action: 'Lead' });
      transport.call(this, defer, _.mapObject(d, converter), 'frame');
    };
    track_actions['PageView'] = function (tracker, data, defer) {
      var d = _.extend({}, tracker, data, { action: 'PageView' });
      transport.call(this, defer, _.mapObject(d, converter), 'frame');
    };
    track_actions['Purchase'] = function (tracker, data, defer) {
      var d = _.extend({}, tracker, data, { action: 'Purchase' });
      transport.call(this, defer, _.mapObject(d, converter), 'frame');
    };
    track_actions['Schedule'] = function (tracker, data, defer) {
      var d = _.extend({}, tracker, data, { action: 'Schedule' });
      transport.call(this, defer, _.mapObject(d, converter), 'frame');
    };
    track_actions['Search'] = function (tracker, data, defer) {
      var d = _.extend({}, tracker, data, { action: 'Search' });
      transport.call(this, defer, _.mapObject(d, converter), 'frame');
    };
    track_actions['StartTrial'] = function (tracker, data, defer) {
      var d = _.extend({}, tracker, data, { action: 'StartTrial' });
      transport.call(this, defer, _.mapObject(d, converter), 'frame');
    };
    track_actions['SubmitApplication'] = function (tracker, data, defer) {
      var d = _.extend({}, tracker, data, { action: 'SubmitApplication' });
      transport.call(this, defer, _.mapObject(d, converter), 'frame');
    };
    track_actions['Subscribe'] = function (tracker, data, defer) {
      var d = _.extend({}, tracker, data, { action: 'Subscribe' });
      transport.call(this, defer, _.mapObject(d, converter), 'frame');
    };
    track_actions['ViewContent'] = function (tracker, data, defer) {
      var d = _.extend({}, tracker, data, { action: 'ViewContent' });
      transport.call(this, defer, _.mapObject(d, converter), 'frame');
    };
    track_actions['AutoGoals'] = function (tracker, data, defer) {
      var d = _.extend({}, tracker, data, { action: 'AutoGoals' });
      transport.call(this, defer, _.mapObject(d, converter), 'beacon');
    };
    track_actions['Goals'] = function (tracker, data, defer) {
      var d = _.extend({}, tracker, data, { action: 'Goals' });
      transport.call(this, defer, _.mapObject(d, converter), 'image');
    };
    return track_actions;
  }(underscore, transport);
  callAction = function (_) {
    var callAction = function (action) {
      if (action && action[1] && this.actions[action[1]]) {
        return this.actions[action[1]].call(this, action[0], action[2], action[3]);
      }
      return new _.Deferred().resolveWith(this);
    };
    return callAction;
  }(underscore);
  callMethod = function (_) {
    var callMethod = function () {
      if (!this.queue) {
        this.queue = this.queue || [];
      }
      this.queue.push(arguments);
      try {
        this.processing();
      } catch (ex) {
        setTimeout(_.bind(this.processing, this), 0);
      }
    };
    return callMethod;
  }(underscore);
  processing = function (_, getAction) {
    var processing = function () {
      if (!this.queue) {
        this.queue = this.queue || [];
      }
      var arg = this.queue.shift();
      if (arg) {
        var action = this.callAction(getAction(arg));
        if (action) {
          action.done(function () {
            try {
              this.processing();
            } catch (ex) {
              setTimeout(_.bind(this.processing, this), 0);
            }
          });
        }
      }
    };
    return processing;
  }(underscore, get_action);
  c_cheker = function (_) {
    var c_cheker = function (tracker) {
      _.each(tracker.trakers, function (element) {
        element.cd = false;
      });
      tracker.cd = false;
      var threshold = 160;
      var loop;
      var log_addet = false;
      var dc = document.createElement('div');
      try {
        Object.defineProperty(dc, 'id', {
          get: function () {
            if (tracker.cd !== true) {
              clearInterval(loop);
              tracker.cd = true;
              _.each(tracker.trakers, function (element) {
                element.cd = true;
              });
              dc = null;
            }
          }
        });
      } catch (err) {
      }
      var cheker = function () {
        try {
          var widthThreshold = window.outerWidth - window.innerWidth > threshold;
          var heightThreshold = window.outerHeight - window.innerHeight > threshold;
          if (!(heightThreshold && widthThreshold) && (window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized || widthThreshold || heightThreshold)) {
            clearInterval(loop);
            tracker.cd = true;
            _.each(tracker.trakers, function (element) {
              element.cd = true;
            });
          } else {
            tracker.cd = false;
            _.each(tracker.trakers, function (element) {
              element.cd = false;
            });
            if (!log_addet) {
              log_addet = true;
              console.log(dc);
            }  //eval('(window.console||{clear:function(){}}).clear();')
          }
        } catch (err) {
        }
      };
      var interval_cheker = function () {
        if (tracker.cd === false) {
          loop = setInterval(cheker, 1000);
        }
      };
      cheker();
      setTimeout(interval_cheker, 500);
    };
    return c_cheker;
  }(underscore);
  url_cheker = function (_) {
    var url_cheker = function (tracker) {
      var re_char = /[^a-zA-Zа-яА-ЯА-ЩЬЮЯҐЄІЇа-щьюяґєії]/g;
      var getText = function () {
        var result = document.title.replace(re_char, ' ').replace(/\s+$/g, '').replace(/^\s+/g, '').replace(/[\n\t\r\f\s]{2,}/g, ' '), metas = document.getElementsByTagName('meta'), y, x, splitted = [], collector = {}, counter = {}, key, streem_key, arr = [], sort_arr = [], out, i, sWord;
        if (metas) {
          for (x = 0, y = metas.length; x < y; x++) {
            if (metas[x].name.toLowerCase() === 'description') {
              result += ' ' + metas[x].content.replace(re_char, ' ').replace(/\s+$/g, '').replace(/^\s+/g, '').replace(/[\n\t\r\f\s]{2,}/g, ' ') + ' ';
            }
            if (metas[x].name.toLowerCase() === 'keywords') {
              result += ' ' + metas[x].content.replace(re_char, ' ').replace(/\s+$/g, '').replace(/^\s+/g, '').replace(/[\n\t\r\f\s]{2,}/g, ' ') + ' ';
            }
          }
        }
        splitted = result.toLowerCase().split(' ');
        for (i = 0; i < splitted.length; i++) {
          key = splitted[i].replace(/^\s*/, '').replace(/\s*$/, '');
          if (key.length > 3) {
            collector[key] = key;
            counter[key] = counter[key] || 0;
            counter[key]++;
          }
        }
        arr = [];
        for (sWord in counter) {
          if (counter[sWord] > 1) {
            arr.push({
              t: collector[sWord],
              s: sWord,
              f: counter[sWord]
            });
          }
        }
        sort_arr = arr.sort(function (a, b) {
          return a.f > b.f ? -1 : a.f < b.f ? 1 : 0;
        });
        out = [];
        for (i = 0; i < sort_arr.length; i++) {
          out.push(sort_arr[i].t);
        }
        return out.join(' ');
      };
      tracker.dl = document.location.href;
      tracker.rl = document.referrer;
      tracker.content_name = document.title.replace(re_char, ' ').replace(/\s+$/g, '').replace(/^\s+/g, '').replace(/[\n\t\r\f\s]{2,}/g, ' ');
      tracker.content_type = 'product';
      tracker.content_category = getText();
      _.each(tracker.trakers, function (element) {
        element.dl = tracker.dl;
        element.rl = tracker.rl;
        element.content_name = tracker.content_name;
        element.content_type = tracker.content_type;
        element.content_category = tracker.content_category;
      });
    };
    return url_cheker;
  }(underscore);
  auto_goals = function (_) {
    var auto_goals = function (tracker) {
    };
    return auto_goals;
  }(underscore);
  (function (actions, track_actions, callAction, callMethod, processing, c_cheker, url_cheker, auto_goals) {
    (function () {
      var y = window['YottosTrackObject'] || 'ytt';
      var tracker = window[y] || function () {
        tracker.callMethod(arguments);
      };
      if (!tracker.page_load) {
        tracker.page_load = true;
        tracker.trakers = {};
        tracker.actions = actions;
        tracker.track_actions = track_actions;
        tracker.plugins = {};
        tracker.callAction = callAction;
        tracker.callMethod = callMethod;
        tracker.processing = processing;
        c_cheker(tracker);
        url_cheker(tracker);
        auto_goals(tracker);
      }
      tracker.processing();
    }());
  }(actions, track_actions, callAction, callMethod, processing, c_cheker, url_cheker, auto_goals));
  main = undefined;
}());
}());