/**
 * Created by kuzmenko-pavel on 04.04.17.
 */
define(['./user_history/main'], function (user_history) {
    var Loader = function (){
        this.loader = function () {
            this.uh = user_history;
        };
    };
    return new Loader();

});