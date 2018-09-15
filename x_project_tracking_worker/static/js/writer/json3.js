define([], function () {
    var JSON = window.JSON || {};
    JSON.stringify = JSON.stringify || function (obj) {
        var t = typeof (obj);
        if (t !== "object" || obj === null) {
            if (t === "string") {
                obj = '"' + obj + '"';
            }
            return String(obj);
        }
        else {
            var n, v, json = [], arr = (obj && obj.constructor === Array);

            for (n in obj) {
                v = obj[n];
                t = typeof (v);

                if (t === "string"){
                    v = '"' + v + '"';
                }
                else if (t === "object" && v !== null) {
                    v = this.stringify(v);
                }
                json.push((arr ? "" : '"' + n + '":') + String(v));
            }
            return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
        }
    };
    /* jshint ignore:start */
    JSON.parse = JSON.parse || function (str) {
        if (str === ""){
            str = '""';
        }
        eval("var p=" + str + ";");
        return p;
    };
    /* jshint ignore:end */
    return  JSON;
});