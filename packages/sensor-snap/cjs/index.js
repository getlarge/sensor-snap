module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "01f9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("2d00");
var $export = __webpack_require__("5ca1");
var redefine = __webpack_require__("2aba");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var $iterCreate = __webpack_require__("41a0");
var setToStringTag = __webpack_require__("7f20");
var getPrototypeOf = __webpack_require__("38fd");
var ITERATOR = __webpack_require__("2b4c")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "02f4":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var defined = __webpack_require__("be13");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "0390":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var at = __webpack_require__("02f4")(true);

 // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? at(S, index).length : 1);
};


/***/ }),

/***/ "0a49":
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__("9b43");
var IObject = __webpack_require__("626a");
var toObject = __webpack_require__("4bf8");
var toLength = __webpack_require__("9def");
var asc = __webpack_require__("cd1c");
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),

/***/ "0bfb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__("cb7c");
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "0d58":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("ce10");
var enumBugKeys = __webpack_require__("e11e");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "1169":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__("2d95");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "11e9":
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__("52a7");
var createDesc = __webpack_require__("4630");
var toIObject = __webpack_require__("6821");
var toPrimitive = __webpack_require__("6a99");
var has = __webpack_require__("69a8");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__("9e1e") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "1495":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var anObject = __webpack_require__("cb7c");
var getKeys = __webpack_require__("0d58");

module.exports = __webpack_require__("9e1e") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "1991":
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__("9b43");
var invoke = __webpack_require__("31f4");
var html = __webpack_require__("fab2");
var cel = __webpack_require__("230e");
var global = __webpack_require__("7726");
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__("2d95")(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),

/***/ "1fa8":
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__("cb7c");
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),

/***/ "1fb5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  for (var i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "214f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__("b0c5");
var redefine = __webpack_require__("2aba");
var hide = __webpack_require__("32e9");
var fails = __webpack_require__("79e5");
var defined = __webpack_require__("be13");
var wks = __webpack_require__("2b4c");
var regexpExec = __webpack_require__("520a");

var SPECIES = wks('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
})();

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };
    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
    }
    re[SYMBOL]('');
    return !execCalled;
  }) : undefined;

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var fns = exec(
      defined,
      SYMBOL,
      ''[KEY],
      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      }
    );
    var strfn = fns[0];
    var rxfn = fns[1];

    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),

/***/ "22c4":
/***/ (function(module) {

module.exports = [{"name":"Digital Input","description":"Generic digital input for non-specific sensors","value":3200,"resourceIds":"5500, 5501, 5502, 5503, 5504, 5505, 5750, 5751","resources":{"5500":1,"5501":0,"5502":1,"5503":0,"5504":1,"5505":1,"5750":"app_name","5751":"sensor_name"},"colors":["#000","#adadad"],"icons":["/icons/aloes/digital.png","/icons/aloes/digital-white.png"]},{"name":"Digital Output","description":"Generic digital output for non-specific actuators","value":3201,"resourceIds":"5550, 5551, 5750","resources":{"5550":1,"5551":1,"5750":"app_name"},"colors":["#000","#adadad"],"icons":["/icons/aloes/digital.png","/icons/aloes/digital-white.png"]},{"name":"Analog Input","description":"Generic analog input for non-specific sensors","value":3202,"resourceIds":"5600, 5601, 5602, 5603, 5604, 5750, 5751, 5605","resources":{"5600":0,"5601":0,"5602":0,"5603":0,"5604":1024,"5605":null,"5750":"app","5751":"analog_input"},"colors":["#000","#adadad"],"icons":["/icons/aloes/analog.png","/icons/aloes/analog-white.png"]},{"name":"Analog Output","description":" generic object that can be used with any kind of analog output interface.","value":3203,"resourceIds":"5650, 5603, 5604, 5750","resources":{"5603":0,"5604":1024,"5650":0,"5750":"app"},"colors":["#000","#adadad"],"icons":["/icons/aloes/analog.png","/icons/aloes/analog-white.png"]},{"name":"Generic sensor","description":"It is based on the description of a value and a unit according to the UCUM specification. Thus, any type of value defined within this specification can be reporting using this object. Specific object for a given range of sensors is described later in the document, enabling to identify the type of sensors directly from its Object ID. This object may be used as a generic object if a dedicated one does not exist.","value":3300,"resourceIds":"5700, 5701, 5601, 5602, 5603, 5604, 5750, 5751, 5605","resources":{"5601":0,"5602":0,"5603":0,"5604":10000,"5605":null,"5700":0,"5701":"custom_unit","5750":"custom_app","5751":"custom_sensor"},"colors":["#000","#adadad"],"icons":["/icons/aloes/custom.png","/icons/aloes/custom-white.png"]},{"name":"Illuminance sensor","description":"Illuminance sensor, example units = lx","value":3301,"resourceIds":"5700, 5601, 5602, 5603, 5604, 5605, 5701","resources":{"5601":0,"5602":0,"5603":0,"5604":100000,"5605":0,"5700":0,"5701":"Lux"},"colors":["#000","#adadad"],"icons":["/icons/aloes/light.png","/icons/aloes/light-white.png"]},{"name":"Presence sensor","description":"Presence sensor with digital sensing, optional delay parameters","value":3302,"resourceIds":"5500, 5501, 5505, 5751, 5903, 5904","resources":{"5500":false,"5501":0,"5505":null,"5751":"Presence_sensor","5903":0,"5904":0},"colors":["#000","#adadad"],"icons":["/icons/aloes/presence.png","/icons/aloes/presence-white.png"]},{"name":"Temperature Sensor","description":"used with a temperature sensor to report a temperature measurement.  It also provides resources for minimum/maximum measured values and the minimum/maximum range that can be measured by the temperature sensor. An example measurement unit is degrees Celsius","value":3303,"resourceIds":"5700, 5601, 5602, 5603, 5604, 5605, 5701","resources":{"5601":0,"5602":0,"5603":-20,"5604":80,"5605":null,"5700":0,"5701":"°C"},"colors":["#5ae2e2","#ff3535"],"icons":["/icons/aloes/temperature.png","/icons/aloes/temperature-white.png"]},{"name":"Humidity Sensor","description":"used with a humidity sensor to report a humidity measurement.  It also provides resources for minimum/maximum measured values and the minimum/maximum range that can be measured by the humidity sensor. An example measurement unit is relative humidity as a percentage ","value":3304,"resourceIds":"5700, 5601, 5602, 5603, 5604, 5605, 5701","resources":{"5601":0,"5602":0,"5603":0,"5604":100,"5605":null,"5700":0,"5701":"%"},"colors":["#000","#adadad"],"icons":["/icons/aloes/humidity.png","/icons/aloes/humidity-white.png"]},{"name":"Power Measurment","description":"used over a power measurement sensor to report a remote power measurement.  It also provides resources for minimum/maximum measured values and the minimum/maximum range for both active and reactive power. Il also provides resources for cumulative energy, calibration, and the power factor.","value":3305,"resourceIds":"5800, 5801, 5802, 5803, 5804, 5805, 5806, 5810, 5811, 5812, 5813, 5814, 5815, 5816, 5820, 5821, 5822, 5605","resources":{"5605":0,"5800":0,"5801":0,"5802":0,"5803":0,"5804":0,"5805":0,"5806":0,"5810":0,"5811":0,"5812":0,"5813":0,"5814":0,"5815":0,"5816":0,"5820":0,"5821":0,"5822":0},"colors":["#000","#adadad"],"icons":["/icons/aloes/switch-on.png","/icons/aloes/switch-off.png","/icons/aloes/switch-on-white.png","/icons/aloes/switch-off-white.png"]},{"name":"Actuation","description":"dedicated to remote actuation such as ON/OFF action or dimming. A multi-state output can also be described as a string. This is useful to send pilot wire orders for instance. It also provides a resource to reflect the time that the device has been switched on.","value":3306,"resourceIds":"5850, 5851, 5852, 5853, 5750","resources":{"5750":"app_name","5850":false,"5851":0,"5852":0,"5853":""},"colors":["#000","#adadad"],"icons":["/icons/aloes/switch-on.png","/icons/aloes/switch-off.png","/icons/aloes/switch-on-white.png","/icons/aloes/switch-off-white.png"]},{"name":"Set Point","description":"used to set a desired value to a controller, such as a thermostat. This object enables a setpoint to be expressed units defined in the UCUM specification, to match an associated sensor or measurement value. A special resource is added to set the colour of an object","value":3308,"resourceIds":"5900, 5701, 5706, 5750","resources":{"5701":"unit","5706":"color","5750":"app_name","5900":false},"colors":["#000","#adadad"],"icons":["/icons/aloes/switch-on.png","/icons/aloes/switch-off.png","/icons/aloes/switch-on-white.png","/icons/aloes/switch-off-white.png"]},{"name":"Load Control","description":"used for demand-response load control and other load control in automation application (not limited to power)","value":3310,"resourceIds":"5823, 5824, 5825, 5826, 5827, 5828, 5750","resources":{"5750":"app_name","5823":"event_id","5824":"date_time","5825":"5","5826":"warning","5827":"0","5828":"0"},"colors":["#000","#adadad"],"icons":["/icons/aloes/slider.png","/icons/aloes/slider-white.png"]},{"name":"Light control","description":"used to control a light source, such as a LED or other light.  It allows a light to be turned on or off and its dimmer setting to be control as a % between 0 and 100. An optional colour setting enables a string to be used to indicate the desired colour.","value":3311,"resourceIds":"5850, 5851, 5852, 5805, 5820, 5706, 5701, 5750","resources":{"5701":"unit","5706":"color","5750":"app_name","5805":0,"5820":0,"5850":false,"5851":100,"5852":1},"colors":["#000","#f5f9e0"],"icons":["/icons/aloes/slider.png","/icons/aloes/slider-white.png"]},{"name":"Power control","description":"used to control a power source, such as a Smart Plug.  It allows a power relay to be turned on or off and its dimmer setting to be control as a % between 0 and 100.","value":3312,"resourceIds":"5850, 5851, 5852, 5805, 5820, 5750","resources":{"5750":"app_name","5805":0,"5820":0,"5850":false,"5851":100,"5852":1},"colors":["#a8f767","#ffa916"],"icons":["/icons/aloes/slider.png","/icons/aloes/slider-white.png"]},{"name":"Accelerometer","description":"can be used to represent a 1-3 axis accelerometer.","value":3313,"resourceIds":"5702, 5703, 5704, 5701, 5603, 5604","resources":{"5603":10,"5604":-10,"5701":"G","5702":0,"5703":0,"5704":1},"colors":["#000","#adadad"],"icons":["/icons/aloes/accelerometer.png","/icons/aloes/accelerometer-white.png"]},{"name":"Magnetometer","description":"used to represent a 1-3 axis magnetometer with optional compass direction.","value":3314,"resourceIds":"5701, 5702, 5703, 5704, 5705","resources":{"5701":"G","5702":0,"5703":0,"5704":1,"5705":360},"colors":["#8eb3db","#4673a3"],"icons":["/icons/aloes/magnetism.png","/icons/aloes/magnetism-white.png"]},{"name":"Barometer","description":"used with an air pressure sensor to report a barometer measurement.  It also provides resources for minimum/maximum measured values and the minimum/maximum range that can be measured by the barometer sensor. An example measurement unit is kPa (ucum:kPa).","value":3315,"resourceIds":"5700, 5701, 5601, 5602, 5603, 5604, 5605","resources":{"5601":0,"5602":0,"5603":0,"5604":30,"5605":null,"5700":0,"5701":"hPa"},"colors":["#000","#adadad"],"icons":["/icons/aloes/barometer.png","/icons/aloes/barometer-white.png"]},{"name":"Voltage","description":"used with voltmeter sensor to report measured voltage between two points.  It also provides resources for minimum and maximum measured values, as well as the minimum and maximum range that can be measured by the sensor. An example measurement unit is volts","value":3316,"resourceIds":"5700, 5701, 5601, 5602, 5603, 5604, 5605, 5821, 5750","resources":{"5601":0,"5602":0,"5603":-300,"5604":300,"5605":null,"5700":0,"5701":"V","5750":"app_name","5821":"coeff"},"colors":["#aef9e4","#33e8b5"],"icons":["/icons/aloes/voltage.png","/icons/aloes/voltage-white.png"]},{"name":"Current","description":"used with an ampmeter to report measured electric current in amperes. It also provides resources for minimum and maximum measured values, as well as the minimum and maximum range that can be measured by the sensor. An example measurement unit is volts ","value":3317,"resourceIds":"5700, 5701, 5601, 5602, 5603, 5604, 5605, 5821, 5750","resources":{"5601":0,"5602":0,"5603":0,"5604":80,"5605":null,"5700":0,"5701":"A","5750":"app_name","5821":"coeff"},"colors":["#f2e2bc","#f4bd3a"],"icons":["/icons/aloes/voltage.png","/icons/aloes/voltage-white.png"]},{"name":"Frequency","description":"used to report frequency measurements. It also provides resources for minimum and maximum measured values, as well as the minimum and maximum range that can be measured by the sensor. An example measurement unit is volts ","value":3318,"resourceIds":"5700, 5701, 5601, 5602, 5603, 5604, 5605, 5821, 5750","resources":{"5601":0,"5602":0,"5603":0,"5604":500000,"5605":null,"5700":0,"5701":"Hz","5750":"app_name","5821":"coeff"},"colors":["#f2e2bc","#f4bd3a"],"icons":["/icons/aloes/frequency.png","/icons/aloes/frequency-white.png"]},{"name":"Depth","description":"used to report depth measurements. It can, for example, be used to describe a generic rain gauge that measures the accumulated rainfall in millimetres (mm) or in fathoms (fth)","value":3319,"resourceIds":"5700, 5701, 5601, 5602, 5603, 5604, 5605, 5821, 5750","resources":{"5601":0,"5602":0,"5603":0,"5604":50000,"5605":null,"5700":0,"5701":"m","5750":"app_name","5821":"coeff"},"colors":["#000","#adadad"],"icons":["/icons/aloes/depth.png","/icons/aloes/depth-white.png"]},{"name":"Percentage","description":"used to report measurements relative to a 0-100% scale. For example it could be used to measure the level of a liquid in a vessel or container in units of %","value":3320,"resourceIds":"5700, 5701, 5601, 5602, 5603, 5604, 5605, 5821, 5750","resources":{"5601":0,"5602":0,"5603":0,"5604":100,"5605":null,"5700":0,"5701":"%","5750":"app_name","5821":"coeff"},"colors":["#000","#adadad"],"icons":["/icons/aloes/percentage.png","/icons/aloes/percentage-white.png"]},{"name":"Altitude","description":"used with an altitude sensor to report altitude above sea level in meters. Note that Altitude can be calculated from the measured pressure given the local sea level pressure.  It also provides resources for minimum and maximum measured values, as well as the minimum and maximum range that can be measured by the sensor. An example measurement unit is meters","value":3321,"resourceIds":"5700, 5701, 5601, 5602, 5603, 5604, 5605, 5821, 5750","resources":{"5601":0,"5602":0,"5603":0,"5604":50000,"5605":null,"5700":0,"5701":"m","5750":"app_name","5821":"coeff"},"colors":["#000","#adadad"],"icons":["/icons/aloes/height.png","/icons/aloes/height-white.png"]},{"name":"Load","description":" used with a load sensor (as in a scale) to report the applied weight or force. It also provides resources for minimum and maximum measured values, as well as the minimum and maximum range that can be measured by the sensor. An example measurement unit is kilograms ","value":3322,"resourceIds":"5700, 5701, 5601, 5602, 5603, 5604, 5605, 5821, 5750","resources":{"5601":0,"5602":0,"5603":0,"5604":50,"5605":null,"5700":0,"5701":"kg","5750":"app_name","5821":"coeff"},"colors":["#000","#adadad"],"icons":["/icons/aloes/voltage.png","/icons/aloes/voltage-white.png"]},{"name":"Pressure","description":"used to report pressure measurements. It also provides resources for minimum and maximum measured values, as well as the minimum and maximum range that can be measured by the sensor. An example measurement unit is pascals ","value":3323,"resourceIds":"5700, 5701, 5601, 5602, 5603, 5604, 5605, 5821, 5750","resources":{"5601":0,"5602":0,"5603":0,"5604":5000,"5605":null,"5700":0,"5701":"Pa","5750":"app_name","5821":"coeff"},"colors":["#000","#adadad"],"icons":["/icons/aloes/pressure.png","/icons/aloes/pressure-white.png"]},{"name":"Loudness","description":"used to report loudness or noise level measurements. It also provides resources for minimum and maximum measured values, as well as the minimum and maximum range that can be measured by the sensor. An example measurement unit is decibels","value":3324,"resourceIds":"5700, 5701, 5601, 5602, 5603, 5604, 5605, 5821, 5750","resources":{"5601":0,"5602":0,"5603":0,"5604":10000,"5605":null,"5700":0,"5701":"dB","5750":"app_name","5821":"coeff"},"colors":["#000","#adadad"],"icons":["/icons/aloes/loudness.png","/icons/aloes/loudness-white.png"]},{"name":"Concentration","description":"used to the particle concentration measurement of a medium. It also provides resources for minimum and maximum measured values, as well as the minimum and maximum range that can be measured by the sensor. An example measurement unit is parts per million","value":3325,"resourceIds":"5700, 5701, 5601, 5602, 5603, 5604, 5605, 5821, 5750","resources":{"5601":0,"5602":0,"5603":0,"5604":1000000,"5605":null,"5700":0,"5701":"ppm","5750":"app_name","5821":"coeff"},"colors":["#000","#adadad"],"icons":["/icons/aloes/petri-dish.png","/icons/aloes/petri-dish-white.png"]},{"name":"Acidity","description":" used to report an acidity measurement of a liquid. It also provides resources for minimum and maximum measured values, as well as the minimum and maximum range that can be measured by the sensor. An example measurement unit is pH.","value":3326,"resourceIds":"5700, 5701, 5601, 5602, 5603, 5604, 5605, 5821, 5750","resources":{"5601":0,"5602":0,"5603":0,"5604":14,"5605":null,"5700":0,"5701":"ph","5750":"app_name","5821":"coeff"},"colors":["#000","#adadad"],"icons":["/icons/aloes/acid.png","/icons/aloes/acid-white.png"]},{"name":"Conductivity","description":"used to report a measurement of the electric conductivity of a medium or sample. It also provides resources for minimum and maximum measured values, as well as the minimum and maximum range that can be measured by the sensor. An example measurement unit is Siemens ","value":3327,"resourceIds":"5700, 5701, 5601, 5602, 5603, 5604, 5605, 5821, 5750","resources":{"5601":0,"5602":0,"5603":0,"5604":10,"5605":null,"5700":0,"5701":"mS","5750":"app_name","5821":"coeff"},"colors":["#000","#adadad"],"icons":["/icons/aloes/electrons.png","/icons/aloes/electrons-white.png"]},{"name":"Power","description":"This IPSO object should be used to report power measurements. It also provides resources for minimum and maximum measured values, as well as the minimum and maximum range that can be measured by the sensor. An example measurement unit is Watts (ucum: W). This resource may be used for either real power or apparent power (units= ucum:VA) measurements. The Application type can be use for reactive power or active power for example.","value":3328,"resourceIds":"5700, 5701, 5601, 5602, 5603, 5604, 5605, 5821, 5750","resources":{"5601":0,"5602":0,"5603":0,"5604":50000,"5605":null,"5700":0,"5701":"W","5750":"app_name","5821":"coeff"},"colors":["#000","#adadad"],"icons":["/icons/aloes/power.png","/icons/aloes/power-white.png"]},{"name":"Power factor","description":"report a measurement or calculation of the power factor of a reactive electrical load. Power Factor is normally the ratio of non-reactive power to total power. This object also provides resources for minimum and maximum measured values, as well as the minimum and maximum range that can be measured by the sensor.","value":3329,"resourceIds":"5700, 5701, 5601, 5602, 5603, 5604, 5605, 5821, 5750","resources":{"5601":0,"5602":0,"5603":0,"5604":1,"5605":null,"5700":0,"5701":"","5750":"app_name","5821":"coeff"},"colors":["#000","#adadad"],"icons":["/icons/aloes/phi.png","/icons/aloes/phi-white.png"]},{"name":"Distance","description":"report a distance measurement. It also provides resources for minimum and maximum measured values, as well as the minimum and maximum range that can be measured by the sensor. An example measurement unit is Meters ","value":3330,"resourceIds":"5700, 5701, 5601, 5602, 5603, 5604, 5605, 5821, 5750","resources":{"5601":0,"5602":0,"5603":0,"5604":10000,"5605":null,"5700":0,"5701":"cm","5750":"app_name","5821":"coeff"},"colors":["#000","#adadad"],"icons":["/icons/aloes/distance.png","/icons/aloes/distance-white.png"]},{"name":"Energy","description":"report energy consumption (Cumulative Power) of an electrical load. An example measurement unit is Watt Hours (ucum:W*h)","value":3331,"resourceIds":"5805, 5701, 5822, 5750","resources":{"5701":"Wh","5750":"app_name","5805":0,"5822":null},"colors":["#000","#adadad"],"icons":["/icons/aloes/energy.png","/icons/aloes/energy-white.png"]},{"name":"Direction","description":"report the direction indicated by a compass, wind vane, or other directional indicator. The units of measure is plane angle degrees ","value":3332,"resourceIds":"5705, 5601, 5602, 5605, 5750","resources":{"5601":0,"5602":0,"5605":null,"5705":0,"5750":"app_name"},"colors":["#000","#adadad"],"icons":["/icons/aloes/direction.png","/icons/aloes/direction-white.png"]},{"name":"Time","description":"report the current time in seconds since January 1, 1970 UTC. There is also a fractional time counter that has a range of less than one second.","value":3333,"resourceIds":"5506, 5507, 5750","resources":{"5506":0,"5507":0,"5750":"app_name"},"colors":["#000","#adadad"],"icons":["/icons/aloes/time.png","/icons/aloes/time-white.png"]},{"name":"Gyrometer","description":"report the current reading of a gyrometer sensor in 3 axes. It provides tracking of the minimum and maximum angular rate in all 3 axes. An example unit of measure is radians per second (ucum:rad/s)","value":3334,"resourceIds":"5702, 5703, 5704, 5701, 5508, 5509, 5510, 5511, 5512, 5513, 5603, 5604, 5605, 5750","resources":{"5508":-10,"5509":10,"5510":-10,"5511":10,"5512":-10,"5513":10,"5603":10,"5604":-10,"5605":null,"5701":"°/s","5702":0,"5703":0,"5704":1,"5750":"app_name"},"colors":["#000","#adadad"],"icons":["/icons/aloes/accelerometer.png","/icons/aloes/accelerometer-white.png"]},{"name":"Color","description":"report the measured value of a colour sensor in some colour space described by the units resource.","value":3335,"resourceIds":"5706, 5701, 5750","resources":{"5701":"hex","5706":"#fff","5750":"app_name"},"colors":["#000","#adadad"],"icons":["/icons/aloes/colors.png","/icons/aloes/colors-white.png"]},{"name":"GPS Location","description":"represents GPS coordinates. This object is compatible with the LWM2M management object for location, but uses reusable resources.","value":3336,"resourceIds":"5514, 5515, 5516, 5517, 5518, 5705","resources":{"5514":"0.0","5515":"0.0","5516":"","5517":"","5518":"time","5705":"app_name"},"colors":["#000","#adadad"],"icons":["/icons/aloes/location.png","/icons/aloes/location-white.png"]},{"name":"Positioner","description":"used with a generic position actuator from 0 to 100%. This resource optionally allows setting the transition time for an operation that changes the position of the actuator, and for reading the remaining time of the currently active transition","value":3337,"resourceIds":"5536, 5537, 5538, 5601, 5602, 5605, 5519, 5520, 5750","resources":{"5519":0,"5520":20,"5536":0,"5537":0,"5538":0,"5601":0,"5602":0,"5605":null,"5750":"app_name"},"colors":["#000","#adadad"],"icons":["/icons/aloes/level-control.png","/icons/aloes/level-control-white.png"]},{"name":"Buzzer","description":"actuate an audible alarm such as a buzzer, beeper, or vibration alarm. There is a dimmer control for setting the relative loudness of the alarm, and an optional duration control to limit the length of time the alarm sounds when turned on. Each time a “1” is written to the On/Off resource, the alarm will sound again for the configured duration. If no duration is programmed or the setting is zero, writing a “1” to the On/Off resource will result in the alarm sounding continuously until a “0” is written to the On/Off resource.","value":3338,"resourceIds":"5850, 5548, 5521, 5525, 5750","resources":{"5521":0,"5525":0,"5548":100,"5750":"app_name","5850":1},"colors":["#000","#adadad"],"icons":["/icons/aloes/loudness.png","/icons/aloes/loudness-white.png"]},{"name":"Audio clip","description":"used for a speaker that plays a pre-recorded audio clip or an audio output that is sent elsewhere. For example, an elevator which announces the floor of the building. A resource is provided to store the clip, a dimmer resource controls the relative sound level of the playback, and a duration resource limits the maximum playback time. After the duration time is reached, any remaining samples in the clip are ignored, and the clip player will be ready to play another clip.","value":3339,"resourceIds":"5522, 5523, 5524, 5548, 5750","resources":{"5522":[],"5523":null,"5524":0,"5548":100,"5750":"app_name"},"colors":["#000","#adadad"],"icons":["/icons/aloes/loudness.png","/icons/aloes/loudness-white.png"]},{"name":"Timer","description":"used to time events and actions, using patterns common to industrial timers. A POST to the trigger resource or On/Off input state change starts the timing operation, and the timer remaining time shows zero when the operation is complete. The patterns supported are One-Shot (mode 1), On-Time or Interval (mode 2), Time delay on pick-up or TDPU (tmode 3), and Time Delay on Drop-Out or TDDO (mode 4). Mode 0 disables the timer, so the output follows the input with no delay. A counter is provided to count occurrences of the timer output changing from 0 to 1. Writing a value of zero resets the counter. The Digital Input State resource reports the state of the timer output","value":3340,"resourceIds":"5501, 5521, 5523, 5525, 5526, 5534, 5538, 5543, 5544, 5850, 5750","resources":{"5501":0,"5521":0,"5523":null,"5525":0,"5526":0,"5534":0,"5538":0,"5543":1,"5544":0,"5750":"app_name","5850":1},"colors":["#000","#adadad"],"icons":["/icons/aloes/clock.png","/icons/aloes/clock-white.png"]},{"name":"Addressable text display","description":"used to send text to a text-only or text mode graphics display. POSTing a string of text to the text resource causes it to be displayed at the selected X and Y locations on the display. If X or Y are set to a value greater than the size of the display, the position “wraps around” to the modulus of the setting and the display size. Likewise, if the text string overflows the display size, the text “wraps around” and displays on the next line down or, if the last line has been written, wraps around to the top of the display. Brightness and Contrast controls are provided to allow control of various display types including STN and DSTN type LCD character displays. POSTing an empty payload to the Clear Display resource causes the display to be erased.","value":3341,"resourceIds":"5527, 5528, 5529, 5530, 5531, 5545, 5546, 5548, 5850, 5750","resources":{"5527":"some_text","5528":0,"5529":0,"5530":null,"5531":100,"5545":0,"5546":0,"5548":100,"5750":"app_name","5850":1},"colors":["#000","#adadad"],"icons":["/icons/aloes/text.png","/icons/aloes/text-white.png"]},{"name":"On/Off Switch","description":"used with an On/Off switch to report the state of the switch.","value":3342,"resourceIds":"5500, 5501, 5852, 5854, 5750","resources":{"5500":1,"5501":0,"5750":"app-name","5852":1,"5854":0},"colors":["#000","#adadad"],"icons":["/icons/aloes/switch-on.png","/icons/aloes/switch-on-white.png"]},{"name":"Level Control","description":"used with a dimmer or level control to report the state of the control.","value":3343,"resourceIds":"5548, 5852, 5854, 5750","resources":{"5548":1,"5750":"app_name","5852":1,"5854":0},"colors":["#000","#adadad"],"icons":["/icons/aloes/level-control.png","/icons/aloes/level-control-white.png"]},{"name":"Up/Down Control","description":"used to report the state of an up/down control element like a pair of push buttons or a rotary encoder. Counters for increase and decrease operations are provided for counting pulses from a quadrature encoder","value":3344,"resourceIds":"5532, 5533, 5541, 5542, 5750","resources":{"5532":1,"5533":1,"5541":0,"5542":0,"5750":"app_name"},"colors":["#000","#adadad"],"icons":["/icons/aloes/height.png","/icons/aloes/height-white.png"]},{"name":"Multiple Axis Joystick","description":"report the position of a shuttle or joystick control. A digital input is provided to report the state of an associated push button.","value":3345,"resourceIds":"5500, 5501, 5702, 5703, 5704, 5750","resources":{"5500":1,"5501":0,"5702":1,"5703":0,"5704":0,"5750":"app-name"},"colors":["#000","#adadad"],"icons":["/icons/aloes/joystick.png","/icons/aloes/joystick-white.png"]},{"name":"Rate","description":"report a rate measurement, for example the speed of a vehicle, or the rotational speed of a drive shaft. It also provides resources for minimum and maximum measured values, as well as the minimum and maximum range that can be measured by the sensor.An example measurement unit is Feet per Second (ucum:ft_us/s)","value":3346,"resourceIds":"5700, 5701, 5601, 5602, 5603, 5604, 5605, 5821, 5750","resources":{"5601":1,"5602":0,"5603":0,"5604":0,"5605":null,"5700":0,"5701":"m/s","5750":"app-name","5821":"coeff"},"colors":["#000","#adadad"],"icons":["/icons/aloes/frequency.png","/icons/aloes/frequency-white.png"]},{"name":"Push Button","description":"report the state of a momentary action push button control and to count the number of times the control has been operated since the last observation.","value":3347,"resourceIds":"5500, 5501, 5750","resources":{"5500":0,"5501":0,"5750":"app-name"},"colors":["#000","#adadad"],"icons":["/icons/aloes/push-button.png","/icons/aloes/push-button-white.png"]},{"name":"Multistate Selector","description":"represent the state of a Multi-state selector switch with a number of fixed positions.","value":3348,"resourceIds":"5547, 5750","resources":{"5547":0,"5750":"app-name"},"colors":["#000","#adadad"],"icons":["/icons/aloes/loudness.png","/icons/aloes/loudness-white.png"]},{"name":"Bitmap","description":"Summarize several digital inputs to one value by mapping each bit to a digital input.","value":3349,"resourceIds":"5910, 5911, 5912, 5750","resources":{"5750":"app-name","5910":0,"5911":null,"5912":""},"colors":["#000","#adadad"],"icons":["/icons/aloes/dither.png","/icons/aloes/dither-white.png"]},{"name":"Stopwatch","description":"An ascending timer that counts how long time has passed since the timer was started after reset.","value":3350,"resourceIds":"5501, 5544, 5850, 5750","resources":{"5501":0,"5544":0,"5750":"app-name","5850":1},"colors":["#000","#adadad"],"icons":["/icons/aloes/clock.png","/icons/aloes/clock-white.png"]},{"name":"powerupLog","description":"An ascending timer that counts how long time has passed since the timer was started after reset.","value":3351,"resourceIds":"10, 1, 2, 3, 4","resources":{"1":"toolVersion","2":"IMEI","3":"IMSI","4":"MSISDN","10":"deviceName"},"colors":["#000","#adadad"],"icons":["/icons/aloes/clock.png","/icons/aloes/clock-white.png"]},{"name":"plmnSearchEvent","description":"List of all PLMNs found during the initial search/scan","value":3352,"resourceIds":"0, 6030, 6031, 6032","resources":{"0":"timeScanStart","6030":0,"6031":0,"6032":0},"colors":["#000","#adadad"],"icons":["/icons/aloes/clock.png","/icons/aloes/clock-white.png"]},{"name":"scellID","description":"serving cell information that the RRC decides to camp on","value":3353,"resourceIds":"2, 6030, 6031, 6033","resources":{"2":"TrackingAreaCode","6030":0,"6031":0,"6033":0},"colors":["#000","#adadad"],"icons":["/icons/aloes/clock.png","/icons/aloes/clock-white.png"]},{"name":"cellReselectionEvent","description":"cell reselection event information","value":3354,"resourceIds":"2, 3, 6032, 6033","resources":{"2":"timeReselectionStart","3":"failureType","6032":0,"6033":0},"colors":["#000","#adadad"],"icons":["/icons/aloes/clock.png","/icons/aloes/clock-white.png"]},{"name":"handoverEvent","description":"handover event information","value":3355,"resourceIds":"2, 3, 4, 5, 6, 6032, 6033","resources":{"0":"timeHandoverStart","3":"handoverResult","4":"TargetEarfcn","5":"TargetPhysicalCellID","6":"targetCellRsrp","6032":0,"6033":0},"colors":["#000","#adadad"],"icons":["/icons/aloes/clock.png","/icons/aloes/clock-white.png"]},{"name":"radioLinkFailureEvent","description":"Radio Link Failure Event","value":3356,"resourceIds":"0, 1","resources":{"0":"timeRLF","1":"rlfCause"},"colors":["#000","#adadad"],"icons":["/icons/aloes/clock.png","/icons/aloes/clock-white.png"]},{"name":"rrcStateChangeEvent","description":"Current RRC state change information, including the event that triggered the state change","value":3357,"resourceIds":"0, 1","resources":{"0":"rrcState","1":"rrcStateChangeCause"},"colors":["#000","#adadad"],"icons":["/icons/aloes/clock.png","/icons/aloes/clock-white.png"]},{"name":"rrcTimerExpiryEvent","description":"RRC timer expiry event information","value":3358,"resourceIds":"0","resources":{"0":"RrcTimerExpiryEvent"},"colors":["#000","#adadad"],"icons":["/icons/aloes/clock.png","/icons/aloes/clock-white.png"]},{"name":"cellBlacklistEvent","description":"Cell blacklist information","value":3359,"resourceIds":"6032, 6033","resources":{"6032":0,"6033":0},"colors":["#000","#adadad"],"icons":["/icons/aloes/clock.png","/icons/aloes/clock-white.png"]}];

/***/ }),

/***/ "230e":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var document = __webpack_require__("7726").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "23c6":
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__("2d95");
var TAG = __webpack_require__("2b4c")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "27ee":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("23c6");
var ITERATOR = __webpack_require__("2b4c")('iterator');
var Iterators = __webpack_require__("84f2");
module.exports = __webpack_require__("8378").getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "28a5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isRegExp = __webpack_require__("aae3");
var anObject = __webpack_require__("cb7c");
var speciesConstructor = __webpack_require__("ebd6");
var advanceStringIndex = __webpack_require__("0390");
var toLength = __webpack_require__("9def");
var callRegExpExec = __webpack_require__("5f1b");
var regexpExec = __webpack_require__("520a");
var fails = __webpack_require__("79e5");
var $min = Math.min;
var $push = [].push;
var $SPLIT = 'split';
var LENGTH = 'length';
var LAST_INDEX = 'lastIndex';
var MAX_UINT32 = 0xffffffff;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () { RegExp(MAX_UINT32, 'y'); });

// @@split logic
__webpack_require__("214f")('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return $split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy[LAST_INDEX];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
    };
  } else {
    internalSplit = $split;
  }

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = defined(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (SUPPORTS_Y ? 'y' : 'g');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = $min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
});


/***/ }),

/***/ "2aba":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var has = __webpack_require__("69a8");
var SRC = __webpack_require__("ca5a")('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__("8378").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "2aeb":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("cb7c");
var dPs = __webpack_require__("1495");
var enumBugKeys = __webpack_require__("e11e");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("230e")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("fab2").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "2b4c":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("5537")('wks');
var uid = __webpack_require__("ca5a");
var Symbol = __webpack_require__("7726").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "2d00":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "2d95":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "31f4":
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),

/***/ "3218":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {/* harmony import */ var core_js_modules_es6_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("551c");
/* harmony import */ var core_js_modules_es6_promise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_promise__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es6_number_constructor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("c5f6");
/* harmony import */ var core_js_modules_es6_number_constructor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_number_constructor__WEBPACK_IMPORTED_MODULE_1__);



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* eslint-disable no-console */
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('SensorCamera', component.exports);
}

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'SensorCamera',
  props: {
    sensor: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      default: 150
    },
    height: {
      type: Number,
      default: 140
    }
  },
  data: function data() {
    return {
      updatedSensor: null,
      updatedHeight: null,
      updatedWidth: null,
      aSide: true,
      imageUrl: null,
      fpm: [1, 2, 4, 6],
      img: {},
      canvas: {},
      captures: [],
      uploadedFiles: [],
      counter: 0
    };
  },
  computed: {
    viewBox: function viewBox() {
      return "0 0 ".concat(this.updatedWidth, " ").concat(this.updatedHeight);
    },
    value: {
      get: function get() {
        return this.updatedSensor.resources['5910']; //  return this.normalize(this.value, this.minRangeValue, this.maxRangeValue);
      },
      set: function set(value) {
        this.updatedSensor.resources['5910'] = value;
      }
    }
  },
  watch: {
    sensor: {
      handler: function handler(sensor) {
        this.updatedSensor = JSON.parse(sensor);
      },
      immediate: true
    },
    width: {
      handler: function handler(width) {
        this.updatedWidth = width;
      },
      immediate: true
    },
    height: {
      handler: function handler(height) {
        this.updatedHeight = height;
      },
      immediate: true
    },
    value: {
      handler: function handler(value) {
        if (!value || value === null) return null;

        if (value.type === 'Buffer') {
          console.log('camera value', Buffer.from(value.data).buffer);
          var blob = new Blob([Buffer.from(value.data).buffer]);
          this.getImage(blob);
        }
      },
      immediate: true
    }
  },
  mounted: function mounted() {
    this.mountElements();

    if (this.value && this.value.type === 'Buffer') {
      var blob = new Blob([Buffer.from(this.value.data).buffer]);
      this.getImage(blob);
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.counter = 0;
    this.timelapse = false;
    this.elementsMounted = false;
  },
  methods: {
    updateSensor: function updateSensor() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this.$emit.apply(this, ['update-sensor'].concat(args));
    },
    deleteSensor: function deleteSensor() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      this.$emit.apply(this, ['delete-sensor'].concat(args));
    },
    flipSide: function flipSide(value) {
      this.$emit('flip-side', value);
    },
    mountElements: function mountElements() {
      this.image = this.$refs["streamViewer-".concat(this.updatedSensor.id)];
      this.elementsMounted = true;
    },
    getImage: function getImage(blob) {
      var _this = this;

      if (!this.elementsMounted) return null;
      return new Promise(function (resolve, reject) {
        var fReader = new FileReader();

        fReader.onload = function () {
          if (!fReader.result) reject(new Error('no result from file reader'));
          _this.imageUrl = fReader.result;
          resolve(_this.imageUrl); //  resolve(this.getBase64Image(img));
        };

        if (blob instanceof Blob) {
          fReader.readAsDataURL(blob);
        }
      });
    }
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("b639").Buffer))

/***/ }),

/***/ "3261":
/***/ (function(module) {

module.exports = {"aloesClient":{"collectionPattern":"+userId/+collectionName/+method","instancePattern":"+userId/+collectionName/+method/+modelId","validators":{"userId":"string","collectionName":["Account","Device","Sensor","VirtualObject","IoTAgent"],"modelId":"string","methods":["HEAD","POST","GET","PUT","DELETE"]}},"mySensors":{"pattern":"+prefixedDevEui/+nodeId/+sensorId/+method/+ack/+subType","validators":{"userId":"string","nodeId":"number","sensorId":"number","subType":"number","methods":[0,1,2,3,4]}},"aloesLight":{"pattern":"+prefixedDevEui/+method/+omaObjectId/+sensorId/+omaResourceId","validators":{"prefixedDevEui":"string","nodeId":"number","sensorId":"number","subType":"number","methods":[0,1,2,3,4]}}};

/***/ }),

/***/ "32e9":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var createDesc = __webpack_require__("4630");
module.exports = __webpack_require__("9e1e") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "33a4":
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__("84f2");
var ITERATOR = __webpack_require__("2b4c")('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),

/***/ "3846":
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__("9e1e") && /./g.flags != 'g') __webpack_require__("86cc").f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__("0bfb")
});


/***/ }),

/***/ "38fd":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("69a8");
var toObject = __webpack_require__("4bf8");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "399e":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mqttPattern = __webpack_require__("5bc6");

var _require = __webpack_require__("cba2"),
    logger = _require.logger;

var mySensorsApi = __webpack_require__("6ac1");

var omaObjects = __webpack_require__("22c4");

var omaResources = __webpack_require__("4a2d");

var omaViews = __webpack_require__("4888");

var protocolPatterns = __webpack_require__("3261"); // device as argument ?


function merge(a, b, prop) {
  var reduced = a.filter(function (aitem) {
    return !b.find(function (bitem) {
      return aitem[prop] === bitem[prop];
    });
  });
  return reduced.concat(b);
}

var mySensorsToOmaObject = function mySensorsToOmaObject(msg) {
  try {
    logger(2, 'handlers', 'mySensorsToOmaObject:req', msg);

    if (msg.sensorId === 255 || msg.type === null) {
      return null;
    }

    var foundOmaObject = omaObjects.find(function (object) {
      return object.value === msg.type;
    });
    if (!foundOmaObject) return 'no OMA Object found';
    var foundOmaViews = omaViews.find(function (object) {
      return object.value === msg.type;
    });

    var decoded = _objectSpread({}, msg, {
      protocolName: 'mySensors',
      //  nativeResources: foundOmaObject.resources,
      name: foundOmaObject.name,
      icons: foundOmaViews.icons,
      colors: foundOmaViews.resources,
      resources: foundOmaObject.resources,
      frameCounter: 0
    });

    logger(4, 'handlers', 'mySensorsToOmaObject:res', decoded);
    return decoded;
  } catch (error) {
    logger(2, 'handlers', 'mySensorsToOmaObject:err', error);
    throw error;
  }
}; // sensor as argument ?


var mySensorsToOmaResources = function mySensorsToOmaResources(msg) {
  try {
    logger(2, 'handlers', 'mySensorsToOmaResources:req', msg);

    if (msg.sensorId === 255 || !msg.resources) {
      return null;
    }

    var resourcesKeys = Object.getOwnPropertyNames(msg.resources);

    if (Object.prototype.hasOwnProperty.call(msg.resources, resourcesKeys[0])) {
      //  msg.resources[resourcesKeys[0]] = msg.value;
      msg.resource = resourcesKeys[0]; //  msg.mainResourceId = resourcesKeys[0];
    }

    var decoded = _objectSpread({}, msg);

    logger(4, 'handlers', 'mySensorsToOmaResources:res', decoded);
    return decoded;
  } catch (error) {
    logger(2, 'handlers', 'mySensorsToOmaResources:err', error);
    throw error;
  }
};

var mySensorsDecoder = function mySensorsDecoder(packet, protocol) {
  var decoded = {};

  try {
    logger(4, 'handlers', 'mySensorsDecoder:req', protocol);
    var protocolKeys = Object.getOwnPropertyNames(protocol);

    if (protocolKeys.length === 6) {
      var decodedPayload;
      var gatewayIdParts = protocol.prefixedDevEui.split('-');
      var inPrefix = '-in';
      var outPrefix = '-out';

      var params = _objectSpread({}, protocol, {
        prefixedDevEui: "".concat(gatewayIdParts[0]).concat(inPrefix)
      });

      decoded.inPrefix = inPrefix;
      decoded.outPrefix = outPrefix;
      decoded.prefix = gatewayIdParts[1];
      decoded.devEui = gatewayIdParts[0];
      decoded.lastSignal = new Date();

      switch (Number(protocol.method)) {
        case 0:
          // Presentation
          decoded.nativeNodeId = protocol.nodeId;
          decoded.nativeSensorId = protocol.sensorId;
          decoded.type = mySensorsApi.labelsPresentation[Number(protocol.subType)].omaObject;
          decoded.nativeType = Number(protocol.subType);
          decoded.value = packet.payload.toString();
          decoded.method = 'HEAD';
          decodedPayload = mySensorsToOmaObject(decoded);
          break;

        case 1:
          // Set
          decoded.inputPath = mqttPattern.fill(protocolPatterns.mySensors.pattern, params);
          params.prefixedDevEui = "".concat(gatewayIdParts[0]).concat(outPrefix);
          decoded.outputPath = mqttPattern.fill(protocolPatterns.mySensors.pattern, params);
          decoded.nativeNodeId = protocol.nodeId;
          decoded.nativeSensorId = protocol.sensorId;
          decoded.resources = mySensorsApi.labelsSet[Number(protocol.subType)].omaResources;
          decoded.nativeResource = Number(protocol.subType);
          decoded.value = packet.payload.toString();
          decoded.method = 'POST';
          decodedPayload = mySensorsToOmaResources(decoded);
          break;

        case 2:
          // Req
          decoded.nativeNodeId = protocol.nodeId;
          decoded.nativeSensorId = protocol.sensorId;
          decoded.resources = mySensorsApi.labelsSet[Number(protocol.subType)].omaResources;
          decoded.nativeResource = Number(protocol.subType);
          decoded.method = 'GET';
          decodedPayload = decoded;
          break;

        case 3:
          // Internal
          decoded.nativeNodeId = protocol.nodeId;
          decoded.nativeSensorId = protocol.sensorId;
          decoded.type = Number(protocol.subType);
          decoded.value = packet.payload.toString();
          break;

        case 4:
          // Stream - OTA firmware update
          decoded.nativeNodeId = protocol.nodeId;
          decoded.nativeSensorId = protocol.sensorId;
          decoded.nativeResource = Number(protocol.subType);
          decoded.value = packet.payload;
          decoded.method = 'STREAM';
          decodedPayload = decoded;
          break;

        default:
          break;
      }

      return decodedPayload;
    }

    return "topic doesn't match";
  } catch (error) {
    throw error;
  }
};

module.exports = {
  mySensorsToOmaObject: mySensorsToOmaObject,
  mySensorsToOmaResources: mySensorsToOmaResources,
  mySensorsDecoder: mySensorsDecoder
};

/***/ }),

/***/ "41a0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("2aeb");
var descriptor = __webpack_require__("4630");
var setToStringTag = __webpack_require__("7f20");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("32e9")(IteratorPrototype, __webpack_require__("2b4c")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "456d":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__("4bf8");
var $keys = __webpack_require__("0d58");

__webpack_require__("5eda")('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),

/***/ "4588":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "4630":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "4691":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var mqttPattern = __webpack_require__("5bc6");

var _require = __webpack_require__("cba2"),
    logger = _require.logger;

var protocolPatterns = __webpack_require__("3261");

var clientToAloesLight = function clientToAloesLight(instance, protocol) {
  // "+prefixedDevEui/+method/+omaObjectId/+sensorId/+omaResourceId",
  var topic = null;
  var params = {
    prefixedDevEui: "".concat(instance.devEui).concat(instance.inPrefix),
    omaObjectId: instance.type,
    sensorId: instance.nativeSensorId,
    omaResourceId: instance.resource
  };
  logger(4, "handlers", "clientToAloesLight", params);

  if (protocol.method === "POST" || protocol.method === "PUT") {
    params.method = 1;
    topic = mqttPattern.fill(protocolPatterns.aloesLight.pattern, params);
    return {
      topic: topic,
      payload: instance.value
    };
  } else if (protocol.method === "GET") {
    params.method = 2;
    topic = mqttPattern.fill(protocolPatterns.aloesLight.pattern, params);
    return {
      topic: topic,
      payload: instance.value
    };
  }

  return "Method not supported yet";
};

var clientToMySensors = function clientToMySensors(instance, protocol) {
  //  "+prefixedDevEui/+nodeId/+sensorId/+method/+ack/+subType",
  var topic = null;
  var params = {
    prefixedDevEui: "".concat(instance.devEui).concat(instance.inPrefix),
    nodeId: instance.nativeNodeId,
    sensorId: instance.nativeSensorId,
    subType: instance.nativeResource
  };
  logger(4, "handlers", "clientToMySensors", params);

  if (protocol.method === "POST" || protocol.method === "PUT") {
    params.method = 2;
    params.ack = 0;
    topic = mqttPattern.fill(protocolPatterns.mySensors.pattern, params);
    return {
      topic: topic,
      payload: instance.value
    };
  } else if (protocol.method === "GET") {
    params.method = 2;
    params.ack = 0;
    topic = mqttPattern.fill(protocolPatterns.mySensors.pattern, params);
    return {
      topic: topic,
      payload: instance.value
    };
  }

  return "Method not supported yet";
};

var aloesClientDecoder = function aloesClientDecoder(packet, protocol) {
  try {
    logger(4, "handlers", "aloesClientDecoder:req", protocol);
    var instance = JSON.parse(packet.payload);
    var protocolKeys = Object.getOwnPropertyNames(protocol);
    logger(4, "handlers", "aloesClientDecoder:req", protocolKeys.length);

    if (protocolKeys.length === 3 || protocolKeys.length === 4) {
      var decodedPayload;
      logger(4, "handlers", "aloesClientDecoder:req", instance);

      switch (instance.protocolName) {
        case "aloesLight":
          decodedPayload = clientToAloesLight(instance, protocol);
          break;

        case "mySensors":
          decodedPayload = clientToMySensors(instance, protocol);
          break;

        case "nodeWebcam":
          // Req
          //  await clientToMySensors(app, newPayload);
          break;

        default:
          decodedPayload = "Protocol not supported yet";
          break;
      }

      return decodedPayload;
    }

    return "topic doesn't match";
  } catch (error) {
    logger(4, "handlers", "aloesClientDecoder:err", error);
    throw error;
  }
};

module.exports = {
  clientToAloesLight: clientToAloesLight,
  clientToMySensors: clientToMySensors,
  aloesClientDecoder: aloesClientDecoder
};

/***/ }),

/***/ "4888":
/***/ (function(module) {

module.exports = [{"name":"Digital Input","value":3200,"resources":{"5500":"#000","5501":"#000","5502":"#000","5503":"#000","5504":"#000","5505":"#000","5750":"#000","5751":"#000"},"icons":["/icons/aloes/digital.svg","/icons/aloes/digital.png","/icons/aloes/digital-white.png"]},{"name":"Digital Output","value":3201,"resources":{"5550":"#000","5551":"#000","5750":"#000"},"icons":["/icons/aloes/digital.png","/icons/aloes/digital-white.png"]},{"name":"Analog Input","value":3202,"resources":{"5600":"#000","5601":"#5ae2e2","5602":"#ff3535","5603":"#5ae2e2","5604":"#ff3535","5605":"#000","5750":"#000","5751":"#000"},"icons":["/icons/aloes/analog.svg","/icons/aloes/analog.png","/icons/aloes/analog-white.png"]},{"name":"Analog Output","value":3203,"resources":{"5603":"#5ae2e2","5604":"#ff3535","5650":"#000","5750":"#000"},"icons":["/icons/aloes/analog.svg","/icons/aloes/analog.png","/icons/aloes/analog-white.png"]},{"name":"Generic sensor","value":3300,"resources":{"5601":"#5ae2e2","5602":"#ff3535","5603":"#5ae2e2","5604":"#ff3535","5605":"#000","5700":"#000","5701":"#000","5750":"#000","5751":"#000"},"icons":["/icons/aloes/custom.svg","/icons/aloes/custom.png","/icons/aloes/custom-white.png"]},{"name":"Illuminance sensor","value":3301,"resources":{"5601":"#5ae2e2","5602":"#ff3535","5603":"#5ae2e2","5604":"#ff3535","5605":"#000","5700":"#000","5701":"#000"},"icons":["/icons/aloes/light.svg","/icons/aloes/light.png","/icons/aloes/light-white.png"]},{"name":"Presence sensor","value":3302,"resources":{"5500":"#000","5501":"#000","5505":"#000","5751":"#000","5903":"#000","5904":"#000"},"icons":["/icons/aloes/presence.svg","/icons/aloes/presence.png","/icons/aloes/presence-white.png"]},{"name":"Temperature Sensor","value":3303,"resources":{"5601":"#5ae2e2","5602":"#ff3535","5603":"#5ae2e2","5604":"#ff3535","5605":"#000","5700":"#000","5701":"#000"},"icons":["/icons/aloes/temperature.svg","/icons/aloes/temperature.png","/icons/aloes/temperature-white.png"]},{"name":"Humidity Sensor","value":3304,"resources":{"5601":"#5ae2e2","5602":"#ff3535","5603":"#5ae2e2","5604":"#ff3535","5605":"#000","5700":"#000","5701":"#000"},"icons":["/icons/aloes/humidity.svg","/icons/aloes/humidity.png","/icons/aloes/humidity-white.png"]},{"name":"Power Measurment","value":3305,"resources":{"5605":"#000","5800":"#000","5801":"#000","5802":"#000","5803":"#000","5804":"#000","5805":"#000","5806":"#000","5810":"#000","5811":"#000","5812":"#000","5813":"#000","5814":"#000","5815":"#000","5816":"#000","5820":"#fea103","5821":"#434b77","5822":"#00FF00"},"icons":["/icons/aloes/switch-on.svg","/icons/aloes/switch-off.svg","/icons/aloes/switch-on.png","/icons/aloes/switch-off.png","/icons/aloes/switch-on-white.png","/icons/aloes/switch-off-white.png"]},{"name":"Actuation","value":3306,"resources":{"5750":"#000","5850":"#000","5851":"#000","5852":"#000","5853":"#000"},"icons":["/icons/aloes/switch-on.svg","/icons/aloes/switch-off.svg","/icons/aloes/switch-on.png","/icons/aloes/switch-off.png","/icons/aloes/switch-on-white.png","/icons/aloes/switch-off-white.png"]},{"name":"Set Point","value":3308,"resources":{"5701":"#000","5706":"#b1b1b1","5750":"#000","5900":"#434B77"},"icons":["/icons/aloes/switch-on.svg","/icons/aloes/switch-off.svg","/icons/aloes/switch-on.png","/icons/aloes/switch-off.png","/icons/aloes/switch-on-white.png","/icons/aloes/switch-off-white.png"]},{"name":"Load Control","value":3310,"resources":{"5750":"#000","5823":"#00FF00","5824":"#474c4d","5825":"#474c4d","5826":"#00FF00","5827":"#000","5828":"#000"},"icons":["/icons/aloes/slider.svg","/icons/aloes/slider.png","/icons/aloes/slider-white.png"]},{"name":"Light control","value":3311,"resources":{"5701":"#000","5706":"#b1b1b1","5750":"#000","5805":"#000","5820":"#fea103","5850":"#000","5851":"#000","5852":"#000"},"icons":["/icons/aloes/slider.svg","/icons/aloes/slider.png","/icons/aloes/slider-white.png"]},{"name":"Power control","value":3312,"resources":{"5750":"#000","5805":"#000","5820":"#fea103","5850":"#000","5851":"#000","5852":"#000"},"icons":["/icons/aloes/slider.svg","/icons/aloes/slider.png","/icons/aloes/slider-white.png"]},{"name":"Accelerometer","value":3313,"resources":{"5603":"#5ae2e2","5604":"#ff3535","5701":"#000","5702":"#cc3333","5703":"#97ef87","5704":"#8797ef"},"icons":["/icons/aloes/accelerometer.svg","/icons/aloes/accelerometer.png","/icons/aloes/accelerometer-white.png"]},{"name":"Magnetometer","value":3314,"resources":{"5701":"#000","5702":"#cc3333","5703":"#97ef87","5704":"#8797ef","5705":"#000"},"icons":["/icons/aloes/magnetism.svg","/icons/aloes/magnetism.png","/icons/aloes/magnetism-white.png"]},{"name":"Barometer","value":3315,"resources":{"5601":"#5ae2e2","5602":"#ff3535","5603":"#5ae2e2","5604":"#ff3535","5605":"#000","5700":"#000","5701":"#000"},"icons":["/icons/aloes/barometer.svg","/icons/aloes/barometer.png","/icons/aloes/barometer-white.png"]},{"name":"Voltage","value":3316,"resources":{"5601":"#aef9e4","5602":"#33e8b5","5603":"#aef9e4","5604":"#33e8b5","5605":"#000","5700":"#000","5701":"#000","5750":"#000","5821":"#434b77"},"icons":["/icons/aloes/voltage.svg","/icons/aloes/voltage.png","/icons/aloes/voltage-white.png"]},{"name":"Current","value":3317,"resources":{"5601":"#f2e2bc","5602":"#f4bd3a","5603":"#f2e2bc","5604":"#f4bd3a","5605":"#000","5700":"#000","5701":"#000","5750":"#000","5821":"#434b77"},"icons":["/icons/aloes/voltage.svg","/icons/aloes/voltage.png","/icons/aloes/voltage-white.png"]},{"name":"Frequency","value":3318,"resources":{"5601":"#5ae2e2","5602":"#ff3535","5603":"#5ae2e2","5604":"#ff3535","5605":"#000","5700":"#000","5701":"#000","5750":"#000","5821":"#434b77"},"icons":["/icons/aloes/frequency.svg","/icons/aloes/frequency.png","/icons/aloes/frequency-white.png"]},{"name":"Depth","value":3319,"resources":{"5601":"#5ae2e2","5602":"#ff3535","5603":"#5ae2e2","5604":"#ff3535","5605":"#000","5700":"#000","5701":"#000","5750":"#000","5821":"#434b77"},"icons":["/icons/aloes/depth.svg","/icons/aloes/depth.png","/icons/aloes/depth-white.png"]},{"name":"Percentage","value":3320,"resources":{"5601":"#5ae2e2","5602":"#ff3535","5603":"#5ae2e2","5604":"#ff3535","5605":"#000","5700":"#000","5701":"#000","5750":"#000","5821":"#434b77"},"icons":["/icons/aloes/percentage.sv","/icons/aloes/percentage.png","/icons/aloes/percentage-white.png"]},{"name":"Altitude","value":3321,"resources":{"5601":"#5ae2e2","5602":"#ff3535","5603":"#5ae2e2","5604":"#ff3535","5605":"#000","5700":"#000","5701":"#000","5750":"#000","5821":"#434b77"},"icons":["/icons/aloes/height.svg","/icons/aloes/height.png","/icons/aloes/height-white.png"]},{"name":"Load","value":3322,"resources":{"5601":"#5ae2e2","5602":"#ff3535","5603":"#5ae2e2","5604":"#ff3535","5605":"#000","5700":"#000","5701":"#000","5750":"#000","5821":"#434b77"},"icons":["/icons/aloes/voltage.svg","/icons/aloes/voltage.png","/icons/aloes/voltage-white.png"]},{"name":"Pressure","value":3323,"resources":{"5601":"#5ae2e2","5602":"#ff3535","5603":"#5ae2e2","5604":"#ff3535","5605":"#000","5700":"#000","5701":"#000","5750":"#000","5821":"#434b77"},"icons":["/icons/aloes/pressure.svg","/icons/aloes/pressure.png","/icons/aloes/pressure-white.png"]},{"name":"Loudness","value":3324,"resources":{"5601":"#5ae2e2","5602":"#ff3535","5603":"#5ae2e2","5604":"#ff3535","5605":"#000","5700":"#000","5701":"#000","5750":"#000","5821":"#434b77"},"icons":["/icons/aloes/loudness.svg","/icons/aloes/loudness.png","/icons/aloes/loudness-white.png"]},{"name":"Concentration","value":3325,"resources":{"5601":"#5ae2e2","5602":"#ff3535","5603":"#5ae2e2","5604":"#ff3535","5605":"#000","5700":"#000","5701":"#000","5750":"#000","5821":"#434b77"},"colors":["#000","#adadad"],"icons":["/icons/aloes/petri-dish.svg","/icons/aloes/petri-dish.png","/icons/aloes/petri-dish-white.png"]},{"name":"Acidity","value":3326,"resources":{"5601":"#5ae2e2","5602":"#ff3535","5603":"#5ae2e2","5604":"#ff3535","5605":"#000","5700":"#000","5701":"#000","5750":"#000","5821":"#434b77"},"icons":["/icons/aloes/acid.svg","/icons/aloes/acid.png","/icons/aloes/acid-white.png"]},{"name":"Conductivity","value":3327,"resources":{"5601":"#5ae2e2","5602":"#ff3535","5603":"#5ae2e2","5604":"#ff3535","5605":"#000","5700":"#000","5701":"#000","5750":"#000","5821":"#434b77"},"icons":["/icons/aloes/electrons.svg","/icons/aloes/electrons.png","/icons/aloes/electrons-white.png"]},{"name":"Power","value":3328,"resources":{"5601":"#5ae2e2","5602":"#ff3535","5603":"#5ae2e2","5604":"#ff3535","5605":"#000","5700":"#000","5701":"#000","5750":"#000","5821":"#434b77"},"icons":["/icons/aloes/power.svg","/icons/aloes/power.png","/icons/aloes/power-white.png"]},{"name":"Power factor","value":3329,"resources":{"5601":"#5ae2e2","5602":"#ff3535","5603":"#5ae2e2","5604":"#ff3535","5605":"#000","5700":"#000","5701":"#000","5750":"#000","5821":"#434b77"},"icons":["/icons/aloes/phi.svg","/icons/aloes/phi.png","/icons/aloes/phi-white.png"]},{"name":"Distance","value":3330,"resources":{"5601":"#5ae2e2","5602":"#ff3535","5603":"#5ae2e2","5604":"#ff3535","5605":"#000","5700":"#000","5701":"#000","5750":"#000","5821":"#434b77"},"icons":["/icons/aloes/distance.svg","/icons/aloes/distance.png","/icons/aloes/distance-white.png"]},{"name":"Energy","value":3331,"resources":{"5701":"#000","5750":"#000","5805":"#000","5822":"#00FF00"},"icons":["/icons/aloes/energy.svg","/icons/aloes/energy.png","/icons/aloes/energy-white.png"]},{"name":"Direction","value":3332,"resources":{"5601":"#5ae2e2","5602":"#ff3535","5605":"#000","5705":"#000","5750":"#000"},"icons":["/icons/aloes/direction.svg","/icons/aloes/direction.png","/icons/aloes/direction-white.png"]},{"name":"Time","value":3333,"resources":{"5506":"#434B77","5507":"#434B77","5750":"#000"},"icons":["/icons/aloes/time.svg","/icons/aloes/time.png","/icons/aloes/time-white.png"]},{"name":"Gyrometer","value":3334,"resources":{"5508":"#cc3333","5509":"#cc3333","5510":"#97ef87","5511":"#97ef87","5512":"#8797ef","5513":"#8797ef","5603":"#5ae2e2","5604":"#ff3535","5605":"#000","5701":"#000","5702":"#cc3333","5703":"#97ef87","5704":"#8797ef","5750":"#000"},"icons":["/icons/aloes/accelerometer.svg","/icons/aloes/accelerometer.png","/icons/aloes/accelerometer-white.png"]},{"name":"Color","value":3335,"resources":{"5701":"#000","5706":"#b1b1b1","5750":"#000"},"icons":["/icons/aloes/colors.svg","/icons/aloes/colors.png","/icons/aloes/colors-white.png"]},{"name":"GPS Location","value":3336,"resources":{"5514":"#000","5515":"#000","5516":"#000","5517":"#000","5518":"#434B77","5705":"#000"},"icons":["/icons/aloes/location.svg","/icons/aloes/location.png","/icons/aloes/location-white.png"]},{"name":"Positioner","value":3337,"resources":{"5519":"#5ae2e2","5520":"#ff3535","5536":"#000","5537":"#434B77","5538":"#434B77","5601":"#5ae2e2","5602":"#ff3535","5605":"#000","5750":"#000"},"icons":["/icons/aloes/level-control.svg","/icons/aloes/level-control.png","/icons/aloes/level-control-white.png"]},{"name":"Buzzer","value":3338,"resources":{"5521":"#434B77","5525":"#434B77","5548":"#000","5750":"#000","5850":"#000"},"icons":["/icons/aloes/loudness.svg","/icons/aloes/loudness.png","/icons/aloes/loudness-white.png"]},{"name":"Audio clip","value":3339,"resources":{"5522":"#000","5523":"#00FF00","5524":"#434B77","5548":"#000","5750":"#000"},"icons":["/icons/aloes/loudness.svg","/icons/aloes/loudness.png","/icons/aloes/loudness-white.png"]},{"name":"Timer","value":3340,"resources":{"5501":"#000","5521":"#434B77","5523":"#00FF00","5525":"#434B77","5526":"#000","5534":"#000","5538":"#434B77","5543":"#000","5544":"#434B77","5750":"#000","5850":"#000"},"icons":["/icons/aloes/time.svg","/icons/aloes/agenda.svg","/icons/aloes/time.png","/icons/aloes/time-white.png","/icons/aloes/agenda.png","/icons/aloes/agenda-white.png"]},{"name":"Addressable text display","value":3341,"resources":{"5527":"#000","5528":"#cc3333","5529":"#97ef87","5530":"#00FF00","5531":"#000","5545":"#cc3333","5546":"#97ef87","5548":"#000","5750":"#000","5850":"#000"},"icons":["/icons/aloes/text.svg","/icons/aloes/text.png","/icons/aloes/text-white.png"]},{"name":"On/Off Switch","value":3342,"resources":{"5500":"#000","5501":"#000","5750":"#000","5852":"#000","5854":"#434B77"},"icons":["/icons/aloes/switch-on.svg","/icons/aloes/switch-off.svg","/icons/aloes/switch-on.png","/icons/aloes/switch-off.png","/icons/aloes/switch-on-white.png","/icons/aloes/switch-off-white.png"]},{"name":"Level Control","value":3343,"resources":{"5548":"#000","5750":"#000","5852":"#000","5854":"#434B77"},"icons":["/icons/aloes/level-control.svg","/icons/aloes/level-control.png","/icons/aloes/level-control-white.png"]},{"name":"Up/Down Control","value":3344,"resources":{"5532":"#000","5533":"#000","5541":"#000","5542":"#000","5750":"#000"},"icons":["/icons/aloes/height.svg","/icons/aloes/height.png","/icons/aloes/height-white.png"]},{"name":"Multiple Axis Joystick","value":3345,"resources":{"5500":"#000","5501":"#000","5702":"#cc3333","5703":"#97ef87","5704":"#8797ef","5750":"#000"},"icons":["/icons/aloes/joystick.svg","/icons/aloes/joystick.png","/icons/aloes/joystick-white.png"]},{"name":"Rate","value":3346,"resources":{"5601":"#5ae2e2","5602":"#ff3535","5603":"#5ae2e2","5604":"#ff3535","5605":"#000","5700":"#000","5701":"#000","5750":"#000","5821":"#434b77"},"icons":["/icons/aloes/frequency.svg","/icons/aloes/frequency.png","/icons/aloes/frequency-white.png"]},{"name":"Push Button","value":3347,"resources":{"5500":"#000","5501":"#000","5750":"#000"},"icons":["/icons/aloes/push-button.svg","/icons/aloes/push-button.png","/icons/aloes/push-button-white.png"]},{"name":"Multistate Selector","value":3348,"resources":{"5547":"#000","5750":"#000"},"icons":["/icons/aloes/loudness.svg","/icons/aloes/loudness.png","/icons/aloes/loudness-white.png"]},{"name":"Bitmap","value":3349,"resources":{"5750":"#000","5910":"#000","5911":"#000","5912":"#000"},"icons":["/icons/aloes/dither.svg","/icons/aloes/dither.png","/icons/aloes/dither-white.png"]},{"name":"Stopwatch","value":3350,"resources":{"5501":"#000","5544":"#434B77","5750":"#000","5850":"#000"},"icons":["/icons/aloes/time.svg","/icons/aloes/agenda.svg","/icons/aloes/time.png","/icons/aloes/time-white.png","/icons/aloes/agenda.png","/icons/aloes/agenda-white.png"]},{"name":"powerupLog","value":3351,"resources":{"1":"#000","2":"#000","3":"#000","4":"#000","10":"#000"},"icons":["/icons/aloes/clock.svg","/icons/aloes/clock.png","/icons/aloes/clock-white.png"]},{"name":"plmnSearchEvent","value":3352,"resources":{"0":"#000","6030":"#000","6031":"#000","6032":"#000"},"icons":["/icons/aloes/clock.png","/icons/aloes/clock-white.png"]},{"name":"scellID","value":3353,"resources":{"2":"#000","6030":"#000","6031":"#000","6033":"#000"},"icons":["/icons/aloes/clock.svg","/icons/aloes/clock.png","/icons/aloes/clock-white.png"]},{"name":"cellReselectionEvent","value":3354,"resources":{"2":"#000","3":"#000","6032":"#000","6033":"#000"},"icons":["/icons/aloes/clock.svg","/icons/aloes/clock.png","/icons/aloes/clock-white.png"]},{"name":"handoverEvent","value":3355,"resources":{"0":"#000","3":"#000","4":"#000","5":"#000","6":"#000","6032":"#000","6033":"#000"},"icons":["/icons/aloes/clock.png","/icons/aloes/clock-white.png"]},{"name":"radioLinkFailureEvent","value":3356,"resources":{"0":"#000","1":"#000"},"icons":["/icons/aloes/clock.png","/icons/aloes/clock-white.png"]},{"name":"rrcStateChangeEvent","value":3357,"resources":{"0":"#000","1":"#000"},"icons":["/icons/aloes/clock.png","/icons/aloes/clock-white.png"]},{"name":"rrcTimerExpiryEvent","value":3358,"resources":{"0":"#000"},"icons":["/icons/aloes/clock.png","/icons/aloes/clock-white.png"]},{"name":"cellBlacklistEvent","value":3359,"resources":{"6032":"#000","6033":"#000"},"icons":["/icons/aloes/clock.png","/icons/aloes/clock-white.png"]}];

/***/ }),

/***/ "4a2d":
/***/ (function(module) {

module.exports = [{"name":"Tool Version","description":"The tool version that the device supports - used to determine the logging object/resource version to be used for parsing ","value":1,"operations":"R","type":"String"},{"name":"IMEI","description":"IMEI of device","value":2,"operations":"R","type":"String"},{"name":"IMSI","description":"IMSI of device","value":3,"operations":"R","type":"String"},{"name":"MSISDN","description":"MSISDN of device","value":4,"operations":"R","type":"String"},{"name":"Device Name","description":"Human-readable name of the device ","value":10,"operations":"R","type":"String"},{"name":"Digital Input State","description":"The current state of a digital input.","value":5500,"operations":"R","type":"Boolean"},{"name":"Digital Input Counter","description":"The cumulative value of active state detected.","value":5501,"operations":"R","type":"Integer"},{"name":"Digital Input Polarity","description":"The polarity of the digital input as a Boolean (0 = Normal, 1= Reversed).","value":5502,"operations":"R,W","type":"Boolean"},{"name":"Digital Input Debounce","description":"The debounce period in ms.","value":5503,"operations":"R,W","type":"Integer","unit":"ms"},{"name":"Digital Input Edge Selection","description":"The edge selection as an integer (1 = Falling edge, 2 = Rising edge, 3 = Both Rising and Falling edge).","value":5504,"operations":"R,W","type":"Integer","range":[1,3]},{"name":"Digital Input Counter Reset","description":"Reset the Counter value.","value":5505,"operations":"E","type":null},{"name":"Current Time","description":"Unix Time. A signed integer representing the number of seconds since Jan 1st, 1970 in the UTC time zone.","value":5506,"operations":"R,W","type":"Time","unit":"s","range":[0,1]},{"name":"Fractional Time","description":"For shorter times of a fraction of a second (i.e. 0.23).","value":5507,"operations":"R,W","type":"Float","unit":"seconds","range":[0,1]},{"name":"Min X Value","description":"The minimum measured value along the X axis.","value":5508,"operations":"R","type":"Float"},{"name":"Max X Value","description":"The maximum measured value along the X axis.","value":5509,"operations":"R","type":"Float"},{"name":"Min Y Value","description":"The minimum measured value along the Y axis.","value":5510,"operations":"R","type":"Float"},{"name":"Max Y Value","description":"The maximum measured value along the Y axis.","value":5511,"operations":"R","type":"Float"},{"name":"Min Z Value","description":"The minimum measured value along the Z axis.","value":5512,"operations":"R","type":"Float"},{"name":"Max Z Value","description":"The maximum measured value along the Z axis.","value":5513,"operations":"R","type":"Float"},{"name":"Latitude","description":"The decimal notation of latitude, e.g. -43.5723 (World Geodetic System 1984).","value":5514,"operations":"R","type":"String"},{"name":"Longitude","description":"The decimal notation of longitude, e.g. 153.21760 (World Geodetic System 1984).","value":5515,"operations":"R","type":"String"},{"name":"Uncertainty","description":"The accuracy of the position in meters.","value":5516,"operations":"R","type":"String"},{"name":"Velocity","description":"The velocity of the device as defined in 3GPP 23.032 GAD specification. This set of values may not be available if the device is static.","value":5517,"operations":"R","type":"Opaque"},{"name":"Timestamp","description":"The timestamp of when the location measurement was performed.","value":5518,"operations":"R","type":"Time"},{"name":"Min Limit","description":"The minimum value that can be measured by the sensor.","value":5519,"operations":"R","type":"Float"},{"name":"Max Limit","description":"The maximum value that can be measured by the sensor.","value":5520,"operations":"R","type":"Float"},{"name":"Delay Duration","description":"The duration of the time delay.","value":5521,"operations":"R,W","type":"Float","unit":"s"},{"name":"Clip","description":"Audio Clip that is playable (i.e. short audio recording indicating the floor in an elevator).","value":5522,"operations":"R,W","type":"Opaque"},{"name":"Trigger","description":"Trigger initiating actuation.","value":5523,"operations":"E","type":null},{"name":"Duration","description":"The duration of the sound once trigger.","value":5524,"operations":"R,W","type":"Float","unit":"s"},{"name":"Minimum Off-time","description":"The off time when On/Off control remains on.","value":5525,"operations":"R,W","type":"Float","unit":"s"},{"name":"Mode","description":"type of timer pattern used by the patterns.","value":5526,"operations":"R,W","type":"Integer","range":[0,4]},{"name":"Text","description":"A string of text.","value":5527,"operations":"R,W","type":"String"},{"name":"X Coordinate","description":"X Coordinate.","value":5528,"operations":"R,W","type":"Integer"},{"name":"Y Coordinate","description":"Y Coordinate.","value":5529,"operations":"R,W","type":"Integer"},{"name":"Clear Display","description":"Command to clear the display.","value":5530,"operations":"E","type":null},{"name":"Contrast","description":"Proportional control, integer value between 0 and 100 as a percentage.","value":5531,"operations":"R,W","type":"Float","unit":"%","range":[0,100]},{"name":"Increase Input State","description":"Indicates an increase control action.","value":5532,"operations":"R","type":"Boolean"},{"name":"Decrease Input State","description":"Indicates an decrease control action.","value":5533,"operations":"R","type":"Boolean"},{"name":"Counter","description":"Counts the number of times the timer output transitions from 0 to 1.","value":5534,"operations":"R,W","type":"Integer"},{"name":"Current Position","description":"Current position or desired position of a positioner actuator.","value":5536,"operations":"R,W","type":"Float","unit":"%","range":[0,100]},{"name":"Transition Time","description":"The time expected to move the actuator to the new position.","value":5537,"operations":"R,W","type":"Float","unit":"s"},{"name":"Remaining Time","description":"The time remaining in an operation.","value":5538,"operations":"R","type":"Float","unit":"s"},{"name":"Up Counter","description":"Counts the number of times the increase control has been operated. Writing a 0 resets the counter.","value":5541,"operations":"R,W","type":"Integer"},{"name":"Down Counter","description":"Counts the times the decrease control has been operated. Writing a 0 resets the counter","value":5542,"operations":"R,W","type":"Integer"},{"name":"Digital State","description":"The current state of the timer output.","value":5543,"operations":"R","type":"Boolean"},{"name":"Cumulative Time","description":"The total time in seconds that the timer input is true. Writing a 0 resets the time.","value":5544,"operations":"R,W","type":"Float"},{"name":"Max X Coordinate","description":"The highest X coordinate the display supports before wrapping to the next line.","value":5545,"operations":"R","type":"Integer"},{"name":"Max Y Coordinate","description":"The highest Y coordinate the display supports before wrapping to the next line.","value":5546,"operations":"R","type":"Integer"},{"name":"Multi-state Input","description":"The current state of a Multi-state input or selector.","value":5547,"operations":"R","type":"Integer"},{"name":"Level","description":"Input/output level control, float value between 0 and 100 as a percentage.","value":5548,"operations":"R,W","type":"Float","unit":"%","range":[0,100]},{"name":"Digital Output State","description":"The current state of a digital output,  0=OFF, 1=ON..","value":5550,"operations":"R,W","type":"Boolean"},{"name":"Digital Output Polarity","description":"The polarity of a digital ouput as a Boolean (0 = Normal, 1= Reversed).","value":5551,"operations":"R,W","type":"Boolean"},{"name":"Analog Input State","description":"The current value of the analog input.","value":5600,"operations":"R","type":"Float"},{"name":"Min Measured Value","description":"The minimum value that can be measured by the sensor","value":5601,"operations":"R","type":"Float"},{"name":"Max Measured Value","description":"The maximum value that can be measured by the sensor.","value":5602,"operations":"R","type":"Float"},{"name":"Min Range Value","description":"The minimum value that can be measured by the sensor.","value":5603,"operations":"R","type":"Float"},{"name":"Max Range Value","description":"The maximum value that can be measured by the sensor.","value":5604,"operations":"R","type":"Float"},{"name":"Reset Min and Max Measured Values","description":"Reset the Min and Max Measured Values to Current Value.","value":5605,"operations":"E","type":null},{"name":"Analog Output Current Value","description":"The current state of the analogue output.","value":5650,"operations":"R,W","type":"Float"},{"name":"Sensor Value","description":"Last or Current Measured Value from the Sensor.","value":5700,"operations":"R","type":"Float"},{"name":"Sensor Units","description":"If present, the type of sensor defined as the UCUM Unit Definition e.g. “Cel” for Temperature in Celcius.","value":5701,"operations":"R","type":"String"},{"name":"X Value","description":"The measured value along the X axis.","value":5702,"operations":"R","type":"Float"},{"name":"Y Value","description":"The measured value along the Y axis.","value":5703,"operations":"R","type":"Float"},{"name":"Z Value","description":"The measured value along the Z axis.","value":5704,"operations":"R","type":"Float"},{"name":"Compass Direction","description":"The compass direction.","value":5705,"operations":"R","type":"Float","unit":"deg","range":[0,360]},{"name":"Colour","description":"A string representing a value in some color space","value":5706,"operations":"R,W","type":"String"},{"name":"Application type","description":"The application type of the sensor or actuator as a string, for instance, “Air Pressure”.","value":5750,"operations":"R,W","type":"String"},{"name":"Sensor type","description":"The type of the sensor (for instance PIR type).","value":5751,"operations":"R","type":"String"},{"name":"Instantaneous active power","description":"The current active power.","value":5800,"operations":"R","type":"Float","unit":"W"},{"name":"Min Measured active power","description":"The minimum active power measured by the sensor since it is ON.","value":5801,"operations":"R","type":"Float","unit":"W"},{"name":"Max Measured active power","description":"The maximum active power measured by the sensor since it is ON.","value":5802,"operations":"R","type":"Float"},{"name":"Min Range active power","description":"The minimum active power that can be measured by the sensor.","value":5803,"operations":"R","type":"Float","unit":"W"},{"name":"Max Range active power","description":"The maximum active power that can be measured by the sensor.","value":5804,"operations":"R","type":"Float","unit":"W"},{"name":"Cumulative active power","description":"The total power in Wh that the light has used.","value":5805,"operations":"R","type":"Float","unit":"Wh"},{"name":"Active Power Calibration","description":"Request an active power calibration by writing the value of a calibrated load.","value":5806,"operations":"W","type":"Float","unit":"W"},{"name":"Instantaneous reactive power","description":"The current reactive power.","value":5810,"operations":"R","type":"Float","unit":"VAR"},{"name":"Min Measured reactive power","description":"The minimum reactive power measured by the sensor since it is ON.","value":5811,"operations":"R","type":"Float","unit":"VAR"},{"name":"Max Measured reactive power","description":"The maximum reactive power measured by the sensor since it is ON.","value":5812,"operations":"R","type":"Float","unit":"VAR"},{"name":"Min Range reactive power","description":"The minimum active power that can be measured by the sensor.","value":5813,"operations":"R","type":"Float","unit":"VAR"},{"name":"Max Range reactive power","description":"The minimum active power that can be measured by the sensor.","value":5814,"operations":"R","type":"Float","unit":"VAR"},{"name":"Cumulative reactive power","description":"The cumulative reactive power since the last cumulative energy reset or device start.","value":5815,"operations":"R","type":"Float","unit":"VARh"},{"name":"Reactive Power Calibration","description":"Request a reactive power calibration by writing the value of a calibrated load.","value":5816,"operations":"W","type":"Float","unit":"VAR"},{"name":"Power Factor","description":"The power factor of the actuactor.","value":5820,"operations":"R","type":"Float"},{"name":"Current Calibration","description":"Read or Write the current calibration coefficient.","value":5821,"operations":"R,W","type":"Float"},{"name":"Reset Cumulative energy","description":"Reset both cumulative active/reactive power.","value":5822,"operations":"E","type":null},{"name":"Event Identifier","description":"The event identifier as a string.","value":5823,"operations":"R,W","type":"String"},{"name":"Start Time","description":"Time when the load control event will start started.","value":5824,"operations":"R,W","type":"Float"},{"name":"Duration In Min","description":"The duration of the load control event.","value":5825,"operations":"R,W","type":"Float","unit":"min"},{"name":"Criticality Level","description":"The criticality of the event.  The device receiving the event will react in an appropriate fashion for the device.","value":5826,"operations":"R,W","type":"Integer"},{"name":"Avg Load Adj Pct","description":"Defines the maximum energy usage of the receivng device, as a percentage of the device's normal maximum energy usage.","value":5827,"operations":"R,W","type":"String","unit":"%","range":[0,100]},{"name":"Duty Cycle","description":"Defines the duty cycle for the load control event, i.e, what percentage of time the receiving device is allowed to be on.","value":5828,"operations":"R,W","type":"Integer","unit":"%","range":[0,100]},{"name":"On/Off","description":"This resource represents a power source, which can be controlled, the setting of which is a Boolean value (1,0) where 1 is on and 0 is off","value":5850,"operations":"R,W","type":"Boolean"},{"name":"Dimmer","description":"This resource represents dimmer setting, which has an Integer value between 0 and 100 as a percentage.","value":5851,"operations":"R,W","type":"Integer","Units":"%","range":[0,100]},{"name":"On Time","description":"The time in seconds that the device has been on. Writing a value of 0 resets the counter.","value":5852,"operations":"R,W","type":"Integer","Units":"s"},{"name":"Multi-state Output","description":"A string describing a state for multiple level output such as Pilot Wire.","value":5853,"operations":"R,W","type":"String"},{"name":"Off Time","description":"The time in seconds since the Off command was sent. Writing a value of 0 resets the counter.","value":5854,"operations":"R,W","type":"Integer","Units":"s"},{"name":"Set Point Value","description":"The setpoint value.","value":5900,"operations":"R,W","type":"Float"},{"name":"Busy to Clear delay","description":"Delay from the detection state to the clear state in ms.","value":5903,"operations":"R,W","type":"Integer"},{"name":"Clear to Busy delay","description":"Delay from the clear state to the busy state in ms.","value":5904,"operations":"R,W","type":"Integer"},{"name":"Bitmap Input","description":"Integer in which each of the bits are associated with specific digital input value. Represented as a binary signed integer in network byte order, and in two's complement representation. Using values in range 0-127 is recommended to avoid ambiguities with byte order and negative values.","value":5910,"operations":"R","type":"Integer"},{"name":"Bitmap Input Reset","description":"Reset the Bitmap Input value.","value":5911,"operations":"E","type":null},{"name":"Element Description","description":"The description of each bit as a string. First instance describes the least significant bit, second instance the second least significant bit.","value":5912,"operations":"R,W","type":"String"},{"name":"UUID","description":"","value":5913,"operations":"R,W","type":"String"},{"name":"plmnID","description":"PLMN - mcc/mnc","value":6030,"operations":"R","type":"Integer"},{"name":"BandIndicator","description":"Band indicator","value":6031,"operations":"R","type":"Integer"},{"name":"dlEarfcn","description":"EARFCN - frequency","value":6032,"operations":"R","type":"Integer"},{"name":"CellID","description":"Cell Identity","value":6033,"operations":"R","type":"Integer"},{"name":"pci","description":"PCI (0..504)","value":6034,"operations":"R","type":"Integer"},{"name":"rsrp","description":"RSRP Value in dBm (-180..-30)","value":6035,"operations":"R","type":"Integer"},{"name":"rsrq","description":"RSRQ Value in dB (-30..10)","value":6036,"operations":"R","type":"Integer"},{"name":"sysFrameNumber","description":"System Frame Number","value":6037,"operations":"R","type":"Integer"},{"name":"subFrameNumber","description":"Sub Frame Number","value":6038,"operations":"R","type":"Integer"}];

/***/ }),

/***/ "4a59":
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__("9b43");
var call = __webpack_require__("1fa8");
var isArrayIter = __webpack_require__("33a4");
var anObject = __webpack_require__("cb7c");
var toLength = __webpack_require__("9def");
var getIterFn = __webpack_require__("27ee");
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),

/***/ "4bf8":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "520a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var regexpFlags = __webpack_require__("0bfb");

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var LAST_INDEX = 'lastIndex';

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/,
      re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      // eslint-disable-next-line no-loop-func
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ "52a7":
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "551c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("2d00");
var global = __webpack_require__("7726");
var ctx = __webpack_require__("9b43");
var classof = __webpack_require__("23c6");
var $export = __webpack_require__("5ca1");
var isObject = __webpack_require__("d3f4");
var aFunction = __webpack_require__("d8e8");
var anInstance = __webpack_require__("f605");
var forOf = __webpack_require__("4a59");
var speciesConstructor = __webpack_require__("ebd6");
var task = __webpack_require__("1991").set;
var microtask = __webpack_require__("8079")();
var newPromiseCapabilityModule = __webpack_require__("a5b8");
var perform = __webpack_require__("9c80");
var userAgent = __webpack_require__("a25f");
var promiseResolve = __webpack_require__("bcaa");
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__("2b4c")('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__("dcbc")($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__("7f20")($Promise, PROMISE);
__webpack_require__("7a56")(PROMISE);
Wrapper = __webpack_require__("8378")[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__("5cc5")(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),

/***/ "5537":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("8378");
var global = __webpack_require__("7726");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("2d00") ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "5bc6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var SEPARATOR = "/";
var SINGLE = "+";
var ALL = "#";

module.exports = {
	matches: matches,
	extract: extract,
	exec: exec,
	fill: fill,
	clean: clean
};

function exec(pattern, topic) {
	return matches(pattern, topic) ? extract(pattern, topic) : null;
}

function matches(pattern, topic) {
	var patternSegments = pattern.split(SEPARATOR);
	var topicSegments = topic.split(SEPARATOR);

	var patternLength = patternSegments.length;
	var topicLength = topicSegments.length;
	var lastIndex = patternLength - 1;

	for(var i = 0; i < patternLength; i++){
		var currentPattern = patternSegments[i];
		var patternChar = currentPattern[0];
		var currentTopic = topicSegments[i];

		if(!currentTopic && !currentPattern)
			continue;

		if(!currentTopic && currentPattern !== ALL) return false;

		// Only allow # at end
		if(patternChar === ALL)
			return i === lastIndex;
		if(patternChar !== SINGLE && currentPattern !== currentTopic)
			return false;
	}

	return patternLength === topicLength;
}

function fill(pattern, params){
	var patternSegments = pattern.split(SEPARATOR);
	var patternLength = patternSegments.length;

	var result = [];

	for (var i = 0; i < patternLength; i++) {
		var currentPattern = patternSegments[i];
		var patternChar = currentPattern[0];
		var patternParam = currentPattern.slice(1);
		var paramValue = params[patternParam];

		if(patternChar === ALL){
			// Check that it isn't undefined
			if(paramValue !== void 0)
				result.push([].concat(paramValue).join(SEPARATOR)); // Ensure it's an array

			// Since # wildcards are always at the end, break out of the loop
			break;
		} else if (patternChar === SINGLE)
			// Coerce param into a string, missing params will be undefined
			result.push("" + paramValue);
		else result.push(currentPattern);
	}

	return result.join(SEPARATOR);
}


function extract(pattern, topic) {
	var params = {};
	var patternSegments = pattern.split(SEPARATOR);
	var topicSegments = topic.split(SEPARATOR);

	var patternLength = patternSegments.length;

	for(var i = 0; i < patternLength; i++){
		var currentPattern = patternSegments[i];
		var patternChar = currentPattern[0];

		if(currentPattern.length === 1)
			continue;

		if(patternChar === ALL){
			params[currentPattern.slice(1)] = topicSegments.slice(i);
			break;
		} else if(patternChar === SINGLE){
			params[currentPattern.slice(1)] = topicSegments[i];
		}
	}

	return params;
}


function clean(pattern) {
	var patternSegments = pattern.split(SEPARATOR);
	var patternLength = patternSegments.length;

	var cleanedSegments = [];

	for(var i = 0; i < patternLength; i++){
		var currentPattern = patternSegments[i];
		var patternChar = currentPattern[0];

		if(patternChar === ALL){
			cleanedSegments.push(ALL);
		} else if(patternChar === SINGLE){
			cleanedSegments.push(SINGLE);
		} else {
			cleanedSegments.push(currentPattern);
		}
	}

	return cleanedSegments.join('/');
}


/***/ }),

/***/ "5ca1":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var core = __webpack_require__("8378");
var hide = __webpack_require__("32e9");
var redefine = __webpack_require__("2aba");
var ctx = __webpack_require__("9b43");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "5cc5":
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__("2b4c")('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),

/***/ "5dbc":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var setPrototypeOf = __webpack_require__("8b97").set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),

/***/ "5eda":
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__("5ca1");
var core = __webpack_require__("8378");
var fails = __webpack_require__("79e5");
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),

/***/ "5f1b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classof = __webpack_require__("23c6");
var builtinExec = RegExp.prototype.exec;

 // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw new TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }
  if (classof(R) !== 'RegExp') {
    throw new TypeError('RegExp#exec called on incompatible receiver');
  }
  return builtinExec.call(R, S);
};


/***/ }),

/***/ "613b":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("5537")('keys');
var uid = __webpack_require__("ca5a");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "626a":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("2d95");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "6821":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("626a");
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "69a8":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "6a99":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("d3f4");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "6ac1":
/***/ (function(module) {

module.exports = {"labelsPresentation":[{"Type":"S_DOOR","value":0,"omaObject":3302,"description":"Door and window sensors","ressources":"V_TRIPPED, V_ARMED"},{"Type":"S_MOTION","value":1,"omaObject":3302,"description":"Motion sensors","ressources":"V_TRIPPED, V_ARMED"},{"Type":"S_SMOKE","value":2,"omaObject":3302,"description":"Smoke sensor","ressources":"V_TRIPPED, V_ARMED"},{"Type":"S_BINARY","value":3,"omaObject":3306,"description":"Binary device (on/off)","ressources":"V_STATUS, V_WATT"},{"Type":"S_DIMMER","value":4,"omaObject":3312,"description":"Dimmable device of some kind","ressources":"V_STATUS (on/off), V_PERCENTAGE (dimmer level 0-100), V_WATT"},{"Type":"S_COVER","value":5,"omaObject":3344,"description":"Window covers or shades","ressources":"V_UP, V_DOWN, V_STOP, V_PERCENTAGE"},{"Type":"S_TEMP","value":6,"omaObject":3303,"description":"Temperature sensor","ressources":"V_TEMP, V_ID"},{"Type":"S_HUM","value":7,"omaObject":3304,"description":"Humidity sensor","ressources":"V_HUM"},{"Type":"S_BARO","value":8,"omaObject":3315,"description":"Barometer sensor (Pressure)","ressources":"V_PRESSURE, V_FORECAST"},{"Type":"S_WIND","value":9,"omaObject":3332,"description":"Wind sensor","ressources":"V_WIND, V_GUST, V_DIRECTION"},{"Type":"S_RAIN","value":10,"omaObject":3346,"description":"Rain sensor","ressources":"V_RAIN, V_RAINRATE"},{"Type":"S_UV","value":11,"omaObject":3301,"description":"UV sensor","ressources":"V_UV"},{"Type":"S_WEIGHT","value":12,"omaObject":3322,"description":"Weight sensor for scales etc.","ressources":"V_WEIGHT, V_IMPEDANCE"},{"Type":"S_POWER","value":13,"omaObject":3328,"description":"Power measuring device, like power meters","ressources":"V_WATT, V_KWH, V_VAR, V_VA, V_POWER_FACTOR"},{"Type":"S_HEATER","value":14,"omaObject":3308,"description":"Heater device","ressources":"V_HVAC_SETPOINT_HEAT, V_HVAC_FLOW_STATE, V_TEMP, V_STATUS"},{"Type":"S_DISTANCE","value":15,"omaObject":3330,"description":"Distance sensor","ressources":"V_DISTANCE, V_UNIT_PREFIX"},{"Type":"S_LIGHT_LEVEL","value":16,"omaObject":3301,"description":"Light sensor","ressources":"V_LIGHT_LEVEL (uncalibrated percentage), V_LEVEL (light level in lux)"},{"Type":"S_ARDUINO_NODE","value":17,"omaObject":null,"description":"Arduino node device","ressources":""},{"Type":"S_ARDUINO_REPEATER_NODE","value":18,"omaObject":null,"description":"Arduino repeating node device","ressources":""},{"Type":"S_LOCK","value":19,"omaObject":3342,"description":"Lock device","ressources":"V_LOCK_STATUS"},{"Type":"S_IR","value":20,"omaObject":3349,"description":"Ir sender/receiver device","ressources":"V_IR_SEND, V_IR_RECEIVE, V_IR_RECORD"},{"Type":"S_WATER","value":21,"omaObject":3319,"description":"Water meter","ressources":"V_FLOW, V_VOLUME"},{"Type":"S_AIR_QUALITY","value":22,"omaObject":3346,"description":"Air quality sensor e.g. MQ-2","ressources":"V_LEVEL, V_UNIT_PREFIX"},{"Type":"S_CUSTOM","value":23,"omaObject":3300,"description":"Use this for custom sensors where no other fits.","ressources":""},{"Type":"S_DUST","value":24,"omaObject":3346,"description":"Dust level sensor","ressources":"V_LEVEL, V_UNIT_PREFIX"},{"Type":"S_SCENE_CONTROLLER","value":25,"omaObject":3344,"description":"Scene controller device","ressources":"V_SCENE_ON, V_SCENE_OFF"},{"Type":"S_RGB_LIGHT","value":26,"omaObject":3335,"description":"RGB light","ressources":"V_RGB, V_WATT"},{"Type":"S_RGBW_LIGHT","value":27,"omaObject":3335,"description":"RGBW light (with separate white component)","ressources":"V_RGBW, V_WATT"},{"Type":"S_COLOR_SENSOR","value":28,"omaObject":3335,"description":"Color sensor","ressources":"V_RGB"},{"Type":"S_HVAC","value":29,"omaObject":3308,"description":"Thermostat/HVAC device","ressources":"V_STATUS, V_TEMP, V_HVAC_SETPOINT_HEAT, V_HVAC_SETPOINT_COOL, V_HVAC_FLOW_STATE, V_HVAC_FLOW_MODE, V_HVAC_SPEED"},{"Type":"S_MULTIMETER","value":30,"omaObject":3316,"description":"Multimeter device","ressources":"V_VOLTAGE, V_CURRENT, V_IMPEDANCE"},{"Type":"S_SPRINKLER","value":31,"omaObject":3302,"description":"Sprinkler device","ressources":"V_STATUS (turn on/off), V_TRIPPED (if fire detecting device)"},{"Type":"S_WATER_LEAK","value":32,"omaObject":3302,"description":"Water leak sensor","ressources":"V_TRIPPED, V_ARMED"},{"Type":"S_SOUND","value":33,"omaObject":3324,"description":"Sound sensor","ressources":"V_LEVEL (in dB), V_TRIPPED, V_ARMED"},{"Type":"S_VIBRATION","value":34,"omaObject":3318,"description":"Vibration sensor","ressources":"V_LEVEL (vibration in Hz), V_TRIPPED, V_ARMED"},{"Type":"S_MOISTURE","value":35,"omaObject":3302,"description":"Moisture sensor","ressources":"V_LEVEL (water content or moisture in percentage?), V_TRIPPED, V_ARMED"},{"Type":"S_INFO","value":36,"omaObject":3341,"description":"LCD text device","ressources":"V_TEXT"},{"Type":"S_GAS","value":37,"omaObject":3346,"description":"Gas meter","ressources":"V_FLOW, V_VOLUME"},{"Type":"S_GPS","value":38,"omaObject":3336,"description":"GPS Sensor","ressources":"V_POSITION"},{"Type":"S_WATER_QUALITY","value":39,"omaObject":3346,"description":"Water quality sensor","ressources":"V_TEMP, V_PH, V_ORP, V_EC, V_STATUS"}],"labelsSet":[{"Type":"V_TEMP","value":0,"omaResources":{"5700":0,"5701":"°C"},"Unit":"°C","description":"Temperature","sensorTypes":"S_TEMP, S_HEATER, S_HVAC, S_WATER_QUALITY"},{"Type":"V_HUM","value":1,"omaResources":{"5700":0,"5701":"%"},"Unit":"%","description":"Humidity","sensorTypes":"S_HUM"},{"Type":"V_STATUS","value":2,"omaResources":{"5701":"%","5850":0},"Unit":null,"description":"Binary status. 0=off 1=on","sensorTypes":"S_BINARY, S_DIMMER, S_SPRINKLER, S_HVAC, S_HEATER, S_WATER_QUALITY"},{"Type":"V_PERCENTAGE","value":3,"omaResources":{"5701":"%","5851":0},"Unit":"%","description":"Percentage value. 0-100 (%)","sensorTypes":"S_DIMMER, S_COVER"},{"Type":"V_PRESSURE","value":4,"omaResources":{"5700":0,"5701":"Pa"},"Unit":"Pa","description":"Atmospheric Pressure","sensorTypes":"S_BARO"},{"Type":"V_FORECAST","value":5,"omaResources":{"5700":0,"5701":"%"},"Unit":null,"description":"Whether forecast. One of \"stable\", \"sunny\", \"cloudy\", \"unstable\", \"thunderstorm\" or \"unknown","sensorTypes":"S_BARO"},{"Type":"V_RAIN","value":6,"omaResources":{"5700":0,"5701":"mm"},"Unit":"mm","description":"Amount of rain","sensorTypes":"S_RAIN"},{"Type":"V_RAINRATE","value":7,"omaResources":{"5700":0,"5701":"mm/d"},"Unit":"mm/d","description":"Rate of rain","sensorTypes":"S_RAIN"},{"Type":"V_WIND","value":8,"omaResources":{"5517":0},"Unit":null,"description":"Windspeed","sensorTypes":"S_WIND"},{"Type":"V_GUST","value":9,"omaResources":{"5705":0},"Unit":null,"description":"Gust","sensorTypes":"S_WIND"},{"Type":"V_DIRECTION","value":10,"omaResources":{"5705":0},"Unit":null,"description":"Wind direction 0-360 (degrees)","sensorTypes":"S_WIND"},{"Type":"V_UV","value":11,"omaResources":{"5700":0,"5701":"%"},"Unit":null,"description":"UV light level","sensorTypes":"S_UV"},{"Type":"V_WEIGHT","value":12,"omaResources":{"5700":0,"5701":"kg"},"Unit":"kg","description":"Weight (for scales etc)","sensorTypes":"S_WEIGHT"},{"Type":"V_DISTANCE","value":13,"omaResources":{"5700":0,"5701":"m"},"Unit":"m","description":"Distance","sensorTypes":"S_DISTANCE"},{"Type":"V_IMPEDANCE","value":14,"omaResources":{"5700":0,"5701":"%"},"Unit":null,"description":"Impedance value","sensorTypes":"S_MULTIMETER, S_WEIGHT"},{"Type":"V_ARMED","value":15,"omaResources":{"5500":0},"Unit":null,"description":"Armed status of a security sensor. 1=Armed, 0=Bypassed","sensorTypes":"S_DOOR, S_MOTION, S_SMOKE, S_SPRINKLER, S_WATER_LEAK, S_SOUND, S_VIBRATION, S_MOISTURE"},{"Type":"V_TRIPPED","value":16,"omaResources":{"5500":0},"Unit":null,"description":"Tripped status of a security sensor. 1=Tripped, 0=Untripped","sensorTypes":"S_DOOR, S_MOTION, S_SMOKE, S_SPRINKLER, S_WATER_LEAK, S_SOUND, S_VIBRATION, S_MOISTURE"},{"Type":"V_WATT","value":17,"omaResources":{"5700":0,"5701":"W"},"Unit":"W","description":"Watt value for power meters","sensorTypes":"S_POWER, S_BINARY, S_DIMMER, S_RGB_LIGHT, S_RGBW_LIGHT"},{"Type":"V_KWH","value":18,"omaResources":{"5700":0,"5701":"kWh"},"Unit":"kWh","description":"Accumulated number of KWH for a power meter","sensorTypes":"S_POWER"},{"Type":"V_SCENE_ON","value":19,"omaResources":{"5532":"up"},"Unit":null,"description":"Turn on a scene","sensorTypes":"S_SCENE_CONTROLLER"},{"Type":"V_SCENE_OFF","value":20,"omaResources":{"5533":"down"},"Unit":null,"description":"Turn of a scene","sensorTypes":"S_SCENE_CONTROLLER"},{"Type":"V_HVAC_FLOW_STATE","value":21,"omaResources":{"5900":"Off"},"Unit":null,"description":"Mode of header - One of \"Off\", \"HeatOn\", \"CoolOn\", or \"AutoChangeOver","sensorTypes":"S_HVAC, S_HEATER"},{"Type":"V_HVAC_SPEED","value":22,"omaResources":{"5900":"Min"},"Unit":null,"description":"HVAC/Heater fan speed (\"Min\", \"Normal\", \"Max\", \"Auto\")","sensorTypes":"S_HVAC, S_HEATER"},{"Type":"V_LIGHT_LEVEL","value":23,"omaResources":{"5700":0,"5701":"%"},"Unit":null,"description":"Uncalibrated light level 0-100% ( Use V_LEVEL for light level in lux.)","sensorTypes":"S_LIGHT_LEVEL"},{"Type":"V_VAR1","value":24,"omaResources":{"5700":0,"5701":"%"},"Unit":null,"description":"Custom value","sensorTypes":"Any device"},{"Type":"V_VAR2","value":25,"omaResources":{"5700":0,"5701":"%"},"Unit":null,"description":"Custom value","sensorTypes":"Any device"},{"Type":"V_VAR3","value":26,"omaResources":{"5700":0,"5701":"%"},"Unit":null,"description":"Custom value","sensorTypes":"Any device"},{"Type":"V_VAR4","value":27,"omaResources":{"5700":0,"5701":"%"},"Unit":null,"description":"Custom value","sensorTypes":"Any device"},{"Type":"V_VAR5","value":28,"omaResources":{"5700":0,"5701":"%"},"Unit":null,"description":"Custom value","sensorTypes":"Any device"},{"Type":"V_UP","value":29,"omaResources":{"5532":"up"},"Unit":null,"description":"Window covering. Up.","sensorTypes":"S_COVER"},{"Type":"V_DOWN","value":30,"omaResources":{"5533":"down"},"Unit":null,"description":"Window covering. Down.","sensorTypes":"S_COVER"},{"Type":"V_STOP","value":31,"omaResources":{"5823":"stop"},"Unit":null,"description":"Window covering. Stop.","sensorTypes":"S_COVER"},{"Type":"V_IR_SEND","value":32,"omaResources":{"5910":0},"Unit":null,"description":"Send out an IR-command","sensorTypes":"S_IR"},{"Type":"V_IR_RECEIVE","value":33,"omaResources":{"5910":0},"Unit":null,"description":"This message contains a received IR-command","sensorTypes":"S_IR"},{"Type":"V_FLOW","value":34,"omaResources":{"5700":0,"5701":"m"},"Unit":"m","description":"Flow of water (in meter)","sensorTypes":"S_WATER"},{"Type":"V_VOLUME","value":35,"omaResources":{"5700":0,"5701":"%"},"Unit":null,"description":"Water volume","sensorTypes":"S_WATER"},{"Type":"V_LOCK_STATUS","value":36,"omaResources":{"5500":0},"Unit":null,"description":"Set or get lock status. 1=Locked, 0=Unlocked","sensorTypes":"S_LOCK"},{"Type":"V_LEVEL","value":37,"omaResources":{"5700":0,"5701":"%"},"Unit":null,"description":"Used for sending level-value","sensorTypes":"S_DUST, S_AIR_QUALITY, S_SOUND (dB), S_VIBRATION (hz), S_LIGHT_LEVEL (lux)"},{"Type":"V_VOLTAGE","value":38,"omaResources":{"5700":0,"5701":"V"},"Unit":"V","description":"Voltage level","sensorTypes":"S_MULTIMETER"},{"Type":"V_CURRENT","value":39,"omaResources":{"5700":0,"5701":"mA"},"Unit":null,"description":"Current level","sensorTypes":"S_MULTIMETER"},{"Type":"V_RGB","value":40,"omaResources":{"5706":"\"ff0000\""},"Unit":null,"description":"RGB value transmitted as ASCII hex string (I.e \"ff0000\" for red)","sensorTypes":"S_RGB_LIGHT, S_COLOR_SENSOR"},{"Type":"V_RGBW","value":41,"omaResources":{"5706":"\"ff0000\""},"Unit":null,"description":"RGBW value transmitted as ASCII hex string (I.e \"ff0000ff\" for red + full white)","sensorTypes":"S_RGBW_LIGHT"},{"Type":"V_ID","value":42,"omaResources":{"5700":0},"Unit":null,"description":"Optional unique sensor id (e.g. OneWire DS1820b ids)","sensorTypes":"S_TEMP"},{"Type":"V_UNIT_PREFIX","value":43,"omaResources":{"5701":""},"Unit":null,"description":"Allows sensors to send in a string representing the unit prefix to be displayed in GUI. This is not parsed by controller! E.g. cm, m, km, inch.","sensorTypes":"S_DISTANCE, S_DUST, S_AIR_QUALITY"},{"Type":"V_HVAC_SETPOINT_COOL","value":44,"omaResources":{"5900":"Off"},"Unit":null,"description":"HVAC cold setpoint","sensorTypes":"S_HVAC"},{"Type":"V_HVAC_SETPOINT_HEAT","value":45,"omaResources":{"5900":"Off"},"Unit":null,"description":"HVAC/Heater setpoint","sensorTypes":"S_HVAC, S_HEATER"},{"Type":"V_HVAC_FLOW_MODE","value":46,"omaResources":{"5900":"Auto"},"Unit":null,"description":"Flow mode for HVAC (\"Auto\", \"ContinuousOn\", \"PeriodicOn\")","sensorTypes":"S_HVAC"},{"Type":"V_TEXT","value":47,"omaResources":{"5527":"Auto"},"Unit":null,"description":"Text message to display on LCD or controller device","sensorTypes":"S_INFO"},{"Type":"V_CUSTOM","value":48,"omaResources":{"5700":0,"5701":""},"Unit":null,"description":"Custom messages used for controller/inter node specific commands, preferably using S_CUSTOM device type.","sensorTypes":"S_CUSTOM"},{"Type":"V_POSITION","value":49,"omaResources":{"5514":"55.722526","5515":"13.017972;18","5700":0},"Unit":null,"description":"GPS position and altitude. Payload: latitude;longitude;altitude(m). E.g. \"55.722526;13.017972;18","sensorTypes":"S_GPS"},{"Type":"V_IR_RECORD","value":50,"omaResources":{"5910":0},"Unit":null,"description":"Record IR codes S_IR for playback","sensorTypes":"S_IR"},{"Type":"V_PH","value":51,"omaResources":{"5700":0,"5701":"%"},"Unit":null,"description":"Water PH","sensorTypes":"S_WATER_QUALITY"},{"Type":"V_ORP","value":52,"omaResources":{"5700":0,"5701":"mV"},"Unit":"mV","description":"Water ORP : redox potential in mV","sensorTypes":"S_WATER_QUALITY"},{"Type":"V_EC","value":53,"omaResources":{"5700":0,"5701":"ms/cm"},"Unit":"ms/cm","description":"Water electric conductivity %u03BCS/cm (microSiemens/cm)","sensorTypes":"S_WATER_QUALITY"},{"Type":"V_VAR","value":54,"omaResources":{"5700":0,"5701":"VAR"},"Unit":null,"description":"Reactive power: volt-ampere reactive (var)","sensorTypes":"S_POWER"},{"Type":"V_VA","value":55,"omaResources":{"5700":0,"5701":"VA"},"Unit":"VA","description":"Apparent power: volt-ampere (VA)","sensorTypes":"S_POWER"},{"Type":"V_POWER_FACTOR","value":56,"omaResources":{"5700":0},"Unit":null,"description":"Ratio of real power to apparent power: floating point value in the range [-1,..,1]","sensorTypes":"S_POWER"}],"labelsInternal":[{"Type":"I_BATTERY_LEVEL","value":0,"description":"Use this to report the battery level (in percent 0-100)."},{"Type":"I_TIME","value":1,"description":"Sensors can request the current time from the Controller using this message. The time will be reported as the seconds since 1970"},{"Type":"I_VERSION","value":2,"description":"Used to request gateway version from controller."},{"Type":"I_ID_REQUEST","value":3,"description":"Use this to request a unique node id from the controller."},{"Type":"I_ID_RESPONSE","value":4,"description":"Id response back to node. Payload contains node id."},{"Type":"I_INCLUSION_MODE","value":5,"description":"Start/stop inclusion mode of the Controller (1=start, 0=stop)."},{"Type":"I_CONFIG","value":6,"description":"Config request from node. Reply with (M)etric or (I)mperal back to sensor."},{"Type":"I_FIND_PARENT","value":7,"description":"When a sensor starts up, it broadcast a search request to all neighbor nodes. They reply with a I_FIND_PARENT_RESPONSE."},{"Type":"I_FIND_PARENT_RESPONSE","value":8,"description":"Reply message type to I_FIND_PARENT request."},{"Type":"I_LOG_MESSAGE","value":9,"description":"Sent by the gateway to the Controller to trace-log a message"},{"Type":"I_CHILDREN","value":10,"description":"A message that can be used to transfer child sensors (from EEPROM routing table) of a repeating node."},{"Type":"I_SKETCH_NAME","value":11,"description":"Optional sketch name that can be used to identify sensor in the Controller GUI"},{"Type":"I_SKETCH_VERSION","value":12,"description":"Optional sketch version that can be reported to keep track of the version of sensor in the Controller GUI."},{"Type":"I_REBOOT","value":13,"description":"Used by OTA firmware updates. Request for node to reboot."},{"Type":"I_GATEWAY_READY","value":14,"description":"Send by gateway to controller when startup is complete."},{"Type":"I_SIGNING_PRESENTATION","value":15,"description":"Provides signing related preferences (first byte is preference version)."},{"Type":"I_NONCE_REQUEST","value":16,"description":"Used between sensors when requesting nonce."},{"Type":"I_NONCE_RESPONSE","value":17,"description":"Used between sensors for nonce response."},{"Type":"I_HEARTBEAT_REQUEST","value":18,"description":"Heartbeat request"},{"Type":"I_PRESENTATION","value":19,"description":"Presentation message"},{"Type":"I_DISCOVER_REQUEST","value":20,"description":"Discover request"},{"Type":"I_DISCOVER_RESPONSE","value":21,"description":"Discover response"},{"Type":"I_HEARTBEAT_RESPONSE","value":22,"description":"Heartbeat response"},{"Type":"I_LOCKED","value":23,"description":"Node is locked (reason in string-payload)"},{"Type":"I_PING","value":24,"description":"Ping sent to node, payload incremental hop counter"},{"Type":"I_PONG","value":25,"description":"In return to ping, sent back to sender, payload incremental hop counter"},{"Type":"I_REGISTRATION_REQUEST","value":26,"description":"Register request to GW"},{"Type":"I_REGISTRATION_RESPONSE","value":27,"description":"Register response from GW"},{"Type":"I_DEBUG","value":28,"description":"Debug message"}],"labelsCommand":[{"Type":"presentation","value":0,"description":"Sent by a node when they present attached sensors. This is usually done in the presentation() function which runs at startup."},{"Type":"set","value":1,"description":"This message is sent from or to a sensor when a sensor value should be updated."},{"Type":"req","value":2,"description":"Requests a variable value (usually from an actuator destined for controller)."},{"Type":"internal","value":3,"description":"This is a special internal message. See table below for the details."},{"Type":"stream","value":4,"description":"Used for OTA firmware updates"}]};

/***/ }),

/***/ "6b54":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__("3846");
var anObject = __webpack_require__("cb7c");
var $flags = __webpack_require__("0bfb");
var DESCRIPTORS = __webpack_require__("9e1e");
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  __webpack_require__("2aba")(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__("79e5")(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}


/***/ }),

/***/ "7514":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__("5ca1");
var $find = __webpack_require__("0a49")(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__("9c6c")(KEY);


/***/ }),

/***/ "7726":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "77f1":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "79e5":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "7a56":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("7726");
var dP = __webpack_require__("86cc");
var DESCRIPTORS = __webpack_require__("9e1e");
var SPECIES = __webpack_require__("2b4c")('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),

/***/ "7f20":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("86cc").f;
var has = __webpack_require__("69a8");
var TAG = __webpack_require__("2b4c")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "7f7f":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc").f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__("9e1e") && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),

/***/ "8079":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var macrotask = __webpack_require__("1991").set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__("2d95")(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),

/***/ "8378":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "84f2":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "86cc":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("cb7c");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var toPrimitive = __webpack_require__("6a99");
var dP = Object.defineProperty;

exports.f = __webpack_require__("9e1e") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "8b97":
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__("d3f4");
var anObject = __webpack_require__("cb7c");
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__("9b43")(Function.call, __webpack_require__("11e9").f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),

/***/ "9093":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__("ce10");
var hiddenKeys = __webpack_require__("e11e").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "9152":
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "9b43":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("d8e8");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "9c6c":
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__("2b4c")('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__("32e9")(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "9c80":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),

/***/ "9def":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("4588");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "9e1e":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("79e5")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "a25f":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),

/***/ "a481":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__("cb7c");
var toObject = __webpack_require__("4bf8");
var toLength = __webpack_require__("9def");
var toInteger = __webpack_require__("4588");
var advanceStringIndex = __webpack_require__("0390");
var regExpExec = __webpack_require__("5f1b");
var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
__webpack_require__("214f")('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = defined(this);
      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined
        ? fn.call(searchValue, O, replaceValue)
        : $replace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      var res = maybeCallNative($replace, regexp, this, replaceValue);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);
      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;
        results.push(result);
        if (!global) break;
        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

    // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return $replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});


/***/ }),

/***/ "a5b8":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__("d8e8");

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),

/***/ "aa77":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("5ca1");
var defined = __webpack_require__("be13");
var fails = __webpack_require__("79e5");
var spaces = __webpack_require__("fdef");
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),

/***/ "aae3":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__("d3f4");
var cof = __webpack_require__("2d95");
var MATCH = __webpack_require__("2b4c")('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),

/***/ "ac6a":
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__("cadf");
var getKeys = __webpack_require__("0d58");
var redefine = __webpack_require__("2aba");
var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var wks = __webpack_require__("2b4c");
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),

/***/ "b0c5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var regexpExec = __webpack_require__("520a");
__webpack_require__("5ca1")({
  target: 'RegExp',
  proto: true,
  forced: regexpExec !== /./.exec
}, {
  exec: regexpExec
});


/***/ }),

/***/ "b277":
/***/ (function(module) {

module.exports = {"audio":{"name":"SensorAudio","list":[3339],"resources":[5522,5523,5524,548,5750],"colors":{"primaryColor":"#528fa2","secondaryColor":"#ededed","successColor":"#528fa2","warningColor":"#ffc85f","dangerColor":"#f94b39"}},"camera":{"name":"SensorCamera","list":[3349],"resources":[5910,5911,5912,5750],"colors":{"primaryColor":"#528fa2","secondaryColor":"#ededed","successColor":"#528fa2","warningColor":"#ffc85f","dangerColor":"#f94b39"}},"color":{"name":"SensorColor","list":[3335],"resources":[5706,5701,5750],"colors":{"primaryColor":"#528fa2","secondaryColor":"#ededed","successColor":"#528fa2","warningColor":"#ffc85f","dangerColor":"#f94b39"}},"energy":{"name":"SensorEnergy","list":[3331],"resources":[5500,5702,5703,5704],"colors":{"primaryColor":"#528fa2","secondaryColor":"#ededed","successColor":"#528fa2","warningColor":"#ffc85f","dangerColor":"#f94b39"}},"gauge":{"name":"SensorGauge","list":[3202,3203,3300,3301,3302,3303,3304,3305,3315,3316,3317,3318,3319,3320,3321,3322,3323,3324,3325,3326,3327,3328,3329,3330,3346],"resources":[5601,5602,5603,5604,5700,5701,5750],"colors":{"primaryColor":"#528fa2","secondaryColor":"#ededed","successColor":"#528fa2","warningColor":"#ffc85f","dangerColor":"#f94b39"}},"joystick":{"name":"SensorJoystick","list":[3345],"resources":[5500,5501,5750,5702,5703,5704],"colors":{"primaryColor":"#528fa2","secondaryColor":"#ededed","successColor":"#528fa2","warningColor":"#ffc85f","dangerColor":"#f94b39"}},"level":{"name":"SensorLevel","list":[3306,3311,3312],"resources":[5701,5750,5850,5851,5852],"colors":{"primaryColor":"#528fa2","secondaryColor":"#ededed","successColor":"#528fa2","warningColor":"#ffc85f","dangerColor":"#f94b39"}},"magnometer":{"name":"SensorMagnometer","list":[3313,3314],"resources":[5500,5501,5750,5850],"colors":{"primaryColor":"#528fa2","secondaryColor":"#ededed","successColor":"#528fa2","warningColor":"#ffc85f","dangerColor":"#f94b39"}},"map":{"name":"SensorMap","list":[3336],"resources":[5514,5515,5517,5750],"colors":{"primaryColor":"#528fa2","secondaryColor":"#ededed","successColor":"#528fa2","warningColor":"#ffc85f","dangerColor":"#f94b39"}},"switch":{"name":"SensorSwitch","list":[3200,3201,3342],"resources":[5514,5515,5517,5750],"colors":{"primaryColor":"#528fa2","secondaryColor":"#ededed","successColor":"#528fa2","warningColor":"#ffc85f","dangerColor":"#f94b39"}},"text":{"name":"SensorText","list":[3341],"resources":[5527,5528,5529,5530,5531,5545,5546,5548,5750],"colors":{"primaryColor":"#528fa2","secondaryColor":"#ededed","successColor":"#528fa2","warningColor":"#ffc85f","dangerColor":"#f94b39"}},"time":{"name":"SensorTime","list":[3333],"resources":[5506,5507,5750],"colors":{"primaryColor":"#528fa2","secondaryColor":"#77d1bf","successColor":"#528fa2","warningColor":"#ffc85f","dangerColor":"#f94b39"}},"timer":{"name":"SensorTimer","list":[3340],"resources":[5501,5521,5523,5525,5526,5534,5538,5543,5544,5750],"colors":{"primaryColor":"#528fa2","secondaryColor":"#ededed","successColor":"#528fa2","warningColor":"#ffc85f","dangerColor":"#f94b39"}}};

/***/ }),

/***/ "b639":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__("1fb5")
var ieee754 = __webpack_require__("9152")
var isArray = __webpack_require__("e3db")

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "bcaa":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("cb7c");
var isObject = __webpack_require__("d3f4");
var newPromiseCapability = __webpack_require__("a5b8");

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),

/***/ "be13":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "c366":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("6821");
var toLength = __webpack_require__("9def");
var toAbsoluteIndex = __webpack_require__("77f1");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "c5f6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("7726");
var has = __webpack_require__("69a8");
var cof = __webpack_require__("2d95");
var inheritIfRequired = __webpack_require__("5dbc");
var toPrimitive = __webpack_require__("6a99");
var fails = __webpack_require__("79e5");
var gOPN = __webpack_require__("9093").f;
var gOPD = __webpack_require__("11e9").f;
var dP = __webpack_require__("86cc").f;
var $trim = __webpack_require__("aa77").trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__("2aeb")(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__("9e1e") ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__("2aba")(global, NUMBER, $Number);
}


/***/ }),

/***/ "c69a":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("9e1e") && !__webpack_require__("79e5")(function () {
  return Object.defineProperty(__webpack_require__("230e")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "c8ba":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "ca5a":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "cadf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__("9c6c");
var step = __webpack_require__("d53b");
var Iterators = __webpack_require__("84f2");
var toIObject = __webpack_require__("6821");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__("01f9")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "cb7c":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "cba2":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* eslint-disable no-console */
function logger(priority, collectionName, command, content) {
  // define priority based on process.env.NODE_ENV
  var logLevel = Number(Object({"VUE_APP_E2E":"true","NODE_ENV":"production","BASE_URL":"/"}).SERVER_LOGGER_LEVEL) || 4;
  var fullContent;

  if (priority <= logLevel) {
    if (_typeof(content) === "object") {
      fullContent = "[".concat(collectionName.toUpperCase(), "] ").concat(command, " : ").concat(JSON.stringify(content));
    } else if (_typeof(content) !== "object") {
      fullContent = "[".concat(collectionName.toUpperCase(), "] ").concat(command, " : ").concat(content);
    }

    console.log(fullContent);
    return null;
  } else if (priority > logLevel) {
    return null;
  }

  throw new Error("INVALID_LOG", "Missing argument in logger");
}

module.exports = {
  logger: logger
};

/***/ }),

/***/ "cd1c":
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__("e853");

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),

/***/ "ce10":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("69a8");
var toIObject = __webpack_require__("6821");
var arrayIndexOf = __webpack_require__("c366")(false);
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "d3f4":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "d53b":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "d8e8":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "dcbc":
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__("2aba");
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),

/***/ "e0a6":
/***/ (function(module) {

module.exports = {"id":"2","name":"Device 1","type":"Gateway","devEui":"1456278","appKey":"okdF2wUbnInCbUJpr4013S4Agn96wC30d4iD3wbU8oFIc1eLP5qyW3GeU9bMFG1T","description":"","status":true,"frameCounter":22,"lastSignal":"2019-01-08T15:28:03.168Z","protocolName":"mySensors","protocolVersion":"2.1","accessPointUrl":"http://192.168.244.1","qrCode":"http://192.168.244.1/wifi?server=192.168.1.73&port=1883&client=1456278&user=5c27737cdfdadd61451c0f77&password=okdF2wUbnInCbUJpr4013S4Agn96wC30d4iD3wbU8oFIc1eLP5qyW3GeU9bMFG1T","accountId":"5c24e1514a603a651d1ddfd5","group":0,"size":80,"icons":["/icons/aloes/node.png","/icons/aloes/node-white.png"],"colors":["#29abe2"],"children":[{"id":"21","group":2,"icons":["/icons/aloes/analog.svg","/icons/aloes/analog.png","/icons/aloes/analog-white.png"],"size":40,"colors":["#77d1bf","#ffc85f"],"name":"Analog Input","type":3202,"devEui":"1456278","deviceId":"2","resource":5600,"resources":{"5600":125,"5601":0,"5602":1023,"5603":0,"5604":1024,"5605":null,"5750":"app","5751":"analog_input"},"value":125,"frameCounter":0,"protocolName":"mySensors","protocolVersion":"2.3","nativeSensorId":"2","nativeNodeId":"4","outPrefix":"-out","inPrefix":"-in","nativeType":23,"nativeResource":48},{"id":"22","group":2,"icons":["/icons/aloes/barometer.svg","/icons/aloes/barometer.png","/icons/aloes/barometer-white.png"],"size":40,"colors":["#77d1bf","#ffc85f"],"name":"Barometer","type":3315,"devEui":"1456278","deviceId":"2","resource":5700,"resources":{"5601":0,"5602":1023,"5603":0,"5604":5000,"5605":null,"5700":1015,"5701":"hPa"},"value":"1015","frameCounter":0,"protocolName":"mySensors","protocolVersion":"2.3","nativeSensorId":"2","nativeNodeId":"4","outPrefix":"-out","inPrefix":"-in","nativeType":8,"nativeResource":4},{"id":"23","group":2,"icons":["/icons/aloes/location.svg","/icons/aloes/location.png","/icons/aloes/location-white.png"],"size":40,"colors":["#77d1bf","#ffc85f"],"name":"Location","type":3336,"devEui":"1456278","deviceId":"2","resource":5515,"resources":{"5514":"45.60011","5515":"8.77990","5516":"","5517":"","5518":"time","5705":0},"value":[45.60011,8.7799],"frameCounter":0,"protocolName":"mySensors","protocolVersion":"2.3","nativeSensorId":"1","nativeNodeId":"5","outPrefix":"-out","inPrefix":"-in","nativeType":38,"nativeResource":49},{"id":"24","group":2,"icons":["/icons/aloes/switch-on.svg","/icons/aloes/switch-off.svg","/icons/aloes/switch-on.png","/icons/aloes/switch-on-white.png","/icons/aloes/switch-off.png","/icons/aloes/switch-off-white.png"],"size":40,"colors":["#77d1bf","#ffc85f"],"name":"On/Off Switch","type":3342,"devEui":"1456278","deviceId":"2","resource":5500,"resources":{"5500":1,"5501":0,"5750":"app-name","5852":1,"5854":0},"value":0,"frameCounter":0,"protocolName":"mySensors","protocolVersion":"2.3","nativeSensorId":"2","nativeNodeId":"4","outPrefix":"-out","inPrefix":"-in","nativeType":2,"nativeResource":3},{"id":"25","group":2,"icons":["/icons/aloes/temperature.svg","/icons/aloes/temperature.png","/icons/aloes/temperature-white.png"],"size":40,"colors":["#77d1bf","#ffc85f"],"name":"Temperature","type":3303,"devEui":"1456278","deviceId":"2","resource":5700,"resources":{"5601":0,"5602":36,"5603":-30,"5604":80,"5605":null,"5700":22,"5701":"°C"},"value":22.5,"frameCounter":0,"protocolName":"aloesLight","protocolVersion":"1.0","nativeSensorId":"4","nativeNodeId":null,"outPrefix":"-out","inPrefix":"-in","nativeType":3303,"nativeResource":5700},{"id":"26","group":2,"icons":["/icons/aloes/level-control.svg","/icons/aloes/level-control.png","/icons/aloes/level-control-white.png"],"size":40,"colors":["#77d1bf","#ffc85f"],"name":"Level Control","type":3306,"devEui":"1456278","deviceId":"2","resource":5851,"resources":{"5701":"%","5850":false,"5851":35,"5852":0},"value":35,"frameCounter":4,"protocolName":"aloesLight","protocolVersion":"1.0","nativeSensorId":"4","nativeNodeId":null,"outPrefix":"-out","inPrefix":"-in","nativeType":3306,"nativeResource":5851},{"id":"27","group":2,"icons":["/icons/aloes/dither.svg","/icons/aloes/dither.png","/icons/aloes/dither-white.png"],"size":40,"colors":["#77d1bf","#ffc85f"],"name":"Bitmap","type":3349,"devEui":"1456278","deviceId":"2","resource":5910,"resources":{"5750":"camera","5910":[],"5911":false,"5912":"picture"},"value":35,"frameCounter":4,"protocolName":"aloesLight","protocolVersion":"1.0","nativeSensorId":"4","nativeNodeId":null,"outPrefix":"-out","inPrefix":"-in","nativeType":3449,"nativeResource":5910},{"id":"28","group":2,"icons":["/icons/aloes/time.svg","/icons/aloes/agenda.svg","/icons/aloes/time.png","/icons/aloes/time-white.png","/icons/aloes/agenda.png","/icons/aloes/agenda-white.png"],"size":40,"colors":["#77d1bf","#ffc85f"],"name":"Time","type":3333,"devEui":"1456278","deviceId":"2","resource":5506,"resources":{"5506":1548724188,"5507":false,"5750":"time"},"value":1548724188,"frameCounter":4,"protocolName":"aloesLight","protocolVersion":"1.0","nativeSensorId":"6","nativeNodeId":null,"outPrefix":"-out","inPrefix":"-in","nativeType":3333,"nativeResource":5506}]};

/***/ }),

/***/ "e11e":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "e3db":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "e76e":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mqttPattern = __webpack_require__("5bc6");

var _require = __webpack_require__("cba2"),
    logger = _require.logger;

var omaObjects = __webpack_require__("22c4");

var omaResources = __webpack_require__("4a2d");

var omaViews = __webpack_require__("4888");

var protocolPatterns = __webpack_require__("3261");

var aloesLightToOmaObject = function aloesLightToOmaObject(msg) {
  try {
    logger(4, 'handlers', 'aloesLightToOmaObject:req', msg);
    var foundOmaObject = omaObjects.find(function (object) {
      return object.value === Number(msg.type);
    });
    if (!foundOmaObject) return 'no OMA Object found';
    var foundOmaViews = omaViews.find(function (object) {
      return object.value === msg.type;
    });

    var decoded = _objectSpread({}, msg, {
      protocolName: 'aloesLight',
      resources: foundOmaObject.resources,
      name: foundOmaObject.name,
      icons: foundOmaViews.icons,
      colors: foundOmaViews.resources,
      frameCounter: 0
    });

    logger(4, 'handlers', 'aloesLightToOmaObject:res', decoded);
    return decoded;
  } catch (error) {
    logger(2, 'handlers', 'aloesLightToOmaObject:err', error);
    throw error;
  }
};

var aloesLightToOmaResources = function aloesLightToOmaResources(msg) {
  try {
    logger(4, 'handlers', 'aloesLightToOmaResources:req', msg);
    var aloesResource = omaObjects.find(function (object) {
      return object.value === Number(msg.type);
    });
    if (!aloesResource) return 'no OMA Object found'; //  msg.resources[msg.resource.toString()] = msg.value;

    var decoded = _objectSpread({}, msg); //  sensor.resources = aloesResource.resources;


    logger(4, 'handlers', 'aloesLightToOmaResources:res', decoded);
    return decoded;
  } catch (error) {
    logger(2, 'handlers', 'aloesLightToOmaResources:err', error);
    throw error;
  }
};

var aloesLightDecoder = function aloesLightDecoder(packet, protocol) {
  try {
    logger(4, 'handlers', 'aloesLightDecoder:req', protocol);
    var protocolKeys = Object.getOwnPropertyNames(protocol);

    if (protocolKeys.length === 5) {
      var decoded = {};
      var decodedPayload;
      decoded.devEui = protocol.devEui;
      var gatewayIdParts = protocol.prefixedDevEui.split('-');
      var inPrefix = '-in';
      var outPrefix = '-out';

      var params = _objectSpread({}, protocol, {
        prefixedDevEui: "".concat(gatewayIdParts[0]).concat(inPrefix)
      });

      decoded.inPrefix = inPrefix;
      decoded.outPrefix = outPrefix;
      decoded.devEui = gatewayIdParts[0];
      decoded.prefix = gatewayIdParts[1];
      decoded.lastSignal = new Date();

      switch (Number(protocol.method)) {
        case 0:
          // HEAD
          decoded.nativeSensorId = protocol.sensorId;
          decoded.type = Number(protocol.omaObjectId);
          decoded.nativeType = Number(protocol.omaObjectId);
          decoded.resource = Number(protocol.omaResourceId);
          decoded.value = packet.payload.toString();
          decoded.inputPath = mqttPattern.fill(protocolPatterns.aloesLight.pattern, params);
          params.prefixedDevEui = "".concat(gatewayIdParts[0]).concat(outPrefix);
          decoded.outputPath = mqttPattern.fill(protocolPatterns.aloesLight.pattern, params);
          decoded.method = 'HEAD';
          decodedPayload = aloesLightToOmaObject(decoded);
          break;

        case 1:
          // POST
          decoded.inputPath = mqttPattern.fill(protocolPatterns.aloesLight.pattern, params);
          params.prefixedDevEui = "".concat(gatewayIdParts[0]).concat(outPrefix);
          decoded.outputPath = mqttPattern.fill(protocolPatterns.aloesLight.pattern, params);
          decoded.nativeSensorId = protocol.sensorId;
          decoded.type = Number(protocol.omaObjectId);
          decoded.nativeType = Number(protocol.omaObjectId);
          decoded.resource = Number(protocol.omaResourceId); // todo : format payload base on type ?
          //  decoded.value = packet.payload;

          decoded.value = packet.payload.toString();
          decoded.method = 'POST';
          decodedPayload = aloesLightToOmaResources(decoded);
          break;

        case 2:
          // GET
          decoded.nativeSensorId = protocol.sensorId;
          decoded.type = Number(protocol.omaObjectId);
          decoded.resource = Number(protocol.omaResourceId);
          decoded.method = 'GET';
          decodedPayload = decoded;
          break;

        case 3:
          // Internal
          decoded.nativeSensorId = protocol.sensorId;
          decoded.value = packet.payload.toString();
          break;

        case 4:
          // STREAM
          decoded.nativeSensorId = protocol.sensorId;
          decoded.type = Number(protocol.omaObjectId);
          decoded.resource = Number(protocol.omaResourceId);
          decoded.value = packet.payload;
          decoded.method = 'STREAM';
          decodedPayload = decoded;
          break;

        default:
          break;
      }

      return decodedPayload;
    }

    return "topic doesn't match";
  } catch (error) {
    throw error;
  }
};

module.exports = {
  aloesLightToOmaObject: aloesLightToOmaObject,
  aloesLightToOmaResources: aloesLightToOmaResources,
  aloesLightDecoder: aloesLightDecoder
};

/***/ }),

/***/ "e853":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var isArray = __webpack_require__("1169");
var SPECIES = __webpack_require__("2b4c")('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),

/***/ "ebd6":
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__("cb7c");
var aFunction = __webpack_require__("d8e8");
var SPECIES = __webpack_require__("2b4c")('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),

/***/ "f199":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

var mqttPattern = __webpack_require__("5bc6");

var _require = __webpack_require__("cba2"),
    logger = _require.logger;

var protocolPatterns = __webpack_require__("3261");

var omaObjects = __webpack_require__("22c4");

var omaResources = __webpack_require__("4a2d");

var omaViews = __webpack_require__("4888");

var mySensorsApi = __webpack_require__("6ac1");

var _require2 = __webpack_require__("399e"),
    mySensorsDecoder = _require2.mySensorsDecoder;

var _require3 = __webpack_require__("e76e"),
    aloesLightDecoder = _require3.aloesLightDecoder;

var _require4 = __webpack_require__("4691"),
    aloesClientDecoder = _require4.aloesClientDecoder; // const extractProtocol = (pattern, topic) =>
//   new Promise((resolve, reject) => {
//     const protocol = mqttPattern.exec(pattern, topic);
//     if (protocol !== null) resolve(protocol);
//     else reject(protocol);
//   });


var patternDetector = function patternDetector(packet) {
  try {
    var pattern = {
      name: 'empty',
      params: null
    };
    logger(2, 'handlers', 'patternDetector:req', packet.topic);
    if (packet.topic.split('/')[0] === '$SYS') return null;

    if (mqttPattern.matches(protocolPatterns.aloesClient.collectionPattern, packet.topic)) {
      logger(2, 'handlers', 'patternDetector:res', 'reading AloesClient collection API...'); //  const aloesClientProtocol = await extractProtocol(protocolPatterns.aloesClient.collectionPattern, packet.topic);

      var aloesClientProtocol = mqttPattern.exec(protocolPatterns.aloesClient.collectionPattern, packet.topic);
      logger(2, 'handlers', 'patternDetector:res', aloesClientProtocol);
      var collectionExists = protocolPatterns.aloesClient.validators.collectionName.some(function (collection) {
        return collection === aloesClientProtocol.collectionName;
      });
      var methodExists = protocolPatterns.aloesClient.validators.methods.some(function (meth) {
        return meth === aloesClientProtocol.method;
      }); // find a signal to check direction ( to app or device ?)
      // aloesClientProtocol.target && aloesClientProtocol.target === 'iot'

      if (methodExists && collectionExists) {
        pattern.name = 'aloesClient';
        pattern.subType = 'web';
        pattern.params = aloesClientProtocol;
        return pattern;
      }
    }

    if (mqttPattern.matches(protocolPatterns.aloesClient.instancePattern, packet.topic)) {
      logger(2, 'handlers', 'patternDetector:res', 'reading AloesClient instance API ...'); //  const aloesClientProtocol = await extractProtocol(protocolPatterns.aloesClient.instancePattern, packet.topic);

      var _aloesClientProtocol = mqttPattern.exec(protocolPatterns.aloesClient.instancePattern, packet.topic);

      logger(4, 'handlers', 'patternDetector:res', _aloesClientProtocol); //  if (aloesClientProtocol === null) return null;

      var _methodExists = protocolPatterns.aloesClient.validators.methods.some(function (meth) {
        return meth === _aloesClientProtocol.method;
      });

      var _collectionExists = protocolPatterns.aloesClient.validators.collectionName.some(function (collection) {
        return collection === _aloesClientProtocol.collectionName;
      }); // add amethod  to differentiate subtype


      if (_methodExists && _collectionExists && _aloesClientProtocol.collectionName.toLowerCase() === 'iotagent') {
        pattern.name = 'aloesClient';
        pattern.subType = 'iot';
        pattern.params = _aloesClientProtocol;
        return pattern;
      } else if (_methodExists && _collectionExists) {
        pattern.name = 'aloesClient';
        pattern.subType = 'web';
        pattern.params = _aloesClientProtocol;
        return pattern;
      }
    }

    if (mqttPattern.matches(protocolPatterns.mySensors.pattern, packet.topic)) {
      logger(2, 'handlers', 'patternDetector:res', 'reading MySensors API ...'); //  const mysensorsProtocol = await extractProtocol(protocolPatterns.mySensors.pattern, packet.topic);

      var mysensorsProtocol = mqttPattern.exec(protocolPatterns.mySensors.pattern, packet.topic);
      logger(4, 'handlers', 'patternDetector:res', mysensorsProtocol);
      var typeExists = false;

      var _methodExists2 = protocolPatterns.mySensors.validators.methods.some(function (meth) {
        return meth === Number(mysensorsProtocol.method);
      });

      if (Number(mysensorsProtocol.method) === 0) {
        typeExists = mySensorsApi.labelsPresentation.some(function (label) {
          return label.value === Number(mysensorsProtocol.subType);
        });
      } else if (Number(mysensorsProtocol.method) > 0 && Number(mysensorsProtocol.method) < 2) {
        typeExists = mySensorsApi.labelsSet.some(function (label) {
          return label.value === Number(mysensorsProtocol.subType);
        });
      }

      logger(4, 'handlers', 'patternDetector:res', {
        methodExists: _methodExists2,
        typeExists: typeExists
      });

      if (_methodExists2 && typeExists) {
        pattern.name = 'mySensors';
        pattern.params = mysensorsProtocol;
        return pattern;
      }
    }

    if (mqttPattern.matches(protocolPatterns.aloesLight.pattern, packet.topic)) {
      logger(2, 'handlers', 'patternDetector:res', 'reading Aloes Light API ...'); //  const aloesProtocol = await extractProtocol(protocolPatterns.aloesLight.pattern, packet.topic);

      var aloesProtocol = mqttPattern.exec(protocolPatterns.aloesLight.pattern, packet.topic);
      logger(4, 'handlers', 'patternDetector:res', aloesProtocol);

      var _methodExists3 = protocolPatterns.aloesLight.validators.methods.some(function (meth) {
        return meth === Number(aloesProtocol.method);
      });

      var omaObjectIdExists = omaObjects.some(function (object) {
        return object.value === Number(aloesProtocol.omaObjectId);
      });
      logger(4, 'handlers', 'patternDetector:res', {
        methodExists: _methodExists3,
        omaObjectIdExists: omaObjectIdExists
      });

      if (_methodExists3 && omaObjectIdExists) {
        pattern.name = 'aloesLight';
        pattern.params = aloesProtocol;
        return pattern;
      }
    }

    pattern.params = "topic doesn't match pattern";
    return pattern;
  } catch (error) {
    logger(2, 'handlers', 'patternDetector:err', error);
    return error;
  }
};

var isEmpty = function isEmpty(obj) {
  var hasOwnProperty = Object.prototype.hasOwnProperty; // null and undefined are "empty"

  if (obj == null) return true;
  if (obj.length > 0) return false;
  if (obj.length === 0) return true;

  for (var i = 0; i <= obj.length; i += 1) {
    var key = obj[i];
    if (hasOwnProperty.call(obj, key)) return false;
  }

  return true;
};

var publish = function publish(options) {
  //  logger(4, "pubsub", "publish:req", options);
  //  if (options && !isEmpty(options)) {
  if (options && options.data) {
    var topic = null;
    var data = options.data;

    if (options.pattern.toLowerCase() === 'mysensors') {
      var params = {
        prefixedDevEui: "".concat(data.devEui).concat(data.inPrefix),
        nodeId: data.nativeNodeId,
        sensorId: data.nativeSensorId,
        subType: data.nativeResource
      };
      logger(4, 'handlers', 'publish', params);

      if (options.method === 'POST') {
        params.method = 2;
        params.ack = 0;
        topic = mqttPattern.fill(protocolPatterns.mySensors.pattern, params);
        return {
          topic: topic,
          payload: data.value
        };
      } else if (options.method === 'GET') {
        params.method = 2;
        params.ack = 0;
        topic = mqttPattern.fill(protocolPatterns.mySensors.pattern, params);
        return {
          topic: topic,
          payload: data.value
        };
      }

      return 'Method not supported yet';
    } else if (options.pattern.toLowerCase() === 'aloeslight') {
      var _params = {
        prefixedDevEui: "".concat(data.devEui).concat(data.inPrefix),
        omaObjectId: data.type,
        sensorId: data.nativeSensorId,
        omaResourceId: data.resource
      };
      logger(4, 'handlers', 'publish', _params);

      if (options.method === 'POST') {
        _params.method = 1;
        topic = mqttPattern.fill(protocolPatterns.aloesLight.pattern, _params);
        return {
          topic: topic,
          payload: data.value
        };
      } else if (options.method === 'GET') {
        _params.method = 2;
        topic = mqttPattern.fill(protocolPatterns.aloesLight.pattern, _params);
        return {
          topic: topic,
          payload: data.value
        };
      }

      return 'Method not supported yet';
    } else if (options.pattern.toLowerCase() === 'aloesclient') {
      var _params2 = {
        userId: options.userId,
        collectionName: options.collectionName,
        modelId: options.modelId,
        method: options.method
      };
      logger(4, 'handlers', 'publish', _params2);

      if (options.method === 'POST') {
        topic = mqttPattern.fill(protocolPatterns.aloesClient.collectionPattern, _params2);
      } else if (options.method === 'DELETE') {
        topic = mqttPattern.fill(protocolPatterns.aloesClient.collectionPattern, _params2);
      } else if (options.method === 'PUT') {
        topic = mqttPattern.fill(protocolPatterns.aloesClient.collectionPattern, _params2);
      } else {
        topic = mqttPattern.fill(protocolPatterns.aloesClient.instancePattern, _params2);
      }

      return {
        topic: topic,
        payload: data
      };
    }

    return 'Protocol not supported yet';
  }

  return new Error('Error: Option must be an object type');
};

var subscribe = function subscribe(socket, options) {
  logger(4, 'handlers', 'subscribe:req', options);

  if (options && !isEmpty(options)) {
    var topic = null;

    if (options.pattern.toLowerCase() === 'mysensors') {
      topic = null;
    } else if (options.pattern.toLowerCase() === 'aloesclient') {
      var params = {
        userId: options.userId,
        collectionName: options.collectionName,
        modelId: options.modelId,
        method: options.method
      };

      if (options.method === 'POST') {
        topic = mqttPattern.fill(protocolPatterns.aloesClient.collectionPattern, params);
      } else if (options.method === 'DELETE') {
        topic = mqttPattern.fill(protocolPatterns.aloesClient.collectionPattern, params);
      } else {
        topic = mqttPattern.fill(protocolPatterns.aloesClient.instancePattern, params);
      }
    }

    return topic;
  }

  return new Error('Error: Option must be an object type');
};

var publishToNative = function publishToNative(options) {
  //  logger(4, "pubsub", "publishToNative:req", options);
  //  if (options && !isEmpty(options)) {
  if (options && options.data && options.data.protocolName) {
    var topic = null;
    var data = options.data;

    if (data.protocolName.toLowerCase() === 'mysensors') {
      var params = {
        prefixedDevEui: "".concat(data.devEui).concat(data.inPrefix),
        nodeId: data.nativeNodeId,
        sensorId: data.nativeSensorId,
        subType: data.nativeResource
      };
      logger(4, 'handlers', 'publishToNative', params);

      if (options.method === 'POST' || options.method === 'PUT') {
        params.method = 2;
        params.ack = 0;
        topic = mqttPattern.fill(protocolPatterns.mySensors.pattern, params);
        return {
          topic: topic,
          payload: data.value
        };
      } else if (options.method === 'GET') {
        params.method = 2;
        params.ack = 0;
        topic = mqttPattern.fill(protocolPatterns.mySensors.pattern, params);
        return {
          topic: topic,
          payload: data.value
        };
      }

      return 'Method not supported yet';
    } else if (data.protocolName.toLowerCase() === 'aloeslight') {
      var _params3 = {
        prefixedDevEui: "".concat(data.devEui).concat(data.inPrefix),
        omaObjectId: data.type,
        sensorId: data.nativeSensorId,
        omaResourcesId: data.resource
      };
      logger(4, 'handlers', 'publishToNative', _params3);

      if (options.method === 'POST' || options.method === 'PUT') {
        _params3.method = 1;
        topic = mqttPattern.fill(protocolPatterns.aloes.pattern, _params3);
        return {
          topic: topic,
          payload: data.value
        };
      } else if (options.method === 'GET') {
        _params3.method = 2;
        topic = mqttPattern.fill(protocolPatterns.aloes.pattern, _params3);
        return {
          topic: topic,
          payload: data.value
        };
      }

      return 'Method not supported yet';
    }

    return 'Protocol not supported yet';
  }

  return new Error('Error: Option must be an object type');
};

var uploadedFiles = [];
var counter = 0;

function parseStream(payload, bufferSize) {
  console.log('parseStream.........', payload);

  if (payload.length === bufferSize) {
    //console.log(this.counter);
    if (counter === 1) {
      return uploadedFiles = new Blob([payload], {
        type: 'image/jpeg'
      });
    } else {
      return uploadedFiles = new Blob([uploadedFiles, payload], {
        type: 'image/jpeg'
      });
    }
  } else if (payload.length <= 4) {
    //console.log("last", this.counter);
    var blob = new Blob([this.uploadedFiles, payload], {
      type: 'image/jpeg'
    });
    uploadedFiles = [];
    counter = 0;
  }
}

var updateAloesSensors = function updateAloesSensors(sensor, resource, value) {
  logger(4, 'handlers', 'updateAloesSensors', {
    sensor: sensor,
    resource: resource,
    value: value
  });

  switch (Number(sensor.type)) {
    case 3200:
      // digital input
      if (resource === 5500) {
        sensor.resources[resource] = Boolean(value);
        sensor.value = Number(sensor.resources[resource]);
        if (value) sensor.resources['5501'] = sensor.resources['5501'] + 1;else sensor.resources['5501'] = 0;
      } else if (resource === 5502) {
        sensor.resources[resource] = Boolean(value); // polarity
      } else if (resource === 5503) {
        sensor.resources[resource] = Number(value); // debounce
      } else if (resource === 5504) {
        sensor.resources[resource] = Number(value); // edge selection ( 1 falling, 2 rising, 3 both )
      } else if (resource === 5750 || resource === 5751) {
        sensor.resources[resource] = value; // app_name || sensor type
      }

      break;

    case 3201:
      // digital output
      if (resource === 5550) {
        sensor.resources[resource] = Boolean(value);
        sensor.value = Number(sensor.resources[resource]);
      } else if (resource === 5551) {
        sensor.resources[resource] = Boolean(value); // polarity
      } else if (resource === 5750) {
        sensor.resources[resource] = value; // app_name
      }

      break;

    case 3202:
      // analog input
      if (resource === 5600) {
        sensor.resources[resource] = Number(value);
        sensor.value = sensor.resources[resource];
      } else if (resource === 5601 || resource === 5602) {
        sensor.resources[resource] = Number(value); // min || max measured range
      } else if (resource === 5603 || resource === 5604) {
        sensor.resources[resource] = Number(value); // min || max range
      } else if (resource === 5605) {
        sensor.resources[resource] = value; //reset min/max event
      } else if (resource === 5750 || resource === 5751) {
        sensor.resources[resource] = value; // app_name || sensor type
      }

      break;

    case 3203:
      // analog output
      if (resource === 5650) {
        sensor.resources[resource] = Number(value);
        sensor.value = sensor.resources[resource];
      } else if (resource === 5603 || resource === 5604) {
        sensor.resources[resource] = Number(value); // min || max range
      } else if (resource === 5750) {
        sensor.resources[resource] = value; // app_name
      }

      break;

    case 3300:
      // generic sensor
      if (resource === 5700) {
        sensor.resources[resource] = Number(value);
        sensor.value = sensor.resources[resource];
      } else if (resource === 5701) {
        sensor.resources[resource] = value; // units
      } else if (resource === 5601 || resource === 5602) {
        sensor.resources[resource] = Number(value); // min || max measured range
      } else if (resource === 5603 || resource === 5604) {
        sensor.resources[resource] = Number(value); // min || max range
      } else if (resource === 5605) {
        sensor.resources[resource] = value; //reset min/max event
      } else if (resource === 5750 || resource === 5751) {
        sensor.resources[resource] = value; // app_name || sensor type
      }

      break;

    case 3301:
      // illuminance sensor
      if (resource === 5700) {
        sensor.resources[resource] = Number(value);
        sensor.value = sensor.resources[resource];
      } else if (resource === 5701) {
        sensor.resources[resource] = value; // units
      } else if (resource === 5601 || resource === 5602) {
        sensor.resources[resource] = Number(value); // min || max measured range
      } else if (resource === 5603 || resource === 5604) {
        sensor.resources[resource] = Number(value); // min || max range
      } else if (resource === 5605) {
        sensor.resources[resource] = value; //reset min/max event
      } else if (resource === 5750 || resource === 5751) {
        sensor.resources[resource] = value; // app_name || sensor type
      }

      break;

    case 3302:
      // presence sensor
      if (resource === 5500) {
        sensor.resources[resource] = Number(value);
        sensor.value = sensor.resources[resource];
        if (value) sensor.resources['5501'] = sensor.resources['5501'] + 1;else sensor.resources['5501'] = 0;
      } else if (resource === 5903 || resource === 5904) {
        sensor.resources[resource] = Number(value); // busy to clear delay || clear to busy dealy
      } else if (resource === 5505) {
        sensor.resources[resource] = value; //reset counter event
      } else if (resource === 5751) {
        sensor.resources[resource] = value; // sensor type
      }

      break;

    case 3303:
      // temperature sensor
      if (resource === 5700) {
        sensor.resources[resource] = Number(value);
        sensor.value = sensor.resources[resource];
      } else if (resource === 5701) {
        sensor.resources[resource] = value; // units
      } else if (resource === 5601 || resource === 5602) {
        sensor.resources[resource] = Number(value); // min || max measured range
      } else if (resource === 5603 || resource === 5604) {
        sensor.resources[resource] = Number(value); // min || max range
      } else if (resource === 5605) {
        sensor.resources[resource] = value; //reset min/max event
      } else if (resource === 5750 || resource === 5751) {
        sensor.resources[resource] = value; // app_name || sensor type
      }

      break;

    case 3304:
      // humidity sensor
      if (resource === 5700) {
        sensor.resources[resource] = Number(value);
        sensor.value = sensor.resources[resource];
      } else if (resource === 5701) {
        sensor.resources[resource] = value; // units
      } else if (resource === 5601 || resource === 5602) {
        sensor.resources[resource] = Number(value); // min || max measured range
      } else if (resource === 5603 || resource === 5604) {
        sensor.resources[resource] = Number(value); // min || max range
      } else if (resource === 5605) {
        sensor.resources[resource] = value; //reset min/max event
      } else if (resource === 5750 || resource === 5751) {
        sensor.resources[resource] = value; // app_name || sensor type
      }

      break;

    case 3306:
      // actuation
      if (resource === 5851) {
        sensor.resources[resource] = Number(value); // dimmer

        sensor.value = sensor.resources[resource];

        if (sensor.resources['5851'] === 0) {
          sensor.resources['5850'] = 0;
        }
      } else if (resource === 5850) {
        sensor.resources[resource] = Boolean(value); // switch

        sensor.value = Number(sensor.resources[resource]);

        if (value) {
          if (sensor.resources['5852'] === 0) {
            sensor.resources['5852'] = new Date();
          } else {
            sensor.resources['5852'] = sensor.resources['5852'] - new Date();
          }
        } else {
          sensor.resources['5852'] = 0;
        }
      } else if (resource === 5853) {
        sensor.resources[resource] = value; // multi state output
      } else if (resource === 5750) {
        sensor.resources[resource] = value; // app_name
      }

      break;

    case 3308:
      // set point
      if (resource === 5900) {
        sensor.resources[resource] = Number(value); // set point value

        sensor.value = sensor.resources[resource];
      } else if (resource === 5701) {
        sensor.resources[resource] = value; // unit
      } else if (resource === 5706) {
        sensor.resources[resource] = value; // color
      } else if (resource === 5750) {
        sensor.resources[resource] = value; // app_name
      }

      break;

    case 3310:
      // load control
      sensor.resources['5824'] = Date();
      sensor.resources['5826'] = 'event'; //  sensor.value = sensor.resources["5550"];

      break;

    case 3311:
      // light control
      if (resource === 5851) {
        sensor.resources[resource] = Number(value);
        sensor.value = sensor.resources[resource];

        if (sensor.resources['5851'] === 0) {
          sensor.resources['5850'] = 0;
        }
      } else if (resource === 5850) {
        sensor.resources[resource] = Number(value);
        sensor.value = sensor.resources[resource];

        if (value) {
          if (sensor.resources['5852'] === 0) {
            sensor.resources['5852'] = new Date();
          } else {
            sensor.resources['5852'] = sensor.resources['5852'] - new Date();
          }
        } else {
          sensor.resources['5852'] = 0;
        }
      } else if (resource === 5701) {
        sensor.resources[resource] = value; // unit
      } else if (resource === 5750) {
        sensor.resources[resource] = value; // app_name
      }

      break;

    case 3312:
      // power control
      if (resource === 5851) {
        sensor.resources[resource] = Number(value);

        if (sensor.resources['5851'] === 0) {
          sensor.resources['5850'] = 0;
        }
      } else if (resource === 5850) {
        sensor.resources[resource] = Number(value);

        if (value) {
          if (sensor.resources['5852'] === 0) {
            sensor.resources['5852'] = new Date();
          } else {
            sensor.resources['5852'] = sensor.resources['5852'] - new Date();
          }
        } else {
          sensor.resources['5852'] = 0;
        }
      } else if (resource === 5701) {
        sensor.resources[resource] = value; // unit
      } else if (resource === 5706) {
        sensor.resources[resource] = value; // color
      } else if (resource === 5750) {
        sensor.resources[resource] = value; // app_name
      }

      break;

    case 3313:
      // accelerometer
      if (resource === 5702 || resource === 5703 || resource === 5704) {
        sensor.resources[resource] = Number(value); // X || Y || Z

        sensor.value = sensor.resources[resource];
      } else if (resource === 5603 || resource === 5604) {
        sensor.resources[resource] = Number(value); // min / max range
      } else if (resource === 5701) {
        sensor.resources[resource] = value; // unit
      }

      break;

    case 3314:
      // magnetometer
      if (resource === 5702 || resource === 5703 || resource === 5704) {
        sensor.resources[resource] = Number(value); // X || Y || Z

        sensor.value = sensor.resources[resource];
      } else if (resource === 5705) {
        sensor.resources[resource] = value; // compass direction
      } else if (resource === 5701) {
        sensor.resources[resource] = value; // unit
      }

      break;

    case 3315:
      // barometer
      if (resource === 5700) {
        sensor.resources[resource] = Number(value);
        sensor.value = sensor.resources[resource];
      } else if (resource === 5701) {
        sensor.resources[resource] = value; // units
      } else if (resource === 5601 || resource === 5602) {
        sensor.resources[resource] = Number(value); // min || max measured range
      } else if (resource === 5603 || resource === 5604) {
        sensor.resources[resource] = Number(value); // min || max range
      } else if (resource === 5605) {
        sensor.resources[resource] = value; //reset min/max event
      } else if (resource === 5750 || resource === 5751) {
        sensor.resources[resource] = value; // app_name || sensor type
      }

      break;

    case 3331:
      // energy
      if (resource === 5700) {
        sensor.resources[resource] = value; // value

        sensor.value = sensor.resources[resource];
      } else if (resource === 5822) {
        sensor.resources[resource] = value; // reset cumulative enery
      } else if (resource === 5701) {
        sensor.resources[resource] = value; // unit
      } else if (resource === 5750) {
        sensor.resources[resource] = value; // app_name
      }

      break;

    case 3332:
      // direction
      if (resource === 5601 || resource === 5602) {
        sensor.resources[resource] = Number(value); // min || max measured value
      } else if (resource === 5705) {
        sensor.resources[resource] = value; // compass direction

        sensor.value = sensor.resources[resource];
      } else if (resource === 5605) {
        sensor.resources[resource] = value; // reset min/max event
      } else if (resource === 5750) {
        sensor.resources[resource] = value; // app name
      }

      break;

    case 3333:
      // time
      if (resource === 5506) {
        if (value) {
          sensor.resources[resource] = value; // current time
        } else if (!value) {
          sensor.resources[resource] = new Date(); // current time
        }

        sensor.value = sensor.resources[resource];
      } else if (resource === 5507) {
        sensor.resources[resource] = Number(value); // fraactionnal time s
      } else if (resource === 5750) {
        sensor.resources[resource] = value; // app_name
      }

      break;

    case 3334:
      // gyrometer
      if (resource === 5702 || resource === 5703 || resource === 5704) {
        sensor.resources[resource] = Number(value); // X || Y || Z value

        sensor.value = sensor.resources[resource];
      } else if (resource === 5537 || resource === 5538) {
        sensor.resources[resource] = Number(value); // transition / remaining time in s
      } else if (resource === 5603 || resource === 5604) {
        sensor.resources[resource] = Number(value); // min || max range
      } else if (resource === 5605) {
        sensor.resources[resource] = value; // reset min/max event
      } else if (resource === 5508 || resource === 5509 || resource === 5510 || resource === 5511 || resource === 5512 || resource === 5512) {
        sensor.resources[resource] = Number(value); // min || max - X || Y || Z
      } else if (resource === 5701) {
        sensor.resources[resource] = value; // unit
      } else if (resource === 5750) {
        sensor.resources[resource] = value; // app name
      }

      break;

    case 3335:
      // color sensor
      if (resource === 5706) {
        sensor.resources[resource] = value; // color
      } else if (resource === 5701) {
        sensor.resources[resource] = value; // unit
      } else if (resource === 5750) {
        sensor.resources[resource] = value; // app_name
      }

      sensor.value = sensor.resources['5706'];
      break;

    case 3336:
      // location
      if (resource === 5514 || resources === 5515) {
        sensor.resources[resource] = value; // lat || lng
      } else if (resource === 5516) {
        sensor.resources[resource] = value; // uncertainity in meters
      } else if (resource === 5705) {
        sensor.resources[resource] = Number(value); // compass direction 0  -360°
      } else if (resource === 5518) {
        sensor.resources[resource] = new Date(); // timestamp
      } else if (resource === 5750) {
        sensor.resources[resource] = value; // app_name
      }

      sensor.value = [sensor.resources['5514'], sensor.resources['5515']];
      break;

    case 3337:
      // positioner
      if (resource === 5536) {
        sensor.resources[resource] = Number(value); // current position 0-100 %

        sensor.value = sensor.resources[resource];
      } else if (resource === 5537 || resource === 5538) {
        sensor.resources[resource] = Number(value); // transition / remaining time in s
      } else if (resource === 5601 || resource === 5602) {
        sensor.resources[resource] = Number(value); // min || max measured value
      } else if (resource === 5605) {
        sensor.resources[resource] = value; // reset min/max event
      } else if (resource === 5519 || resource === 5520) {
        sensor.resources[resource] = Number(value); // min || max measuring limit
      } else if (resource === 5750) {
        sensor.resources[resource] = value; // app name
      }

      break;

    case 3339:
      // audio clip
      if (resource === 5522) {
        sensor.resources[resource] = Buffer.from(value);
        sensor.value = sensor.resources[resource];
      } else if (resource === 5523) {
        sensor.resources[resource] = value; // Trigger
      } else if (resource === 5548) {
        sensor.resources[resource] = Number(value); // volume %
      } else if (resource === 5524) {
        sensor.resources[resource] = Number(value); // duration s
      } else if (resource === 5750) {
        sensor.resources[resource] = value; // app_name
      }

      break;

    case 3340:
      // timer
      if (resource === 5826) {
        sensor.resources[resource] = Number(value); // timer mode 0-4
      } else if (resource === 5521 || resource === 5525) {
        sensor.resources[resource] = Number(value); // delay duration seconds || miniumum offtime seconds
      } else if (resource === 5523) {
        sensor.resources[resource] = value; // event trigger
      } else if (resource === 5534) {
        sensor.resources[resource] = Number(value); // timer counter
      } else if (resource === 5850) {
        sensor.resources[resource] = Number(value);
      } else if (resource === 5750) {
        sensor.resources[resource] = value; // app_name
      } // if (sensor.resources["5826"] > 0) {
      //   sensor.resources["5521"] = "15"; // delay duration seconds
      // } // timer mode
      // if (sensor.resources["5826"] > 1) {
      //   sensor.resources["5525"] = "15"; //  miniumum offtime seconds
      // }


      break;

    case 3341:
      // text display
      if (resource === 5527) {
        sensor.resources[resource] = value;
      } else if (resource === 5528) {
        sensor.resources[resource] = Number(value); // X
      } else if (resource === 5529) {
        sensor.resources[resource] = Number(value); // Y
      } else if (resource === 5545) {
        sensor.resources[resource] = Number(value); //  Max X
      } else if (resource === 5546) {
        sensor.resources[resource] = Number(value); // Max Y
      } else if (resource === 5530) {
        sensor.resources[resource] = value; // clear display event
      } else if (resource === 5548 || resources === 5531) {
        sensor.resources[resource] = Number(value); // brightness || contrast level
      } else if (resource === 5750) {
        sensor.resources[resource] = value; // app_name
      }

      sensor.value = sensor.resources[resource];
      break;

    case 3342:
      // switch
      if (resource === 5500) {
        if (value) {
          sensor.resources['5501'] = sensor.resources['5501'] + 1; // counter

          if (sensor.resources['5852'] === 0) {
            sensor.resources['5852'] = new Date();
          } else {
            sensor.resources['5852'] = sensor.resources['5852'] - new Date();
          }
        } else {
          sensor.resources['5501'] = 0;

          if (sensor.resources['5854'] === 0) {
            sensor.resources['5854'] = new Date();
          } else {
            sensor.resources['5854'] = sensor.resources['5854'] - new Date();
          }
        }

        sensor.resources['5500'] = Boolean(value);
        sensor.value = Number(sensor.resources['5500']);
      } else if (resource === 5750) {
        sensor.resources[resource] = value; // app_name
      }

      break;

    case 3343:
      // dimmer
      if (resource === 5548) {
        sensor.resources['5548'] = value;

        if (sensor.resources['5548'] > 0) {
          if (sensor.resources['5852'] === 0) {
            sensor.resources['5852'] = new Date();
          } else {
            sensor.resources['5852'] = sensor.resources['5852'] - new Date();
          }
        } else if (sensor.resources['5548'] === 0) {
          if (sensor.resources['5854'] === 0) sensor.resources['5854'] = new Date();else sensor.resources['5854'] = sensor.resources['5854'] - new Date();
        }

        sensor.value = sensor.resources['5548'];
      }

      break;

    case 3344:
      // up/down control
      if (resource === 5532) {
        //todo check resource type
        sensor.resources['5542'] = 0;
        sensor.resources['5541'] = sensor.resources['5541'] + 1;
        sensor.value = sensor.resources['5541'];
      } else if (resource === 5533) {
        sensor.resources['5541'] = 0;
        sensor.resources['5542'] = sensor.resources['5542'] + 1;
        sensor.value = -sensor.resources['5542'];
      } else if (resource === 5750) {
        sensor.resources[resource] = value; // app_name
      }

      break;

    case 3345:
      // joystick
      if (resource === 5702 || resource === 5703 || resource === 5704) {
        sensor.resources[resource] = Number(value); // X || Y || Z

        sensor.value = sensor.resources[resource];
      } else if (resource === 5500) {
        sensor.resources[resource] = Boolean(value); // input state

        if (value) {
          sensor.resources['5501'] = sensor.resources['5501'] + 1; // counter
        } else {
          sensor.resources['5501'] = 0; // counter
        }
      } else if (resource === 5501) {
        sensor.resources[resource] = Number(value); // counter
      } else if (resource === 5750) {
        sensor.resources[resource] = value; // app name
      }

      break;

    case 3347:
      // push button
      if (resource === 5500) {
        sensor.resources['5500'] = Boolean(value); // input value

        if (value) {
          sensor.resources['5501'] = sensor.resources['5501'] + 1; // counter
        } else {
          sensor.resources['5501'] = 0;
        }
      } else if (resource === 5750) {
        sensor.resources[resource] = value; // app name
      }

      break;

    case 3349:
      // bitmap
      if (resource === 5911) {
        sensor.resources[resource] = value; // bitmap input reset
      } else if (resource === 5912) {
        sensor.resources[resource] = value; // element description
      } else if (resource === 5910) {
        counter += 1;

        if (!value.length) {
          return false;
        }

        sensor.resources[resource] = Buffer.from(value); // buffer input

        sensor.value = Uint8Array.from(value).buffer; //  sensor.buffer = value;
      } else if (resource === 5750) {
        sensor.resources[resource] = value; // app name
      }

      break;

    case 3350:
      // stopwatch
      if (resource === 5544) {
        sensor.resources[resource] = Number(value); // cumulative time in s- 0  = reset

        sensor.value = sensor.resources[resource];
      } else if (resource === 5850) {
        sensor.resources[resource] = Boolean(value);

        if (value) {
          sensor.resources['5501'] = sensor.resources['5501'] + 1;
        } else {
          sensor.resources['5501'] = 0;
        }
      } else if (resource === 5750) {
        sensor.resources[resource] = value; // app name
      }

      break;

    default:
      // CATCH 3301 until 3305 - 3315 - 3316 until 3330 - 3346
      if (resource === 5700) {
        sensor.resources[resource] = Number(value);
        sensor.value = sensor.resources[resource];
      } else if (resource === 5701) {
        sensor.resources[resource] = value; // units
      } else if (resource === 5601 || resource === 5602) {
        sensor.resources[resource] = Number(value); // min || max measured range
      } else if (resource === 5603 || resource === 5604) {
        sensor.resources[resource] = Number(value); // min || max range
      } else if (resource === 5605) {
        sensor.resources[resource] = value; //reset min/max event
      } else if (resource === 5821) {
        sensor.resources[resource] = Number(value); // current calibration
      } else if (resource === 5750 || resource === 5751) {
        sensor.resources[resource] = value; // app_name || sensor type
      } else {
        console.log('READ ONLY'); //  sensor.value = sensor.resources["5700"];
        // sensor.resources[resource] = value;
      }

  }

  sensor.resource = resource;
  return sensor;
};

module.exports = {
  protocolPatterns: protocolPatterns,
  mySensorsApi: mySensorsApi,
  omaObjects: omaObjects,
  omaResources: omaResources,
  omaViews: omaViews,
  patternDetector: patternDetector,
  mySensorsDecoder: mySensorsDecoder,
  aloesLightDecoder: aloesLightDecoder,
  aloesClientDecoder: aloesClientDecoder,
  publish: publish,
  subscribe: subscribe,
  publishToNative: publishToNative,
  updateAloesSensors: updateAloesSensors
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("b639").Buffer))

/***/ }),

/***/ "f605":
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),

/***/ "fab2":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("7726").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var i
  if ((i = window.document.currentScript) && (i = i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"66eeb948-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./build-utils/global-vue-loader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/SensorCamera.vue?vue&type=template&id=1a91c98f&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.updatedSensor.type && _vm.updatedSensor.type === 3349)?_c('svg',{staticClass:"sensor-camera",attrs:{"height":_vm.updatedHeight,"width":_vm.updatedWidth,"xmlns":"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","viewBox":_vm.viewBox}},[_c('text',{staticClass:"sensor-title",attrs:{"transform":("translate(" + (_vm.updatedWidth / 2) + ", " + (_vm.updatedHeight / 10) + ")"),"text-anchor":"middle","x":"0"},on:{"click":function($event){_vm.flipSide(!_vm.aSide)}}},[_vm._v("\n    "+_vm._s(_vm.updatedSensor.name)+"\n  ")]),_c('circle',{staticClass:"delete-button",attrs:{"transform":("translate(" + (_vm.updatedWidth / 1.2) + ", " + (_vm.updatedHeight / 10) + ")"),"r":("" + (_vm.updatedWidth / 15))},on:{"click":function($event){_vm.deleteSensor(_vm.updatedSensor)}}}),_c('circle',{staticClass:"stream-button",attrs:{"transform":("translate(" + (_vm.updatedWidth / 7) + ", " + (_vm.updatedHeight / 10) + ")"),"r":_vm.updatedWidth / 15},on:{"click":function($event){_vm.updateSensor(_vm.updatedSensor, 5911, !_vm.updatedSensor.resources['5911'])}}}),_c('image',_vm._b({directives:[{name:"show",rawName:"v-show",value:(!_vm.imageUrl || _vm.imageUrl === null),expression:"!imageUrl || imageUrl === null"}],staticClass:"sensor-icon",attrs:{"transform":("translate(" + (_vm.updatedWidth / 4) + ", " + (_vm.updatedHeight / 4) + ")"),"height":_vm.updatedHeight / 2,"width":_vm.updatedWidth / 2}},'image',{ 'xlink:href': _vm.updatedSensor.icons[0] },false)),_c('image',_vm._b({directives:[{name:"show",rawName:"v-show",value:(_vm.imageUrl && _vm.imageUrl !== null),expression:"imageUrl && imageUrl !== null"}],ref:("streamViewer-" + (_vm.updatedSensor.id)),staticClass:"stream-viewer",attrs:{"transform":("translate(" + (_vm.updatedWidth / 8) + ", " + (_vm.updatedHeight / 4) + ")"),"height":_vm.updatedHeight / 1.6,"width":_vm.updatedWidth / 1.4}},'image',{ 'xlink:href': _vm.imageUrl },false))]):_vm._e()}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/SensorCamera.vue?vue&type=template&id=1a91c98f&

// EXTERNAL MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./build-utils/global-vue-loader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/SensorCamera.vue?vue&type=script&lang=js&
var SensorCameravue_type_script_lang_js_ = __webpack_require__("3218");

// CONCATENATED MODULE: ./src/SensorCamera.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_SensorCameravue_type_script_lang_js_ = (SensorCameravue_type_script_lang_js_["a" /* default */]); 
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/SensorCamera.vue





/* normalize component */

var SensorCamera_component = normalizeComponent(
  src_SensorCameravue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('SensorCamera', SensorCamera_component.exports)
}
/* harmony default export */ var SensorCamera = (SensorCamera_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"66eeb948-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./build-utils/global-vue-loader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/SensorGauge.vue?vue&type=template&id=07b9f6d9&lang=html&
var SensorGaugevue_type_template_id_07b9f6d9_lang_html_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.updatedSensor.type && _vm.hasRightType(_vm.updatedSensor.type))?_c('svg',{ref:("gaugeContainer-" + (_vm.updatedSensor.id)),class:("sensor-gauge " + _vm.gaugeClass),attrs:{"viewBox":_vm.viewBox,"height":_vm.updatedHeight,"width":_vm.updatedWidth,"xmlns":"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"}},[_c('text',{staticClass:"sensor-title",attrs:{"transform":("translate(" + (_vm.updatedWidth / 2) + ", " + (_vm.updatedHeight / 10) + ")"),"text-anchor":"middle","x":"0"},on:{"click":function($event){_vm.flipSide(!_vm.aSide)}}},[_vm._v("\n    "+_vm._s(_vm.updatedSensor.name)+"\n  ")]),_c('circle',{staticClass:"delete-button",attrs:{"transform":("translate(" + (_vm.updatedWidth / 1.2) + ", " + (_vm.updatedHeight / 10) + ")"),"r":("" + (_vm.updatedWidth / 15))},on:{"click":function($event){_vm.deleteSensor(_vm.updatedSensor)}}}),_c('path',{ref:("dialContainer-" + (_vm.updatedSensor.id)),class:("dial " + _vm.dialClass),attrs:{"fill":"none","stroke":"","d":_vm.dialContainerPath}}),_c('text',{ref:("valueTextContainer-" + (_vm.updatedSensor.id)),class:("value-text " + _vm.valueTextClass),attrs:{"id":("valueTextContainer-" + (_vm.updatedSensor.id)),"x":_vm.centerX,"y":_vm.centerY,"fill":"#999"}}),_c('path',{ref:("valueDialContainer-" + (_vm.updatedSensor.id)),class:("value " + _vm.valueDialClass),attrs:{"d":_vm.valueDialContainerPath}}),_c('g',{attrs:{"transform":("translate(" + (_vm.updatedWidth / 2.5) + ", " + (_vm.updatedHeight / 8) + ")")},on:{"click":function($event){_vm.updatedSensor.resources['5650']
        ? _vm.updateSensor(_vm.updatedSensor, 5650, _vm.updatedSensor.resources['5650'])
        : null}}},[_c('image',_vm._b({staticClass:"sensor-icon",attrs:{"transform":("translate(0, " + (_vm.updatedHeight / 8) + ")"),"height":("" + (_vm.updatedHeight / 5.3)),"width":("" + (_vm.updatedWidth / 5))}},'image',{ 'xlink:href': _vm.updatedSensor.icons[0] },false)),(_vm.displayNeedle)?_c('g',{attrs:{"transform":("rotate(" + _vm.value + " " + (_vm.updatedWidth / 2) + " " + (_vm.updatedHeight / 2) + ")")}},[_c('image',_vm._b({ref:("gaugeNeedle-" + (_vm.updatedSensor.id)),staticClass:"meter-needle",attrs:{"transform":("translate(0, " + (_vm.updatedHeight / 8) + ")"),"height":("" + (_vm.updatedHeight / 2.28)),"width":("" + (_vm.updatedWidth / 7.5))}},'image',{ 'xlink:href': _vm.gaugeNeedle },false))]):_vm._e(),_c('text',{staticClass:"sensor-resources",attrs:{"transform":("translate(" + (_vm.updatedWidth / 10) + ", " + (_vm.updatedHeight / 1.8) + ")")}},[_c('tspan',{attrs:{"x":"0","y":("" + (_vm.updatedHeight / 10))}},[_vm._v("\n        Min range : "+_vm._s(_vm.minRangeValue)+"\n      ")]),_c('tspan',{attrs:{"x":"0","y":("" + ((_vm.updatedHeight / 10) * 1.4))}},[_vm._v("\n        Max range : "+_vm._s(_vm.maxRangeValue)+"\n      ")]),_c('tspan',{attrs:{"x":"0","y":("" + ((_vm.updatedHeight / 10) * 1.8))}},[_vm._v("\n        Min measurment : "+_vm._s(_vm.minMeasuredValue)+"\n      ")]),_c('tspan',{attrs:{"x":"0","y":("" + ((_vm.updatedHeight / 10) * 2.2))}},[_vm._v("\n        Max measurment : "+_vm._s(_vm.maxMeasuredValue)+"\n      ")]),_c('tspan',{attrs:{"x":"0","y":("" + ((_vm.updatedHeight / 10) * 2.5))}},[_vm._v("\n        Unit : "+_vm._s(_vm.resourceUnit)+"\n      ")])])])]):_vm._e()}
var SensorGaugevue_type_template_id_07b9f6d9_lang_html_staticRenderFns = []


// CONCATENATED MODULE: ./src/SensorGauge.vue?vue&type=template&id=07b9f6d9&lang=html&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.find.js
var es6_array_find = __webpack_require__("7514");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.constructor.js
var es6_number_constructor = __webpack_require__("c5f6");

// EXTERNAL MODULE: ./src/assets/components-list.json
var components_list = __webpack_require__("b277");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./build-utils/global-vue-loader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/SensorGauge.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* eslint-disable no-console */


if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('SensorGauge', component.exports);
}

/* harmony default export */ var SensorGaugevue_type_script_lang_js_ = ({
  name: 'SensorGauge',
  props: {
    sensor: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      default: 150
    },
    height: {
      type: Number,
      default: 140
    },
    startAngle: {
      type: Number,
      default: 135
    },
    endAngle: {
      type: Number,
      default: 45
    },
    valueDialClass: {
      type: String,
      default: 'value'
    },
    valueTextClass: {
      type: String,
      default: 'value-text'
    },
    dialClass: {
      type: String,
      default: 'dial'
    },
    gaugeClass: {
      type: String,
      default: 'sensor-gauge'
    }
  },
  data: function data() {
    return {
      updatedSensor: null,
      updatedWidth: null,
      updatedHeight: null,
      aSide: true,
      previousValue: 0,
      gaugeNeedle: '/icons/aloes/meter-gauge-needle.svg',
      displayValue: true,
      displayNeedle: false,
      gaugeColor: true,
      requestAnimationFrame: function requestAnimationFrame(cb) {
        return setTimeout(cb, 1000 / 60);
      }
    };
  },
  computed: {
    viewBox: function viewBox() {
      return "0 0 ".concat(this.updatedWidth, " ").concat(this.updatedHeight);
    },
    radius: function radius() {
      return Number(this.updatedWidth) / 2.5;
    },
    centerX: function centerX() {
      return this.updatedWidth / 2;
    },
    centerY: function centerY() {
      return this.updatedHeight / 1.8;
    },
    minMeasuredValue: {
      get: function get() {
        if (!this.updatedSensor.resources['5601']) return null;
        return this.updatedSensor.resources['5601'];
      },
      set: function set(value) {
        this.updatedSensor.resources['5601'] = Number(value);
      }
    },
    maxMeasuredValue: {
      get: function get() {
        if (!this.updatedSensor.resources['5602']) return null;
        return this.updatedSensor.resources['5602'];
      },
      set: function set(value) {
        this.updatedSensor.resources['5602'] = Number(value);
      }
    },
    minRangeValue: {
      get: function get() {
        if (!this.updatedSensor.resources['5603']) return 0;
        return this.updatedSensor.resources['5603'];
      },
      set: function set(value) {
        this.updatedSensor.resources['5603'] = Number(value);
      }
    },
    maxRangeValue: {
      get: function get() {
        if (!this.updatedSensor.resources['5604']) return 100;
        return this.updatedSensor.resources['5604'];
      },
      set: function set(value) {
        this.updatedSensor.resources['5604'] = Number(value);
      }
    },
    mainResourceId: function mainResourceId() {
      if (this.updatedSensor.type === 3202) return '5600';
      if (this.updatedSensor.type === 3203) return '5650';
      return '5700';
    },
    resourceUnit: function resourceUnit() {
      return this.updatedSensor.resources['5701'];
    },
    dialContainerPath: function dialContainerPath() {
      return this.pathString(this.radius, this.startAngle, this.endAngle, this.flag());
    },
    valueDialContainerPath: function valueDialContainerPath() {
      return this.pathString(this.radius, this.startAngle, this.startAngle);
    },
    value: {
      get: function get() {
        return this.updatedSensor.resources[this.mainResourceId]; //  return this.normalize(this.value, this.minRangeValue, this.maxRangeValue);
      },
      set: function set(value) {
        if (value < this.minMeasuredValue) {
          this.minMeasuredValue = value;
        } else if (value > this.maxMeasuredValue) {
          this.maxMeasuredValue = value;
        }

        this.updatedSensor.resources[this.mainResourceId] = this.normalize(value, this.minRangeValue, this.maxRangeValue);
      }
    },
    valueInPercentage: function valueInPercentage() {
      return this.getValueInPercentage(this.value, this.minRangeValue, this.maxRangeValue);
    }
  },
  watch: {
    sensor: {
      handler: function handler(sensor) {
        this.updatedSensor = JSON.parse(sensor);
      },
      immediate: true
    },
    width: {
      handler: function handler(width) {
        this.updatedWidth = width;
      },
      immediate: true
    },
    height: {
      handler: function handler(height) {
        this.updatedHeight = height;
      },
      immediate: true
    },
    value: {
      handler: function handler(value) {
        console.log(value);
        if (!value || value === null) value = 0; // if (value === this.value) {
        //   return;
        // }

        this.setValueAnimated(value);
        this.previousValue = value;
      },
      immediate: true
    }
  },
  mounted: function mounted() {
    console.log('sensor-gauge mounted()', this.updatedSensor, this.value);
    this.elementsMounted = false;

    if (this.startAngle < this.endAngle) {
      var tmp = this.startAngle;
      this.startAngle = this.endAngle;
      this.endAngle = tmp;
    }

    if (this.hasRightType(this.updatedSensor.type)) {
      this.mountElements();
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.elementsMounted = false;
  },
  methods: {
    hasRightType: function hasRightType(type) {
      return components_list.gauge.list.find(function (objectId) {
        return objectId === type;
      });
    },
    updateSensor: function updateSensor() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this.$emit.apply(this, ['update-sensor'].concat(args));
    },
    deleteSensor: function deleteSensor() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      this.$emit.apply(this, ['delete-sensor'].concat(args));
    },
    flipSide: function flipSide(value) {
      this.$emit('flip-side', value);
    },
    mountElements: function mountElements() {
      this.gaugeElement = this.$refs["gaugeContainer-".concat(this.updatedSensor.id)];
      this.gaugeValuePath = this.$refs["valueDialContainer-".concat(this.updatedSensor.id)];
      this.gaugeValueElem = this.$refs["valueTextContainer-".concat(this.updatedSensor.id)];
      this.elementsMounted = true;
    },
    label: function label(val) {
      if (!val || val === null) val = 0;
      return Math.round(val);
    },
    flag: function flag(val) {
      if (!val || val === null) val = 0;
      return this.angle(val) <= 180 ? 0 : 1;
    },
    angle: function angle(val) {
      if (!val || val === null) val = 100;
      return this.getAngle(val, 360 - Math.abs(this.startAngle - this.endAngle));
    },
    easeInOutCubic: function easeInOutCubic(pos) {
      // https://github.com/danro/easing-js/blob/master/easing.js
      if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 3);
      return 0.5 * (Math.pow(pos - 2, 3) + 2);
    },
    Animation: function Animation(options) {
      var _this = this;

      var duration = options.duration;
      var currentIteration = 1;
      var iterations = 60 * duration;
      var start = options.start || 0;
      var end = options.end;
      var change = end - start;
      var step = options.step;
      var easing = options.easing || this.easeInOutCubic;

      var animate = function animate() {
        var progress = currentIteration / iterations;
        var value = change * easing(progress) + start; // console.log(progress + ", " + value);

        step(value, currentIteration);
        currentIteration += 1;

        if (progress < 1) {
          _this.requestAnimationFrame(animate);
        }
      };

      this.requestAnimationFrame(animate);
    },
    normalize: function normalize(value, min, limit) {
      var val = Number(value);
      if (val > limit) return limit;
      if (val < min) return min;
      return val;
    },
    getAngle: function getAngle(percentage, gaugeSpanAngle) {
      return percentage * gaugeSpanAngle / 100;
    },
    getValueInPercentage: function getValueInPercentage(value, min, max) {
      var newMax = max - min;
      var newVal = value - min;
      return 100 * newVal / newMax; // var absMin = Math.abs(min);
      // return 100 * (absMin + value) / (max + absMin);
    },
    getCartesian: function getCartesian(cx, cy, radius, angle) {
      var rad = angle * Math.PI / 180;
      return {
        x: Math.round((cx + radius * Math.cos(rad)) * 1000) / 1000,
        y: Math.round((cy + radius * Math.sin(rad)) * 1000) / 1000
      };
    },
    getDialCoords: function getDialCoords(radius, startAngle, endAngle) {
      var cx = this.centerX;
      var cy = this.centerY;
      return {
        end: this.getCartesian(cx, cy, radius, endAngle),
        start: this.getCartesian(cx, cy, radius, startAngle)
      };
    },
    pathString: function pathString(radius, startAngle, endAngle, largeArc) {
      var coords = this.getDialCoords(radius, startAngle, endAngle);
      var start = coords.start;
      var end = coords.end;
      var largeArcFlag = typeof largeArc === 'undefined' ? 1 : largeArc;
      return ['M', start.x, start.y, 'A', this.radius, this.radius, 0, largeArcFlag, 1, end.x, end.y].join(' ');
    },
    setGaugeColor: function setGaugeColor(value, duration) {
      if (!this.elementsMounted) return null;
      var c = this.gaugeColor;

      if (value < this.minRangeValue) {
        c = components_list.gauge.colors.secondaryColor;
      } else if (value < this.maxRangeValue + this.minRangeValue / 2) {
        c = components_list.gauge.colors.successColor;
      } else if (value < this.maxRangeValue) {
        c = components_list.gauge.colors.warningColor;
      } else {
        c = components_list.gauge.colors.dangerColor;
      }

      var dur = duration * 1000;
      var pathTransition = "stroke ".concat(dur, " ms ease");
      var textTransition = "fill ".concat(dur, " ms ease");
      this.gaugeValuePath.style = ["stroke: ".concat(c), "-webkit-transition: ".concat(pathTransition), "-moz-transition: ".concat(pathTransition), "transition: ".concat(pathTransition)].join(';');
      this.gaugeValueElem.style = ["fill: ".concat(c), "-webkit-transition: ".concat(textTransition), "-moz-transition: ".concat(textTransition), "transition: ".concat(textTransition)].join(';');
    },
    updateValue: function updateValue(value) {
      this.value = value;

      if (this.gaugeColor) {
        this.setGaugeColor(this.value, 0);
      }

      this.updateGauge(this.value);
    },
    setValueAnimated: function setValueAnimated(value, duration) {
      var _this2 = this;

      if (this.previousValue === this.value) {
        return;
      }

      if (this.gaugeColor) {
        this.setGaugeColor(this.value, duration);
      }

      this.Animation({
        start: this.previousValue || 0,
        end: this.value,
        duration: duration || 1,
        step: function step(val, frame) {
          _this2.updateGauge(val, frame);
        }
      });
    },
    updateGauge: function updateGauge(theValue) {
      if (!this.elementsMounted) return null; // this is because we are using arc greater than 180deg

      var value = this.getValueInPercentage(theValue, this.minRangeValue, this.maxRangeValue);

      if (this.displayValue) {
        this.gaugeValueElem.textContent = this.label(theValue);
      }

      if (this.value > this.maxRangeValue) return;
      if (this.value < this.minRangeValue) return;
      this.gaugeValuePath.setAttribute('d', this.pathString(this.radius, this.startAngle, this.angle(value) + this.startAngle, this.flag(value)));
    }
  }
});
// CONCATENATED MODULE: ./src/SensorGauge.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_SensorGaugevue_type_script_lang_js_ = (SensorGaugevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/SensorGauge.vue





/* normalize component */

var SensorGauge_component = normalizeComponent(
  src_SensorGaugevue_type_script_lang_js_,
  SensorGaugevue_type_template_id_07b9f6d9_lang_html_render,
  SensorGaugevue_type_template_id_07b9f6d9_lang_html_staticRenderFns,
  false,
  null,
  null,
  null
  
)

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('SensorGauge', SensorGauge_component.exports)
}
/* harmony default export */ var SensorGauge = (SensorGauge_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"66eeb948-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./build-utils/global-vue-loader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/SensorLevel.vue?vue&type=template&id=0c6c12b0&
var SensorLevelvue_type_template_id_0c6c12b0_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.hasRightType(_vm.updatedSensor.type))?_c('svg',{ref:("rangeWrapper-" + (_vm.updatedSensor.id)),staticClass:"sensor-level",attrs:{"width":_vm.updatedWidth,"height":_vm.updatedHeight,"viewBox":_vm.viewBox,"xmlns":"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"}},[_c('text',{staticClass:"sensor-title",attrs:{"transform":("translate(" + (_vm.updatedWidth / 2) + ", " + (_vm.updatedHeight / 10) + ")"),"text-anchor":"middle","x":"0"},on:{"click":function($event){_vm.flipSide(!_vm.aSide)}}},[_vm._v("\n    "+_vm._s(_vm.updatedSensor.name)+"\n  ")]),_c('circle',{staticClass:"delete-button",attrs:{"transform":("translate(" + (_vm.updatedWidth / 1.2) + ", " + (_vm.updatedHeight / 10) + ")"),"r":("" + (_vm.updatedWidth / 15))},on:{"click":function($event){_vm.deleteSensor(_vm.updatedSensor)}}}),_c('g',{attrs:{"transform":("translate(0, " + (_vm.updatedHeight / 4.8) + ")")}},[_c('defs',[_c('symbol',{attrs:{"id":("rangeMarks-" + (_vm.updatedSensor.id)),"shape-rendering":"crispEdges"}},_vm._l((_vm.gradients),function(gradient){return _c('path',{key:gradient.pos,staticClass:"range-marks-path",attrs:{"d":("M " + (_vm.updatedWidth / gradient.margin) + " " + (_vm.gradientHeight(
              gradient.pos
            )) + " l " + (_vm.updatedWidth / gradient.width) + " 0")}})}),0),_c('clipPath',{ref:("rangeSliderClipPath-" + (_vm.updatedSensor.id)),attrs:{"id":("rangeSliderClipPath-" + (_vm.updatedSensor.id)),"x":"0","y":"0"}},[_c('path',{staticClass:"range-slider-path",attrs:{"d":_vm.newPath}})])]),_c('use',_vm._b({staticClass:"range-marks-colored"},'use',{ 'xlink:href': ("#rangeMarks-" + (_vm.updatedSensor.id)) },false)),_c('path',{staticClass:"range-slider-path",attrs:{"d":_vm.newPath}}),_c('use',_vm._b({staticClass:"range-marks-white",attrs:{"clip-path":("url(#rangeSliderClipPath-" + (_vm.updatedSensor.id) + ")")}},'use',{ 'xlink:href': ("#rangeMarks-" + (_vm.updatedSensor.id)) },false))]),_c('g',{ref:("rangeValues-" + (_vm.updatedSensor.id)),staticClass:"range-values",attrs:{"transfrom":("translateY(" + (_vm.rangeHeight - _vm.currentY) + "px)")}},[_c('text',{ref:("rangeValueTop-" + (_vm.updatedSensor.id)),staticClass:"range-value range-value--top",attrs:{"transform":("scale(" + (1 - _vm.scale) + ")"),"y":_vm.updatedHeight / 5.5}},[_c('tspan',{staticClass:"range-value-number range-value-number--top"}),_c('tspan',{staticClass:"range-value-text range-value-text--top"},[_c('tspan',[_vm._v(_vm._s(_vm.rangeMax - _vm.value))])])]),_c('text',{ref:("rangeValueBottom-" + (_vm.updatedSensor.id)),staticClass:"rang-value range-value--bottom",attrs:{"transform":("scale(" + (1 - (_vm.scaleMax - _vm.scale)) + ")"),"y":_vm.updatedHeight / 3.5}},[_c('tspan',{staticClass:"range-value-number range-value-number--bottom"}),_c('tspan',{staticClass:"range-value-text range-value-text--bottom"},[_c('tspan',[_vm._v(_vm._s(_vm.value))])])])])]):_vm._e()}
var SensorLevelvue_type_template_id_0c6c12b0_staticRenderFns = []


// CONCATENATED MODULE: ./src/SensorLevel.vue?vue&type=template&id=0c6c12b0&

// CONCATENATED MODULE: ./node_modules/animejs/lib/anime.es.js
/*
 * anime.js v3.0.1
 * (c) 2019 Julian Garnier
 * Released under the MIT license
 * animejs.com
 */

// Defaults

var defaultInstanceSettings = {
  update: null,
  begin: null,
  loopBegin: null,
  changeBegin: null,
  change: null,
  changeComplete: null,
  loopComplete: null,
  complete: null,
  loop: 1,
  direction: 'normal',
  autoplay: true,
  timelineOffset: 0
};

var defaultTweenSettings = {
  duration: 1000,
  delay: 0,
  endDelay: 0,
  easing: 'easeOutElastic(1, .5)',
  round: 0
};

var validTransforms = ['translateX', 'translateY', 'translateZ', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scaleX', 'scaleY', 'scaleZ', 'skew', 'skewX', 'skewY', 'perspective'];

// Caching

var cache = {
  CSS: {},
  springs: {}
};

// Utils

function minMax(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

function stringContains(str, text) {
  return str.indexOf(text) > -1;
}

function applyArguments(func, args) {
  return func.apply(null, args);
}

var is = {
  arr: function (a) { return Array.isArray(a); },
  obj: function (a) { return stringContains(Object.prototype.toString.call(a), 'Object'); },
  pth: function (a) { return is.obj(a) && a.hasOwnProperty('totalLength'); },
  svg: function (a) { return a instanceof SVGElement; },
  inp: function (a) { return a instanceof HTMLInputElement; },
  dom: function (a) { return a.nodeType || is.svg(a); },
  str: function (a) { return typeof a === 'string'; },
  fnc: function (a) { return typeof a === 'function'; },
  und: function (a) { return typeof a === 'undefined'; },
  hex: function (a) { return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a); },
  rgb: function (a) { return /^rgb/.test(a); },
  hsl: function (a) { return /^hsl/.test(a); },
  col: function (a) { return (is.hex(a) || is.rgb(a) || is.hsl(a)); },
  key: function (a) { return !defaultInstanceSettings.hasOwnProperty(a) && !defaultTweenSettings.hasOwnProperty(a) && a !== 'targets' && a !== 'keyframes'; }
};

// Easings

function parseEasingParameters(string) {
  var match = /\(([^)]+)\)/.exec(string);
  return match ? match[1].split(',').map(function (p) { return parseFloat(p); }) : [];
}

// Spring solver inspired by Webkit Copyright © 2016 Apple Inc. All rights reserved. https://webkit.org/demos/spring/spring.js

function spring(string, duration) {

  var params = parseEasingParameters(string);
  var mass = minMax(is.und(params[0]) ? 1 : params[0], .1, 100);
  var stiffness = minMax(is.und(params[1]) ? 100 : params[1], .1, 100);
  var damping = minMax(is.und(params[2]) ? 10 : params[2], .1, 100);
  var velocity =  minMax(is.und(params[3]) ? 0 : params[3], .1, 100);
  var w0 = Math.sqrt(stiffness / mass);
  var zeta = damping / (2 * Math.sqrt(stiffness * mass));
  var wd = zeta < 1 ? w0 * Math.sqrt(1 - zeta * zeta) : 0;
  var a = 1;
  var b = zeta < 1 ? (zeta * w0 + -velocity) / wd : -velocity + w0;

  function solver(t) {
    var progress = duration ? (duration * t) / 1000 : t;
    if (zeta < 1) {
      progress = Math.exp(-progress * zeta * w0) * (a * Math.cos(wd * progress) + b * Math.sin(wd * progress));
    } else {
      progress = (a + b * progress) * Math.exp(-progress * w0);
    }
    if (t === 0 || t === 1) { return t; }
    return 1 - progress;
  }

  function getDuration() {
    var cached = cache.springs[string];
    if (cached) { return cached; }
    var frame = 1/6;
    var elapsed = 0;
    var rest = 0;
    while(true) {
      elapsed += frame;
      if (solver(elapsed) === 1) {
        rest++;
        if (rest >= 16) { break; }
      } else {
        rest = 0;
      }
    }
    var duration = elapsed * frame * 1000;
    cache.springs[string] = duration;
    return duration;
  }

  return duration ? solver : getDuration;

}

// Elastic easing adapted from jQueryUI http://api.jqueryui.com/easings/

function elastic(amplitude, period) {
  if ( amplitude === void 0 ) amplitude = 1;
  if ( period === void 0 ) period = .5;

  var a = minMax(amplitude, 1, 10);
  var p = minMax(period, .1, 2);
  return function (t) {
    return (t === 0 || t === 1) ? t : 
      -a * Math.pow(2, 10 * (t - 1)) * Math.sin((((t - 1) - (p / (Math.PI * 2) * Math.asin(1 / a))) * (Math.PI * 2)) / p);
  }
}

// Basic steps easing implementation https://developer.mozilla.org/fr/docs/Web/CSS/transition-timing-function

function steps(steps) {
  if ( steps === void 0 ) steps = 10;

  return function (t) { return Math.round(t * steps) * (1 / steps); };
}

// BezierEasing https://github.com/gre/bezier-easing

var bezier = (function () {

  var kSplineTableSize = 11;
  var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

  function A(aA1, aA2) { return 1.0 - 3.0 * aA2 + 3.0 * aA1 }
  function B(aA1, aA2) { return 3.0 * aA2 - 6.0 * aA1 }
  function C(aA1)      { return 3.0 * aA1 }

  function calcBezier(aT, aA1, aA2) { return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT }
  function getSlope(aT, aA1, aA2) { return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1) }

  function binarySubdivide(aX, aA, aB, mX1, mX2) {
    var currentX, currentT, i = 0;
    do {
      currentT = aA + (aB - aA) / 2.0;
      currentX = calcBezier(currentT, mX1, mX2) - aX;
      if (currentX > 0.0) { aB = currentT; } else { aA = currentT; }
    } while (Math.abs(currentX) > 0.0000001 && ++i < 10);
    return currentT;
  }

  function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
    for (var i = 0; i < 4; ++i) {
      var currentSlope = getSlope(aGuessT, mX1, mX2);
      if (currentSlope === 0.0) { return aGuessT; }
      var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
      aGuessT -= currentX / currentSlope;
    }
    return aGuessT;
  }

  function bezier(mX1, mY1, mX2, mY2) {

    if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) { return; }
    var sampleValues = new Float32Array(kSplineTableSize);

    if (mX1 !== mY1 || mX2 !== mY2) {
      for (var i = 0; i < kSplineTableSize; ++i) {
        sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
      }
    }

    function getTForX(aX) {

      var intervalStart = 0;
      var currentSample = 1;
      var lastSample = kSplineTableSize - 1;

      for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
        intervalStart += kSampleStepSize;
      }

      --currentSample;

      var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
      var guessForT = intervalStart + dist * kSampleStepSize;
      var initialSlope = getSlope(guessForT, mX1, mX2);

      if (initialSlope >= 0.001) {
        return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
      } else if (initialSlope === 0.0) {
        return guessForT;
      } else {
        return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
      }

    }

    return function (x) {
      if (mX1 === mY1 && mX2 === mY2) { return x; }
      if (x === 0 || x === 1) { return x; }
      return calcBezier(getTForX(x), mY1, mY2);
    }

  }

  return bezier;

})();

var penner = (function () {

  var names = ['Quad', 'Cubic', 'Quart', 'Quint', 'Sine', 'Expo', 'Circ', 'Back', 'Elastic'];

  // Approximated Penner equations http://matthewlein.com/ceaser/

  var curves = {
    In: [
      [0.550, 0.085, 0.680, 0.530], /* inQuad */
      [0.550, 0.055, 0.675, 0.190], /* inCubic */
      [0.895, 0.030, 0.685, 0.220], /* inQuart */
      [0.755, 0.050, 0.855, 0.060], /* inQuint */
      [0.470, 0.000, 0.745, 0.715], /* inSine */
      [0.950, 0.050, 0.795, 0.035], /* inExpo */
      [0.600, 0.040, 0.980, 0.335], /* inCirc */
      [0.600,-0.280, 0.735, 0.045], /* inBack */
      elastic /* inElastic */
    ],
    Out: [
      [0.250, 0.460, 0.450, 0.940], /* outQuad */
      [0.215, 0.610, 0.355, 1.000], /* outCubic */
      [0.165, 0.840, 0.440, 1.000], /* outQuart */
      [0.230, 1.000, 0.320, 1.000], /* outQuint */
      [0.390, 0.575, 0.565, 1.000], /* outSine */
      [0.190, 1.000, 0.220, 1.000], /* outExpo */
      [0.075, 0.820, 0.165, 1.000], /* outCirc */
      [0.175, 0.885, 0.320, 1.275], /* outBack */
      function (a, p) { return function (t) { return 1 - elastic(a, p)(1 - t); }; } /* outElastic */
    ],
    InOut: [
      [0.455, 0.030, 0.515, 0.955], /* inOutQuad */
      [0.645, 0.045, 0.355, 1.000], /* inOutCubic */
      [0.770, 0.000, 0.175, 1.000], /* inOutQuart */
      [0.860, 0.000, 0.070, 1.000], /* inOutQuint */
      [0.445, 0.050, 0.550, 0.950], /* inOutSine */
      [1.000, 0.000, 0.000, 1.000], /* inOutExpo */
      [0.785, 0.135, 0.150, 0.860], /* inOutCirc */
      [0.680,-0.550, 0.265, 1.550], /* inOutBack */
      function (a, p) { return function (t) { return t < .5 ? elastic(a, p)(t * 2) / 2 : 1 - elastic(a, p)(t * -2 + 2) / 2; }; } /* inOutElastic */
    ]
  };

  var eases = { 
    linear: [0.250, 0.250, 0.750, 0.750]
  };

  var loop = function ( coords ) {
    curves[coords].forEach(function (ease, i) {
      eases['ease'+coords+names[i]] = ease;
    });
  };

  for (var coords in curves) loop( coords );

  return eases;

})();

function parseEasings(easing, duration) {
  if (is.fnc(easing)) { return easing; }
  var name = easing.split('(')[0];
  var ease = penner[name];
  var args = parseEasingParameters(easing);
  switch (name) {
    case 'spring' : return spring(easing, duration);
    case 'cubicBezier' : return applyArguments(bezier, args);
    case 'steps' : return applyArguments(steps, args);
    default : return is.fnc(ease) ? applyArguments(ease, args) : applyArguments(bezier, ease);
  }
}

// Strings

function selectString(str) {
  try {
    var nodes = document.querySelectorAll(str);
    return nodes;
  } catch(e) {
    return;
  }
}

// Arrays

function filterArray(arr, callback) {
  var len = arr.length;
  var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
  var result = [];
  for (var i = 0; i < len; i++) {
    if (i in arr) {
      var val = arr[i];
      if (callback.call(thisArg, val, i, arr)) {
        result.push(val);
      }
    }
  }
  return result;
}

function flattenArray(arr) {
  return arr.reduce(function (a, b) { return a.concat(is.arr(b) ? flattenArray(b) : b); }, []);
}

function toArray(o) {
  if (is.arr(o)) { return o; }
  if (is.str(o)) { o = selectString(o) || o; }
  if (o instanceof NodeList || o instanceof HTMLCollection) { return [].slice.call(o); }
  return [o];
}

function arrayContains(arr, val) {
  return arr.some(function (a) { return a === val; });
}

// Objects

function cloneObject(o) {
  var clone = {};
  for (var p in o) { clone[p] = o[p]; }
  return clone;
}

function replaceObjectProps(o1, o2) {
  var o = cloneObject(o1);
  for (var p in o1) { o[p] = o2.hasOwnProperty(p) ? o2[p] : o1[p]; }
  return o;
}

function mergeObjects(o1, o2) {
  var o = cloneObject(o1);
  for (var p in o2) { o[p] = is.und(o1[p]) ? o2[p] : o1[p]; }
  return o;
}

// Colors

function rgbToRgba(rgbValue) {
  var rgb = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(rgbValue);
  return rgb ? ("rgba(" + (rgb[1]) + ",1)") : rgbValue;
}

function hexToRgba(hexValue) {
  var rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  var hex = hexValue.replace(rgx, function (m, r, g, b) { return r + r + g + g + b + b; } );
  var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  var r = parseInt(rgb[1], 16);
  var g = parseInt(rgb[2], 16);
  var b = parseInt(rgb[3], 16);
  return ("rgba(" + r + "," + g + "," + b + ",1)");
}

function hslToRgba(hslValue) {
  var hsl = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(hslValue) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(hslValue);
  var h = parseInt(hsl[1], 10) / 360;
  var s = parseInt(hsl[2], 10) / 100;
  var l = parseInt(hsl[3], 10) / 100;
  var a = hsl[4] || 1;
  function hue2rgb(p, q, t) {
    if (t < 0) { t += 1; }
    if (t > 1) { t -= 1; }
    if (t < 1/6) { return p + (q - p) * 6 * t; }
    if (t < 1/2) { return q; }
    if (t < 2/3) { return p + (q - p) * (2/3 - t) * 6; }
    return p;
  }
  var r, g, b;
  if (s == 0) {
    r = g = b = l;
  } else {
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return ("rgba(" + (r * 255) + "," + (g * 255) + "," + (b * 255) + "," + a + ")");
}

function colorToRgb(val) {
  if (is.rgb(val)) { return rgbToRgba(val); }
  if (is.hex(val)) { return hexToRgba(val); }
  if (is.hsl(val)) { return hslToRgba(val); }
}

// Units

function getUnit(val) {
  var split = /([\+\-]?[0-9#\.]+)(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(val);
  if (split) { return split[2]; }
}

function getTransformUnit(propName) {
  if (stringContains(propName, 'translate') || propName === 'perspective') { return 'px'; }
  if (stringContains(propName, 'rotate') || stringContains(propName, 'skew')) { return 'deg'; }
}

// Values

function getFunctionValue(val, animatable) {
  if (!is.fnc(val)) { return val; }
  return val(animatable.target, animatable.id, animatable.total);
}

function getAttribute(el, prop) {
  return el.getAttribute(prop);
}

function convertPxToUnit(el, value, unit) {
  var valueUnit = getUnit(value);
  if (arrayContains([unit, 'deg', 'rad', 'turn'], valueUnit)) { return value; }
  var cached = cache.CSS[value + unit];
  if (!is.und(cached)) { return cached; }
  var baseline = 100;
  var tempEl = document.createElement(el.tagName);
  var parentEl = (el.parentNode && (el.parentNode !== document)) ? el.parentNode : document.body;
  parentEl.appendChild(tempEl);
  tempEl.style.position = 'absolute';
  tempEl.style.width = baseline + unit;
  var factor = baseline / tempEl.offsetWidth;
  parentEl.removeChild(tempEl);
  var convertedUnit = factor * parseFloat(value);
  cache.CSS[value + unit] = convertedUnit;
  return convertedUnit;
}

function getCSSValue(el, prop, unit) {
  if (prop in el.style) {
    var uppercasePropName = prop.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    var value = el.style[prop] || getComputedStyle(el).getPropertyValue(uppercasePropName) || '0';
    return unit ? convertPxToUnit(el, value, unit) : value;
  }
}

function getAnimationType(el, prop) {
  if (is.dom(el) && !is.inp(el) && (getAttribute(el, prop) || (is.svg(el) && el[prop]))) { return 'attribute'; }
  if (is.dom(el) && arrayContains(validTransforms, prop)) { return 'transform'; }
  if (is.dom(el) && (prop !== 'transform' && getCSSValue(el, prop))) { return 'css'; }
  if (el[prop] != null) { return 'object'; }
}

function getElementTransforms(el) {
  if (!is.dom(el)) { return; }
  var str = el.style.transform || '';
  var reg  = /(\w+)\(([^)]*)\)/g;
  var transforms = new Map();
  var m; while (m = reg.exec(str)) { transforms.set(m[1], m[2]); }
  return transforms;
}

function getTransformValue(el, propName, animatable, unit) {
  var defaultVal = stringContains(propName, 'scale') ? 1 : 0 + getTransformUnit(propName);
  var value = getElementTransforms(el).get(propName) || defaultVal;
  if (animatable) {
    animatable.transforms.list.set(propName, value);
    animatable.transforms['last'] = propName;
  }
  return unit ? convertPxToUnit(el, value, unit) : value;
}

function getOriginalTargetValue(target, propName, unit, animatable) {
  switch (getAnimationType(target, propName)) {
    case 'transform': return getTransformValue(target, propName, animatable, unit);
    case 'css': return getCSSValue(target, propName, unit);
    case 'attribute': return getAttribute(target, propName);
    default: return target[propName] || 0;
  }
}

function getRelativeValue(to, from) {
  var operator = /^(\*=|\+=|-=)/.exec(to);
  if (!operator) { return to; }
  var u = getUnit(to) || 0;
  var x = parseFloat(from);
  var y = parseFloat(to.replace(operator[0], ''));
  switch (operator[0][0]) {
    case '+': return x + y + u;
    case '-': return x - y + u;
    case '*': return x * y + u;
  }
}

function validateValue(val, unit) {
  if (is.col(val)) { return colorToRgb(val); }
  var originalUnit = getUnit(val);
  var unitLess = originalUnit ? val.substr(0, val.length - originalUnit.length) : val;
  return unit && !/\s/g.test(val) ? unitLess + unit : unitLess;
}

// getTotalLength() equivalent for circle, rect, polyline, polygon and line shapes
// adapted from https://gist.github.com/SebLambla/3e0550c496c236709744

function getDistance(p1, p2) {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

function getCircleLength(el) {
  return Math.PI * 2 * getAttribute(el, 'r');
}

function getRectLength(el) {
  return (getAttribute(el, 'width') * 2) + (getAttribute(el, 'height') * 2);
}

function getLineLength(el) {
  return getDistance(
    {x: getAttribute(el, 'x1'), y: getAttribute(el, 'y1')}, 
    {x: getAttribute(el, 'x2'), y: getAttribute(el, 'y2')}
  );
}

function getPolylineLength(el) {
  var points = el.points;
  var totalLength = 0;
  var previousPos;
  for (var i = 0 ; i < points.numberOfItems; i++) {
    var currentPos = points.getItem(i);
    if (i > 0) { totalLength += getDistance(previousPos, currentPos); }
    previousPos = currentPos;
  }
  return totalLength;
}

function getPolygonLength(el) {
  var points = el.points;
  return getPolylineLength(el) + getDistance(points.getItem(points.numberOfItems - 1), points.getItem(0));
}

// Path animation

function getTotalLength(el) {
  if (el.getTotalLength) { return el.getTotalLength(); }
  switch(el.tagName.toLowerCase()) {
    case 'circle': return getCircleLength(el);
    case 'rect': return getRectLength(el);
    case 'line': return getLineLength(el);
    case 'polyline': return getPolylineLength(el);
    case 'polygon': return getPolygonLength(el);
  }
}

function setDashoffset(el) {
  var pathLength = getTotalLength(el);
  el.setAttribute('stroke-dasharray', pathLength);
  return pathLength;
}

// Motion path

function getParentSvgEl(el) {
  var parentEl = el.parentNode;
  while (is.svg(parentEl)) {
    parentEl = parentEl.parentNode;
    if (!is.svg(parentEl.parentNode)) { break; }
  }
  return parentEl;
}

function getParentSvg(pathEl, svgData) {
  var svg = svgData || {};
  var parentSvgEl = svg.el || getParentSvgEl(pathEl);
  var rect = parentSvgEl.getBoundingClientRect();
  var viewBoxAttr = getAttribute(parentSvgEl, 'viewBox');
  var width = rect.width;
  var height = rect.height;
  var viewBox = svg.viewBox || (viewBoxAttr ? viewBoxAttr.split(' ') : [0, 0, width, height]);
  return {
    el: parentSvgEl,
    viewBox: viewBox,
    x: viewBox[0] / 1,
    y: viewBox[1] / 1,
    w: width / viewBox[2],
    h: height / viewBox[3]
  }
}

function getPath(path, percent) {
  var pathEl = is.str(path) ? selectString(path)[0] : path;
  var p = percent || 100;
  return function(property) {
    return {
      property: property,
      el: pathEl,
      svg: getParentSvg(pathEl),
      totalLength: getTotalLength(pathEl) * (p / 100)
    }
  }
}

function getPathProgress(path, progress) {
  function point(offset) {
    if ( offset === void 0 ) offset = 0;

    var l = progress + offset >= 1 ? progress + offset : 0;
    return path.el.getPointAtLength(l);
  }
  var svg = getParentSvg(path.el, path.svg);
  var p = point();
  var p0 = point(-1);
  var p1 = point(+1);
  switch (path.property) {
    case 'x': return (p.x - svg.x) * svg.w;
    case 'y': return (p.y - svg.y) * svg.h;
    case 'angle': return Math.atan2(p1.y - p0.y, p1.x - p0.x) * 180 / Math.PI;
  }
}

// Decompose value

function decomposeValue(val, unit) {
  var rgx = /-?\d*\.?\d+/g;
  var value = validateValue((is.pth(val) ? val.totalLength : val), unit) + '';
  return {
    original: value,
    numbers: value.match(rgx) ? value.match(rgx).map(Number) : [0],
    strings: (is.str(val) || unit) ? value.split(rgx) : []
  }
}

// Animatables

function parseTargets(targets) {
  var targetsArray = targets ? (flattenArray(is.arr(targets) ? targets.map(toArray) : toArray(targets))) : [];
  return filterArray(targetsArray, function (item, pos, self) { return self.indexOf(item) === pos; });
}

function getAnimatables(targets) {
  var parsed = parseTargets(targets);
  return parsed.map(function (t, i) {
    return {target: t, id: i, total: parsed.length, transforms: { list: getElementTransforms(t) } };
  });
}

// Properties

function normalizePropertyTweens(prop, tweenSettings) {
  var settings = cloneObject(tweenSettings);
  // Override duration if easing is a spring
  if (/^spring/.test(settings.easing)) { settings.duration = spring(settings.easing); }
  if (is.arr(prop)) {
    var l = prop.length;
    var isFromTo = (l === 2 && !is.obj(prop[0]));
    if (!isFromTo) {
      // Duration divided by the number of tweens
      if (!is.fnc(tweenSettings.duration)) { settings.duration = tweenSettings.duration / l; }
    } else {
      // Transform [from, to] values shorthand to a valid tween value
      prop = {value: prop};
    }
  }
  var propArray = is.arr(prop) ? prop : [prop];
  return propArray.map(function (v, i) {
    var obj = (is.obj(v) && !is.pth(v)) ? v : {value: v};
    // Default delay value should only be applied to the first tween
    if (is.und(obj.delay)) { obj.delay = !i ? tweenSettings.delay : 0; }
    // Default endDelay value should only be applied to the last tween
    if (is.und(obj.endDelay)) { obj.endDelay = i === propArray.length - 1 ? tweenSettings.endDelay : 0; }
    return obj;
  }).map(function (k) { return mergeObjects(k, settings); });
}


function flattenKeyframes(keyframes) {
  var propertyNames = filterArray(flattenArray(keyframes.map(function (key) { return Object.keys(key); })), function (p) { return is.key(p); })
  .reduce(function (a,b) { if (a.indexOf(b) < 0) { a.push(b); } return a; }, []);
  var properties = {};
  var loop = function ( i ) {
    var propName = propertyNames[i];
    properties[propName] = keyframes.map(function (key) {
      var newKey = {};
      for (var p in key) {
        if (is.key(p)) {
          if (p == propName) { newKey.value = key[p]; }
        } else {
          newKey[p] = key[p];
        }
      }
      return newKey;
    });
  };

  for (var i = 0; i < propertyNames.length; i++) loop( i );
  return properties;
}

function getProperties(tweenSettings, params) {
  var properties = [];
  var keyframes = params.keyframes;
  if (keyframes) { params = mergeObjects(flattenKeyframes(keyframes), params); }
  for (var p in params) {
    if (is.key(p)) {
      properties.push({
        name: p,
        tweens: normalizePropertyTweens(params[p], tweenSettings)
      });
    }
  }
  return properties;
}

// Tweens

function normalizeTweenValues(tween, animatable) {
  var t = {};
  for (var p in tween) {
    var value = getFunctionValue(tween[p], animatable);
    if (is.arr(value)) {
      value = value.map(function (v) { return getFunctionValue(v, animatable); });
      if (value.length === 1) { value = value[0]; }
    }
    t[p] = value;
  }
  t.duration = parseFloat(t.duration);
  t.delay = parseFloat(t.delay);
  return t;
}

function normalizeTweens(prop, animatable) {
  var previousTween;
  return prop.tweens.map(function (t) {
    var tween = normalizeTweenValues(t, animatable);
    var tweenValue = tween.value;
    var to = is.arr(tweenValue) ? tweenValue[1] : tweenValue;
    var toUnit = getUnit(to);
    var originalValue = getOriginalTargetValue(animatable.target, prop.name, toUnit, animatable);
    var previousValue = previousTween ? previousTween.to.original : originalValue;
    var from = is.arr(tweenValue) ? tweenValue[0] : previousValue;
    var fromUnit = getUnit(from) || getUnit(originalValue);
    var unit = toUnit || fromUnit;
    if (is.und(to)) { to = previousValue; }
    tween.from = decomposeValue(from, unit);
    tween.to = decomposeValue(getRelativeValue(to, from), unit);
    tween.start = previousTween ? previousTween.end : 0;
    tween.end = tween.start + tween.delay + tween.duration + tween.endDelay;
    tween.easing = parseEasings(tween.easing, tween.duration);
    tween.isPath = is.pth(tweenValue);
    tween.isColor = is.col(tween.from.original);
    if (tween.isColor) { tween.round = 1; }
    previousTween = tween;
    return tween;
  });
}

// Tween progress

var setProgressValue = {
  css: function (t, p, v) { return t.style[p] = v; },
  attribute: function (t, p, v) { return t.setAttribute(p, v); },
  object: function (t, p, v) { return t[p] = v; },
  transform: function (t, p, v, transforms, manual) {
    transforms.list.set(p, v);
    if (p === transforms.last || manual) {
      var str = '';
      transforms.list.forEach(function (value, prop) { str += prop + "(" + value + ") "; });
      t.style.transform = str;
    }
  }
};

// Set Value helper

function setTargetsValue(targets, properties) {
  var animatables = getAnimatables(targets);
  animatables.forEach(function (animatable) {
    for (var property in properties) {
      var value = getFunctionValue(properties[property], animatable);
      var target = animatable.target;
      var valueUnit = getUnit(value);
      var originalValue = getOriginalTargetValue(target, property, valueUnit, animatable);
      var unit = valueUnit || getUnit(originalValue);
      var to = getRelativeValue(validateValue(value, unit), originalValue);
      var animType = getAnimationType(target, property);
      setProgressValue[animType](target, property, to, animatable.transforms, true);
    }
  });
}

// Animations

function createAnimation(animatable, prop) {
  var animType = getAnimationType(animatable.target, prop.name);
  if (animType) {
    var tweens = normalizeTweens(prop, animatable);
    var lastTween = tweens[tweens.length - 1];
    return {
      type: animType,
      property: prop.name,
      animatable: animatable,
      tweens: tweens,
      duration: lastTween.end,
      delay: tweens[0].delay,
      endDelay: lastTween.endDelay
    }
  }
}

function getAnimations(animatables, properties) {
  return filterArray(flattenArray(animatables.map(function (animatable) {
    return properties.map(function (prop) {
      return createAnimation(animatable, prop);
    });
  })), function (a) { return !is.und(a); });
}

// Create Instance

function getInstanceTimings(animations, tweenSettings) {
  var animLength = animations.length;
  var getTlOffset = function (anim) { return anim.timelineOffset ? anim.timelineOffset : 0; };
  var timings = {};
  timings.duration = animLength ? Math.max.apply(Math, animations.map(function (anim) { return getTlOffset(anim) + anim.duration; })) : tweenSettings.duration;
  timings.delay = animLength ? Math.min.apply(Math, animations.map(function (anim) { return getTlOffset(anim) + anim.delay; })) : tweenSettings.delay;
  timings.endDelay = animLength ? timings.duration - Math.max.apply(Math, animations.map(function (anim) { return getTlOffset(anim) + anim.duration - anim.endDelay; })) : tweenSettings.endDelay;
  return timings;
}

var instanceID = 0;

function createNewInstance(params) {
  var instanceSettings = replaceObjectProps(defaultInstanceSettings, params);
  var tweenSettings = replaceObjectProps(defaultTweenSettings, params);
  var properties = getProperties(tweenSettings, params);
  var animatables = getAnimatables(params.targets);
  var animations = getAnimations(animatables, properties);
  var timings = getInstanceTimings(animations, tweenSettings);
  var id = instanceID;
  instanceID++;
  return mergeObjects(instanceSettings, {
    id: id,
    children: [],
    animatables: animatables,
    animations: animations,
    duration: timings.duration,
    delay: timings.delay,
    endDelay: timings.endDelay
  });
}

// Core

var activeInstances = [];
var pausedInstances = [];
var raf;

var engine = (function () {
  function play() { 
    raf = requestAnimationFrame(step);
  }
  function step(t) {
    var activeInstancesLength = activeInstances.length;
    if (activeInstancesLength) {
      var i = 0;
      while (i < activeInstancesLength) {
        var activeInstance = activeInstances[i];
        if (!activeInstance.paused) {
          activeInstance.tick(t);
        } else {
          var instanceIndex = activeInstances.indexOf(activeInstance);
          if (instanceIndex > -1) {
            activeInstances.splice(instanceIndex, 1);
            activeInstancesLength = activeInstances.length;
          }
        }
        i++;
      }
      play();
    } else {
      raf = cancelAnimationFrame(raf);
    }
  }
  return play;
})();

function handleVisibilityChange() {
  if (document.hidden) {
    activeInstances.forEach(function (ins) { return ins.pause(); });
    pausedInstances = activeInstances.slice(0);
    activeInstances = [];
  } else {
    pausedInstances.forEach(function (ins) { return ins.play(); });
  }
}

if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', handleVisibilityChange);
}

// Public Instance

function anime(params) {
  if ( params === void 0 ) params = {};


  var startTime = 0, lastTime = 0, now = 0;
  var children, childrenLength = 0;
  var resolve = null;

  function makePromise(instance) {
    var promise = window.Promise && new Promise(function (_resolve) { return resolve = _resolve; });
    instance.finished = promise;
    return promise;
  }

  var instance = createNewInstance(params);
  var promise = makePromise(instance);

  function toggleInstanceDirection() {
    var direction = instance.direction;
    if (direction !== 'alternate') {
      instance.direction = direction !== 'normal' ? 'normal' : 'reverse';
    }
    instance.reversed = !instance.reversed;
    children.forEach(function (child) { return child.reversed = instance.reversed; });
  }

  function adjustTime(time) {
    return instance.reversed ? instance.duration - time : time;
  }

  function resetTime() {
    startTime = 0;
    lastTime = adjustTime(instance.currentTime) * (1 / anime.speed);
  }

  function seekCild(time, child) {
    if (child) { child.seek(time - child.timelineOffset); }
  }

  function syncInstanceChildren(time) {
    if (!instance.reversePlayback) {
      for (var i = 0; i < childrenLength; i++) { seekCild(time, children[i]); }
    } else {
      for (var i$1 = childrenLength; i$1--;) { seekCild(time, children[i$1]); }
    }
  }

  function setAnimationsProgress(insTime) {
    var i = 0;
    var animations = instance.animations;
    var animationsLength = animations.length;
    while (i < animationsLength) {
      var anim = animations[i];
      var animatable = anim.animatable;
      var tweens = anim.tweens;
      var tweenLength = tweens.length - 1;
      var tween = tweens[tweenLength];
      // Only check for keyframes if there is more than one tween
      if (tweenLength) { tween = filterArray(tweens, function (t) { return (insTime < t.end); })[0] || tween; }
      var elapsed = minMax(insTime - tween.start - tween.delay, 0, tween.duration) / tween.duration;
      var eased = isNaN(elapsed) ? 1 : tween.easing(elapsed);
      var strings = tween.to.strings;
      var round = tween.round;
      var numbers = [];
      var toNumbersLength = tween.to.numbers.length;
      var progress = (void 0);
      for (var n = 0; n < toNumbersLength; n++) {
        var value = (void 0);
        var toNumber = tween.to.numbers[n];
        var fromNumber = tween.from.numbers[n] || 0;
        if (!tween.isPath) {
          value = fromNumber + (eased * (toNumber - fromNumber));
        } else {
          value = getPathProgress(tween.value, eased * toNumber);
        }
        if (round) {
          if (!(tween.isColor && n > 2)) {
            value = Math.round(value * round) / round;
          }
        }
        numbers.push(value);
      }
      // Manual Array.reduce for better performances
      var stringsLength = strings.length;
      if (!stringsLength) {
        progress = numbers[0];
      } else {
        progress = strings[0];
        for (var s = 0; s < stringsLength; s++) {
          var a = strings[s];
          var b = strings[s + 1];
          var n$1 = numbers[s];
          if (!isNaN(n$1)) {
            if (!b) {
              progress += n$1 + ' ';
            } else {
              progress += n$1 + b;
            }
          }
        }
      }
      setProgressValue[anim.type](animatable.target, anim.property, progress, animatable.transforms);
      anim.currentValue = progress;
      i++;
    }
  }

  function setCallback(cb) {
    if (instance[cb] && !instance.passThrough) { instance[cb](instance); }
  }

  function countIteration() {
    if (instance.remaining && instance.remaining !== true) {
      instance.remaining--;
    }
  }

  function setInstanceProgress(engineTime) {
    var insDuration = instance.duration;
    var insDelay = instance.delay;
    var insEndDelay = insDuration - instance.endDelay;
    var insTime = adjustTime(engineTime);
    instance.progress = minMax((insTime / insDuration) * 100, 0, 100);
    instance.reversePlayback = insTime < instance.currentTime;
    if (children) { syncInstanceChildren(insTime); }
    if (!instance.began && instance.currentTime > 0) {
      instance.began = true;
      setCallback('begin');
      setCallback('loopBegin');
    }
    if (insTime <= insDelay && instance.currentTime !== 0) {
      setAnimationsProgress(0);
    }
    if ((insTime >= insEndDelay && instance.currentTime !== insDuration) || !insDuration) {
      setAnimationsProgress(insDuration);
    }
    if (insTime > insDelay && insTime < insEndDelay) {
      if (!instance.changeBegan) {
        instance.changeBegan = true;
        instance.changeCompleted = false;
        setCallback('changeBegin');
      }
      setCallback('change');
      setAnimationsProgress(insTime);
    } else {
      if (instance.changeBegan) {
        instance.changeCompleted = true;
        instance.changeBegan = false;
        setCallback('changeComplete');
      }
    }
    instance.currentTime = minMax(insTime, 0, insDuration);
    if (instance.began) { setCallback('update'); }
    if (engineTime >= insDuration) {
      lastTime = 0;
      countIteration();
      if (instance.remaining) {
        startTime = now;
        setCallback('loopComplete');
        setCallback('loopBegin');
        if (instance.direction === 'alternate') { toggleInstanceDirection(); }
      } else {
        instance.paused = true;
        if (!instance.completed) {
          instance.completed = true;
          setCallback('loopComplete');
          setCallback('complete');
          if (!instance.passThrough && 'Promise' in window) {
            resolve();
            promise = makePromise(instance);
          }
        }
      }
    }
  }

  instance.reset = function() {
    var direction = instance.direction;
    instance.passThrough = false;
    instance.currentTime = 0;
    instance.progress = 0;
    instance.paused = true;
    instance.began = false;
    instance.changeBegan = false;
    instance.completed = false;
    instance.changeCompleted = false;
    instance.reversePlayback = false;
    instance.reversed = direction === 'reverse';
    instance.remaining = instance.loop;
    children = instance.children;
    childrenLength = children.length;
    for (var i = childrenLength; i--;) { instance.children[i].reset(); }
    if (instance.reversed && instance.loop !== true || (direction === 'alternate' && instance.loop === 1)) { instance.remaining++; }
    setAnimationsProgress(0);
  };

  // Set Value helper

  instance.set = function(targets, properties) {
    setTargetsValue(targets, properties);
    return instance;
  };

  instance.tick = function(t) {
    now = t;
    if (!startTime) { startTime = now; }
    setInstanceProgress((now + (lastTime - startTime)) * anime.speed);
  };

  instance.seek = function(time) {
    setInstanceProgress(adjustTime(time));
  };

  instance.pause = function() {
    instance.paused = true;
    resetTime();
  };

  instance.play = function() {
    if (!instance.paused) { return; }
    if (instance.completed) { instance.reset(); }
    instance.paused = false;
    activeInstances.push(instance);
    resetTime();
    if (!raf) { engine(); }
  };

  instance.reverse = function() {
    toggleInstanceDirection();
    resetTime();
  };

  instance.restart = function() {
    instance.reset();
    instance.play();
  };

  instance.reset();

  if (instance.autoplay) { instance.play(); }

  return instance;

}

// Remove targets from animation

function removeTargetsFromAnimations(targetsArray, animations) {
  for (var a = animations.length; a--;) {
    if (arrayContains(targetsArray, animations[a].animatable.target)) {
      animations.splice(a, 1);
    }
  }
}

function removeTargets(targets) {
  var targetsArray = parseTargets(targets);
  for (var i = activeInstances.length; i--;) {
    var instance = activeInstances[i];
    var animations = instance.animations;
    var children = instance.children;
    removeTargetsFromAnimations(targetsArray, animations);
    for (var c = children.length; c--;) {
      var child = children[c];
      var childAnimations = child.animations;
      removeTargetsFromAnimations(targetsArray, childAnimations);
      if (!childAnimations.length && !child.children.length) { children.splice(c, 1); }
    }
    if (!animations.length && !children.length) { instance.pause(); }
  }
}

// Stagger helpers

function stagger(val, params) {
  if ( params === void 0 ) params = {};

  var direction = params.direction || 'normal';
  var easing = params.easing ? parseEasings(params.easing) : null;
  var grid = params.grid;
  var axis = params.axis;
  var fromIndex = params.from || 0;
  var fromFirst = fromIndex === 'first';
  var fromCenter = fromIndex === 'center';
  var fromLast = fromIndex === 'last';
  var isRange = is.arr(val);
  var val1 = isRange ? parseFloat(val[0]) : parseFloat(val);
  var val2 = isRange ? parseFloat(val[1]) : 0;
  var unit = getUnit(isRange ? val[1] : val) || 0;
  var start = params.start || 0 + (isRange ? val1 : 0);
  var values = [];
  var maxValue = 0;
  return function (el, i, t) {
    if (fromFirst) { fromIndex = 0; }
    if (fromCenter) { fromIndex = (t - 1) / 2; }
    if (fromLast) { fromIndex = t - 1; }
    if (!values.length) {
      for (var index = 0; index < t; index++) {
        if (!grid) {
          values.push(Math.abs(fromIndex - index));
        } else {
          var fromX = !fromCenter ? fromIndex%grid[0] : (grid[0]-1)/2;
          var fromY = !fromCenter ? Math.floor(fromIndex/grid[0]) : (grid[1]-1)/2;
          var toX = index%grid[0];
          var toY = Math.floor(index/grid[0]);
          var distanceX = fromX - toX;
          var distanceY = fromY - toY;
          var value = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
          if (axis === 'x') { value = -distanceX; }
          if (axis === 'y') { value = -distanceY; }
          values.push(value);
        }
        maxValue = Math.max.apply(Math, values);
      }
      if (easing) { values = values.map(function (val) { return easing(val / maxValue) * maxValue; }); }
      if (direction === 'reverse') { values = values.map(function (val) { return axis ? (val < 0) ? val * -1 : -val : Math.abs(maxValue - val); }); }
    }
    var spacing = isRange ? (val2 - val1) / maxValue : val1;
    return start + (spacing * (Math.round(values[i] * 100) / 100)) + unit;
  }
}

// Timeline

function timeline(params) {
  if ( params === void 0 ) params = {};

  var tl = anime(params);
  tl.duration = 0;
  tl.add = function(instanceParams, timelineOffset) {
    var tlIndex = activeInstances.indexOf(tl);
    var children = tl.children;
    if (tlIndex > -1) { activeInstances.splice(tlIndex, 1); }
    function passThrough(ins) { ins.passThrough = true; }
    for (var i = 0; i < children.length; i++) { passThrough(children[i]); }
    var insParams = mergeObjects(instanceParams, replaceObjectProps(defaultTweenSettings, params));
    insParams.targets = insParams.targets || params.targets;
    var tlDuration = tl.duration;
    insParams.autoplay = false;
    insParams.direction = tl.direction;
    insParams.timelineOffset = is.und(timelineOffset) ? tlDuration : getRelativeValue(timelineOffset, tlDuration);
    passThrough(tl);
    tl.seek(insParams.timelineOffset);
    var ins = anime(insParams);
    passThrough(ins);
    children.push(ins);
    var timings = getInstanceTimings(children, params);
    tl.delay = timings.delay;
    tl.endDelay = timings.endDelay;
    tl.duration = timings.duration;
    tl.seek(0);
    tl.reset();
    if (tl.autoplay) { tl.play(); }
    return tl;
  };
  return tl;
}

anime.version = '3.0.1';
anime.speed = 1;
anime.running = activeInstances;
anime.remove = removeTargets;
anime.get = getOriginalTargetValue;
anime.set = setTargetsValue;
anime.convertPx = convertPxToUnit;
anime.path = getPath;
anime.setDashoffset = setDashoffset;
anime.stagger = stagger;
anime.timeline = timeline;
anime.easing = parseEasings;
anime.penner = penner;
anime.random = function (min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; };

/* harmony default export */ var anime_es = (anime);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./build-utils/global-vue-loader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/SensorLevel.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* eslint-disable no-console */
//  import anime from '@/lib/anime'



if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('SensorLevel', component.exports);
}

/* harmony default export */ var SensorLevelvue_type_script_lang_js_ = ({
  name: 'SensorLevel',
  props: {
    sensor: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      default: 150
    },
    height: {
      type: Number,
      default: 140
    }
  },
  data: function data() {
    return {
      animeScript: null,
      updatedSensor: null,
      updatedWidth: null,
      updatedHeight: null,
      aSide: true,
      previousValue: 0,
      rangeWrapper: null,
      rangeValues: null,
      rangeSliderPaths: null,
      mouseX: 0,
      mouseY: 0,
      mouseInitialY: 0,
      mouseDy: 0,
      mouseDyLimit: 150,
      mouseDyFactor: 3,
      currentY: 0,
      scaleMax: 0.3,
      lastMouseDy: null,
      rangeWrapperLeft: null,
      pageX: 0,
      pageY: 0,
      loading: false,
      elementsMounted: false,
      gradients: [{
        margin: 1.19,
        width: 14,
        pos: 15
      }, {
        margin: 1.17,
        width: 18,
        pos: 14
      }, {
        margin: 1.16,
        width: 21,
        pos: 13
      }, {
        margin: 1.15,
        width: 25,
        pos: 12
      }, {
        margin: 1.15,
        width: 25,
        pos: 11
      }, {
        margin: 1.15,
        width: 25,
        pos: 10
      }, {
        margin: 1.15,
        width: 25,
        pos: 9
      }, {
        margin: 1.15,
        width: 25,
        pos: 8
      }, {
        margin: 1.15,
        width: 25,
        pos: 7
      }, {
        margin: 1.15,
        width: 25,
        pos: 6
      }, {
        margin: 1.15,
        width: 25,
        pos: 5
      }, {
        margin: 1.15,
        width: 25,
        pos: 4
      }, {
        margin: 1.16,
        width: 21,
        pos: 3
      }, {
        margin: 1.17,
        width: 18,
        pos: 2
      }, {
        margin: 1.19,
        width: 14,
        pos: 1
      }]
    };
  },
  computed: {
    viewBox: function viewBox() {
      return "0 0 ".concat(this.updatedWidth, " ").concat(this.updatedHeight);
    },
    rangeHeight: function rangeHeight() {
      return this.updatedHeight - this.updatedHeight / 6;
    },
    value: {
      get: function get() {
        return this.updatedSensor.resources['5851'];
      },
      set: function set(value) {
        //  this.updatedSensor.resources["5851"] = parseInt(value);
        this.updatedSensor.resources['5851'] = value;
      }
    },
    rangeMin: function rangeMin() {
      if (!this.updatedSensor || !this.updatedSensor.resources) return 0;
      if (this.updatedSensor.resources['5701'] === '%') return 0;
      return 0;
    },
    rangeMax: function rangeMax() {
      if (!this.updatedSensor || !this.updatedSensor.resources) return 100;
      if (this.updatedSensor.resources['5701'] === '%') return 100;
      return 100;
    },
    rangeMinY: function rangeMinY() {
      return this.rangeHeight * this.rangeMin / this.rangeMax;
    },
    rangeMaxY: function rangeMaxY() {
      return this.rangeHeight * this.rangeMax / this.rangeMax;
    },
    scale: function scale() {
      var scale = (this.value - this.rangeMin) / (this.rangeMax - this.rangeMin) * this.scaleMax;
      return scale;
    },
    newSliderY: function newSliderY() {
      return this.currentY + this.lastMouseDy / this.mouseDyFactor;
    },
    newY: function newY() {
      return this.currentY + this.mouseY - this.pageY;
    },
    newPath: function newPath() {
      if (this.value > this.rangeMax) return this.buildPath(this.lastMouseDy, this.rangeHeight - this.rangeMaxY);
      if (this.value < this.minRange) return this.buildPath(this.lastMouseDy, this.rangeHeight - this.rangeMinY);
      return this.buildPath(this.lastMouseDy, this.rangeHeight - this.newSliderY);
    }
  },
  watch: {
    sensor: {
      handler: function handler(sensor) {
        this.updatedSensor = JSON.parse(sensor);
      },
      immediate: true
    },
    width: {
      handler: function handler(width) {
        this.updatedWidth = width;
      },
      immediate: true
    },
    height: {
      handler: function handler(height) {
        this.updatedHeight = height;
      },
      immediate: true
    },
    value: {
      handler: function handler(value) {
        this.currentY = this.rangeHeight * value / this.rangeMax;
        this.afterUpdate();
        this.previousValue = value;
      },
      immediate: true
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.mountElements(); // todo define parseInt accuracy based on oma unit resource [5701]

    this.currentY = this.rangeHeight * this.value / this.rangeMax;
    this.$nextTick(function () {
      _this.setListeners(); // this.updateValue();

    });
  },
  beforeDestroy: function beforeDestroy() {
    this.elementsMounted = false;
    this.rangeWrapper = null;
    this.rangeValues = null;
    this.rangeSliderPaths = null;
    this.removeEventListeners();
  },
  methods: {
    hasRightType: function hasRightType(type) {
      return components_list.level.list.find(function (objectId) {
        return objectId === type;
      });
    },
    updateSensor: function updateSensor() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this.$emit.apply(this, ['update-sensor'].concat(args));
      this.loading = false;
    },
    deleteSensor: function deleteSensor() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      this.$emit.apply(this, ['delete-sensor'].concat(args));
    },
    flipSide: function flipSide(value) {
      this.$emit('flip-side', value);
    },
    mountElements: function mountElements() {
      this.rangeWrapper = this.$refs["rangeWrapper-".concat(this.updatedSensor.id)];
      this.rangeValues = this.$refs["rangeValues-".concat(this.updatedSensor.id)];
      this.rangeSliderPaths = document.querySelectorAll('.range-slider-path');
      this.elementsMounted = true;
    },
    // Handle `mousedown` and `touchstart` events, saving data about mouse position
    mouseDown: function mouseDown(e) {
      this.mouseY = this.mouseInitialY = e.targetTouches ? e.targetTouches[0].pageY : e.pageY;
      this.rangeWrapperLeft = this.rangeWrapper.getBoundingClientRect().left;
    },
    mouseMove: function mouseMove(e) {
      if (this.mouseY) {
        this.pageX = e.targetTouches ? e.targetTouches[0].pageX : e.pageX;
        this.pageY = e.targetTouches ? e.targetTouches[0].pageY : e.pageY;
        this.mouseX = this.pageX - this.rangeWrapperLeft;
        this.mouseDy = (this.pageY - this.mouseInitialY) * this.mouseDyFactor; //  this.newY = this.currentY + this.mouseY - this.pageY;

        if (this.newY >= this.rangeMinY && this.newY <= this.rangeMaxY) {
          this.currentY = this.newY;
          this.mouseY = this.pageY;
        } else {
          this.currentY = this.newY < this.rangeMinY ? this.rangeMinY : this.rangeMaxY;
        }

        this.value = parseInt(this.currentY * this.rangeMax / this.rangeHeight);
      }
    },
    mouseUp: function mouseUp() {
      var _this2 = this;

      if (this.mouseDy) {
        this.elasticRelease();
        setTimeout(function () {
          if (_this2.loading) return null;
          _this2.loading = true;

          _this2.updateSensor(_this2.updatedSensor, 5851, _this2.value);
        }, 100);
      }

      this.mouseY = this.mouseDy = 0;
    },
    setListeners: function setListeners() {
      if (!this.elementsMounted) return null;
      this.rangeWrapper.addEventListener('mousedown', this.mouseDown);
      this.rangeWrapper.addEventListener('touchstart', this.mouseDown);
      this.rangeWrapper.addEventListener('mousemove', this.mouseMove);
      this.rangeWrapper.addEventListener('touchmove', this.mouseMove);
      this.rangeWrapper.addEventListener('mouseup', this.mouseUp);
      this.rangeWrapper.addEventListener('mouseleave', this.mouseUp);
      this.rangeWrapper.addEventListener('touchend', this.mouseUp);
    },
    removeEventListeners: function removeEventListeners() {
      if (this.rangeWrapper) {
        this.rangeWrapper.removeEventListener('mousedown', this.mouseDown);
        this.rangeWrapper.removeEventListener('touchstart', this.mouseDown);
        this.rangeWrapper.removeEventListener('mousemove', this.mouseMove);
        this.rangeWrapper.removeEventListener('touchmove', this.mouseMove);
        this.rangeWrapper.removeEventListener('mouseup', this.mouseUp);
        this.rangeWrapper.removeEventListener('mouseleave', this.mouseUp);
        this.rangeWrapper.removeEventListener('touchend', this.mouseUp);
      }
    },
    gradientHeight: function gradientHeight(x) {
      return this.rangeHeight - this.rangeHeight / 15 * x;
    },
    buildPath: function buildPath(dy, ty) {
      if (!dy || dy === null) dy = 0;
      if (!ty || ty === null) ty = 0;
      return "M 0 ".concat(ty, " q ").concat(this.mouseX, " ").concat(dy, " ").concat(this.updatedWidth, " 0 l 0 ").concat(this.updatedHeight, " l -").concat(this.updatedWidth, " 0 Z");
    },
    afterUpdate: function afterUpdate() {
      if (!this.elementsMounted) return null;
      if (this.value > this.rangeMax) return null;
      if (this.value < this.rangeMin) return null;
      anime_es.remove([this.rangeValues, this.rangeSliderPaths[0], this.rangeSliderPaths[1]]); // Some maths calc

      if (Math.abs(this.mouseDy) < this.mouseDyLimit) {
        this.lastMouseDy = this.mouseDy;
      } else {
        this.lastMouseDy = this.mouseDy < 0 ? -this.mouseDyLimit : this.mouseDyLimit;
      } // if (this.newSliderY < this.rangeMinY || this.newSliderY > this.rangeMaxY) {
      //   this.newSliderY = this.newSliderY < this.rangeMinY ? this.rangeMinY : this.rangeMaxY;
      // }

    },
    elasticRelease: function elasticRelease() {
      var _this3 = this;

      if (!this.elementsMounted) return null; // Morph the paths to the opposite direction, to simulate a strong elasticity

      anime_es({
        targets: this.rangeSliderPaths,
        d: this.buildPath(-this.lastMouseDy * 1.3, this.rangeHeight - (this.currentY - this.lastMouseDy / this.mouseDyFactor)),
        duration: 150,
        easing: 'linear',
        complete: function complete() {
          // Morph the paths to the normal state, using the `elasticOut` easing function (default)
          anime_es({
            targets: _this3.rangeSliderPaths,
            d: _this3.buildPath(0, _this3.rangeHeight - _this3.currentY),
            duration: 2000,
            elasticity: 500
          });
        }
      }); // Translate the values to the opposite direction, to simulate a strong elasticity

      anime_es({
        targets: this.rangeValues,
        translateY: this.rangeHeight - (this.currentY + this.lastMouseDy / this.mouseDyFactor / 4),
        duration: 150,
        easing: 'linear',
        complete: function complete() {
          anime_es({
            targets: _this3.rangeValues,
            translateY: _this3.rangeHeight - _this3.currentY,
            duration: 2000,
            elasticity: 500
          });
        }
      });
    }
  }
});
// CONCATENATED MODULE: ./src/SensorLevel.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_SensorLevelvue_type_script_lang_js_ = (SensorLevelvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/SensorLevel.vue





/* normalize component */

var SensorLevel_component = normalizeComponent(
  src_SensorLevelvue_type_script_lang_js_,
  SensorLevelvue_type_template_id_0c6c12b0_render,
  SensorLevelvue_type_template_id_0c6c12b0_staticRenderFns,
  false,
  null,
  null,
  null
  
)

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('SensorLevel', SensorLevel_component.exports)
}
/* harmony default export */ var SensorLevel = (SensorLevel_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"66eeb948-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./build-utils/global-vue-loader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/SensorSnap.vue?vue&type=template&id=7c361652&
var SensorSnapvue_type_template_id_7c361652_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sensor-snap"},[(_vm.refName !== null && _vm.sensor)?_c(_vm.componentName,{directives:[{name:"show",rawName:"v-show",value:(_vm.aSide),expression:"aSide"}],ref:(_vm.refName + "-" + (_vm.sensor.id)),tag:"component",staticClass:"sensor-component",attrs:{"sensor":JSON.stringify(_vm.sensor),"height":_vm.updatedHeight,"width":_vm.updatedWidth},on:{"update-sensor":_vm.updateSensor,"delete-sensor":_vm.deleteSensor,"flip-side":_vm.onFlippedSide}}):_vm._e(),(_vm.sensor)?_c('svg',{directives:[{name:"show",rawName:"v-show",value:(!_vm.aSide),expression:"!aSide"}],staticClass:"sensor",attrs:{"height":_vm.updatedHeight,"width":_vm.updatedWidth,"xmlns":"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"},on:{"click":function($event){$event.preventDefault();_vm.flipSide(!_vm.aSide)}}},[_c('g',{attrs:{"transform":("translate(" + (_vm.updatedWidth / 2) + ", " + (_vm.updatedHeight / 10) + ")")}},[_c('text',{staticClass:"sensor-details",attrs:{"text-anchor":"middle","x":"0"}},[_c('tspan',{attrs:{"x":"0","y":("" + (_vm.updatedHeight / 8))}},[_vm._v("\n          IPSO : "+_vm._s(_vm.sensor.type)+"\n        ")]),_c('tspan',{attrs:{"x":"0","y":("" + (_vm.updatedHeight / 4))}},[_vm._v("\n          counter : "+_vm._s(_vm.sensor.frameCounter)+"\n        ")]),_c('tspan',{attrs:{"x":"0","y":("" + (_vm.updatedHeight / 3))}},[_vm._v("\n          "+_vm._s(_vm.sensor.protocolName)+" "+_vm._s(_vm.sensor.protocolVersion)+"\n        ")]),_c('tspan',{attrs:{"x":"0","y":("" + (_vm.updatedHeight / 2))}},[_vm._v("\n          routes :\n        ")]),_c('tspan',{attrs:{"x":"0","y":("" + (_vm.updatedHeight / 1.7))}},[_vm._v("\n          "+_vm._s(_vm.sensor.inputPath)+"\n        ")]),_c('tspan',{attrs:{"x":"0","y":("" + (_vm.updatedHeight / 1.5))}},[_vm._v("\n          "+_vm._s(_vm.sensor.outputPath)+"\n        ")]),(_vm.sensor.resources['5750'])?_c('tspan',{attrs:{"x":"0","y":("" + (_vm.updatedHeight / 1.2))}},[_vm._v("\n          "+_vm._s(_vm.sensor.resources['5750'])+"\n        ")]):_vm._e()])])]):(_vm.refName === null || !_vm.sensor)?_c('p',[_vm._v("\n    INVALID SENSOR\n  ")]):_vm._e()],1)}
var SensorSnapvue_type_template_id_7c361652_staticRenderFns = []


// CONCATENATED MODULE: ./src/SensorSnap.vue?vue&type=template&id=7c361652&

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.iterator.js
var es6_array_iterator = __webpack_require__("cadf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.keys.js
var es6_object_keys = __webpack_require__("456d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.split.js
var es6_regexp_split = __webpack_require__("28a5");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.replace.js
var es6_regexp_replace = __webpack_require__("a481");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("7f7f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.to-string.js
var es6_regexp_to_string = __webpack_require__("6b54");

// EXTERNAL MODULE: ./node_modules/aloes-handlers/dist/index.js
var dist = __webpack_require__("f199");

// CONCATENATED MODULE: ./src/styles/CameraStyle.js
var cameraStyle = function cameraStyle(conf) {
  return "svg.sensor-camera {\n  --font-color: ".concat(conf.fontColor, ";\n  --primary-color: ").concat(conf.primaryColor, ";\n  --secondary-color: ").concat(conf.secondaryColor, ";\n  --success: ").concat(conf.successColor, ";\n  --warning: ").concat(conf.warningColor, ";\n  --danger: ").concat(conf.dangerColor, ";\n  text-align: center;\n}\nsvg.sensor-camera > image.stream-viewer {\n  cursor: pointer;\n}\ncircle.stream-button {\n  fill: var(--primary-color);\n  stroke: var(--secondary-color);\n  stroke-width: ").concat(conf.width / 50, "px;\n  cursor: pointer;\n}\nsvg.sensor-camera > circle.stream-button:hover {\n  fill: var(--primary-color);\n  stroke: var(--secondary-color);\n  stroke-width: ").concat(conf.width / 35, "px;\n}\nsvg.sensor-camera > circle.stream-button:active {\n  fill: var(--primary-color);\n  stroke: var(--secondary-color);\n  stroke-width: ").concat(conf.width / 25, "px;\n}\ncanvas.stream-container {\n  display: none;\n}");
};

/* harmony default export */ var CameraStyle = (cameraStyle);
// CONCATENATED MODULE: ./src/styles/GaugeStyle.js
var gaugeStyle = function gaugeStyle(conf) {
  return "svg.sensor-gauge {\n  --font-color: ".concat(conf.fontColor, ";\n  --primary-color: ").concat(conf.primaryColor, ";\n  --secondary-color: ").concat(conf.secondaryColor, ";\n  --success: ").concat(conf.successColor, ";\n  --warning: ").concat(conf.warningColor, ";\n  --danger: ").concat(conf.dangerColor, ";\n  --box-shadow: 0 1px 2px 0px #6e6e6e;\n  --box-shadow-selected: 0 0px 1px 0px #6e6e6e;\n  text-align: center;\n  font-family: ").concat(conf.fontFamily, ";\n}\nsvg.sensor-gauge > .dial {\n  stroke: #eee;\n  stroke-width: ").concat(conf.width / 40, "px;\n  fill: rgba(0,0,0,0);\n}\nsvg.sensor-gauge > .value {\n  stroke: rgb(47, 227, 255);\n  stroke-width: ").concat(conf.width / 30, "px;\n  fill: rgba(0,0,0,0);\n}\nsvg.sensor-gauge > .value-text {\n  text-anchor: middle;\n  alignment-baseline: middle;\n  dominant-baseline: central;\n  fill: var(--primary-color);\n  font-family: ").concat(conf.fontFamily2, ";\n  font-size: ").concat(conf.height / 20, "px;\n}\nsvg.sensor-gauge > g > text.sensor-resources {\n  font-size: ").concat(conf.height / 30, "px;\n  fill: var(--font-color); \n  font-weight: 400;\n  text-anchor: middle;\n  alignment-baseline: middle:\n  dominant-baseline: central;\n}\nimage.meter_needle {\n  transform-origin: bottom center;\n  transform: rotate(270deg);\n}");
};

/* harmony default export */ var GaugeStyle = (gaugeStyle);
// CONCATENATED MODULE: ./src/styles/LevelStyle.js
var levelStyle = function levelStyle(conf) {
  return "svg.sensor-level {\n  --font-color: ".concat(conf.fontColor, ";\n  --primary-color: ").concat(conf.primaryColor, ";\n  --secondary-color: ").concat(conf.secondaryColor, ";\n  --success: ").concat(conf.successColor, ";\n  --warning: ").concat(conf.warningColor, ";\n  --danger: ").concat(conf.dangerColor, ";\n  --border-radius: 5px;\n  --border: 1px solid transparent;\n  --box-shadow: 0 ").concat(conf.width / 50, "px ").concat(conf.width / 35, "px 0px #6e6e6e;\n  --box-shadow-selected: 0 ").concat(conf.width / 75, "px ").concat(conf.width / 100, "px 0px #6e6e6e;\n  cursor: pointer;\n  overflow: hidden;\n}\nsvg.sensor-level > g > path.range-slider-path {\n  fill: var(--primary-color);\n}\nsvg.sensor-level > g > path.range-marks-path {\n  fill: none;\n  stroke: inherit;\n  stroke-width: 1px;\n}\n.range-marks-colored {\n  stroke: var(--primary-color);\n}\n.range-marks-white {\n  stroke: white;\n}\nsvg.sensor-level > g.range-values > text.range-value {\n  box-sizing: border-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  width: 100%;\n  padding: ").concat(conf.height / 12, "px ").concat(conf.width / 11, "px;\n}\nsvg.sensor-level > g.range-values > text.range-value--top {\n  position: absolute;\n  bottom: 100%;\n  fill: var(--primary-color);\n}\nsvg.sensor-level > g.range-values > text.range-value--bottom {\n  fill: var(--font-color); \n}\n.range__value__number {\n  font-size: ").concat(conf.height / 15, "px;\n  margin: 0 ").concat(conf.height / 48, "px;\n}\n.range-value-number--top {\n  -webkit-transform-origin: 100% 100%;\n  -ms-transform-origin: 100% 100%;\n  transform-origin: 100% 100%;\n}\n.range-value-number--bottom {\n  -webkit-transform-origin: 100% 0;\n  -ms-transform-origin: 100% 0;\n  transform-origin: 100% 0;\n}\n.range-value-text {\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-flex-direction: column;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  font-size: ").concat(conf.height / 12, "px;\n  text-transform: uppercase;\n}\n.range-value-text span:first-child {\n  margin-bottom: 3px;\n}\n.range-value-text--top {\n  -webkit-align-self: flex-end;\n  -ms-flex-item-align: end;\n  align-self: flex-end;\n  margin-bottom: ").concat(conf.height / 36, "px;\n}\n.range-value-text--bottom {\n  margin-bottom: ").concat(conf.height / 48, "px;\n}");
};

/* harmony default export */ var LevelStyle = (levelStyle);
// CONCATENATED MODULE: ./src/styles/SwitchStyle.js
var switchStyle = function switchStyle(conf) {
  return "svg.sensor-switch {\n  --font-color: ".concat(conf.fontColor, ";\n  --primary-color: ").concat(conf.primaryColor, ";\n  --secondary-color: ").concat(conf.secondaryColor, ";\n  --success: ").concat(conf.successColor, ";\n  --warning: ").concat(conf.warningColor, ";\n  --danger: ").concat(conf.dangerColor, ";\n  --border: 1px solid transparent;\n  --box-shadow: 0 1px 2px 0px #6e6e6e;\n  --box-shadow-selected: 0 0px 1px 0px #6e6e6e;\n  text-align: center;\n}\nsvg.sensor-switch > g > circle.sensor-button {\n  fill: transparent;\n  stroke-width: ").concat(conf.width / 50, "px;\n  cursor: pointer;\n}\nsvg.sensor-switch > g > circle.sensor-button:hover {\n  stroke-width: ").concat(conf.width / 35, "px;\n}\nsvg.sensor-switch > g > circle.sensor-button:active {\n  stroke-width: ").concat(conf.width / 25, "px;\n}\nsvg.sensor-switch > g > text.sensor-value {\n  fill: var(--font-color); \n  font-size: ").concat(conf.height / 7, "px;\n  font-weight: 700;\n}");
};

/* harmony default export */ var SwitchStyle = (switchStyle);
// CONCATENATED MODULE: ./src/styles/TimeStyle.js
var timeStyle = function timeStyle(conf) {
  return "svg.sensor-time {\n  --font-color: ".concat(conf.fontColor, ";\n  --primary-color: ").concat(conf.primaryColor, ";\n  --secondary-color: ").concat(conf.secondaryColor, ";\n  --success: ").concat(conf.successColor, ";\n  --warning: ").concat(conf.warningColor, ";\n  --danger: ").concat(conf.dangerColor, ";\n  --border: 1px solid transparent;\n  --box-shadow: 0 1px 2px 0px #6e6e6e;\n  --box-shadow-selected: 0 0px 1px 0px #6e6e6e;\n  text-align: center;\n}\nimage.show-clock {\n  cursor: pointer;\n}\ng.clock > circle {\n  cursor: pointer;\n}\ng.calendar-days > text {\n  font-size: ").concat(conf.height / 20, "px;\n  font-family: \"arial\";\n  fill: #5f5f5f;\n  cursor: pointer;\n}\ng.calendar-weeks > text {\n  fill: var(--primary-color); \n  font-size: ").concat(conf.height / 18, "px;\n  font-weight: bold\n}\ntext.calendar-month {\n  fill: var(--font-color); \n  font-size: ").concat(conf.height / 15, "px;\n}\ntext.calendar-year {\n  fill: var(--font-color); \n  font-family: \"arial\";\n  font-size: ").concat(conf.height / 15, "px;\n}");
};

/* harmony default export */ var TimeStyle = (timeStyle);
// CONCATENATED MODULE: ./src/styles/SensorStyles.js





var SensorStyles = {};

var SensorStyles_conf = function conf(sensor, styles) {
  return {
    width: styles.width || 450,
    height: styles.height || 480,
    fontFamily: styles.fontFamily || 'Aloes-Rg',
    fontFamily2: styles.fontFamily2 || 'Aloes-Bd',
    fontColor: styles.fontColor || '#1C1C1C',
    grey: styles.grey || '#565656',
    primaryColor: styles.primaryColor || '#1dc0ff',
    secondaryColor: styles.secondaryColor || '#55ffb6',
    successColor: styles.successColor || '#69ff4f',
    warningColor: styles.warningColor || '#fff62d',
    dangerColor: styles.dangerColor || '#ff954d'
  };
};

SensorStyles.picker = function (styleName, sensor, styles) {
  return SensorStyles[styleName](SensorStyles_conf(sensor, styles));
};

SensorStyles.snap = function (conf) {
  return "@font-face {\n  /* Aloes Regular - latin */\n  font-family: 'Aloes-Rg';\n  font-weight: normal;\n  font-style: normal;\n  src: url('/fonts/Aloes/Aloes-Rg.woff2') format('woff2'),\n    url('/fonts/Aloes/Aloes-Rg.woff') format('woff'),\n    url('/fonts/Aloes/Aloes-Rg.eot') format('embedded-opentype'),\n    url('/fonts/Aloes/Aloes-Rg.ttf') format('truetype');\n}\n@font-face {\n  /* Aloes Bold - latin */\n  font-family: 'Aloes-Bd';\n  font-weight: normal;\n  font-style: normal;\n  src: url('/fonts/Aloes/Aloes-Bd.woff2') format('woff2'),\n    url('/fonts/Aloes/Aloes-Bd.woff') format('woff'),\n    url('/fonts/Aloes/Aloes-Bd.eot') format('embedded-opentype'),\n    url('/fonts/Aloes/Aloes-Bd.ttf') format('truetype');\n}\ndiv.sensor-snap {\n  --font-color: ".concat(conf.fontColor, ";\n  --grey: ").concat(conf.grey, ";\n  --primary-color: ").concat(conf.primaryColor, ";\n  --secondary-color: ").concat(conf.secondaryColor, ";\n  --success: ").concat(conf.successColor, ";\n  --warning: ").concat(conf.warningColor, ";\n  --danger: ").concat(conf.dangerColor, ";\n  --border-radius: ").concat(conf.width / 30, "px;\n  --border: 1px solid transparent;\n  --box-shadow: 0 ").concat(conf.width / 70, "px ").concat(conf.width / 35, "px 0px #6e6e6e;\n  --box-shadow-selected: 0 ").concat(conf.width / 75, "px ").concat(conf.width / 100, "px 0px #6e6e6e;\n  text-align: center;\n  font-family: ").concat(conf.fontFamily, ";\n}\ndiv.sensor-snap > svg.sensor {\n  border-radius: var(--border-radius);\n  border: var(--border);\n  box-shadow: var(--box-shadow);\n  -webkit-transition: box-shadow 150ms ease;\n  transition: box-shadow 150ms ease;\n  point-event: none;\n}\ndiv.sensor-snap > svg.sensor:hover {\n  box-shadow: var(--box-shadow-selected);\n}\ndiv.sensor-snap > .sensor-component {\n  border-radius: var(--border-radius);\n  border: var(--border);\n  box-shadow: var(--box-shadow);\n  -webkit-transition: box-shadow 150ms ease;\n  transition: box-shadow 150ms ease;\n  point-event: none;\n}\ndiv.sensor-snap > .sensor-component:hover {\n  box-shadow: var(--box-shadow-selected);\n}\ndiv.sensor-snap > svg > text.sensor-title {\n  fill: var(--primary-color);\n  cursor: pointer;\n  font-size: ").concat(conf.height / 16, "px;\n  font-weight: 700;\n}\ndiv.sensor-snap > svg > circle.delete-button {\n  fill: var(--danger);\n  stroke: var(--warning);\n  stroke-width: ").concat(conf.width / 50, "px;\n  cursor: pointer;\n}\ndiv.sensor-snap > svg > circle.delete-button:hover {\n  stroke-width: ").concat(conf.width / 35, "px;\n}\ndiv.sensor-snap > svg > g > text.sensor-details {\n  font-size: ").concat(conf.height / 20, "px;\n  font-weight: 400;\n}");
};

SensorStyles.audio = function (conf) {
  return "svg.sensor-timer {\n  --font-color: ".concat(conf.fontColor, ";\n  --primary-color: ").concat(conf.primaryColor, ";\n  --secondary-color: ").concat(conf.secondaryColor, ";\n  --success: ").concat(conf.successColor, ";\n  --warning: ").concat(conf.warningColor, ";\n  --danger: ").concat(conf.dangerColor, ";\n  text-align: center;\n}");
};

SensorStyles.camera = function (conf) {
  return CameraStyle(conf);
};

SensorStyles.color = function (conf) {
  return "svg.sensor-color {\n  --font-color: ".concat(conf.fontColor, ";\n  --primary-color: ").concat(conf.primaryColor, ";\n  --secondary-color: ").concat(conf.secondaryColor, ";\n  --success: ").concat(conf.successColor, ";\n  --warning: ").concat(conf.warningColor, ";\n  --danger: ").concat(conf.dangerColor, ";\n  --border: 1px solid transparent;\n  --box-shadow: 0 1px 2px 0px #6e6e6e;\n  --box-shadow-selected: 0 0px 1px 0px #6e6e6e;\n  text-align: center;\n}");
}; //  SensorStyles.energy = sensor => {};


SensorStyles.gauge = function (conf) {
  return GaugeStyle(conf);
}; //  SensorStyles.joystick = sensor => {};


SensorStyles.level = function (conf) {
  return LevelStyle(conf);
}; //  SensorStyles.magnetometer = sensor => {};


SensorStyles.map = function (conf) {
  return "svg.sensor-map {\n  --font-color: ".concat(conf.fontColor, ";\n  --primary-color: ").concat(conf.primaryColor, ";\n  --secondary-color: ").concat(conf.secondaryColor, ";\n  --success: ").concat(conf.successColor, ";\n  --warning: ").concat(conf.warningColor, ";\n  --danger: ").concat(conf.dangerColor, ";\n  --border: 1px solid transparent;\n  --box-shadow: 0 1px 2px 0px #6e6e6e;\n  --box-shadow-selected: 0 0px 1px 0px #6e6e6e;\n  text-align: center;\n}");
}; //  SensorStyles.power = sensor => {};


SensorStyles.switch = function (conf) {
  return SwitchStyle(conf);
}; //  SensorStyles.text = sensor => {};


SensorStyles.timer = function (conf) {
  return "svg.sensor-timer {\n  --font-color: ".concat(conf.fontColor, ";\n  --primary-color: ").concat(conf.primaryColor, ";\n  --secondary-color: ").concat(conf.secondaryColor, ";\n  --success: ").concat(conf.successColor, ";\n  --warning: ").concat(conf.warningColor, ";\n  --danger: ").concat(conf.dangerColor, ";\n  --border: 1px solid transparent;\n  --box-shadow: 0 1px 2px 0px #6e6e6e;\n  --box-shadow-selected: 0 0px 1px 0px #6e6e6e;\n  text-align: center;\n}");
};

SensorStyles.time = function (conf) {
  return TimeStyle(conf);
};

/* harmony default export */ var styles_SensorStyles = (SensorStyles);
// EXTERNAL MODULE: ./src/assets/device-tree.json
var device_tree = __webpack_require__("e0a6");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"66eeb948-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./build-utils/global-vue-loader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/SensorSwitch.vue?vue&type=template&id=5b718f8e&lang=html&
var SensorSwitchvue_type_template_id_5b718f8e_lang_html_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.updatedSensor.type && _vm.hasRightType(_vm.updatedSensor.type))?_c('svg',{staticClass:"sensor-switch",attrs:{"viewBox":_vm.viewBox,"height":_vm.updatedHeight,"width":_vm.updatedWidth,"xmlns":"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"}},[_c('text',{staticClass:"sensor-title",attrs:{"transform":("translate(" + (_vm.updatedWidth / 2) + ", " + (_vm.updatedHeight / 10) + ")"),"text-anchor":"middle","x":"0"},on:{"click":function($event){_vm.flipSide(!_vm.aSide)}}},[_vm._v("\n    "+_vm._s(_vm.updatedSensor.name)+"\n  ")]),_c('circle',{staticClass:"delete-button",attrs:{"transform":("translate(" + (_vm.updatedWidth / 1.2) + ", " + (_vm.updatedHeight / 10) + ")"),"r":("" + (_vm.updatedWidth / 15))},on:{"click":function($event){_vm.deleteSensor(_vm.updatedSensor)}}}),(_vm.updatedSensor.type === 3200 || _vm.updatedSensor.type === 3342)?_c('g',{attrs:{"transform":("translate(" + (_vm.updatedWidth / 10) + ", " + (_vm.updatedHeight / 6.4) + ")")},on:{"click":function($event){$event.preventDefault();$event.stopPropagation();_vm.updateSensor(_vm.updatedSensor, 5500, !_vm.updatedSensor.resources['5500'])}}},[_c('image',_vm._b({staticClass:"sensor-icon",attrs:{"x":"0","y":"0","transform":("translate(" + (_vm.updatedWidth / 5) + ", " + (_vm.updatedHeight / 5.3) + ")"),"height":("" + (_vm.updatedHeight / 2.67)),"width":("" + (_vm.updatedWidth / 2.5))}},'image',{
        'xlink:href': _vm.updatedSensor.resources['5500']
          ? _vm.updatedSensor.icons[0]
          : _vm.updatedSensor.icons[1]
      },false)),_c('circle',{staticClass:"sensor-button",attrs:{"stroke":_vm.updatedSensor.resources['5500']
          ? _vm.colors.successColor
          : _vm.colors.warningColor,"cy":("" + (_vm.updatedHeight / 2.67)),"cx":("" + (_vm.updatedWidth / 2.5)),"r":("" + (_vm.updatedWidth / 2.5))}})]):(_vm.updatedSensor.type === 3201)?_c('g',{attrs:{"transform":("translate(" + (_vm.updatedWidth / 10) + ", " + (_vm.updatedHeight / 6.4) + ")")},on:{"click":function($event){$event.preventDefault();$event.stopPropagation();_vm.updateSensor(_vm.updatedSensor, 5550, !_vm.updatedSensor.resources['5550'])}}},[_c('image',_vm._b({staticClass:"sensor-icon",attrs:{"x":"0","y":"0","transform":("translate(" + (_vm.updatedWidth / 5) + ", " + (_vm.updatedHeight / 5.3) + ")"),"height":("" + (_vm.updatedHeight / 2.67)),"width":("" + (_vm.updatedWidth / 2.5))}},'image',{
        'xlink:href': _vm.updatedSensor.resources['5550']
          ? _vm.updatedSensor.icons[0]
          : _vm.updatedSensor.icons[1]
      },false)),_c('circle',{staticClass:"sensor-button",attrs:{"stroke":_vm.updatedSensor.resources['5550']
          ? _vm.colors.successColor
          : _vm.colors.warningColor,"cy":("" + (_vm.updatedHeight / 2.67)),"cx":("" + (_vm.updatedWidth / 2.5)),"r":("" + (_vm.updatedWidth / 2.5))}})]):_vm._e()]):_vm._e()}
var SensorSwitchvue_type_template_id_5b718f8e_lang_html_staticRenderFns = []


// CONCATENATED MODULE: ./src/SensorSwitch.vue?vue&type=template&id=5b718f8e&lang=html&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./build-utils/global-vue-loader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/SensorSwitch.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* eslint-disable no-console */


if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('SensorSwitch', component.exports);
}

/* harmony default export */ var SensorSwitchvue_type_script_lang_js_ = ({
  name: 'SensorSwitch',
  props: {
    sensor: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      default: 150
    },
    height: {
      type: Number,
      default: 140
    }
  },
  data: function data() {
    return {
      updatedSensor: null,
      updatedWidth: null,
      updatedHeight: null,
      aSide: true
    };
  },
  computed: {
    viewBox: function viewBox() {
      return "0 0 ".concat(this.updatedWidth, " ").concat(this.updatedHeight);
    },
    colors: function colors() {
      return components_list.switch.colors;
    }
  },
  watch: {
    sensor: {
      handler: function handler(sensor) {
        this.updatedSensor = JSON.parse(sensor);
      },
      immediate: true
    },
    width: {
      handler: function handler(width) {
        this.updatedWidth = width;
      },
      immediate: true
    },
    height: {
      handler: function handler(height) {
        this.updatedHeight = height;
      },
      immediate: true
    }
  },
  mounted: function mounted() {},
  beforeDestroy: function beforeDestroy() {},
  methods: {
    hasRightType: function hasRightType(type) {
      return components_list.switch.list.find(function (objectId) {
        return objectId === type;
      });
    },
    flipSide: function flipSide(value) {
      this.$emit('flip-side', value);
    },
    updateSensor: function updateSensor() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this.$emit.apply(this, ['update-sensor'].concat(args));
    },
    deleteSensor: function deleteSensor() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      this.$emit.apply(this, ['delete-sensor'].concat(args));
    }
  }
});
// CONCATENATED MODULE: ./src/SensorSwitch.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_SensorSwitchvue_type_script_lang_js_ = (SensorSwitchvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/SensorSwitch.vue





/* normalize component */

var SensorSwitch_component = normalizeComponent(
  src_SensorSwitchvue_type_script_lang_js_,
  SensorSwitchvue_type_template_id_5b718f8e_lang_html_render,
  SensorSwitchvue_type_template_id_5b718f8e_lang_html_staticRenderFns,
  false,
  null,
  null,
  null
  
)

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('SensorSwitch', SensorSwitch_component.exports)
}
/* harmony default export */ var SensorSwitch = (SensorSwitch_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"66eeb948-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./build-utils/global-vue-loader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/SensorTime.vue?vue&type=template&id=55c50771&lang=html&
var SensorTimevue_type_template_id_55c50771_lang_html_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.updatedSensor.type === 3333)?_c('svg',{staticClass:"sensor-time",attrs:{"id":("sensorTime-" + (_vm.updatedSensor.id)),"height":_vm.updatedHeight,"width":_vm.updatedWidth,"viewBox":_vm.viewBox,"xmlns":"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"}},[_c('text',{staticClass:"sensor-title",attrs:{"transform":("translate(" + (_vm.updatedWidth / 2) + ", " + (_vm.updatedHeight / 10) + ")"),"text-anchor":"middle","x":"0"},on:{"click":function($event){_vm.flipSide(!_vm.aSide)}}},[_vm._v("\n    "+_vm._s(_vm.updatedSensor.name)+"\n  ")]),_c('circle',{staticClass:"delete-button",attrs:{"transform":("translate(" + (_vm.updatedWidth / 1.2) + ", " + (_vm.updatedHeight / 10) + ")"),"r":("" + (_vm.updatedWidth / 15))},on:{"click":function($event){$event.preventDefault();$event.stopPropagation();_vm.deleteSensor(_vm.updatedSensor)}}}),_c('image',_vm._b({staticClass:"show-clock",attrs:{"transform":("translate(" + (_vm.updatedWidth / 10) + ", " + (_vm.updatedHeight / 20) + ")"),"height":("" + (_vm.updatedHeight / 10)),"width":("" + (_vm.updatedWidth / 10))},on:{"click":function($event){$event.preventDefault();$event.stopPropagation();_vm.showClock = !_vm.showClock}}},'image',{
      'xlink:href': _vm.showClock ? _vm.agendaIcon : _vm.updatedSensor.icons[0]
    },false)),_c('defs',[_c('g',{attrs:{"id":("secondHand-" + (_vm.updatedSensor.id))}},[_c('line',{attrs:{"id":("secondHandLine-" + (_vm.updatedSensor.id)),"x1":"0","y1":-_vm.radius / 1.1,"x2":"0","y2":"0","stroke":_vm.colors.secondaryColor,"stroke-width":_vm.radius / 16,"transform":"rotate(0)"}}),_c('animateTransform',{attrs:{"attributeName":"transform","attributeType":"XML","type":"rotate","from":"0","to":"360","dur":"60s","repeatCount":"indefinite"}})],1),_c('g',{attrs:{"id":("minuteHand-" + (_vm.updatedSensor.id))}},[_c('line',{attrs:{"id":("minuteHandLine-" + (_vm.updatedSensor.id)),"x1":"0","y1":-_vm.radius / 1.2,"x2":"0","y2":"0","stroke":_vm.colors.primaryColor,"stroke-width":_vm.radius / 12,"transform":"rotate(0)"}}),_c('animateTransform',{attrs:{"attributeName":"transform","attributeType":"XML","type":"rotate","from":"0","to":"360","dur":"60min","repeatCount":"indefinite"}})],1),_c('g',{attrs:{"id":("hourHand-" + (_vm.updatedSensor.id))}},[_c('line',{attrs:{"id":("hourHandLine-" + (_vm.updatedSensor.id)),"x1":"0","y1":-_vm.radius / 1.3,"x2":"0","y2":"0","stroke":_vm.colors.primaryColor,"stroke-width":_vm.radius / 10,"transform":"rotate(0)"}}),_c('animateTransform',{attrs:{"attributeName":"transform","attributeType":"XML","type":"rotate","from":"0","to":"360","dur":"12h","repeatCount":"indefinite"}})],1),_c('g',{attrs:{"id":("hourScale-" + (_vm.updatedSensor.id))}},[_c('circle',{attrs:{"id":"hourScaleLine","cx":_vm.radius / 100,"cy":-(_vm.radius / 1.2 - _vm.radius / 100),"r":_vm.radius / 15,"stroke":"none","fill":_vm.colors.primaryColor}}),_c('circle',{attrs:{"id":"hourScaleLine","cx":"0","cy":-_vm.radius / 1.2,"r":_vm.radius / 15,"stroke":"none","fill":"#ededed"}})]),_c('g',{staticClass:"clock",attrs:{"id":("clock-" + (_vm.updatedSensor.id))}},[_c('circle',{attrs:{"cx":_vm.radius / 150,"cy":_vm.radius / 100,"r":_vm.radius - _vm.radius / 100,"fill":"none","stroke":"#ededed","stroke-width":_vm.updatedWidth / 40}}),_c('circle',{attrs:{"cx":"0","cy":"0","r":_vm.radius,"fill":"none","stroke":_vm.colors.secondaryColor,"stroke-width":_vm.updatedWidth / 40}}),_c('use',_vm._b({attrs:{"transform":"rotate(30)"}},'use',{ 'xlink:href': ("#hourScale-" + (_vm.updatedSensor.id)) },false)),_c('use',_vm._b({attrs:{"transform":"rotate(60)"}},'use',{ 'xlink:href': ("#hourScale-" + (_vm.updatedSensor.id)) },false)),_c('use',_vm._b({attrs:{"transform":"rotate(90)"}},'use',{ 'xlink:href': ("#hourScale-" + (_vm.updatedSensor.id)) },false)),_c('use',_vm._b({attrs:{"transform":"rotate(120)"}},'use',{ 'xlink:href': ("#hourScale-" + (_vm.updatedSensor.id)) },false)),_c('use',_vm._b({attrs:{"transform":"rotate(150)"}},'use',{ 'xlink:href': ("#hourScale-" + (_vm.updatedSensor.id)) },false)),_c('use',_vm._b({attrs:{"transform":"rotate(180)"}},'use',{ 'xlink:href': ("#hourScale-" + (_vm.updatedSensor.id)) },false)),_c('use',_vm._b({attrs:{"transform":"rotate(210)"}},'use',{ 'xlink:href': ("#hourScale-" + (_vm.updatedSensor.id)) },false)),_c('use',_vm._b({attrs:{"transform":"rotate(240)"}},'use',{ 'xlink:href': ("#hourScale-" + (_vm.updatedSensor.id)) },false)),_c('use',_vm._b({attrs:{"transform":"rotate(270)"}},'use',{ 'xlink:href': ("#hourScale-" + (_vm.updatedSensor.id)) },false)),_c('use',_vm._b({attrs:{"transform":"rotate(300)"}},'use',{ 'xlink:href': ("#hourScale-" + (_vm.updatedSensor.id)) },false)),_c('use',_vm._b({attrs:{"transform":"rotate(330)"}},'use',{ 'xlink:href': ("#hourScale-" + (_vm.updatedSensor.id)) },false)),_c('use',_vm._b({attrs:{"transform":"translate(0, 0)"}},'use',{ 'xlink:href': ("#secondHand-" + (_vm.updatedSensor.id)) },false)),_c('use',_vm._b({attrs:{"transform":"translate(0, 0)"}},'use',{ 'xlink:href': ("#minuteHand-" + (_vm.updatedSensor.id)) },false)),_c('use',_vm._b({attrs:{"transform":"translate(0, 0)"}},'use',{ 'xlink:href': ("#hourHand-" + (_vm.updatedSensor.id)) },false)),_c('circle',{attrs:{"cx":"0","cy":"0","r":"13","fill":"","stroke":"#ededed","stroke-width":"20"}})]),_c('g',{staticClass:"calendar-weeks",attrs:{"id":("calendarWeek-" + (_vm.updatedSensor.id))}},_vm._l((_vm.weekDays),function(weekDay,index){return _c('text',{key:index,attrs:{"x":_vm.calendarDayWidth(weekDay.x),"y":"0"}},[_vm._v("\n        "+_vm._s(weekDay.value)+"\n      ")])}),0),_c('g',{staticClass:"calendar-days",attrs:{"id":("calendarDay-" + (_vm.updatedSensor.id))}},_vm._l((_vm.days),function(day,index){return _c('text',{key:index,attrs:{"id":("calendarDay-" + (index + 1) + "-" + (_vm.updatedSensor.id)),"x":_vm.calendarDayWidth(day.x),"y":_vm.calendarDayHeight(day.y)},on:{"click":function($event){$event.preventDefault();$event.stopPropagation();_vm.showDay(day, index)}}})}),0),_c('g',{attrs:{"id":("calendar-" + (_vm.updatedSensor.id))}},[_c('rect',{attrs:{"x":"0","y":"0","width":_vm.updatedWidth,"height":_vm.calendarHeight / 4,"fill":_vm.colors.secondaryColor}}),_c('rect',{attrs:{"x":"0","y":_vm.calendarHeight / 4,"width":_vm.updatedWidth,"height":_vm.calendarHeight,"fill":"#fff"}}),_c('text',{staticClass:"calendar-month",attrs:{"id":("calendarMonth-" + (_vm.updatedSensor.id)),"x":_vm.updatedWidth / 3,"y":_vm.calendarHeight / 6.5}}),_c('text',{staticClass:"calendar-year",attrs:{"id":("calendarYear-" + (_vm.updatedSensor.id)),"x":_vm.updatedWidth / 4,"y":_vm.calendarHeight / 6.5}}),_c('use',_vm._b({attrs:{"transform":("translate(" + (_vm.calendarWidth / 28) + ", " + (_vm.calendarHeight / 2.6) + ")")}},'use',{ 'xlink:href': ("#calendarWeek-" + (_vm.updatedSensor.id)) },false)),_c('use',_vm._b({attrs:{"transform":("translate(" + (_vm.calendarWidth / 28) + ", " + (_vm.calendarHeight / 2.6) + ")")}},'use',{ 'xlink:href': ("#calendarDay-" + (_vm.updatedSensor.id)) },false))])]),_c('use',_vm._b({directives:[{name:"show",rawName:"v-show",value:(_vm.showClock),expression:"showClock"}],attrs:{"transform":("translate(" + (_vm.updatedWidth / 2) + ", " + (_vm.updatedHeight / 1.8) + ")")},on:{"click":function($event){$event.preventDefault();$event.stopPropagation();_vm.updateSensor(_vm.updatedSensor, 5507, _vm.getSeconds)}}},'use',{ 'xlink:href': ("#clock-" + (_vm.updatedSensor.id)) },false)),_c('use',_vm._b({directives:[{name:"show",rawName:"v-show",value:(!_vm.showClock),expression:"!showClock"}],attrs:{"transform":("translate(0, " + (_vm.updatedHeight / 5.5) + ")")},on:{"click":function($event){$event.preventDefault();$event.stopPropagation();_vm.updateSensor(_vm.updatedSensor, 5506, Date.now())}}},'use',{ 'xlink:href': ("#calendar-" + (_vm.updatedSensor.id)) },false))]):_vm._e()}
var SensorTimevue_type_template_id_55c50771_lang_html_staticRenderFns = []


// CONCATENATED MODULE: ./src/SensorTime.vue?vue&type=template&id=55c50771&lang=html&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./build-utils/global-vue-loader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/SensorTime.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* eslint-disable no-console */


if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('SensorTime', component.exports);
}

/* harmony default export */ var SensorTimevue_type_script_lang_js_ = ({
  name: 'SensorTime',
  props: {
    sensor: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      default: 150
    },
    height: {
      type: Number,
      default: 140
    }
  },
  data: function data() {
    return {
      updatedSensor: null,
      updatedWidth: null,
      updatedHeight: null,
      showClock: true,
      agendaIcon: '/icons/aloes/agenda.svg',
      hands: [],
      colors: components_list.time.colors,
      aSide: true,
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      days: [{
        x: 7,
        y: 5
      }, {
        x: 6,
        y: 5
      }, {
        x: 5,
        y: 5
      }, {
        x: 4,
        y: 5
      }, {
        x: 3,
        y: 5
      }, {
        x: 2,
        y: 5
      }, {
        x: 1,
        y: 5
      }, {
        x: 7,
        y: 4
      }, {
        x: 6,
        y: 4
      }, {
        x: 5,
        y: 4
      }, {
        x: 4,
        y: 4
      }, {
        x: 3,
        y: 4
      }, {
        x: 2,
        y: 4
      }, {
        x: 1,
        y: 4
      }, {
        x: 7,
        y: 3
      }, {
        x: 6,
        y: 3
      }, {
        x: 5,
        y: 3
      }, {
        x: 4,
        y: 3
      }, {
        x: 3,
        y: 3
      }, {
        x: 2,
        y: 3
      }, {
        x: 1,
        y: 3
      }, {
        x: 7,
        y: 2
      }, {
        x: 6,
        y: 2
      }, {
        x: 5,
        y: 2
      }, {
        x: 4,
        y: 2
      }, {
        x: 3,
        y: 2
      }, {
        x: 2,
        y: 2
      }, {
        x: 1,
        y: 2
      }, {
        x: 7,
        y: 1
      }, {
        x: 6,
        y: 1
      }, {
        x: 5,
        y: 1
      }, {
        x: 4,
        y: 1
      }, {
        x: 3,
        y: 1
      }, {
        x: 2,
        y: 1
      }, {
        x: 1,
        y: 1
      }, {
        x: 7,
        y: 0
      }, {
        x: 6,
        y: 0
      }],
      weekDays: [{
        value: 'Su',
        x: 7,
        y: 0
      }, {
        value: 'Mo',
        x: 6,
        y: 0
      }, {
        value: 'Tu',
        x: 5,
        y: 0
      }, {
        value: 'We',
        x: 4,
        y: 0
      }, {
        value: 'Th',
        x: 3,
        y: 0
      }, {
        value: 'Fr',
        x: 2,
        y: 0
      }, {
        value: 'Sa',
        x: 1,
        y: 0
      }]
    };
  },
  computed: {
    viewBox: function viewBox() {
      return "0 0 ".concat(this.updatedWidth, " ").concat(this.updatedHeight);
    },
    radius: function radius() {
      return this.updatedWidth / 2.5;
    },
    dateConverter: function dateConverter() {
      //  const d = new Date(this.updatedSensor.resources["5506"] * 1000) || new Date();
      var d = new Date();
      return "".concat(d.getDate(), " ").concat(this.months[d.getMonth()], " ").concat(d.getFullYear());
    },
    getSeconds: function getSeconds() {
      var d = new Date();
      return d.getSeconds();
    },
    calendarWidth: function calendarWidth() {
      return this.updatedWidth;
    },
    calendarHeight: function calendarHeight() {
      return this.updatedHeight / 1.6;
    }
  },
  watch: {
    sensor: {
      handler: function handler(sensor) {
        this.updatedSensor = JSON.parse(sensor);
      },
      immediate: true
    },
    width: {
      handler: function handler(width) {
        this.updatedWidth = width;
      },
      immediate: true
    },
    height: {
      handler: function handler(height) {
        this.updatedHeight = height;
      },
      immediate: true
    }
  },
  mounted: function mounted() {
    console.log(this.updatedSensor);

    if (this.updatedSensor.type === 3333) {
      var nowTime = new Date();
      this.displayTime(nowTime);
    }
  },
  beforeDestroy: function beforeDestroy() {},
  methods: {
    updateSensor: function updateSensor() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this.$emit.apply(this, ['update-sensor'].concat(args));
    },
    deleteSensor: function deleteSensor() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      this.$emit.apply(this, ['delete-sensor'].concat(args));
    },
    flipSide: function flipSide(value) {
      this.$emit('flip-side', value);
    },
    showDay: function showDay() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      console.log('showDay', args);
    },
    calendarDayWidth: function calendarDayWidth(x) {
      return this.calendarWidth - this.calendarWidth / 7 * x;
    },
    calendarDayHeight: function calendarDayHeight(x) {
      return this.calendarHeight - this.calendarHeight / 6 * x;
    },
    displayTime: function displayTime(nowTime) {
      //  console.log("displayTime", date);
      document.querySelector("#secondHandLine-".concat(this.updatedSensor.id)).setAttribute('transform', 'rotate(' + nowTime.getSeconds() / 60 * 360 + ')');
      document.querySelector("#minuteHandLine-".concat(this.updatedSensor.id)).setAttribute('transform', 'rotate(' + nowTime.getMinutes() / 60 * 360 + ')');
      document.querySelector("#hourHandLine-".concat(this.updatedSensor.id)).setAttribute('transform', 'rotate(' + nowTime.getHours() % 12 / 12 * 360 + ')');
      document.querySelector("#calendarYear-".concat(this.updatedSensor.id)).textContent = this.dateConverter;
      var firstDay = new Date(nowTime.getFullYear(), nowTime.getMonth(), 1).getDay();
      var endDate = new Date(nowTime.getFullYear(), nowTime.getMonth() + 1, 0).getDate();
      var dayCounter = 1;

      for (var i = 0; i <= 37; i++) {
        if (i > firstDay) {
          document.querySelector("#calendarDay-".concat(i, "-").concat(this.updatedSensor.id)).textContent = dayCounter < 10 ? '0' + dayCounter : dayCounter;
          dayCounter++;

          if (dayCounter > endDate) {
            break;
          }
        }
      }

      document.querySelector("#calendarDay-".concat(firstDay + nowTime.getDate(), "-").concat(this.updatedSensor.id)).setAttribute('fill', '#E76C6C');
      document.querySelector("#calendarDay-".concat(firstDay + nowTime.getDate(), "-").concat(this.updatedSensor.id)).setAttribute('font-weight', 'bold');
    }
  }
});
// CONCATENATED MODULE: ./src/SensorTime.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_SensorTimevue_type_script_lang_js_ = (SensorTimevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/SensorTime.vue





/* normalize component */

var SensorTime_component = normalizeComponent(
  src_SensorTimevue_type_script_lang_js_,
  SensorTimevue_type_template_id_55c50771_lang_html_render,
  SensorTimevue_type_template_id_55c50771_lang_html_staticRenderFns,
  false,
  null,
  null,
  null
  
)

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('SensorTime', SensorTime_component.exports)
}
/* harmony default export */ var SensorTime = (SensorTime_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./build-utils/global-vue-loader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/SensorSnap.vue?vue&type=script&lang=js&










function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* eslint-disable no-console */









var defaultSensor = device_tree.children[7];

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('SensorSnap', component.exports);
}

/* harmony default export */ var SensorSnapvue_type_script_lang_js_ = ({
  name: 'SensorSnap',
  components: {
    'sensor-camera': SensorCamera,
    'sensor-gauge': SensorGauge,
    'sensor-level': SensorLevel,
    'sensor-switch': SensorSwitch,
    'sensor-time': SensorTime
  },
  props: {
    id: {
      type: String,
      required: true,
      default: function _default() {
        return defaultSensor.id.toString();
      }
    },
    deviceId: {
      type: String,
      required: true,
      default: defaultSensor.deviceId.toString()
    },
    name: {
      type: String,
      required: true,
      default: defaultSensor.name
    },
    type: {
      type: Number,
      required: true,
      default: defaultSensor.type
    },
    resources: {
      type: String,
      required: true,
      default: function _default() {
        return JSON.stringify(defaultSensor.resources);
      }
    },
    resource: {
      type: Number,
      required: true,
      default: defaultSensor.resource
    },
    icons: {
      type: String,
      required: false,
      default: function _default() {
        return defaultSensor.icons.toString();
      }
    },
    colors: {
      type: String,
      required: false,
      default: function _default() {
        return defaultSensor.colors.toString();
      }
    },
    value: {
      type: String,
      required: true,
      default: function _default() {
        return defaultSensor.value.toString();
      }
    },
    frameCounter: {
      type: Number,
      required: false,
      default: defaultSensor.frameCounter
    },
    devEui: {
      type: String,
      required: true,
      default: defaultSensor.devEui
    },
    protocolName: {
      type: String,
      required: true,
      default: defaultSensor.protocolName
    },
    protocolVersion: {
      type: String,
      required: false,
      default: defaultSensor.protocolVersion
    },
    inputPath: {
      type: String,
      required: false,
      default: defaultSensor.inputPath || ''
    },
    outputPath: {
      type: String,
      required: false,
      default: defaultSensor.outputPath || ''
    },
    inPrefix: {
      type: String,
      required: true,
      default: defaultSensor.inPrefix
    },
    outPrefix: {
      type: String,
      required: true,
      default: defaultSensor.outPrefix
    },
    nativeSensorId: {
      type: String,
      required: true,
      default: defaultSensor.nativeSensorId
    },
    nativeNodeId: {
      type: String,
      required: false,
      default: defaultSensor.nativeNodeId || null
    },
    width: {
      type: Number,
      default: 450
    },
    height: {
      type: Number,
      default: 480
    }
  },
  data: function data() {
    return {
      style: null,
      updatedName: null,
      updatedType: null,
      updatedValue: null,
      updatedIcons: null,
      updatedColors: null,
      updatedResources: null,
      updatedResource: null,
      updatedSensor: null,
      updatedWidth: null,
      updatedHeight: null,
      aSide: true
    };
  },
  computed: {
    componentType: function componentType() {
      var _this = this;

      if (this.updatedType === components_list.audio.list[0]) {//  return "audio"
        //  return null;
      } else if (components_list.camera.list.find(function (objectId) {
        return objectId === _this.updatedType;
      })) {
        return 'camera';
      } else if (this.updatedType === components_list.color.list[0]) {
        //  return "color";
        return null;
      } else if (components_list.gauge.list.find(function (objectId) {
        return objectId === _this.updatedType;
      })) {
        return 'gauge';
      } else if (components_list.level.list.find(function (objectId) {
        return objectId === _this.updatedType;
      })) {
        return 'level';
      } else if (this.updatedType === components_list.map.list[0]) {
        //  return "map"
        return null;
      } else if (components_list.switch.list.find(function (objectId) {
        return objectId === _this.updatedType;
      })) {
        return 'switch';
      } else if (components_list.time.list.find(function (objectId) {
        return objectId === _this.updatedType;
      })) {
        return 'time';
      } else if (components_list.timer.list.find(function (objectId) {
        return objectId === _this.updatedType;
      })) {
        //  return "timer"
        return null;
      }

      return null;
    },
    refName: function refName() {
      if (!this.componentType && this.componentType === null) return null;
      return components_list[this.componentType].name;
    },
    componentName: function componentName() {
      if (!this.refName || this.refName === null) return null;
      return this.refName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    },
    sensor: {
      get: function get() {
        return this.formatSensor();
      },
      set: function set(value) {
        this.updatedSensor = value;
      }
    },
    stylesConf: function stylesConf() {
      if (!this.componentType) {
        return {
          height: this.updatedHeight,
          width: this.updatedWidth
        };
      }

      return _objectSpread({
        height: this.updatedHeight,
        width: this.updatedWidth
      }, components_list[this.componentType].colors);
    }
  },
  watch: {
    name: {
      handler: function handler(name) {
        this.updatedName = name;
      },
      immediate: true
    },
    type: {
      handler: function handler(type) {
        this.updatedType = Number(type);
      },
      immediate: true
    },
    value: {
      handler: function handler(value) {
        //  this.parseUpdatedValue(value);
        this.updatedValue = JSON.parse(value);
      },
      immediate: true
    },
    icons: {
      handler: function handler(icons) {
        this.updatedIcons = icons.split(',');
      },
      immediate: true
    },
    colors: {
      handler: function handler(colors) {
        this.updatedColors = colors.split(',');
      },
      immediate: true
    },
    resources: {
      handler: function handler(resources) {
        this.updatedResources = JSON.parse(resources);
      },
      immediate: true
    },
    resource: {
      handler: function handler(resource) {
        this.updatedResource = resource;
      },
      immediate: true
    },
    width: {
      handler: function handler(width) {
        this.updatedWidth = width;
      },
      immediate: true
    },
    height: {
      handler: function handler(height) {
        this.updatedHeight = height;
      },
      immediate: true
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    this.style = document.createElement('style');
    this.$nextTick(function () {
      if (_this2.style !== null) {
        var styles = _this2.updateStyles(_this2.componentName);

        _this2.style.innerHTML = styles;

        _this2.$el.prepend(_this2.style);
      }
    });
  },
  beforeDestroy: function beforeDestroy() {// this.removeListeners()
    //  this.$el.removeChild(this.style);
  },
  methods: {
    formatSensor: function formatSensor() {
      if (this.$props.protocolName.toLowerCase() === 'mysensors') {
        this.updatedSensor = {
          id: this.$props.id,
          deviceId: this.$props.deviceId,
          devEui: this.$props.devEui,
          frameCounter: this.$props.frameCounter,
          protocolName: this.$props.protocolName,
          protocolVersion: this.$props.protocolVersion,
          inputPath: this.$props.inputPath,
          outputPath: this.$props.outputPath,
          inPrefix: this.$props.inPrefix,
          outPrefix: this.$props.outPrefix,
          nativeSensorId: this.$props.nativeSensorId,
          nativeNodeId: this.$props.nativeNodeId,
          name: this.updatedName,
          type: this.updatedType,
          resources: this.updatedResources,
          resource: this.updatedResource,
          icons: this.updatedIcons,
          colors: this.updatedColors,
          value: this.updatedValue
        };
        return this.updatedSensor;
      } else if (this.$props.protocolName.toLowerCase() === 'aloeslight') {
        this.updatedSensor = {
          id: this.$props.id,
          deviceId: this.$props.deviceId,
          devEui: this.$props.devEui,
          frameCounter: this.$props.frameCounter,
          protocolName: this.$props.protocolName,
          protocolVersion: this.$props.protocolVersion,
          inputPath: this.$props.inputPath,
          outputPath: this.$props.outputPath,
          inPrefix: this.$props.inPrefix,
          outPrefix: this.$props.outPrefix,
          nativeSensorId: this.$props.nativeSensorId,
          name: this.updatedName,
          type: this.updatedType,
          resources: this.updatedResources,
          resource: this.updatedResource,
          icons: this.updatedIcons,
          colors: this.updatedColors,
          value: this.updatedValue
        };
        return this.updatedSensor;
      }

      return null;
    },
    updateSensor: function updateSensor() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (args[0] && args[0].id) {
        var sensor = Object(dist["updateAloesSensors"])(args[0], args[1], args[2]);
        this.sensor = sensor;
        this.$emit('update-sensor', sensor);
      }
    },
    deleteSensor: function deleteSensor() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      this.$emit.apply(this, ['delete-sensor'].concat(args));
    },
    flipSide: function flipSide(value) {
      if (this.refName !== null && this.sensor) {
        this.$refs["".concat(this.refName, "-").concat(this.sensor.id)].flipSide(value);
      }
    },
    onFlippedSide: function onFlippedSide(value) {
      this.aSide = value;
    },
    updateStyles: function updateStyles(componentName) {
      if (!componentName || componentName === null) return null;
      var styleName = componentName.split('-')[1];
      var styles = "".concat(styles_SensorStyles.picker('snap', this.sensor, this.stylesConf), " ").concat(styles_SensorStyles.picker(styleName, this.sensor, this.stylesConf)); //  console.log("updateStyles", styles);

      console.log('updateStyles', this.style);
      return styles;
    },
    sendCommand: function sendCommand(command, args) {
      // todo : validate inputs !!!
      this.$refs["".concat(this.refName, "-").concat(this.sensor.id)][command](args);
    }
  }
});
// CONCATENATED MODULE: ./src/SensorSnap.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_SensorSnapvue_type_script_lang_js_ = (SensorSnapvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/SensorSnap.vue





/* normalize component */

var SensorSnap_component = normalizeComponent(
  src_SensorSnapvue_type_script_lang_js_,
  SensorSnapvue_type_template_id_7c361652_render,
  SensorSnapvue_type_template_id_7c361652_staticRenderFns,
  false,
  null,
  null,
  null
  
)

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('SensorSnap', SensorSnap_component.exports)
}
/* harmony default export */ var SensorSnap = (SensorSnap_component.exports);
// CONCATENATED MODULE: ./src/index.js
// THIS FILE IS AUTOMATICALLY GENERATED IN:
//
//   build-utils/update-file-index.js
//
// YOU SHOULD NEVER UPDATE THIS FILE DIRECTLY





 // Export components individually

 // What should happen if the user installs the library as a plugin

function install(Vue) {
  Vue.component('SensorCamera', SensorCamera);
  Vue.component('SensorGauge', SensorGauge);
  Vue.component('SensorLevel', SensorLevel);
  Vue.component('SensorSnap', SensorSnap);
  Vue.component('SensorSwitch', SensorSwitch);
  Vue.component('SensorTime', SensorTime);
} // Export the library as a plugin


/* harmony default export */ var src = ({
  install: install
});
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js
/* concated harmony reexport SensorCamera */__webpack_require__.d(__webpack_exports__, "SensorCamera", function() { return SensorCamera; });
/* concated harmony reexport SensorGauge */__webpack_require__.d(__webpack_exports__, "SensorGauge", function() { return SensorGauge; });
/* concated harmony reexport SensorLevel */__webpack_require__.d(__webpack_exports__, "SensorLevel", function() { return SensorLevel; });
/* concated harmony reexport SensorSnap */__webpack_require__.d(__webpack_exports__, "SensorSnap", function() { return SensorSnap; });
/* concated harmony reexport SensorSwitch */__webpack_require__.d(__webpack_exports__, "SensorSwitch", function() { return SensorSwitch; });
/* concated harmony reexport SensorTime */__webpack_require__.d(__webpack_exports__, "SensorTime", function() { return SensorTime; });


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (src);



/***/ }),

/***/ "fdef":
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ })

/******/ });
//# sourceMappingURL=index.js.map