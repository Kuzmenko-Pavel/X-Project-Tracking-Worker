/**
 * Created by kuzmenko-pavel on 04.04.17.
 */
define([], function () {
    var callMethod = function (){
        this.queue.push(arguments);
        this.processing();
    };
    return callMethod;

});