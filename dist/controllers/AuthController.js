"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _AuthService = _interopRequireDefault(require("../service/AuthService"));
var _expressValidator = require("express-validator");
var _ApiError = _interopRequireDefault(require("../exceptions/ApiError"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var AuthController = /*#__PURE__*/function () {
  function AuthController() {
    _classCallCheck(this, AuthController);
  }
  return _createClass(AuthController, [{
    key: "login",
    value: function () {
      var _login = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res, next) {
        var _req$body, email, password, userData, maxAge;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _req$body = req.body, email = _req$body.email, password = _req$body.password;
              _context.next = 4;
              return _AuthService["default"].login(email, password);
            case 4:
              userData = _context.sent;
              maxAge = 30 * 24 * 60 * 60 * 1000;
              res.cookie("refreshToken", userData.refreshToken, {
                httpOnly: true,
                maxAge: maxAge
              });
              res.json(userData);
              _context.next = 13;
              break;
            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](0);
              next(_context.t0);
            case 13:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 10]]);
      }));
      function login(_x, _x2, _x3) {
        return _login.apply(this, arguments);
      }
      return login;
    }()
  }, {
    key: "logout",
    value: function () {
      var _logout = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res, next) {
        var accessToken;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              accessToken = req.body.accessToken;
              _context2.next = 4;
              return _AuthService["default"].logout(accessToken);
            case 4:
              res.clearCookie("refreshToken");
              res.json({
                message: "Logout successful"
              });
              _context2.next = 11;
              break;
            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](0);
              next(_context2.t0);
            case 11:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 8]]);
      }));
      function logout(_x4, _x5, _x6) {
        return _logout.apply(this, arguments);
      }
      return logout;
    }()
  }, {
    key: "refresh",
    value: function () {
      var _refresh = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res, next) {
        var cookieHeader, cookies, refreshTokenCookie, refreshToken, userData;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              cookieHeader = req.headers.cookie;
              cookies = cookieHeader ? cookieHeader.split(";").map(function (cookie) {
                return cookie.trim();
              }) : [];
              refreshTokenCookie = cookies.find(function (cookie) {
                return cookie.startsWith("refreshToken=");
              });
              refreshToken = refreshTokenCookie ? refreshTokenCookie.split("=")[1] : null;
              if (refreshToken) {
                _context3.next = 7;
                break;
              }
              return _context3.abrupt("return", next(_ApiError["default"].UnauthorizedError()));
            case 7:
              _context3.next = 9;
              return _AuthService["default"].refresh(refreshToken);
            case 9:
              userData = _context3.sent;
              if (userData) {
                _context3.next = 12;
                break;
              }
              return _context3.abrupt("return", next(_ApiError["default"].UnauthorizedError()));
            case 12:
              res.cookie("refreshToken", userData.refreshToken, {
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000
              });
              res.json(userData);
              _context3.next = 19;
              break;
            case 16:
              _context3.prev = 16;
              _context3.t0 = _context3["catch"](0);
              next(_context3.t0);
            case 19:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 16]]);
      }));
      function refresh(_x7, _x8, _x9) {
        return _refresh.apply(this, arguments);
      }
      return refresh;
    }()
  }, {
    key: "registration",
    value: function () {
      var _registration = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res, next) {
        var errors, errorMessages, _req$body2, email, password, userData;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              errors = (0, _expressValidator.validationResult)(req).array();
              if (!(errors.length > 0)) {
                _context4.next = 5;
                break;
              }
              errorMessages = errors.map(function (error) {
                return error.msg;
              });
              return _context4.abrupt("return", next(_ApiError["default"].BadRequest("Validation error", errorMessages)));
            case 5:
              _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
              _context4.next = 8;
              return _AuthService["default"].registration(email, password);
            case 8:
              userData = _context4.sent;
              res.json(userData);
              _context4.next = 16;
              break;
            case 12:
              _context4.prev = 12;
              _context4.t0 = _context4["catch"](0);
              console.error("Registration error:", _context4.t0);
              next(_context4.t0);
            case 16:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[0, 12]]);
      }));
      function registration(_x10, _x11, _x12) {
        return _registration.apply(this, arguments);
      }
      return registration;
    }()
  }, {
    key: "verify",
    value: function () {
      var _verify = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res, next) {
        var verificationLink;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              verificationLink = req.params.verificationLink;
              _context5.next = 4;
              return _AuthService["default"].verify(verificationLink);
            case 4:
              res.redirect("".concat(process.env.CLIENT_MOBILE_URL, "/--/login"));
              _context5.next = 10;
              break;
            case 7:
              _context5.prev = 7;
              _context5.t0 = _context5["catch"](0);
              next(_context5.t0);
            case 10:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[0, 7]]);
      }));
      function verify(_x13, _x14, _x15) {
        return _verify.apply(this, arguments);
      }
      return verify;
    }()
  }, {
    key: "forgotPassword",
    value: function () {
      var _forgotPassword = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res, next) {
        var email, userEmail;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              email = req.body.email;
              _context6.next = 4;
              return _AuthService["default"].forgotPassword(email);
            case 4:
              userEmail = _context6.sent;
              res.json(userEmail ? "Check your email ".concat(email) : "User email is not correct");
              _context6.next = 11;
              break;
            case 8:
              _context6.prev = 8;
              _context6.t0 = _context6["catch"](0);
              next(_context6.t0);
            case 11:
            case "end":
              return _context6.stop();
          }
        }, _callee6, null, [[0, 8]]);
      }));
      function forgotPassword(_x16, _x17, _x18) {
        return _forgotPassword.apply(this, arguments);
      }
      return forgotPassword;
    }()
  }, {
    key: "createNewPassword",
    value: function () {
      var _createNewPassword = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res, next) {
        var _req$params, createNewPasswordLink, email;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              try {
                _req$params = req.params, createNewPasswordLink = _req$params.createNewPasswordLink, email = _req$params.email;
                res.redirect("".concat(process.env.CLIENT_MOBILE_URL, "/--/create-new-password/").concat(createNewPasswordLink, "/").concat(email));
              } catch (e) {
                next(e);
              }
            case 1:
            case "end":
              return _context7.stop();
          }
        }, _callee7);
      }));
      function createNewPassword(_x19, _x20, _x21) {
        return _createNewPassword.apply(this, arguments);
      }
      return createNewPassword;
    }()
  }, {
    key: "saveNewPassword",
    value: function () {
      var _saveNewPassword = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res, next) {
        var _req$body3, password, email, userData;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              _req$body3 = req.body, password = _req$body3.password, email = _req$body3.email; // Вызов сервиса для сохранения нового пароля
              _context8.next = 4;
              return _AuthService["default"].saveNewPassword(email, password);
            case 4:
              userData = _context8.sent;
              if (userData) {
                _context8.next = 7;
                break;
              }
              return _context8.abrupt("return", next(_ApiError["default"].BadRequest("User not found")));
            case 7:
              res.cookie("refreshToken", userData.refreshToken, {
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000
              });
              res.json(userData);
              _context8.next = 14;
              break;
            case 11:
              _context8.prev = 11;
              _context8.t0 = _context8["catch"](0);
              next(_context8.t0);
            case 14:
            case "end":
              return _context8.stop();
          }
        }, _callee8, null, [[0, 11]]);
      }));
      function saveNewPassword(_x22, _x23, _x24) {
        return _saveNewPassword.apply(this, arguments);
      }
      return saveNewPassword;
    }()
  }, {
    key: "changePassword",
    value: function () {
      var _changePassword = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res, next) {
        var _req$body4, userId, password, newPassword, user;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              _req$body4 = req.body, userId = _req$body4.userId, password = _req$body4.password, newPassword = _req$body4.newPassword;
              _context9.next = 4;
              return _AuthService["default"].changePassword(userId, password, newPassword);
            case 4:
              user = _context9.sent;
              if (!user) {
                _context9.next = 9;
                break;
              }
              res.json(user);
              _context9.next = 10;
              break;
            case 9:
              throw _ApiError["default"].BadRequest("User not found");
            case 10:
              _context9.next = 15;
              break;
            case 12:
              _context9.prev = 12;
              _context9.t0 = _context9["catch"](0);
              next(_context9.t0);
            case 15:
            case "end":
              return _context9.stop();
          }
        }, _callee9, null, [[0, 12]]);
      }));
      function changePassword(_x25, _x26, _x27) {
        return _changePassword.apply(this, arguments);
      }
      return changePassword;
    }()
  }, {
    key: "changeEmail",
    value: function () {
      var _changeEmail = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res, next) {
        var _req$body5, userId, newEmail, user;
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              _context10.prev = 0;
              _req$body5 = req.body, userId = _req$body5.userId, newEmail = _req$body5.newEmail;
              _context10.next = 4;
              return _AuthService["default"].changeEmail(userId, newEmail);
            case 4:
              user = _context10.sent;
              if (!user) {
                _context10.next = 9;
                break;
              }
              res.json(user);
              _context10.next = 10;
              break;
            case 9:
              throw _ApiError["default"].BadRequest("User not found");
            case 10:
              _context10.next = 15;
              break;
            case 12:
              _context10.prev = 12;
              _context10.t0 = _context10["catch"](0);
              next(_context10.t0);
            case 15:
            case "end":
              return _context10.stop();
          }
        }, _callee10, null, [[0, 12]]);
      }));
      function changeEmail(_x28, _x29, _x30) {
        return _changeEmail.apply(this, arguments);
      }
      return changeEmail;
    }()
  }, {
    key: "me",
    value: function () {
      var _me = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res, next) {
        var token, accessToken, user;
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              _context11.prev = 0;
              token = req.headers.authorization;
              accessToken = token ? token.split(" ")[1] : null;
              if (accessToken) {
                _context11.next = 5;
                break;
              }
              throw _ApiError["default"].UnauthorizedError();
            case 5:
              _context11.next = 7;
              return _AuthService["default"].me(accessToken);
            case 7:
              user = _context11.sent;
              if (!user) {
                _context11.next = 12;
                break;
              }
              res.json(user);
              _context11.next = 13;
              break;
            case 12:
              throw _ApiError["default"].BadRequest("User not found");
            case 13:
              _context11.next = 18;
              break;
            case 15:
              _context11.prev = 15;
              _context11.t0 = _context11["catch"](0);
              next(_context11.t0);
            case 18:
            case "end":
              return _context11.stop();
          }
        }, _callee11, null, [[0, 15]]);
      }));
      function me(_x31, _x32, _x33) {
        return _me.apply(this, arguments);
      }
      return me;
    }()
  }]);
}();
var _default = exports["default"] = new AuthController();