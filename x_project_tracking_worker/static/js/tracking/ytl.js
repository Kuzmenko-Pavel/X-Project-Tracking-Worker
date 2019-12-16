define(['./underscore'], function (_) {
    var prototype = 'prototype';
    var passiveSupported = false;
    var modern = window.addEventListener;
    var add = modern ? 'addEventListener' : 'attachEvent';
    var rem = modern ? 'removeEventListener' : 'detachEvent';
    var pre = modern ? '' : 'on';
    try {
        var options = Object.defineProperty({}, "passive", {
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
    YottosLib[prototype].on_event = function (
        evnt,
        elem,
        callback,
        context,
        once
    ) {
        var func = _.bind(callback, context || elem);
        var opt = {once: once || false};
        if (passiveSupported) {
            opt.passive = true;
        }
        elem[add](pre + evnt, func, opt);
        return func;
    };
    YottosLib[prototype].off_event = function (
        evnt,
        elem,
        func
    ) {

        elem[rem](pre + evnt, func);
    };
    YottosLib[prototype].on_load = function (
        win,
        callback,
        context
    ) {
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
        }
        else {
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
        var cookiestring = new RegExp("" + cookiename + "[^;]+").exec(document.cookie);
        return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./, "") : "");
    };
    YottosLib[prototype].setCook = function (
        name,
        value,
        options
    ) {
        var defaults = {
            path: '/'
        };
        if (window.location.protocol === "https:") {
            defaults.secure = true;
            defaults.same_site = 'None';
        }
        options = _.extend(options || {}, defaults);

        if (options.expires && options.expires.toUTCString) {
            options.expires = options.expires.toUTCString();
        }
        var updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
        for (var optionKey in options) {
            if (options.hasOwnProperty(optionKey)) {
                var optionValue = options[optionKey];
                if (optionValue !== '') {
                    updatedCookie += "; " + optionKey;
                    updatedCookie += "=" + optionValue;
                }
            }
        }
        console.log(updatedCookie);
        document.cookie = updatedCookie;

    };
    YottosLib[prototype].isGuid = function (stringToTest) {
        if (stringToTest[0] === "{") {
            stringToTest = stringToTest.substring(1, stringToTest.length - 1);
        }
        var regexGuid = /^(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}$/gi;
        return regexGuid.test(stringToTest);
    };


    var isBlob = function isBlob(val) {
        return val instanceof Blob;
    };

    function sendBeacon(
        url,
        data
    ) {
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
});