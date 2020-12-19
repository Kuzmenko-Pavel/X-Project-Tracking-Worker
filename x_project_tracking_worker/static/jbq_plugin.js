f.ensureModuleRegistered("SignalsFBEvents.plugins.identity", function() {
            return function(h, i, j, d) {
                var e = {
                    exports: {}
                };
                e.exports;
                (function() {
                    "use strict";
                    var a = f.getFbeventsModules("SignalsFBEventsLogging")
                      , b = a.logUserError;
                    a = f.getFbeventsModules("SignalsFBEventsPlugin");
                    var c = f.getFbeventsModules("SignalsFBEventsUtils");
                    c = c.FBSet;
                    var d = f.getFbeventsModules("sha256_with_dependencies_new")
                      , h = /^[A-Fa-f0-9]{64}$|^[A-Fa-f0-9]{32}$/
                      , i = /^[\w!#\$%&\'\*\+\/\=\?\^`\{\|\}~\-]+(:?\.[\w!#\$%&\'\*\+\/\=\?\^`\{\|\}~\-]+)*@(?:[a-z0-9](?:[a-z0-9\-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9\-]*[a-z0-9])?$/i
                      , j = /^\s+|\s+$/g;
                    Object.prototype.hasOwnProperty;
                    var k = new c(["uid"]);
                    function l(a) {
                        return !!a && i.test(a)
                    }
                    function m(a) {
                        return a.replace(j, "")
                    }
                    function n(a) {
                        return a.toLowerCase()
                    }
                    function o(a, c) {
                        if (a === "em" || a === "email") {
                            var d = typeof c === "string" ? m(n(c)) : "";
                            if (d == null || d === "")
                                return null;
                            if (!l(d)) {
                                b({
                                    key_type: "email address",
                                    key_val: a,
                                    type: "PII_INVALID_TYPE"
                                });
                                throw new Error()
                            }
                            return d
                        }
                        return c
                    }
                    function p(a, c) {
                        if (c == null)
                            return null;
                        var e = /\[(.*)\]/.exec(a);
                        if (e == null)
                            throw new Error();
                        e = g(e, 2);
                        e = e[1];
                        if (k.has(e)) {
                            if (l(c)) {
                                b({
                                    key: a,
                                    type: "PII_UNHASHED_PII"
                                });
                                throw new Error()
                            }
                            return c
                        }
                        if (h.test(c))
                            return c.toLowerCase();
                        a = o(e, c);
                        return a != null ? d(a) : null
                    }
                    c = new a(function(a) {
                        a.piiTranslator = p
                    }
                    );
                    c.piiTranslator = p;
                    e.exports = c
                }
                )();
                return e.exports
            }(a, b, c, d)
        });
        e.exports = f.getFbeventsModules("SignalsFBEvents.plugins.identity");
        f.registerPlugin && f.registerPlugin("fbevents.plugins.identity", e.exports);
        f.ensureModuleRegistered("fbevents.plugins.identity", function() {
            return e.exports
        })