//     Underscore.js 1.6.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function () { var n = this, t = n._, r = {}, e = Array.prototype, u = Object.prototype, i = Function.prototype, a = e.push, o = e.slice, c = e.concat, l = u.toString, f = u.hasOwnProperty, s = e.forEach, p = e.map, h = e.reduce, v = e.reduceRight, g = e.filter, d = e.every, m = e.some, y = e.indexOf, b = e.lastIndexOf, x = Array.isArray, w = Object.keys, _ = i.bind, j = function (n) { return n instanceof j ? n : this instanceof j ? void (this._wrapped = n) : new j(n) }; "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = j), exports._ = j) : n._ = j, j.VERSION = "1.6.0"; var A = j.each = j.forEach = function (n, t, e) { if (null == n) return n; if (s && n.forEach === s) n.forEach(t, e); else if (n.length === +n.length) { for (var u = 0, i = n.length; i > u; u++) if (t.call(e, n[u], u, n) === r) return } else for (var a = j.keys(n), u = 0, i = a.length; i > u; u++) if (t.call(e, n[a[u]], a[u], n) === r) return; return n }; j.map = j.collect = function (n, t, r) { var e = []; return null == n ? e : p && n.map === p ? n.map(t, r) : (A(n, function (n, u, i) { e.push(t.call(r, n, u, i)) }), e) }; var O = "Reduce of empty array with no initial value"; j.reduce = j.foldl = j.inject = function (n, t, r, e) { var u = arguments.length > 2; if (null == n && (n = []), h && n.reduce === h) return e && (t = j.bind(t, e)), u ? n.reduce(t, r) : n.reduce(t); if (A(n, function (n, i, a) { u ? r = t.call(e, r, n, i, a) : (r = n, u = !0) }), !u) throw new TypeError(O); return r }, j.reduceRight = j.foldr = function (n, t, r, e) { var u = arguments.length > 2; if (null == n && (n = []), v && n.reduceRight === v) return e && (t = j.bind(t, e)), u ? n.reduceRight(t, r) : n.reduceRight(t); var i = n.length; if (i !== +i) { var a = j.keys(n); i = a.length } if (A(n, function (o, c, l) { c = a ? a[--i] : --i, u ? r = t.call(e, r, n[c], c, l) : (r = n[c], u = !0) }), !u) throw new TypeError(O); return r }, j.find = j.detect = function (n, t, r) { var e; return k(n, function (n, u, i) { return t.call(r, n, u, i) ? (e = n, !0) : void 0 }), e }, j.filter = j.select = function (n, t, r) { var e = []; return null == n ? e : g && n.filter === g ? n.filter(t, r) : (A(n, function (n, u, i) { t.call(r, n, u, i) && e.push(n) }), e) }, j.reject = function (n, t, r) { return j.filter(n, function (n, e, u) { return !t.call(r, n, e, u) }, r) }, j.every = j.all = function (n, t, e) { t || (t = j.identity); var u = !0; return null == n ? u : d && n.every === d ? n.every(t, e) : (A(n, function (n, i, a) { return (u = u && t.call(e, n, i, a)) ? void 0 : r }), !!u) }; var k = j.some = j.any = function (n, t, e) { t || (t = j.identity); var u = !1; return null == n ? u : m && n.some === m ? n.some(t, e) : (A(n, function (n, i, a) { return u || (u = t.call(e, n, i, a)) ? r : void 0 }), !!u) }; j.contains = j.include = function (n, t) { return null == n ? !1 : y && n.indexOf === y ? n.indexOf(t) != -1 : k(n, function (n) { return n === t }) }, j.invoke = function (n, t) { var r = o.call(arguments, 2), e = j.isFunction(t); return j.map(n, function (n) { return (e ? t : n[t]).apply(n, r) }) }, j.pluck = function (n, t) { return j.map(n, j.property(t)) }, j.where = function (n, t) { return j.filter(n, j.matches(t)) }, j.findWhere = function (n, t) { return j.find(n, j.matches(t)) }, j.max = function (n, t, r) { if (!t && j.isArray(n) && n[0] === +n[0] && n.length < 65535) return Math.max.apply(Math, n); var e = -1 / 0, u = -1 / 0; return A(n, function (n, i, a) { var o = t ? t.call(r, n, i, a) : n; o > u && (e = n, u = o) }), e }, j.min = function (n, t, r) { if (!t && j.isArray(n) && n[0] === +n[0] && n.length < 65535) return Math.min.apply(Math, n); var e = 1 / 0, u = 1 / 0; return A(n, function (n, i, a) { var o = t ? t.call(r, n, i, a) : n; u > o && (e = n, u = o) }), e }, j.shuffle = function (n) { var t, r = 0, e = []; return A(n, function (n) { t = j.random(r++), e[r - 1] = e[t], e[t] = n }), e }, j.sample = function (n, t, r) { return null == t || r ? (n.length !== +n.length && (n = j.values(n)), n[j.random(n.length - 1)]) : j.shuffle(n).slice(0, Math.max(0, t)) }; var E = function (n) { return null == n ? j.identity : j.isFunction(n) ? n : j.property(n) }; j.sortBy = function (n, t, r) { return t = E(t), j.pluck(j.map(n, function (n, e, u) { return { value: n, index: e, criteria: t.call(r, n, e, u) } }).sort(function (n, t) { var r = n.criteria, e = t.criteria; if (r !== e) { if (r > e || r === void 0) return 1; if (e > r || e === void 0) return -1 } return n.index - t.index }), "value") }; var F = function (n) { return function (t, r, e) { var u = {}; return r = E(r), A(t, function (i, a) { var o = r.call(e, i, a, t); n(u, o, i) }), u } }; j.groupBy = F(function (n, t, r) { j.has(n, t) ? n[t].push(r) : n[t] = [r] }), j.indexBy = F(function (n, t, r) { n[t] = r }), j.countBy = F(function (n, t) { j.has(n, t) ? n[t]++ : n[t] = 1 }), j.sortedIndex = function (n, t, r, e) { r = E(r); for (var u = r.call(e, t), i = 0, a = n.length; a > i;) { var o = i + a >>> 1; r.call(e, n[o]) < u ? i = o + 1 : a = o } return i }, j.toArray = function (n) { return n ? j.isArray(n) ? o.call(n) : n.length === +n.length ? j.map(n, j.identity) : j.values(n) : [] }, j.size = function (n) { return null == n ? 0 : n.length === +n.length ? n.length : j.keys(n).length }, j.first = j.head = j.take = function (n, t, r) { return null == n ? void 0 : null == t || r ? n[0] : 0 > t ? [] : o.call(n, 0, t) }, j.initial = function (n, t, r) { return o.call(n, 0, n.length - (null == t || r ? 1 : t)) }, j.last = function (n, t, r) { return null == n ? void 0 : null == t || r ? n[n.length - 1] : o.call(n, Math.max(n.length - t, 0)) }, j.rest = j.tail = j.drop = function (n, t, r) { return o.call(n, null == t || r ? 1 : t) }, j.compact = function (n) { return j.filter(n, j.identity) }; var M = function (n, t, r) { return t && j.every(n, j.isArray) ? c.apply(r, n) : (A(n, function (n) { j.isArray(n) || j.isArguments(n) ? t ? a.apply(r, n) : M(n, t, r) : r.push(n) }), r) }; j.flatten = function (n, t) { return M(n, t, []) }, j.without = function (n) { return j.difference(n, o.call(arguments, 1)) }, j.partition = function (n, t) { var r = [], e = []; return A(n, function (n) { (t(n) ? r : e).push(n) }), [r, e] }, j.uniq = j.unique = function (n, t, r, e) { j.isFunction(t) && (e = r, r = t, t = !1); var u = r ? j.map(n, r, e) : n, i = [], a = []; return A(u, function (r, e) { (t ? e && a[a.length - 1] === r : j.contains(a, r)) || (a.push(r), i.push(n[e])) }), i }, j.union = function () { return j.uniq(j.flatten(arguments, !0)) }, j.intersection = function (n) { var t = o.call(arguments, 1); return j.filter(j.uniq(n), function (n) { return j.every(t, function (t) { return j.contains(t, n) }) }) }, j.difference = function (n) { var t = c.apply(e, o.call(arguments, 1)); return j.filter(n, function (n) { return !j.contains(t, n) }) }, j.zip = function () { for (var n = j.max(j.pluck(arguments, "length").concat(0)), t = new Array(n), r = 0; n > r; r++) t[r] = j.pluck(arguments, "" + r); return t }, j.object = function (n, t) { if (null == n) return {}; for (var r = {}, e = 0, u = n.length; u > e; e++) t ? r[n[e]] = t[e] : r[n[e][0]] = n[e][1]; return r }, j.indexOf = function (n, t, r) { if (null == n) return -1; var e = 0, u = n.length; if (r) { if ("number" != typeof r) return e = j.sortedIndex(n, t), n[e] === t ? e : -1; e = 0 > r ? Math.max(0, u + r) : r } if (y && n.indexOf === y) return n.indexOf(t, r); for (; u > e; e++) if (n[e] === t) return e; return -1 }, j.lastIndexOf = function (n, t, r) { if (null == n) return -1; var e = null != r; if (b && n.lastIndexOf === b) return e ? n.lastIndexOf(t, r) : n.lastIndexOf(t); for (var u = e ? r : n.length; u--;) if (n[u] === t) return u; return -1 }, j.range = function (n, t, r) { arguments.length <= 1 && (t = n || 0, n = 0), r = arguments[2] || 1; for (var e = Math.max(Math.ceil((t - n) / r), 0), u = 0, i = new Array(e) ; e > u;) i[u++] = n, n += r; return i }; var R = function () { }; j.bind = function (n, t) { var r, e; if (_ && n.bind === _) return _.apply(n, o.call(arguments, 1)); if (!j.isFunction(n)) throw new TypeError; return r = o.call(arguments, 2), e = function () { if (!(this instanceof e)) return n.apply(t, r.concat(o.call(arguments))); R.prototype = n.prototype; var u = new R; R.prototype = null; var i = n.apply(u, r.concat(o.call(arguments))); return Object(i) === i ? i : u } }, j.partial = function (n) { var t = o.call(arguments, 1); return function () { for (var r = 0, e = t.slice(), u = 0, i = e.length; i > u; u++) e[u] === j && (e[u] = arguments[r++]); for (; r < arguments.length;) e.push(arguments[r++]); return n.apply(this, e) } }, j.bindAll = function (n) { var t = o.call(arguments, 1); if (0 === t.length) throw new Error("bindAll must be passed function names"); return A(t, function (t) { n[t] = j.bind(n[t], n) }), n }, j.memoize = function (n, t) { var r = {}; return t || (t = j.identity), function () { var e = t.apply(this, arguments); return j.has(r, e) ? r[e] : r[e] = n.apply(this, arguments) } }, j.delay = function (n, t) { var r = o.call(arguments, 2); return setTimeout(function () { return n.apply(null, r) }, t) }, j.defer = function (n) { return j.delay.apply(j, [n, 1].concat(o.call(arguments, 1))) }, j.throttle = function (n, t, r) { var e, u, i, a = null, o = 0; r || (r = {}); var c = function () { o = r.leading === !1 ? 0 : j.now(), a = null, i = n.apply(e, u), e = u = null }; return function () { var l = j.now(); o || r.leading !== !1 || (o = l); var f = t - (l - o); return e = this, u = arguments, 0 >= f ? (clearTimeout(a), a = null, o = l, i = n.apply(e, u), e = u = null) : a || r.trailing === !1 || (a = setTimeout(c, f)), i } }, j.debounce = function (n, t, r) { var e, u, i, a, o, c = function () { var l = j.now() - a; t > l ? e = setTimeout(c, t - l) : (e = null, r || (o = n.apply(i, u), i = u = null)) }; return function () { i = this, u = arguments, a = j.now(); var l = r && !e; return e || (e = setTimeout(c, t)), l && (o = n.apply(i, u), i = u = null), o } }, j.once = function (n) { var t, r = !1; return function () { return r ? t : (r = !0, t = n.apply(this, arguments), n = null, t) } }, j.wrap = function (n, t) { return j.partial(t, n) }, j.compose = function () { var n = arguments; return function () { for (var t = arguments, r = n.length - 1; r >= 0; r--) t = [n[r].apply(this, t)]; return t[0] } }, j.after = function (n, t) { return function () { return --n < 1 ? t.apply(this, arguments) : void 0 } }, j.keys = function (n) { if (!j.isObject(n)) return []; if (w) return w(n); var t = []; for (var r in n) j.has(n, r) && t.push(r); return t }, j.values = function (n) { for (var t = j.keys(n), r = t.length, e = new Array(r), u = 0; r > u; u++) e[u] = n[t[u]]; return e }, j.pairs = function (n) { for (var t = j.keys(n), r = t.length, e = new Array(r), u = 0; r > u; u++) e[u] = [t[u], n[t[u]]]; return e }, j.invert = function (n) { for (var t = {}, r = j.keys(n), e = 0, u = r.length; u > e; e++) t[n[r[e]]] = r[e]; return t }, j.functions = j.methods = function (n) { var t = []; for (var r in n) j.isFunction(n[r]) && t.push(r); return t.sort() }, j.extend = function (n) { return A(o.call(arguments, 1), function (t) { if (t) for (var r in t) n[r] = t[r] }), n }, j.pick = function (n) { var t = {}, r = c.apply(e, o.call(arguments, 1)); return A(r, function (r) { r in n && (t[r] = n[r]) }), t }, j.omit = function (n) { var t = {}, r = c.apply(e, o.call(arguments, 1)); for (var u in n) j.contains(r, u) || (t[u] = n[u]); return t }, j.defaults = function (n) { return A(o.call(arguments, 1), function (t) { if (t) for (var r in t) n[r] === void 0 && (n[r] = t[r]) }), n }, j.clone = function (n) { return j.isObject(n) ? j.isArray(n) ? n.slice() : j.extend({}, n) : n }, j.tap = function (n, t) { return t(n), n }; var S = function (n, t, r, e) { if (n === t) return 0 !== n || 1 / n == 1 / t; if (null == n || null == t) return n === t; n instanceof j && (n = n._wrapped), t instanceof j && (t = t._wrapped); var u = l.call(n); if (u != l.call(t)) return !1; switch (u) { case "[object String]": return n == String(t); case "[object Number]": return n != +n ? t != +t : 0 == n ? 1 / n == 1 / t : n == +t; case "[object Date]": case "[object Boolean]": return +n == +t; case "[object RegExp]": return n.source == t.source && n.global == t.global && n.multiline == t.multiline && n.ignoreCase == t.ignoreCase } if ("object" != typeof n || "object" != typeof t) return !1; for (var i = r.length; i--;) if (r[i] == n) return e[i] == t; var a = n.constructor, o = t.constructor; if (a !== o && !(j.isFunction(a) && a instanceof a && j.isFunction(o) && o instanceof o) && "constructor" in n && "constructor" in t) return !1; r.push(n), e.push(t); var c = 0, f = !0; if ("[object Array]" == u) { if (c = n.length, f = c == t.length) for (; c-- && (f = S(n[c], t[c], r, e)) ;); } else { for (var s in n) if (j.has(n, s) && (c++, !(f = j.has(t, s) && S(n[s], t[s], r, e)))) break; if (f) { for (s in t) if (j.has(t, s) && !c--) break; f = !c } } return r.pop(), e.pop(), f }; j.isEqual = function (n, t) { return S(n, t, [], []) }, j.isEmpty = function (n) { if (null == n) return !0; if (j.isArray(n) || j.isString(n)) return 0 === n.length; for (var t in n) if (j.has(n, t)) return !1; return !0 }, j.isElement = function (n) { return !(!n || 1 !== n.nodeType) }, j.isArray = x || function (n) { return "[object Array]" == l.call(n) }, j.isObject = function (n) { return n === Object(n) }, A(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function (n) { j["is" + n] = function (t) { return l.call(t) == "[object " + n + "]" } }), j.isArguments(arguments) || (j.isArguments = function (n) { return !(!n || !j.has(n, "callee")) }), "function" != typeof /./ && (j.isFunction = function (n) { return "function" == typeof n }), j.isFinite = function (n) { return isFinite(n) && !isNaN(parseFloat(n)) }, j.isNaN = function (n) { return j.isNumber(n) && n != +n }, j.isBoolean = function (n) { return n === !0 || n === !1 || "[object Boolean]" == l.call(n) }, j.isNull = function (n) { return null === n }, j.isUndefined = function (n) { return n === void 0 }, j.has = function (n, t) { return f.call(n, t) }, j.noConflict = function () { return n._ = t, this }, j.identity = function (n) { return n }, j.constant = function (n) { return function () { return n } }, j.property = function (n) { return function (t) { return t[n] } }, j.matches = function (n) { return function (t) { if (t === n) return !0; for (var r in n) if (n[r] !== t[r]) return !1; return !0 } }, j.times = function (n, t, r) { for (var e = Array(Math.max(0, n)), u = 0; n > u; u++) e[u] = t.call(r, u); return e }, j.random = function (n, t) { return null == t && (t = n, n = 0), n + Math.floor(Math.random() * (t - n + 1)) }, j.now = Date.now || function () { return (new Date).getTime() }; var T = { escape: { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;" } }; T.unescape = j.invert(T.escape); var I = { escape: new RegExp("[" + j.keys(T.escape).join("") + "]", "g"), unescape: new RegExp("(" + j.keys(T.unescape).join("|") + ")", "g") }; j.each(["escape", "unescape"], function (n) { j[n] = function (t) { return null == t ? "" : ("" + t).replace(I[n], function (t) { return T[n][t] }) } }), j.result = function (n, t) { if (null == n) return void 0; var r = n[t]; return j.isFunction(r) ? r.call(n) : r }, j.mixin = function (n) { A(j.functions(n), function (t) { var r = j[t] = n[t]; j.prototype[t] = function () { var n = [this._wrapped]; return a.apply(n, arguments), z.call(this, r.apply(j, n)) } }) }; var N = 0; j.uniqueId = function (n) { var t = ++N + ""; return n ? n + t : t }, j.templateSettings = { evaluate: /<%([\s\S]+?)%>/g, interpolate: /<%=([\s\S]+?)%>/g, escape: /<%-([\s\S]+?)%>/g }; var q = /(.)^/, B = { "'": "'", "\\": "\\", "\r": "r", "\n": "n", "	": "t", "\u2028": "u2028", "\u2029": "u2029" }, D = /\\|'|\r|\n|\t|\u2028|\u2029/g; j.template = function (n, t, r) { var e; r = j.defaults({}, r, j.templateSettings); var u = new RegExp([(r.escape || q).source, (r.interpolate || q).source, (r.evaluate || q).source].join("|") + "|$", "g"), i = 0, a = "__p+='"; n.replace(u, function (t, r, e, u, o) { return a += n.slice(i, o).replace(D, function (n) { return "\\" + B[n] }), r && (a += "'+\n((__t=(" + r + "))==null?'':_.escape(__t))+\n'"), e && (a += "'+\n((__t=(" + e + "))==null?'':__t)+\n'"), u && (a += "';\n" + u + "\n__p+='"), i = o + t.length, t }), a += "';\n", r.variable || (a = "with(obj||{}){\n" + a + "}\n"), a = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + a + "return __p;\n"; try { e = new Function(r.variable || "obj", "_", a) } catch (o) { throw o.source = a, o } if (t) return e(t, j); var c = function (n) { return e.call(this, n, j) }; return c.source = "function(" + (r.variable || "obj") + "){\n" + a + "}", c }, j.chain = function (n) { return j(n).chain() }; var z = function (n) { return this._chain ? j(n).chain() : n }; j.mixin(j), A(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (n) { var t = e[n]; j.prototype[n] = function () { var r = this._wrapped; return t.apply(r, arguments), "shift" != n && "splice" != n || 0 !== r.length || delete r[0], z.call(this, r) } }), A(["concat", "join", "slice"], function (n) { var t = e[n]; j.prototype[n] = function () { return z.call(this, t.apply(this._wrapped, arguments)) } }), j.extend(j.prototype, { chain: function () { return this._chain = !0, this }, value: function () { return this._wrapped } }), "function" == typeof define && define.amd && define("underscore", [], function () { return j }) }).call(this);
//     Backbone.js 1.1.2

//     (c) 2010-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org

(function (root, factory) {

    // Set up Backbone appropriately for the environment. Start with AMD.
    if (typeof define === 'function' && define.amd) {
        define(['underscore', 'jquery', 'exports'], function (_, $, exports) {
            // Export global even in AMD case in case this script is loaded with
            // others that may still expect a global Backbone.
            root.Backbone = factory(root, exports, _, $);
        });

        // Next for Node.js or CommonJS. jQuery may not be needed as a module.
    } else if (typeof exports !== 'undefined') {
        var _ = require('underscore');
        factory(root, exports, _);

        // Finally, as a browser global.
    } else {
        root.Backbone = factory(root, {}, root._, (root.jQuery || root.Zepto || root.ender || root.$));
    }

}(this, function (root, Backbone, _, $) {

    // Initial Setup
    // -------------

    // Save the previous value of the `Backbone` variable, so that it can be
    // restored later on, if `noConflict` is used.
    var previousBackbone = root.Backbone;

    // Create local references to array methods we'll want to use later.
    var array = [];
    var push = array.push;
    var slice = array.slice;
    var splice = array.splice;

    // Current version of the library. Keep in sync with `package.json`.
    Backbone.VERSION = '1.1.2';

    // For Backbone's purposes, jQuery, Zepto, Ender, or My Library (kidding) owns
    // the `$` variable.
    Backbone.$ = $;

    // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
    // to its previous owner. Returns a reference to this Backbone object.
    Backbone.noConflict = function () {
        root.Backbone = previousBackbone;
        return this;
    };

    // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
    // will fake `"PATCH"`, `"PUT"` and `"DELETE"` requests via the `_method` parameter and
    // set a `X-Http-Method-Override` header.
    Backbone.emulateHTTP = false;

    // Turn on `emulateJSON` to support legacy servers that can't deal with direct
    // `application/json` requests ... will encode the body as
    // `application/x-www-form-urlencoded` instead and will send the model in a
    // form param named `model`.
    Backbone.emulateJSON = false;

    // Backbone.Events
    // ---------------

    // A module that can be mixed in to *any object* in order to provide it with
    // custom events. You may bind with `on` or remove with `off` callback
    // functions to an event; `trigger`-ing an event fires all callbacks in
    // succession.
    //
    //     var object = {};
    //     _.extend(object, Backbone.Events);
    //     object.on('expand', function(){ alert('expanded'); });
    //     object.trigger('expand');
    //
    var Events = Backbone.Events = {

        // Bind an event to a `callback` function. Passing `"all"` will bind
        // the callback to all events fired.
        on: function (name, callback, context) {
            if (!eventsApi(this, 'on', name, [callback, context]) || !callback) return this;
            this._events || (this._events = {});
            var events = this._events[name] || (this._events[name] = []);
            events.push({ callback: callback, context: context, ctx: context || this });
            return this;
        },

        // Bind an event to only be triggered a single time. After the first time
        // the callback is invoked, it will be removed.
        once: function (name, callback, context) {
            if (!eventsApi(this, 'once', name, [callback, context]) || !callback) return this;
            var self = this;
            var once = _.once(function () {
                self.off(name, once);
                callback.apply(this, arguments);
            });
            once._callback = callback;
            return this.on(name, once, context);
        },

        // Remove one or many callbacks. If `context` is null, removes all
        // callbacks with that function. If `callback` is null, removes all
        // callbacks for the event. If `name` is null, removes all bound
        // callbacks for all events.
        off: function (name, callback, context) {
            var retain, ev, events, names, i, l, j, k;
            if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
            if (!name && !callback && !context) {
                this._events = void 0;
                return this;
            }
            names = name ? [name] : _.keys(this._events);
            for (i = 0, l = names.length; i < l; i++) {
                name = names[i];
                if (events = this._events[name]) {
                    this._events[name] = retain = [];
                    if (callback || context) {
                        for (j = 0, k = events.length; j < k; j++) {
                            ev = events[j];
                            if ((callback && callback !== ev.callback && callback !== ev.callback._callback) ||
                                (context && context !== ev.context)) {
                                retain.push(ev);
                            }
                        }
                    }
                    if (!retain.length) delete this._events[name];
                }
            }

            return this;
        },

        // Trigger one or many events, firing all bound callbacks. Callbacks are
        // passed the same arguments as `trigger` is, apart from the event name
        // (unless you're listening on `"all"`, which will cause your callback to
        // receive the true name of the event as the first argument).
        trigger: function (name) {
            if (!this._events) return this;
            var args = slice.call(arguments, 1);
            if (!eventsApi(this, 'trigger', name, args)) return this;
            var events = this._events[name];
            var allEvents = this._events.all;
            if (events) triggerEvents(events, args);
            if (allEvents) triggerEvents(allEvents, arguments);
            return this;
        },

        // Tell this object to stop listening to either specific events ... or
        // to every object it's currently listening to.
        stopListening: function (obj, name, callback) {
            var listeningTo = this._listeningTo;
            if (!listeningTo) return this;
            var remove = !name && !callback;
            if (!callback && typeof name === 'object') callback = this;
            if (obj) (listeningTo = {})[obj._listenId] = obj;
            for (var id in listeningTo) {
                obj = listeningTo[id];
                obj.off(name, callback, this);
                if (remove || _.isEmpty(obj._events)) delete this._listeningTo[id];
            }
            return this;
        }

    };

    // Regular expression used to split event strings.
    var eventSplitter = /\s+/;

    // Implement fancy features of the Events API such as multiple event
    // names `"change blur"` and jQuery-style event maps `{change: action}`
    // in terms of the existing API.
    var eventsApi = function (obj, action, name, rest) {
        if (!name) return true;

        // Handle event maps.
        if (typeof name === 'object') {
            for (var key in name) {
                obj[action].apply(obj, [key, name[key]].concat(rest));
            }
            return false;
        }

        // Handle space separated event names.
        if (eventSplitter.test(name)) {
            var names = name.split(eventSplitter);
            for (var i = 0, l = names.length; i < l; i++) {
                obj[action].apply(obj, [names[i]].concat(rest));
            }
            return false;
        }

        return true;
    };

    // A difficult-to-believe, but optimized internal dispatch function for
    // triggering events. Tries to keep the usual cases speedy (most internal
    // Backbone events have 3 arguments).
    var triggerEvents = function (events, args) {
        var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
        switch (args.length) {
            case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
            case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
            case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
            case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
            default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args); return;
        }
    };

    var listenMethods = { listenTo: 'on', listenToOnce: 'once' };

    // Inversion-of-control versions of `on` and `once`. Tell *this* object to
    // listen to an event in another object ... keeping track of what it's
    // listening to.
    _.each(listenMethods, function (implementation, method) {
        Events[method] = function (obj, name, callback) {
            var listeningTo = this._listeningTo || (this._listeningTo = {});
            var id = obj._listenId || (obj._listenId = _.uniqueId('l'));
            listeningTo[id] = obj;
            if (!callback && typeof name === 'object') callback = this;
            obj[implementation](name, callback, this);
            return this;
        };
    });

    // Aliases for backwards compatibility.
    Events.bind = Events.on;
    Events.unbind = Events.off;

    // Allow the `Backbone` object to serve as a global event bus, for folks who
    // want global "pubsub" in a convenient place.
    _.extend(Backbone, Events);

    // Backbone.Model
    // --------------

    // Backbone **Models** are the basic data object in the framework --
    // frequently representing a row in a table in a database on your server.
    // A discrete chunk of data and a bunch of useful, related methods for
    // performing computations and transformations on that data.

    // Create a new model with the specified attributes. A client id (`cid`)
    // is automatically generated and assigned for you.
    var Model = Backbone.Model = function (attributes, options) {
        var attrs = attributes || {};
        options || (options = {});
        this.cid = _.uniqueId('c');
        this.attributes = {};
        if (options.collection) this.collection = options.collection;
        if (options.parse) attrs = this.parse(attrs, options) || {};
        attrs = _.defaults({}, attrs, _.result(this, 'defaults'));
        this.set(attrs, options);
        this.changed = {};
        this.initialize.apply(this, arguments);
    };

    // Attach all inheritable methods to the Model prototype.
    _.extend(Model.prototype, Events, {

        // A hash of attributes whose current and previous value differ.
        changed: null,

        // The value returned during the last failed validation.
        validationError: null,

        // The default name for the JSON `id` attribute is `"id"`. MongoDB and
        // CouchDB users may want to set this to `"_id"`.
        idAttribute: 'id',

        // Initialize is an empty function by default. Override it with your own
        // initialization logic.
        initialize: function () { },

        // Return a copy of the model's `attributes` object.
        toJSON: function (options) {
            return _.clone(this.attributes);
        },

        // Proxy `Backbone.sync` by default -- but override this if you need
        // custom syncing semantics for *this* particular model.
        sync: function () {
            return Backbone.sync.apply(this, arguments);
        },

        // Get the value of an attribute.
        get: function (attr) {
            return this.attributes[attr];
        },

        // Get the HTML-escaped value of an attribute.
        escape: function (attr) {
            return _.escape(this.get(attr));
        },

        // Returns `true` if the attribute contains a value that is not null
        // or undefined.
        has: function (attr) {
            return this.get(attr) != null;
        },

        // Set a hash of model attributes on the object, firing `"change"`. This is
        // the core primitive operation of a model, updating the data and notifying
        // anyone who needs to know about the change in state. The heart of the beast.
        set: function (key, val, options) {
            var attr, attrs, unset, changes, silent, changing, prev, current;
            if (key == null) return this;

            // Handle both `"key", value` and `{key: value}` -style arguments.
            if (typeof key === 'object') {
                attrs = key;
                options = val;
            } else {
                (attrs = {})[key] = val;
            }

            options || (options = {});

            // Run validation.
            if (!this._validate(attrs, options)) return false;

            // Extract attributes and options.
            unset = options.unset;
            silent = options.silent;
            changes = [];
            changing = this._changing;
            this._changing = true;

            if (!changing) {
                this._previousAttributes = _.clone(this.attributes);
                this.changed = {};
            }
            current = this.attributes, prev = this._previousAttributes;

            // Check for changes of `id`.
            if (this.idAttribute in attrs) this.id = attrs[this.idAttribute];

            // For each `set` attribute, update or delete the current value.
            for (attr in attrs) {
                val = attrs[attr];
                if (!_.isEqual(current[attr], val)) changes.push(attr);
                if (!_.isEqual(prev[attr], val)) {
                    this.changed[attr] = val;
                } else {
                    delete this.changed[attr];
                }
                unset ? delete current[attr] : current[attr] = val;
            }

            // Trigger all relevant attribute changes.
            if (!silent) {
                if (changes.length) this._pending = options;
                for (var i = 0, l = changes.length; i < l; i++) {
                    this.trigger('change:' + changes[i], this, current[changes[i]], options);
                }
            }

            // You might be wondering why there's a `while` loop here. Changes can
            // be recursively nested within `"change"` events.
            if (changing) return this;
            if (!silent) {
                while (this._pending) {
                    options = this._pending;
                    this._pending = false;
                    this.trigger('change', this, options);
                }
            }
            this._pending = false;
            this._changing = false;
            return this;
        },

        // Remove an attribute from the model, firing `"change"`. `unset` is a noop
        // if the attribute doesn't exist.
        unset: function (attr, options) {
            return this.set(attr, void 0, _.extend({}, options, { unset: true }));
        },

        // Clear all attributes on the model, firing `"change"`.
        clear: function (options) {
            var attrs = {};
            for (var key in this.attributes) attrs[key] = void 0;
            return this.set(attrs, _.extend({}, options, { unset: true }));
        },

        // Determine if the model has changed since the last `"change"` event.
        // If you specify an attribute name, determine if that attribute has changed.
        hasChanged: function (attr) {
            if (attr == null) return !_.isEmpty(this.changed);
            return _.has(this.changed, attr);
        },

        // Return an object containing all the attributes that have changed, or
        // false if there are no changed attributes. Useful for determining what
        // parts of a view need to be updated and/or what attributes need to be
        // persisted to the server. Unset attributes will be set to undefined.
        // You can also pass an attributes object to diff against the model,
        // determining if there *would be* a change.
        changedAttributes: function (diff) {
            if (!diff) return this.hasChanged() ? _.clone(this.changed) : false;
            var val, changed = false;
            var old = this._changing ? this._previousAttributes : this.attributes;
            for (var attr in diff) {
                if (_.isEqual(old[attr], (val = diff[attr]))) continue;
                (changed || (changed = {}))[attr] = val;
            }
            return changed;
        },

        // Get the previous value of an attribute, recorded at the time the last
        // `"change"` event was fired.
        previous: function (attr) {
            if (attr == null || !this._previousAttributes) return null;
            return this._previousAttributes[attr];
        },

        // Get all of the attributes of the model at the time of the previous
        // `"change"` event.
        previousAttributes: function () {
            return _.clone(this._previousAttributes);
        },

        // Fetch the model from the server. If the server's representation of the
        // model differs from its current attributes, they will be overridden,
        // triggering a `"change"` event.
        fetch: function (options) {
            options = options ? _.clone(options) : {};
            if (options.parse === void 0) options.parse = true;
            var model = this;
            var success = options.success;
            options.success = function (resp) {
                if (!model.set(model.parse(resp, options), options)) return false;
                if (success) success(model, resp, options);
                model.trigger('sync', model, resp, options);
            };
            wrapError(this, options);
            return this.sync('read', this, options);
        },

        // Set a hash of model attributes, and sync the model to the server.
        // If the server returns an attributes hash that differs, the model's
        // state will be `set` again.
        save: function (key, val, options) {
            var attrs, method, xhr, attributes = this.attributes;

            // Handle both `"key", value` and `{key: value}` -style arguments.
            if (key == null || typeof key === 'object') {
                attrs = key;
                options = val;
            } else {
                (attrs = {})[key] = val;
            }

            options = _.extend({ validate: true }, options);

            // If we're not waiting and attributes exist, save acts as
            // `set(attr).save(null, opts)` with validation. Otherwise, check if
            // the model will be valid when the attributes, if any, are set.
            if (attrs && !options.wait) {
                if (!this.set(attrs, options)) return false;
            } else {
                if (!this._validate(attrs, options)) return false;
            }

            // Set temporary attributes if `{wait: true}`.
            if (attrs && options.wait) {
                this.attributes = _.extend({}, attributes, attrs);
            }

            // After a successful server-side save, the client is (optionally)
            // updated with the server-side state.
            if (options.parse === void 0) options.parse = true;
            var model = this;
            var success = options.success;
            options.success = function (resp) {
                // Ensure attributes are restored during synchronous saves.
                model.attributes = attributes;
                var serverAttrs = model.parse(resp, options);
                if (options.wait) serverAttrs = _.extend(attrs || {}, serverAttrs);
                if (_.isObject(serverAttrs) && !model.set(serverAttrs, options)) {
                    return false;
                }
                if (success) success(model, resp, options);
                model.trigger('sync', model, resp, options);
            };
            wrapError(this, options);

            method = this.isNew() ? 'create' : (options.patch ? 'patch' : 'update');
            if (method === 'patch') options.attrs = attrs;
            xhr = this.sync(method, this, options);

            // Restore attributes.
            if (attrs && options.wait) this.attributes = attributes;

            return xhr;
        },

        // Destroy this model on the server if it was already persisted.
        // Optimistically removes the model from its collection, if it has one.
        // If `wait: true` is passed, waits for the server to respond before removal.
        destroy: function (options) {
            options = options ? _.clone(options) : {};
            var model = this;
            var success = options.success;

            var destroy = function () {
                model.trigger('destroy', model, model.collection, options);
            };

            options.success = function (resp) {
                if (options.wait || model.isNew()) destroy();
                if (success) success(model, resp, options);
                if (!model.isNew()) model.trigger('sync', model, resp, options);
            };

            if (this.isNew()) {
                options.success();
                return false;
            }
            wrapError(this, options);

            var xhr = this.sync('delete', this, options);
            if (!options.wait) destroy();
            return xhr;
        },

        // Default URL for the model's representation on the server -- if you're
        // using Backbone's restful methods, override this to change the endpoint
        // that will be called.
        url: function () {
            var base =
              _.result(this, 'urlRoot') ||
              _.result(this.collection, 'url') ||
              urlError();
            if (this.isNew()) return base;
            return base.replace(/([^\/])$/, '$1/') + encodeURIComponent(this.id);
        },

        // **parse** converts a response into the hash of attributes to be `set` on
        // the model. The default implementation is just to pass the response along.
        parse: function (resp, options) {
            return resp;
        },

        // Create a new model with identical attributes to this one.
        clone: function () {
            return new this.constructor(this.attributes);
        },

        // A model is new if it has never been saved to the server, and lacks an id.
        isNew: function () {
            return !this.has(this.idAttribute);
        },

        // Check if the model is currently in a valid state.
        isValid: function (options) {
            return this._validate({}, _.extend(options || {}, { validate: true }));
        },

        // Run validation against the next complete set of model attributes,
        // returning `true` if all is well. Otherwise, fire an `"invalid"` event.
        _validate: function (attrs, options) {
            if (!options.validate || !this.validate) return true;
            attrs = _.extend({}, this.attributes, attrs);
            var error = this.validationError = this.validate(attrs, options) || null;
            if (!error) return true;
            this.trigger('invalid', this, error, _.extend(options, { validationError: error }));
            return false;
        }

    });

    // Underscore methods that we want to implement on the Model.
    var modelMethods = ['keys', 'values', 'pairs', 'invert', 'pick', 'omit'];

    // Mix in each Underscore method as a proxy to `Model#attributes`.
    _.each(modelMethods, function (method) {
        Model.prototype[method] = function () {
            var args = slice.call(arguments);
            args.unshift(this.attributes);
            return _[method].apply(_, args);
        };
    });

    // Backbone.Collection
    // -------------------

    // If models tend to represent a single row of data, a Backbone Collection is
    // more analagous to a table full of data ... or a small slice or page of that
    // table, or a collection of rows that belong together for a particular reason
    // -- all of the messages in this particular folder, all of the documents
    // belonging to this particular author, and so on. Collections maintain
    // indexes of their models, both in order, and for lookup by `id`.

    // Create a new **Collection**, perhaps to contain a specific type of `model`.
    // If a `comparator` is specified, the Collection will maintain
    // its models in sort order, as they're added and removed.
    var Collection = Backbone.Collection = function (models, options) {
        options || (options = {});
        if (options.model) this.model = options.model;
        if (options.comparator !== void 0) this.comparator = options.comparator;
        this._reset();
        this.initialize.apply(this, arguments);
        if (models) this.reset(models, _.extend({ silent: true }, options));
    };

    // Default options for `Collection#set`.
    var setOptions = { add: true, remove: true, merge: true };
    var addOptions = { add: true, remove: false };

    // Define the Collection's inheritable methods.
    _.extend(Collection.prototype, Events, {

        // The default model for a collection is just a **Backbone.Model**.
        // This should be overridden in most cases.
        model: Model,

        // Initialize is an empty function by default. Override it with your own
        // initialization logic.
        initialize: function () { },

        // The JSON representation of a Collection is an array of the
        // models' attributes.
        toJSON: function (options) {
            return this.map(function (model) { return model.toJSON(options); });
        },

        // Proxy `Backbone.sync` by default.
        sync: function () {
            return Backbone.sync.apply(this, arguments);
        },

        // Add a model, or list of models to the set.
        add: function (models, options) {
            return this.set(models, _.extend({ merge: false }, options, addOptions));
        },

        // Remove a model, or a list of models from the set.
        remove: function (models, options) {
            var singular = !_.isArray(models);
            models = singular ? [models] : _.clone(models);
            options || (options = {});
            var i, l, index, model;
            for (i = 0, l = models.length; i < l; i++) {
                model = models[i] = this.get(models[i]);
                if (!model) continue;
                delete this._byId[model.id];
                delete this._byId[model.cid];
                index = this.indexOf(model);
                this.models.splice(index, 1);
                this.length--;
                if (!options.silent) {
                    options.index = index;
                    model.trigger('remove', model, this, options);
                }
                this._removeReference(model, options);
            }
            return singular ? models[0] : models;
        },

        // Update a collection by `set`-ing a new list of models, adding new ones,
        // removing models that are no longer present, and merging models that
        // already exist in the collection, as necessary. Similar to **Model#set**,
        // the core operation for updating the data contained by the collection.
        set: function (models, options) {
            options = _.defaults({}, options, setOptions);
            if (options.parse) models = this.parse(models, options);
            var singular = !_.isArray(models);
            models = singular ? (models ? [models] : []) : _.clone(models);
            var i, l, id, model, attrs, existing, sort;
            var at = options.at;
            var targetModel = this.model;
            var sortable = this.comparator && (at == null) && options.sort !== false;
            var sortAttr = _.isString(this.comparator) ? this.comparator : null;
            var toAdd = [], toRemove = [], modelMap = {};
            var add = options.add, merge = options.merge, remove = options.remove;
            var order = !sortable && add && remove ? [] : false;

            // Turn bare objects into model references, and prevent invalid models
            // from being added.
            for (i = 0, l = models.length; i < l; i++) {
                attrs = models[i] || {};
                if (attrs instanceof Model) {
                    id = model = attrs;
                } else {
                    id = attrs[targetModel.prototype.idAttribute || 'id'];
                }

                // If a duplicate is found, prevent it from being added and
                // optionally merge it into the existing model.
                if (existing = this.get(id)) {
                    if (remove) modelMap[existing.cid] = true;
                    if (merge) {
                        attrs = attrs === model ? model.attributes : attrs;
                        if (options.parse) attrs = existing.parse(attrs, options);
                        existing.set(attrs, options);
                        if (sortable && !sort && existing.hasChanged(sortAttr)) sort = true;
                    }
                    models[i] = existing;

                    // If this is a new, valid model, push it to the `toAdd` list.
                } else if (add) {
                    model = models[i] = this._prepareModel(attrs, options);
                    if (!model) continue;
                    toAdd.push(model);
                    this._addReference(model, options);
                }

                // Do not add multiple models with the same `id`.
                model = existing || model;
                if (order && (model.isNew() || !modelMap[model.id])) order.push(model);
                modelMap[model.id] = true;
            }

            // Remove nonexistent models if appropriate.
            if (remove) {
                for (i = 0, l = this.length; i < l; ++i) {
                    if (!modelMap[(model = this.models[i]).cid]) toRemove.push(model);
                }
                if (toRemove.length) this.remove(toRemove, options);
            }

            // See if sorting is needed, update `length` and splice in new models.
            if (toAdd.length || (order && order.length)) {
                if (sortable) sort = true;
                this.length += toAdd.length;
                if (at != null) {
                    for (i = 0, l = toAdd.length; i < l; i++) {
                        this.models.splice(at + i, 0, toAdd[i]);
                    }
                } else {
                    if (order) this.models.length = 0;
                    var orderedModels = order || toAdd;
                    for (i = 0, l = orderedModels.length; i < l; i++) {
                        this.models.push(orderedModels[i]);
                    }
                }
            }

            // Silently sort the collection if appropriate.
            if (sort) this.sort({ silent: true });

            // Unless silenced, it's time to fire all appropriate add/sort events.
            if (!options.silent) {
                for (i = 0, l = toAdd.length; i < l; i++) {
                    (model = toAdd[i]).trigger('add', model, this, options);
                }
                if (sort || (order && order.length)) this.trigger('sort', this, options);
            }

            // Return the added (or merged) model (or models).
            return singular ? models[0] : models;
        },

        // When you have more items than you want to add or remove individually,
        // you can reset the entire set with a new list of models, without firing
        // any granular `add` or `remove` events. Fires `reset` when finished.
        // Useful for bulk operations and optimizations.
        reset: function (models, options) {
            options || (options = {});
            for (var i = 0, l = this.models.length; i < l; i++) {
                this._removeReference(this.models[i], options);
            }
            options.previousModels = this.models;
            this._reset();
            models = this.add(models, _.extend({ silent: true }, options));
            if (!options.silent) this.trigger('reset', this, options);
            return models;
        },

        // Add a model to the end of the collection.
        push: function (model, options) {
            return this.add(model, _.extend({ at: this.length }, options));
        },

        // Remove a model from the end of the collection.
        pop: function (options) {
            var model = this.at(this.length - 1);
            this.remove(model, options);
            return model;
        },

        // Add a model to the beginning of the collection.
        unshift: function (model, options) {
            return this.add(model, _.extend({ at: 0 }, options));
        },

        // Remove a model from the beginning of the collection.
        shift: function (options) {
            var model = this.at(0);
            this.remove(model, options);
            return model;
        },

        // Slice out a sub-array of models from the collection.
        slice: function () {
            return slice.apply(this.models, arguments);
        },

        // Get a model from the set by id.
        get: function (obj) {
            if (obj == null) return void 0;
            return this._byId[obj] || this._byId[obj.id] || this._byId[obj.cid];
        },

        // Get the model at the given index.
        at: function (index) {
            return this.models[index];
        },

        // Return models with matching attributes. Useful for simple cases of
        // `filter`.
        where: function (attrs, first) {
            if (_.isEmpty(attrs)) return first ? void 0 : [];
            return this[first ? 'find' : 'filter'](function (model) {
                for (var key in attrs) {
                    if (attrs[key] !== model.get(key)) return false;
                }
                return true;
            });
        },

        // Return the first model with matching attributes. Useful for simple cases
        // of `find`.
        findWhere: function (attrs) {
            return this.where(attrs, true);
        },

        // Force the collection to re-sort itself. You don't need to call this under
        // normal circumstances, as the set will maintain sort order as each item
        // is added.
        sort: function (options) {
            if (!this.comparator) throw new Error('Cannot sort a set without a comparator');
            options || (options = {});

            // Run sort based on type of `comparator`.
            if (_.isString(this.comparator) || this.comparator.length === 1) {
                this.models = this.sortBy(this.comparator, this);
            } else {
                this.models.sort(_.bind(this.comparator, this));
            }

            if (!options.silent) this.trigger('sort', this, options);
            return this;
        },

        // Pluck an attribute from each model in the collection.
        pluck: function (attr) {
            return _.invoke(this.models, 'get', attr);
        },

        // Fetch the default set of models for this collection, resetting the
        // collection when they arrive. If `reset: true` is passed, the response
        // data will be passed through the `reset` method instead of `set`.
        fetch: function (options) {
            options = options ? _.clone(options) : {};
            if (options.parse === void 0) options.parse = true;
            var success = options.success;
            var collection = this;
            options.success = function (resp) {
                var method = options.reset ? 'reset' : 'set';
                collection[method](resp, options);
                if (success) success(collection, resp, options);
                collection.trigger('sync', collection, resp, options);
            };
            wrapError(this, options);
            return this.sync('read', this, options);
        },

        // Create a new instance of a model in this collection. Add the model to the
        // collection immediately, unless `wait: true` is passed, in which case we
        // wait for the server to agree.
        create: function (model, options) {
            options = options ? _.clone(options) : {};
            if (!(model = this._prepareModel(model, options))) return false;
            if (!options.wait) this.add(model, options);
            var collection = this;
            var success = options.success;
            options.success = function (model, resp) {
                if (options.wait) collection.add(model, options);
                if (success) success(model, resp, options);
            };
            model.save(null, options);
            return model;
        },

        // **parse** converts a response into a list of models to be added to the
        // collection. The default implementation is just to pass it through.
        parse: function (resp, options) {
            return resp;
        },

        // Create a new collection with an identical list of models as this one.
        clone: function () {
            return new this.constructor(this.models);
        },

        // Private method to reset all internal state. Called when the collection
        // is first initialized or reset.
        _reset: function () {
            this.length = 0;
            this.models = [];
            this._byId = {};
        },

        // Prepare a hash of attributes (or other model) to be added to this
        // collection.
        _prepareModel: function (attrs, options) {
            if (attrs instanceof Model) return attrs;
            options = options ? _.clone(options) : {};
            options.collection = this;
            var model = new this.model(attrs, options);
            if (!model.validationError) return model;
            this.trigger('invalid', this, model.validationError, options);
            return false;
        },

        // Internal method to create a model's ties to a collection.
        _addReference: function (model, options) {
            this._byId[model.cid] = model;
            if (model.id != null) this._byId[model.id] = model;
            if (!model.collection) model.collection = this;
            model.on('all', this._onModelEvent, this);
        },

        // Internal method to sever a model's ties to a collection.
        _removeReference: function (model, options) {
            if (this === model.collection) delete model.collection;
            model.off('all', this._onModelEvent, this);
        },

        // Internal method called every time a model in the set fires an event.
        // Sets need to update their indexes when models change ids. All other
        // events simply proxy through. "add" and "remove" events that originate
        // in other collections are ignored.
        _onModelEvent: function (event, model, collection, options) {
            if ((event === 'add' || event === 'remove') && collection !== this) return;
            if (event === 'destroy') this.remove(model, options);
            if (model && event === 'change:' + model.idAttribute) {
                delete this._byId[model.previous(model.idAttribute)];
                if (model.id != null) this._byId[model.id] = model;
            }
            this.trigger.apply(this, arguments);
        }

    });

    // Underscore methods that we want to implement on the Collection.
    // 90% of the core usefulness of Backbone Collections is actually implemented
    // right here:
    var methods = ['forEach', 'each', 'map', 'collect', 'reduce', 'foldl',
      'inject', 'reduceRight', 'foldr', 'find', 'detect', 'filter', 'select',
      'reject', 'every', 'all', 'some', 'any', 'include', 'contains', 'invoke',
      'max', 'min', 'toArray', 'size', 'first', 'head', 'take', 'initial', 'rest',
      'tail', 'drop', 'last', 'without', 'difference', 'indexOf', 'shuffle',
      'lastIndexOf', 'isEmpty', 'chain', 'sample'];

    // Mix in each Underscore method as a proxy to `Collection#models`.
    _.each(methods, function (method) {
        Collection.prototype[method] = function () {
            var args = slice.call(arguments);
            args.unshift(this.models);
            return _[method].apply(_, args);
        };
    });

    // Underscore methods that take a property name as an argument.
    var attributeMethods = ['groupBy', 'countBy', 'sortBy', 'indexBy'];

    // Use attributes instead of properties.
    _.each(attributeMethods, function (method) {
        Collection.prototype[method] = function (value, context) {
            var iterator = _.isFunction(value) ? value : function (model) {
                return model.get(value);
            };
            return _[method](this.models, iterator, context);
        };
    });

    // Backbone.View
    // -------------

    // Backbone Views are almost more convention than they are actual code. A View
    // is simply a JavaScript object that represents a logical chunk of UI in the
    // DOM. This might be a single item, an entire list, a sidebar or panel, or
    // even the surrounding frame which wraps your whole app. Defining a chunk of
    // UI as a **View** allows you to define your DOM events declaratively, without
    // having to worry about render order ... and makes it easy for the view to
    // react to specific changes in the state of your models.

    // Creating a Backbone.View creates its initial element outside of the DOM,
    // if an existing element is not provided...
    var View = Backbone.View = function (options) {
        this.cid = _.uniqueId('view');
        options || (options = {});
        _.extend(this, _.pick(options, viewOptions));
        this._ensureElement();
        this.initialize.apply(this, arguments);
        this.delegateEvents();
    };

    // Cached regex to split keys for `delegate`.
    var delegateEventSplitter = /^(\S+)\s*(.*)$/;

    // List of view options to be merged as properties.
    var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];

    // Set up all inheritable **Backbone.View** properties and methods.
    _.extend(View.prototype, Events, {

        // The default `tagName` of a View's element is `"div"`.
        tagName: 'div',

        // jQuery delegate for element lookup, scoped to DOM elements within the
        // current view. This should be preferred to global lookups where possible.
        $: function (selector) {
            return this.$el.find(selector);
        },

        // Initialize is an empty function by default. Override it with your own
        // initialization logic.
        initialize: function () { },

        // **render** is the core function that your view should override, in order
        // to populate its element (`this.el`), with the appropriate HTML. The
        // convention is for **render** to always return `this`.
        render: function () {
            return this;
        },

        // Remove this view by taking the element out of the DOM, and removing any
        // applicable Backbone.Events listeners.
        remove: function () {
            this.$el.remove();
            this.stopListening();
            return this;
        },

        // Change the view's element (`this.el` property), including event
        // re-delegation.
        setElement: function (element, delegate) {
            if (this.$el) this.undelegateEvents();
            this.$el = element instanceof Backbone.$ ? element : Backbone.$(element);
            this.el = this.$el[0];
            if (delegate !== false) this.delegateEvents();
            return this;
        },

        // Set callbacks, where `this.events` is a hash of
        //
        // *{"event selector": "callback"}*
        //
        //     {
        //       'mousedown .title':  'edit',
        //       'click .button':     'save',
        //       'click .open':       function(e) { ... }
        //     }
        //
        // pairs. Callbacks will be bound to the view, with `this` set properly.
        // Uses event delegation for efficiency.
        // Omitting the selector binds the event to `this.el`.
        // This only works for delegate-able events: not `focus`, `blur`, and
        // not `change`, `submit`, and `reset` in Internet Explorer.
        delegateEvents: function (events) {
            if (!(events || (events = _.result(this, 'events')))) return this;
            this.undelegateEvents();
            for (var key in events) {
                var method = events[key];
                if (!_.isFunction(method)) method = this[events[key]];
                if (!method) continue;

                var match = key.match(delegateEventSplitter);
                var eventName = match[1], selector = match[2];
                method = _.bind(method, this);
                eventName += '.delegateEvents' + this.cid;
                if (selector === '') {
                    this.$el.on(eventName, method);
                } else {
                    this.$el.on(eventName, selector, method);
                }
            }
            return this;
        },

        // Clears all callbacks previously bound to the view with `delegateEvents`.
        // You usually don't need to use this, but may wish to if you have multiple
        // Backbone views attached to the same DOM element.
        undelegateEvents: function () {
            this.$el.off('.delegateEvents' + this.cid);
            return this;
        },

        // Ensure that the View has a DOM element to render into.
        // If `this.el` is a string, pass it through `$()`, take the first
        // matching element, and re-assign it to `el`. Otherwise, create
        // an element from the `id`, `className` and `tagName` properties.
        _ensureElement: function () {
            if (!this.el) {
                var attrs = _.extend({}, _.result(this, 'attributes'));
                if (this.id) attrs.id = _.result(this, 'id');
                if (this.className) attrs['class'] = _.result(this, 'className');
                var $el = Backbone.$('<' + _.result(this, 'tagName') + '>').attr(attrs);
                this.setElement($el, false);
            } else {
                this.setElement(_.result(this, 'el'), false);
            }
        }

    });

    // Backbone.sync
    // -------------

    // Override this function to change the manner in which Backbone persists
    // models to the server. You will be passed the type of request, and the
    // model in question. By default, makes a RESTful Ajax request
    // to the model's `url()`. Some possible customizations could be:
    //
    // * Use `setTimeout` to batch rapid-fire updates into a single request.
    // * Send up the models as XML instead of JSON.
    // * Persist models via WebSockets instead of Ajax.
    //
    // Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
    // as `POST`, with a `_method` parameter containing the true HTTP method,
    // as well as all requests with the body as `application/x-www-form-urlencoded`
    // instead of `application/json` with the model in a param named `model`.
    // Useful when interfacing with server-side languages like **PHP** that make
    // it difficult to read the body of `PUT` requests.
    Backbone.sync = function (method, model, options) {
        var type = methodMap[method];

        // Default options, unless specified.
        _.defaults(options || (options = {}), {
            emulateHTTP: Backbone.emulateHTTP,
            emulateJSON: Backbone.emulateJSON
        });

        // Default JSON-request options.
        var params = { type: type, dataType: 'json' };

        // Ensure that we have a URL.
        if (!options.url) {
            params.url = _.result(model, 'url') || urlError();
        }

        // Ensure that we have the appropriate request data.
        if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
            params.contentType = 'application/json';
            params.data = JSON.stringify(options.attrs || model.toJSON(options));
        }

        // For older servers, emulate JSON by encoding the request into an HTML-form.
        if (options.emulateJSON) {
            params.contentType = 'application/x-www-form-urlencoded';
            params.data = params.data ? { model: params.data } : {};
        }

        // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
        // And an `X-HTTP-Method-Override` header.
        if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
            params.type = 'POST';
            if (options.emulateJSON) params.data._method = type;
            var beforeSend = options.beforeSend;
            options.beforeSend = function (xhr) {
                xhr.setRequestHeader('X-HTTP-Method-Override', type);
                if (beforeSend) return beforeSend.apply(this, arguments);
            };
        }

        // Don't process data on a non-GET request.
        if (params.type !== 'GET' && !options.emulateJSON) {
            params.processData = false;
        }

        // If we're sending a `PATCH` request, and we're in an old Internet Explorer
        // that still has ActiveX enabled by default, override jQuery to use that
        // for XHR instead. Remove this line when jQuery supports `PATCH` on IE8.
        if (params.type === 'PATCH' && noXhrPatch) {
            params.xhr = function () {
                return new ActiveXObject("Microsoft.XMLHTTP");
            };
        }

        // Make the request, allowing the user to override any Ajax options.
        var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
        model.trigger('request', model, xhr, options);
        return xhr;
    };

    var noXhrPatch =
      typeof window !== 'undefined' && !!window.ActiveXObject &&
        !(window.XMLHttpRequest && (new XMLHttpRequest).dispatchEvent);

    // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
    var methodMap = {
        'create': 'POST',
        'update': 'PUT',
        'patch': 'PATCH',
        'delete': 'DELETE',
        'read': 'GET'
    };

    // Set the default implementation of `Backbone.ajax` to proxy through to `$`.
    // Override this if you'd like to use a different library.
    Backbone.ajax = function () {
        return Backbone.$.ajax.apply(Backbone.$, arguments);
    };

    // Backbone.Router
    // ---------------

    // Routers map faux-URLs to actions, and fire events when routes are
    // matched. Creating a new one sets its `routes` hash, if not set statically.
    var Router = Backbone.Router = function (options) {
        options || (options = {});
        if (options.routes) this.routes = options.routes;
        this._bindRoutes();
        this.initialize.apply(this, arguments);
    };

    // Cached regular expressions for matching named param parts and splatted
    // parts of route strings.
    var optionalParam = /\((.*?)\)/g;
    var namedParam = /(\(\?)?:\w+/g;
    var splatParam = /\*\w+/g;
    var escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;

    // Set up all inheritable **Backbone.Router** properties and methods.
    _.extend(Router.prototype, Events, {

        // Initialize is an empty function by default. Override it with your own
        // initialization logic.
        initialize: function () { },

        // Manually bind a single named route to a callback. For example:
        //
        //     this.route('search/:query/p:num', 'search', function(query, num) {
        //       ...
        //     });
        //
        route: function (route, name, callback) {
            if (!_.isRegExp(route)) route = this._routeToRegExp(route);
            if (_.isFunction(name)) {
                callback = name;
                name = '';
            }
            if (!callback) callback = this[name];
            var router = this;
            Backbone.history.route(route, function (fragment) {
                var args = router._extractParameters(route, fragment);
                router.execute(callback, args);
                router.trigger.apply(router, ['route:' + name].concat(args));
                router.trigger('route', name, args);
                Backbone.history.trigger('route', router, name, args);
            });
            return this;
        },

        // Execute a route handler with the provided parameters.  This is an
        // excellent place to do pre-route setup or post-route cleanup.
        execute: function (callback, args) {
            if (callback) callback.apply(this, args);
        },

        // Simple proxy to `Backbone.history` to save a fragment into the history.
        navigate: function (fragment, options) {
            Backbone.history.navigate(fragment, options);
            return this;
        },

        // Bind all defined routes to `Backbone.history`. We have to reverse the
        // order of the routes here to support behavior where the most general
        // routes can be defined at the bottom of the route map.
        _bindRoutes: function () {
            if (!this.routes) return;
            this.routes = _.result(this, 'routes');
            var route, routes = _.keys(this.routes);
            while ((route = routes.pop()) != null) {
                this.route(route, this.routes[route]);
            }
        },

        // Convert a route string into a regular expression, suitable for matching
        // against the current location hash.
        _routeToRegExp: function (route) {
            route = route.replace(escapeRegExp, '\\$&')
                         .replace(optionalParam, '(?:$1)?')
                         .replace(namedParam, function (match, optional) {
                             return optional ? match : '([^/?]+)';
                         })
                         .replace(splatParam, '([^?]*?)');
            return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
        },

        // Given a route, and a URL fragment that it matches, return the array of
        // extracted decoded parameters. Empty or unmatched parameters will be
        // treated as `null` to normalize cross-browser behavior.
        _extractParameters: function (route, fragment) {
            var params = route.exec(fragment).slice(1);
            return _.map(params, function (param, i) {
                // Don't decode the search params.
                if (i === params.length - 1) return param || null;
                return param ? decodeURIComponent(param) : null;
            });
        }

    });

    // Backbone.History
    // ----------------

    // Handles cross-browser history management, based on either
    // [pushState](http://diveintohtml5.info/history.html) and real URLs, or
    // [onhashchange](https://developer.mozilla.org/en-US/docs/DOM/window.onhashchange)
    // and URL fragments. If the browser supports neither (old IE, natch),
    // falls back to polling.
    var History = Backbone.History = function () {
        this.handlers = [];
        _.bindAll(this, 'checkUrl');

        // Ensure that `History` can be used outside of the browser.
        if (typeof window !== 'undefined') {
            this.location = window.location;
            this.history = window.history;
        }
    };

    // Cached regex for stripping a leading hash/slash and trailing space.
    var routeStripper = /^[#\/]|\s+$/g;

    // Cached regex for stripping leading and trailing slashes.
    var rootStripper = /^\/+|\/+$/g;

    // Cached regex for detecting MSIE.
    var isExplorer = /msie [\w.]+/;

    // Cached regex for removing a trailing slash.
    var trailingSlash = /\/$/;

    // Cached regex for stripping urls of hash.
    var pathStripper = /#.*$/;

    // Has the history handling already been started?
    History.started = false;

    // Set up all inheritable **Backbone.History** properties and methods.
    _.extend(History.prototype, Events, {

        // The default interval to poll for hash changes, if necessary, is
        // twenty times a second.
        interval: 50,

        // Are we at the app root?
        atRoot: function () {
            return this.location.pathname.replace(/[^\/]$/, '$&/') === this.root;
        },

        // Gets the true hash value. Cannot use location.hash directly due to bug
        // in Firefox where location.hash will always be decoded.
        getHash: function (window) {
            var match = (window || this).location.href.match(/#(.*)$/);
            return match ? match[1] : '';
        },

        // Get the cross-browser normalized URL fragment, either from the URL,
        // the hash, or the override.
        getFragment: function (fragment, forcePushState) {
            if (fragment == null) {
                if (this._hasPushState || !this._wantsHashChange || forcePushState) {
                    fragment = decodeURI(this.location.pathname + this.location.search);
                    var root = this.root.replace(trailingSlash, '');
                    if (!fragment.indexOf(root)) fragment = fragment.slice(root.length);
                } else {
                    fragment = this.getHash();
                }
            }
            return fragment.replace(routeStripper, '');
        },

        // Start the hash change handling, returning `true` if the current URL matches
        // an existing route, and `false` otherwise.
        start: function (options) {
            if (History.started) throw new Error("Backbone.history has already been started");
            History.started = true;

            // Figure out the initial configuration. Do we need an iframe?
            // Is pushState desired ... is it available?
            this.options = _.extend({ root: '/' }, this.options, options);
            this.root = this.options.root;
            this._wantsHashChange = this.options.hashChange !== false;
            this._wantsPushState = !!this.options.pushState;
            this._hasPushState = !!(this.options.pushState && this.history && this.history.pushState);
            var fragment = this.getFragment();
            var docMode = document.documentMode;
            var oldIE = (isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7));

            // Normalize root to always include a leading and trailing slash.
            this.root = ('/' + this.root + '/').replace(rootStripper, '/');

            if (oldIE && this._wantsHashChange) {
                var frame = Backbone.$('<iframe src="javascript:0" tabindex="-1">');
                this.iframe = frame.hide().appendTo('body')[0].contentWindow;
                this.navigate(fragment);
            }

            // Depending on whether we're using pushState or hashes, and whether
            // 'onhashchange' is supported, determine how we check the URL state.
            if (this._hasPushState) {
                Backbone.$(window).on('popstate', this.checkUrl);
            } else if (this._wantsHashChange && ('onhashchange' in window) && !oldIE) {
                Backbone.$(window).on('hashchange', this.checkUrl);
            } else if (this._wantsHashChange) {
                this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
            }

            // Determine if we need to change the base url, for a pushState link
            // opened by a non-pushState browser.
            this.fragment = fragment;
            var loc = this.location;

            // Transition from hashChange to pushState or vice versa if both are
            // requested.
            if (this._wantsHashChange && this._wantsPushState) {

                // If we've started off with a route from a `pushState`-enabled
                // browser, but we're currently in a browser that doesn't support it...
                if (!this._hasPushState && !this.atRoot()) {
                    this.fragment = this.getFragment(null, true);
                    this.location.replace(this.root + '#' + this.fragment);
                    // Return immediately as browser will do redirect to new url
                    return true;

                    // Or if we've started out with a hash-based route, but we're currently
                    // in a browser where it could be `pushState`-based instead...
                } else if (this._hasPushState && this.atRoot() && loc.hash) {
                    this.fragment = this.getHash().replace(routeStripper, '');
                    this.history.replaceState({}, document.title, this.root + this.fragment);
                }

            }

            if (!this.options.silent) return this.loadUrl();
        },

        // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
        // but possibly useful for unit testing Routers.
        stop: function () {
            Backbone.$(window).off('popstate', this.checkUrl).off('hashchange', this.checkUrl);
            if (this._checkUrlInterval) clearInterval(this._checkUrlInterval);
            History.started = false;
        },

        // Add a route to be tested when the fragment changes. Routes added later
        // may override previous routes.
        route: function (route, callback) {
            this.handlers.unshift({ route: route, callback: callback });
        },

        // Checks the current URL to see if it has changed, and if it has,
        // calls `loadUrl`, normalizing across the hidden iframe.
        checkUrl: function (e) {
            var current = this.getFragment();
            if (current === this.fragment && this.iframe) {
                current = this.getFragment(this.getHash(this.iframe));
            }
            if (current === this.fragment) return false;
            if (this.iframe) this.navigate(current);
            this.loadUrl();
        },

        // Attempt to load the current URL fragment. If a route succeeds with a
        // match, returns `true`. If no defined routes matches the fragment,
        // returns `false`.
        loadUrl: function (fragment) {
            fragment = this.fragment = this.getFragment(fragment);
            return _.any(this.handlers, function (handler) {
                if (handler.route.test(fragment)) {
                    handler.callback(fragment);
                    return true;
                }
            });
        },

        // Save a fragment into the hash history, or replace the URL state if the
        // 'replace' option is passed. You are responsible for properly URL-encoding
        // the fragment in advance.
        //
        // The options object can contain `trigger: true` if you wish to have the
        // route callback be fired (not usually desirable), or `replace: true`, if
        // you wish to modify the current URL without adding an entry to the history.
        navigate: function (fragment, options) {
            if (!History.started) return false;
            if (!options || options === true) options = { trigger: !!options };

            var url = this.root + (fragment = this.getFragment(fragment || ''));

            // Strip the hash for matching.
            fragment = fragment.replace(pathStripper, '');

            if (this.fragment === fragment) return;
            this.fragment = fragment;

            // Don't include a trailing slash on the root.
            if (fragment === '' && url !== '/') url = url.slice(0, -1);

            // If pushState is available, we use it to set the fragment as a real URL.
            if (this._hasPushState) {
                this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);

                // If hash changes haven't been explicitly disabled, update the hash
                // fragment to store history.
            } else if (this._wantsHashChange) {
                this._updateHash(this.location, fragment, options.replace);
                if (this.iframe && (fragment !== this.getFragment(this.getHash(this.iframe)))) {
                    // Opening and closing the iframe tricks IE7 and earlier to push a
                    // history entry on hash-tag change.  When replace is true, we don't
                    // want this.
                    if (!options.replace) this.iframe.document.open().close();
                    this._updateHash(this.iframe.location, fragment, options.replace);
                }

                // If you've told us that you explicitly don't want fallback hashchange-
                // based history, then `navigate` becomes a page refresh.
            } else {
                return this.location.assign(url);
            }
            if (options.trigger) return this.loadUrl(fragment);
        },

        // Update the hash location, either replacing the current entry, or adding
        // a new one to the browser history.
        _updateHash: function (location, fragment, replace) {
            if (replace) {
                var href = location.href.replace(/(javascript:|#).*$/, '');
                location.replace(href + '#' + fragment);
            } else {
                // Some browsers require that `hash` contains a leading #.
                location.hash = '#' + fragment;
            }
        }

    });

    // Create the default Backbone.history.
    Backbone.history = new History;

    // Helpers
    // -------

    // Helper function to correctly set up the prototype chain, for subclasses.
    // Similar to `goog.inherits`, but uses a hash of prototype properties and
    // class properties to be extended.
    var extend = function (protoProps, staticProps) {
        var parent = this;
        var child;

        // The constructor function for the new subclass is either defined by you
        // (the "constructor" property in your `extend` definition), or defaulted
        // by us to simply call the parent's constructor.
        if (protoProps && _.has(protoProps, 'constructor')) {
            child = protoProps.constructor;
        } else {
            child = function () { return parent.apply(this, arguments); };
        }

        // Add static properties to the constructor function, if supplied.
        _.extend(child, parent, staticProps);

        // Set the prototype chain to inherit from `parent`, without calling
        // `parent`'s constructor function.
        var Surrogate = function () { this.constructor = child; };
        Surrogate.prototype = parent.prototype;
        child.prototype = new Surrogate;

        // Add prototype properties (instance properties) to the subclass,
        // if supplied.
        if (protoProps) _.extend(child.prototype, protoProps);

        // Set a convenience property in case the parent's prototype is needed
        // later.
        child.__super__ = parent.prototype;

        return child;
    };

    // Set up inheritance for the model, collection, router, view and history.
    Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;

    // Throw an error when a URL is needed, and none is supplied.
    var urlError = function () {
        throw new Error('A "url" property or function must be specified');
    };

    // Wrap an optional error callback with a fallback error event.
    var wrapError = function (model, options) {
        var error = options.error;
        options.error = function (resp) {
            if (error) error(model, resp, options);
            model.trigger('error', model, resp, options);
        };
    };

    return Backbone;

}));
/*!

 handlebars v1.3.0

Copyright (C) 2011 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

@license
*/
/* exported Handlebars */
var Handlebars = (function () {
    // handlebars/safe-string.js
    var __module4__ = (function () {
        "use strict";
        var __exports__;
        // Build out our basic SafeString type
        function SafeString(string) {
            this.string = string;
        }

        SafeString.prototype.toString = function () {
            return "" + this.string;
        };

        __exports__ = SafeString;
        return __exports__;
    })();

    // handlebars/utils.js
    var __module3__ = (function (__dependency1__) {
        "use strict";
        var __exports__ = {};
        /*jshint -W004 */
        var SafeString = __dependency1__;

        var escape = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "`": "&#x60;"
        };

        var badChars = /[&<>"'`]/g;
        var possible = /[&<>"'`]/;

        function escapeChar(chr) {
            return escape[chr] || "&amp;";
        }

        function extend(obj, value) {
            for (var key in value) {
                if (Object.prototype.hasOwnProperty.call(value, key)) {
                    obj[key] = value[key];
                }
            }
        }

        __exports__.extend = extend; var toString = Object.prototype.toString;
        __exports__.toString = toString;
        // Sourced from lodash
        // https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
        var isFunction = function (value) {
            return typeof value === 'function';
        };
        // fallback for older versions of Chrome and Safari
        if (isFunction(/x/)) {
            isFunction = function (value) {
                return typeof value === 'function' && toString.call(value) === '[object Function]';
            };
        }
        var isFunction;
        __exports__.isFunction = isFunction;
        var isArray = Array.isArray || function (value) {
            return (value && typeof value === 'object') ? toString.call(value) === '[object Array]' : false;
        };
        __exports__.isArray = isArray;

        function escapeExpression(string) {
            // don't escape SafeStrings, since they're already safe
            if (string instanceof SafeString) {
                return string.toString();
            } else if (!string && string !== 0) {
                return "";
            }

            // Force a string conversion as this will be done by the append regardless and
            // the regex test will do this transparently behind the scenes, causing issues if
            // an object's to string has escaped characters in it.
            string = "" + string;

            if (!possible.test(string)) { return string; }
            return string.replace(badChars, escapeChar);
        }

        __exports__.escapeExpression = escapeExpression; function isEmpty(value) {
            if (!value && value !== 0) {
                return true;
            } else if (isArray(value) && value.length === 0) {
                return true;
            } else {
                return false;
            }
        }

        __exports__.isEmpty = isEmpty;
        return __exports__;
    })(__module4__);

    // handlebars/exception.js
    var __module5__ = (function () {
        "use strict";
        var __exports__;

        var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

        function Exception(message, node) {
            var line;
            if (node && node.firstLine) {
                line = node.firstLine;

                message += ' - ' + line + ':' + node.firstColumn;
            }

            var tmp = Error.prototype.constructor.call(this, message);

            // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
            for (var idx = 0; idx < errorProps.length; idx++) {
                this[errorProps[idx]] = tmp[errorProps[idx]];
            }

            if (line) {
                this.lineNumber = line;
                this.column = node.firstColumn;
            }
        }

        Exception.prototype = new Error();

        __exports__ = Exception;
        return __exports__;
    })();

    // handlebars/base.js
    var __module2__ = (function (__dependency1__, __dependency2__) {
        "use strict";
        var __exports__ = {};
        var Utils = __dependency1__;
        var Exception = __dependency2__;

        var VERSION = "1.3.0";
        __exports__.VERSION = VERSION; var COMPILER_REVISION = 4;
        __exports__.COMPILER_REVISION = COMPILER_REVISION;
        var REVISION_CHANGES = {
            1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
            2: '== 1.0.0-rc.3',
            3: '== 1.0.0-rc.4',
            4: '>= 1.0.0'
        };
        __exports__.REVISION_CHANGES = REVISION_CHANGES;
        var isArray = Utils.isArray,
            isFunction = Utils.isFunction,
            toString = Utils.toString,
            objectType = '[object Object]';

        function HandlebarsEnvironment(helpers, partials) {
            this.helpers = helpers || {};
            this.partials = partials || {};

            registerDefaultHelpers(this);
        }

        __exports__.HandlebarsEnvironment = HandlebarsEnvironment; HandlebarsEnvironment.prototype = {
            constructor: HandlebarsEnvironment,

            logger: logger,
            log: log,

            registerHelper: function (name, fn, inverse) {
                if (toString.call(name) === objectType) {
                    if (inverse || fn) { throw new Exception('Arg not supported with multiple helpers'); }
                    Utils.extend(this.helpers, name);
                } else {
                    if (inverse) { fn.not = inverse; }
                    this.helpers[name] = fn;
                }
            },

            registerPartial: function (name, str) {
                if (toString.call(name) === objectType) {
                    Utils.extend(this.partials, name);
                } else {
                    this.partials[name] = str;
                }
            }
        };

        function registerDefaultHelpers(instance) {
            instance.registerHelper('helperMissing', function (arg) {
                if (arguments.length === 2) {
                    return undefined;
                } else {
                    throw new Exception("Missing helper: '" + arg + "'");
                }
            });

            instance.registerHelper('blockHelperMissing', function (context, options) {
                var inverse = options.inverse || function () { }, fn = options.fn;

                if (isFunction(context)) { context = context.call(this); }

                if (context === true) {
                    return fn(this);
                } else if (context === false || context == null) {
                    return inverse(this);
                } else if (isArray(context)) {
                    if (context.length > 0) {
                        return instance.helpers.each(context, options);
                    } else {
                        return inverse(this);
                    }
                } else {
                    return fn(context);
                }
            });

            instance.registerHelper('each', function (context, options) {
                var fn = options.fn, inverse = options.inverse;
                var i = 0, ret = "", data;

                if (isFunction(context)) { context = context.call(this); }

                if (options.data) {
                    data = createFrame(options.data);
                }

                if (context && typeof context === 'object') {
                    if (isArray(context)) {
                        for (var j = context.length; i < j; i++) {
                            if (data) {
                                data.index = i;
                                data.first = (i === 0);
                                data.last = (i === (context.length - 1));
                            }
                            ret = ret + fn(context[i], { data: data });
                        }
                    } else {
                        for (var key in context) {
                            if (context.hasOwnProperty(key)) {
                                if (data) {
                                    data.key = key;
                                    data.index = i;
                                    data.first = (i === 0);
                                }
                                ret = ret + fn(context[key], { data: data });
                                i++;
                            }
                        }
                    }
                }

                if (i === 0) {
                    ret = inverse(this);
                }

                return ret;
            });

            instance.registerHelper('if', function (conditional, options) {
                if (isFunction(conditional)) { conditional = conditional.call(this); }

                // Default behavior is to render the positive path if the value is truthy and not empty.
                // The `includeZero` option may be set to treat the condtional as purely not empty based on the
                // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
                if ((!options.hash.includeZero && !conditional) || Utils.isEmpty(conditional)) {
                    return options.inverse(this);
                } else {
                    return options.fn(this);
                }
            });

            instance.registerHelper('unless', function (conditional, options) {
                return instance.helpers['if'].call(this, conditional, { fn: options.inverse, inverse: options.fn, hash: options.hash });
            });

            instance.registerHelper('with', function (context, options) {
                if (isFunction(context)) { context = context.call(this); }

                if (!Utils.isEmpty(context)) return options.fn(context);
            });

            instance.registerHelper('log', function (context, options) {
                var level = options.data && options.data.level != null ? parseInt(options.data.level, 10) : 1;
                instance.log(level, context);
            });
        }

        var logger = {
            methodMap: { 0: 'debug', 1: 'info', 2: 'warn', 3: 'error' },

            // State enum
            DEBUG: 0,
            INFO: 1,
            WARN: 2,
            ERROR: 3,
            level: 3,

            // can be overridden in the host environment
            log: function (level, obj) {
                if (logger.level <= level) {
                    var method = logger.methodMap[level];
                    if (typeof console !== 'undefined' && console[method]) {
                        console[method].call(console, obj);
                    }
                }
            }
        };
        __exports__.logger = logger;
        function log(level, obj) { logger.log(level, obj); }

        __exports__.log = log; var createFrame = function (object) {
            var obj = {};
            Utils.extend(obj, object);
            return obj;
        };
        __exports__.createFrame = createFrame;
        return __exports__;
    })(__module3__, __module5__);

    // handlebars/runtime.js
    var __module6__ = (function (__dependency1__, __dependency2__, __dependency3__) {
        "use strict";
        var __exports__ = {};
        var Utils = __dependency1__;
        var Exception = __dependency2__;
        var COMPILER_REVISION = __dependency3__.COMPILER_REVISION;
        var REVISION_CHANGES = __dependency3__.REVISION_CHANGES;

        function checkRevision(compilerInfo) {
            var compilerRevision = compilerInfo && compilerInfo[0] || 1,
                currentRevision = COMPILER_REVISION;

            if (compilerRevision !== currentRevision) {
                if (compilerRevision < currentRevision) {
                    var runtimeVersions = REVISION_CHANGES[currentRevision],
                        compilerVersions = REVISION_CHANGES[compilerRevision];
                    throw new Exception("Template was precompiled with an older version of Handlebars than the current runtime. " +
                          "Please update your precompiler to a newer version (" + runtimeVersions + ") or downgrade your runtime to an older version (" + compilerVersions + ").");
                } else {
                    // Use the embedded version info since the runtime doesn't know about this revision yet
                    throw new Exception("Template was precompiled with a newer version of Handlebars than the current runtime. " +
                          "Please update your runtime to a newer version (" + compilerInfo[1] + ").");
                }
            }
        }

        __exports__.checkRevision = checkRevision;// TODO: Remove this line and break up compilePartial

        function template(templateSpec, env) {
            if (!env) {
                throw new Exception("No environment passed to template");
            }

            // Note: Using env.VM references rather than local var references throughout this section to allow
            // for external users to override these as psuedo-supported APIs.
            var invokePartialWrapper = function (partial, name, context, helpers, partials, data) {
                var result = env.VM.invokePartial.apply(this, arguments);
                if (result != null) { return result; }

                if (env.compile) {
                    var options = { helpers: helpers, partials: partials, data: data };
                    partials[name] = env.compile(partial, { data: data !== undefined }, env);
                    return partials[name](context, options);
                } else {
                    throw new Exception("The partial " + name + " could not be compiled when running in runtime-only mode");
                }
            };

            // Just add water
            var container = {
                escapeExpression: Utils.escapeExpression,
                invokePartial: invokePartialWrapper,
                programs: [],
                program: function (i, fn, data) {
                    var programWrapper = this.programs[i];
                    if (data) {
                        programWrapper = program(i, fn, data);
                    } else if (!programWrapper) {
                        programWrapper = this.programs[i] = program(i, fn);
                    }
                    return programWrapper;
                },
                merge: function (param, common) {
                    var ret = param || common;

                    if (param && common && (param !== common)) {
                        ret = {};
                        Utils.extend(ret, common);
                        Utils.extend(ret, param);
                    }
                    return ret;
                },
                programWithDepth: env.VM.programWithDepth,
                noop: env.VM.noop,
                compilerInfo: null
            };

            return function (context, options) {
                options = options || {};
                var namespace = options.partial ? options : env,
                    helpers,
                    partials;

                if (!options.partial) {
                    helpers = options.helpers;
                    partials = options.partials;
                }
                var result = templateSpec.call(
                      container,
                      namespace, context,
                      helpers,
                      partials,
                      options.data);

                if (!options.partial) {
                    env.VM.checkRevision(container.compilerInfo);
                }

                return result;
            };
        }

        __exports__.template = template; function programWithDepth(i, fn, data /*, $depth */) {
            var args = Array.prototype.slice.call(arguments, 3);

            var prog = function (context, options) {
                options = options || {};

                return fn.apply(this, [context, options.data || data].concat(args));
            };
            prog.program = i;
            prog.depth = args.length;
            return prog;
        }

        __exports__.programWithDepth = programWithDepth; function program(i, fn, data) {
            var prog = function (context, options) {
                options = options || {};

                return fn(context, options.data || data);
            };
            prog.program = i;
            prog.depth = 0;
            return prog;
        }

        __exports__.program = program; function invokePartial(partial, name, context, helpers, partials, data) {
            var options = { partial: true, helpers: helpers, partials: partials, data: data };

            if (partial === undefined) {
                throw new Exception("The partial " + name + " could not be found");
            } else if (partial instanceof Function) {
                return partial(context, options);
            }
        }

        __exports__.invokePartial = invokePartial; function noop() { return ""; }

        __exports__.noop = noop;
        return __exports__;
    })(__module3__, __module5__, __module2__);

    // handlebars.runtime.js
    var __module1__ = (function (__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__) {
        "use strict";
        var __exports__;
        /*globals Handlebars: true */
        var base = __dependency1__;

        // Each of these augment the Handlebars object. No need to setup here.
        // (This is done to easily share code between commonjs and browse envs)
        var SafeString = __dependency2__;
        var Exception = __dependency3__;
        var Utils = __dependency4__;
        var runtime = __dependency5__;

        // For compatibility and usage outside of module systems, make the Handlebars object a namespace
        var create = function () {
            var hb = new base.HandlebarsEnvironment();

            Utils.extend(hb, base);
            hb.SafeString = SafeString;
            hb.Exception = Exception;
            hb.Utils = Utils;

            hb.VM = runtime;
            hb.template = function (spec) {
                return runtime.template(spec, hb);
            };

            return hb;
        };

        var Handlebars = create();
        Handlebars.create = create;

        __exports__ = Handlebars;
        return __exports__;
    })(__module2__, __module4__, __module5__, __module3__, __module6__);

    // handlebars/compiler/ast.js
    var __module7__ = (function (__dependency1__) {
        "use strict";
        var __exports__;
        var Exception = __dependency1__;

        function LocationInfo(locInfo) {
            locInfo = locInfo || {};
            this.firstLine = locInfo.first_line;
            this.firstColumn = locInfo.first_column;
            this.lastColumn = locInfo.last_column;
            this.lastLine = locInfo.last_line;
        }

        var AST = {
            ProgramNode: function (statements, inverseStrip, inverse, locInfo) {
                var inverseLocationInfo, firstInverseNode;
                if (arguments.length === 3) {
                    locInfo = inverse;
                    inverse = null;
                } else if (arguments.length === 2) {
                    locInfo = inverseStrip;
                    inverseStrip = null;
                }

                LocationInfo.call(this, locInfo);
                this.type = "program";
                this.statements = statements;
                this.strip = {};

                if (inverse) {
                    firstInverseNode = inverse[0];
                    if (firstInverseNode) {
                        inverseLocationInfo = {
                            first_line: firstInverseNode.firstLine,
                            last_line: firstInverseNode.lastLine,
                            last_column: firstInverseNode.lastColumn,
                            first_column: firstInverseNode.firstColumn
                        };
                        this.inverse = new AST.ProgramNode(inverse, inverseStrip, inverseLocationInfo);
                    } else {
                        this.inverse = new AST.ProgramNode(inverse, inverseStrip);
                    }
                    this.strip.right = inverseStrip.left;
                } else if (inverseStrip) {
                    this.strip.left = inverseStrip.right;
                }
            },

            MustacheNode: function (rawParams, hash, open, strip, locInfo) {
                LocationInfo.call(this, locInfo);
                this.type = "mustache";
                this.strip = strip;

                // Open may be a string parsed from the parser or a passed boolean flag
                if (open != null && open.charAt) {
                    // Must use charAt to support IE pre-10
                    var escapeFlag = open.charAt(3) || open.charAt(2);
                    this.escaped = escapeFlag !== '{' && escapeFlag !== '&';
                } else {
                    this.escaped = !!open;
                }

                if (rawParams instanceof AST.SexprNode) {
                    this.sexpr = rawParams;
                } else {
                    // Support old AST API
                    this.sexpr = new AST.SexprNode(rawParams, hash);
                }

                this.sexpr.isRoot = true;

                // Support old AST API that stored this info in MustacheNode
                this.id = this.sexpr.id;
                this.params = this.sexpr.params;
                this.hash = this.sexpr.hash;
                this.eligibleHelper = this.sexpr.eligibleHelper;
                this.isHelper = this.sexpr.isHelper;
            },

            SexprNode: function (rawParams, hash, locInfo) {
                LocationInfo.call(this, locInfo);

                this.type = "sexpr";
                this.hash = hash;

                var id = this.id = rawParams[0];
                var params = this.params = rawParams.slice(1);

                // a mustache is an eligible helper if:
                // * its id is simple (a single part, not `this` or `..`)
                var eligibleHelper = this.eligibleHelper = id.isSimple;

                // a mustache is definitely a helper if:
                // * it is an eligible helper, and
                // * it has at least one parameter or hash segment
                this.isHelper = eligibleHelper && (params.length || hash);

                // if a mustache is an eligible helper but not a definite
                // helper, it is ambiguous, and will be resolved in a later
                // pass or at runtime.
            },

            PartialNode: function (partialName, context, strip, locInfo) {
                LocationInfo.call(this, locInfo);
                this.type = "partial";
                this.partialName = partialName;
                this.context = context;
                this.strip = strip;
            },

            BlockNode: function (mustache, program, inverse, close, locInfo) {
                LocationInfo.call(this, locInfo);

                if (mustache.sexpr.id.original !== close.path.original) {
                    throw new Exception(mustache.sexpr.id.original + " doesn't match " + close.path.original, this);
                }

                this.type = 'block';
                this.mustache = mustache;
                this.program = program;
                this.inverse = inverse;

                this.strip = {
                    left: mustache.strip.left,
                    right: close.strip.right
                };

                (program || inverse).strip.left = mustache.strip.right;
                (inverse || program).strip.right = close.strip.left;

                if (inverse && !program) {
                    this.isInverse = true;
                }
            },

            ContentNode: function (string, locInfo) {
                LocationInfo.call(this, locInfo);
                this.type = "content";
                this.string = string;
            },

            HashNode: function (pairs, locInfo) {
                LocationInfo.call(this, locInfo);
                this.type = "hash";
                this.pairs = pairs;
            },

            IdNode: function (parts, locInfo) {
                LocationInfo.call(this, locInfo);
                this.type = "ID";

                var original = "",
                    dig = [],
                    depth = 0;

                for (var i = 0, l = parts.length; i < l; i++) {
                    var part = parts[i].part;
                    original += (parts[i].separator || '') + part;

                    if (part === ".." || part === "." || part === "this") {
                        if (dig.length > 0) {
                            throw new Exception("Invalid path: " + original, this);
                        } else if (part === "..") {
                            depth++;
                        } else {
                            this.isScoped = true;
                        }
                    } else {
                        dig.push(part);
                    }
                }

                this.original = original;
                this.parts = dig;
                this.string = dig.join('.');
                this.depth = depth;

                // an ID is simple if it only has one part, and that part is not
                // `..` or `this`.
                this.isSimple = parts.length === 1 && !this.isScoped && depth === 0;

                this.stringModeValue = this.string;
            },

            PartialNameNode: function (name, locInfo) {
                LocationInfo.call(this, locInfo);
                this.type = "PARTIAL_NAME";
                this.name = name.original;
            },

            DataNode: function (id, locInfo) {
                LocationInfo.call(this, locInfo);
                this.type = "DATA";
                this.id = id;
            },

            StringNode: function (string, locInfo) {
                LocationInfo.call(this, locInfo);
                this.type = "STRING";
                this.original =
                  this.string =
                  this.stringModeValue = string;
            },

            IntegerNode: function (integer, locInfo) {
                LocationInfo.call(this, locInfo);
                this.type = "INTEGER";
                this.original =
                  this.integer = integer;
                this.stringModeValue = Number(integer);
            },

            BooleanNode: function (bool, locInfo) {
                LocationInfo.call(this, locInfo);
                this.type = "BOOLEAN";
                this.bool = bool;
                this.stringModeValue = bool === "true";
            },

            CommentNode: function (comment, locInfo) {
                LocationInfo.call(this, locInfo);
                this.type = "comment";
                this.comment = comment;
            }
        };

        // Must be exported as an object rather than the root of the module as the jison lexer
        // most modify the object to operate properly.
        __exports__ = AST;
        return __exports__;
    })(__module5__);

    // handlebars/compiler/parser.js
    var __module9__ = (function () {
        "use strict";
        var __exports__;
        /* jshint ignore:start */
        /* Jison generated parser */
        var handlebars = (function () {
            var parser = {
                trace: function trace() { },
                yy: {},
                symbols_: { "error": 2, "root": 3, "statements": 4, "EOF": 5, "program": 6, "simpleInverse": 7, "statement": 8, "openInverse": 9, "closeBlock": 10, "openBlock": 11, "mustache": 12, "partial": 13, "CONTENT": 14, "COMMENT": 15, "OPEN_BLOCK": 16, "sexpr": 17, "CLOSE": 18, "OPEN_INVERSE": 19, "OPEN_ENDBLOCK": 20, "path": 21, "OPEN": 22, "OPEN_UNESCAPED": 23, "CLOSE_UNESCAPED": 24, "OPEN_PARTIAL": 25, "partialName": 26, "partial_option0": 27, "sexpr_repetition0": 28, "sexpr_option0": 29, "dataName": 30, "param": 31, "STRING": 32, "INTEGER": 33, "BOOLEAN": 34, "OPEN_SEXPR": 35, "CLOSE_SEXPR": 36, "hash": 37, "hash_repetition_plus0": 38, "hashSegment": 39, "ID": 40, "EQUALS": 41, "DATA": 42, "pathSegments": 43, "SEP": 44, "$accept": 0, "$end": 1 },
                terminals_: { 2: "error", 5: "EOF", 14: "CONTENT", 15: "COMMENT", 16: "OPEN_BLOCK", 18: "CLOSE", 19: "OPEN_INVERSE", 20: "OPEN_ENDBLOCK", 22: "OPEN", 23: "OPEN_UNESCAPED", 24: "CLOSE_UNESCAPED", 25: "OPEN_PARTIAL", 32: "STRING", 33: "INTEGER", 34: "BOOLEAN", 35: "OPEN_SEXPR", 36: "CLOSE_SEXPR", 40: "ID", 41: "EQUALS", 42: "DATA", 44: "SEP" },
                productions_: [0, [3, 2], [3, 1], [6, 2], [6, 3], [6, 2], [6, 1], [6, 1], [6, 0], [4, 1], [4, 2], [8, 3], [8, 3], [8, 1], [8, 1], [8, 1], [8, 1], [11, 3], [9, 3], [10, 3], [12, 3], [12, 3], [13, 4], [7, 2], [17, 3], [17, 1], [31, 1], [31, 1], [31, 1], [31, 1], [31, 1], [31, 3], [37, 1], [39, 3], [26, 1], [26, 1], [26, 1], [30, 2], [21, 1], [43, 3], [43, 1], [27, 0], [27, 1], [28, 0], [28, 2], [29, 0], [29, 1], [38, 1], [38, 2]],
                performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$) {

                    var $0 = $$.length - 1;
                    switch (yystate) {
                        case 1: return new yy.ProgramNode($$[$0 - 1], this._$);
                            break;
                        case 2: return new yy.ProgramNode([], this._$);
                            break;
                        case 3: this.$ = new yy.ProgramNode([], $$[$0 - 1], $$[$0], this._$);
                            break;
                        case 4: this.$ = new yy.ProgramNode($$[$0 - 2], $$[$0 - 1], $$[$0], this._$);
                            break;
                        case 5: this.$ = new yy.ProgramNode($$[$0 - 1], $$[$0], [], this._$);
                            break;
                        case 6: this.$ = new yy.ProgramNode($$[$0], this._$);
                            break;
                        case 7: this.$ = new yy.ProgramNode([], this._$);
                            break;
                        case 8: this.$ = new yy.ProgramNode([], this._$);
                            break;
                        case 9: this.$ = [$$[$0]];
                            break;
                        case 10: $$[$0 - 1].push($$[$0]); this.$ = $$[$0 - 1];
                            break;
                        case 11: this.$ = new yy.BlockNode($$[$0 - 2], $$[$0 - 1].inverse, $$[$0 - 1], $$[$0], this._$);
                            break;
                        case 12: this.$ = new yy.BlockNode($$[$0 - 2], $$[$0 - 1], $$[$0 - 1].inverse, $$[$0], this._$);
                            break;
                        case 13: this.$ = $$[$0];
                            break;
                        case 14: this.$ = $$[$0];
                            break;
                        case 15: this.$ = new yy.ContentNode($$[$0], this._$);
                            break;
                        case 16: this.$ = new yy.CommentNode($$[$0], this._$);
                            break;
                        case 17: this.$ = new yy.MustacheNode($$[$0 - 1], null, $$[$0 - 2], stripFlags($$[$0 - 2], $$[$0]), this._$);
                            break;
                        case 18: this.$ = new yy.MustacheNode($$[$0 - 1], null, $$[$0 - 2], stripFlags($$[$0 - 2], $$[$0]), this._$);
                            break;
                        case 19: this.$ = { path: $$[$0 - 1], strip: stripFlags($$[$0 - 2], $$[$0]) };
                            break;
                        case 20: this.$ = new yy.MustacheNode($$[$0 - 1], null, $$[$0 - 2], stripFlags($$[$0 - 2], $$[$0]), this._$);
                            break;
                        case 21: this.$ = new yy.MustacheNode($$[$0 - 1], null, $$[$0 - 2], stripFlags($$[$0 - 2], $$[$0]), this._$);
                            break;
                        case 22: this.$ = new yy.PartialNode($$[$0 - 2], $$[$0 - 1], stripFlags($$[$0 - 3], $$[$0]), this._$);
                            break;
                        case 23: this.$ = stripFlags($$[$0 - 1], $$[$0]);
                            break;
                        case 24: this.$ = new yy.SexprNode([$$[$0 - 2]].concat($$[$0 - 1]), $$[$0], this._$);
                            break;
                        case 25: this.$ = new yy.SexprNode([$$[$0]], null, this._$);
                            break;
                        case 26: this.$ = $$[$0];
                            break;
                        case 27: this.$ = new yy.StringNode($$[$0], this._$);
                            break;
                        case 28: this.$ = new yy.IntegerNode($$[$0], this._$);
                            break;
                        case 29: this.$ = new yy.BooleanNode($$[$0], this._$);
                            break;
                        case 30: this.$ = $$[$0];
                            break;
                        case 31: $$[$0 - 1].isHelper = true; this.$ = $$[$0 - 1];
                            break;
                        case 32: this.$ = new yy.HashNode($$[$0], this._$);
                            break;
                        case 33: this.$ = [$$[$0 - 2], $$[$0]];
                            break;
                        case 34: this.$ = new yy.PartialNameNode($$[$0], this._$);
                            break;
                        case 35: this.$ = new yy.PartialNameNode(new yy.StringNode($$[$0], this._$), this._$);
                            break;
                        case 36: this.$ = new yy.PartialNameNode(new yy.IntegerNode($$[$0], this._$));
                            break;
                        case 37: this.$ = new yy.DataNode($$[$0], this._$);
                            break;
                        case 38: this.$ = new yy.IdNode($$[$0], this._$);
                            break;
                        case 39: $$[$0 - 2].push({ part: $$[$0], separator: $$[$0 - 1] }); this.$ = $$[$0 - 2];
                            break;
                        case 40: this.$ = [{ part: $$[$0] }];
                            break;
                        case 43: this.$ = [];
                            break;
                        case 44: $$[$0 - 1].push($$[$0]);
                            break;
                        case 47: this.$ = [$$[$0]];
                            break;
                        case 48: $$[$0 - 1].push($$[$0]);
                            break;
                    }
                },
                table: [{ 3: 1, 4: 2, 5: [1, 3], 8: 4, 9: 5, 11: 6, 12: 7, 13: 8, 14: [1, 9], 15: [1, 10], 16: [1, 12], 19: [1, 11], 22: [1, 13], 23: [1, 14], 25: [1, 15] }, { 1: [3] }, { 5: [1, 16], 8: 17, 9: 5, 11: 6, 12: 7, 13: 8, 14: [1, 9], 15: [1, 10], 16: [1, 12], 19: [1, 11], 22: [1, 13], 23: [1, 14], 25: [1, 15] }, { 1: [2, 2] }, { 5: [2, 9], 14: [2, 9], 15: [2, 9], 16: [2, 9], 19: [2, 9], 20: [2, 9], 22: [2, 9], 23: [2, 9], 25: [2, 9] }, { 4: 20, 6: 18, 7: 19, 8: 4, 9: 5, 11: 6, 12: 7, 13: 8, 14: [1, 9], 15: [1, 10], 16: [1, 12], 19: [1, 21], 20: [2, 8], 22: [1, 13], 23: [1, 14], 25: [1, 15] }, { 4: 20, 6: 22, 7: 19, 8: 4, 9: 5, 11: 6, 12: 7, 13: 8, 14: [1, 9], 15: [1, 10], 16: [1, 12], 19: [1, 21], 20: [2, 8], 22: [1, 13], 23: [1, 14], 25: [1, 15] }, { 5: [2, 13], 14: [2, 13], 15: [2, 13], 16: [2, 13], 19: [2, 13], 20: [2, 13], 22: [2, 13], 23: [2, 13], 25: [2, 13] }, { 5: [2, 14], 14: [2, 14], 15: [2, 14], 16: [2, 14], 19: [2, 14], 20: [2, 14], 22: [2, 14], 23: [2, 14], 25: [2, 14] }, { 5: [2, 15], 14: [2, 15], 15: [2, 15], 16: [2, 15], 19: [2, 15], 20: [2, 15], 22: [2, 15], 23: [2, 15], 25: [2, 15] }, { 5: [2, 16], 14: [2, 16], 15: [2, 16], 16: [2, 16], 19: [2, 16], 20: [2, 16], 22: [2, 16], 23: [2, 16], 25: [2, 16] }, { 17: 23, 21: 24, 30: 25, 40: [1, 28], 42: [1, 27], 43: 26 }, { 17: 29, 21: 24, 30: 25, 40: [1, 28], 42: [1, 27], 43: 26 }, { 17: 30, 21: 24, 30: 25, 40: [1, 28], 42: [1, 27], 43: 26 }, { 17: 31, 21: 24, 30: 25, 40: [1, 28], 42: [1, 27], 43: 26 }, { 21: 33, 26: 32, 32: [1, 34], 33: [1, 35], 40: [1, 28], 43: 26 }, { 1: [2, 1] }, { 5: [2, 10], 14: [2, 10], 15: [2, 10], 16: [2, 10], 19: [2, 10], 20: [2, 10], 22: [2, 10], 23: [2, 10], 25: [2, 10] }, { 10: 36, 20: [1, 37] }, { 4: 38, 8: 4, 9: 5, 11: 6, 12: 7, 13: 8, 14: [1, 9], 15: [1, 10], 16: [1, 12], 19: [1, 11], 20: [2, 7], 22: [1, 13], 23: [1, 14], 25: [1, 15] }, { 7: 39, 8: 17, 9: 5, 11: 6, 12: 7, 13: 8, 14: [1, 9], 15: [1, 10], 16: [1, 12], 19: [1, 21], 20: [2, 6], 22: [1, 13], 23: [1, 14], 25: [1, 15] }, { 17: 23, 18: [1, 40], 21: 24, 30: 25, 40: [1, 28], 42: [1, 27], 43: 26 }, { 10: 41, 20: [1, 37] }, { 18: [1, 42] }, { 18: [2, 43], 24: [2, 43], 28: 43, 32: [2, 43], 33: [2, 43], 34: [2, 43], 35: [2, 43], 36: [2, 43], 40: [2, 43], 42: [2, 43] }, { 18: [2, 25], 24: [2, 25], 36: [2, 25] }, { 18: [2, 38], 24: [2, 38], 32: [2, 38], 33: [2, 38], 34: [2, 38], 35: [2, 38], 36: [2, 38], 40: [2, 38], 42: [2, 38], 44: [1, 44] }, { 21: 45, 40: [1, 28], 43: 26 }, { 18: [2, 40], 24: [2, 40], 32: [2, 40], 33: [2, 40], 34: [2, 40], 35: [2, 40], 36: [2, 40], 40: [2, 40], 42: [2, 40], 44: [2, 40] }, { 18: [1, 46] }, { 18: [1, 47] }, { 24: [1, 48] }, { 18: [2, 41], 21: 50, 27: 49, 40: [1, 28], 43: 26 }, { 18: [2, 34], 40: [2, 34] }, { 18: [2, 35], 40: [2, 35] }, { 18: [2, 36], 40: [2, 36] }, { 5: [2, 11], 14: [2, 11], 15: [2, 11], 16: [2, 11], 19: [2, 11], 20: [2, 11], 22: [2, 11], 23: [2, 11], 25: [2, 11] }, { 21: 51, 40: [1, 28], 43: 26 }, { 8: 17, 9: 5, 11: 6, 12: 7, 13: 8, 14: [1, 9], 15: [1, 10], 16: [1, 12], 19: [1, 11], 20: [2, 3], 22: [1, 13], 23: [1, 14], 25: [1, 15] }, { 4: 52, 8: 4, 9: 5, 11: 6, 12: 7, 13: 8, 14: [1, 9], 15: [1, 10], 16: [1, 12], 19: [1, 11], 20: [2, 5], 22: [1, 13], 23: [1, 14], 25: [1, 15] }, { 14: [2, 23], 15: [2, 23], 16: [2, 23], 19: [2, 23], 20: [2, 23], 22: [2, 23], 23: [2, 23], 25: [2, 23] }, { 5: [2, 12], 14: [2, 12], 15: [2, 12], 16: [2, 12], 19: [2, 12], 20: [2, 12], 22: [2, 12], 23: [2, 12], 25: [2, 12] }, { 14: [2, 18], 15: [2, 18], 16: [2, 18], 19: [2, 18], 20: [2, 18], 22: [2, 18], 23: [2, 18], 25: [2, 18] }, { 18: [2, 45], 21: 56, 24: [2, 45], 29: 53, 30: 60, 31: 54, 32: [1, 57], 33: [1, 58], 34: [1, 59], 35: [1, 61], 36: [2, 45], 37: 55, 38: 62, 39: 63, 40: [1, 64], 42: [1, 27], 43: 26 }, { 40: [1, 65] }, { 18: [2, 37], 24: [2, 37], 32: [2, 37], 33: [2, 37], 34: [2, 37], 35: [2, 37], 36: [2, 37], 40: [2, 37], 42: [2, 37] }, { 14: [2, 17], 15: [2, 17], 16: [2, 17], 19: [2, 17], 20: [2, 17], 22: [2, 17], 23: [2, 17], 25: [2, 17] }, { 5: [2, 20], 14: [2, 20], 15: [2, 20], 16: [2, 20], 19: [2, 20], 20: [2, 20], 22: [2, 20], 23: [2, 20], 25: [2, 20] }, { 5: [2, 21], 14: [2, 21], 15: [2, 21], 16: [2, 21], 19: [2, 21], 20: [2, 21], 22: [2, 21], 23: [2, 21], 25: [2, 21] }, { 18: [1, 66] }, { 18: [2, 42] }, { 18: [1, 67] }, { 8: 17, 9: 5, 11: 6, 12: 7, 13: 8, 14: [1, 9], 15: [1, 10], 16: [1, 12], 19: [1, 11], 20: [2, 4], 22: [1, 13], 23: [1, 14], 25: [1, 15] }, { 18: [2, 24], 24: [2, 24], 36: [2, 24] }, { 18: [2, 44], 24: [2, 44], 32: [2, 44], 33: [2, 44], 34: [2, 44], 35: [2, 44], 36: [2, 44], 40: [2, 44], 42: [2, 44] }, { 18: [2, 46], 24: [2, 46], 36: [2, 46] }, { 18: [2, 26], 24: [2, 26], 32: [2, 26], 33: [2, 26], 34: [2, 26], 35: [2, 26], 36: [2, 26], 40: [2, 26], 42: [2, 26] }, { 18: [2, 27], 24: [2, 27], 32: [2, 27], 33: [2, 27], 34: [2, 27], 35: [2, 27], 36: [2, 27], 40: [2, 27], 42: [2, 27] }, { 18: [2, 28], 24: [2, 28], 32: [2, 28], 33: [2, 28], 34: [2, 28], 35: [2, 28], 36: [2, 28], 40: [2, 28], 42: [2, 28] }, { 18: [2, 29], 24: [2, 29], 32: [2, 29], 33: [2, 29], 34: [2, 29], 35: [2, 29], 36: [2, 29], 40: [2, 29], 42: [2, 29] }, { 18: [2, 30], 24: [2, 30], 32: [2, 30], 33: [2, 30], 34: [2, 30], 35: [2, 30], 36: [2, 30], 40: [2, 30], 42: [2, 30] }, { 17: 68, 21: 24, 30: 25, 40: [1, 28], 42: [1, 27], 43: 26 }, { 18: [2, 32], 24: [2, 32], 36: [2, 32], 39: 69, 40: [1, 70] }, { 18: [2, 47], 24: [2, 47], 36: [2, 47], 40: [2, 47] }, { 18: [2, 40], 24: [2, 40], 32: [2, 40], 33: [2, 40], 34: [2, 40], 35: [2, 40], 36: [2, 40], 40: [2, 40], 41: [1, 71], 42: [2, 40], 44: [2, 40] }, { 18: [2, 39], 24: [2, 39], 32: [2, 39], 33: [2, 39], 34: [2, 39], 35: [2, 39], 36: [2, 39], 40: [2, 39], 42: [2, 39], 44: [2, 39] }, { 5: [2, 22], 14: [2, 22], 15: [2, 22], 16: [2, 22], 19: [2, 22], 20: [2, 22], 22: [2, 22], 23: [2, 22], 25: [2, 22] }, { 5: [2, 19], 14: [2, 19], 15: [2, 19], 16: [2, 19], 19: [2, 19], 20: [2, 19], 22: [2, 19], 23: [2, 19], 25: [2, 19] }, { 36: [1, 72] }, { 18: [2, 48], 24: [2, 48], 36: [2, 48], 40: [2, 48] }, { 41: [1, 71] }, { 21: 56, 30: 60, 31: 73, 32: [1, 57], 33: [1, 58], 34: [1, 59], 35: [1, 61], 40: [1, 28], 42: [1, 27], 43: 26 }, { 18: [2, 31], 24: [2, 31], 32: [2, 31], 33: [2, 31], 34: [2, 31], 35: [2, 31], 36: [2, 31], 40: [2, 31], 42: [2, 31] }, { 18: [2, 33], 24: [2, 33], 36: [2, 33], 40: [2, 33] }],
                defaultActions: { 3: [2, 2], 16: [2, 1], 50: [2, 42] },
                parseError: function parseError(str, hash) {
                    throw new Error(str);
                },
                parse: function parse(input) {
                    var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
                    this.lexer.setInput(input);
                    this.lexer.yy = this.yy;
                    this.yy.lexer = this.lexer;
                    this.yy.parser = this;
                    if (typeof this.lexer.yylloc == "undefined")
                        this.lexer.yylloc = {};
                    var yyloc = this.lexer.yylloc;
                    lstack.push(yyloc);
                    var ranges = this.lexer.options && this.lexer.options.ranges;
                    if (typeof this.yy.parseError === "function")
                        this.parseError = this.yy.parseError;
                    function popStack(n) {
                        stack.length = stack.length - 2 * n;
                        vstack.length = vstack.length - n;
                        lstack.length = lstack.length - n;
                    }
                    function lex() {
                        var token;
                        token = self.lexer.lex() || 1;
                        if (typeof token !== "number") {
                            token = self.symbols_[token] || token;
                        }
                        return token;
                    }
                    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
                    while (true) {
                        state = stack[stack.length - 1];
                        if (this.defaultActions[state]) {
                            action = this.defaultActions[state];
                        } else {
                            if (symbol === null || typeof symbol == "undefined") {
                                symbol = lex();
                            }
                            action = table[state] && table[state][symbol];
                        }
                        if (typeof action === "undefined" || !action.length || !action[0]) {
                            var errStr = "";
                            if (!recovering) {
                                expected = [];
                                for (p in table[state])
                                    if (this.terminals_[p] && p > 2) {
                                        expected.push("'" + this.terminals_[p] + "'");
                                    }
                                if (this.lexer.showPosition) {
                                    errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
                                } else {
                                    errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1 ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'");
                                }
                                this.parseError(errStr, { text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected });
                            }
                        }
                        if (action[0] instanceof Array && action.length > 1) {
                            throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
                        }
                        switch (action[0]) {
                            case 1:
                                stack.push(symbol);
                                vstack.push(this.lexer.yytext);
                                lstack.push(this.lexer.yylloc);
                                stack.push(action[1]);
                                symbol = null;
                                if (!preErrorSymbol) {
                                    yyleng = this.lexer.yyleng;
                                    yytext = this.lexer.yytext;
                                    yylineno = this.lexer.yylineno;
                                    yyloc = this.lexer.yylloc;
                                    if (recovering > 0)
                                        recovering--;
                                } else {
                                    symbol = preErrorSymbol;
                                    preErrorSymbol = null;
                                }
                                break;
                            case 2:
                                len = this.productions_[action[1]][1];
                                yyval.$ = vstack[vstack.length - len];
                                yyval._$ = { first_line: lstack[lstack.length - (len || 1)].first_line, last_line: lstack[lstack.length - 1].last_line, first_column: lstack[lstack.length - (len || 1)].first_column, last_column: lstack[lstack.length - 1].last_column };
                                if (ranges) {
                                    yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
                                }
                                r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
                                if (typeof r !== "undefined") {
                                    return r;
                                }
                                if (len) {
                                    stack = stack.slice(0, -1 * len * 2);
                                    vstack = vstack.slice(0, -1 * len);
                                    lstack = lstack.slice(0, -1 * len);
                                }
                                stack.push(this.productions_[action[1]][0]);
                                vstack.push(yyval.$);
                                lstack.push(yyval._$);
                                newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
                                stack.push(newState);
                                break;
                            case 3:
                                return true;
                        }
                    }
                    return true;
                }
            };


            function stripFlags(open, close) {
                return {
                    left: open.charAt(2) === '~',
                    right: close.charAt(0) === '~' || close.charAt(1) === '~'
                };
            }

            /* Jison generated lexer */
            var lexer = (function () {
                var lexer = ({
                    EOF: 1,
                    parseError: function parseError(str, hash) {
                        if (this.yy.parser) {
                            this.yy.parser.parseError(str, hash);
                        } else {
                            throw new Error(str);
                        }
                    },
                    setInput: function (input) {
                        this._input = input;
                        this._more = this._less = this.done = false;
                        this.yylineno = this.yyleng = 0;
                        this.yytext = this.matched = this.match = '';
                        this.conditionStack = ['INITIAL'];
                        this.yylloc = { first_line: 1, first_column: 0, last_line: 1, last_column: 0 };
                        if (this.options.ranges) this.yylloc.range = [0, 0];
                        this.offset = 0;
                        return this;
                    },
                    input: function () {
                        var ch = this._input[0];
                        this.yytext += ch;
                        this.yyleng++;
                        this.offset++;
                        this.match += ch;
                        this.matched += ch;
                        var lines = ch.match(/(?:\r\n?|\n).*/g);
                        if (lines) {
                            this.yylineno++;
                            this.yylloc.last_line++;
                        } else {
                            this.yylloc.last_column++;
                        }
                        if (this.options.ranges) this.yylloc.range[1]++;

                        this._input = this._input.slice(1);
                        return ch;
                    },
                    unput: function (ch) {
                        var len = ch.length;
                        var lines = ch.split(/(?:\r\n?|\n)/g);

                        this._input = ch + this._input;
                        this.yytext = this.yytext.substr(0, this.yytext.length - len - 1);
                        //this.yyleng -= len;
                        this.offset -= len;
                        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
                        this.match = this.match.substr(0, this.match.length - 1);
                        this.matched = this.matched.substr(0, this.matched.length - 1);

                        if (lines.length - 1) this.yylineno -= lines.length - 1;
                        var r = this.yylloc.range;

                        this.yylloc = {
                            first_line: this.yylloc.first_line,
                            last_line: this.yylineno + 1,
                            first_column: this.yylloc.first_column,
                            last_column: lines ?
                                (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length :
                                this.yylloc.first_column - len
                        };

                        if (this.options.ranges) {
                            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
                        }
                        return this;
                    },
                    more: function () {
                        this._more = true;
                        return this;
                    },
                    less: function (n) {
                        this.unput(this.match.slice(n));
                    },
                    pastInput: function () {
                        var past = this.matched.substr(0, this.matched.length - this.match.length);
                        return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
                    },
                    upcomingInput: function () {
                        var next = this.match;
                        if (next.length < 20) {
                            next += this._input.substr(0, 20 - next.length);
                        }
                        return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
                    },
                    showPosition: function () {
                        var pre = this.pastInput();
                        var c = new Array(pre.length + 1).join("-");
                        return pre + this.upcomingInput() + "\n" + c + "^";
                    },
                    next: function () {
                        if (this.done) {
                            return this.EOF;
                        }
                        if (!this._input) this.done = true;

                        var token,
                            match,
                            tempMatch,
                            index,
                            col,
                            lines;
                        if (!this._more) {
                            this.yytext = '';
                            this.match = '';
                        }
                        var rules = this._currentRules();
                        for (var i = 0; i < rules.length; i++) {
                            tempMatch = this._input.match(this.rules[rules[i]]);
                            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                                match = tempMatch;
                                index = i;
                                if (!this.options.flex) break;
                            }
                        }
                        if (match) {
                            lines = match[0].match(/(?:\r\n?|\n).*/g);
                            if (lines) this.yylineno += lines.length;
                            this.yylloc = {
                                first_line: this.yylloc.last_line,
                                last_line: this.yylineno + 1,
                                first_column: this.yylloc.last_column,
                                last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
                            };
                            this.yytext += match[0];
                            this.match += match[0];
                            this.matches = match;
                            this.yyleng = this.yytext.length;
                            if (this.options.ranges) {
                                this.yylloc.range = [this.offset, this.offset += this.yyleng];
                            }
                            this._more = false;
                            this._input = this._input.slice(match[0].length);
                            this.matched += match[0];
                            token = this.performAction.call(this, this.yy, this, rules[index], this.conditionStack[this.conditionStack.length - 1]);
                            if (this.done && this._input) this.done = false;
                            if (token) return token;
                            else return;
                        }
                        if (this._input === "") {
                            return this.EOF;
                        } else {
                            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(),
                                    { text: "", token: null, line: this.yylineno });
                        }
                    },
                    lex: function lex() {
                        var r = this.next();
                        if (typeof r !== 'undefined') {
                            return r;
                        } else {
                            return this.lex();
                        }
                    },
                    begin: function begin(condition) {
                        this.conditionStack.push(condition);
                    },
                    popState: function popState() {
                        return this.conditionStack.pop();
                    },
                    _currentRules: function _currentRules() {
                        return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
                    },
                    topState: function () {
                        return this.conditionStack[this.conditionStack.length - 2];
                    },
                    pushState: function begin(condition) {
                        this.begin(condition);
                    }
                });
                lexer.options = {};
                lexer.performAction = function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {


                    function strip(start, end) {
                        return yy_.yytext = yy_.yytext.substr(start, yy_.yyleng - end);
                    }


                    var YYSTATE = YY_START
                    switch ($avoiding_name_collisions) {
                        case 0:
                            if (yy_.yytext.slice(-2) === "\\\\") {
                                strip(0, 1);
                                this.begin("mu");
                            } else if (yy_.yytext.slice(-1) === "\\") {
                                strip(0, 1);
                                this.begin("emu");
                            } else {
                                this.begin("mu");
                            }
                            if (yy_.yytext) return 14;

                            break;
                        case 1: return 14;
                            break;
                        case 2:
                            this.popState();
                            return 14;

                            break;
                        case 3: strip(0, 4); this.popState(); return 15;
                            break;
                        case 4: return 35;
                            break;
                        case 5: return 36;
                            break;
                        case 6: return 25;
                            break;
                        case 7: return 16;
                            break;
                        case 8: return 20;
                            break;
                        case 9: return 19;
                            break;
                        case 10: return 19;
                            break;
                        case 11: return 23;
                            break;
                        case 12: return 22;
                            break;
                        case 13: this.popState(); this.begin('com');
                            break;
                        case 14: strip(3, 5); this.popState(); return 15;
                            break;
                        case 15: return 22;
                            break;
                        case 16: return 41;
                            break;
                        case 17: return 40;
                            break;
                        case 18: return 40;
                            break;
                        case 19: return 44;
                            break;
                        case 20:// ignore whitespace
                            break;
                        case 21: this.popState(); return 24;
                            break;
                        case 22: this.popState(); return 18;
                            break;
                        case 23: yy_.yytext = strip(1, 2).replace(/\\"/g, '"'); return 32;
                            break;
                        case 24: yy_.yytext = strip(1, 2).replace(/\\'/g, "'"); return 32;
                            break;
                        case 25: return 42;
                            break;
                        case 26: return 34;
                            break;
                        case 27: return 34;
                            break;
                        case 28: return 33;
                            break;
                        case 29: return 40;
                            break;
                        case 30: yy_.yytext = strip(1, 2); return 40;
                            break;
                        case 31: return 'INVALID';
                            break;
                        case 32: return 5;
                            break;
                    }
                };
                lexer.rules = [/^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/, /^(?:[\s\S]*?--\}\})/, /^(?:\()/, /^(?:\))/, /^(?:\{\{(~)?>)/, /^(?:\{\{(~)?#)/, /^(?:\{\{(~)?\/)/, /^(?:\{\{(~)?\^)/, /^(?:\{\{(~)?\s*else\b)/, /^(?:\{\{(~)?\{)/, /^(?:\{\{(~)?&)/, /^(?:\{\{!--)/, /^(?:\{\{![\s\S]*?\}\})/, /^(?:\{\{(~)?)/, /^(?:=)/, /^(?:\.\.)/, /^(?:\.(?=([=~}\s\/.)])))/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}(~)?\}\})/, /^(?:(~)?\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@)/, /^(?:true(?=([~}\s)])))/, /^(?:false(?=([~}\s)])))/, /^(?:-?[0-9]+(?=([~}\s)])))/, /^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)]))))/, /^(?:\[[^\]]*\])/, /^(?:.)/, /^(?:$)/];
                lexer.conditions = { "mu": { "rules": [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32], "inclusive": false }, "emu": { "rules": [2], "inclusive": false }, "com": { "rules": [3], "inclusive": false }, "INITIAL": { "rules": [0, 1, 32], "inclusive": true } };
                return lexer;
            })()
            parser.lexer = lexer;
            function Parser() { this.yy = {}; } Parser.prototype = parser; parser.Parser = Parser;
            return new Parser;
        })(); __exports__ = handlebars;
        /* jshint ignore:end */
        return __exports__;
    })();

    // handlebars/compiler/base.js
    var __module8__ = (function (__dependency1__, __dependency2__) {
        "use strict";
        var __exports__ = {};
        var parser = __dependency1__;
        var AST = __dependency2__;

        __exports__.parser = parser;

        function parse(input) {
            // Just return if an already-compile AST was passed in.
            if (input.constructor === AST.ProgramNode) { return input; }

            parser.yy = AST;
            return parser.parse(input);
        }

        __exports__.parse = parse;
        return __exports__;
    })(__module9__, __module7__);

    // handlebars/compiler/compiler.js
    var __module10__ = (function (__dependency1__) {
        "use strict";
        var __exports__ = {};
        var Exception = __dependency1__;

        function Compiler() { }

        __exports__.Compiler = Compiler;// the foundHelper register will disambiguate helper lookup from finding a
        // function in a context. This is necessary for mustache compatibility, which
        // requires that context functions in blocks are evaluated by blockHelperMissing,
        // and then proceed as if the resulting value was provided to blockHelperMissing.

        Compiler.prototype = {
            compiler: Compiler,

            disassemble: function () {
                var opcodes = this.opcodes, opcode, out = [], params, param;

                for (var i = 0, l = opcodes.length; i < l; i++) {
                    opcode = opcodes[i];

                    if (opcode.opcode === 'DECLARE') {
                        out.push("DECLARE " + opcode.name + "=" + opcode.value);
                    } else {
                        params = [];
                        for (var j = 0; j < opcode.args.length; j++) {
                            param = opcode.args[j];
                            if (typeof param === "string") {
                                param = "\"" + param.replace("\n", "\\n") + "\"";
                            }
                            params.push(param);
                        }
                        out.push(opcode.opcode + " " + params.join(" "));
                    }
                }

                return out.join("\n");
            },

            equals: function (other) {
                var len = this.opcodes.length;
                if (other.opcodes.length !== len) {
                    return false;
                }

                for (var i = 0; i < len; i++) {
                    var opcode = this.opcodes[i],
                        otherOpcode = other.opcodes[i];
                    if (opcode.opcode !== otherOpcode.opcode || opcode.args.length !== otherOpcode.args.length) {
                        return false;
                    }
                    for (var j = 0; j < opcode.args.length; j++) {
                        if (opcode.args[j] !== otherOpcode.args[j]) {
                            return false;
                        }
                    }
                }

                len = this.children.length;
                if (other.children.length !== len) {
                    return false;
                }
                for (i = 0; i < len; i++) {
                    if (!this.children[i].equals(other.children[i])) {
                        return false;
                    }
                }

                return true;
            },

            guid: 0,

            compile: function (program, options) {
                this.opcodes = [];
                this.children = [];
                this.depths = { list: [] };
                this.options = options;

                // These changes will propagate to the other compiler components
                var knownHelpers = this.options.knownHelpers;
                this.options.knownHelpers = {
                    'helperMissing': true,
                    'blockHelperMissing': true,
                    'each': true,
                    'if': true,
                    'unless': true,
                    'with': true,
                    'log': true
                };
                if (knownHelpers) {
                    for (var name in knownHelpers) {
                        this.options.knownHelpers[name] = knownHelpers[name];
                    }
                }

                return this.accept(program);
            },

            accept: function (node) {
                var strip = node.strip || {},
                    ret;
                if (strip.left) {
                    this.opcode('strip');
                }

                ret = this[node.type](node);

                if (strip.right) {
                    this.opcode('strip');
                }

                return ret;
            },

            program: function (program) {
                var statements = program.statements;

                for (var i = 0, l = statements.length; i < l; i++) {
                    this.accept(statements[i]);
                }
                this.isSimple = l === 1;

                this.depths.list = this.depths.list.sort(function (a, b) {
                    return a - b;
                });

                return this;
            },

            compileProgram: function (program) {
                var result = new this.compiler().compile(program, this.options);
                var guid = this.guid++, depth;

                this.usePartial = this.usePartial || result.usePartial;

                this.children[guid] = result;

                for (var i = 0, l = result.depths.list.length; i < l; i++) {
                    depth = result.depths.list[i];

                    if (depth < 2) { continue; }
                    else { this.addDepth(depth - 1); }
                }

                return guid;
            },

            block: function (block) {
                var mustache = block.mustache,
                    program = block.program,
                    inverse = block.inverse;

                if (program) {
                    program = this.compileProgram(program);
                }

                if (inverse) {
                    inverse = this.compileProgram(inverse);
                }

                var sexpr = mustache.sexpr;
                var type = this.classifySexpr(sexpr);

                if (type === "helper") {
                    this.helperSexpr(sexpr, program, inverse);
                } else if (type === "simple") {
                    this.simpleSexpr(sexpr);

                    // now that the simple mustache is resolved, we need to
                    // evaluate it by executing `blockHelperMissing`
                    this.opcode('pushProgram', program);
                    this.opcode('pushProgram', inverse);
                    this.opcode('emptyHash');
                    this.opcode('blockValue');
                } else {
                    this.ambiguousSexpr(sexpr, program, inverse);

                    // now that the simple mustache is resolved, we need to
                    // evaluate it by executing `blockHelperMissing`
                    this.opcode('pushProgram', program);
                    this.opcode('pushProgram', inverse);
                    this.opcode('emptyHash');
                    this.opcode('ambiguousBlockValue');
                }

                this.opcode('append');
            },

            hash: function (hash) {
                var pairs = hash.pairs, pair, val;

                this.opcode('pushHash');

                for (var i = 0, l = pairs.length; i < l; i++) {
                    pair = pairs[i];
                    val = pair[1];

                    if (this.options.stringParams) {
                        if (val.depth) {
                            this.addDepth(val.depth);
                        }
                        this.opcode('getContext', val.depth || 0);
                        this.opcode('pushStringParam', val.stringModeValue, val.type);

                        if (val.type === 'sexpr') {
                            // Subexpressions get evaluated and passed in
                            // in string params mode.
                            this.sexpr(val);
                        }
                    } else {
                        this.accept(val);
                    }

                    this.opcode('assignToHash', pair[0]);
                }
                this.opcode('popHash');
            },

            partial: function (partial) {
                var partialName = partial.partialName;
                this.usePartial = true;

                if (partial.context) {
                    this.ID(partial.context);
                } else {
                    this.opcode('push', 'depth0');
                }

                this.opcode('invokePartial', partialName.name);
                this.opcode('append');
            },

            content: function (content) {
                this.opcode('appendContent', content.string);
            },

            mustache: function (mustache) {
                this.sexpr(mustache.sexpr);

                if (mustache.escaped && !this.options.noEscape) {
                    this.opcode('appendEscaped');
                } else {
                    this.opcode('append');
                }
            },

            ambiguousSexpr: function (sexpr, program, inverse) {
                var id = sexpr.id,
                    name = id.parts[0],
                    isBlock = program != null || inverse != null;

                this.opcode('getContext', id.depth);

                this.opcode('pushProgram', program);
                this.opcode('pushProgram', inverse);

                this.opcode('invokeAmbiguous', name, isBlock);
            },

            simpleSexpr: function (sexpr) {
                var id = sexpr.id;

                if (id.type === 'DATA') {
                    this.DATA(id);
                } else if (id.parts.length) {
                    this.ID(id);
                } else {
                    // Simplified ID for `this`
                    this.addDepth(id.depth);
                    this.opcode('getContext', id.depth);
                    this.opcode('pushContext');
                }

                this.opcode('resolvePossibleLambda');
            },

            helperSexpr: function (sexpr, program, inverse) {
                var params = this.setupFullMustacheParams(sexpr, program, inverse),
                    name = sexpr.id.parts[0];

                if (this.options.knownHelpers[name]) {
                    this.opcode('invokeKnownHelper', params.length, name);
                } else if (this.options.knownHelpersOnly) {
                    throw new Exception("You specified knownHelpersOnly, but used the unknown helper " + name, sexpr);
                } else {
                    this.opcode('invokeHelper', params.length, name, sexpr.isRoot);
                }
            },

            sexpr: function (sexpr) {
                var type = this.classifySexpr(sexpr);

                if (type === "simple") {
                    this.simpleSexpr(sexpr);
                } else if (type === "helper") {
                    this.helperSexpr(sexpr);
                } else {
                    this.ambiguousSexpr(sexpr);
                }
            },

            ID: function (id) {
                this.addDepth(id.depth);
                this.opcode('getContext', id.depth);

                var name = id.parts[0];
                if (!name) {
                    this.opcode('pushContext');
                } else {
                    this.opcode('lookupOnContext', id.parts[0]);
                }

                for (var i = 1, l = id.parts.length; i < l; i++) {
                    this.opcode('lookup', id.parts[i]);
                }
            },

            DATA: function (data) {
                this.options.data = true;
                if (data.id.isScoped || data.id.depth) {
                    throw new Exception('Scoped data references are not supported: ' + data.original, data);
                }

                this.opcode('lookupData');
                var parts = data.id.parts;
                for (var i = 0, l = parts.length; i < l; i++) {
                    this.opcode('lookup', parts[i]);
                }
            },

            STRING: function (string) {
                this.opcode('pushString', string.string);
            },

            INTEGER: function (integer) {
                this.opcode('pushLiteral', integer.integer);
            },

            BOOLEAN: function (bool) {
                this.opcode('pushLiteral', bool.bool);
            },

            comment: function () { },

            // HELPERS
            opcode: function (name) {
                this.opcodes.push({ opcode: name, args: [].slice.call(arguments, 1) });
            },

            declare: function (name, value) {
                this.opcodes.push({ opcode: 'DECLARE', name: name, value: value });
            },

            addDepth: function (depth) {
                if (depth === 0) { return; }

                if (!this.depths[depth]) {
                    this.depths[depth] = true;
                    this.depths.list.push(depth);
                }
            },

            classifySexpr: function (sexpr) {
                var isHelper = sexpr.isHelper;
                var isEligible = sexpr.eligibleHelper;
                var options = this.options;

                // if ambiguous, we can possibly resolve the ambiguity now
                if (isEligible && !isHelper) {
                    var name = sexpr.id.parts[0];

                    if (options.knownHelpers[name]) {
                        isHelper = true;
                    } else if (options.knownHelpersOnly) {
                        isEligible = false;
                    }
                }

                if (isHelper) { return "helper"; }
                else if (isEligible) { return "ambiguous"; }
                else { return "simple"; }
            },

            pushParams: function (params) {
                var i = params.length, param;

                while (i--) {
                    param = params[i];

                    if (this.options.stringParams) {
                        if (param.depth) {
                            this.addDepth(param.depth);
                        }

                        this.opcode('getContext', param.depth || 0);
                        this.opcode('pushStringParam', param.stringModeValue, param.type);

                        if (param.type === 'sexpr') {
                            // Subexpressions get evaluated and passed in
                            // in string params mode.
                            this.sexpr(param);
                        }
                    } else {
                        this[param.type](param);
                    }
                }
            },

            setupFullMustacheParams: function (sexpr, program, inverse) {
                var params = sexpr.params;
                this.pushParams(params);

                this.opcode('pushProgram', program);
                this.opcode('pushProgram', inverse);

                if (sexpr.hash) {
                    this.hash(sexpr.hash);
                } else {
                    this.opcode('emptyHash');
                }

                return params;
            }
        };

        function precompile(input, options, env) {
            if (input == null || (typeof input !== 'string' && input.constructor !== env.AST.ProgramNode)) {
                throw new Exception("You must pass a string or Handlebars AST to Handlebars.precompile. You passed " + input);
            }

            options = options || {};
            if (!('data' in options)) {
                options.data = true;
            }

            var ast = env.parse(input);
            var environment = new env.Compiler().compile(ast, options);
            return new env.JavaScriptCompiler().compile(environment, options);
        }

        __exports__.precompile = precompile; function compile(input, options, env) {
            if (input == null || (typeof input !== 'string' && input.constructor !== env.AST.ProgramNode)) {
                throw new Exception("You must pass a string or Handlebars AST to Handlebars.compile. You passed " + input);
            }

            options = options || {};

            if (!('data' in options)) {
                options.data = true;
            }

            var compiled;

            function compileInput() {
                var ast = env.parse(input);
                var environment = new env.Compiler().compile(ast, options);
                var templateSpec = new env.JavaScriptCompiler().compile(environment, options, undefined, true);
                return env.template(templateSpec);
            }

            // Template is only compiled on first use and cached after that point.
            return function (context, options) {
                if (!compiled) {
                    compiled = compileInput();
                }
                return compiled.call(this, context, options);
            };
        }

        __exports__.compile = compile;
        return __exports__;
    })(__module5__);

    // handlebars/compiler/javascript-compiler.js
    var __module11__ = (function (__dependency1__, __dependency2__) {
        "use strict";
        var __exports__;
        var COMPILER_REVISION = __dependency1__.COMPILER_REVISION;
        var REVISION_CHANGES = __dependency1__.REVISION_CHANGES;
        var log = __dependency1__.log;
        var Exception = __dependency2__;

        function Literal(value) {
            this.value = value;
        }

        function JavaScriptCompiler() { }

        JavaScriptCompiler.prototype = {
            // PUBLIC API: You can override these methods in a subclass to provide
            // alternative compiled forms for name lookup and buffering semantics
            nameLookup: function (parent, name /* , type*/) {
                var wrap,
                    ret;
                if (parent.indexOf('depth') === 0) {
                    wrap = true;
                }

                if (/^[0-9]+$/.test(name)) {
                    ret = parent + "[" + name + "]";
                } else if (JavaScriptCompiler.isValidJavaScriptVariableName(name)) {
                    ret = parent + "." + name;
                }
                else {
                    ret = parent + "['" + name + "']";
                }

                if (wrap) {
                    return '(' + parent + ' && ' + ret + ')';
                } else {
                    return ret;
                }
            },

            compilerInfo: function () {
                var revision = COMPILER_REVISION,
                    versions = REVISION_CHANGES[revision];
                return "this.compilerInfo = [" + revision + ",'" + versions + "'];\n";
            },

            appendToBuffer: function (string) {
                if (this.environment.isSimple) {
                    return "return " + string + ";";
                } else {
                    return {
                        appendToBuffer: true,
                        content: string,
                        toString: function () { return "buffer += " + string + ";"; }
                    };
                }
            },

            initializeBuffer: function () {
                return this.quotedString("");
            },

            namespace: "Handlebars",
            // END PUBLIC API

            compile: function (environment, options, context, asObject) {
                this.environment = environment;
                this.options = options || {};

                log('debug', this.environment.disassemble() + "\n\n");

                this.name = this.environment.name;
                this.isChild = !!context;
                this.context = context || {
                    programs: [],
                    environments: [],
                    aliases: {}
                };

                this.preamble();

                this.stackSlot = 0;
                this.stackVars = [];
                this.registers = { list: [] };
                this.hashes = [];
                this.compileStack = [];
                this.inlineStack = [];

                this.compileChildren(environment, options);

                var opcodes = environment.opcodes, opcode;

                this.i = 0;

                for (var l = opcodes.length; this.i < l; this.i++) {
                    opcode = opcodes[this.i];

                    if (opcode.opcode === 'DECLARE') {
                        this[opcode.name] = opcode.value;
                    } else {
                        this[opcode.opcode].apply(this, opcode.args);
                    }

                    // Reset the stripNext flag if it was not set by this operation.
                    if (opcode.opcode !== this.stripNext) {
                        this.stripNext = false;
                    }
                }

                // Flush any trailing content that might be pending.
                this.pushSource('');

                if (this.stackSlot || this.inlineStack.length || this.compileStack.length) {
                    throw new Exception('Compile completed with content left on stack');
                }

                return this.createFunctionContext(asObject);
            },

            preamble: function () {
                var out = [];

                if (!this.isChild) {
                    var namespace = this.namespace;

                    var copies = "helpers = this.merge(helpers, " + namespace + ".helpers);";
                    if (this.environment.usePartial) { copies = copies + " partials = this.merge(partials, " + namespace + ".partials);"; }
                    if (this.options.data) { copies = copies + " data = data || {};"; }
                    out.push(copies);
                } else {
                    out.push('');
                }

                if (!this.environment.isSimple) {
                    out.push(", buffer = " + this.initializeBuffer());
                } else {
                    out.push("");
                }

                // track the last context pushed into place to allow skipping the
                // getContext opcode when it would be a noop
                this.lastContext = 0;
                this.source = out;
            },

            createFunctionContext: function (asObject) {
                var locals = this.stackVars.concat(this.registers.list);

                if (locals.length > 0) {
                    this.source[1] = this.source[1] + ", " + locals.join(", ");
                }

                // Generate minimizer alias mappings
                if (!this.isChild) {
                    for (var alias in this.context.aliases) {
                        if (this.context.aliases.hasOwnProperty(alias)) {
                            this.source[1] = this.source[1] + ', ' + alias + '=' + this.context.aliases[alias];
                        }
                    }
                }

                if (this.source[1]) {
                    this.source[1] = "var " + this.source[1].substring(2) + ";";
                }

                // Merge children
                if (!this.isChild) {
                    this.source[1] += '\n' + this.context.programs.join('\n') + '\n';
                }

                if (!this.environment.isSimple) {
                    this.pushSource("return buffer;");
                }

                var params = this.isChild ? ["depth0", "data"] : ["Handlebars", "depth0", "helpers", "partials", "data"];

                for (var i = 0, l = this.environment.depths.list.length; i < l; i++) {
                    params.push("depth" + this.environment.depths.list[i]);
                }

                // Perform a second pass over the output to merge content when possible
                var source = this.mergeSource();

                if (!this.isChild) {
                    source = this.compilerInfo() + source;
                }

                if (asObject) {
                    params.push(source);

                    return Function.apply(this, params);
                } else {
                    var functionSource = 'function ' + (this.name || '') + '(' + params.join(',') + ') {\n  ' + source + '}';
                    log('debug', functionSource + "\n\n");
                    return functionSource;
                }
            },
            mergeSource: function () {
                // WARN: We are not handling the case where buffer is still populated as the source should
                // not have buffer append operations as their final action.
                var source = '',
                    buffer;
                for (var i = 0, len = this.source.length; i < len; i++) {
                    var line = this.source[i];
                    if (line.appendToBuffer) {
                        if (buffer) {
                            buffer = buffer + '\n    + ' + line.content;
                        } else {
                            buffer = line.content;
                        }
                    } else {
                        if (buffer) {
                            source += 'buffer += ' + buffer + ';\n  ';
                            buffer = undefined;
                        }
                        source += line + '\n  ';
                    }
                }
                return source;
            },

            // [blockValue]
            //
            // On stack, before: hash, inverse, program, value
            // On stack, after: return value of blockHelperMissing
            //
            // The purpose of this opcode is to take a block of the form
            // `{{#foo}}...{{/foo}}`, resolve the value of `foo`, and
            // replace it on the stack with the result of properly
            // invoking blockHelperMissing.
            blockValue: function () {
                this.context.aliases.blockHelperMissing = 'helpers.blockHelperMissing';

                var params = ["depth0"];
                this.setupParams(0, params);

                this.replaceStack(function (current) {
                    params.splice(1, 0, current);
                    return "blockHelperMissing.call(" + params.join(", ") + ")";
                });
            },

            // [ambiguousBlockValue]
            //
            // On stack, before: hash, inverse, program, value
            // Compiler value, before: lastHelper=value of last found helper, if any
            // On stack, after, if no lastHelper: same as [blockValue]
            // On stack, after, if lastHelper: value
            ambiguousBlockValue: function () {
                this.context.aliases.blockHelperMissing = 'helpers.blockHelperMissing';

                var params = ["depth0"];
                this.setupParams(0, params);

                var current = this.topStack();
                params.splice(1, 0, current);

                this.pushSource("if (!" + this.lastHelper + ") { " + current + " = blockHelperMissing.call(" + params.join(", ") + "); }");
            },

            // [appendContent]
            //
            // On stack, before: ...
            // On stack, after: ...
            //
            // Appends the string value of `content` to the current buffer
            appendContent: function (content) {
                if (this.pendingContent) {
                    content = this.pendingContent + content;
                }
                if (this.stripNext) {
                    content = content.replace(/^\s+/, '');
                }

                this.pendingContent = content;
            },

            // [strip]
            //
            // On stack, before: ...
            // On stack, after: ...
            //
            // Removes any trailing whitespace from the prior content node and flags
            // the next operation for stripping if it is a content node.
            strip: function () {
                if (this.pendingContent) {
                    this.pendingContent = this.pendingContent.replace(/\s+$/, '');
                }
                this.stripNext = 'strip';
            },

            // [append]
            //
            // On stack, before: value, ...
            // On stack, after: ...
            //
            // Coerces `value` to a String and appends it to the current buffer.
            //
            // If `value` is truthy, or 0, it is coerced into a string and appended
            // Otherwise, the empty string is appended
            append: function () {
                // Force anything that is inlined onto the stack so we don't have duplication
                // when we examine local
                this.flushInline();
                var local = this.popStack();
                this.pushSource("if(" + local + " || " + local + " === 0) { " + this.appendToBuffer(local) + " }");
                if (this.environment.isSimple) {
                    this.pushSource("else { " + this.appendToBuffer("''") + " }");
                }
            },

            // [appendEscaped]
            //
            // On stack, before: value, ...
            // On stack, after: ...
            //
            // Escape `value` and append it to the buffer
            appendEscaped: function () {
                this.context.aliases.escapeExpression = 'this.escapeExpression';

                this.pushSource(this.appendToBuffer("escapeExpression(" + this.popStack() + ")"));
            },

            // [getContext]
            //
            // On stack, before: ...
            // On stack, after: ...
            // Compiler value, after: lastContext=depth
            //
            // Set the value of the `lastContext` compiler value to the depth
            getContext: function (depth) {
                if (this.lastContext !== depth) {
                    this.lastContext = depth;
                }
            },

            // [lookupOnContext]
            //
            // On stack, before: ...
            // On stack, after: currentContext[name], ...
            //
            // Looks up the value of `name` on the current context and pushes
            // it onto the stack.
            lookupOnContext: function (name) {
                this.push(this.nameLookup('depth' + this.lastContext, name, 'context'));
            },

            // [pushContext]
            //
            // On stack, before: ...
            // On stack, after: currentContext, ...
            //
            // Pushes the value of the current context onto the stack.
            pushContext: function () {
                this.pushStackLiteral('depth' + this.lastContext);
            },

            // [resolvePossibleLambda]
            //
            // On stack, before: value, ...
            // On stack, after: resolved value, ...
            //
            // If the `value` is a lambda, replace it on the stack by
            // the return value of the lambda
            resolvePossibleLambda: function () {
                this.context.aliases.functionType = '"function"';

                this.replaceStack(function (current) {
                    return "typeof " + current + " === functionType ? " + current + ".apply(depth0) : " + current;
                });
            },

            // [lookup]
            //
            // On stack, before: value, ...
            // On stack, after: value[name], ...
            //
            // Replace the value on the stack with the result of looking
            // up `name` on `value`
            lookup: function (name) {
                this.replaceStack(function (current) {
                    return current + " == null || " + current + " === false ? " + current + " : " + this.nameLookup(current, name, 'context');
                });
            },

            // [lookupData]
            //
            // On stack, before: ...
            // On stack, after: data, ...
            //
            // Push the data lookup operator
            lookupData: function () {
                this.pushStackLiteral('data');
            },

            // [pushStringParam]
            //
            // On stack, before: ...
            // On stack, after: string, currentContext, ...
            //
            // This opcode is designed for use in string mode, which
            // provides the string value of a parameter along with its
            // depth rather than resolving it immediately.
            pushStringParam: function (string, type) {
                this.pushStackLiteral('depth' + this.lastContext);

                this.pushString(type);

                // If it's a subexpression, the string result
                // will be pushed after this opcode.
                if (type !== 'sexpr') {
                    if (typeof string === 'string') {
                        this.pushString(string);
                    } else {
                        this.pushStackLiteral(string);
                    }
                }
            },

            emptyHash: function () {
                this.pushStackLiteral('{}');

                if (this.options.stringParams) {
                    this.push('{}'); // hashContexts
                    this.push('{}'); // hashTypes
                }
            },
            pushHash: function () {
                if (this.hash) {
                    this.hashes.push(this.hash);
                }
                this.hash = { values: [], types: [], contexts: [] };
            },
            popHash: function () {
                var hash = this.hash;
                this.hash = this.hashes.pop();

                if (this.options.stringParams) {
                    this.push('{' + hash.contexts.join(',') + '}');
                    this.push('{' + hash.types.join(',') + '}');
                }

                this.push('{\n    ' + hash.values.join(',\n    ') + '\n  }');
            },

            // [pushString]
            //
            // On stack, before: ...
            // On stack, after: quotedString(string), ...
            //
            // Push a quoted version of `string` onto the stack
            pushString: function (string) {
                this.pushStackLiteral(this.quotedString(string));
            },

            // [push]
            //
            // On stack, before: ...
            // On stack, after: expr, ...
            //
            // Push an expression onto the stack
            push: function (expr) {
                this.inlineStack.push(expr);
                return expr;
            },

            // [pushLiteral]
            //
            // On stack, before: ...
            // On stack, after: value, ...
            //
            // Pushes a value onto the stack. This operation prevents
            // the compiler from creating a temporary variable to hold
            // it.
            pushLiteral: function (value) {
                this.pushStackLiteral(value);
            },

            // [pushProgram]
            //
            // On stack, before: ...
            // On stack, after: program(guid), ...
            //
            // Push a program expression onto the stack. This takes
            // a compile-time guid and converts it into a runtime-accessible
            // expression.
            pushProgram: function (guid) {
                if (guid != null) {
                    this.pushStackLiteral(this.programExpression(guid));
                } else {
                    this.pushStackLiteral(null);
                }
            },

            // [invokeHelper]
            //
            // On stack, before: hash, inverse, program, params..., ...
            // On stack, after: result of helper invocation
            //
            // Pops off the helper's parameters, invokes the helper,
            // and pushes the helper's return value onto the stack.
            //
            // If the helper is not found, `helperMissing` is called.
            invokeHelper: function (paramSize, name, isRoot) {
                this.context.aliases.helperMissing = 'helpers.helperMissing';
                this.useRegister('helper');

                var helper = this.lastHelper = this.setupHelper(paramSize, name, true);
                var nonHelper = this.nameLookup('depth' + this.lastContext, name, 'context');

                var lookup = 'helper = ' + helper.name + ' || ' + nonHelper;
                if (helper.paramsInit) {
                    lookup += ',' + helper.paramsInit;
                }

                this.push(
                  '('
                    + lookup
                    + ',helper '
                      + '? helper.call(' + helper.callParams + ') '
                      + ': helperMissing.call(' + helper.helperMissingParams + '))');

                // Always flush subexpressions. This is both to prevent the compounding size issue that
                // occurs when the code has to be duplicated for inlining and also to prevent errors
                // due to the incorrect options object being passed due to the shared register.
                if (!isRoot) {
                    this.flushInline();
                }
            },

            // [invokeKnownHelper]
            //
            // On stack, before: hash, inverse, program, params..., ...
            // On stack, after: result of helper invocation
            //
            // This operation is used when the helper is known to exist,
            // so a `helperMissing` fallback is not required.
            invokeKnownHelper: function (paramSize, name) {
                var helper = this.setupHelper(paramSize, name);
                this.push(helper.name + ".call(" + helper.callParams + ")");
            },

            // [invokeAmbiguous]
            //
            // On stack, before: hash, inverse, program, params..., ...
            // On stack, after: result of disambiguation
            //
            // This operation is used when an expression like `{{foo}}`
            // is provided, but we don't know at compile-time whether it
            // is a helper or a path.
            //
            // This operation emits more code than the other options,
            // and can be avoided by passing the `knownHelpers` and
            // `knownHelpersOnly` flags at compile-time.
            invokeAmbiguous: function (name, helperCall) {
                this.context.aliases.functionType = '"function"';
                this.useRegister('helper');

                this.emptyHash();
                var helper = this.setupHelper(0, name, helperCall);

                var helperName = this.lastHelper = this.nameLookup('helpers', name, 'helper');

                var nonHelper = this.nameLookup('depth' + this.lastContext, name, 'context');
                var nextStack = this.nextStack();

                if (helper.paramsInit) {
                    this.pushSource(helper.paramsInit);
                }
                this.pushSource('if (helper = ' + helperName + ') { ' + nextStack + ' = helper.call(' + helper.callParams + '); }');
                this.pushSource('else { helper = ' + nonHelper + '; ' + nextStack + ' = typeof helper === functionType ? helper.call(' + helper.callParams + ') : helper; }');
            },

            // [invokePartial]
            //
            // On stack, before: context, ...
            // On stack after: result of partial invocation
            //
            // This operation pops off a context, invokes a partial with that context,
            // and pushes the result of the invocation back.
            invokePartial: function (name) {
                var params = [this.nameLookup('partials', name, 'partial'), "'" + name + "'", this.popStack(), "helpers", "partials"];

                if (this.options.data) {
                    params.push("data");
                }

                this.context.aliases.self = "this";
                this.push("self.invokePartial(" + params.join(", ") + ")");
            },

            // [assignToHash]
            //
            // On stack, before: value, hash, ...
            // On stack, after: hash, ...
            //
            // Pops a value and hash off the stack, assigns `hash[key] = value`
            // and pushes the hash back onto the stack.
            assignToHash: function (key) {
                var value = this.popStack(),
                    context,
                    type;

                if (this.options.stringParams) {
                    type = this.popStack();
                    context = this.popStack();
                }

                var hash = this.hash;
                if (context) {
                    hash.contexts.push("'" + key + "': " + context);
                }
                if (type) {
                    hash.types.push("'" + key + "': " + type);
                }
                hash.values.push("'" + key + "': (" + value + ")");
            },

            // HELPERS

            compiler: JavaScriptCompiler,

            compileChildren: function (environment, options) {
                var children = environment.children, child, compiler;

                for (var i = 0, l = children.length; i < l; i++) {
                    child = children[i];
                    compiler = new this.compiler();

                    var index = this.matchExistingProgram(child);

                    if (index == null) {
                        this.context.programs.push('');     // Placeholder to prevent name conflicts for nested children
                        index = this.context.programs.length;
                        child.index = index;
                        child.name = 'program' + index;
                        this.context.programs[index] = compiler.compile(child, options, this.context);
                        this.context.environments[index] = child;
                    } else {
                        child.index = index;
                        child.name = 'program' + index;
                    }
                }
            },
            matchExistingProgram: function (child) {
                for (var i = 0, len = this.context.environments.length; i < len; i++) {
                    var environment = this.context.environments[i];
                    if (environment && environment.equals(child)) {
                        return i;
                    }
                }
            },

            programExpression: function (guid) {
                this.context.aliases.self = "this";

                if (guid == null) {
                    return "self.noop";
                }

                var child = this.environment.children[guid],
                    depths = child.depths.list, depth;

                var programParams = [child.index, child.name, "data"];

                for (var i = 0, l = depths.length; i < l; i++) {
                    depth = depths[i];

                    if (depth === 1) { programParams.push("depth0"); }
                    else { programParams.push("depth" + (depth - 1)); }
                }

                return (depths.length === 0 ? "self.program(" : "self.programWithDepth(") + programParams.join(", ") + ")";
            },

            register: function (name, val) {
                this.useRegister(name);
                this.pushSource(name + " = " + val + ";");
            },

            useRegister: function (name) {
                if (!this.registers[name]) {
                    this.registers[name] = true;
                    this.registers.list.push(name);
                }
            },

            pushStackLiteral: function (item) {
                return this.push(new Literal(item));
            },

            pushSource: function (source) {
                if (this.pendingContent) {
                    this.source.push(this.appendToBuffer(this.quotedString(this.pendingContent)));
                    this.pendingContent = undefined;
                }

                if (source) {
                    this.source.push(source);
                }
            },

            pushStack: function (item) {
                this.flushInline();

                var stack = this.incrStack();
                if (item) {
                    this.pushSource(stack + " = " + item + ";");
                }
                this.compileStack.push(stack);
                return stack;
            },

            replaceStack: function (callback) {
                var prefix = '',
                    inline = this.isInline(),
                    stack,
                    createdStack,
                    usedLiteral;

                // If we are currently inline then we want to merge the inline statement into the
                // replacement statement via ','
                if (inline) {
                    var top = this.popStack(true);

                    if (top instanceof Literal) {
                        // Literals do not need to be inlined
                        stack = top.value;
                        usedLiteral = true;
                    } else {
                        // Get or create the current stack name for use by the inline
                        createdStack = !this.stackSlot;
                        var name = !createdStack ? this.topStackName() : this.incrStack();

                        prefix = '(' + this.push(name) + ' = ' + top + '),';
                        stack = this.topStack();
                    }
                } else {
                    stack = this.topStack();
                }

                var item = callback.call(this, stack);

                if (inline) {
                    if (!usedLiteral) {
                        this.popStack();
                    }
                    if (createdStack) {
                        this.stackSlot--;
                    }
                    this.push('(' + prefix + item + ')');
                } else {
                    // Prevent modification of the context depth variable. Through replaceStack
                    if (!/^stack/.test(stack)) {
                        stack = this.nextStack();
                    }

                    this.pushSource(stack + " = (" + prefix + item + ");");
                }
                return stack;
            },

            nextStack: function () {
                return this.pushStack();
            },

            incrStack: function () {
                this.stackSlot++;
                if (this.stackSlot > this.stackVars.length) { this.stackVars.push("stack" + this.stackSlot); }
                return this.topStackName();
            },
            topStackName: function () {
                return "stack" + this.stackSlot;
            },
            flushInline: function () {
                var inlineStack = this.inlineStack;
                if (inlineStack.length) {
                    this.inlineStack = [];
                    for (var i = 0, len = inlineStack.length; i < len; i++) {
                        var entry = inlineStack[i];
                        if (entry instanceof Literal) {
                            this.compileStack.push(entry);
                        } else {
                            this.pushStack(entry);
                        }
                    }
                }
            },
            isInline: function () {
                return this.inlineStack.length;
            },

            popStack: function (wrapped) {
                var inline = this.isInline(),
                    item = (inline ? this.inlineStack : this.compileStack).pop();

                if (!wrapped && (item instanceof Literal)) {
                    return item.value;
                } else {
                    if (!inline) {
                        if (!this.stackSlot) {
                            throw new Exception('Invalid stack pop');
                        }
                        this.stackSlot--;
                    }
                    return item;
                }
            },

            topStack: function (wrapped) {
                var stack = (this.isInline() ? this.inlineStack : this.compileStack),
                    item = stack[stack.length - 1];

                if (!wrapped && (item instanceof Literal)) {
                    return item.value;
                } else {
                    return item;
                }
            },

            quotedString: function (str) {
                return '"' + str
                  .replace(/\\/g, '\\\\')
                  .replace(/"/g, '\\"')
                  .replace(/\n/g, '\\n')
                  .replace(/\r/g, '\\r')
                  .replace(/\u2028/g, '\\u2028')   // Per Ecma-262 7.3 + 7.8.4
                  .replace(/\u2029/g, '\\u2029') + '"';
            },

            setupHelper: function (paramSize, name, missingParams) {
                var params = [],
                    paramsInit = this.setupParams(paramSize, params, missingParams);
                var foundHelper = this.nameLookup('helpers', name, 'helper');

                return {
                    params: params,
                    paramsInit: paramsInit,
                    name: foundHelper,
                    callParams: ["depth0"].concat(params).join(", "),
                    helperMissingParams: missingParams && ["depth0", this.quotedString(name)].concat(params).join(", ")
                };
            },

            setupOptions: function (paramSize, params) {
                var options = [], contexts = [], types = [], param, inverse, program;

                options.push("hash:" + this.popStack());

                if (this.options.stringParams) {
                    options.push("hashTypes:" + this.popStack());
                    options.push("hashContexts:" + this.popStack());
                }

                inverse = this.popStack();
                program = this.popStack();

                // Avoid setting fn and inverse if neither are set. This allows
                // helpers to do a check for `if (options.fn)`
                if (program || inverse) {
                    if (!program) {
                        this.context.aliases.self = "this";
                        program = "self.noop";
                    }

                    if (!inverse) {
                        this.context.aliases.self = "this";
                        inverse = "self.noop";
                    }

                    options.push("inverse:" + inverse);
                    options.push("fn:" + program);
                }

                for (var i = 0; i < paramSize; i++) {
                    param = this.popStack();
                    params.push(param);

                    if (this.options.stringParams) {
                        types.push(this.popStack());
                        contexts.push(this.popStack());
                    }
                }

                if (this.options.stringParams) {
                    options.push("contexts:[" + contexts.join(",") + "]");
                    options.push("types:[" + types.join(",") + "]");
                }

                if (this.options.data) {
                    options.push("data:data");
                }

                return options;
            },

            // the params and contexts arguments are passed in arrays
            // to fill in
            setupParams: function (paramSize, params, useRegister) {
                var options = '{' + this.setupOptions(paramSize, params).join(',') + '}';

                if (useRegister) {
                    this.useRegister('options');
                    params.push('options');
                    return 'options=' + options;
                } else {
                    params.push(options);
                    return '';
                }
            }
        };

        var reservedWords = (
          "break else new var" +
          " case finally return void" +
          " catch for switch while" +
          " continue function this with" +
          " default if throw" +
          " delete in try" +
          " do instanceof typeof" +
          " abstract enum int short" +
          " boolean export interface static" +
          " byte extends long super" +
          " char final native synchronized" +
          " class float package throws" +
          " const goto private transient" +
          " debugger implements protected volatile" +
          " double import public let yield"
        ).split(" ");

        var compilerWords = JavaScriptCompiler.RESERVED_WORDS = {};

        for (var i = 0, l = reservedWords.length; i < l; i++) {
            compilerWords[reservedWords[i]] = true;
        }

        JavaScriptCompiler.isValidJavaScriptVariableName = function (name) {
            if (!JavaScriptCompiler.RESERVED_WORDS[name] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(name)) {
                return true;
            }
            return false;
        };

        __exports__ = JavaScriptCompiler;
        return __exports__;
    })(__module2__, __module5__);

    // handlebars.js
    var __module0__ = (function (__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__) {
        "use strict";
        var __exports__;
        /*globals Handlebars: true */
        var Handlebars = __dependency1__;

        // Compiler imports
        var AST = __dependency2__;
        var Parser = __dependency3__.parser;
        var parse = __dependency3__.parse;
        var Compiler = __dependency4__.Compiler;
        var compile = __dependency4__.compile;
        var precompile = __dependency4__.precompile;
        var JavaScriptCompiler = __dependency5__;

        var _create = Handlebars.create;
        var create = function () {
            var hb = _create();

            hb.compile = function (input, options) {
                return compile(input, options, hb);
            };
            hb.precompile = function (input, options) {
                return precompile(input, options, hb);
            };

            hb.AST = AST;
            hb.Compiler = Compiler;
            hb.JavaScriptCompiler = JavaScriptCompiler;
            hb.Parser = Parser;
            hb.parse = parse;

            return hb;
        };

        Handlebars = create();
        Handlebars.create = create;

        __exports__ = Handlebars;
        return __exports__;
    })(__module1__, __module7__, __module8__, __module10__, __module11__);

    return __module0__;
})();

/**
 * marked - a markdown parser
 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/chjj/marked
 */
(function(){var block={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:noop,hr:/^( *[-*_]){3,} *(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,nptable:noop,lheading:/^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,blockquote:/^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,list:/^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:/^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,table:noop,paragraph:/^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,text:/^[^\n]+/};block.bullet=/(?:[*+-]|\d+\.)/;block.item=/^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;block.item=replace(block.item,"gm")(/bull/g,block.bullet)();block.list=replace(block.list)(/bull/g,block.bullet)("hr","\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))")("def","\\n+(?="+block.def.source+")")();block.blockquote=replace(block.blockquote)("def",block.def)();block._tag="(?!(?:"+"a|em|strong|small|s|cite|q|dfn|abbr|data|time|code"+"|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo"+"|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b";block.html=replace(block.html)("comment",/<!--[\s\S]*?-->/)("closed",/<(tag)[\s\S]+?<\/\1>/)("closing",/<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g,block._tag)();block.paragraph=replace(block.paragraph)("hr",block.hr)("heading",block.heading)("lheading",block.lheading)("blockquote",block.blockquote)("tag","<"+block._tag)("def",block.def)();block.normal=merge({},block);block.gfm=merge({},block.normal,{fences:/^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,paragraph:/^/,heading:/^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/});block.gfm.paragraph=replace(block.paragraph)("(?!","(?!"+block.gfm.fences.source.replace("\\1","\\2")+"|"+block.list.source.replace("\\1","\\3")+"|")();block.tables=merge({},block.gfm,{nptable:/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,table:/^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/});function Lexer(options){this.tokens=[];this.tokens.links={};this.options=options||marked.defaults;this.rules=block.normal;if(this.options.gfm){if(this.options.tables){this.rules=block.tables}else{this.rules=block.gfm}}}Lexer.rules=block;Lexer.lex=function(src,options){var lexer=new Lexer(options);return lexer.lex(src)};Lexer.prototype.lex=function(src){src=src.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    ").replace(/\u00a0/g," ").replace(/\u2424/g,"\n");return this.token(src,true)};Lexer.prototype.token=function(src,top,bq){var src=src.replace(/^ +$/gm,""),next,loose,cap,bull,b,item,space,i,l;while(src){if(cap=this.rules.newline.exec(src)){src=src.substring(cap[0].length);if(cap[0].length>1){this.tokens.push({type:"space"})}}if(cap=this.rules.code.exec(src)){src=src.substring(cap[0].length);cap=cap[0].replace(/^ {4}/gm,"");this.tokens.push({type:"code",text:!this.options.pedantic?cap.replace(/\n+$/,""):cap});continue}if(cap=this.rules.fences.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"code",lang:cap[2],text:cap[3]||""});continue}if(cap=this.rules.heading.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"heading",depth:cap[1].length,text:cap[2]});continue}if(top&&(cap=this.rules.nptable.exec(src))){src=src.substring(cap[0].length);item={type:"table",header:cap[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:cap[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:cap[3].replace(/\n$/,"").split("\n")};for(i=0;i<item.align.length;i++){if(/^ *-+: *$/.test(item.align[i])){item.align[i]="right"}else if(/^ *:-+: *$/.test(item.align[i])){item.align[i]="center"}else if(/^ *:-+ *$/.test(item.align[i])){item.align[i]="left"}else{item.align[i]=null}}for(i=0;i<item.cells.length;i++){item.cells[i]=item.cells[i].split(/ *\| */)}this.tokens.push(item);continue}if(cap=this.rules.lheading.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"heading",depth:cap[2]==="="?1:2,text:cap[1]});continue}if(cap=this.rules.hr.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"hr"});continue}if(cap=this.rules.blockquote.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"blockquote_start"});cap=cap[0].replace(/^ *> ?/gm,"");this.token(cap,top,true);this.tokens.push({type:"blockquote_end"});continue}if(cap=this.rules.list.exec(src)){src=src.substring(cap[0].length);bull=cap[2];this.tokens.push({type:"list_start",ordered:bull.length>1});cap=cap[0].match(this.rules.item);next=false;l=cap.length;i=0;for(;i<l;i++){item=cap[i];space=item.length;item=item.replace(/^ *([*+-]|\d+\.) +/,"");if(~item.indexOf("\n ")){space-=item.length;item=!this.options.pedantic?item.replace(new RegExp("^ {1,"+space+"}","gm"),""):item.replace(/^ {1,4}/gm,"")}if(this.options.smartLists&&i!==l-1){b=block.bullet.exec(cap[i+1])[0];if(bull!==b&&!(bull.length>1&&b.length>1)){src=cap.slice(i+1).join("\n")+src;i=l-1}}loose=next||/\n\n(?!\s*$)/.test(item);if(i!==l-1){next=item.charAt(item.length-1)==="\n";if(!loose)loose=next}this.tokens.push({type:loose?"loose_item_start":"list_item_start"});this.token(item,false,bq);this.tokens.push({type:"list_item_end"})}this.tokens.push({type:"list_end"});continue}if(cap=this.rules.html.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:!this.options.sanitizer&&(cap[1]==="pre"||cap[1]==="script"||cap[1]==="style"),text:cap[0]});continue}if(!bq&&top&&(cap=this.rules.def.exec(src))){src=src.substring(cap[0].length);this.tokens.links[cap[1].toLowerCase()]={href:cap[2],title:cap[3]};continue}if(top&&(cap=this.rules.table.exec(src))){src=src.substring(cap[0].length);item={type:"table",header:cap[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:cap[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:cap[3].replace(/(?: *\| *)?\n$/,"").split("\n")};for(i=0;i<item.align.length;i++){if(/^ *-+: *$/.test(item.align[i])){item.align[i]="right"}else if(/^ *:-+: *$/.test(item.align[i])){item.align[i]="center"}else if(/^ *:-+ *$/.test(item.align[i])){item.align[i]="left"}else{item.align[i]=null}}for(i=0;i<item.cells.length;i++){item.cells[i]=item.cells[i].replace(/^ *\| *| *\| *$/g,"").split(/ *\| */)}this.tokens.push(item);continue}if(top&&(cap=this.rules.paragraph.exec(src))){src=src.substring(cap[0].length);this.tokens.push({type:"paragraph",text:cap[1].charAt(cap[1].length-1)==="\n"?cap[1].slice(0,-1):cap[1]});continue}if(cap=this.rules.text.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"text",text:cap[0]});continue}if(src){throw new Error("Infinite loop on byte: "+src.charCodeAt(0))}}return this.tokens};var inline={escape:/^\\([\\`*{}\[\]()#+\-.!_>])/,autolink:/^<([^ >]+(@|:\/)[^ >]+)>/,url:noop,tag:/^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,link:/^!?\[(inside)\]\(href\)/,reflink:/^!?\[(inside)\]\s*\[([^\]]*)\]/,nolink:/^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,strong:/^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,em:/^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,code:/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,br:/^ {2,}\n(?!\s*$)/,del:noop,text:/^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/};inline._inside=/(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;inline._href=/\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;inline.link=replace(inline.link)("inside",inline._inside)("href",inline._href)();inline.reflink=replace(inline.reflink)("inside",inline._inside)();inline.normal=merge({},inline);inline.pedantic=merge({},inline.normal,{strong:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/});inline.gfm=merge({},inline.normal,{escape:replace(inline.escape)("])","~|])")(),url:/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,del:/^~~(?=\S)([\s\S]*?\S)~~/,text:replace(inline.text)("]|","~]|")("|","|https?://|")()});inline.breaks=merge({},inline.gfm,{br:replace(inline.br)("{2,}","*")(),text:replace(inline.gfm.text)("{2,}","*")()});function InlineLexer(links,options){this.options=options||marked.defaults;this.links=links;this.rules=inline.normal;this.renderer=this.options.renderer||new Renderer;this.renderer.options=this.options;if(!this.links){throw new Error("Tokens array requires a `links` property.")}if(this.options.gfm){if(this.options.breaks){this.rules=inline.breaks}else{this.rules=inline.gfm}}else if(this.options.pedantic){this.rules=inline.pedantic}}InlineLexer.rules=inline;InlineLexer.output=function(src,links,options){var inline=new InlineLexer(links,options);return inline.output(src)};InlineLexer.prototype.output=function(src){var out="",link,text,href,cap;while(src){if(cap=this.rules.escape.exec(src)){src=src.substring(cap[0].length);out+=cap[1];continue}if(cap=this.rules.autolink.exec(src)){src=src.substring(cap[0].length);if(cap[2]==="@"){text=cap[1].charAt(6)===":"?this.mangle(cap[1].substring(7)):this.mangle(cap[1]);href=this.mangle("mailto:")+text}else{text=escape(cap[1]);href=text}out+=this.renderer.link(href,null,text);continue}if(!this.inLink&&(cap=this.rules.url.exec(src))){src=src.substring(cap[0].length);text=escape(cap[1]);href=text;out+=this.renderer.link(href,null,text);continue}if(cap=this.rules.tag.exec(src)){if(!this.inLink&&/^<a /i.test(cap[0])){this.inLink=true}else if(this.inLink&&/^<\/a>/i.test(cap[0])){this.inLink=false}src=src.substring(cap[0].length);out+=this.options.sanitize?this.options.sanitizer?this.options.sanitizer(cap[0]):escape(cap[0]):cap[0];continue}if(cap=this.rules.link.exec(src)){src=src.substring(cap[0].length);this.inLink=true;out+=this.outputLink(cap,{href:cap[2],title:cap[3]});this.inLink=false;continue}if((cap=this.rules.reflink.exec(src))||(cap=this.rules.nolink.exec(src))){src=src.substring(cap[0].length);link=(cap[2]||cap[1]).replace(/\s+/g," ");link=this.links[link.toLowerCase()];if(!link||!link.href){out+=cap[0].charAt(0);src=cap[0].substring(1)+src;continue}this.inLink=true;out+=this.outputLink(cap,link);this.inLink=false;continue}if(cap=this.rules.strong.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.strong(this.output(cap[2]||cap[1]));continue}if(cap=this.rules.em.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.em(this.output(cap[2]||cap[1]));continue}if(cap=this.rules.code.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.codespan(escape(cap[2],true));continue}if(cap=this.rules.br.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.br();continue}if(cap=this.rules.del.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.del(this.output(cap[1]));continue}if(cap=this.rules.text.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.text(escape(this.smartypants(cap[0])));continue}if(src){throw new Error("Infinite loop on byte: "+src.charCodeAt(0))}}return out};InlineLexer.prototype.outputLink=function(cap,link){var href=escape(link.href),title=link.title?escape(link.title):null;return cap[0].charAt(0)!=="!"?this.renderer.link(href,title,this.output(cap[1])):this.renderer.image(href,title,escape(cap[1]))};InlineLexer.prototype.smartypants=function(text){if(!this.options.smartypants)return text;return text.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…")};InlineLexer.prototype.mangle=function(text){if(!this.options.mangle)return text;var out="",l=text.length,i=0,ch;for(;i<l;i++){ch=text.charCodeAt(i);if(Math.random()>.5){ch="x"+ch.toString(16)}out+="&#"+ch+";"}return out};function Renderer(options){this.options=options||{}}Renderer.prototype.code=function(code,lang,escaped){if(this.options.highlight){var out=this.options.highlight(code,lang);if(out!=null&&out!==code){escaped=true;code=out}}if(!lang){return"<pre><code>"+(escaped?code:escape(code,true))+"\n</code></pre>"}return'<pre><code class="'+this.options.langPrefix+escape(lang,true)+'">'+(escaped?code:escape(code,true))+"\n</code></pre>\n"};Renderer.prototype.blockquote=function(quote){return"<blockquote>\n"+quote+"</blockquote>\n"};Renderer.prototype.html=function(html){return html};Renderer.prototype.heading=function(text,level,raw){return"<h"+level+' id="'+this.options.headerPrefix+raw.toLowerCase().replace(/[^\w]+/g,"-")+'">'+text+"</h"+level+">\n"};Renderer.prototype.hr=function(){return this.options.xhtml?"<hr/>\n":"<hr>\n"};Renderer.prototype.list=function(body,ordered){var type=ordered?"ol":"ul";return"<"+type+">\n"+body+"</"+type+">\n"};Renderer.prototype.listitem=function(text){return"<li>"+text+"</li>\n"};Renderer.prototype.paragraph=function(text){return"<p>"+text+"</p>\n"};Renderer.prototype.table=function(header,body){return"<table>\n"+"<thead>\n"+header+"</thead>\n"+"<tbody>\n"+body+"</tbody>\n"+"</table>\n"};Renderer.prototype.tablerow=function(content){return"<tr>\n"+content+"</tr>\n"};Renderer.prototype.tablecell=function(content,flags){var type=flags.header?"th":"td";var tag=flags.align?"<"+type+' style="text-align:'+flags.align+'">':"<"+type+">";return tag+content+"</"+type+">\n"};Renderer.prototype.strong=function(text){return"<strong>"+text+"</strong>"};Renderer.prototype.em=function(text){return"<em>"+text+"</em>"};Renderer.prototype.codespan=function(text){return"<code>"+text+"</code>"};Renderer.prototype.br=function(){return this.options.xhtml?"<br/>":"<br>"};Renderer.prototype.del=function(text){return"<del>"+text+"</del>"};Renderer.prototype.link=function(href,title,text){if(this.options.sanitize){try{var prot=decodeURIComponent(unescape(href)).replace(/[^\w:]/g,"").toLowerCase()}catch(e){return""}if(prot.indexOf("javascript:")===0||prot.indexOf("vbscript:")===0){return""}}var out='<a href="'+href+'"';if(title){out+=' title="'+title+'"'}out+=">"+text+"</a>";return out};Renderer.prototype.image=function(href,title,text){var out='<img src="'+href+'" alt="'+text+'"';if(title){out+=' title="'+title+'"'}out+=this.options.xhtml?"/>":">";return out};Renderer.prototype.text=function(text){return text};function Parser(options){this.tokens=[];this.token=null;this.options=options||marked.defaults;this.options.renderer=this.options.renderer||new Renderer;this.renderer=this.options.renderer;this.renderer.options=this.options}Parser.parse=function(src,options,renderer){var parser=new Parser(options,renderer);return parser.parse(src)};Parser.prototype.parse=function(src){this.inline=new InlineLexer(src.links,this.options,this.renderer);this.tokens=src.reverse();var out="";while(this.next()){out+=this.tok()}return out};Parser.prototype.next=function(){return this.token=this.tokens.pop()};Parser.prototype.peek=function(){return this.tokens[this.tokens.length-1]||0};Parser.prototype.parseText=function(){var body=this.token.text;while(this.peek().type==="text"){body+="\n"+this.next().text}return this.inline.output(body)};Parser.prototype.tok=function(){switch(this.token.type){case"space":{return""}case"hr":{return this.renderer.hr()}case"heading":{return this.renderer.heading(this.inline.output(this.token.text),this.token.depth,this.token.text)}case"code":{return this.renderer.code(this.token.text,this.token.lang,this.token.escaped)}case"table":{var header="",body="",i,row,cell,flags,j;cell="";for(i=0;i<this.token.header.length;i++){flags={header:true,align:this.token.align[i]};cell+=this.renderer.tablecell(this.inline.output(this.token.header[i]),{header:true,align:this.token.align[i]})}header+=this.renderer.tablerow(cell);for(i=0;i<this.token.cells.length;i++){row=this.token.cells[i];cell="";for(j=0;j<row.length;j++){cell+=this.renderer.tablecell(this.inline.output(row[j]),{header:false,align:this.token.align[j]})}body+=this.renderer.tablerow(cell)}return this.renderer.table(header,body)}case"blockquote_start":{var body="";while(this.next().type!=="blockquote_end"){body+=this.tok()}return this.renderer.blockquote(body)}case"list_start":{var body="",ordered=this.token.ordered;while(this.next().type!=="list_end"){body+=this.tok()}return this.renderer.list(body,ordered)}case"list_item_start":{var body="";while(this.next().type!=="list_item_end"){body+=this.token.type==="text"?this.parseText():this.tok()}return this.renderer.listitem(body)}case"loose_item_start":{var body="";while(this.next().type!=="list_item_end"){body+=this.tok()}return this.renderer.listitem(body)}case"html":{var html=!this.token.pre&&!this.options.pedantic?this.inline.output(this.token.text):this.token.text;return this.renderer.html(html)}case"paragraph":{return this.renderer.paragraph(this.inline.output(this.token.text))}case"text":{return this.renderer.paragraph(this.parseText())}}};function escape(html,encode){return html.replace(!encode?/&(?!#?\w+;)/g:/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function unescape(html){return html.replace(/&([#\w]+);/g,function(_,n){n=n.toLowerCase();if(n==="colon")return":";if(n.charAt(0)==="#"){return n.charAt(1)==="x"?String.fromCharCode(parseInt(n.substring(2),16)):String.fromCharCode(+n.substring(1))}return""})}function replace(regex,opt){regex=regex.source;opt=opt||"";return function self(name,val){if(!name)return new RegExp(regex,opt);val=val.source||val;val=val.replace(/(^|[^\[])\^/g,"$1");regex=regex.replace(name,val);return self}}function noop(){}noop.exec=noop;function merge(obj){var i=1,target,key;for(;i<arguments.length;i++){target=arguments[i];for(key in target){if(Object.prototype.hasOwnProperty.call(target,key)){obj[key]=target[key]}}}return obj}function marked(src,opt,callback){if(callback||typeof opt==="function"){if(!callback){callback=opt;opt=null}opt=merge({},marked.defaults,opt||{});var highlight=opt.highlight,tokens,pending,i=0;try{tokens=Lexer.lex(src,opt)}catch(e){return callback(e)}pending=tokens.length;var done=function(err){if(err){opt.highlight=highlight;return callback(err)}var out;try{out=Parser.parse(tokens,opt)}catch(e){err=e}opt.highlight=highlight;return err?callback(err):callback(null,out)};if(!highlight||highlight.length<3){return done()}delete opt.highlight;if(!pending)return done();for(;i<tokens.length;i++){(function(token){if(token.type!=="code"){return--pending||done()}return highlight(token.text,token.lang,function(err,code){if(err)return done(err);if(code==null||code===token.text){return--pending||done()}token.text=code;token.escaped=true;--pending||done()})})(tokens[i])}return}try{if(opt)opt=merge({},marked.defaults,opt);return Parser.parse(Lexer.lex(src,opt),opt)}catch(e){e.message+="\nPlease report this to https://github.com/chjj/marked.";if((opt||marked.defaults).silent){return"<p>An error occured:</p><pre>"+escape(e.message+"",true)+"</pre>"}throw e}}marked.options=marked.setOptions=function(opt){merge(marked.defaults,opt);return marked};marked.defaults={gfm:true,tables:true,breaks:false,pedantic:false,sanitize:false,sanitizer:null,mangle:true,smartLists:false,silent:false,highlight:null,langPrefix:"lang-",smartypants:false,headerPrefix:"",renderer:new Renderer,xhtml:false};marked.Parser=Parser;marked.parser=Parser.parse;marked.Renderer=Renderer;marked.Lexer=Lexer;marked.lexer=Lexer.lex;marked.InlineLexer=InlineLexer;marked.inlineLexer=InlineLexer.output;marked.parse=marked;if(typeof module!=="undefined"&&typeof exports==="object"){module.exports=marked}else if(typeof define==="function"&&define.amd){define(function(){return marked})}else{this.marked=marked}}).call(function(){return this||(typeof window!=="undefined"?window:global)}());
//! moment.js
//! version : 2.17.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
!function(a,b){"object"==typeof exports&&"undefined"!=typeof module?module.exports=b():"function"==typeof define&&define.amd?define(b):a.moment=b()}(this,function(){"use strict";function a(){return od.apply(null,arguments)}
// This is done to register the method called with moment()
// without creating circular dependencies.
function b(a){od=a}function c(a){return a instanceof Array||"[object Array]"===Object.prototype.toString.call(a)}function d(a){
// IE8 will treat undefined and null as object if it wasn't for
// input != null
return null!=a&&"[object Object]"===Object.prototype.toString.call(a)}function e(a){var b;for(b in a)
// even if its not own property I'd still call it non-empty
return!1;return!0}function f(a){return"number"==typeof a||"[object Number]"===Object.prototype.toString.call(a)}function g(a){return a instanceof Date||"[object Date]"===Object.prototype.toString.call(a)}function h(a,b){var c,d=[];for(c=0;c<a.length;++c)d.push(b(a[c],c));return d}function i(a,b){return Object.prototype.hasOwnProperty.call(a,b)}function j(a,b){for(var c in b)i(b,c)&&(a[c]=b[c]);return i(b,"toString")&&(a.toString=b.toString),i(b,"valueOf")&&(a.valueOf=b.valueOf),a}function k(a,b,c,d){return rb(a,b,c,d,!0).utc()}function l(){
// We need to deep clone this object.
return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1,parsedDateParts:[],meridiem:null}}function m(a){return null==a._pf&&(a._pf=l()),a._pf}function n(a){if(null==a._isValid){var b=m(a),c=qd.call(b.parsedDateParts,function(a){return null!=a}),d=!isNaN(a._d.getTime())&&b.overflow<0&&!b.empty&&!b.invalidMonth&&!b.invalidWeekday&&!b.nullInput&&!b.invalidFormat&&!b.userInvalidated&&(!b.meridiem||b.meridiem&&c);if(a._strict&&(d=d&&0===b.charsLeftOver&&0===b.unusedTokens.length&&void 0===b.bigHour),null!=Object.isFrozen&&Object.isFrozen(a))return d;a._isValid=d}return a._isValid}function o(a){var b=k(NaN);return null!=a?j(m(b),a):m(b).userInvalidated=!0,b}function p(a){return void 0===a}function q(a,b){var c,d,e;if(p(b._isAMomentObject)||(a._isAMomentObject=b._isAMomentObject),p(b._i)||(a._i=b._i),p(b._f)||(a._f=b._f),p(b._l)||(a._l=b._l),p(b._strict)||(a._strict=b._strict),p(b._tzm)||(a._tzm=b._tzm),p(b._isUTC)||(a._isUTC=b._isUTC),p(b._offset)||(a._offset=b._offset),p(b._pf)||(a._pf=m(b)),p(b._locale)||(a._locale=b._locale),rd.length>0)for(c in rd)d=rd[c],e=b[d],p(e)||(a[d]=e);return a}
// Moment prototype object
function r(b){q(this,b),this._d=new Date(null!=b._d?b._d.getTime():NaN),this.isValid()||(this._d=new Date(NaN)),
// Prevent infinite loop in case updateOffset creates new moment
// objects.
sd===!1&&(sd=!0,a.updateOffset(this),sd=!1)}function s(a){return a instanceof r||null!=a&&null!=a._isAMomentObject}function t(a){return a<0?Math.ceil(a)||0:Math.floor(a)}function u(a){var b=+a,c=0;return 0!==b&&isFinite(b)&&(c=t(b)),c}
// compare two arrays, return the number of differences
function v(a,b,c){var d,e=Math.min(a.length,b.length),f=Math.abs(a.length-b.length),g=0;for(d=0;d<e;d++)(c&&a[d]!==b[d]||!c&&u(a[d])!==u(b[d]))&&g++;return g+f}function w(b){a.suppressDeprecationWarnings===!1&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+b)}function x(b,c){var d=!0;return j(function(){if(null!=a.deprecationHandler&&a.deprecationHandler(null,b),d){for(var e,f=[],g=0;g<arguments.length;g++){if(e="","object"==typeof arguments[g]){e+="\n["+g+"] ";for(var h in arguments[0])e+=h+": "+arguments[0][h]+", ";e=e.slice(0,-2)}else e=arguments[g];f.push(e)}w(b+"\nArguments: "+Array.prototype.slice.call(f).join("")+"\n"+(new Error).stack),d=!1}return c.apply(this,arguments)},c)}function y(b,c){null!=a.deprecationHandler&&a.deprecationHandler(b,c),td[b]||(w(c),td[b]=!0)}function z(a){return a instanceof Function||"[object Function]"===Object.prototype.toString.call(a)}function A(a){var b,c;for(c in a)b=a[c],z(b)?this[c]=b:this["_"+c]=b;this._config=a,
// Lenient ordinal parsing accepts just a number in addition to
// number + (possibly) stuff coming from _ordinalParseLenient.
this._ordinalParseLenient=new RegExp(this._ordinalParse.source+"|"+/\d{1,2}/.source)}function B(a,b){var c,e=j({},a);for(c in b)i(b,c)&&(d(a[c])&&d(b[c])?(e[c]={},j(e[c],a[c]),j(e[c],b[c])):null!=b[c]?e[c]=b[c]:delete e[c]);for(c in a)i(a,c)&&!i(b,c)&&d(a[c])&&(
// make sure changes to properties don't modify parent config
e[c]=j({},e[c]));return e}function C(a){null!=a&&this.set(a)}function D(a,b,c){var d=this._calendar[a]||this._calendar.sameElse;return z(d)?d.call(b,c):d}function E(a){var b=this._longDateFormat[a],c=this._longDateFormat[a.toUpperCase()];return b||!c?b:(this._longDateFormat[a]=c.replace(/MMMM|MM|DD|dddd/g,function(a){return a.slice(1)}),this._longDateFormat[a])}function F(){return this._invalidDate}function G(a){return this._ordinal.replace("%d",a)}function H(a,b,c,d){var e=this._relativeTime[c];return z(e)?e(a,b,c,d):e.replace(/%d/i,a)}function I(a,b){var c=this._relativeTime[a>0?"future":"past"];return z(c)?c(b):c.replace(/%s/i,b)}function J(a,b){var c=a.toLowerCase();Dd[c]=Dd[c+"s"]=Dd[b]=a}function K(a){return"string"==typeof a?Dd[a]||Dd[a.toLowerCase()]:void 0}function L(a){var b,c,d={};for(c in a)i(a,c)&&(b=K(c),b&&(d[b]=a[c]));return d}function M(a,b){Ed[a]=b}function N(a){var b=[];for(var c in a)b.push({unit:c,priority:Ed[c]});return b.sort(function(a,b){return a.priority-b.priority}),b}function O(b,c){return function(d){return null!=d?(Q(this,b,d),a.updateOffset(this,c),this):P(this,b)}}function P(a,b){return a.isValid()?a._d["get"+(a._isUTC?"UTC":"")+b]():NaN}function Q(a,b,c){a.isValid()&&a._d["set"+(a._isUTC?"UTC":"")+b](c)}
// MOMENTS
function R(a){return a=K(a),z(this[a])?this[a]():this}function S(a,b){if("object"==typeof a){a=L(a);for(var c=N(a),d=0;d<c.length;d++)this[c[d].unit](a[c[d].unit])}else if(a=K(a),z(this[a]))return this[a](b);return this}function T(a,b,c){var d=""+Math.abs(a),e=b-d.length,f=a>=0;return(f?c?"+":"":"-")+Math.pow(10,Math.max(0,e)).toString().substr(1)+d}
// token:    'M'
// padded:   ['MM', 2]
// ordinal:  'Mo'
// callback: function () { this.month() + 1 }
function U(a,b,c,d){var e=d;"string"==typeof d&&(e=function(){return this[d]()}),a&&(Id[a]=e),b&&(Id[b[0]]=function(){return T(e.apply(this,arguments),b[1],b[2])}),c&&(Id[c]=function(){return this.localeData().ordinal(e.apply(this,arguments),a)})}function V(a){return a.match(/\[[\s\S]/)?a.replace(/^\[|\]$/g,""):a.replace(/\\/g,"")}function W(a){var b,c,d=a.match(Fd);for(b=0,c=d.length;b<c;b++)Id[d[b]]?d[b]=Id[d[b]]:d[b]=V(d[b]);return function(b){var e,f="";for(e=0;e<c;e++)f+=d[e]instanceof Function?d[e].call(b,a):d[e];return f}}
// format date using native date object
function X(a,b){return a.isValid()?(b=Y(b,a.localeData()),Hd[b]=Hd[b]||W(b),Hd[b](a)):a.localeData().invalidDate()}function Y(a,b){function c(a){return b.longDateFormat(a)||a}var d=5;for(Gd.lastIndex=0;d>=0&&Gd.test(a);)a=a.replace(Gd,c),Gd.lastIndex=0,d-=1;return a}function Z(a,b,c){$d[a]=z(b)?b:function(a,d){return a&&c?c:b}}function $(a,b){return i($d,a)?$d[a](b._strict,b._locale):new RegExp(_(a))}
// Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
function _(a){return aa(a.replace("\\","").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(a,b,c,d,e){return b||c||d||e}))}function aa(a){return a.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function ba(a,b){var c,d=b;for("string"==typeof a&&(a=[a]),f(b)&&(d=function(a,c){c[b]=u(a)}),c=0;c<a.length;c++)_d[a[c]]=d}function ca(a,b){ba(a,function(a,c,d,e){d._w=d._w||{},b(a,d._w,d,e)})}function da(a,b,c){null!=b&&i(_d,a)&&_d[a](b,c._a,c,a)}function ea(a,b){return new Date(Date.UTC(a,b+1,0)).getUTCDate()}function fa(a,b){return a?c(this._months)?this._months[a.month()]:this._months[(this._months.isFormat||ke).test(b)?"format":"standalone"][a.month()]:this._months}function ga(a,b){return a?c(this._monthsShort)?this._monthsShort[a.month()]:this._monthsShort[ke.test(b)?"format":"standalone"][a.month()]:this._monthsShort}function ha(a,b,c){var d,e,f,g=a.toLocaleLowerCase();if(!this._monthsParse)for(
// this is not used
this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[],d=0;d<12;++d)f=k([2e3,d]),this._shortMonthsParse[d]=this.monthsShort(f,"").toLocaleLowerCase(),this._longMonthsParse[d]=this.months(f,"").toLocaleLowerCase();return c?"MMM"===b?(e=je.call(this._shortMonthsParse,g),e!==-1?e:null):(e=je.call(this._longMonthsParse,g),e!==-1?e:null):"MMM"===b?(e=je.call(this._shortMonthsParse,g),e!==-1?e:(e=je.call(this._longMonthsParse,g),e!==-1?e:null)):(e=je.call(this._longMonthsParse,g),e!==-1?e:(e=je.call(this._shortMonthsParse,g),e!==-1?e:null))}function ia(a,b,c){var d,e,f;if(this._monthsParseExact)return ha.call(this,a,b,c);
// TODO: add sorting
// Sorting makes sure if one month (or abbr) is a prefix of another
// see sorting in computeMonthsParse
for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),d=0;d<12;d++){
// test the regex
if(
// make the regex if we don't have it already
e=k([2e3,d]),c&&!this._longMonthsParse[d]&&(this._longMonthsParse[d]=new RegExp("^"+this.months(e,"").replace(".","")+"$","i"),this._shortMonthsParse[d]=new RegExp("^"+this.monthsShort(e,"").replace(".","")+"$","i")),c||this._monthsParse[d]||(f="^"+this.months(e,"")+"|^"+this.monthsShort(e,""),this._monthsParse[d]=new RegExp(f.replace(".",""),"i")),c&&"MMMM"===b&&this._longMonthsParse[d].test(a))return d;if(c&&"MMM"===b&&this._shortMonthsParse[d].test(a))return d;if(!c&&this._monthsParse[d].test(a))return d}}
// MOMENTS
function ja(a,b){var c;if(!a.isValid())
// No op
return a;if("string"==typeof b)if(/^\d+$/.test(b))b=u(b);else
// TODO: Another silent failure?
if(b=a.localeData().monthsParse(b),!f(b))return a;return c=Math.min(a.date(),ea(a.year(),b)),a._d["set"+(a._isUTC?"UTC":"")+"Month"](b,c),a}function ka(b){return null!=b?(ja(this,b),a.updateOffset(this,!0),this):P(this,"Month")}function la(){return ea(this.year(),this.month())}function ma(a){return this._monthsParseExact?(i(this,"_monthsRegex")||oa.call(this),a?this._monthsShortStrictRegex:this._monthsShortRegex):(i(this,"_monthsShortRegex")||(this._monthsShortRegex=ne),this._monthsShortStrictRegex&&a?this._monthsShortStrictRegex:this._monthsShortRegex)}function na(a){return this._monthsParseExact?(i(this,"_monthsRegex")||oa.call(this),a?this._monthsStrictRegex:this._monthsRegex):(i(this,"_monthsRegex")||(this._monthsRegex=oe),this._monthsStrictRegex&&a?this._monthsStrictRegex:this._monthsRegex)}function oa(){function a(a,b){return b.length-a.length}var b,c,d=[],e=[],f=[];for(b=0;b<12;b++)
// make the regex if we don't have it already
c=k([2e3,b]),d.push(this.monthsShort(c,"")),e.push(this.months(c,"")),f.push(this.months(c,"")),f.push(this.monthsShort(c,""));for(
// Sorting makes sure if one month (or abbr) is a prefix of another it
// will match the longer piece.
d.sort(a),e.sort(a),f.sort(a),b=0;b<12;b++)d[b]=aa(d[b]),e[b]=aa(e[b]);for(b=0;b<24;b++)f[b]=aa(f[b]);this._monthsRegex=new RegExp("^("+f.join("|")+")","i"),this._monthsShortRegex=this._monthsRegex,this._monthsStrictRegex=new RegExp("^("+e.join("|")+")","i"),this._monthsShortStrictRegex=new RegExp("^("+d.join("|")+")","i")}
// HELPERS
function pa(a){return qa(a)?366:365}function qa(a){return a%4===0&&a%100!==0||a%400===0}function ra(){return qa(this.year())}function sa(a,b,c,d,e,f,g){
//can't just apply() to create a date:
//http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
var h=new Date(a,b,c,d,e,f,g);
//the date constructor remaps years 0-99 to 1900-1999
return a<100&&a>=0&&isFinite(h.getFullYear())&&h.setFullYear(a),h}function ta(a){var b=new Date(Date.UTC.apply(null,arguments));
//the Date.UTC function remaps years 0-99 to 1900-1999
return a<100&&a>=0&&isFinite(b.getUTCFullYear())&&b.setUTCFullYear(a),b}
// start-of-first-week - start-of-year
function ua(a,b,c){var// first-week day -- which january is always in the first week (4 for iso, 1 for other)
d=7+b-c,
// first-week day local weekday -- which local weekday is fwd
e=(7+ta(a,0,d).getUTCDay()-b)%7;return-e+d-1}
//http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
function va(a,b,c,d,e){var f,g,h=(7+c-d)%7,i=ua(a,d,e),j=1+7*(b-1)+h+i;return j<=0?(f=a-1,g=pa(f)+j):j>pa(a)?(f=a+1,g=j-pa(a)):(f=a,g=j),{year:f,dayOfYear:g}}function wa(a,b,c){var d,e,f=ua(a.year(),b,c),g=Math.floor((a.dayOfYear()-f-1)/7)+1;return g<1?(e=a.year()-1,d=g+xa(e,b,c)):g>xa(a.year(),b,c)?(d=g-xa(a.year(),b,c),e=a.year()+1):(e=a.year(),d=g),{week:d,year:e}}function xa(a,b,c){var d=ua(a,b,c),e=ua(a+1,b,c);return(pa(a)-d+e)/7}
// HELPERS
// LOCALES
function ya(a){return wa(a,this._week.dow,this._week.doy).week}function za(){return this._week.dow}function Aa(){return this._week.doy}
// MOMENTS
function Ba(a){var b=this.localeData().week(this);return null==a?b:this.add(7*(a-b),"d")}function Ca(a){var b=wa(this,1,4).week;return null==a?b:this.add(7*(a-b),"d")}
// HELPERS
function Da(a,b){return"string"!=typeof a?a:isNaN(a)?(a=b.weekdaysParse(a),"number"==typeof a?a:null):parseInt(a,10)}function Ea(a,b){return"string"==typeof a?b.weekdaysParse(a)%7||7:isNaN(a)?null:a}function Fa(a,b){return a?c(this._weekdays)?this._weekdays[a.day()]:this._weekdays[this._weekdays.isFormat.test(b)?"format":"standalone"][a.day()]:this._weekdays}function Ga(a){return a?this._weekdaysShort[a.day()]:this._weekdaysShort}function Ha(a){return a?this._weekdaysMin[a.day()]:this._weekdaysMin}function Ia(a,b,c){var d,e,f,g=a.toLocaleLowerCase();if(!this._weekdaysParse)for(this._weekdaysParse=[],this._shortWeekdaysParse=[],this._minWeekdaysParse=[],d=0;d<7;++d)f=k([2e3,1]).day(d),this._minWeekdaysParse[d]=this.weekdaysMin(f,"").toLocaleLowerCase(),this._shortWeekdaysParse[d]=this.weekdaysShort(f,"").toLocaleLowerCase(),this._weekdaysParse[d]=this.weekdays(f,"").toLocaleLowerCase();return c?"dddd"===b?(e=je.call(this._weekdaysParse,g),e!==-1?e:null):"ddd"===b?(e=je.call(this._shortWeekdaysParse,g),e!==-1?e:null):(e=je.call(this._minWeekdaysParse,g),e!==-1?e:null):"dddd"===b?(e=je.call(this._weekdaysParse,g),e!==-1?e:(e=je.call(this._shortWeekdaysParse,g),e!==-1?e:(e=je.call(this._minWeekdaysParse,g),e!==-1?e:null))):"ddd"===b?(e=je.call(this._shortWeekdaysParse,g),e!==-1?e:(e=je.call(this._weekdaysParse,g),e!==-1?e:(e=je.call(this._minWeekdaysParse,g),e!==-1?e:null))):(e=je.call(this._minWeekdaysParse,g),e!==-1?e:(e=je.call(this._weekdaysParse,g),e!==-1?e:(e=je.call(this._shortWeekdaysParse,g),e!==-1?e:null)))}function Ja(a,b,c){var d,e,f;if(this._weekdaysParseExact)return Ia.call(this,a,b,c);for(this._weekdaysParse||(this._weekdaysParse=[],this._minWeekdaysParse=[],this._shortWeekdaysParse=[],this._fullWeekdaysParse=[]),d=0;d<7;d++){
// test the regex
if(
// make the regex if we don't have it already
e=k([2e3,1]).day(d),c&&!this._fullWeekdaysParse[d]&&(this._fullWeekdaysParse[d]=new RegExp("^"+this.weekdays(e,"").replace(".",".?")+"$","i"),this._shortWeekdaysParse[d]=new RegExp("^"+this.weekdaysShort(e,"").replace(".",".?")+"$","i"),this._minWeekdaysParse[d]=new RegExp("^"+this.weekdaysMin(e,"").replace(".",".?")+"$","i")),this._weekdaysParse[d]||(f="^"+this.weekdays(e,"")+"|^"+this.weekdaysShort(e,"")+"|^"+this.weekdaysMin(e,""),this._weekdaysParse[d]=new RegExp(f.replace(".",""),"i")),c&&"dddd"===b&&this._fullWeekdaysParse[d].test(a))return d;if(c&&"ddd"===b&&this._shortWeekdaysParse[d].test(a))return d;if(c&&"dd"===b&&this._minWeekdaysParse[d].test(a))return d;if(!c&&this._weekdaysParse[d].test(a))return d}}
// MOMENTS
function Ka(a){if(!this.isValid())return null!=a?this:NaN;var b=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=a?(a=Da(a,this.localeData()),this.add(a-b,"d")):b}function La(a){if(!this.isValid())return null!=a?this:NaN;var b=(this.day()+7-this.localeData()._week.dow)%7;return null==a?b:this.add(a-b,"d")}function Ma(a){if(!this.isValid())return null!=a?this:NaN;
// behaves the same as moment#day except
// as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
// as a setter, sunday should belong to the previous week.
if(null!=a){var b=Ea(a,this.localeData());return this.day(this.day()%7?b:b-7)}return this.day()||7}function Na(a){return this._weekdaysParseExact?(i(this,"_weekdaysRegex")||Qa.call(this),a?this._weekdaysStrictRegex:this._weekdaysRegex):(i(this,"_weekdaysRegex")||(this._weekdaysRegex=ue),this._weekdaysStrictRegex&&a?this._weekdaysStrictRegex:this._weekdaysRegex)}function Oa(a){return this._weekdaysParseExact?(i(this,"_weekdaysRegex")||Qa.call(this),a?this._weekdaysShortStrictRegex:this._weekdaysShortRegex):(i(this,"_weekdaysShortRegex")||(this._weekdaysShortRegex=ve),this._weekdaysShortStrictRegex&&a?this._weekdaysShortStrictRegex:this._weekdaysShortRegex)}function Pa(a){return this._weekdaysParseExact?(i(this,"_weekdaysRegex")||Qa.call(this),a?this._weekdaysMinStrictRegex:this._weekdaysMinRegex):(i(this,"_weekdaysMinRegex")||(this._weekdaysMinRegex=we),this._weekdaysMinStrictRegex&&a?this._weekdaysMinStrictRegex:this._weekdaysMinRegex)}function Qa(){function a(a,b){return b.length-a.length}var b,c,d,e,f,g=[],h=[],i=[],j=[];for(b=0;b<7;b++)
// make the regex if we don't have it already
c=k([2e3,1]).day(b),d=this.weekdaysMin(c,""),e=this.weekdaysShort(c,""),f=this.weekdays(c,""),g.push(d),h.push(e),i.push(f),j.push(d),j.push(e),j.push(f);for(
// Sorting makes sure if one weekday (or abbr) is a prefix of another it
// will match the longer piece.
g.sort(a),h.sort(a),i.sort(a),j.sort(a),b=0;b<7;b++)h[b]=aa(h[b]),i[b]=aa(i[b]),j[b]=aa(j[b]);this._weekdaysRegex=new RegExp("^("+j.join("|")+")","i"),this._weekdaysShortRegex=this._weekdaysRegex,this._weekdaysMinRegex=this._weekdaysRegex,this._weekdaysStrictRegex=new RegExp("^("+i.join("|")+")","i"),this._weekdaysShortStrictRegex=new RegExp("^("+h.join("|")+")","i"),this._weekdaysMinStrictRegex=new RegExp("^("+g.join("|")+")","i")}
// FORMATTING
function Ra(){return this.hours()%12||12}function Sa(){return this.hours()||24}function Ta(a,b){U(a,0,0,function(){return this.localeData().meridiem(this.hours(),this.minutes(),b)})}
// PARSING
function Ua(a,b){return b._meridiemParse}
// LOCALES
function Va(a){
// IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
// Using charAt should be more compatible.
return"p"===(a+"").toLowerCase().charAt(0)}function Wa(a,b,c){return a>11?c?"pm":"PM":c?"am":"AM"}function Xa(a){return a?a.toLowerCase().replace("_","-"):a}
// pick the locale from the array
// try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
// substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
function Ya(a){for(var b,c,d,e,f=0;f<a.length;){for(e=Xa(a[f]).split("-"),b=e.length,c=Xa(a[f+1]),c=c?c.split("-"):null;b>0;){if(d=Za(e.slice(0,b).join("-")))return d;if(c&&c.length>=b&&v(e,c,!0)>=b-1)
//the next array item is better than a shallower substring of this one
break;b--}f++}return null}function Za(a){var b=null;
// TODO: Find a better way to register and load all the locales in Node
if(!Be[a]&&"undefined"!=typeof module&&module&&module.exports)try{b=xe._abbr,require("./locale/"+a),
// because defineLocale currently also sets the global locale, we
// want to undo that for lazy loaded locales
$a(b)}catch(a){}return Be[a]}
// This function will load locale and then set the global locale.  If
// no arguments are passed in, it will simply return the current global
// locale key.
function $a(a,b){var c;
// moment.duration._locale = moment._locale = data;
return a&&(c=p(b)?bb(a):_a(a,b),c&&(xe=c)),xe._abbr}function _a(a,b){if(null!==b){var c=Ae;if(b.abbr=a,null!=Be[a])y("defineLocaleOverride","use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."),c=Be[a]._config;else if(null!=b.parentLocale){if(null==Be[b.parentLocale])return Ce[b.parentLocale]||(Ce[b.parentLocale]=[]),Ce[b.parentLocale].push({name:a,config:b}),null;c=Be[b.parentLocale]._config}
// backwards compat for now: also set the locale
// make sure we set the locale AFTER all child locales have been
// created, so we won't end up with the child locale set.
return Be[a]=new C(B(c,b)),Ce[a]&&Ce[a].forEach(function(a){_a(a.name,a.config)}),$a(a),Be[a]}
// useful for testing
return delete Be[a],null}function ab(a,b){if(null!=b){var c,d=Ae;
// MERGE
null!=Be[a]&&(d=Be[a]._config),b=B(d,b),c=new C(b),c.parentLocale=Be[a],Be[a]=c,
// backwards compat for now: also set the locale
$a(a)}else
// pass null for config to unupdate, useful for tests
null!=Be[a]&&(null!=Be[a].parentLocale?Be[a]=Be[a].parentLocale:null!=Be[a]&&delete Be[a]);return Be[a]}
// returns locale data
function bb(a){var b;if(a&&a._locale&&a._locale._abbr&&(a=a._locale._abbr),!a)return xe;if(!c(a)){if(
//short-circuit everything else
b=Za(a))return b;a=[a]}return Ya(a)}function cb(){return wd(Be)}function db(a){var b,c=a._a;return c&&m(a).overflow===-2&&(b=c[be]<0||c[be]>11?be:c[ce]<1||c[ce]>ea(c[ae],c[be])?ce:c[de]<0||c[de]>24||24===c[de]&&(0!==c[ee]||0!==c[fe]||0!==c[ge])?de:c[ee]<0||c[ee]>59?ee:c[fe]<0||c[fe]>59?fe:c[ge]<0||c[ge]>999?ge:-1,m(a)._overflowDayOfYear&&(b<ae||b>ce)&&(b=ce),m(a)._overflowWeeks&&b===-1&&(b=he),m(a)._overflowWeekday&&b===-1&&(b=ie),m(a).overflow=b),a}
// date from iso format
function eb(a){var b,c,d,e,f,g,h=a._i,i=De.exec(h)||Ee.exec(h);if(i){for(m(a).iso=!0,b=0,c=Ge.length;b<c;b++)if(Ge[b][1].exec(i[1])){e=Ge[b][0],d=Ge[b][2]!==!1;break}if(null==e)return void(a._isValid=!1);if(i[3]){for(b=0,c=He.length;b<c;b++)if(He[b][1].exec(i[3])){
// match[2] should be 'T' or space
f=(i[2]||" ")+He[b][0];break}if(null==f)return void(a._isValid=!1)}if(!d&&null!=f)return void(a._isValid=!1);if(i[4]){if(!Fe.exec(i[4]))return void(a._isValid=!1);g="Z"}a._f=e+(f||"")+(g||""),kb(a)}else a._isValid=!1}
// date from iso format or fallback
function fb(b){var c=Ie.exec(b._i);return null!==c?void(b._d=new Date(+c[1])):(eb(b),void(b._isValid===!1&&(delete b._isValid,a.createFromInputFallback(b))))}
// Pick the first defined of two or three arguments.
function gb(a,b,c){return null!=a?a:null!=b?b:c}function hb(b){
// hooks is actually the exported moment object
var c=new Date(a.now());return b._useUTC?[c.getUTCFullYear(),c.getUTCMonth(),c.getUTCDate()]:[c.getFullYear(),c.getMonth(),c.getDate()]}
// convert an array to a date.
// the array should mirror the parameters below
// note: all values past the year are optional and will default to the lowest possible value.
// [year, month, day , hour, minute, second, millisecond]
function ib(a){var b,c,d,e,f=[];if(!a._d){
// Default to current date.
// * if no year, month, day of month are given, default to today
// * if day of month is given, default month and year
// * if month is given, default only year
// * if year is given, don't default anything
for(d=hb(a),
//compute day of the year from weeks and weekdays
a._w&&null==a._a[ce]&&null==a._a[be]&&jb(a),
//if the day of the year is set, figure out what it is
a._dayOfYear&&(e=gb(a._a[ae],d[ae]),a._dayOfYear>pa(e)&&(m(a)._overflowDayOfYear=!0),c=ta(e,0,a._dayOfYear),a._a[be]=c.getUTCMonth(),a._a[ce]=c.getUTCDate()),b=0;b<3&&null==a._a[b];++b)a._a[b]=f[b]=d[b];
// Zero out whatever was not defaulted, including time
for(;b<7;b++)a._a[b]=f[b]=null==a._a[b]?2===b?1:0:a._a[b];
// Check for 24:00:00.000
24===a._a[de]&&0===a._a[ee]&&0===a._a[fe]&&0===a._a[ge]&&(a._nextDay=!0,a._a[de]=0),a._d=(a._useUTC?ta:sa).apply(null,f),
// Apply timezone offset from input. The actual utcOffset can be changed
// with parseZone.
null!=a._tzm&&a._d.setUTCMinutes(a._d.getUTCMinutes()-a._tzm),a._nextDay&&(a._a[de]=24)}}function jb(a){var b,c,d,e,f,g,h,i;if(b=a._w,null!=b.GG||null!=b.W||null!=b.E)f=1,g=4,
// TODO: We need to take the current isoWeekYear, but that depends on
// how we interpret now (local, utc, fixed offset). So create
// a now version of current config (take local/utc/offset flags, and
// create now).
c=gb(b.GG,a._a[ae],wa(sb(),1,4).year),d=gb(b.W,1),e=gb(b.E,1),(e<1||e>7)&&(i=!0);else{f=a._locale._week.dow,g=a._locale._week.doy;var j=wa(sb(),f,g);c=gb(b.gg,a._a[ae],j.year),
// Default to current week.
d=gb(b.w,j.week),null!=b.d?(
// weekday -- low day numbers are considered next week
e=b.d,(e<0||e>6)&&(i=!0)):null!=b.e?(
// local weekday -- counting starts from begining of week
e=b.e+f,(b.e<0||b.e>6)&&(i=!0)):
// default to begining of week
e=f}d<1||d>xa(c,f,g)?m(a)._overflowWeeks=!0:null!=i?m(a)._overflowWeekday=!0:(h=va(c,d,e,f,g),a._a[ae]=h.year,a._dayOfYear=h.dayOfYear)}
// date from string and format string
function kb(b){
// TODO: Move this to another part of the creation flow to prevent circular deps
if(b._f===a.ISO_8601)return void eb(b);b._a=[],m(b).empty=!0;
// This array is used to make a Date, either with `new Date` or `Date.UTC`
var c,d,e,f,g,h=""+b._i,i=h.length,j=0;for(e=Y(b._f,b._locale).match(Fd)||[],c=0;c<e.length;c++)f=e[c],d=(h.match($(f,b))||[])[0],
// console.log('token', token, 'parsedInput', parsedInput,
//         'regex', getParseRegexForToken(token, config));
d&&(g=h.substr(0,h.indexOf(d)),g.length>0&&m(b).unusedInput.push(g),h=h.slice(h.indexOf(d)+d.length),j+=d.length),
// don't parse if it's not a known token
Id[f]?(d?m(b).empty=!1:m(b).unusedTokens.push(f),da(f,d,b)):b._strict&&!d&&m(b).unusedTokens.push(f);
// add remaining unparsed input length to the string
m(b).charsLeftOver=i-j,h.length>0&&m(b).unusedInput.push(h),
// clear _12h flag if hour is <= 12
b._a[de]<=12&&m(b).bigHour===!0&&b._a[de]>0&&(m(b).bigHour=void 0),m(b).parsedDateParts=b._a.slice(0),m(b).meridiem=b._meridiem,
// handle meridiem
b._a[de]=lb(b._locale,b._a[de],b._meridiem),ib(b),db(b)}function lb(a,b,c){var d;
// Fallback
return null==c?b:null!=a.meridiemHour?a.meridiemHour(b,c):null!=a.isPM?(d=a.isPM(c),d&&b<12&&(b+=12),d||12!==b||(b=0),b):b}
// date from string and array of format strings
function mb(a){var b,c,d,e,f;if(0===a._f.length)return m(a).invalidFormat=!0,void(a._d=new Date(NaN));for(e=0;e<a._f.length;e++)f=0,b=q({},a),null!=a._useUTC&&(b._useUTC=a._useUTC),b._f=a._f[e],kb(b),n(b)&&(
// if there is any input that was not parsed add a penalty for that format
f+=m(b).charsLeftOver,
//or tokens
f+=10*m(b).unusedTokens.length,m(b).score=f,(null==d||f<d)&&(d=f,c=b));j(a,c||b)}function nb(a){if(!a._d){var b=L(a._i);a._a=h([b.year,b.month,b.day||b.date,b.hour,b.minute,b.second,b.millisecond],function(a){return a&&parseInt(a,10)}),ib(a)}}function ob(a){var b=new r(db(pb(a)));
// Adding is smart enough around DST
return b._nextDay&&(b.add(1,"d"),b._nextDay=void 0),b}function pb(a){var b=a._i,d=a._f;return a._locale=a._locale||bb(a._l),null===b||void 0===d&&""===b?o({nullInput:!0}):("string"==typeof b&&(a._i=b=a._locale.preparse(b)),s(b)?new r(db(b)):(g(b)?a._d=b:c(d)?mb(a):d?kb(a):qb(a),n(a)||(a._d=null),a))}function qb(b){var d=b._i;void 0===d?b._d=new Date(a.now()):g(d)?b._d=new Date(d.valueOf()):"string"==typeof d?fb(b):c(d)?(b._a=h(d.slice(0),function(a){return parseInt(a,10)}),ib(b)):"object"==typeof d?nb(b):f(d)?
// from milliseconds
b._d=new Date(d):a.createFromInputFallback(b)}function rb(a,b,f,g,h){var i={};
// object construction must be done this way.
// https://github.com/moment/moment/issues/1423
return f!==!0&&f!==!1||(g=f,f=void 0),(d(a)&&e(a)||c(a)&&0===a.length)&&(a=void 0),i._isAMomentObject=!0,i._useUTC=i._isUTC=h,i._l=f,i._i=a,i._f=b,i._strict=g,ob(i)}function sb(a,b,c,d){return rb(a,b,c,d,!1)}
// Pick a moment m from moments so that m[fn](other) is true for all
// other. This relies on the function fn to be transitive.
//
// moments should either be an array of moment objects or an array, whose
// first element is an array of moment objects.
function tb(a,b){var d,e;if(1===b.length&&c(b[0])&&(b=b[0]),!b.length)return sb();for(d=b[0],e=1;e<b.length;++e)b[e].isValid()&&!b[e][a](d)||(d=b[e]);return d}
// TODO: Use [].sort instead?
function ub(){var a=[].slice.call(arguments,0);return tb("isBefore",a)}function vb(){var a=[].slice.call(arguments,0);return tb("isAfter",a)}function wb(a){var b=L(a),c=b.year||0,d=b.quarter||0,e=b.month||0,f=b.week||0,g=b.day||0,h=b.hour||0,i=b.minute||0,j=b.second||0,k=b.millisecond||0;
// representation for dateAddRemove
this._milliseconds=+k+1e3*j+// 1000
6e4*i+// 1000 * 60
1e3*h*60*60,//using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
// Because of dateAddRemove treats 24 hours as different from a
// day when working around DST, we need to store them separately
this._days=+g+7*f,
// It is impossible translate months into days without knowing
// which months you are are talking about, so we have to store
// it separately.
this._months=+e+3*d+12*c,this._data={},this._locale=bb(),this._bubble()}function xb(a){return a instanceof wb}function yb(a){return a<0?Math.round(-1*a)*-1:Math.round(a)}
// FORMATTING
function zb(a,b){U(a,0,0,function(){var a=this.utcOffset(),c="+";return a<0&&(a=-a,c="-"),c+T(~~(a/60),2)+b+T(~~a%60,2)})}function Ab(a,b){var c=(b||"").match(a);if(null===c)return null;var d=c[c.length-1]||[],e=(d+"").match(Me)||["-",0,0],f=+(60*e[1])+u(e[2]);return 0===f?0:"+"===e[0]?f:-f}
// Return a moment from input, that is local/utc/zone equivalent to model.
function Bb(b,c){var d,e;
// Use low-level api, because this fn is low-level api.
return c._isUTC?(d=c.clone(),e=(s(b)||g(b)?b.valueOf():sb(b).valueOf())-d.valueOf(),d._d.setTime(d._d.valueOf()+e),a.updateOffset(d,!1),d):sb(b).local()}function Cb(a){
// On Firefox.24 Date#getTimezoneOffset returns a floating point.
// https://github.com/moment/moment/pull/1871
return 15*-Math.round(a._d.getTimezoneOffset()/15)}
// MOMENTS
// keepLocalTime = true means only change the timezone, without
// affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
// 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
// +0200, so we adjust the time as needed, to be valid.
//
// Keeping the time actually adds/subtracts (one hour)
// from the actual represented time. That is why we call updateOffset
// a second time. In case it wants us to change the offset again
// _changeInProgress == true case, then we have to adjust, because
// there is no such time in the given timezone.
function Db(b,c){var d,e=this._offset||0;if(!this.isValid())return null!=b?this:NaN;if(null!=b){if("string"==typeof b){if(b=Ab(Xd,b),null===b)return this}else Math.abs(b)<16&&(b=60*b);return!this._isUTC&&c&&(d=Cb(this)),this._offset=b,this._isUTC=!0,null!=d&&this.add(d,"m"),e!==b&&(!c||this._changeInProgress?Tb(this,Ob(b-e,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,a.updateOffset(this,!0),this._changeInProgress=null)),this}return this._isUTC?e:Cb(this)}function Eb(a,b){return null!=a?("string"!=typeof a&&(a=-a),this.utcOffset(a,b),this):-this.utcOffset()}function Fb(a){return this.utcOffset(0,a)}function Gb(a){return this._isUTC&&(this.utcOffset(0,a),this._isUTC=!1,a&&this.subtract(Cb(this),"m")),this}function Hb(){if(null!=this._tzm)this.utcOffset(this._tzm);else if("string"==typeof this._i){var a=Ab(Wd,this._i);null!=a?this.utcOffset(a):this.utcOffset(0,!0)}return this}function Ib(a){return!!this.isValid()&&(a=a?sb(a).utcOffset():0,(this.utcOffset()-a)%60===0)}function Jb(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset()}function Kb(){if(!p(this._isDSTShifted))return this._isDSTShifted;var a={};if(q(a,this),a=pb(a),a._a){var b=a._isUTC?k(a._a):sb(a._a);this._isDSTShifted=this.isValid()&&v(a._a,b.toArray())>0}else this._isDSTShifted=!1;return this._isDSTShifted}function Lb(){return!!this.isValid()&&!this._isUTC}function Mb(){return!!this.isValid()&&this._isUTC}function Nb(){return!!this.isValid()&&(this._isUTC&&0===this._offset)}function Ob(a,b){var c,d,e,g=a,
// matching against regexp is expensive, do it on demand
h=null;// checks for null or undefined
return xb(a)?g={ms:a._milliseconds,d:a._days,M:a._months}:f(a)?(g={},b?g[b]=a:g.milliseconds=a):(h=Ne.exec(a))?(c="-"===h[1]?-1:1,g={y:0,d:u(h[ce])*c,h:u(h[de])*c,m:u(h[ee])*c,s:u(h[fe])*c,ms:u(yb(1e3*h[ge]))*c}):(h=Oe.exec(a))?(c="-"===h[1]?-1:1,g={y:Pb(h[2],c),M:Pb(h[3],c),w:Pb(h[4],c),d:Pb(h[5],c),h:Pb(h[6],c),m:Pb(h[7],c),s:Pb(h[8],c)}):null==g?g={}:"object"==typeof g&&("from"in g||"to"in g)&&(e=Rb(sb(g.from),sb(g.to)),g={},g.ms=e.milliseconds,g.M=e.months),d=new wb(g),xb(a)&&i(a,"_locale")&&(d._locale=a._locale),d}function Pb(a,b){
// We'd normally use ~~inp for this, but unfortunately it also
// converts floats to ints.
// inp may be undefined, so careful calling replace on it.
var c=a&&parseFloat(a.replace(",","."));
// apply sign while we're at it
return(isNaN(c)?0:c)*b}function Qb(a,b){var c={milliseconds:0,months:0};return c.months=b.month()-a.month()+12*(b.year()-a.year()),a.clone().add(c.months,"M").isAfter(b)&&--c.months,c.milliseconds=+b-+a.clone().add(c.months,"M"),c}function Rb(a,b){var c;return a.isValid()&&b.isValid()?(b=Bb(b,a),a.isBefore(b)?c=Qb(a,b):(c=Qb(b,a),c.milliseconds=-c.milliseconds,c.months=-c.months),c):{milliseconds:0,months:0}}
// TODO: remove 'name' arg after deprecation is removed
function Sb(a,b){return function(c,d){var e,f;
//invert the arguments, but complain about it
return null===d||isNaN(+d)||(y(b,"moment()."+b+"(period, number) is deprecated. Please use moment()."+b+"(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."),f=c,c=d,d=f),c="string"==typeof c?+c:c,e=Ob(c,d),Tb(this,e,a),this}}function Tb(b,c,d,e){var f=c._milliseconds,g=yb(c._days),h=yb(c._months);b.isValid()&&(e=null==e||e,f&&b._d.setTime(b._d.valueOf()+f*d),g&&Q(b,"Date",P(b,"Date")+g*d),h&&ja(b,P(b,"Month")+h*d),e&&a.updateOffset(b,g||h))}function Ub(a,b){var c=a.diff(b,"days",!0);return c<-6?"sameElse":c<-1?"lastWeek":c<0?"lastDay":c<1?"sameDay":c<2?"nextDay":c<7?"nextWeek":"sameElse"}function Vb(b,c){
// We want to compare the start of today, vs this.
// Getting start-of-today depends on whether we're local/utc/offset or not.
var d=b||sb(),e=Bb(d,this).startOf("day"),f=a.calendarFormat(this,e)||"sameElse",g=c&&(z(c[f])?c[f].call(this,d):c[f]);return this.format(g||this.localeData().calendar(f,this,sb(d)))}function Wb(){return new r(this)}function Xb(a,b){var c=s(a)?a:sb(a);return!(!this.isValid()||!c.isValid())&&(b=K(p(b)?"millisecond":b),"millisecond"===b?this.valueOf()>c.valueOf():c.valueOf()<this.clone().startOf(b).valueOf())}function Yb(a,b){var c=s(a)?a:sb(a);return!(!this.isValid()||!c.isValid())&&(b=K(p(b)?"millisecond":b),"millisecond"===b?this.valueOf()<c.valueOf():this.clone().endOf(b).valueOf()<c.valueOf())}function Zb(a,b,c,d){return d=d||"()",("("===d[0]?this.isAfter(a,c):!this.isBefore(a,c))&&(")"===d[1]?this.isBefore(b,c):!this.isAfter(b,c))}function $b(a,b){var c,d=s(a)?a:sb(a);return!(!this.isValid()||!d.isValid())&&(b=K(b||"millisecond"),"millisecond"===b?this.valueOf()===d.valueOf():(c=d.valueOf(),this.clone().startOf(b).valueOf()<=c&&c<=this.clone().endOf(b).valueOf()))}function _b(a,b){return this.isSame(a,b)||this.isAfter(a,b)}function ac(a,b){return this.isSame(a,b)||this.isBefore(a,b)}function bc(a,b,c){var d,e,f,g;// 1000
// 1000 * 60
// 1000 * 60 * 60
// 1000 * 60 * 60 * 24, negate dst
// 1000 * 60 * 60 * 24 * 7, negate dst
return this.isValid()?(d=Bb(a,this),d.isValid()?(e=6e4*(d.utcOffset()-this.utcOffset()),b=K(b),"year"===b||"month"===b||"quarter"===b?(g=cc(this,d),"quarter"===b?g/=3:"year"===b&&(g/=12)):(f=this-d,g="second"===b?f/1e3:"minute"===b?f/6e4:"hour"===b?f/36e5:"day"===b?(f-e)/864e5:"week"===b?(f-e)/6048e5:f),c?g:t(g)):NaN):NaN}function cc(a,b){
// difference in months
var c,d,e=12*(b.year()-a.year())+(b.month()-a.month()),
// b is in (anchor - 1 month, anchor + 1 month)
f=a.clone().add(e,"months");
//check for negative zero, return zero if negative zero
// linear across the month
// linear across the month
return b-f<0?(c=a.clone().add(e-1,"months"),d=(b-f)/(f-c)):(c=a.clone().add(e+1,"months"),d=(b-f)/(c-f)),-(e+d)||0}function dc(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")}function ec(){var a=this.clone().utc();return 0<a.year()&&a.year()<=9999?z(Date.prototype.toISOString)?this.toDate().toISOString():X(a,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):X(a,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")}/**
 * Return a human readable representation of a moment that can
 * also be evaluated to get a new moment which is the same
 *
 * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
 */
function fc(){if(!this.isValid())return"moment.invalid(/* "+this._i+" */)";var a="moment",b="";this.isLocal()||(a=0===this.utcOffset()?"moment.utc":"moment.parseZone",b="Z");var c="["+a+'("]',d=0<this.year()&&this.year()<=9999?"YYYY":"YYYYYY",e="-MM-DD[T]HH:mm:ss.SSS",f=b+'[")]';return this.format(c+d+e+f)}function gc(b){b||(b=this.isUtc()?a.defaultFormatUtc:a.defaultFormat);var c=X(this,b);return this.localeData().postformat(c)}function hc(a,b){return this.isValid()&&(s(a)&&a.isValid()||sb(a).isValid())?Ob({to:this,from:a}).locale(this.locale()).humanize(!b):this.localeData().invalidDate()}function ic(a){return this.from(sb(),a)}function jc(a,b){return this.isValid()&&(s(a)&&a.isValid()||sb(a).isValid())?Ob({from:this,to:a}).locale(this.locale()).humanize(!b):this.localeData().invalidDate()}function kc(a){return this.to(sb(),a)}
// If passed a locale key, it will set the locale for this
// instance.  Otherwise, it will return the locale configuration
// variables for this instance.
function lc(a){var b;return void 0===a?this._locale._abbr:(b=bb(a),null!=b&&(this._locale=b),this)}function mc(){return this._locale}function nc(a){
// the following switch intentionally omits break keywords
// to utilize falling through the cases.
switch(a=K(a)){case"year":this.month(0);/* falls through */
case"quarter":case"month":this.date(1);/* falls through */
case"week":case"isoWeek":case"day":case"date":this.hours(0);/* falls through */
case"hour":this.minutes(0);/* falls through */
case"minute":this.seconds(0);/* falls through */
case"second":this.milliseconds(0)}
// weeks are a special case
// quarters are also special
return"week"===a&&this.weekday(0),"isoWeek"===a&&this.isoWeekday(1),"quarter"===a&&this.month(3*Math.floor(this.month()/3)),this}function oc(a){
// 'date' is an alias for 'day', so it should be considered as such.
return a=K(a),void 0===a||"millisecond"===a?this:("date"===a&&(a="day"),this.startOf(a).add(1,"isoWeek"===a?"week":a).subtract(1,"ms"))}function pc(){return this._d.valueOf()-6e4*(this._offset||0)}function qc(){return Math.floor(this.valueOf()/1e3)}function rc(){return new Date(this.valueOf())}function sc(){var a=this;return[a.year(),a.month(),a.date(),a.hour(),a.minute(),a.second(),a.millisecond()]}function tc(){var a=this;return{years:a.year(),months:a.month(),date:a.date(),hours:a.hours(),minutes:a.minutes(),seconds:a.seconds(),milliseconds:a.milliseconds()}}function uc(){
// new Date(NaN).toJSON() === null
return this.isValid()?this.toISOString():null}function vc(){return n(this)}function wc(){return j({},m(this))}function xc(){return m(this).overflow}function yc(){return{input:this._i,format:this._f,locale:this._locale,isUTC:this._isUTC,strict:this._strict}}function zc(a,b){U(0,[a,a.length],0,b)}
// MOMENTS
function Ac(a){return Ec.call(this,a,this.week(),this.weekday(),this.localeData()._week.dow,this.localeData()._week.doy)}function Bc(a){return Ec.call(this,a,this.isoWeek(),this.isoWeekday(),1,4)}function Cc(){return xa(this.year(),1,4)}function Dc(){var a=this.localeData()._week;return xa(this.year(),a.dow,a.doy)}function Ec(a,b,c,d,e){var f;return null==a?wa(this,d,e).year:(f=xa(a,d,e),b>f&&(b=f),Fc.call(this,a,b,c,d,e))}function Fc(a,b,c,d,e){var f=va(a,b,c,d,e),g=ta(f.year,0,f.dayOfYear);return this.year(g.getUTCFullYear()),this.month(g.getUTCMonth()),this.date(g.getUTCDate()),this}
// MOMENTS
function Gc(a){return null==a?Math.ceil((this.month()+1)/3):this.month(3*(a-1)+this.month()%3)}
// HELPERS
// MOMENTS
function Hc(a){var b=Math.round((this.clone().startOf("day")-this.clone().startOf("year"))/864e5)+1;return null==a?b:this.add(a-b,"d")}function Ic(a,b){b[ge]=u(1e3*("0."+a))}
// MOMENTS
function Jc(){return this._isUTC?"UTC":""}function Kc(){return this._isUTC?"Coordinated Universal Time":""}function Lc(a){return sb(1e3*a)}function Mc(){return sb.apply(null,arguments).parseZone()}function Nc(a){return a}function Oc(a,b,c,d){var e=bb(),f=k().set(d,b);return e[c](f,a)}function Pc(a,b,c){if(f(a)&&(b=a,a=void 0),a=a||"",null!=b)return Oc(a,b,c,"month");var d,e=[];for(d=0;d<12;d++)e[d]=Oc(a,d,c,"month");return e}
// ()
// (5)
// (fmt, 5)
// (fmt)
// (true)
// (true, 5)
// (true, fmt, 5)
// (true, fmt)
function Qc(a,b,c,d){"boolean"==typeof a?(f(b)&&(c=b,b=void 0),b=b||""):(b=a,c=b,a=!1,f(b)&&(c=b,b=void 0),b=b||"");var e=bb(),g=a?e._week.dow:0;if(null!=c)return Oc(b,(c+g)%7,d,"day");var h,i=[];for(h=0;h<7;h++)i[h]=Oc(b,(h+g)%7,d,"day");return i}function Rc(a,b){return Pc(a,b,"months")}function Sc(a,b){return Pc(a,b,"monthsShort")}function Tc(a,b,c){return Qc(a,b,c,"weekdays")}function Uc(a,b,c){return Qc(a,b,c,"weekdaysShort")}function Vc(a,b,c){return Qc(a,b,c,"weekdaysMin")}function Wc(){var a=this._data;return this._milliseconds=Ze(this._milliseconds),this._days=Ze(this._days),this._months=Ze(this._months),a.milliseconds=Ze(a.milliseconds),a.seconds=Ze(a.seconds),a.minutes=Ze(a.minutes),a.hours=Ze(a.hours),a.months=Ze(a.months),a.years=Ze(a.years),this}function Xc(a,b,c,d){var e=Ob(b,c);return a._milliseconds+=d*e._milliseconds,a._days+=d*e._days,a._months+=d*e._months,a._bubble()}
// supports only 2.0-style add(1, 's') or add(duration)
function Yc(a,b){return Xc(this,a,b,1)}
// supports only 2.0-style subtract(1, 's') or subtract(duration)
function Zc(a,b){return Xc(this,a,b,-1)}function $c(a){return a<0?Math.floor(a):Math.ceil(a)}function _c(){var a,b,c,d,e,f=this._milliseconds,g=this._days,h=this._months,i=this._data;
// if we have a mix of positive and negative values, bubble down first
// check: https://github.com/moment/moment/issues/2166
// The following code bubbles up values, see the tests for
// examples of what that means.
// convert days to months
// 12 months -> 1 year
return f>=0&&g>=0&&h>=0||f<=0&&g<=0&&h<=0||(f+=864e5*$c(bd(h)+g),g=0,h=0),i.milliseconds=f%1e3,a=t(f/1e3),i.seconds=a%60,b=t(a/60),i.minutes=b%60,c=t(b/60),i.hours=c%24,g+=t(c/24),e=t(ad(g)),h+=e,g-=$c(bd(e)),d=t(h/12),h%=12,i.days=g,i.months=h,i.years=d,this}function ad(a){
// 400 years have 146097 days (taking into account leap year rules)
// 400 years have 12 months === 4800
return 4800*a/146097}function bd(a){
// the reverse of daysToMonths
return 146097*a/4800}function cd(a){var b,c,d=this._milliseconds;if(a=K(a),"month"===a||"year"===a)return b=this._days+d/864e5,c=this._months+ad(b),"month"===a?c:c/12;switch(
// handle milliseconds separately because of floating point math errors (issue #1867)
b=this._days+Math.round(bd(this._months)),a){case"week":return b/7+d/6048e5;case"day":return b+d/864e5;case"hour":return 24*b+d/36e5;case"minute":return 1440*b+d/6e4;case"second":return 86400*b+d/1e3;
// Math.floor prevents floating point math errors here
case"millisecond":return Math.floor(864e5*b)+d;default:throw new Error("Unknown unit "+a)}}
// TODO: Use this.as('ms')?
function dd(){return this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*u(this._months/12)}function ed(a){return function(){return this.as(a)}}function fd(a){return a=K(a),this[a+"s"]()}function gd(a){return function(){return this._data[a]}}function hd(){return t(this.days()/7)}
// helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
function id(a,b,c,d,e){return e.relativeTime(b||1,!!c,a,d)}function jd(a,b,c){var d=Ob(a).abs(),e=of(d.as("s")),f=of(d.as("m")),g=of(d.as("h")),h=of(d.as("d")),i=of(d.as("M")),j=of(d.as("y")),k=e<pf.s&&["s",e]||f<=1&&["m"]||f<pf.m&&["mm",f]||g<=1&&["h"]||g<pf.h&&["hh",g]||h<=1&&["d"]||h<pf.d&&["dd",h]||i<=1&&["M"]||i<pf.M&&["MM",i]||j<=1&&["y"]||["yy",j];return k[2]=b,k[3]=+a>0,k[4]=c,id.apply(null,k)}
// This function allows you to set the rounding function for relative time strings
function kd(a){return void 0===a?of:"function"==typeof a&&(of=a,!0)}
// This function allows you to set a threshold for relative time strings
function ld(a,b){return void 0!==pf[a]&&(void 0===b?pf[a]:(pf[a]=b,!0))}function md(a){var b=this.localeData(),c=jd(this,!a,b);return a&&(c=b.pastFuture(+this,c)),b.postformat(c)}function nd(){
// for ISO strings we do not use the normal bubbling rules:
//  * milliseconds bubble up until they become hours
//  * days do not bubble at all
//  * months bubble up until they become years
// This is because there is no context-free conversion between hours and days
// (think of clock changes)
// and also not between days and months (28-31 days per month)
var a,b,c,d=qf(this._milliseconds)/1e3,e=qf(this._days),f=qf(this._months);
// 3600 seconds -> 60 minutes -> 1 hour
a=t(d/60),b=t(a/60),d%=60,a%=60,
// 12 months -> 1 year
c=t(f/12),f%=12;
// inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
var g=c,h=f,i=e,j=b,k=a,l=d,m=this.asSeconds();return m?(m<0?"-":"")+"P"+(g?g+"Y":"")+(h?h+"M":"")+(i?i+"D":"")+(j||k||l?"T":"")+(j?j+"H":"")+(k?k+"M":"")+(l?l+"S":""):"P0D"}var od,pd;pd=Array.prototype.some?Array.prototype.some:function(a){for(var b=Object(this),c=b.length>>>0,d=0;d<c;d++)if(d in b&&a.call(this,b[d],d,b))return!0;return!1};var qd=pd,rd=a.momentProperties=[],sd=!1,td={};a.suppressDeprecationWarnings=!1,a.deprecationHandler=null;var ud;ud=Object.keys?Object.keys:function(a){var b,c=[];for(b in a)i(a,b)&&c.push(b);return c};var vd,wd=ud,xd={sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},yd={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},zd="Invalid date",Ad="%d",Bd=/\d{1,2}/,Cd={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},Dd={},Ed={},Fd=/(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,Gd=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,Hd={},Id={},Jd=/\d/,Kd=/\d\d/,Ld=/\d{3}/,Md=/\d{4}/,Nd=/[+-]?\d{6}/,Od=/\d\d?/,Pd=/\d\d\d\d?/,Qd=/\d\d\d\d\d\d?/,Rd=/\d{1,3}/,Sd=/\d{1,4}/,Td=/[+-]?\d{1,6}/,Ud=/\d+/,Vd=/[+-]?\d+/,Wd=/Z|[+-]\d\d:?\d\d/gi,Xd=/Z|[+-]\d\d(?::?\d\d)?/gi,Yd=/[+-]?\d+(\.\d{1,3})?/,Zd=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,$d={},_d={},ae=0,be=1,ce=2,de=3,ee=4,fe=5,ge=6,he=7,ie=8;vd=Array.prototype.indexOf?Array.prototype.indexOf:function(a){
// I know
var b;for(b=0;b<this.length;++b)if(this[b]===a)return b;return-1};var je=vd;
// FORMATTING
U("M",["MM",2],"Mo",function(){return this.month()+1}),U("MMM",0,0,function(a){return this.localeData().monthsShort(this,a)}),U("MMMM",0,0,function(a){return this.localeData().months(this,a)}),
// ALIASES
J("month","M"),
// PRIORITY
M("month",8),
// PARSING
Z("M",Od),Z("MM",Od,Kd),Z("MMM",function(a,b){return b.monthsShortRegex(a)}),Z("MMMM",function(a,b){return b.monthsRegex(a)}),ba(["M","MM"],function(a,b){b[be]=u(a)-1}),ba(["MMM","MMMM"],function(a,b,c,d){var e=c._locale.monthsParse(a,d,c._strict);
// if we didn't find a month name, mark the date as invalid.
null!=e?b[be]=e:m(c).invalidMonth=a});
// LOCALES
var ke=/D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,le="January_February_March_April_May_June_July_August_September_October_November_December".split("_"),me="Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),ne=Zd,oe=Zd;
// FORMATTING
U("Y",0,0,function(){var a=this.year();return a<=9999?""+a:"+"+a}),U(0,["YY",2],0,function(){return this.year()%100}),U(0,["YYYY",4],0,"year"),U(0,["YYYYY",5],0,"year"),U(0,["YYYYYY",6,!0],0,"year"),
// ALIASES
J("year","y"),
// PRIORITIES
M("year",1),
// PARSING
Z("Y",Vd),Z("YY",Od,Kd),Z("YYYY",Sd,Md),Z("YYYYY",Td,Nd),Z("YYYYYY",Td,Nd),ba(["YYYYY","YYYYYY"],ae),ba("YYYY",function(b,c){c[ae]=2===b.length?a.parseTwoDigitYear(b):u(b)}),ba("YY",function(b,c){c[ae]=a.parseTwoDigitYear(b)}),ba("Y",function(a,b){b[ae]=parseInt(a,10)}),
// HOOKS
a.parseTwoDigitYear=function(a){return u(a)+(u(a)>68?1900:2e3)};
// MOMENTS
var pe=O("FullYear",!0);
// FORMATTING
U("w",["ww",2],"wo","week"),U("W",["WW",2],"Wo","isoWeek"),
// ALIASES
J("week","w"),J("isoWeek","W"),
// PRIORITIES
M("week",5),M("isoWeek",5),
// PARSING
Z("w",Od),Z("ww",Od,Kd),Z("W",Od),Z("WW",Od,Kd),ca(["w","ww","W","WW"],function(a,b,c,d){b[d.substr(0,1)]=u(a)});var qe={dow:0,// Sunday is the first day of the week.
doy:6};
// FORMATTING
U("d",0,"do","day"),U("dd",0,0,function(a){return this.localeData().weekdaysMin(this,a)}),U("ddd",0,0,function(a){return this.localeData().weekdaysShort(this,a)}),U("dddd",0,0,function(a){return this.localeData().weekdays(this,a)}),U("e",0,0,"weekday"),U("E",0,0,"isoWeekday"),
// ALIASES
J("day","d"),J("weekday","e"),J("isoWeekday","E"),
// PRIORITY
M("day",11),M("weekday",11),M("isoWeekday",11),
// PARSING
Z("d",Od),Z("e",Od),Z("E",Od),Z("dd",function(a,b){return b.weekdaysMinRegex(a)}),Z("ddd",function(a,b){return b.weekdaysShortRegex(a)}),Z("dddd",function(a,b){return b.weekdaysRegex(a)}),ca(["dd","ddd","dddd"],function(a,b,c,d){var e=c._locale.weekdaysParse(a,d,c._strict);
// if we didn't get a weekday name, mark the date as invalid
null!=e?b.d=e:m(c).invalidWeekday=a}),ca(["d","e","E"],function(a,b,c,d){b[d]=u(a)});
// LOCALES
var re="Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),se="Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),te="Su_Mo_Tu_We_Th_Fr_Sa".split("_"),ue=Zd,ve=Zd,we=Zd;U("H",["HH",2],0,"hour"),U("h",["hh",2],0,Ra),U("k",["kk",2],0,Sa),U("hmm",0,0,function(){return""+Ra.apply(this)+T(this.minutes(),2)}),U("hmmss",0,0,function(){return""+Ra.apply(this)+T(this.minutes(),2)+T(this.seconds(),2)}),U("Hmm",0,0,function(){return""+this.hours()+T(this.minutes(),2)}),U("Hmmss",0,0,function(){return""+this.hours()+T(this.minutes(),2)+T(this.seconds(),2)}),Ta("a",!0),Ta("A",!1),
// ALIASES
J("hour","h"),
// PRIORITY
M("hour",13),Z("a",Ua),Z("A",Ua),Z("H",Od),Z("h",Od),Z("HH",Od,Kd),Z("hh",Od,Kd),Z("hmm",Pd),Z("hmmss",Qd),Z("Hmm",Pd),Z("Hmmss",Qd),ba(["H","HH"],de),ba(["a","A"],function(a,b,c){c._isPm=c._locale.isPM(a),c._meridiem=a}),ba(["h","hh"],function(a,b,c){b[de]=u(a),m(c).bigHour=!0}),ba("hmm",function(a,b,c){var d=a.length-2;b[de]=u(a.substr(0,d)),b[ee]=u(a.substr(d)),m(c).bigHour=!0}),ba("hmmss",function(a,b,c){var d=a.length-4,e=a.length-2;b[de]=u(a.substr(0,d)),b[ee]=u(a.substr(d,2)),b[fe]=u(a.substr(e)),m(c).bigHour=!0}),ba("Hmm",function(a,b,c){var d=a.length-2;b[de]=u(a.substr(0,d)),b[ee]=u(a.substr(d))}),ba("Hmmss",function(a,b,c){var d=a.length-4,e=a.length-2;b[de]=u(a.substr(0,d)),b[ee]=u(a.substr(d,2)),b[fe]=u(a.substr(e))});var xe,ye=/[ap]\.?m?\.?/i,ze=O("Hours",!0),Ae={calendar:xd,longDateFormat:yd,invalidDate:zd,ordinal:Ad,ordinalParse:Bd,relativeTime:Cd,months:le,monthsShort:me,week:qe,weekdays:re,weekdaysMin:te,weekdaysShort:se,meridiemParse:ye},Be={},Ce={},De=/^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,Ee=/^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,Fe=/Z|[+-]\d\d(?::?\d\d)?/,Ge=[["YYYYYY-MM-DD",/[+-]\d{6}-\d\d-\d\d/],["YYYY-MM-DD",/\d{4}-\d\d-\d\d/],["GGGG-[W]WW-E",/\d{4}-W\d\d-\d/],["GGGG-[W]WW",/\d{4}-W\d\d/,!1],["YYYY-DDD",/\d{4}-\d{3}/],["YYYY-MM",/\d{4}-\d\d/,!1],["YYYYYYMMDD",/[+-]\d{10}/],["YYYYMMDD",/\d{8}/],
// YYYYMM is NOT allowed by the standard
["GGGG[W]WWE",/\d{4}W\d{3}/],["GGGG[W]WW",/\d{4}W\d{2}/,!1],["YYYYDDD",/\d{7}/]],He=[["HH:mm:ss.SSSS",/\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss,SSSS",/\d\d:\d\d:\d\d,\d+/],["HH:mm:ss",/\d\d:\d\d:\d\d/],["HH:mm",/\d\d:\d\d/],["HHmmss.SSSS",/\d\d\d\d\d\d\.\d+/],["HHmmss,SSSS",/\d\d\d\d\d\d,\d+/],["HHmmss",/\d\d\d\d\d\d/],["HHmm",/\d\d\d\d/],["HH",/\d\d/]],Ie=/^\/?Date\((\-?\d+)/i;a.createFromInputFallback=x("value provided is not in a recognized ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",function(a){a._d=new Date(a._i+(a._useUTC?" UTC":""))}),
// constant that refers to the ISO standard
a.ISO_8601=function(){};var Je=x("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",function(){var a=sb.apply(null,arguments);return this.isValid()&&a.isValid()?a<this?this:a:o()}),Ke=x("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",function(){var a=sb.apply(null,arguments);return this.isValid()&&a.isValid()?a>this?this:a:o()}),Le=function(){return Date.now?Date.now():+new Date};zb("Z",":"),zb("ZZ",""),
// PARSING
Z("Z",Xd),Z("ZZ",Xd),ba(["Z","ZZ"],function(a,b,c){c._useUTC=!0,c._tzm=Ab(Xd,a)});
// HELPERS
// timezone chunker
// '+10:00' > ['10',  '00']
// '-1530'  > ['-15', '30']
var Me=/([\+\-]|\d\d)/gi;
// HOOKS
// This function will be called whenever a moment is mutated.
// It is intended to keep the offset in sync with the timezone.
a.updateOffset=function(){};
// ASP.NET json date format regex
var Ne=/^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/,Oe=/^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;Ob.fn=wb.prototype;var Pe=Sb(1,"add"),Qe=Sb(-1,"subtract");a.defaultFormat="YYYY-MM-DDTHH:mm:ssZ",a.defaultFormatUtc="YYYY-MM-DDTHH:mm:ss[Z]";var Re=x("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(a){return void 0===a?this.localeData():this.locale(a)});
// FORMATTING
U(0,["gg",2],0,function(){return this.weekYear()%100}),U(0,["GG",2],0,function(){return this.isoWeekYear()%100}),zc("gggg","weekYear"),zc("ggggg","weekYear"),zc("GGGG","isoWeekYear"),zc("GGGGG","isoWeekYear"),
// ALIASES
J("weekYear","gg"),J("isoWeekYear","GG"),
// PRIORITY
M("weekYear",1),M("isoWeekYear",1),
// PARSING
Z("G",Vd),Z("g",Vd),Z("GG",Od,Kd),Z("gg",Od,Kd),Z("GGGG",Sd,Md),Z("gggg",Sd,Md),Z("GGGGG",Td,Nd),Z("ggggg",Td,Nd),ca(["gggg","ggggg","GGGG","GGGGG"],function(a,b,c,d){b[d.substr(0,2)]=u(a)}),ca(["gg","GG"],function(b,c,d,e){c[e]=a.parseTwoDigitYear(b)}),
// FORMATTING
U("Q",0,"Qo","quarter"),
// ALIASES
J("quarter","Q"),
// PRIORITY
M("quarter",7),
// PARSING
Z("Q",Jd),ba("Q",function(a,b){b[be]=3*(u(a)-1)}),
// FORMATTING
U("D",["DD",2],"Do","date"),
// ALIASES
J("date","D"),
// PRIOROITY
M("date",9),
// PARSING
Z("D",Od),Z("DD",Od,Kd),Z("Do",function(a,b){return a?b._ordinalParse:b._ordinalParseLenient}),ba(["D","DD"],ce),ba("Do",function(a,b){b[ce]=u(a.match(Od)[0],10)});
// MOMENTS
var Se=O("Date",!0);
// FORMATTING
U("DDD",["DDDD",3],"DDDo","dayOfYear"),
// ALIASES
J("dayOfYear","DDD"),
// PRIORITY
M("dayOfYear",4),
// PARSING
Z("DDD",Rd),Z("DDDD",Ld),ba(["DDD","DDDD"],function(a,b,c){c._dayOfYear=u(a)}),
// FORMATTING
U("m",["mm",2],0,"minute"),
// ALIASES
J("minute","m"),
// PRIORITY
M("minute",14),
// PARSING
Z("m",Od),Z("mm",Od,Kd),ba(["m","mm"],ee);
// MOMENTS
var Te=O("Minutes",!1);
// FORMATTING
U("s",["ss",2],0,"second"),
// ALIASES
J("second","s"),
// PRIORITY
M("second",15),
// PARSING
Z("s",Od),Z("ss",Od,Kd),ba(["s","ss"],fe);
// MOMENTS
var Ue=O("Seconds",!1);
// FORMATTING
U("S",0,0,function(){return~~(this.millisecond()/100)}),U(0,["SS",2],0,function(){return~~(this.millisecond()/10)}),U(0,["SSS",3],0,"millisecond"),U(0,["SSSS",4],0,function(){return 10*this.millisecond()}),U(0,["SSSSS",5],0,function(){return 100*this.millisecond()}),U(0,["SSSSSS",6],0,function(){return 1e3*this.millisecond()}),U(0,["SSSSSSS",7],0,function(){return 1e4*this.millisecond()}),U(0,["SSSSSSSS",8],0,function(){return 1e5*this.millisecond()}),U(0,["SSSSSSSSS",9],0,function(){return 1e6*this.millisecond()}),
// ALIASES
J("millisecond","ms"),
// PRIORITY
M("millisecond",16),
// PARSING
Z("S",Rd,Jd),Z("SS",Rd,Kd),Z("SSS",Rd,Ld);var Ve;for(Ve="SSSS";Ve.length<=9;Ve+="S")Z(Ve,Ud);for(Ve="S";Ve.length<=9;Ve+="S")ba(Ve,Ic);
// MOMENTS
var We=O("Milliseconds",!1);
// FORMATTING
U("z",0,0,"zoneAbbr"),U("zz",0,0,"zoneName");var Xe=r.prototype;Xe.add=Pe,Xe.calendar=Vb,Xe.clone=Wb,Xe.diff=bc,Xe.endOf=oc,Xe.format=gc,Xe.from=hc,Xe.fromNow=ic,Xe.to=jc,Xe.toNow=kc,Xe.get=R,Xe.invalidAt=xc,Xe.isAfter=Xb,Xe.isBefore=Yb,Xe.isBetween=Zb,Xe.isSame=$b,Xe.isSameOrAfter=_b,Xe.isSameOrBefore=ac,Xe.isValid=vc,Xe.lang=Re,Xe.locale=lc,Xe.localeData=mc,Xe.max=Ke,Xe.min=Je,Xe.parsingFlags=wc,Xe.set=S,Xe.startOf=nc,Xe.subtract=Qe,Xe.toArray=sc,Xe.toObject=tc,Xe.toDate=rc,Xe.toISOString=ec,Xe.inspect=fc,Xe.toJSON=uc,Xe.toString=dc,Xe.unix=qc,Xe.valueOf=pc,Xe.creationData=yc,
// Year
Xe.year=pe,Xe.isLeapYear=ra,
// Week Year
Xe.weekYear=Ac,Xe.isoWeekYear=Bc,
// Quarter
Xe.quarter=Xe.quarters=Gc,
// Month
Xe.month=ka,Xe.daysInMonth=la,
// Week
Xe.week=Xe.weeks=Ba,Xe.isoWeek=Xe.isoWeeks=Ca,Xe.weeksInYear=Dc,Xe.isoWeeksInYear=Cc,
// Day
Xe.date=Se,Xe.day=Xe.days=Ka,Xe.weekday=La,Xe.isoWeekday=Ma,Xe.dayOfYear=Hc,
// Hour
Xe.hour=Xe.hours=ze,
// Minute
Xe.minute=Xe.minutes=Te,
// Second
Xe.second=Xe.seconds=Ue,
// Millisecond
Xe.millisecond=Xe.milliseconds=We,
// Offset
Xe.utcOffset=Db,Xe.utc=Fb,Xe.local=Gb,Xe.parseZone=Hb,Xe.hasAlignedHourOffset=Ib,Xe.isDST=Jb,Xe.isLocal=Lb,Xe.isUtcOffset=Mb,Xe.isUtc=Nb,Xe.isUTC=Nb,
// Timezone
Xe.zoneAbbr=Jc,Xe.zoneName=Kc,
// Deprecations
Xe.dates=x("dates accessor is deprecated. Use date instead.",Se),Xe.months=x("months accessor is deprecated. Use month instead",ka),Xe.years=x("years accessor is deprecated. Use year instead",pe),Xe.zone=x("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",Eb),Xe.isDSTShifted=x("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",Kb);var Ye=C.prototype;Ye.calendar=D,Ye.longDateFormat=E,Ye.invalidDate=F,Ye.ordinal=G,Ye.preparse=Nc,Ye.postformat=Nc,Ye.relativeTime=H,Ye.pastFuture=I,Ye.set=A,
// Month
Ye.months=fa,Ye.monthsShort=ga,Ye.monthsParse=ia,Ye.monthsRegex=na,Ye.monthsShortRegex=ma,
// Week
Ye.week=ya,Ye.firstDayOfYear=Aa,Ye.firstDayOfWeek=za,
// Day of Week
Ye.weekdays=Fa,Ye.weekdaysMin=Ha,Ye.weekdaysShort=Ga,Ye.weekdaysParse=Ja,Ye.weekdaysRegex=Na,Ye.weekdaysShortRegex=Oa,Ye.weekdaysMinRegex=Pa,
// Hours
Ye.isPM=Va,Ye.meridiem=Wa,$a("en",{ordinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(a){var b=a%10,c=1===u(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c}}),
// Side effect imports
a.lang=x("moment.lang is deprecated. Use moment.locale instead.",$a),a.langData=x("moment.langData is deprecated. Use moment.localeData instead.",bb);var Ze=Math.abs,$e=ed("ms"),_e=ed("s"),af=ed("m"),bf=ed("h"),cf=ed("d"),df=ed("w"),ef=ed("M"),ff=ed("y"),gf=gd("milliseconds"),hf=gd("seconds"),jf=gd("minutes"),kf=gd("hours"),lf=gd("days"),mf=gd("months"),nf=gd("years"),of=Math.round,pf={s:45,// seconds to minute
m:45,// minutes to hour
h:22,// hours to day
d:26,// days to month
M:11},qf=Math.abs,rf=wb.prototype;
// Deprecations
// Side effect imports
// FORMATTING
// PARSING
// Side effect imports
return rf.abs=Wc,rf.add=Yc,rf.subtract=Zc,rf.as=cd,rf.asMilliseconds=$e,rf.asSeconds=_e,rf.asMinutes=af,rf.asHours=bf,rf.asDays=cf,rf.asWeeks=df,rf.asMonths=ef,rf.asYears=ff,rf.valueOf=dd,rf._bubble=_c,rf.get=fd,rf.milliseconds=gf,rf.seconds=hf,rf.minutes=jf,rf.hours=kf,rf.days=lf,rf.weeks=hd,rf.months=mf,rf.years=nf,rf.humanize=md,rf.toISOString=nd,rf.toString=nd,rf.toJSON=nd,rf.locale=lc,rf.localeData=mc,rf.toIsoString=x("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",nd),rf.lang=Re,U("X",0,0,"unix"),U("x",0,0,"valueOf"),Z("x",Vd),Z("X",Yd),ba("X",function(a,b,c){c._d=new Date(1e3*parseFloat(a,10))}),ba("x",function(a,b,c){c._d=new Date(u(a))}),a.version="2.17.1",b(sb),a.fn=Xe,a.min=ub,a.max=vb,a.now=Le,a.utc=k,a.unix=Lc,a.months=Rc,a.isDate=g,a.locale=$a,a.invalid=o,a.duration=Ob,a.isMoment=s,a.weekdays=Tc,a.parseZone=Mc,a.localeData=bb,a.isDuration=xb,a.monthsShort=Sc,a.weekdaysMin=Vc,a.defineLocale=_a,a.updateLocale=ab,a.locales=cb,a.weekdaysShort=Uc,a.normalizeUnits=K,a.relativeTimeRounding=kd,a.relativeTimeThreshold=ld,a.calendarFormat=Ub,a.prototype=Xe,a});
window._poc.models.Parameter = Backbone.Model.extend({});
window._poc.models.ParameterCollection = Backbone.Collection.extend({
    model: window._poc.models.Parameter
});

window._poc.models.Environment = Backbone.Model.extend({});
window._poc.models.EnvironmentCollection = Backbone.Collection.extend({
    model: window._poc.models.Environment,
    active: function () {
        return this.findWhere({ isActive: true });
    }
});
window._poc.models.QueryParam = Backbone.Model.extend({
    defaults: {
        key: '',
        value: ''
    }
});
window._poc.models.QueryParamCollection = Backbone.Collection.extend({
    model: window._poc.models.QueryParam
});
window._poc.models.Header = Backbone.Model.extend({
    defaults: {
        key: '',
        value: '',
        isRequired: false
    }
});
window._poc.models.HeaderCollection = Backbone.Collection.extend({
    model: window._poc.models.Header,

    toObject: function () {
        var obj = {};
        this.forEach(function (model) {
            obj[model.get('key')] = model.get('value');
        });
        return obj;
    },

    build: function (obj) {
        var arr = [];
        for (var key in obj) {
            arr.push(new _poc.models.Header({
                key: key,
                value: obj[key]
            }));
        }
        this.add(arr);
        return this;
    }
});

window._poc.models.Request = Backbone.Model.extend({});

window._poc.models.Response = Backbone.Model.extend({});

window._poc.models.Http = Backbone.Model.extend({
    send: function (options) {
        var that = this;

        delete options.headers['Accept-Encoding'];
        delete options.headers['accept-encoding'];
        delete options.headers['oski-userToken'];

        this.trigger('begin');
        var start = new Date();
        $.ajax({
            method: options.method,
            url: options.url,
            data: options.body,
            headers: options.headers,
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        }).done(function (data, textStatus, request) {
            if (request.status === 204) data = {};
            var response = {
                headers: that.getHeaders(request),
                body: data,
                status: request.status,
                time: new Date() - start
            };
            that.trigger('success', response);
        }).error(function (request, status, error) {
            var response = {
                headers: that.getHeaders(request),
                body: {
                    message: 'Something went wrong.'
                },
                status: 520,
                time: new Date() - start
            }
            if (!_.isEmpty(request.responseText) && request.responseText)
                response.body = JSON.parse(request.responseText);
            if (request.status !== 0)
                response.status = request.status;
            that.trigger('error', response);
        });
    },

    getHeaders: function (request) {
        var split = request.getAllResponseHeaders().split('\n'),
        headers = {};
        $.each(split, function (i, s) {
            if (s === '')
                return;
            var j = s.split(':');
            headers[j[0]] = $.trim(j[1]);
        });
        return headers;
    }

});

window._poc.models.PlaceHolder = Backbone.Model.extend({
    getAction: function (name) {
        var actions = this.get('actions'),
            match;
        if (actions) {
            _.forEach(actions, function (action) {
                if (name === action.name) match = action;
            });
        }
        return match;
    }
});
window._poc.models.PlaceHolderCollection = Backbone.Collection.extend({
    model: window._poc.models.PlaceHolder
});

window._poc.views.RequestView = Backbone.View.extend({
    template: '#tmplRequest',

    initialize: function (options, override) {
        this.options = options;
        this.override = override || {};
        this._view = Handlebars.compile($(this.template).html());

        if (!this.override.readOnly) {
            this.listenTo(this.options.http, 'begin', this.onBegin);
            this.listenTo(this.options.http, 'success', this.onEnd);
            this.listenTo(this.options.http, 'error', this.onEnd);

            this.listenTo(this.options.collection, 'change:isActive', this.onEvnvironmentChange);
            this.listenTo(this.options.placeHolderCollection, 'change:value', this.onPlaceHolderValueChange);
        }
    },

    onBegin: function () {
        var that = this;
        this.$button.button('loading');
        $('html,body').animate({
            scrollTop: that.$button.offset().top
        }, 'slow');
    },

    onEnd: function () {
        this.$button.button('reset');
    },

    onEvnvironmentChange: function () {
        this.renderEnvironment();
    },

    buildEditors: function () {
        // build the editors only once
        if (this.editors) return;

        this.editors = [];

        if (this.hasBody()) {
            this.editors.push(new _poc.views.JsonEditorView(this.options, {
                selector: '.request-body',
                property: 'body',
                type: 'request',
                themeModel: this.options.themeModel,
                mapping: this.options.requestBodyMapping,
                readOnly: this.override.readOnly !== undefined ? this.override.readOnly : false
            }));
        }
        if (this.hasParams()) {
            this.editors.push(new _poc.views.ParamEditorView(this.options, {
                selector: '.request-params',
                property: 'params',
                type: 'request',
                mapping: this.options.requestParamsMapping,
                readOnly: this.override.readOnly !== undefined ? this.override.readOnly : false
            }));
        }
    },

    // merge place holder and request object
    mergeObjects: function () {
        var that = this;
        // don't update the body if the view is in read-only mode
        if (!this.override.readOnly) {
            var that = this;
            this.editors.forEach(function (editor) {
                // get the model for current model
                that.options.placeHolderCollection
                    .where({ 'section': 'body' })
                    .forEach(function (model) {
                        var action = model.getAction(that.options.title);
                        if (action) that.updateRequest(action, editor.options.property, model.get('value'), model.get('type'));
                    });
            });
        }

        this.editors.forEach(function (editor) {
            editor.updateValue(that.env.get('request').get(editor.options.property));
        });
    },

    arrayRegex: /\[([\d]+)\]/,
    updateRequest: function (model, property, value, type) {
        if (model.target.indexOf('request') === -1 || value === undefined || model.target.indexOf(property) === -1) return;

        var json = this.env.get('request').get(property),
            subJson = json;

        // split on path, and try to populate the model
        var split = model.path.split('/');
        for (var i = 0; i < split.length; i++) {
            var prop = split[i];
            if (_.isEmpty(prop)) continue;

            // check for array
            var match = prop.match(this.arrayRegex);
            if (match && match.length === 2) {
                prop = prop.replace(match[0], '');
            }

            if (subJson[prop] === undefined && i < split.length - 1) {
                if (match) subJson[prop] = [];
                else subJson[prop] = {};
            }

            var obj = subJson[prop];
            if (typeof (obj) === 'object' && i < split.length - 1) {
                if (match && match.length === 2) {
                    obj = obj[parseInt(match[1])];
                }
                if (obj === undefined) break;
                obj = obj || {};
                subJson = obj;
                continue;
            }
            if (typeof (obj) !== 'object') {
                switch (type) {
                    case 'string':
                        if (!_.isEmpty(value))
                            subJson[prop] = value;
                        break;
                    case 'number':
                        subJson[prop] = parseInt(value, 10);
                        break;
                    case 'decimal':
                        subJson[prop] = parseFloat(value, 10);
                        break;
                    case 'array':
                        subJson[prop] = [];
                        var items = value;
                        items.forEach(function (item) {
                            subJson[prop].push(item);
                        });
                        break;
                }
            } else {
                switch (type) {
                    case 'string':
                        if (!_.isEmpty(value))
                            obj.value = value;
                        break;
                    case 'number':
                        obj.value = parseInt(value, 10);
                        break;
                    case 'decimal':
                        obj.value = parseFloat(value, 10);
                        break;
                    case 'array':
                        obj.value = [];
                        var items = value;
                        items.forEach(function (item) {
                            obj.value.push(item);
                        });
                        break;
                }
            }
        }

        this.env.get('request').set(property, json);
    },

    onPlaceHolderValueChange: function (model) {
        var that = this;
        // Set the active environment
        this.env = this.env || this.collection.active();

        // build the editors if they are not
        if (!this.editors) this.buildEditors();

        // if it's for header ignore it, as header view is listening to it
        if (model.get('section').indexOf('header') !== -1) return;

        var action = model.getAction(this.options.title);
        if (action) {
            this.editors.forEach(function (editor) {
                that.env.get('request').set(editor.options.property, editor.getModel());

                that.updateRequest(action, editor.options.property, model.get('value'), model.get('type'));

                editor.updateValue(that.env.get('request').get(editor.options.property));
            });
        }
    },

    renderEnvironment: function () {
        var that = this;
        // get the active environment
        this.env = this.collection.active();

        var request = this.env.get('request');
        var url = this.env.get('baseUrl') + request.get('url');
        $('.request-url', this.$el).html(url);
        $('.text-request-url', this.$el).val();
        this.mergeObjects();

        // render the header view
        var headers = request.get('headers');
        var headerView = new _poc.views.HeadersView({
            parent: 'request',
            placeHolderCollection: that.options.placeHolderCollection,
            collection: headers,
            title: this.options.title,
            enabled: this.override.readOnly !== undefined ? !this.override.readOnly : true
        });

        // on add/remove of headers, update the count
        function updateCount() { $('#spanHeaderCount', that.$el).html(headers.length); };
        this.listenTo(headers, 'add', updateCount);
        this.listenTo(headers, 'remove', updateCount);
        updateCount();

        headerView.render($('.request-headers', this.$el));
        this.headerView = headerView;

        // for mobile device show tooltip when user tap on text box
        $('.text-request-url', this.$el)
            .val(url)
            .data('content', url)
            .popover();
    },

    hasBody: function () {
        return _.isEmpty(this.env.get('request').get('body')) === false;
    },

    hasParams: function () {
        return _.isEmpty(this.env.get('request').get('params')) === false;
    },

    render: function ($container) {
        var that = this;
        this.$el = $container;

        // get the active environment
        this.env = this.collection.active();

        // dump the html
        this.$el.html(this._view({
            method: this.options.method,
            envs: this.options.collection.toJSON(),
            readOnly: this.override.readOnly !== undefined ? this.override.readOnly : false,
            showBody: this.hasBody(),
            showParams: this.hasParams(),
            uId: _.uniqueId('c')
        }));

        // get the reference of button
        this.$button = $('.btn-primary', this.$el);

        // switch to second tab, as it is always active by default
        $('.nav-small li:nth-child(2) a', this.$el).click();

        // construct the editor
        this.buildEditors();

        this.bindEvents();

        // render the editors
        this.editors.forEach(function (editor) {
            editor.render($(editor.selector, that.$el));
        });

        this.renderEnvironment();
    },

    extractValues: function (request) {
        // don't do anything if view is read only mode
        if (this.override.readOnly) return;

        // check if the request is JSON
        if (typeof (request) === 'string') request = JSON.parse(request);

        var that = this;
        this.options.placeHolderCollection
            .where({ 'section': 'body' })
            .forEach(function (model) {
                var action = model.getAction(that.options.title);
                if (action.target !== 'request.body' || !action.path || action.operation !== 'read') return;
                var json = request,
                    subJson = json;
                var split = action.path.split('/');
                for (var i = 0; i < split.length; i++) {
                    var prop = split[i];
                    if (_.isEmpty(prop)) continue;

                    // check for array
                    var match = prop.match(that.arrayRegex);
                    if (match && match.length === 2) {
                        prop = prop.replace(match[0], '');
                    }

                    if (subJson === undefined || subJson[prop] === undefined) return;

                    var obj = subJson[prop];
                    if (typeof (obj) === 'object' && i < split.length - 1) {
                        if (match && match.length === 2) {
                            obj = obj[parseInt(match[1])];
                        }
                        subJson = obj;
                        continue;
                    }
                    // update the value in place holder collection
                    if (obj !== undefined)
                        model.set('value', obj);
                }
            });
    },

    bindEvents: function () {
        var that = this;

        // For mobile device, text box has the URL
        // Don't allow to edit it
        $('.text-request-url', that.$el).keydown(function (e) {
            e.preventDefault();
            return false;
        });

        // Handle the button click event
        // Validate the request
        // If valid, fire the request
        this.$button.click(function (e) {
            e.preventDefault();

            var message = [];

            // validate editors
            that.editors.forEach(function (editor) {
                if (editor.validate() === false) {
                    // body validator
                    if (editor.options.property === 'body')
                        message.push('Request body is invalid.');
                    else // parameter validator
                        message.push('Request params is invalid.');
                }
            });

            // Validate the headers view
            if (that.headerView.validate() === false)
                message.push('Headers are not set properly.');

            // Hide the error message
            $('#invalidRequest', that.$el).hide();

            // If the message has error, then show the message
            if (message.length) {
                $('#invalidRequest', that.$el).show().html(message.join(' and ') + '.');
                return;
            }

            var request = that.env.get('request');

            var opt = {
                method: that.options.method,
                url: that.env.get('baseUrl') + request.get('url'),
                headers: request.get('headers').toObject()
            };

            that.editors.forEach(function (editor) {
                // if the editor is for body, set the value to body of the request
                if (editor.options.property === 'body') {
                    opt['body'] = JSON.stringify(editor.getValue());
                } else {
                    // if the editor is for params, update the value of URL of the request
                    var params = [];
                    var json = editor.getValue();
                    for (var key in json) {
                        // if value is undefined or empty don't send it
                        if (json[key] === undefined || _.isEmpty(json[key])) continue;
                        // if the parameter is defined in URL, then replace it with key and value
                        // else add them as query string
                        if (opt.url.indexOf(key) !== -1)
                            opt.url = opt.url.replace('{' + key + '}', json[key]);
                        else
                            params.push(key + '=' + json[key]);
                    }
                    // user has defined custom query string
                    // add them to URL
                    if (params.length) {
                        if (opt.url.indexOf('?') === -1) opt.url += '?';
                        else opt.url += '&';
                        opt.url += params.join('&');
                    }
                }
            });

            // extract parameters from the request's body
            that.extractValues(opt.body);

            // make the request
            that.options.http.send(opt);

            return false;
        });
    }
});

window._poc.views.ResponseView = Backbone.View.extend({
    template: '#tmplResponse',

    status: {
        200: '<strong>200 OK</strong><br/>Standard response for successful HTTP requests.',
        201: '<strong>201 Created</strong><br/>The request has been fulfilled, resulting in the creation of a new resource.',
        202: '<strong>202 Accepted</strong><br/>The request has been accepted for processing, but the processing has not been completed.',
        204: '<strong>204 No Content</strong><br/>The server successfully processed the request and is not returning any content.',
        400: '<strong>400 Bad Request</strong><br/>The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, too large size, invalid request message framing, or deceptive request routing).',
        401: '<strong>401 Unauthorized</strong><br/>Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet been provided.',
        403: '<strong>403 Forbidden</strong><br/>The request was a valid request, but the server is refusing to respond to it. The user might be logged in but does not have the necessary permissions for the resource.',
        404: '<strong>404 Not Found</strong><br/>The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.',
        500: '<strong>500 Internal Server Error</strong><br/>A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.',
        502: '<strong>502 Bad Gateway</strong><br/>The server was acting as a gateway or proxy and received an invalid response from the upstream server.',
        503: '<strong>503 Service Unavailable</strong><br/>The server is currently unavailable (because it is overloaded or down for maintenance). Generally, this is a temporary state.',
        504: '<strong>504 Gateway Timeout</strong><br/>The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.',
        520: '<strong>520 Unknown Error</strong><br/>The 520 error is used as a "catch-all response for when the origin server returns something unexpected", listing connection resets, large headers, and empty or invalid responses as common triggers.'
    },

    initialize: function (options, override) {
        this.options = options;
        this.override = override || {};
        this._view = Handlebars.compile($(this.template).html());

    },

    render: function ($container) {
        this.$el = $container;
        this.$el.html(this._view({
            uId: _.uniqueId('c')
        }));

        this.buildEditor();
    },

    buildEditor: function () {
        if (this.editor) return;
        this.editor = new _poc.views.JsonEditorView(this.options, {
            type: 'response',
            selector: '.response-body',
            themeModel: this.options.themeModel,
            mapping: this.options.responseBodyMapping,
            readOnly: this.override.readOnly !== undefined ? this.override.readOnly : true
        });
    },

    renderLoader: function () {
        var that = this;
        $('.response-loader', this.$el).parent().removeClass('hide');
        $('.response', this.$el).addClass('hide');
    },
    arrayRegex: /\[([\d]+)\]/,
    extractValues: function (response) {
        // don't do anything if view is read only mode
        if (this.override.readOnly) return;
        var that = this;
        this.options.placeHolderCollection
            .where({ 'section': 'body' })
            .forEach(function (model) {
                var action = model.getAction(that.options.title);
                if (action.target !== 'response.body' || !action.path || action.operation === 'read') return;
                var json = response,
                    subJson = json;
                var split = action.path.split('/');
                for (var i = 0; i < split.length; i++) {
                    var prop = split[i];
                    if (_.isEmpty(prop)) continue;

                    // check for array
                    var match = prop.match(that.arrayRegex);
                    if (match && match.length === 2) {
                        prop = prop.replace(match[0], '');
                    }

                    if (subJson === undefined || subJson[prop] === undefined) return;

                    var obj = subJson[prop];
                    if (typeof (obj) === 'object' && i < split.length - 1) {
                        if (match && match.length === 2) {
                            obj = obj[parseInt(match[1])];
                        }
                        subJson = obj;
                        continue;
                    }
                    // update the value in place holder collection
                    if (obj !== undefined)
                        model.set('value', obj);
                }
            });
    },

    renderResponse: function (response) {
        var that = this;

        $('.response-loader', this.$el).parent().addClass('hide');

        $('.response', this.$el).removeClass('hide');

        // for 204 status code there is no body
        if (response.get('status') !== 204) {
            // switch to body tab, 
            // as Monaco editor fail to render correctly if the element which contains it is not visible to user
            $('.nav-small li:nth-child(2) a', this.$el).show().click();

            this.extractValues(response.get('body'));

            this.editor.render($(this.editor.selector, this.$el));

            this.editor.updateValue(response.get('body'));
        } else {
            $('.nav-small li:nth-child(2) a', this.$el).hide();
            $('.nav-small li:nth-child(1) a', this.$el).click();
        }

        var headers = response.get('headers');
        var headerView = new _poc.views.HeadersView({
            parent: 'response',
            placeHolderCollection: that.options.placeHolderCollection,
            collection: headers,
            enabled: this.override.readOnly !== undefined ? !this.override.readOnly : false
        });
        $('#spanHeaderCount', this.$el).html(headers.length);
        headerView.render($('.response-headers', this.$el));
        this.headerView = headerView;

        // render the stats
        if (response.get('status') && !this.override.readOnly) {
            var status = this.status[response.get('status')];
            status = status || 'No information found for HTTP Status Code: ' + response.get('status');
            $('.response-time', this.$el)
                .popover()
                .html(response.get('time') + ' ms');
            $('.response-status', this.$el)
                .popover({
                    content: status,
                    html: true
                })
                .html(response.get('status'));
        } else {
            $('.status-view', this.$el).remove();
        }
    }
});

window._poc.views.ConsoleView = Backbone.View.extend({
    template: '#tmplConsole',

    initialize: function (options) {
        this.options = options;

        this._view = Handlebars.compile($(this.template).html());

        this.requestView = new _poc.views.RequestView(this.options);
        this.responseView = new _poc.views.ResponseView(this.options);
        
        this.listenTo(this.options.http, 'begin', this.onBegin);
        this.listenTo(this.options.http, 'success', this.onEnd);
        this.listenTo(this.options.http, 'error', this.onEnd);
    },

    render: function ($container) {
        this.$el = $container;

        this.$el.html(this._view({ title: this.options.title }));

        this.requestView.render($('.request-container', this.$el));
        this.responseView.render($('.response-container', this.$el));

        this.bindEvents();

        this.renderResponse();
    },

    bindEvents: function () {
        var that = this;
        $('.switch-button', this.$el).click(function (e) {
            that.sampleView.render(that.$el);
        });
    },

    onBegin: function () {
        this.responseView.renderLoader();
    },

    buildModel: function (response) {
        var headers = new _poc.models.HeaderCollection();
        headers.build(response.headers);
        var model = new _poc.models.Response({
            headers: headers,
            body: response.body,
            status: response.status,
            time: response.time,
            isLive: true
        });
        return model;
    },

    onEnd: function (response) {
        var env = this.options.collection.active();
        var response = this.buildModel(response);
        env.set('response', response);
        this.renderResponse();
    },

    renderResponse: function () {
        var env = this.options.collection.active();
        var response = env.get('response');
        $('.response-header', this.$el).hide();
        if (response.get('isLive')) {
            $('.response-header', this.$el).show();
            this.responseView.renderResponse(response);
        }
    }
});

window._poc.views.DetailsPaneView = Backbone.View.extend({
    template: '#tmplDetailsPane',
    height: 395,
    jsonHelp: {
        helpText: '<i>Click the JSON property to view its description.</i>',
        infoText: '<i>Note: If you update the sample code, click the <strong>Format JSON</strong> icon (<i class="fa fa-indent font-14 mls mrs"></i>) at the top-right corner of the editor to ensure that the property description appears correctly.</i>'
    },

    headerHelp: {
        helpText: '<i>Click the header name to view its description.</i>'
    },

    textHelp: {
        helpText: '<i>Click the property to view its description.</i>'
    },

    initialize: function (options, type) {
        this.type = type || 'json';
        this.options = options || {};
        this._view = Handlebars.compile($(this.template).html());
        this._enumView = Handlebars.compile($('#tmplSampleEnumArray').html());
        this._objectView = Handlebars.compile($('#tmplSampleObject').html());
    },

    render: function ($container) {
        this.$el = $container;
        this.renderContent();
        this.bindEvents();
    },

    bindEvents: function () {
        var that = this;
        $(window).resize(function () {
            setTimeout(function () {
                that.renderScroll();
            }, 500);
        });
    },

    renderScroll: function () {
        var parentHeight = this.$el.parent().height(), height = this.height;
        if (height < parentHeight) height = parentHeight;

        $('.editor-help-text-container', this.$el).height(height - 60);
        // apply scroll plugin
        $('.editor-help-text-container', this.$el).asScrollable({
            namespace: "scrollable",
            contentSelector: "> [data-role='content']",
            containerSelector: "> [data-role='container']",
            responsive: true
        });
    },

    renderContent: function (item) {
        if (item) {
            if (item.description) item.content = marked(item.description);
            if (item.sampleValue) {
                if (typeof (item.sampleValue) === 'string')
                    item.sampleValueHtml = this._objectView({ item: { value: item.sampleValue } });
                else if (item.sampleValue instanceof Array)
                    item.sampleValueHtml = this._enumView({ items: item.sampleValue });
                else if (item.sampleValue instanceof Object)
                    item.sampleValueHtml = this._objectView({ item: item.sampleValue });
            }
        }
        var help = this.headerHelp;
        switch (this.type) {
            case 'json':
                help = this.jsonHelp;
                break;
            case 'text':
                help = this.textHelp;
                break;

        }
        this.$el.html(this._view({
            item: item,
            help: help
        }));

        // scroll is required when there is some content
        if (item)
            this.renderScroll();
    }
});
window._poc.views.SampleView = Backbone.View.extend({
    template: '#tmplSampleView',

    initialize: function (options) {
        this.options = options;

        this.requestView = new _poc.views.RequestView(this.options, { readOnly: true });
        this.responseView = new _poc.views.ResponseView(this.options, { readOnly: true });

        this._view = Handlebars.compile($(this.template).html());
    },

    render: function ($container) {
        this.$el = $container;

        this.$el.html(this._view({ title: this.options.title }));

        this.requestView.render($('.request-container', this.$el));
        this.responseView.render($('.response-container', this.$el));

        var env = this.options.collection.active();
        var response = env.get('response');
        this.renderResponse(response);

        this.bindEvents();
    },

    bindEvents: function () {
        var that = this;
        $('.switch-button', this.$el).click(function (e) {
            that.consoleView.render(that.$el);
        });
    },

    renderResponse: function (response) {
        this.responseView.renderResponse(response);
    }
});
window._poc.views.JsonEditorView = Backbone.View.extend({
    template: '#tmplJsonEditor',
    _ms: null,
    data: null,
    lines: null,

    initialize: function (global, options) {
        this.global = global;
        this.options = options || {};
        this.selector = options.selector;

        this._view = Handlebars.compile($(this.template).html());
        this.detailsView = new _poc.views.DetailsPaneView(this.global, 'json');
        this.listenTo(this.options.themeModel, 'change', this.switchTheme);
    },

    switchTheme: function () {
        this._ms.updateOptions({
            'theme': this.options.themeModel.get('theme')
        });
    },

    render: function ($container) {
        this.$el = $container;

        this.$el.html(this._view({
            readOnly: this.options.readOnly !== undefined ? this.options.readOnly : false,
            enableFullscreen: screenfull.enabled,
            cid: this.cid
        }));
        this.$editorContainer = $('#editor-container' + this.cid);

        this._ms = monaco.editor.create(document.getElementById('editor-container' + this.cid), {
            value: '{}',
            language: 'json',
            scrollBeyondLastLine: false,
            readOnly: this.options.readOnly !== undefined ? this.options.readOnly : false,
            folding: true,
            theme: this.theme,
            nativeContextMenu: false
        });

        this.detailsView.render($('.help-block-container', this.$el));

        this.bindEvents();

        this.switchTheme();
    },

    updateValue: function (value) {
        if (typeof (value) !== 'string')
            value = JSON.stringify(value, null, 2);

        if (this._ms)
            this._ms.setValue(value);

        this.data = value;
        this.lines = this.data.split('\n');

        this.renderDecoration();
    },

    renderDecoration: function () {
        this.decorations = this.decorations || [];
        // remove old ones
        this._ms.deltaDecorations(this.decorations, []);

        var decorations = [];
        for (var count = 0; count < this.lines.length; count++) {
            var line = this.lines[count];
            var item = this.getSelectedItem(count + 1);
            if (!item || item.isRequired !== true) continue;

            var start = line.indexOf(item.title),
                end = start + item.title.length;
            decorations.push(this._ms.deltaDecorations([], [
	        {
	            range: new monaco.Range(count + 1, start + 1, count + 1, end + 1),
	            options: {
	                inlineClassName: 'required-glyph-margin'
	            }
	        }
            ]));
        }
        this.decorations = decorations;
    },

    getJSON: function (str) {
        try {
            return JSON.parse(str);
        } catch (e) {
            return null;
        }
    },

    buildPath: function (key, row, indent) {
        var path = '/' + key;
        while (--row) {
            var rowContent = this.lines[row - 1];
            if ((rowContent.indexOf('{') === rowContent.length - 1) || (rowContent.indexOf('[') === rowContent.length - 1)) {
                var prop = rowContent.split(':')[0].replace(/"/g, ''),
                spaceCount = (prop.match(/ /g) || []).length,
                prop = $.trim(prop);
                if (indent > spaceCount && prop !== '{' && prop !== '[') {
                    path = '/' + prop + path;
                    indent = spaceCount;
                }
            }
        }

        return path;
    },

    getSelectedItem: function (row) {
        var rowContent = this.lines[row - 1];
        if (!rowContent || rowContent.indexOf(':') === -1)
            return;

        // Assumption
        // Key will never have double quotes
        var trimContent = $.trim(rowContent),
            start = trimContent.indexOf('"') + 1,
            end = trimContent.indexOf(":") - 1;

        if (start >= end) return;
        var selectedKey = trimContent.substring(start, end);

        var prop = this.lines[row - 1].split(':')[0].replace(/"/g, ''),
        spaceCount = (prop.match(/ /g) || []).length;

        var item = $.extend({}, true, this.options.mapping[this.buildPath(selectedKey, row, spaceCount)]);
        item.title = selectedKey;
        return item;
    },

    bindEvents: function () {
        var that = this;

        var timerRef, env = this.global.collection.active();
        var request = env.get('request');
        this._ms.onKeyUp(function (e) {
            if (timerRef)
                clearTimeout(timerRef);
            timerRef = setTimeout(function () {
                timerRef = undefined;

                var newData = that._ms.getValue();
                if (that.data == newData) return;
                that.data = newData;

                that.lines = that.data.split('\n');
                that.renderDecoration();

                request.set('body', that.data);
            }, 1000);
        });

        this._ms.onMouseDown(function (e) {
            var selection = e.target.element.innerText.replace(/"/g, '');
            var item = that.getSelectedItem(e.target.position.lineNumber);

            that.detailsView.renderContent(item);
        });

        var selector = $('.pretty-content', that.$el),
            editorHeight = this.$editorContainer.height(),
            target = selector[0],
            top = 0;

        var enterFullscreen = function () {
            setTimeout(function () {
                that.$editorContainer.height($(window).height());
            }, 300);
        }
        var exitFullscreen = function () {
            setTimeout(function () {
                that.$editorContainer.height(editorHeight);
                $('html,body').animate({
                    scrollTop: top
                }, 'fast');
            }, 300);
        }

        // go to full screen
        $('.btn-full', this.$el).click(function () {
            $('.pretty-content', that.$el).toggleClass('fullscreen');
            if (!screenfull.isFullscreen) {
                top = selector.offset().top;
                screenfull.request(target);
                enterFullscreen();
            } else {
                screenfull.exit(target);
                exitFullscreen();
            }
        });

        if (screenfull) {
            $(document).on(screenfull.raw.fullscreenchange, function () {
                if (!screenfull.isFullscreen && $('.pretty-content', that.$el).hasClass('fullscreen')) {
                    $('.pretty-content', that.$el).removeClass('fullscreen');
                    exitFullscreen();
                }
            });
        }

        // change the color of editor
        $('.btn-color', that.$el).click(function () {
            var theme = that.options.themeModel.get('theme');
            theme = theme === 'vs-dark' ? 'vs' : 'vs-dark';
            that.options.themeModel.set('theme', theme);
        });

        // format the json
        $('.btn-format', that.$el).click(function () {
            var content = that._ms.getValue();
            try {
                var json = JSON.parse(content);
                that.updateValue(json);
            } catch (e) {
                alert('Invalid JSON');
            }
        });

        // on window resize update the editor layout
        $(window).resize(function () {
            setTimeout(function () {
                that._ms.layout();
            }, 500);
        });
    },

    validate: function () {
        var json = this.getValue();
        return json !== null;
    },

    getModel: function () {
        return this.getValue();
    },

    getValue: function () {
        var value = {};
        if (this._ms) {
            var data = this._ms.getValue();
            try {
                value = JSON.parse(data);
            } catch (e) { }
        }
        return value;
    }
});

window._poc.views.ParamEditorView = Backbone.View.extend({
    template: '#tmplParamEditor',
    rowTemplate: '#tmplFieldRow',

    initialize: function (global, options) {
        this.global = global;
        this.options = options || {};
        this.selector = options.selector;

        this._view = Handlebars.compile($(this.template).html());
        this._rowView = Handlebars.compile($(this.rowTemplate).html());

        // build a local collection
        this.collection = new _poc.models.QueryParamCollection();
        this.listenTo(this.collection, 'add', this.onAdd);
        this.listenTo(this.collection, 'remove', this.onRemove);

        this.detailsView = new _poc.views.DetailsPaneView(this.global, 'text');
    },

    onAdd: function (model) {
        this.addRow(model);
    },

    onRemove: function (model) {
        $('#' + model.cid, this.$el).remove();
    },

    renderTable: function (json) {
        // reset the collection
        this.collection.reset();

        // input is string, convert to json
        if (typeof (json) === 'string')
            json = JSON.parse(json);

        // empty the table
        // TODO: remove this
        this.$table.empty();

        // read each property of json and 
        // build the collection
        var models = [];
        for (var key in json) {
            var val = json[key];
            var model = new _poc.models.QueryParam({
                key: key,
                value: val.value,
                isRequired: val.isRequired
            });
            models.push(model);
        }
        this.collection.add(models);
    },

    render: function ($container) {
        this.$el = $container;

        // render the view
        this.$el.html(this._view({
            cid: this.cid,
            enabled: this.options.readOnly !== undefined ? !this.options.readOnly : true
        }));

        // get the reference of the table
        this.$table = $('table', this.$el);

        // bind the events
        this.bindEvents();

        // render the details view
        this.detailsView.render($('.help-block-container', this.$el));
    },

    addRow: function (model) {
        var that = this;

        // create the row
        var $row = $($.trim(this._rowView({
            field: model
        })));

        // append to table
        this.$table.append($row);

        // shows help and disable the input
        // as keys are not allowed to be edited
        $('input.key', $row).focus(function () {
            var val = $(this).val();
            var match = that.options.mapping[val];
            if (match) {
                match['title'] = val;
            }
            that.detailsView.renderContent(match);
        });

        // remove the parameter
        $('.btn-remove', $row).click(function () {
            that.collection.remove(getModel($(this)));
        });

        if (!model.get('editKey'))
            $('input.key', $row).disableInput();

        // helper function
        var getModel = function ($this) {
            var cId = $this.data('target');
            return that.collection.get(cId);
        };

        if (!this.options.readOnly) {
            // update the value
            $('input', $row).blur(function () {
                var model = getModel($(this));

                var value = $.trim($(this).val());
                if ($(this).hasClass('key'))
                    model.set('key', value);
                else
                    model.set('value', value);

                that.isModelValid(model);
            });
        } else {
            // disable the value text box also
            $('input.value', $row).disableInput();
        }
    },

    bindEvents: function () {
        var that = this,
            hasScroll = false;

        // add header
        $('#addProperty', this.$el).click(function () {
            // to identify user has added the key, add editKey flag
            var model = new _poc.models.QueryParam({
                editKey: true
            });
            that.collection.add([model]);
            setTimeout(function () {
                $('input.key[data-target="' + model.cid + '"').focus();
            }, 100);

            // add a scroller
            if (!hasScroll) {
                $('.header-table-container', that.$el).asScrollable({
                    namespace: "scrollable",
                    contentSelector: "> [data-role='content']",
                    containerSelector: "> [data-role='container']",
                    responsive: true
                });
            }
        });
    },

    updateValue: function (value) {
        this.renderTable(value);
    },

    getJSON: function (str) {
        try {
            return JSON.parse(str);
        } catch (e) {
            return null;
        }
    },

    isModelValid: function (model) {
        if (model.get('isRequired') !== true) return;
        // validate key only when user adds it
        var isValid = !((model.get('editKey') && model.get('key') === '') || model.get('value') === '');
        if (isValid)
            $('#' + model.cid, this.$el).removeClass('has-error');
        else
            $('#' + model.cid, this.$el).addClass('has-error');
        return isValid;
    },

    validate: function () {
        var that = this,
        isValid = true;
        this.collection.forEach(function (model) {
            if (that.isModelValid(model) === false) {
                isValid = false;
            }
        });
        return isValid;
    },

    getModel: function () {
        var that = this;
        var json = {};

        this.collection.forEach(function (model) {
            var isRequired;
            for (var key in that.options.mapping) {
                if (key !== model.get('key')) continue;
                isRequired = that.options.mapping[key].isRequired;
                break;
            }
            json[model.get('key')] = {
                value: model.get('value'),
                isRequired: isRequired
            }
        });
        return json;
    },

    getValue: function () {
        var json = {};
        this.collection.forEach(function (model) {
            json[model.get('key')] = model.get('value');
        });
        return json;
    }
});

window._poc.views.HeadersView = Backbone.View.extend({

    template: '#tmplHeaders',
    rowTemplate: '#tmplHeaderRow',
    mapping: null,

    initialize: function (options) {
        this.options = options || {};
        this.parent = options.parent;
        if (this.options.enabled == null)
            this.options.enabled = true;

        this._view = Handlebars.compile($(this.template).html());
        this._rowView = Handlebars.compile($(this.rowTemplate).html());

        this.listenTo(this.collection, 'add', this.onAdd);
        this.listenTo(this.collection, 'remove', this.onRemove);

        this.listenTo(this.options.placeHolderCollection, 'change:value', this.onPlaceHolderValueChange);

        this.detailsView = new _poc.views.DetailsPaneView(options, 'headers');

        this.defaultMapping();
    },

    render: function ($container) {
        var that = this;
        this.$el = $container;

        // render the table
        this.$el.html(this._view({
            enabled: this.options.enabled
        }));
        this.$table = $('table', this.$el);

        // merge place holder and current collection
        this.mergeCollection();

        // render the rows
        this.collection.forEach(function (model) {
            var match = that.mapping[model.get('key').toLowerCase()];
            if (match) model.set('isRequired', match.isRequired);
            that.addRow(model);
        });

        // bind events
        this.bindEvents();

        // render the details view
        this.detailsView.render($('.help-block-container', this.$el));
    },

    mergeCollection: function () {
        var that = this;
        this.options.placeHolderCollection.forEach(function (item) {
            if (_.isEmpty(item.get('value'))) return;
            var match = that.getMatch(item.get('key'));
            if (match) match.set('value', item.get('value'));
        });
    },

    getMatch: function (key) {
        return this.collection.findWhere({ key: key });
    },

    onPlaceHolderValueChange: function (model) {
        // if it's for body ignore it, as body view is listening to it
        if (model.get('section').indexOf('body') !== -1) return;
        var action = model.getAction(this.options.title);
        if (!action || action.target.indexOf(this.parent) === -1) return;

        // get the matching header
        var match = this.getMatch(model.get('key'));
        if (!match) return;

        // update the UI
        $('input.value[data-target="' + match.cid + '"]', this.$el).val(model.get('value'));
        // update the model
        match.set('value', model.get('value'));
    },

    addRow: function (model) {
        var that = this;
        // get the row
        var $row = $($.trim(this._rowView({
            header: model,
            enabled: this.options.enabled
        })));

        // add to table
        this.$table.append($row);

        // helper function
        var getModel = function ($this) {
            var cId = $this.data('target');
            return that.collection.get(cId);
        };

        // bind the events
        // shows help
        $('input.key', $row).focus(function () {
            var val = $(this).val();
            var match = that.mapping[val.toLowerCase()];
            if (match) {
                match['title'] = val;
            }
            that.detailsView.renderContent(match);
        });

        // remove the header
        $('.btn-remove', $row).click(function () {
            that.collection.remove(getModel($(this)));
        });

        if (this.options.enabled) {
            // update the value
            $('input', $row).blur(function () {
                var model = getModel($(this));

                var value = $.trim($(this).val());
                if ($(this).hasClass('key'))
                    model.set('key', value);
                else
                    model.set('value', value);

                that.isModelValid(model);
            });
        } else {
            $('input', $row).disableInput();
        }
    },

    bindEvents: function () {
        var that = this,
            hasScroll = false;

        // add header
        $('#addHeader', this.$el).click(function () {
            var model = new _poc.models.Header();
            that.collection.add([model]);
            setTimeout(function () {
                $('input.key[data-target="' + model.cid + '"').focus();
            }, 100);

            // add a scroller
            if (!hasScroll) {
                $('.header-table-container', that.$el).asScrollable({
                    namespace: "scrollable",
                    contentSelector: "> [data-role='content']",
                    containerSelector: "> [data-role='container']",
                    responsive: true
                });
            }
        });
    },

    onAdd: function (model) {
        this.addRow(model);
    },

    onRemove: function (model) {
        $('#' + model.cid, this.$el).remove();
    },

    isModelValid: function (model) {
        var isValid = !(model.get('key') === '' || model.get('value') === '');
        if (isValid)
            $('#' + model.cid, this.$el).removeClass('has-error');
        else
            $('#' + model.cid, this.$el).addClass('has-error');
        return isValid;
    },

    validate: function () {
        var that = this,
        isValid = true;
        this.collection.forEach(function (model) {
            if (that.isModelValid(model) === false) {
                isValid = false;
            }
        });
        return isValid;
    },

    defaultMapping: function () {
        this.mapping = {
            'content-type': {
                description: 'The Content-Type header field is used to specify the nature of the data in the body of an entity, by giving type and subtype identifiers, and by providing auxiliary information that may be required for certain types.<br/>After the type and subtype names, the remainder of the header field is simply a set of parameters, specified in an attribute/value notation. The set of meaningful parameters differs for the different types.',
                isRequired: true,
                sampleValue: 'application/json'
            },
            'accept-encoding': {
                description: 'The Accept-Encoding request HTTP header advertises which content encoding, usually a compression algorithm, the client is able to understand. Using content negotiation, the server selects one of the proposals, uses it and informs the client of its choice with the Content-Encoding response header. <br/> Even if both the client and the server supports the same compression algorithms, the server may choose not to compress the body of a response, if the identity value is also acceptable. Two common cases lead to this:<ul><li>The data to be sent is already compressed and a second compression won\'t lead to smaller data to be transmitted. This may the case with some image formats;</li><li>The server is overloaded and cannot afford the computational overhead induced by the compression requirement. Typically, Microsoft recommends not to compress if a server use more than 80 % of its computational power.</li></ul>',
                isRequired: true,
                sampleValue: 'gzip, deflate'
            },
            'accept-language': {
                description: 'The Accept-Language header is used to indicate the language preference of the user. It is a list of values with quality factors.',
                isRequired: false,
                sampleValue: 'en-US'
            },
            'oski-tenantid': {
                description: 'Tenant ID. This is used to identify the tenant that is making the request. If you do not know your tenant ID, you can obtain this information from the Management Console.',
                isRequired: true,
                sampleValue: 'Demo'
            },
            'oski-useripaddress': {
                description: 'IP address of the customer. The customer is the end-user who is making the booking. Ensure that your integration passes the customer\'s IP address instead of your own IP address. This is required for suppliers who have IP-restricted access to their inventory.<br/>The customer\'s IP address helps determine their location and assign the correct payment gateway. The IP address can also be used for fraud recovery and other analytics.',
                isRequired: false,
                sampleValue: '127.0.0.1'
            },
            'oski-correlationid': {
                description: 'This ID is returned for logging and debugging purpose. If you encounter any issue in your API calls, you must provide this ID to our support executive.'
            }
        }
    }
});

window._poc.views.HarnessView = Backbone.View.extend({
    initialize: function () {
        var that = this;
        this.listenTo(this.themeModel, 'change', function () {
            Store.set('default_theme', that.themeModel.get('theme'));
        });

        // To update theme across tabs
        setInterval(function () {
            that.themeModel.set('theme', Store.get('default_theme'));
        }, 2000);

        // check if debug mode is enabled
        this.enableDebug = this._isDebugEnabled();
    },

    themeModel: new Backbone.Model(),

    jsonMimeType: 'application/json',

    _isDebugEnabled: function () {
        var query = _poc.utils.parseQuery();
        if (query._debug === undefined || query._debug.toLowerCase() !== 'true') return false;
        return true;
    },

    render: function (url) {
        // set the default theme
        this.themeModel.set('theme', Store.get('default_theme') || 'vs-dark');

        // add a temporary loader
        $('.link').each(function (i, ele) {
            var $loader = $($('#tmplLoader').html());
            $loader.addClass('temp-loader').children().height(80);
            $loader.insertAfter($(ele));
        });


        var that = this;
        var indexPromise = $.get(url),
            configPromise = $.get('config.json'),
            data, config = {
                placeHolders: []
            },
            counter = 2;

        indexPromise.done(function (response, status) {
            if (status !== 'success') return;
            data = response;
            process();
        });

        configPromise.done(function (response, status) {
            if (status === 'success') config = response;
        }).always(function () {
            process();
        });

        function process() {
            if (--counter !== 0) return;

            // remove the temporary loaders
            $('.temp-loader').remove();

            var subUrl;
            // create a collection of environments
            var rootEnvironmentCollection = new _poc.models.EnvironmentCollection(),
                envs = [];
            _.forEach(window.environments, function (env) {
                env['isActive'] = false;
                envs.push(env);
            });
            rootEnvironmentCollection.add(envs);

            // build place holder collection using local store
            _.forEach(config.placeHolders, function (ph) {
                if (!ph.store) return;
                var val = Store.get(ph.store);
                if (val === undefined) return;
                ph.value = val;
            });
            var placeHolderCollection = new window._poc.models.PlaceHolderCollection(config.placeHolders);

            // render the switch view
            this.switcherView = new _poc.views.SwitcherView({
                environmentCollection: rootEnvironmentCollection,
                collection: placeHolderCollection
            });

            var getMatchingPlaceHolders = function (content) {
                var items = [];
                placeHolderCollection.forEach(function (model) {
                    var match;
                    _.forEach(model.get('actions'), function (action) {
                        if (!match && content === action.name) match = true;
                    });
                    if (match) items.push(model);
                });

                return new window._poc.models.PlaceHolderCollection(items);
            }

            var valueRegex = /{([a-zA-Z]+)\|([\w- \/,]+)\|(\d+)}/;

            var translateValue = function (value) {
                if (value === undefined) return;
                var match = value.match(valueRegex)
                if (match && match.length === 4) {
                    try {
                        var format = match[2],
                            number = parseFloat(match[3]);
                        switch (match[1]) {
                            case 'date':
                                value = moment().add(number, 'days').format(format);
                                break;
                        }
                    } catch (e) { }
                }
                return value;
            };

            // iterate on every method placeholder and render the harness view
            $('.link').each(function (i, ele) {
                var $ele = $(ele);
                var content = $.trim($ele.html());
                var paths = data.paths;

                $.each(paths, function (j, path) {
                    subUrl = j;
                    $.each(path, function (k, resource) {
                        if (!resource) return;

                        // which method to use
                        var method, action;
                        if (resource['post']) {
                            method = resource['post'];
                            action = 'POST';
                        } else if (resource['get']) {
                            method = resource['get'];
                            action = 'GET';
                        } else if (resource['put']) {
                            method = resource['put'];
                            action = 'PUT';
                        } else if (resource['delete']) {
                            method = resource['delete'];
                            action = 'DELETE';
                        }

                        // match the content of html tag with the summary of the resource
                        if (!method || method.summary !== content)
                            return;

                        var requestHeaders,
                            requestParams = {},
                            requestBody = {},
                            responseHeaders,
                            responseBody = {},
                            requestParamsMapping = {
                                debug: {
                                    isRequired: false,
                                    description: 'Send this parameter to enable debug mode in the api',
                                    type: 'boolean',
                                    sampleValue: 'true'
                                }
                            },
                            requestBodyMapping = {},
                            responseBodyMapping = {};

                        if (that.enableDebug) {
                            requestParams['debug'] = {
                                isRequired: false,
                                value: 'true'
                            };
                        }

                        // Helper functions
                        // Recursive function to load individual property and it's description
                        var addMapping = function (mapping, input, required, path) {
                            path = path || '',
                            required = required || [];

                            // iterate on properties
                            for (var key in input) {
                                var obj = input[key];
                                // build the path
                                var subPath = path + '/' + key;

                                // SPECIAL CASE
                                // When root element is an array, parser adds __array at the root of the schema
                                // skip this as mapping won't require it
                                if (key === '__array') subPath = null;
                                else {
                                    if (obj.type === 'string' && obj.sampleValue && obj.sampleValue.type === 'string') {
                                        obj.sampleValue = translateValue(obj.sampleValue.value);
                                    }
                                    // for the path, add mapping
                                    mapping[subPath] = {
                                        type: obj.type,
                                        description: obj.description,
                                        sampleValue: obj.sampleValue,
                                        isRequired: required.indexOf(key) !== -1
                                    };
                                }
                                // for object build mapping for `properties`
                                // for array build mapping for `items`
                                if (obj.type === 'object') {
                                    addMapping(mapping, obj.properties, obj.required, subPath);
                                } else if (obj.type === 'array' && obj.items) {
                                    if (subPath !== null) {
                                        if (obj.items.type && !_.isEmpty(obj.items.type)) mapping[subPath].itemType = obj.items.type;
                                        else mapping[subPath].itemType = 'object';
                                    }
                                    addMapping(mapping, obj.items.properties, obj.items.required, subPath);
                                }
                            }
                        };
                        // builds the environment collection
                        var getEnvCollection = function () {
                            // Build environment collection
                            var envs = [];

                            var requestModel = new _poc.models.Request({
                                url: subUrl,
                                headers: requestHeaderCollection.clone(),
                                params: requestParams,
                                body: requestBody
                            });
                            var responseModel = new _poc.models.Response({
                                headers: responseHeaderCollection.clone(),
                                body: responseBody,
                                status: httpStatusCode
                            });

                            _.forEach(window.environments, function (env) {
                                var env = new _poc.models.Environment({
                                    type: env.type,
                                    baseUrl: env.baseUrl,
                                    request: requestModel,
                                    response: responseModel
                                });
                                envs.push(env);
                            });
                            var envCollection = new _poc.models.EnvironmentCollection(envs);

                            // when ever environment in root environment collection is changed, update active flag, so that view can pick active envrionment
                            envCollection.listenTo(rootEnvironmentCollection, 'change:isActive', function (model) {
                                envCollection.forEach(function (env) {
                                    if (env.get('type') === model.get('type')) env.set('isActive', true);
                                    else env.set('isActive', false, { silent: true });
                                });
                            });

                            return envCollection;
                        };

                        var updateJSON = function (json) {
                            for (var key in json) {
                                var value = json[key];
                                if (value instanceof Array) {
                                    $.each(value, function (index, item) {
                                        if (typeof (item) === 'object') {
                                            // update object recursively
                                            item = updateJSON(item);
                                        } else if (typeof (item) === 'string') {
                                            value.splice(index, 1, translateValue(item));
                                        }
                                    });
                                } else if (typeof (value) === 'object') {
                                    // update object recursively
                                    value = updateJSON(value);
                                } else if (typeof (value) === 'string') {
                                    json[key] = translateValue(value);
                                }
                            }
                            return json;
                        }

                        // PARSE REQUEST //
                        // Assumption: body parameter will be only ONE
                        // depending upon the parameter.in, parse parameter
                        if (method.parameters instanceof Array) {
                            _.forEach(method.parameters, function (parameter) {
                                // get the request headers
                                if (parameter.headers) requestHeaders = parameter.headers;

                                // parameter should be in URL path
                                if (parameter.in === 'path') {
                                    // build the JSON, which is similar to the request body
                                    // so that same infrastructure for place holder can be used
                                    requestParams[parameter.name] = {
                                        value: parameter.sampleValue,
                                        isRequired: parameter.required
                                    };
                                    // build the mapping
                                    requestParamsMapping[parameter.name] = {
                                        type: parameter.type,
                                        description: parameter.description,
                                        sampleValue: parameter.sampleValue,
                                        isRequired: parameter.required
                                    }
                                } else if (parameter.in === 'body') { // parameter is body
                                    // looking at the schema, build the path and add the mapping
                                    // so that when details of property are required, it can be found using the path
                                    if (parameter.schema && parameter.schema.properties)
                                        addMapping(requestBodyMapping, parameter.schema.properties, parameter.schema.required);
                                    // if parameter has body, it is the body of the request
                                    if (parameter.body)
                                        requestBody = JSON.parse(parameter.body);

                                    requestBody = updateJSON(requestBody);
                                }
                            });
                        }

                        // PARSE RESPONSE //
                        // Start the translation
                        var response,
                            httpStatusCode;

                        var trySetStatus = function (status) {
                            if (!method.responses[status]) return;
                            httpStatusCode = status;
                            response = method.responses[status];
                        };

                        trySetStatus(200);
                        trySetStatus(201);
                        trySetStatus(202);
                        trySetStatus(204);

                        // Set default response header
                        responseHeaders = { 'Content-Type': that.jsonMimeType };
                        if (response.examples) {
                            // Response Headers
                            if (response.examples.headers && !_.isEmpty(response.examples.headers))
                                responseHeaders = response.examples.headers;
                            // Response Body
                            if (response.examples[that.jsonMimeType]) {
                                responseBody = response.examples[that.jsonMimeType];
                            }
                        }

                        // Response Mapping
                        if (response.schema)
                            addMapping(responseBodyMapping, response.schema.properties);

                        // Header Collections
                        var requestHeaderCollection = new _poc.models.HeaderCollection().build(requestHeaders);
                        var responseHeaderCollection = new _poc.models.HeaderCollection().build(responseHeaders);

                        // Build Environment Collection
                        var consoleEnvCollection = getEnvCollection(),
                            sampleEnvCollection = getEnvCollection();

                        var $parent = $ele.parent(),
                            $container = $('<div class="harness-container"></div>');

                        var getOptions = function (envCollection) {
                            return {
                                method: action,
                                http: new _poc.models.Http(),
                                themeModel: that.themeModel,
                                collection: envCollection,
                                requestParamsMapping: requestParamsMapping,
                                requestBodyMapping: requestBodyMapping,
                                responseBodyMapping: responseBodyMapping,
                                switcherView: that.switcherView,
                                placeHolderCollection: getMatchingPlaceHolders(content),
                                title: content
                            };
                        };

                        // Build the options for the view
                        var consoleOptions = getOptions(consoleEnvCollection),
                            sampleOptions = getOptions(sampleEnvCollection);

                        // add an anchor which will initiate rendering of test harness
                        $parent.append('<blockquote class="no-border margin-top-25 blockquote blockquote-action blockquote-info"><a href="#">' + content + ' </a><i class="fa fa-angle-right font-size-30 pull-right action-angle-right visible-lg visible-md"><i></blockquote>');

                        // bind click event
                        $('a', $parent).click(function (e) {
                            e.preventDefault();

                            $parent.html($('#tmplLoader').html());
                            setTimeout(function () {
                                require(['vs/editor/editor.main'], function () {
                                    $parent.html($container);
                                    var view = new _poc.views.SampleView(sampleOptions);
                                    view.consoleView = new _poc.views.ConsoleView(consoleOptions);
                                    view.consoleView.sampleView = view;
                                    view.render($container);

                                    // FIX FOR IE //
                                    // In IE, the editor must be completely surrounded in the body element, 
                                    // otherwise the hit testing we do for mouse operations does not work. 
                                    // You can inspect this using F12 and clicking on the body element and 
                                    // confirm that visually it surrounds the editor.
                                    setTimeout(function () {
                                        $(document.body).height($('.body-container').height())
                                    }, 100);
                                });
                            }, 0);
                        });
                    });
                });
            });

            setTimeout(function () {
                // set the active environment
                var env = Store.get('default_env'),
                    envFound = false;
                if (!env) env = window.default_env;
                rootEnvironmentCollection.forEach(function (model) {
                    if (model.get('type') === env) {
                        model.set('isActive', true);
                        envFound = true;
                    }
                });
                if (!envFound) rootEnvironmentCollection.first().set('isActive', true);
            }, 100);

        }
    }
});

window._poc.views.SwitcherView = Backbone.View.extend({
    template: '#tmplSwitch',

    initialize: function (options) {
        this.options = options;
        this._view = Handlebars.compile($(this.template).html());
        this.listenTo(this.options.environmentCollection, 'change:isActive', this.onEnvironmentChange);
        this.listenTo(this.options.collection, 'change:value', this.onValueChange);
        this.render();
    },

    _getBodyItems: function () {
        var items = [];
        this.collection
            .where({ section: 'body' })
            .forEach(function (item) {
                // show items which are targeted to Request. Bug #86 (https://github.com/apalsapure/oski-dev-center/issues/86)
                var match = _.find(item.get('actions'), function (action) {
                    return action.target === 'request.params' || action.target === 'request.body'
                });
                if (match) items.push(item);
            });

        return items;
    },

    render: function () {
        var html = this._view({
            envs: this.options.environmentCollection.toJSON(),
            bodyItems: this._getBodyItems(),
            headerItems: this.collection.where({ section: 'header' })
        });

        this.$el = $($.trim(html));
        this.$el.appendTo($(document.body));
        this.$handle = $('.handle', this.$el);
        this.$action = $('.action-button', this.$el);
        this.$apply = $('.apply-button', this.$el);
        this.$tabContent = $('.tab-content', this.$el);

        this.bindEvents();
        this.onWindowResize();
    },

    onEnvironmentChange: function (model) {
        var that = this;
        this.$handle.removeClass().addClass('handle ' + model.get('cssClass'));
        this.options.environmentCollection.forEach(function (m) {
            that.$action.removeClass(m.get('cssClass'));
            that.$apply.removeClass(m.get('cssClass'));
        });
        this.$action.addClass(model.get('cssClass'));
        this.$apply.addClass(model.get('cssClass'));
        this.$toggle.html(model.get('name') + '&nbsp;<span class="caret"></span>');
        // update the store
        Store.set('default_env', model.get('type'));
    },

    onValueChange: function (model) {
        // update the store
        var storePath = model.get('store')
        if (storePath)
            Store.set(storePath, model.get('value'));

        // if change is trigger by this view, ignore
        if (this.igonreChange) {
            this.close();
            return;
        }

        // else update the view accordingly
        $('input[data-target="' + model.get('key') + '"]').val(model.get('value'));
    },

    close: function () {
        this.$el.removeClass('open');
    },

    onWindowResize: function () {
        var height = $(window).height();
        this.$el.height(height);
        this.resizeRightPanel();
    },

    resizeRightPanel: function () {
        var height = $(window).height();
        if (this.$el.hasClass('affix-top'))
            this.$tabContent.height(height - 160);
        else
            this.$tabContent.height(height - 80);

        if (!this.scroll)
            this.scroll = $('#tab-content-scroll').asScrollable({
                namespace: 'scrollable',
                direction: 'vertical',
                contentSelector: '>',
                containerSelector: '>'
            });
    },

    bindEvents: function () {
        var that = this;

        $(window).resize(function () {
            that.onWindowResize();
        }).scroll(function () {
            if (that.$el.hasClass('open')) {
                that.resizeRightPanel();
            }
        });

        $('.handle, .btn-link', this.$el).click(function (e) {
            that.$el.toggleClass('open');
            that.resizeRightPanel();
        });

        this.$toggle = $('.dropdown-toggle', this.$el);
        $('.dropdown-menu a', this.$el).click(function (e) {
            that.env = that.getEnv($(this).data('target'));

            var active = that.options.environmentCollection.active();
            if (active) active.set('isActive', false, { silent: true });

            that.env.set('isActive', true);
        });

        $('.apply-button', this.$el).click(function (e) {
            e.preventDefault();
            that.igonreChange = true;
            $('.form-configuration input', this.$el).each(function (i, ele) {
                var $ele = $(ele);
                var target = $ele.attr('data-target'),
                    value = $.trim($ele.val());
                var item = that.collection.findWhere({ key: target });
                if (!item) return;
                var type = item.get('type');
                if (type === 'number' || type === 'decimal') {
                    var num;
                    if (type === 'number') {
                        num = parseInt(value, 10);
                    } else {
                        num = parseFloat(value);
                    }
                    if (isNaN(num)) {
                        // TODO
                    } else
                        item.set('value', num);
                } else if (type === 'array') {
                    var subType = item.get('subType');
                    var strs = value.split(','),
                        arr = [];
                    _.forEach(strs, function (str) {
                        switch (subType) {
                            case 'number':
                                str = parseInt(str, 10);
                                break;
                            case 'decimal':
                                str = parseFloat(str, 10);
                                break;
                        }
                        arr.push(str);
                    });
                    item.set('value', arr);
                } else item.set('value', value);
            });
            that.igonreChange = false;

            return false;
        })

        this.$el.affix({
            offset: {
                top: function () {
                    var c = that.$el.offset().top, d = -10, e = $("#divHeader").height();
                    return this.top = c - e - d
                }, bottom: function () {
                    return this.bottom = $("#divFooter").outerHeight(!0);
                }
            }
        });
    },

    getEnv: function (type) {
        return this.options.environmentCollection.findWhere({
            type: type
        });
    }
});
$('.hide-parent').each(function (i, ele) {
    var $ele = $(ele);
    var $pre = $ele.parent().prev();
    $ele.parent().remove();
    $ele.appendTo($pre);
});

/**
 * Transformer module.
 * This takes care of any HTML mangling needed.  The main entry point is
 * `.mangle()` which applies all transformations needed.
 *
 *     var $content = $("<p>Hello there, this is a docu...");
 *     Transformer.mangle($content);
 *
 */

var Transformer = {};

/**
 * Takes a given HTML `$content` and improves the markup of it by executing
 * the transformations.
 *
 * > See: [Transformer](#transformer)
 */
Transformer.mangle = function ($content) {
    this.addIDs($content);
};

var slugify = function (text) {
    return text.toLowerCase().match(/[a-z0-9]+/g).join('-');
};

/**
 * Adds IDs to headings.
 */
Transformer.addIDs = function ($content) {
    $content.find('h1, h2, h3, h4').each(function () {
        var $el = $(this);
        var text = $el.text();
        if (_.isEmpty(text)) return;
        var id = slugify(text);
        $el.attr('id', id);
    });
};

/**
 * Returns menu data for a given HTML.
 *
 *     menu = Flatdoc.transformer.getMenu($content);
 *     menu == {
 *       level: 0,
 *       items: [{
 *         section: "Getting started",
 *         level: 1,
 *         items: [...]}, ...]}
 */
Transformer.getMenu = function ($content) {
    var root = { items: [], id: '', level: 0 };
    var cache = [root];

    function mkdir_p(level) {
        var parent = (level > 1) ? mkdir_p(level - 1) : root;
        if (!cache[level]) {
            var obj = { items: [], level: level };
            cache[level] = obj;
            parent.items.push(obj);
            return obj;
        }
        return cache[level];
    }

    $content.find('h1, h2, h3, h4').each(function () {
        var $el = $(this);
        var level = +(this.nodeName.substr(1));

        var parent = mkdir_p(level - 1);

        var obj = { section: $el.text(), items: [], level: level, id: $el.attr('id') };
        parent.items.push(obj);
        cache[level] = obj;
    });

    return root;
};

var setMenuEl = function (menu, $el) {

    function process(node, $parent) {
        var id = node.id || 'root';

        var $li = $('<li>')
          .attr('id', id + '-item')
          .addClass('level-' + node.level)
          .appendTo($parent);

        if (node.section) {
            var $a = $('<a>')
              .html(node.section)
              .attr('id', id + '-link')
              .attr('href', '#' + node.id)
              .addClass('level-' + node.level)
              .appendTo($li);
        }

        if (node.items.length > 0) {
            var $ul = $('<ul class="nav nav-stacked">')
              .addClass('level-' + (node.level + 1))
              .attr('id', id + '-list')
              .appendTo($li);

            node.items.forEach(function (item) {
                process(item, $ul);
            });
        }
    }

    process(menu, $el);
    return $el;
};

// Mangle html 
Transformer.mangle($('#divDocContent'));
var menu = Transformer.getMenu($('#divDocContent'));
for (var i = 0; i < menu.items.length; i = i + 1) {
    setMenuEl(menu.items[i], $("ul#sidebar"));
}

$('.bs-docs-sidebar').show();

/**
 * Add scrollspy to generated sidebar
 */
$('body').scrollspy({
    target: ".doc-nav"
});

/**
 * Add affix for content specific navigation
 */

var sidebar = $('.bs-docs-sidebar');
$('.bs-docs-sidebar').affix({
    offset: {
        top: function () {
            var c = sidebar.offset().top, d = parseInt(sidebar.children(0).css("margin-top"), 10) + 20, e = $("#divHeader").height();
            return this.top = c - e - d
        }, bottom: function () {
            return this.bottom = $("#divFooter").outerHeight(!0) + 166;
        }
    }
});

$('.back-to-top').show();

if (window.location.hash == '') {
    $("ul#sidebar").children('li').first().addClass('active');
}