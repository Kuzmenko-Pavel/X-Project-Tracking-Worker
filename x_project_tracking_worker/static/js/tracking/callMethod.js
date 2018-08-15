/**
 * Created by kuzmenko-pavel on 04.04.17.
 */
define(['underscore'], function (_) {
    var callMethod = function (){
        this.queue.push(arguments);
        try{
            this.processing();
        }
        catch(ex){
            setTimeout(_.bind(this.processing, this), 0);
        }
    };
    return callMethod;

});