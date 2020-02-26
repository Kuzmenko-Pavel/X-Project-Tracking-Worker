/**
 * Created by kuzmenko-pavel on 04.04.17.
 */
define(['./user_history/main', './ytl', './fbq'], function (user_history, YottosLib, fbq) {
    var Loader = function (){
        this.loader = function () {
            this.uh = user_history;
            this.fb = fbq;
        };
        this.post_listener = function (e) {
            if (e && e.data){
                if (typeof e.data === 'string'){
                    var name = e.data.split(":")[0];
                    var action = e.data.split(":")[1];
                    if (this.name === name){
                        if (this[action]){
                            this[action](e.origin);
                        }
                    }
                }
            }
        };
        this.cd_open = function () {
        };
        this.cd_close = function () {
        };
        this.ping = function (targetOrigin) {
            targetOrigin = targetOrigin || location.protocol.concat("//").concat(location.host);
            if (window.parent && window.parent.postMessage) {
                window.parent.postMessage('ytt_iframe:ping', targetOrigin);
            }
        };
        YottosLib.on_event('message', window, this.post_listener, this);
        this.ping('*');
    };
    return new Loader();

});