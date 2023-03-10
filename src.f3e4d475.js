parcelRequire = (function (e, r, t, n) {
  var i,
    o = 'function' == typeof parcelRequire && parcelRequire,
    u = 'function' == typeof require && require
  function f(t, n) {
    if (!r[t]) {
      if (!e[t]) {
        var i = 'function' == typeof parcelRequire && parcelRequire
        if (!n && i) return i(t, !0)
        if (o) return o(t, !0)
        if (u && 'string' == typeof t) return u(t)
        var c = new Error("Cannot find module '" + t + "'")
        throw ((c.code = 'MODULE_NOT_FOUND'), c)
      }
      ;(p.resolve = function (r) {
        return e[t][1][r] || r
      }),
        (p.cache = {})
      var l = (r[t] = new f.Module(t))
      e[t][0].call(l.exports, p, l, l.exports, this)
    }
    return r[t].exports
    function p(e) {
      return f(p.resolve(e))
    }
  }
  ;(f.isParcelRequire = !0),
    (f.Module = function (e) {
      ;(this.id = e), (this.bundle = f), (this.exports = {})
    }),
    (f.modules = e),
    (f.cache = r),
    (f.parent = o),
    (f.register = function (r, t) {
      e[r] = [
        function (e, r) {
          r.exports = t
        },
        {},
      ]
    })
  for (var c = 0; c < t.length; c++)
    try {
      f(t[c])
    } catch (e) {
      i || (i = e)
    }
  if (t.length) {
    var l = f(t[t.length - 1])
    'object' == typeof exports && 'undefined' != typeof module
      ? (module.exports = l)
      : 'function' == typeof define && define.amd
      ? define(function () {
          return l
        })
      : n && (this[n] = l)
  }
  if (((parcelRequire = f), i)) throw i
  return f
})(
  {
    j6dk: [
      function (require, module, exports) {
        'use strict'
        function t(t, r) {
          var n =
            ('undefined' != typeof Symbol && t[Symbol.iterator]) ||
            t['@@iterator']
          if (!n) {
            if (
              Array.isArray(t) ||
              (n = e(t)) ||
              (r && t && 'number' == typeof t.length)
            ) {
              n && (t = n)
              var i = 0,
                o = function () {}
              return {
                s: o,
                n: function () {
                  return i >= t.length
                    ? { done: !0 }
                    : { done: !1, value: t[i++] }
                },
                e: function (t) {
                  throw t
                },
                f: o,
              }
            }
            throw new TypeError(
              'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
            )
          }
          var a,
            u = !0,
            l = !1
          return {
            s: function () {
              n = n.call(t)
            },
            n: function () {
              var t = n.next()
              return (u = t.done), t
            },
            e: function (t) {
              ;(l = !0), (a = t)
            },
            f: function () {
              try {
                u || null == n.return || n.return()
              } finally {
                if (l) throw a
              }
            },
          }
        }
        function e(t, e) {
          if (t) {
            if ('string' == typeof t) return r(t, e)
            var n = Object.prototype.toString.call(t).slice(8, -1)
            return (
              'Object' === n && t.constructor && (n = t.constructor.name),
              'Map' === n || 'Set' === n
                ? Array.from(t)
                : 'Arguments' === n ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                ? r(t, e)
                : void 0
            )
          }
        }
        function r(t, e) {
          ;(null == e || e > t.length) && (e = t.length)
          for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r]
          return n
        }
        function n(t, e) {
          if (!(t instanceof e))
            throw new TypeError('Cannot call a class as a function')
        }
        function i(t, e) {
          for (var r = 0; r < e.length; r++) {
            var n = e[r]
            ;(n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              'value' in n && (n.writable = !0),
              Object.defineProperty(t, n.key, n)
          }
        }
        function o(t, e, r) {
          return e && i(t.prototype, e), r && i(t, r), t
        }
        Object.defineProperty(exports, '__esModule', { value: !0 }),
          (exports.drawPicture = u),
          (exports.Picture = void 0)
        var a = (function () {
          function e(t, r, i) {
            n(this, e), (this.width = t), (this.height = r), (this.pixels = i)
          }
          return (
            o(
              e,
              [
                {
                  key: 'pixel',
                  value: function (t, e) {
                    return this.pixels[t + e * this.width]
                  },
                },
                {
                  key: 'draw',
                  value: function (r) {
                    var n,
                      i = this.pixels.slice(),
                      o = t(r)
                    try {
                      for (o.s(); !(n = o.n()).done; ) {
                        var a = n.value,
                          u = a.x,
                          l = a.y,
                          f = a.color
                        i[u + l * this.width] = f
                      }
                    } catch (c) {
                      o.e(c)
                    } finally {
                      o.f()
                    }
                    return new e(this.width, this.height, i)
                  },
                },
              ],
              [
                {
                  key: 'empty',
                  value: function (t, r, n) {
                    return new e(t, r, new Array(t * r).fill(n))
                  },
                },
              ]
            ),
            e
          )
        })()
        function u(t, e, r) {
          ;(e.width = t.width * r), (e.height = t.height * r)
          for (var n = e.getContext('2d'), i = 0; i < t.height; i++)
            for (var o = 0; o < t.width; o++)
              (n.fillStyle = t.pixel(o, i)), n.fillRect(o * r, i * r, r, r)
        }
        exports.Picture = a
      },
      {},
    ],
    FOZT: [
      function (require, module, exports) {
        'use strict'
        Object.defineProperty(exports, '__esModule', { value: !0 }),
          (exports.updateState = o),
          (exports.elt = i),
          (exports.hex = c),
          (exports.cached = u),
          (exports.getCachedState = a)
        var e = require('./picture')
        function t(e, t) {
          var r = Object.keys(e)
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e)
            t &&
              (n = n.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
              })),
              r.push.apply(r, n)
          }
          return r
        }
        function r(e) {
          for (var r = 1; r < arguments.length; r++) {
            var o = null != arguments[r] ? arguments[r] : {}
            r % 2
              ? t(Object(o), !0).forEach(function (t) {
                  n(e, t, o[t])
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(o))
              : t(Object(o)).forEach(function (t) {
                  Object.defineProperty(
                    e,
                    t,
                    Object.getOwnPropertyDescriptor(o, t)
                  )
                })
          }
          return e
        }
        function n(e, t, r) {
          return (
            t in e
              ? Object.defineProperty(e, t, {
                  value: r,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (e[t] = r),
            e
          )
        }
        function o(e, t) {
          return r(r({}, e), t)
        }
        function i(e, t) {
          var r = document.createElement(e)
          t && Object.assign(r, t)
          for (
            var n = arguments.length, o = new Array(n > 2 ? n - 2 : 0), i = 2;
            i < n;
            i++
          )
            o[i - 2] = arguments[i]
          for (var c = 0, u = o; c < u.length; c++) {
            var a = u[c]
            'string' != typeof a
              ? r.appendChild(a)
              : r.appendChild(document.createTextNode(a))
          }
          return r
        }
        function c(e) {
          return e.toString(16).padStart(2, '0')
        }
        function u(e) {
          return localStorage.setItem('_state', JSON.stringify(e)), e
        }
        function a() {
          var t = JSON.parse(localStorage.getItem('_state'))
          if (t)
            return (
              (t.done = t.done.map(function (t) {
                var r = t.width,
                  n = t.height,
                  o = t.pixels
                return new e.Picture(r, n, o)
              })),
              (t.redone = t.redone.map(function (t) {
                var r = t.width,
                  n = t.height,
                  o = t.pixels
                return new e.Picture(r, n, o)
              })),
              (t.picture = new e.Picture(
                t.picture.width,
                t.picture.height,
                t.picture.pixels
              )),
              t
            )
        }
      },
      { './picture': 'j6dk' },
    ],
    PgY4: [
      function (require, module, exports) {
        'use strict'
        Object.defineProperty(exports, '__esModule', { value: !0 }),
          (exports.PictureCanvas = void 0)
        var t = require('../utils'),
          e = require('../picture')
        function n(t, e) {
          if (!(t instanceof e))
            throw new TypeError('Cannot call a class as a function')
        }
        function o(t, e) {
          for (var n = 0; n < e.length; n++) {
            var o = e[n]
            ;(o.enumerable = o.enumerable || !1),
              (o.configurable = !0),
              'value' in o && (o.writable = !0),
              Object.defineProperty(t, o.key, o)
          }
        }
        function r(t, e, n) {
          return e && o(t.prototype, e), n && o(t, n), t
        }
        var i = 10,
          u = (function () {
            function o(e, r) {
              var i = this
              n(this, o),
                (this.dom = (0, t.elt)('canvas', {
                  onmousedown: function (t) {
                    return i.mouse(t, r)
                  },
                  ontouchstart: function (t) {
                    return i.touch(t, r)
                  },
                })),
                this.syncState(e)
            }
            return (
              r(o, [
                {
                  key: 'syncState',
                  value: function (t) {
                    this.picture != t &&
                      ((this.picture = t),
                      (0, e.drawPicture)(this.picture, this.dom, i))
                  },
                },
              ]),
              o
            )
          })()
        function s(t, e) {
          var n = e.getBoundingClientRect()
          return {
            x: Math.floor((t.clientX - n.left) / i),
            y: Math.floor((t.clientY - n.top) / i),
          }
        }
        ;(exports.PictureCanvas = u),
          (u.prototype.mouse = function (t, e) {
            var n = this
            if (0 == t.button) {
              var o = s(t, this.dom),
                r = e(o)
              if (r) {
                this.dom.addEventListener('mousemove', function t(e) {
                  if (0 == e.buttons) n.dom.removeEventListener('mousemove', t)
                  else {
                    var i = s(e, n.dom)
                    if (i.x == o.x && i.y == o.y) return
                    r(i)
                  }
                })
              }
            }
          }),
          (u.prototype.touch = function (t, e) {
            var n = this,
              o = s(t.touches[0], this.dom),
              r = e(o)
            if ((t.preventDefault(), r)) {
              var i = function (t) {
                var e = s(t.touches[0], n.dom)
                ;(e.x == o.x && e.y == o.y) || ((o = e), r(e))
              }
              this.dom.addEventListener('touchmove', i),
                this.dom.addEventListener('touchend', function () {
                  n.dom.removeEventListener('touchmove', i),
                    n.dom.removeEventListener('touchend', i)
                })
            }
          })
      },
      { '../utils': 'FOZT', '../picture': 'j6dk' },
    ],
    A2T1: [
      function (require, module, exports) {
        'use strict'
        Object.defineProperty(exports, '__esModule', { value: !0 }),
          (exports.PixelEditor = void 0)
        var t = require('./components/picture-canvas'),
          e = require('./utils')
        function n(t, e) {
          var n =
            ('undefined' != typeof Symbol && t[Symbol.iterator]) ||
            t['@@iterator']
          if (!n) {
            if (
              Array.isArray(t) ||
              (n = a(t)) ||
              (e && t && 'number' == typeof t.length)
            ) {
              n && (t = n)
              var r = 0,
                o = function () {}
              return {
                s: o,
                n: function () {
                  return r >= t.length
                    ? { done: !0 }
                    : { done: !1, value: t[r++] }
                },
                e: function (t) {
                  throw t
                },
                f: o,
              }
            }
            throw new TypeError(
              'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
            )
          }
          var i,
            c = !0,
            u = !1
          return {
            s: function () {
              n = n.call(t)
            },
            n: function () {
              var t = n.next()
              return (c = t.done), t
            },
            e: function (t) {
              ;(u = !0), (i = t)
            },
            f: function () {
              try {
                c || null == n.return || n.return()
              } finally {
                if (u) throw i
              }
            },
          }
        }
        function r(t) {
          return c(t) || i(t) || a(t) || o()
        }
        function o() {
          throw new TypeError(
            'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
          )
        }
        function a(t, e) {
          if (t) {
            if ('string' == typeof t) return u(t, e)
            var n = Object.prototype.toString.call(t).slice(8, -1)
            return (
              'Object' === n && t.constructor && (n = t.constructor.name),
              'Map' === n || 'Set' === n
                ? Array.from(t)
                : 'Arguments' === n ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                ? u(t, e)
                : void 0
            )
          }
        }
        function i(t) {
          if (
            ('undefined' != typeof Symbol && null != t[Symbol.iterator]) ||
            null != t['@@iterator']
          )
            return Array.from(t)
        }
        function c(t) {
          if (Array.isArray(t)) return u(t)
        }
        function u(t, e) {
          ;(null == e || e > t.length) && (e = t.length)
          for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n]
          return r
        }
        function l(t, e) {
          if (!(t instanceof e))
            throw new TypeError('Cannot call a class as a function')
        }
        function s(t, e) {
          for (var n = 0; n < e.length; n++) {
            var r = e[n]
            ;(r.enumerable = r.enumerable || !1),
              (r.configurable = !0),
              'value' in r && (r.writable = !0),
              Object.defineProperty(t, r.key, r)
          }
        }
        function f(t, e, n) {
          return e && s(t.prototype, e), n && s(t, n), t
        }
        var y = (function () {
          function o(n, a) {
            var i = this
            l(this, o)
            var c = a.tools,
              u = a.controls,
              s = a.dispatch
            ;(this.state = n),
              (this.canvas = new t.PictureCanvas(n.picture, function (t) {
                var e = (0, c[i.state.tool])(t, i.state, s)
                if (e)
                  return function (t) {
                    return e(t, i.state)
                  }
              })),
              (this.controls = u.map(function (t) {
                return new t(n, a)
              })),
              (this.dom = e.elt.apply(
                void 0,
                ['div', {}, this.canvas.dom, (0, e.elt)('br')].concat(
                  r(
                    this.controls.reduce(function (t, e) {
                      return t.concat(' ', e.dom)
                    }, [])
                  )
                )
              )),
              document.addEventListener('keydown', function (t) {
                t.preventDefault(),
                  s({
                    undo: (t.metaKey || t.ctrlKey) && 'KeyZ' === t.code,
                    redo: (t.metaKey || t.ctrlKey) && 'KeyY' === t.code,
                    save: (t.metaKey || t.ctrlKey) && 'KeyS' === t.code,
                  })
              })
          }
          return (
            f(o, [
              {
                key: 'syncState',
                value: function (t) {
                  ;(this.state = t), this.canvas.syncState(t.picture)
                  var e,
                    r = n(this.controls)
                  try {
                    for (r.s(); !(e = r.n()).done; ) {
                      e.value.syncState(t)
                    }
                  } catch (o) {
                    r.e(o)
                  } finally {
                    r.f()
                  }
                },
              },
            ]),
            o
          )
        })()
        exports.PixelEditor = y
      },
      { './components/picture-canvas': 'PgY4', './utils': 'FOZT' },
    ],
    SY57: [
      function (require, module, exports) {
        'use strict'
        function r(r, o) {
          var e =
            ('undefined' != typeof Symbol && r[Symbol.iterator]) ||
            r['@@iterator']
          if (!e) {
            if (
              Array.isArray(r) ||
              (e = t(r)) ||
              (o && r && 'number' == typeof r.length)
            ) {
              e && (r = e)
              var n = 0,
                i = function () {}
              return {
                s: i,
                n: function () {
                  return n >= r.length
                    ? { done: !0 }
                    : { done: !1, value: r[n++] }
                },
                e: function (r) {
                  throw r
                },
                f: i,
              }
            }
            throw new TypeError(
              'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
            )
          }
          var a,
            c = !0,
            u = !1
          return {
            s: function () {
              e = e.call(r)
            },
            n: function () {
              var r = e.next()
              return (c = r.done), r
            },
            e: function (r) {
              ;(u = !0), (a = r)
            },
            f: function () {
              try {
                c || null == e.return || e.return()
              } finally {
                if (u) throw a
              }
            },
          }
        }
        function t(r, t) {
          if (r) {
            if ('string' == typeof r) return o(r, t)
            var e = Object.prototype.toString.call(r).slice(8, -1)
            return (
              'Object' === e && r.constructor && (e = r.constructor.name),
              'Map' === e || 'Set' === e
                ? Array.from(r)
                : 'Arguments' === e ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)
                ? o(r, t)
                : void 0
            )
          }
        }
        function o(r, t) {
          ;(null == t || t > r.length) && (t = r.length)
          for (var o = 0, e = new Array(t); o < t; o++) e[o] = r[o]
          return e
        }
        function e(r, t, o) {
          function e(r, t) {
            var e = { x: r.x, y: r.y, color: t.color }
            o({ picture: t.picture.draw([e]) })
          }
          return e(r, t), e
        }
        function n(r, t, o) {
          function e(e) {
            for (
              var n = Math.min(r.x, e.x),
                i = Math.min(r.y, e.y),
                a = Math.max(r.x, e.x),
                c = Math.max(r.y, e.y),
                u = [],
                l = i;
              l <= c;
              l++
            )
              for (var f = n; f <= a; f++)
                u.push({ x: f, y: l, color: t.color })
            o({ picture: t.picture.draw(u) })
          }
          return e(r), e
        }
        function i(r, t, o) {
          function e(e) {
            for (
              var n = Math.sqrt(
                  Math.pow(e.x - r.x, 2) + Math.pow(e.y - r.y, 2)
                ),
                i = r.x + n,
                a = r.y + n,
                c = [],
                u = a - n;
              u <= a + n;
              u++
            )
              for (var l = i - n; l <= i + n; l++) {
                Math.sqrt(Math.pow(l - i, 2) + Math.pow(u - a, 2)) <= n &&
                  c.push({ x: l, y: u, color: t.color })
              }
            o({ picture: t.picture.draw(c) })
          }
          return e(r), e
        }
        function a(r, t, o) {
          function e(e) {
            for (
              var n = r.x,
                i = r.y,
                a = e.x,
                c = e.y,
                u = Math.abs(a - n),
                l = Math.abs(c - i),
                f = n < a ? 1 : -1,
                p = i < c ? 1 : -1,
                y = n,
                x = i,
                s = u - l,
                h = [];
              y !== a || x !== c;

            ) {
              h.push({ x: y, y: x, color: t.color })
              var d = 2 * s
              d > -l && ((s -= l), (y += f)), d < u && ((s += u), (x += p))
            }
            h.push({ x: a, y: c, color: t.color }),
              o({ picture: t.picture.draw(h) })
          }
          return e(r), e
        }
        Object.defineProperty(exports, '__esModule', { value: !0 }),
          (exports.draw = e),
          (exports.rectangle = n),
          (exports.circle = i),
          (exports.triangle = a),
          (exports.fill = u),
          (exports.pick = l)
        var c = [
          { dx: -1, dy: 0 },
          { dx: 1, dy: 0 },
          { dx: 0, dy: -1 },
          { dx: 0, dy: 1 },
        ]
        function u(t, o, e) {
          for (
            var n = t.x,
              i = t.y,
              a = o.picture.pixel(n, i),
              u = [{ x: n, y: i, color: o.color }],
              l = 0;
            l < u.length;
            l++
          ) {
            var f,
              p = r(c)
            try {
              var y = function () {
                var r = f.value,
                  t = r.dx,
                  e = r.dy,
                  n = u[l].x + t,
                  i = u[l].y + e
                n >= 0 &&
                  n < o.picture.width &&
                  i >= 0 &&
                  i < o.picture.height &&
                  o.picture.pixel(n, i) == a &&
                  !u.some(function (r) {
                    return r.x == n && r.y == i
                  }) &&
                  u.push({ x: n, y: i, color: o.color })
              }
              for (p.s(); !(f = p.n()).done; ) y()
            } catch (x) {
              p.e(x)
            } finally {
              p.f()
            }
          }
          e({ picture: o.picture.draw(u) })
        }
        function l(r, t, o) {
          o({ color: t.picture.pixel(r.x, r.y) })
        }
      },
      {},
    ],
    LbAf: [
      function (require, module, exports) {
        'use strict'
        Object.defineProperty(exports, '__esModule', { value: !0 }),
          (exports.LoadButton = void 0)
        var t = require('../utils'),
          e = require('../picture')
        function n(t, e) {
          return u(t) || i(t, e) || o(t, e) || r()
        }
        function r() {
          throw new TypeError(
            'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
          )
        }
        function o(t, e) {
          if (t) {
            if ('string' == typeof t) return a(t, e)
            var n = Object.prototype.toString.call(t).slice(8, -1)
            return (
              'Object' === n && t.constructor && (n = t.constructor.name),
              'Map' === n || 'Set' === n
                ? Array.from(t)
                : 'Arguments' === n ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                ? a(t, e)
                : void 0
            )
          }
        }
        function a(t, e) {
          ;(null == e || e > t.length) && (e = t.length)
          for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n]
          return r
        }
        function i(t, e) {
          var n =
            t &&
            (('undefined' != typeof Symbol && t[Symbol.iterator]) ||
              t['@@iterator'])
          if (null != n) {
            var r,
              o,
              a = [],
              i = !0,
              u = !1
            try {
              for (
                n = n.call(t);
                !(i = (r = n.next()).done) &&
                (a.push(r.value), !e || a.length !== e);
                i = !0
              );
            } catch (c) {
              ;(u = !0), (o = c)
            } finally {
              try {
                i || null == n.return || n.return()
              } finally {
                if (u) throw o
              }
            }
            return a
          }
        }
        function u(t) {
          if (Array.isArray(t)) return t
        }
        function c(t, e) {
          if (!(t instanceof e))
            throw new TypeError('Cannot call a class as a function')
        }
        function l(t, e) {
          for (var n = 0; n < e.length; n++) {
            var r = e[n]
            ;(r.enumerable = r.enumerable || !1),
              (r.configurable = !0),
              'value' in r && (r.writable = !0),
              Object.defineProperty(t, r.key, r)
          }
        }
        function f(t, e, n) {
          return e && l(t.prototype, e), n && l(t, n), t
        }
        var s = (function () {
          function e(n, r) {
            var o = r.dispatch
            c(this, e),
              (this.dom = (0, t.elt)(
                'button',
                {
                  onclick: function () {
                    return d(o)
                  },
                },
                '📁 Load'
              ))
          }
          return f(e, [{ key: 'syncState', value: function () {} }]), e
        })()
        function d(e) {
          var n = (0, t.elt)('input', {
            type: 'file',
            onchange: function () {
              return h(n.files[0], e)
            },
          })
          document.body.appendChild(n), n.click(), n.remove()
        }
        function h(e, n) {
          if (null != e) {
            var r = new FileReader()
            r.addEventListener('load', function () {
              var e = (0, t.elt)('img', {
                onload: function () {
                  return n({ picture: v(e) })
                },
                src: r.result,
              })
            }),
              r.readAsDataURL(e)
          }
        }
        function v(r) {
          var o = Math.min(100, r.width),
            a = Math.min(100, r.height),
            i = (0, t.elt)('canvas', { width: o, height: a }).getContext('2d')
          i.drawImage(r, 0, 0)
          for (
            var u = [], c = i.getImageData(0, 0, o, a).data, l = 0;
            l < c.length;
            l += 4
          ) {
            var f = n(c.slice(l, l + 3), 3),
              s = f[0],
              d = f[1],
              h = f[2]
            u.push(
              '#'
                .concat((0, t.hex)(s))
                .concat((0, t.hex)(d))
                .concat((0, t.hex)(h))
            )
          }
          return new e.Picture(o, a, u)
        }
        exports.LoadButton = s
      },
      { '../utils': 'FOZT', '../picture': 'j6dk' },
    ],
    TesK: [
      function (require, module, exports) {
        'use strict'
        Object.defineProperty(exports, '__esModule', { value: !0 }),
          (exports.SaveButton = void 0)
        var e = require('../utils'),
          t = require('../picture')
        function r(e, t) {
          if (!(e instanceof t))
            throw new TypeError('Cannot call a class as a function')
        }
        function n(e, t) {
          for (var r = 0; r < t.length; r++) {
            var n = t[r]
            ;(n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              'value' in n && (n.writable = !0),
              Object.defineProperty(e, n.key, n)
          }
        }
        function a(e, t, r) {
          return t && n(e.prototype, t), r && n(e, r), e
        }
        var i = (function () {
          function n(t, a) {
            var i = a.dispatch
            r(this, n),
              (this.picture = t.picture),
              (this.dom = (0, e.elt)(
                'button',
                {
                  onclick: function () {
                    return i({ save: !0 })
                  },
                },
                '💾 Save'
              ))
          }
          return (
            a(
              n,
              [
                {
                  key: 'syncState',
                  value: function (e) {
                    this.picture = e.picture
                  },
                },
              ],
              [
                {
                  key: 'save',
                  value: function (r) {
                    var n,
                      a = (0, e.elt)('canvas')
                    ;(0, t.drawPicture)(r, a, 10)
                    var i = (0, e.elt)('a', {
                      href: a.toDataURL(),
                      download: ''.concat(
                        null !== (n = prompt('save file as?', 'pixel-art')) &&
                          void 0 !== n
                          ? n
                          : 'pixel-art',
                        '.png'
                      ),
                    })
                    document.body.appendChild(i), i.click(), i.remove()
                  },
                },
              ]
            ),
            n
          )
        })()
        exports.SaveButton = i
      },
      { '../utils': 'FOZT', '../picture': 'j6dk' },
    ],
    eccM: [
      function (require, module, exports) {
        'use strict'
        Object.defineProperty(exports, '__esModule', { value: !0 }),
          (exports.UndoButton = void 0)
        var e = require('../utils')
        function n(e, n) {
          if (!(e instanceof n))
            throw new TypeError('Cannot call a class as a function')
        }
        function t(e, n) {
          for (var t = 0; t < n.length; t++) {
            var o = n[t]
            ;(o.enumerable = o.enumerable || !1),
              (o.configurable = !0),
              'value' in o && (o.writable = !0),
              Object.defineProperty(e, o.key, o)
          }
        }
        function o(e, n, o) {
          return n && t(e.prototype, n), o && t(e, o), e
        }
        var r = (function () {
          function t(o, r) {
            var i = r.dispatch
            n(this, t),
              (this.dom = (0, e.elt)(
                'button',
                {
                  onclick: function () {
                    return i({ undo: !0 })
                  },
                  disabled: o.done.length < 2,
                },
                '⤴ Undo'
              ))
          }
          return (
            o(t, [
              {
                key: 'syncState',
                value: function (e) {
                  this.dom.disabled = e.done.length < 2
                },
              },
            ]),
            t
          )
        })()
        exports.UndoButton = r
      },
      { '../utils': 'FOZT' },
    ],
    T3Bf: [
      function (require, module, exports) {
        'use strict'
        Object.defineProperty(exports, '__esModule', { value: !0 }),
          (exports.RedoButton = void 0)
        var e = require('../utils')
        function t(e, t) {
          if (!(e instanceof t))
            throw new TypeError('Cannot call a class as a function')
        }
        function n(e, t) {
          for (var n = 0; n < t.length; n++) {
            var o = t[n]
            ;(o.enumerable = o.enumerable || !1),
              (o.configurable = !0),
              'value' in o && (o.writable = !0),
              Object.defineProperty(e, o.key, o)
          }
        }
        function o(e, t, o) {
          return t && n(e.prototype, t), o && n(e, o), e
        }
        var r = (function () {
          function n(o, r) {
            var i = r.dispatch
            t(this, n),
              (this.dom = (0, e.elt)(
                'button',
                {
                  onclick: function () {
                    return i({ redo: !0 })
                  },
                  disabled: o.redone.length < 1,
                },
                '⤵ Redo'
              ))
          }
          return (
            o(n, [
              {
                key: 'syncState',
                value: function (e) {
                  this.dom.disabled = e.redone.length < 1
                },
              },
            ]),
            n
          )
        })()
        exports.RedoButton = r
      },
      { '../utils': 'FOZT' },
    ],
    wuoU: [
      function (require, module, exports) {
        'use strict'
        Object.defineProperty(exports, '__esModule', { value: !0 }),
          (exports.ResetButton = void 0)
        var e = require('../utils')
        function t(e, t) {
          if (!(e instanceof t))
            throw new TypeError('Cannot call a class as a function')
        }
        function n(e, t) {
          for (var n = 0; n < t.length; n++) {
            var o = t[n]
            ;(o.enumerable = o.enumerable || !1),
              (o.configurable = !0),
              'value' in o && (o.writable = !0),
              Object.defineProperty(e, o.key, o)
          }
        }
        function o(e, t, o) {
          return t && n(e.prototype, t), o && n(e, o), e
        }
        var r = (function () {
          function n(o, r) {
            var i = r.dispatch
            t(this, n),
              (this.dom = (0, e.elt)(
                'button',
                {
                  onclick: function () {
                    confirm('Are you sure you want to reset the canvas?') &&
                      i({ reset: !0 })
                  },
                  disabled: !o.done.length,
                },
                '🔁 Reset'
              ))
          }
          return (
            o(n, [
              {
                key: 'syncState',
                value: function (e) {
                  this.dom.disabled = !e.done.length
                },
              },
            ]),
            n
          )
        })()
        exports.ResetButton = r
      },
      { '../utils': 'FOZT' },
    ],
    oTNS: [
      function (require, module, exports) {
        'use strict'
        Object.defineProperty(exports, '__esModule', { value: !0 }),
          (exports.ToolSelect = void 0)
        var t = require('../utils')
        function e(t) {
          return l(t) || o(t) || n(t) || r()
        }
        function r() {
          throw new TypeError(
            'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
          )
        }
        function n(t, e) {
          if (t) {
            if ('string' == typeof t) return a(t, e)
            var r = Object.prototype.toString.call(t).slice(8, -1)
            return (
              'Object' === r && t.constructor && (r = t.constructor.name),
              'Map' === r || 'Set' === r
                ? Array.from(t)
                : 'Arguments' === r ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                ? a(t, e)
                : void 0
            )
          }
        }
        function o(t) {
          if (
            ('undefined' != typeof Symbol && null != t[Symbol.iterator]) ||
            null != t['@@iterator']
          )
            return Array.from(t)
        }
        function l(t) {
          if (Array.isArray(t)) return a(t)
        }
        function a(t, e) {
          ;(null == e || e > t.length) && (e = t.length)
          for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r]
          return n
        }
        function i(t, e) {
          if (!(t instanceof e))
            throw new TypeError('Cannot call a class as a function')
        }
        function c(t, e) {
          for (var r = 0; r < e.length; r++) {
            var n = e[r]
            ;(n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              'value' in n && (n.writable = !0),
              Object.defineProperty(t, n.key, n)
          }
        }
        function u(t, e, r) {
          return e && c(t.prototype, e), r && c(t, r), t
        }
        var s = (function () {
          function r(n, o) {
            var l = this,
              a = o.tools,
              c = o.dispatch
            i(this, r),
              (this.select = t.elt.apply(
                void 0,
                [
                  'select',
                  {
                    onchange: function () {
                      return c({ tool: l.select.value })
                    },
                  },
                ].concat(
                  e(
                    Object.keys(a).map(function (e) {
                      return (0, t.elt)('option', { selected: e == n.tool }, e)
                    })
                  )
                )
              )),
              (this.dom = (0, t.elt)('label', null, 'Tool: ', this.select))
          }
          return (
            u(r, [
              {
                key: 'syncState',
                value: function (t) {
                  this.select.value = t.tool
                },
              },
            ]),
            r
          )
        })()
        exports.ToolSelect = s
      },
      { '../utils': 'FOZT' },
    ],
    jE7a: [
      function (require, module, exports) {
        'use strict'
        Object.defineProperty(exports, '__esModule', { value: !0 }),
          (exports.ColorSelect = void 0)
        var e = require('../utils')
        function t(e, t) {
          if (!(e instanceof t))
            throw new TypeError('Cannot call a class as a function')
        }
        function n(e, t) {
          for (var n = 0; n < t.length; n++) {
            var o = t[n]
            ;(o.enumerable = o.enumerable || !1),
              (o.configurable = !0),
              'value' in o && (o.writable = !0),
              Object.defineProperty(e, o.key, o)
          }
        }
        function o(e, t, o) {
          return t && n(e.prototype, t), o && n(e, o), e
        }
        var r = (function () {
          function n(o, r) {
            var i = this,
              l = r.dispatch
            t(this, n),
              (this.input = (0, e.elt)('input', {
                type: 'color',
                value: o.color,
                onchange: function () {
                  return l({ color: i.input.value })
                },
              })),
              (this.dom = (0, e.elt)('label', null, '🎨 Color: ', this.input))
          }
          return (
            o(n, [
              {
                key: 'syncState',
                value: function (e) {
                  this.input.value = e.color
                },
              },
            ]),
            n
          )
        })()
        exports.ColorSelect = r
      },
      { '../utils': 'FOZT' },
    ],
    iA92: [
      function (require, module, exports) {
        'use strict'
        Object.defineProperty(exports, '__esModule', { value: !0 }),
          Object.defineProperty(exports, 'LoadButton', {
            enumerable: !0,
            get: function () {
              return e.LoadButton
            },
          }),
          Object.defineProperty(exports, 'PictureCanvas', {
            enumerable: !0,
            get: function () {
              return t.PictureCanvas
            },
          }),
          Object.defineProperty(exports, 'SaveButton', {
            enumerable: !0,
            get: function () {
              return r.SaveButton
            },
          }),
          Object.defineProperty(exports, 'UndoButton', {
            enumerable: !0,
            get: function () {
              return o.UndoButton
            },
          }),
          Object.defineProperty(exports, 'RedoButton', {
            enumerable: !0,
            get: function () {
              return n.RedoButton
            },
          }),
          Object.defineProperty(exports, 'ResetButton', {
            enumerable: !0,
            get: function () {
              return u.ResetButton
            },
          }),
          Object.defineProperty(exports, 'ToolSelect', {
            enumerable: !0,
            get: function () {
              return c.ToolSelect
            },
          }),
          Object.defineProperty(exports, 'ColorSelect', {
            enumerable: !0,
            get: function () {
              return i.ColorSelect
            },
          })
        var e = require('./load-button'),
          t = require('./picture-canvas'),
          r = require('./save-button'),
          o = require('./undo-button'),
          n = require('./redo-button'),
          u = require('./reset-button'),
          c = require('./tool-select'),
          i = require('./color-select')
      },
      {
        './load-button': 'LbAf',
        './picture-canvas': 'PgY4',
        './save-button': 'TesK',
        './undo-button': 'eccM',
        './redo-button': 'T3Bf',
        './reset-button': 'wuoU',
        './tool-select': 'oTNS',
        './color-select': 'jE7a',
      },
    ],
    Focm: [
      function (require, module, exports) {
        'use strict'
        var e = require('./app'),
          t = require('./tools'),
          r = require('./components'),
          n = require('./picture'),
          o = require('./utils')
        function c(e) {
          return d(e) || u(e) || a(e) || i()
        }
        function i() {
          throw new TypeError(
            'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
          )
        }
        function a(e, t) {
          if (e) {
            if ('string' == typeof e) return l(e, t)
            var r = Object.prototype.toString.call(e).slice(8, -1)
            return (
              'Object' === r && e.constructor && (r = e.constructor.name),
              'Map' === r || 'Set' === r
                ? Array.from(e)
                : 'Arguments' === r ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                ? l(e, t)
                : void 0
            )
          }
        }
        function u(e) {
          if (
            ('undefined' != typeof Symbol && null != e[Symbol.iterator]) ||
            null != e['@@iterator']
          )
            return Array.from(e)
        }
        function d(e) {
          if (Array.isArray(e)) return l(e)
        }
        function l(e, t) {
          ;(null == t || t > e.length) && (t = e.length)
          for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r]
          return n
        }
        function f(e, t) {
          var r = Object.keys(e)
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e)
            t &&
              (n = n.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
              })),
              r.push.apply(r, n)
          }
          return r
        }
        function p(e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {}
            t % 2
              ? f(Object(r), !0).forEach(function (t) {
                  s(e, t, r[t])
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : f(Object(r)).forEach(function (t) {
                  Object.defineProperty(
                    e,
                    t,
                    Object.getOwnPropertyDescriptor(r, t)
                  )
                })
          }
          return e
        }
        function s(e, t, r) {
          return (
            t in e
              ? Object.defineProperty(e, t, {
                  value: r,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (e[t] = r),
            e
          )
        }
        var y = {
            tool: 'draw',
            color: '#000000',
            picture: n.Picture.empty(60, 30, '#f0f0f0'),
            done: [],
            redone: [],
            doneAt: 0,
          },
          b = {
            draw: t.draw,
            fill: t.fill,
            pick: t.pick,
            rectangle: t.rectangle,
            circle: t.circle,
            triangle: t.triangle,
          },
          v = [
            r.ToolSelect,
            r.ColorSelect,
            r.SaveButton,
            r.LoadButton,
            r.UndoButton,
            r.RedoButton,
            r.ResetButton,
          ]
        function g(e, t) {
          if (t.undo) {
            if (e.done.length < 2) return e
            var i = e.done.pop()
            return (0, o.cached)(
              p(
                p({}, e),
                {},
                {
                  picture: e.done[e.done.length - 1],
                  done: c(e.done),
                  redone: [].concat(c(e.redone), [i]),
                  doneAt: 0,
                }
              )
            )
          }
          if (t.redo) {
            if (e.redone.length < 1) return e
            var a = e.redone.pop()
            return (0, o.cached)(
              p(
                p({}, e),
                {},
                {
                  picture: a,
                  done: [].concat(c(e.done), [a]),
                  redone: c(e.redone),
                  doneAt: 0,
                }
              )
            )
          }
          if (t.reset) {
            var u = n.Picture.empty(60, 30, '#f0f0f0')
            return (0, o.cached)(
              p(p({}, e), {}, { picture: u, done: [], redone: [] })
            )
          }
          return t.save
            ? (r.SaveButton.save(e.picture), p({}, e))
            : t.picture && e.doneAt < Date.now() - 1e3
            ? (0, o.cached)(
                p(
                  p(p({}, e), t),
                  {},
                  {
                    done: [].concat(c(e.done), [e.picture]),
                    redone: [],
                    doneAt: Date.now(),
                  }
                )
              )
            : (0, o.cached)(p(p({}, e), t))
        }
        function m(t) {
          var r,
            n = t.state,
            c =
              void 0 === n
                ? null !== (r = (0, o.getCachedState)()) && void 0 !== r
                  ? r
                  : y
                : n,
            i = t.tools,
            a = void 0 === i ? b : i,
            u = t.controls,
            d = void 0 === u ? v : u,
            l = new e.PixelEditor(c, {
              tools: a,
              controls: d,
              dispatch: function (e) {
                ;(c = g(c, e)), l.syncState(c)
              },
            })
          return l.dom
        }
        document.getElementById('root').appendChild(m({}))
      },
      {
        './app': 'A2T1',
        './tools': 'SY57',
        './components': 'iA92',
        './picture': 'j6dk',
        './utils': 'FOZT',
      },
    ],
  },
  {},
  ['Focm'],
  null
)
//# sourceMappingURL=src.f3e4d475.js.map
