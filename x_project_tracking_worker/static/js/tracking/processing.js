/**
 * Created by kuzmenko-pavel on 04.04.17.
 */
define(['underscore', './get_action'], function (_, getAction) {
    var processing = function (){
        var action = this.callAction(getAction(this.queue.shift()));
        if (action){
            action.done(function() {
                console.log('DONE');
                try{
                    this.processing();
                }
                catch(ex){
                    setTimeout(_.bind(this.processing, this), 0);
                }
        });
        }
    };
    return processing;

});