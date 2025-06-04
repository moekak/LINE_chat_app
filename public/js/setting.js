/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/config/apiEndPoints.js":
/*!*********************************************!*\
  !*** ./resources/js/config/apiEndPoints.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   API_ENDPOINTS: () => (/* binding */ API_ENDPOINTS)
/* harmony export */ });
var API_ENDPOINTS = {
  SEARCH_USERS: "/api/search/users",
  LOGIN: "/api/auth/login",
  REGISTER: "/api/auth/register",
  FETCH_MESSAGES: "/api/messages/fetch",
  GENERATE_TOKEN: "/api/token/generate",
  ADMIN_MESSAGES_STORE: "/api/admin/messages/store",
  TEMPLATE_SELECT: "/api/template/select",
  UPDATE_BACKGROUND_COLOLR: "/api/update/bgColor"
};

/***/ }),

/***/ "./resources/js/module/util/api/Fetch.js":
/*!***********************************************!*\
  !*** ./resources/js/module/util/api/Fetch.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Fetch = /*#__PURE__*/function () {
  function Fetch() {
    _classCallCheck(this, Fetch);
  }
  return _createClass(Fetch, null, [{
    key: "fetchPostOperation",
    value: function fetchPostOperation(data, url) {
      return fetch("".concat(url), {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(/*#__PURE__*/function () {
        var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(response) {
          var errorMessage;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                if (!(response.status === 204)) {
                  _context.next = 2;
                  break;
                }
                return _context.abrupt("return");
              case 2:
                if (response.ok) {
                  _context.next = 7;
                  break;
                }
                _context.next = 5;
                return response.text();
              case 5:
                errorMessage = _context.sent;
                throw new Error("\u30B5\u30FC\u30D0\u30FC\u30A8\u30E9\u30FC: ".concat(response.status, " - ").concat(errorMessage));
              case 7:
                return _context.abrupt("return", response.json());
              case 8:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }));
        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }())["catch"](function (error) {
        console.error(error);
      });
    }
  }, {
    key: "fetchGetOperation",
    value: function fetchGetOperation(url) {
      return fetch("".concat(url), {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(/*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(response) {
          var errorMessage;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                if (!(response.status === 204)) {
                  _context2.next = 2;
                  break;
                }
                return _context2.abrupt("return");
              case 2:
                if (response.ok) {
                  _context2.next = 7;
                  break;
                }
                _context2.next = 5;
                return response.text();
              case 5:
                errorMessage = _context2.sent;
                throw new Error("\u30B5\u30FC\u30D0\u30FC\u30A8\u30E9\u30FC: ".concat(response.status, " - ").concat(errorMessage));
              case 7:
                return _context2.abrupt("return", response.json());
              case 8:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }));
        return function (_x2) {
          return _ref2.apply(this, arguments);
        };
      }()).then(function (data) {
        return data;
      })["catch"](function (error) {
        console.error("エラーが発生しました:", error.message);
      });
    }
  }]);
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Fetch);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*********************************!*\
  !*** ./resources/js/setting.js ***!
  \*********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config_apiEndPoints__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config/apiEndPoints */ "./resources/js/config/apiEndPoints.js");
/* harmony import */ var _module_util_api_Fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./module/util/api/Fetch */ "./resources/js/module/util/api/Fetch.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }



// 統合設定管理システム
document.addEventListener("DOMContentLoaded", function () {
  var _document$getElementB, _document$getElementB2, _document$getElementB3, _document$getElementB4;
  var SettingsManager = {
    // 設定データ
    settings: {
      voice: {
        enabled: true
      },
      theme: {
        current: 'default',
        customColor: {
          r: (_document$getElementB = document.getElementById("red_value").value) !== null && _document$getElementB !== void 0 ? _document$getElementB : 245,
          g: (_document$getElementB2 = document.getElementById("green_value").value) !== null && _document$getElementB2 !== void 0 ? _document$getElementB2 : 246,
          b: (_document$getElementB3 = document.getElementById("blue_value").value) !== null && _document$getElementB3 !== void 0 ? _document$getElementB3 : 250
        },
        hex: (_document$getElementB4 = document.getElementById("hex_display").value) !== null && _document$getElementB4 !== void 0 ? _document$getElementB4 : "#f5f6fa"
      },
      isCorrectData: true
    },
    // DOM要素
    elements: {
      settingsButton: null,
      settingsModal: null,
      closeButton: null,
      backgroundLayer: null,
      voiceCheckbox: null,
      themeCards: null,
      saveButton: null,
      customColorPanel: null,
      rgbSliders: {
        red: null,
        green: null,
        blue: null
      },
      rgbValues: {
        red: null,
        green: null,
        blue: null
      },
      colorPreview: null,
      rgbDisplay: null,
      hexDisplay: null,
      presetColors: null
    },
    // 初期化
    init: function init() {
      this.initElements();
      this.bindEvents();
      this.loadSettings();
      this.updateUI();
    },
    // DOM要素の取得
    initElements: function initElements() {
      this.elements.settingsButton = document.querySelector('.js_settings_toggle');
      this.elements.settingsModal = document.querySelector('.settings_modal');
      this.elements.closeButton = document.querySelector('.js_close_settings_modal');
      this.elements.backgroundLayer = document.querySelector('.bg') || this.createBackgroundLayer();
      this.elements.voiceCheckbox = document.querySelector('.js_voice_checkbox');
      this.elements.themeCards = document.querySelectorAll('.theme_card');
      this.elements.saveButton = document.querySelector('.js_save_settings');
      this.elements.customColorPanel = document.getElementById('custom_color_panel');

      // RGB関連要素
      this.elements.rgbSliders.red = document.getElementById('red_slider');
      this.elements.rgbSliders.green = document.getElementById('green_slider');
      this.elements.rgbSliders.blue = document.getElementById('blue_slider');
      this.elements.rgbValues.red = document.getElementById('red_value');
      this.elements.rgbValues.green = document.getElementById('green_value');
      this.elements.rgbValues.blue = document.getElementById('blue_value');
      this.elements.colorPreview = document.getElementById('color_preview_large');
      this.elements.rgbDisplay = document.getElementById('rgb_display');
      this.elements.hexDisplay = document.getElementById('hex_display');
      this.elements.presetColors = document.querySelectorAll('.preset_color');
    },
    // 背景レイヤーの作成
    createBackgroundLayer: function createBackgroundLayer() {
      var bg = document.createElement('div');
      bg.className = 'bg hidden';
      document.body.appendChild(bg);
      return bg;
    },
    // イベントリスナーの設定
    bindEvents: function bindEvents() {
      var _this = this;
      // 設定ボタンクリック
      if (this.elements.settingsButton) {
        this.elements.settingsButton.addEventListener('click', function () {
          _this.openSettings();
        });
      }
      if (this.elements.hexDisplay) {
        this.elements.hexDisplay.addEventListener("input", function (e) {
          var hex = e.target.value;
          _this.settings.theme.hex = hex;
          var rgb = _this.hexToRgb(hex);

          // console.log("validatorForHex" + this.validatorForHex(hex));
          // console.log("validatorForRgb" + this.validatorForRgb(rgb["r"], rgb["g"], rgb["b"]));

          _this.settings.isCorrectData = _this.validatorForHex(hex) && _this.validatorForRgb(rgb["r"], rgb["g"], rgb["b"]);
          // console.log(`正確なデータか: ${this.settings.isCorrectData}`);

          _this.settings.theme.customColor.r = rgb["r"];
          _this.settings.theme.customColor.g = rgb["g"];
          _this.settings.theme.customColor.b = rgb["b"];
          _this.setCustomColor(rgb["r"], rgb["g"], rgb["b"], true);
        });
      }
      if (this.elements.rgbDisplay) {
        this.elements.rgbDisplay.addEventListener("input", function (e) {
          var rgb = e.target.value;
          var match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
          if (match) {
            var r = parseInt(match[1]);
            var g = parseInt(match[2]);
            var b = parseInt(match[3]);
            var hex = _this.rgbToHex(r, g, b);
            _this.settings.theme.hex = hex;
            _this.settings.theme.customColor.r = r;
            _this.settings.theme.customColor.g = g;
            _this.settings.theme.customColor.b = b;
            _this.setCustomColor(r, g, b);
            _this.settings.isCorrectData = _this.validatorForHex(hex) && _this.validatorForRgb(r, g, b);
          } else {
            _this.settings.isCorrectData = false;
          }
        });
      }

      // モーダル閉じるボタン
      if (this.elements.closeButton) {
        this.elements.closeButton.addEventListener('click', function () {
          _this.closeSettings();
        });
      }

      // 背景クリックで閉じる
      if (this.elements.backgroundLayer) {
        this.elements.backgroundLayer.addEventListener('click', function () {
          _this.closeSettings();
        });
      }

      // 音声設定の変更
      if (this.elements.voiceCheckbox) {
        this.elements.voiceCheckbox.addEventListener('change', function (e) {
          window.isON["isSoundOn"] = e.target.checked;
          _this.showVoiceToggleFeedback();
        });
      }

      // テーマカード選択
      this.elements.themeCards.forEach(function (card) {
        card.addEventListener('click', function () {
          _this.selectTheme(card.dataset.theme);
        });
      });

      // RGB スライダー
      Object.keys(this.elements.rgbSliders).forEach(function (color) {
        var slider = _this.elements.rgbSliders[color];
        if (slider) {
          slider.addEventListener('input', function () {
            _this.updateCustomColor();
            _this.settings.isCorrectData = true;
          });
        }
      });

      // プリセットカラー
      this.elements.presetColors.forEach(function (preset) {
        preset.addEventListener('click', function () {
          var rgb = preset.dataset.rgb.split(',').map(Number);
          _this.setCustomColor(rgb[0], rgb[1], rgb[2]);
          _this.settings.isCorrectData = true;
        });
      });

      // 保存ボタン
      if (this.elements.saveButton) {
        this.elements.saveButton.addEventListener('click', function () {
          _this.saveSettings();
        });
      }

      // ESCキーで閉じる
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !_this.elements.settingsModal.classList.contains('hidden')) {
          _this.closeSettings();
        }
      });
    },
    // 設定モーダルを開く
    openSettings: function openSettings() {
      var _this2 = this;
      // 設定ボタンにアニメーション
      this.elements.settingsButton.classList.add('active');
      setTimeout(function () {
        _this2.elements.settingsButton.classList.remove('active');
      }, 600);

      // モーダルを表示
      this.elements.backgroundLayer.classList.remove('hidden');
      this.elements.settingsModal.classList.remove('hidden');

      // 現在の設定をUIに反映
      this.updateModalUI();
    },
    // 設定モーダルを閉じる
    closeSettings: function closeSettings() {
      this.elements.backgroundLayer.classList.add('hidden');
      this.elements.settingsModal.classList.add('hidden');
    },
    // モーダル内のUIを更新
    updateModalUI: function updateModalUI() {
      // 音声設定の反映
      if (this.elements.voiceCheckbox) {
        this.elements.voiceCheckbox.checked = window.isON["isSoundOn"];
      }

      // テーマ選択の反映
      this.updateThemeSelection();
    },
    // カスタムカラーの更新
    updateCustomColor: function updateCustomColor() {
      var r = parseInt(this.elements.rgbSliders.red.value);
      var g = parseInt(this.elements.rgbSliders.green.value);
      var b = parseInt(this.elements.rgbSliders.blue.value);
      this.settings.theme.customColor = {
        r: r,
        g: g,
        b: b
      };
      this.updateCustomColorUI();
    },
    // カスタムカラーの設定
    setCustomColor: function setCustomColor(r, g, b) {
      var isHex = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      this.settings.theme.customColor = {
        r: r,
        g: g,
        b: b
      };

      // スライダーの値を更新
      this.elements.rgbSliders.red.value = r;
      this.elements.rgbSliders.green.value = g;
      this.elements.rgbSliders.blue.value = b;
      this.updateCustomColorUI(isHex);
    },
    // カスタムカラーUIの更新
    updateCustomColorUI: function updateCustomColorUI() {
      var isHex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var _this$settings$theme$ = this.settings.theme.customColor,
        r = _this$settings$theme$.r,
        g = _this$settings$theme$.g,
        b = _this$settings$theme$.b;

      // 値の表示を更新
      this.elements.rgbValues.red.textContent = r;
      this.elements.rgbValues.green.textContent = g;
      this.elements.rgbValues.blue.textContent = b;

      // カラープレビューを更新
      var rgbColor = "rgb(".concat(r, ", ").concat(g, ", ").concat(b, ")");
      if (this.elements.colorPreview) {
        this.elements.colorPreview.style.background = rgbColor;
      }

      // カスタムテーマプレビューを更新
      var customPreview = document.getElementById('custom_preview');
      if (customPreview) {
        customPreview.style.background = rgbColor;
      }

      // // RGB/HEX表示を更新
      if (this.elements.rgbDisplay) {
        this.elements.rgbDisplay.value = rgbColor;
      }
      if (!isHex && this.elements.hexDisplay) {
        var hex = this.rgbToHex(r, g, b);
        this.settings.theme.hex = hex;
        this.settings.theme.customColor.r = r;
        this.settings.theme.customColor.g = g;
        this.settings.theme.customColor.b = b;
        this.elements.hexDisplay.value = hex;
      }

      // スライダーの背景を更新
      this.updateSliderBackgrounds();
    },
    // スライダー背景の更新
    updateSliderBackgrounds: function updateSliderBackgrounds() {
      var _this$settings$theme$2 = this.settings.theme.customColor,
        r = _this$settings$theme$2.r,
        g = _this$settings$theme$2.g,
        b = _this$settings$theme$2.b;

      // 赤スライダー
      if (this.elements.rgbSliders.red) {
        this.elements.rgbSliders.red.style.background = "linear-gradient(to right, rgb(0,".concat(g, ",").concat(b, ") 0%, rgb(255,").concat(g, ",").concat(b, ") 100%)");
      }

      // 緑スライダー
      if (this.elements.rgbSliders.green) {
        this.elements.rgbSliders.green.style.background = "linear-gradient(to right, rgb(".concat(r, ",0,").concat(b, ") 0%, rgb(").concat(r, ",255,").concat(b, ") 100%)");
      }

      // 青スライダー
      if (this.elements.rgbSliders.blue) {
        this.elements.rgbSliders.blue.style.background = "linear-gradient(to right, rgb(".concat(r, ",").concat(g, ",0) 0%, rgb(").concat(r, ",").concat(g, ",255) 100%)");
      }
    },
    validatorForHex: function validatorForHex(hex) {
      return /^#[0-9A-Fa-f]{6}$/.test(hex);
    },
    validatorForRgb: function validatorForRgb(r, g, b) {
      var isValidValue = function isValidValue(n) {
        return !isNaN(n) && n >= 0 && n <= 255;
      };
      return isValidValue(r) && isValidValue(g) && isValidValue(b);
    },
    // RGBからHEXへの変換
    rgbToHex: function rgbToHex(r, g, b) {
      var componentToHex = function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
      };
      return "#".concat(componentToHex(r)).concat(componentToHex(g)).concat(componentToHex(b)).toUpperCase();
    },
    hexToRgb: function hexToRgb(hex) {
      // #を除去し、大文字に変換
      hex = hex.replace('#', '').toUpperCase();
      if (!/^[0-9A-F]{6}$/.test(hex)) return {
        r: NaN,
        g: NaN,
        b: NaN
      };

      // 16進数を10進数に変換
      var r = parseInt(hex.substring(0, 2), 16);
      var g = parseInt(hex.substring(2, 4), 16);
      var b = parseInt(hex.substring(4, 6), 16);
      return {
        r: r,
        g: g,
        b: b
      };
    },
    // テーマ選択UIの更新
    updateThemeSelection: function updateThemeSelection() {
      var _this3 = this;
      this.elements.themeCards.forEach(function (card) {
        if (card.dataset.theme === _this3.settings.theme.current) {
          card.classList.add('active');
        } else {
          card.classList.remove('active');
        }
      });
    },
    // 音声切り替えフィードバック
    showVoiceToggleFeedback: function showVoiceToggleFeedback() {
      var message = window.isON["isSoundOn"] ? '🔊 音声通知がオンになりました' : '🔇 音声通知がオフになりました';
      this.showToast(message, window.isON["isSoundOn"] ? '#27ae60' : '#e74c3c');
    },
    // 設定の保存
    saveSettings: function saveSettings() {
      var _this4 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var data, response;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (_this4.settings.isCorrectData) {
                _context.next = 5;
                break;
              }
              document.getElementById("js_error").classList.remove("hidden");
              return _context.abrupt("return");
            case 5:
              document.getElementById("js_error").classList.add("hidden");
            case 6:
              document.querySelector(".js_saving_txt").classList.add("hidden");
              document.querySelector(".js_spinning_btn").classList.remove("hidden");
              data = {
                "hex": _this4.settings.theme.hex,
                "rgb": _this4.settings.theme.customColor,
                "line_account_id": document.getElementById("js_admin_id").value
              };
              _context.next = 11;
              return _module_util_api_Fetch__WEBPACK_IMPORTED_MODULE_1__["default"].fetchPostOperation(data, _config_apiEndPoints__WEBPACK_IMPORTED_MODULE_0__.API_ENDPOINTS.UPDATE_BACKGROUND_COLOLR);
            case 11:
              response = _context.sent;
              console.log(response);
              if (response["status"] === 200) {
                document.querySelector(".js_spinning_btn").classList.add("hidden");
                document.querySelector(".js_saving_txt").classList.remove("hidden");
                document.querySelector(".contents").style.backgroundColor = response["hex"];
              } else {
                document.querySelector(".js_spinning_btn").classList.add("hidden");
                document.querySelector(".js_saving_txt").classList.remove("hidden");
                alert("背景色の設定に失敗しました。お手数ですがもう一度お試しください。");
              }

              // // テーマの適用
              // this.applyTheme();

              // // メモリに保存
              // this.saveToMemory();

              // 保存完了のフィードバック
              _this4.showSaveSuccess();

              // モーダルを閉じる
              setTimeout(function () {
                _this4.closeSettings();
              }, 1000);
            case 16:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    },
    // テーマの適用
    applyTheme: function applyTheme() {
      var body = document.body;
      var contents = document.querySelector('.contents');

      // 既存のテーマクラスを削除
      body.className = body.className.replace(/theme-\w+/g, '');
      if (contents) {
        contents.className = contents.className.replace(/theme-\w+/g, '');
        contents.classList.add('theme-transition');
      }

      // 新しいテーマクラスを追加
      if (this.settings.theme.current !== 'default') {
        body.classList.add("theme-".concat(this.settings.theme.current));
        if (contents) {
          contents.classList.add("theme-".concat(this.settings.theme.current));
        }
      }

      // カスタムテーマの場合は背景色を直接適用
      if (this.settings.theme.current === 'custom') {
        var _this$settings$theme$3 = this.settings.theme.customColor,
          r = _this$settings$theme$3.r,
          g = _this$settings$theme$3.g,
          b = _this$settings$theme$3.b;
        var customColor = "rgb(".concat(r, ", ").concat(g, ", ").concat(b, ")");
        var lightColor = "rgb(".concat(Math.min(255, r + 20), ", ").concat(Math.min(255, g + 20), ", ").concat(Math.min(255, b + 20), ")");
        if (contents) {
          contents.style.background = "linear-gradient(135deg, ".concat(customColor, " 0%, ").concat(lightColor, " 100%)");
        }
        body.style.backgroundColor = customColor;
      } else {
        // カスタムテーマでない場合はインラインスタイルをリセット
        if (contents) {
          contents.style.background = '';
        }
        body.style.backgroundColor = '';
      }

      // トランジション効果を削除
      setTimeout(function () {
        if (contents) {
          contents.classList.remove('theme-transition');
        }
      }, 500);
    },
    // メモリに設定を保存
    saveToMemory: function saveToMemory() {
      window.chatSettings = {
        voice: _objectSpread({}, this.settings.voice),
        theme: _objectSpread({}, this.settings.theme)
      };
    },
    // 設定の読み込み
    loadSettings: function loadSettings() {
      if (window.chatSettings) {
        this.settings = {
          voice: _objectSpread({}, window.chatSettings.voice),
          theme: _objectSpread({}, window.chatSettings.theme)
        };
      }
    },
    // UIの更新
    updateUI: function updateUI() {
      this.applyTheme();
    },
    // 保存成功のフィードバック
    showSaveSuccess: function showSaveSuccess() {
      var button = this.elements.saveButton;
      var originalText = button.querySelector(".js_saving_txt").textContent;
      button.querySelector(".js_saving_txt").textContent = '✓ 保存しました';
      button.style.background = 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)';
      setTimeout(function () {
        button.querySelector(".js_saving_txt").textContent = originalText;
        button.style.background = 'linear-gradient(135deg, #1a7aea 0%, #2196f3 100%)';
      }, 2000);
      var themeName = this.getThemeDisplayName(this.settings.theme.current);
      if (this.settings.theme.current === 'custom') {
        var _this$settings$theme$4 = this.settings.theme.customColor,
          r = _this$settings$theme$4.r,
          g = _this$settings$theme$4.g,
          b = _this$settings$theme$4.b;
        themeName += " (RGB: ".concat(r, ", ").concat(g, ", ").concat(b, ")");
      }
      this.showToast("\u8A2D\u5B9A\u3092\u4FDD\u5B58\u3057\u307E\u3057\u305F", '#27ae60');
    },
    // テーマ表示名の取得
    getThemeDisplayName: function getThemeDisplayName(theme) {
      var names = {
        'default': 'デフォルト',
        'dark': 'ダーク',
        'blue': 'ブルー',
        'green': 'グリーン',
        'purple': 'パープル',
        'warm': 'ウォーム',
        'custom': 'カスタム'
      };
      return names[theme] || 'デフォルト';
    },
    // トースト通知の表示
    showToast: function showToast(message) {
      var backgroundColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '#1a7aea';
      // 既存のトーストがあれば削除
      var existingToast = document.querySelector('.settings-toast');
      if (existingToast) {
        existingToast.remove();
      }
      var toast = document.createElement('div');
      toast.className = 'settings-toast';
      toast.textContent = message;
      toast.style.cssText = "\n                        position: fixed;\n                        top: 20px;\n                        right: 20px;\n                        background-color: ".concat(backgroundColor, ";\n                        color: white;\n                        padding: 12px 20px;\n                        border-radius: 10px;\n                        z-index: 1001;\n                        font-size: 14px;\n                        font-weight: 500;\n                        box-shadow: 0 6px 20px rgba(0,0,0,0.15);\n                        transform: translateX(100%);\n                        transition: transform 0.3s ease;\n                        max-width: 300px;\n                        word-wrap: break-word;\n                  ");
      document.body.appendChild(toast);

      // アニメーション
      setTimeout(function () {
        toast.style.transform = 'translateX(0)';
      }, 100);
      setTimeout(function () {
        toast.style.transform = 'translateX(100%)';
        setTimeout(function () {
          if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
          }
        }, 300);
      }, 3500);
    },
    // 音声通知の再生（外部から呼び出し可能）
    playNotificationSound: function playNotificationSound() {
      var _this5 = this;
      if (this.settings.voice.enabled) {
        try {
          // 実際の音声ファイルのパスを設定してください
          var audio = new Audio('/path/to/notification.mp3');
          audio.volume = 0.5;
          audio.play()["catch"](function (e) {
            console.log('音声再生に失敗:', e);
            // 代替として簡単なビープ音
            _this5.playBeepSound();
          });
        } catch (e) {
          console.log('音声機能が利用できません:', e);
          this.playBeepSound();
        }
      }
    },
    // 代替ビープ音
    playBeepSound: function playBeepSound() {
      if (this.settings.voice.enabled) {
        try {
          var audioContext = new (window.AudioContext || window.webkitAudioContext)();
          var oscillator = audioContext.createOscillator();
          var gainNode = audioContext.createGain();
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          oscillator.frequency.value = 800;
          oscillator.type = 'sine';
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.1);
        } catch (e) {
          console.log('ビープ音の再生に失敗:', e);
        }
      }
    }
  };

  // 初期化
  SettingsManager.init();

  // グローバルに音声通知機能を公開
  window.playNotificationSound = function () {
    SettingsManager.playNotificationSound();
  };

  // グローバルに設定オブジェクトを公開（デバッグ用）
  window.SettingsManager = SettingsManager;
});
})();

/******/ })()
;
//# sourceMappingURL=setting.js.map