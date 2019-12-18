/**
 * Created by kuzmenko-pavel on 05.04.17.
 */
define('fbq', ['underscore'],
    function (_) {
        var FBHistory = function () {
            this.src = function (
                data
            ) {
                var params = "";
                for (var key in data) {
                    if (params !== "") {
                        params += "&";
                    }
                    params += key + "=" + encodeURIComponent(data[key]);
                }
                return 'https://www.facebook.com/tr/?' + params;
            };
            this.processing = function (
                data
            ) {
                if(!_.isEmpty(data)){
                    var f = new Image();
                    f.src = this.src(data);
                }
            };
        };
        return new FBHistory();
    });