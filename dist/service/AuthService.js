"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _User = _interopRequireDefault(require("../models/User/User"));
var _Token = _interopRequireDefault(require("../models/Token/Token"));
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _uuid = require("uuid");
var _MailService = _interopRequireDefault(require("./MailService"));
var _TokenService = _interopRequireDefault(require("./TokenService.js"));
var _UserDto = _interopRequireDefault(require("../dtos/UserDto.js"));
var _ApiError = _interopRequireDefault(require("../exceptions/ApiError.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var AuthService = /*#__PURE__*/function () {
  function AuthService() {
    _classCallCheck(this, AuthService);
  }
  return _createClass(AuthService, [{
    key: "login",
    value: function () {
      var _login = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(email, password) {
        var user, isPassEquals, userDto, tokens;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _User["default"].findOne({
                email: email
              });
            case 2:
              user = _context.sent;
              if (user) {
                _context.next = 5;
                break;
              }
              throw _ApiError["default"].BadRequest('User not found');
            case 5:
              _context.next = 7;
              return _bcryptjs["default"].compare(password, user.password);
            case 7:
              isPassEquals = _context.sent;
              if (isPassEquals) {
                _context.next = 10;
                break;
              }
              throw _ApiError["default"].BadRequest('Incorrect password');
            case 10:
              userDto = new _UserDto["default"](user);
              tokens = _TokenService["default"].generateTokens(_objectSpread({}, userDto));
              _context.next = 14;
              return _TokenService["default"].saveToken(userDto._id, tokens.refreshToken, tokens.accessToken);
            case 14:
              return _context.abrupt("return", _objectSpread(_objectSpread({}, tokens), {}, {
                user: userDto
              }));
            case 15:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function login(_x, _x2) {
        return _login.apply(this, arguments);
      }
      return login;
    }()
  }, {
    key: "logout",
    value: function () {
      var _logout = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(accessToken) {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _TokenService["default"].removeToken(accessToken);
            case 2:
              return _context2.abrupt("return", 'Logout successful');
            case 3:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function logout(_x3) {
        return _logout.apply(this, arguments);
      }
      return logout;
    }()
  }, {
    key: "refresh",
    value: function () {
      var _refresh = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(refreshToken) {
        var userData, user, userDto, tokens;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              if (refreshToken) {
                _context3.next = 2;
                break;
              }
              throw _ApiError["default"].UnauthorizedError();
            case 2:
              userData = _TokenService["default"].validateRefreshToken(refreshToken);
              if (userData) {
                _context3.next = 5;
                break;
              }
              throw _ApiError["default"].UnauthorizedError();
            case 5:
              _context3.next = 7;
              return _User["default"].findById(userData._id).exec();
            case 7:
              user = _context3.sent;
              userDto = new _UserDto["default"](user);
              tokens = _TokenService["default"].generateTokens(_objectSpread({}, userDto));
              _context3.next = 12;
              return _TokenService["default"].saveToken(userDto._id, tokens.refreshToken, tokens.accessToken);
            case 12:
              return _context3.abrupt("return", _objectSpread(_objectSpread({}, tokens), {}, {
                user: userDto
              }));
            case 13:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      function refresh(_x4) {
        return _refresh.apply(this, arguments);
      }
      return refresh;
    }()
  }, {
    key: "registration",
    value: function () {
      var _registration = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(email, password) {
        var candidate, hashPassword, verificationLink, user, userDto, tokens;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _User["default"].findOne({
                email: email
              });
            case 2:
              candidate = _context4.sent;
              if (!candidate) {
                _context4.next = 5;
                break;
              }
              throw _ApiError["default"].BadRequest("User with email ".concat(email, " already exists"));
            case 5:
              _context4.next = 7;
              return _bcryptjs["default"].hash(password, 5);
            case 7:
              hashPassword = _context4.sent;
              verificationLink = (0, _uuid.v4)();
              _context4.next = 11;
              return _User["default"].create({
                email: email,
                password: hashPassword,
                verificationLink: verificationLink
              });
            case 11:
              user = _context4.sent;
              // Uncomment this line if you need to send a verification email
              // await MailService.sendVerificationLink(
              //   email,
              //   `${process.env.API_URL}/api/verify/${verificationLink}`
              // );
              userDto = new _UserDto["default"](user);
              tokens = _TokenService["default"].generateTokens(_objectSpread({}, userDto));
              _context4.next = 16;
              return _TokenService["default"].saveToken(userDto._id, tokens.refreshToken, tokens.accessToken);
            case 16:
              return _context4.abrupt("return", _objectSpread(_objectSpread({}, tokens), {}, {
                user: userDto
              }));
            case 17:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }));
      function registration(_x5, _x6) {
        return _registration.apply(this, arguments);
      }
      return registration;
    }()
  }, {
    key: "verify",
    value: function () {
      var _verify = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(verificationLink) {
        var user;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _User["default"].findOne({
                verificationLink: verificationLink
              });
            case 2:
              user = _context5.sent;
              if (user) {
                _context5.next = 5;
                break;
              }
              throw new Error('Link is not correct');
            case 5:
              user.isVerified = true;
              _context5.next = 8;
              return user.save();
            case 8:
              return _context5.abrupt("return", verificationLink);
            case 9:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }));
      function verify(_x7) {
        return _verify.apply(this, arguments);
      }
      return verify;
    }()
  }, {
    key: "forgotPassword",
    value: function () {
      var _forgotPassword = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(email) {
        var user, createNewPasswordLink;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return _User["default"].findOne({
                email: email
              });
            case 2:
              user = _context6.sent;
              if (user) {
                _context6.next = 5;
                break;
              }
              throw _ApiError["default"].BadRequest('User email is not correct');
            case 5:
              createNewPasswordLink = (0, _uuid.v4)();
              _context6.next = 8;
              return _MailService["default"].sendPasswordRecoveryLink(email, "".concat(process.env.API_URL, "/api/create-new-password/").concat(createNewPasswordLink, "/").concat(email));
            case 8:
              return _context6.abrupt("return", user.email);
            case 9:
            case "end":
              return _context6.stop();
          }
        }, _callee6);
      }));
      function forgotPassword(_x8) {
        return _forgotPassword.apply(this, arguments);
      }
      return forgotPassword;
    }()
  }, {
    key: "saveNewPassword",
    value: function () {
      var _saveNewPassword = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(email, password) {
        var user, hashPassword, updatedUser;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return _User["default"].findOne({
                email: email
              });
            case 2:
              user = _context7.sent;
              if (user) {
                _context7.next = 5;
                break;
              }
              throw _ApiError["default"].BadRequest('User not found');
            case 5:
              _context7.next = 7;
              return _bcryptjs["default"].hash(password, 5);
            case 7:
              hashPassword = _context7.sent;
              _context7.next = 10;
              return _User["default"].findOneAndUpdate({
                email: email
              }, {
                password: hashPassword
              }, {
                "new": true
              });
            case 10:
              updatedUser = _context7.sent;
              return _context7.abrupt("return", updatedUser);
            case 12:
            case "end":
              return _context7.stop();
          }
        }, _callee7);
      }));
      function saveNewPassword(_x9, _x10) {
        return _saveNewPassword.apply(this, arguments);
      }
      return saveNewPassword;
    }()
  }, {
    key: "changePassword",
    value: function () {
      var _changePassword = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(_id, password, newPassword) {
        var user, isPassEquals, hashNewPassword, userDto;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return _User["default"].findOne({
                _id: _id
              });
            case 2:
              user = _context8.sent;
              if (user) {
                _context8.next = 5;
                break;
              }
              throw _ApiError["default"].BadRequest('User not found');
            case 5:
              _context8.next = 7;
              return _bcryptjs["default"].compare(password, user.password);
            case 7:
              isPassEquals = _context8.sent;
              if (isPassEquals) {
                _context8.next = 10;
                break;
              }
              throw _ApiError["default"].BadRequest('Incorrect password');
            case 10:
              _context8.next = 12;
              return _bcryptjs["default"].hash(newPassword, 5);
            case 12:
              hashNewPassword = _context8.sent;
              _context8.next = 15;
              return _User["default"].updateOne({
                _id: user._id
              }, {
                password: hashNewPassword
              });
            case 15:
              userDto = _context8.sent;
              return _context8.abrupt("return", userDto);
            case 17:
            case "end":
              return _context8.stop();
          }
        }, _callee8);
      }));
      function changePassword(_x11, _x12, _x13) {
        return _changePassword.apply(this, arguments);
      }
      return changePassword;
    }()
  }, {
    key: "changeEmail",
    value: function () {
      var _changeEmail = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(_id, newEmail) {
        var user, userWithTheSameEmail, verificationLink, userDto;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return _User["default"].findOne({
                _id: _id
              });
            case 2:
              user = _context9.sent;
              if (user) {
                _context9.next = 5;
                break;
              }
              throw _ApiError["default"].BadRequest('User not found');
            case 5:
              _context9.next = 7;
              return _User["default"].findOne({
                email: newEmail
              });
            case 7:
              userWithTheSameEmail = _context9.sent;
              if (!userWithTheSameEmail) {
                _context9.next = 10;
                break;
              }
              throw _ApiError["default"].BadRequest("User with email ".concat(newEmail, " already exists"));
            case 10:
              verificationLink = (0, _uuid.v4)();
              _context9.next = 13;
              return _User["default"].updateOne({
                _id: user._id
              }, {
                email: newEmail,
                verificationLink: verificationLink
              });
            case 13:
              userDto = _context9.sent;
              return _context9.abrupt("return", userDto);
            case 15:
            case "end":
              return _context9.stop();
          }
        }, _callee9);
      }));
      function changeEmail(_x14, _x15) {
        return _changeEmail.apply(this, arguments);
      }
      return changeEmail;
    }()
  }, {
    key: "me",
    value: function () {
      var _me = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(accessToken) {
        var userTokenModel, objectId, user;
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              _context10.prev = 0;
              _context10.next = 3;
              return _Token["default"].findOne({
                accessToken: accessToken
              });
            case 3:
              userTokenModel = _context10.sent;
              if (userTokenModel) {
                _context10.next = 6;
                break;
              }
              throw _ApiError["default"].BadRequest('User not found');
            case 6:
              objectId = userTokenModel._id;
              _context10.next = 9;
              return _User["default"].findById(objectId);
            case 9:
              user = _context10.sent;
              if (!user) {
                _context10.next = 14;
                break;
              }
              return _context10.abrupt("return", user);
            case 14:
              throw _ApiError["default"].BadRequest('User not found');
            case 15:
              _context10.next = 20;
              break;
            case 17:
              _context10.prev = 17;
              _context10.t0 = _context10["catch"](0);
              return _context10.abrupt("return", _ApiError["default"].UnauthorizedError());
            case 20:
            case "end":
              return _context10.stop();
          }
        }, _callee10, null, [[0, 17]]);
      }));
      function me(_x16) {
        return _me.apply(this, arguments);
      }
      return me;
    }()
  }]);
}();
var _default = exports["default"] = new AuthService();