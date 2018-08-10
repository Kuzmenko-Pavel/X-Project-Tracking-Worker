/**
 * Created by kuzmenko-pavel on 04.04.17.
 */
define(['./get_action'], function (getAction) {
    var processing = function (){
        this.callAction(getAction(this.queue.shift()));
    };
    return processing;

});