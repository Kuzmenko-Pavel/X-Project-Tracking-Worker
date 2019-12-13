/**
 * Created by kuzmenko-pavel on 05.04.17.
 */
define('image', ['underscore', './post_array', './ytl'],
    function (_, PostArray, YottosLib) {
        return function (url, data) {
            var object = this;
            object.time = new Date().getTime();
            object.defer = new _.Deferred();
            object.name = 'y_image_'+object.time;
            object.image = new Image(1, 1);
            object.image.onload = function () {
                object.defer.resolve();
            };
            object.image.onerror = function () {
                object.defer.resolve();
            };
            var params = "";
            for (var key in data) {
                if (params !== "") {
                    params += "&";
                }
                params += key + "=" + encodeURIComponent(data[key]);
            }
            object.image.src = url + (url.indexOf('.png') < 0 ? '.png' : '')  + (url.indexOf('?') < 0 ? '?' : '&')+ params;
            return object;
        };
    });