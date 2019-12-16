/**
 * Created by kuzmenko-pavel on 05.04.17.
 */
define('beacon', ['underscore', './ytl'],
    function (_, YottosLib) {
        return function (url, data) {
            var object = this;
            object.defer = new _.Deferred();
            var params = "";
            for (var key in data) {
                if (params !== "") {
                    params += "&";
                }
                params += key + "=" + encodeURIComponent(data[key]);
            }
            YottosLib.sendBeacon(url + (url.indexOf('.beacon') < 0 ? '.beacon' : ''), params);
            return object;
        };
    });