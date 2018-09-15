/**
 * Created by kuzmenko-pavel on 04.04.17.
 */
define(['underscore', './get_action'], function (_, getAction) {
    var processing = function (){
        var arg = this.queue.shift();
        if (arg){
            var action = this.callAction(getAction(arg));
            if (action){
                action.done(function() {
                    try{
                        this.processing();
                    }
                    catch(ex){
                        setTimeout(_.bind(this.processing, this), 0);
                    }
            });
            }
        }
    };
    return processing;

});