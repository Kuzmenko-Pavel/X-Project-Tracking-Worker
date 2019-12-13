/**
 * Created by kuzmenko-pavel on 05.04.17.
 */
define('post_array', [], function () {
    var post_array = function(obj) {
        var post_message = 'postMessage';
        this.stack = [];
        this.obj = obj;
        this.test = undefined;
        this.callHandler = function() {
            if (this.test){
                while(this.stack.length){
                    this.postMessage(this.stack.shift());
                }
            }
        };
        this[post_message] = function (msg, origin) {
            if (msg){
                origin = origin || '*';
                var target = this.obj.iframe;
                if (target.contentWindow && target.contentWindow[post_message]) {
                    window.t = target;
                    target.contentWindow[post_message]('ytt_iframe:' + msg, origin);
                }
            }
        };
        this.push = function(obj) {
            if (this.obj.post_exists){
                this.stack.push(obj);
                this.callHandler();
            }
        };
        this.ping = function (origin) {
            if (this.test === undefined){
                this.pong(origin);
            }
            else if (this.test === false){
                this.test = true;
                this.callHandler();
            }
        };
        this.pong = function (origin) {
            this.test = false;
            this[post_message]('ping', origin);
        };
        this.init = function () {
            this[post_message]('ping');
            this.test = undefined;
        };

    };
    return post_array;
});