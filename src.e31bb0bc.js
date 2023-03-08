// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateState = updateState;
exports.elt = elt;
exports.hex = hex;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Update object state
 */
function updateState(state, action) {
  return _objectSpread(_objectSpread({}, state), action);
}
/**
 * A less verbose DOM builder
 */


function elt(type, props) {
  var dom = document.createElement(type);

  if (props) {
    Object.assign(dom, props);
  }

  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  for (var _i = 0, _children = children; _i < _children.length; _i++) {
    var child = _children[_i];

    if (typeof child !== 'string') {
      dom.appendChild(child);
    } else {
      dom.appendChild(document.createTextNode(child));
    }
  }

  return dom;
}
/**
 * A hex helper function facilitate conversion of from 8 bit
 * numerical presentation of color to base-16.
 */


function hex(n) {
  return n.toString(16).padStart(2, '0');
}
},{}],"components/picture.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawPicture = drawPicture;
exports.Picture = void 0;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Picture = /*#__PURE__*/function () {
  function Picture(width, height, pixels) {
    _classCallCheck(this, Picture);

    this.width = width;
    this.height = height;
    this.pixels = pixels;
  }

  _createClass(Picture, [{
    key: "pixel",
    value: function pixel(x, y) {
      return this.pixels[x + y * this.width];
    }
  }, {
    key: "draw",
    value: function draw(pixels) {
      var copy = this.pixels.slice();

      var _iterator = _createForOfIteratorHelper(pixels),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _step.value,
              x = _step$value.x,
              y = _step$value.y,
              color = _step$value.color;
          copy[x + y * this.width] = color;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return new Picture(this.width, this.height, copy);
    }
  }], [{
    key: "empty",
    value: function empty(width, height, color) {
      var pixels = new Array(width * height).fill(color);
      return new Picture(width, height, pixels);
    }
  }]);

  return Picture;
}();

exports.Picture = Picture;

function drawPicture(picture, canvas, scale) {
  canvas.width = picture.width * scale;
  canvas.height = picture.height * scale;
  var ctx = canvas.getContext('2d');

  for (var y = 0; y < picture.height; y++) {
    for (var x = 0; x < picture.width; x++) {
      ctx.fillStyle = picture.pixel(x, y);
      ctx.fillRect(x * scale, y * scale, scale, scale);
    }
  }
}
},{}],"components/picture-canvas.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PictureCanvas = void 0;

var _utils = require("../utils");

var _picture = require("./picture");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SCALE = 10;

var PictureCanvas = /*#__PURE__*/function () {
  function PictureCanvas(picture, pointerDown) {
    var _this = this;

    _classCallCheck(this, PictureCanvas);

    this.dom = (0, _utils.elt)('canvas', {
      onmousedown: function onmousedown(event) {
        return _this.mouse(event, pointerDown);
      },
      ontouchstart: function ontouchstart(event) {
        return _this.touch(event, pointerDown);
      }
    });
    this.syncState(picture);
  }

  _createClass(PictureCanvas, [{
    key: "syncState",
    value: function syncState(picture) {
      if (this.picture == picture) return;
      this.picture = picture;
      (0, _picture.drawPicture)(this.picture, this.dom, SCALE);
    }
  }]);

  return PictureCanvas;
}();

exports.PictureCanvas = PictureCanvas;

PictureCanvas.prototype.mouse = function (downEvent, onDown) {
  var _this2 = this;

  // return if not a left click
  if (downEvent.button != 0) return;
  var pos = pointerPosition(downEvent, this.dom);
  var onMove = onDown(pos);
  if (!onMove) return;

  var move = function move(moveEvent) {
    if (moveEvent.buttons == 0) {
      _this2.dom.removeEventListener('mousemove', move);
    } else {
      var newPos = pointerPosition(moveEvent, _this2.dom);
      if (newPos.x == pos.x && newPos.y == pos.y) return;
      onMove(newPos);
    }
  };

  this.dom.addEventListener('mousemove', move);
};

function pointerPosition(pos, domNode) {
  var rect = domNode.getBoundingClientRect();
  return {
    x: Math.floor((pos.clientX - rect.left) / SCALE),
    y: Math.floor((pos.clientY - rect.top) / SCALE)
  };
}

PictureCanvas.prototype.touch = function (startEvent, onDown) {
  var _this3 = this;

  var pos = pointerPosition(startEvent.touches[0], this.dom);
  var onMove = onDown(pos);
  startEvent.preventDefault();
  if (!onMove) return;

  var move = function move(moveEvent) {
    var newPos = pointerPosition(moveEvent.touches[0], _this3.dom);
    if (newPos.x == pos.x && newPos.y == pos.y) return;
    pos = newPos;
    onMove(newPos);
  };

  var end = function end() {
    _this3.dom.removeEventListener('touchmove', move);

    _this3.dom.removeEventListener('touchend', move);
  };

  this.dom.addEventListener('touchmove', move);
  this.dom.addEventListener('touchend', end);
};
},{"../utils":"utils.js","./picture":"components/picture.js"}],"app.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PixelEditor = void 0;

var _pictureCanvas = require("./components/picture-canvas");

var _utils = require("./utils");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PixelEditor = /*#__PURE__*/function () {
  function PixelEditor(state, config) {
    var _this = this;

    _classCallCheck(this, PixelEditor);

    var tools = config.tools,
        controls = config.controls,
        dispatch = config.dispatch;
    this.state = state;
    this.canvas = new _pictureCanvas.PictureCanvas(state.picture, function (pos) {
      var tool = tools[_this.state.tool];
      var onMove = tool(pos, _this.state, dispatch);

      if (onMove) {
        return function (pos) {
          return onMove(pos, _this.state);
        };
      }
    });
    this.controls = controls.map(function (Control) {
      return new Control(state, config);
    });
    this.dom = _utils.elt.apply(void 0, ['div', {}, this.canvas.dom, (0, _utils.elt)('br')].concat(_toConsumableArray(this.controls.reduce(function (a, c) {
      return a.concat(' ', c.dom);
    }, []))));
  }

  _createClass(PixelEditor, [{
    key: "syncState",
    value: function syncState(state) {
      this.state = state;
      this.canvas.syncState(state.picture);

      var _iterator = _createForOfIteratorHelper(this.controls),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var ctrl = _step.value;
          ctrl.syncState(state);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }]);

  return PixelEditor;
}();

exports.PixelEditor = PixelEditor;
},{"./components/picture-canvas":"components/picture-canvas.js","./utils":"utils.js"}],"controls/color-select.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColorSelect = void 0;

var _utils = require("../utils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ColorSelect = /*#__PURE__*/function () {
  function ColorSelect(state, _ref) {
    var _this = this;

    var dispatch = _ref.dispatch;

    _classCallCheck(this, ColorSelect);

    this.input = (0, _utils.elt)('input', {
      type: 'color',
      value: state.color,
      onchange: function onchange() {
        return dispatch({
          color: _this.input.value
        });
      }
    });
    this.dom = (0, _utils.elt)('label', null, '🎨 Color: ', this.input);
  }
  /**
   * Sync the ColorSelect state
   * @param {*} state
   */


  _createClass(ColorSelect, [{
    key: "syncState",
    value: function syncState(state) {
      this.input.value = state.color;
    }
  }]);

  return ColorSelect;
}();

exports.ColorSelect = ColorSelect;
},{"../utils":"utils.js"}],"controls/tool-select.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToolSelect = void 0;

var _utils = require("../utils");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ToolSelect = /*#__PURE__*/function () {
  function ToolSelect(state, _ref) {
    var _this = this;

    var tools = _ref.tools,
        dispatch = _ref.dispatch;

    _classCallCheck(this, ToolSelect);

    this.select = _utils.elt.apply(void 0, ['select', {
      onchange: function onchange() {
        return dispatch({
          tool: _this.select.value
        });
      }
    }].concat(_toConsumableArray(Object.keys(tools).map(function (name) {
      return (0, _utils.elt)('option', {
        selected: name == state.tool
      }, name);
    }))));
    this.dom = (0, _utils.elt)('label', null, 'Tool: ', this.select);
  }
  /**
   * Sync ToolSelect state
   * @param {*} state
   */


  _createClass(ToolSelect, [{
    key: "syncState",
    value: function syncState(state) {
      this.select.value = state.tool;
    }
  }]);

  return ToolSelect;
}();

exports.ToolSelect = ToolSelect;
},{"../utils":"utils.js"}],"controls/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ColorSelect", {
  enumerable: true,
  get: function () {
    return _colorSelect.ColorSelect;
  }
});
Object.defineProperty(exports, "ToolSelect", {
  enumerable: true,
  get: function () {
    return _toolSelect.ToolSelect;
  }
});

var _colorSelect = require("./color-select");

var _toolSelect = require("./tool-select");
},{"./color-select":"controls/color-select.js","./tool-select":"controls/tool-select.js"}],"tools.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.draw = draw;
exports.rectangle = rectangle;
exports.circle = circle;
exports.triangle = triangle;
exports.fill = fill;
exports.pick = pick;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * The draw tool
 */
function draw(pos, state, dispatch) {
  function drawPixel(_ref, state) {
    var x = _ref.x,
        y = _ref.y;
    var drawn = {
      x: x,
      y: y,
      color: state.color
    };
    dispatch({
      picture: state.picture.draw([drawn])
    });
  } // immediate call to drawPixel and a return call of the same function


  drawPixel(pos, state);
  return drawPixel;
}
/**
 * To draw larger shapes, it can be useful to quickly create rectangles.
 */


function rectangle(start, state, dispatch) {
  function drawRectangle(pos) {
    var xStart = Math.min(start.x, pos.x);
    var yStart = Math.min(start.y, pos.y);
    var xEnd = Math.max(start.x, pos.x);
    var yEnd = Math.max(start.y, pos.y);
    var drawn = [];

    for (var y = yStart; y <= yEnd; y++) {
      for (var x = xStart; x <= xEnd; x++) {
        drawn.push({
          x: x,
          y: y,
          color: state.color
        });
      }
    }

    dispatch({
      picture: state.picture.draw(drawn)
    });
  }

  drawRectangle(start);
  return drawRectangle;
}
/**
 * To quickly draw circles
 * assisted by chatGPT
 */


function circle(start, state, dispatch) {
  function drawCircle(pos) {
    var radius = Math.sqrt( // eslint-disable-next-line no-restricted-properties
    Math.pow(pos.x - start.x, 2) + Math.pow(pos.y - start.y, 2));
    var centerX = start.x + radius;
    var centerY = start.y + radius;
    var drawn = [];

    for (var y = centerY - radius; y <= centerY + radius; y++) {
      for (var x = centerX - radius; x <= centerX + radius; x++) {
        var distance = Math.sqrt( // eslint-disable-next-line no-restricted-properties
        Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));

        if (distance <= radius) {
          drawn.push({
            x: x,
            y: y,
            color: state.color
          });
        }
      }
    }

    dispatch({
      picture: state.picture.draw(drawn)
    });
  }

  drawCircle(start);
  return drawCircle;
}
/**
 * This function uses the Bresenham's line algorithm to draw a triangle
 * on the canvas
 * assisted by chatGPT
 */


function triangle(start, state, dispatch) {
  function drawTriangle(pos) {
    var x1 = start.x;
    var y1 = start.y;
    var x2 = pos.x;
    var y2 = pos.y;
    var deltaX = Math.abs(x2 - x1);
    var deltaY = Math.abs(y2 - y1);
    var signX = x1 < x2 ? 1 : -1;
    var signY = y1 < y2 ? 1 : -1;
    var x = x1;
    var y = y1;
    var error = deltaX - deltaY;
    var drawn = [];

    while (x !== x2 || y !== y2) {
      drawn.push({
        x: x,
        y: y,
        color: state.color
      });
      var error2 = 2 * error;

      if (error2 > -deltaY) {
        error -= deltaY;
        x += signX;
      }

      if (error2 < deltaX) {
        error += deltaX;
        y += signY;
      }
    }

    drawn.push({
      x: x2,
      y: y2,
      color: state.color
    });
    dispatch({
      picture: state.picture.draw(drawn)
    });
  }

  drawTriangle(start);
  return drawTriangle;
}

var around = [{
  dx: -1,
  dy: 0
}, {
  dx: 1,
  dy: 0
}, {
  dx: 0,
  dy: -1
}, {
  dx: 0,
  dy: 1
}];
/**
 * Flood fill tool.
 */

function fill(_ref2, state, dispatch) {
  var x = _ref2.x,
      y = _ref2.y;
  var targetColor = state.picture.pixel(x, y);
  var drawn = [{
    x: x,
    y: y,
    color: state.color
  }];

  for (var done = 0; done < drawn.length; done++) {
    var _iterator = _createForOfIteratorHelper(around),
        _step;

    try {
      var _loop = function _loop() {
        var _step$value = _step.value,
            dx = _step$value.dx,
            dy = _step$value.dy;
        // eslint-disable-next-line one-var
        var x = drawn[done].x + dx,
            y = drawn[done].y + dy;

        if (x >= 0 && x < state.picture.width && y >= 0 && y < state.picture.height && state.picture.pixel(x, y) == targetColor && !drawn.some(function (p) {
          return p.x == x && p.y == y;
        })) {
          drawn.push({
            x: x,
            y: y,
            color: state.color
          });
        }
      };

      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        _loop();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }

  dispatch({
    picture: state.picture.draw(drawn)
  });
}
/**
 * Color picker tool
 */


function pick(pos, state, dispatch) {
  dispatch({
    color: state.picture.pixel(pos.x, pos.y)
  });
}
},{}],"components/load-button.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadButton = void 0;

var _utils = require("../utils");

var _picture = require("./picture");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LoadButton = /*#__PURE__*/function () {
  function LoadButton(_, _ref) {
    var dispatch = _ref.dispatch;

    _classCallCheck(this, LoadButton);

    this.dom = (0, _utils.elt)('button', {
      onclick: function onclick() {
        return startLoad(dispatch);
      }
    }, '📁 Load');
  }

  _createClass(LoadButton, [{
    key: "syncState",
    value: function syncState() {// unimplemented
    }
  }]);

  return LoadButton;
}();
/**
 * Gets the file from the user's computer through use of an `<input>` HTML element with the `file` attribute
 * @param {*} dispatch
 */


exports.LoadButton = LoadButton;

function startLoad(dispatch) {
  var input = (0, _utils.elt)('input', {
    type: 'file',
    onchange: function onchange() {
      return finishLoad(input.files[0], dispatch);
    }
  });
  document.body.appendChild(input);
  input.click();
  input.remove();
}
/**
 * When the user has selected a file, we use the `FileReader` to
 * get access to its contents, again as a data URL.
 * This URL can be used to create a `<img>` element; since we can't
 * get direct access to the pixels in such an image, we can't create
 * a `Picture` object from that. A call to `pictureFromImage` handles this conversion.
 * @param {*} file
 * @param {*} dispatch
 */


function finishLoad(file, dispatch) {
  if (file == null) return;
  var reader = new FileReader();
  reader.addEventListener('load', function () {
    var image = (0, _utils.elt)('img', {
      onload: function onload() {
        return dispatch({
          picture: pictureFromImage(image)
        });
      },
      src: reader.result
    });
  });
  reader.readAsDataURL(file);
}

function pictureFromImage(image) {
  var width = Math.min(100, image.width);
  var height = Math.min(100, image.height);
  var canvas = (0, _utils.elt)('canvas', {
    width: width,
    height: height
  });
  var ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0);
  var pixels = []; // this data property is an array of color components
  // contains 4 values which represent reg, green, blue and alpha (for transparency) of the pixel's color as 8 bit numbers (0-255)

  var _ctx$getImageData = ctx.getImageData(0, 0, width, height),
      data = _ctx$getImageData.data;

  for (var i = 0; i < data.length; i += 4) {
    var _data$slice = data.slice(i, i + 3),
        _data$slice2 = _slicedToArray(_data$slice, 3),
        r = _data$slice2[0],
        g = _data$slice2[1],
        b = _data$slice2[2];

    pixels.push("#".concat((0, _utils.hex)(r)).concat((0, _utils.hex)(g)).concat((0, _utils.hex)(b)));
  }

  return new _picture.Picture(width, height, pixels);
}
},{"../utils":"utils.js","./picture":"components/picture.js"}],"components/save-button.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SaveButton = void 0;

var _utils = require("../utils");

var _picture = require("./picture");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SaveButton = /*#__PURE__*/function () {
  function SaveButton(state) {
    var _this = this;

    _classCallCheck(this, SaveButton);

    this.picture = state.picture;
    this.dom = (0, _utils.elt)('button', {
      onclick: function onclick() {
        return _this.save();
      }
    }, '💾 Save');
  }

  _createClass(SaveButton, [{
    key: "save",
    value: function save() {
      var canvas = (0, _utils.elt)('canvas');
      (0, _picture.drawPicture)(this.picture, canvas, 10);
      var link = (0, _utils.elt)('a', {
        href: canvas.toDataURL(),
        download: 'pixel-art.png'
      });
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  }, {
    key: "syncState",
    value: function syncState(state) {
      this.picture = state.picture;
    }
  }]);

  return SaveButton;
}();

exports.SaveButton = SaveButton;
},{"../utils":"utils.js","./picture":"components/picture.js"}],"components/undo-button.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UndoButton = void 0;

var _utils = require("../utils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UndoButton = /*#__PURE__*/function () {
  function UndoButton(state, _ref) {
    var dispatch = _ref.dispatch;

    _classCallCheck(this, UndoButton);

    this.dom = (0, _utils.elt)('button', {
      onclick: function onclick() {
        return dispatch({
          undo: true
        });
      },
      disabled: state.done.length < 2
    }, '⤴ Undo');
  }

  _createClass(UndoButton, [{
    key: "syncState",
    value: function syncState(state) {
      this.dom.disabled = state.done.length < 2;
    }
  }]);

  return UndoButton;
}();

exports.UndoButton = UndoButton;
},{"../utils":"utils.js"}],"components/redo-button.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedoButton = void 0;

var _utils = require("../utils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RedoButton = /*#__PURE__*/function () {
  function RedoButton(state, _ref) {
    var dispatch = _ref.dispatch;

    _classCallCheck(this, RedoButton);

    this.dom = (0, _utils.elt)('button', {
      onclick: function onclick() {
        return dispatch({
          redo: true
        });
      },
      disabled: state.redone.length < 1
    }, '⤵ Redo');
  }

  _createClass(RedoButton, [{
    key: "syncState",
    value: function syncState(state) {
      this.dom.disabled = state.redone.length < 1;
    }
  }]);

  return RedoButton;
}();

exports.RedoButton = RedoButton;
},{"../utils":"utils.js"}],"components/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "LoadButton", {
  enumerable: true,
  get: function () {
    return _loadButton.LoadButton;
  }
});
Object.defineProperty(exports, "PictureCanvas", {
  enumerable: true,
  get: function () {
    return _pictureCanvas.PictureCanvas;
  }
});
Object.defineProperty(exports, "Picture", {
  enumerable: true,
  get: function () {
    return _picture.Picture;
  }
});
Object.defineProperty(exports, "SaveButton", {
  enumerable: true,
  get: function () {
    return _saveButton.SaveButton;
  }
});
Object.defineProperty(exports, "UndoButton", {
  enumerable: true,
  get: function () {
    return _undoButton.UndoButton;
  }
});
Object.defineProperty(exports, "RedoButton", {
  enumerable: true,
  get: function () {
    return _redoButton.RedoButton;
  }
});

var _loadButton = require("./load-button");

var _pictureCanvas = require("./picture-canvas");

var _picture = require("./picture");

var _saveButton = require("./save-button");

var _undoButton = require("./undo-button");

var _redoButton = require("./redo-button");
},{"./load-button":"components/load-button.js","./picture-canvas":"components/picture-canvas.js","./picture":"components/picture.js","./save-button":"components/save-button.js","./undo-button":"components/undo-button.js","./redo-button":"components/redo-button.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _app = require("./app");

var _controls = require("./controls");

var _tools = require("./tools");

var _components = require("./components");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var INITIAL_STATE = {
  tool: 'draw',
  color: '#000000',
  picture: _components.Picture.empty(60, 30, '#f0f0f0'),
  done: [],
  redone: [],
  doneAt: 0
};
var baseTools = {
  draw: _tools.draw,
  fill: _tools.fill,
  pick: _tools.pick,
  rectangle: _tools.rectangle,
  circle: _tools.circle,
  triangle: _tools.triangle
};
var baseControls = [_controls.ToolSelect, _controls.ColorSelect, _components.SaveButton, _components.LoadButton, _components.UndoButton, _components.RedoButton]; // quasi - reducer function

function historyUpdateState(state, action) {
  if (action.undo) {
    if (state.done.length < 2) return state;
    var redone = state.done.pop();
    return _objectSpread(_objectSpread({}, state), {}, {
      picture: state.done[state.done.length - 1],
      done: _toConsumableArray(state.done),
      redone: [].concat(_toConsumableArray(state.redone), [redone]),
      doneAt: 0
    });
  }

  if (action.redo) {
    if (state.redone.length < 1) return state;
    var picture = state.redone.pop();
    return _objectSpread(_objectSpread({}, state), {}, {
      picture: picture,
      done: [].concat(_toConsumableArray(state.done), [picture]),
      redone: _toConsumableArray(state.redone),
      doneAt: 0
    });
  }

  if (action.picture && state.doneAt < Date.now() - 1000) {
    return _objectSpread(_objectSpread(_objectSpread({}, state), action), {}, {
      done: [].concat(_toConsumableArray(state.done), [state.picture]),
      // redone state only relevant on undo, otherwise it remains empty
      // on regular draw action
      redone: [],
      doneAt: Date.now()
    });
  }

  return _objectSpread(_objectSpread({}, state), action);
}

function startPixelEditor(_ref) {
  var _ref$state = _ref.state,
      state = _ref$state === void 0 ? INITIAL_STATE : _ref$state,
      _ref$tools = _ref.tools,
      tools = _ref$tools === void 0 ? baseTools : _ref$tools,
      _ref$controls = _ref.controls,
      controls = _ref$controls === void 0 ? baseControls : _ref$controls;
  var app = new _app.PixelEditor(state, {
    tools: tools,
    controls: controls,
    dispatch: function dispatch(action) {
      state = historyUpdateState(state, action);
      app.syncState(state);
    }
  });
  return app.dom;
}

document.getElementById('root').appendChild(startPixelEditor({}));
},{"./app":"app.js","./controls":"controls/index.js","./tools":"tools.js","./components":"components/index.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60908" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map