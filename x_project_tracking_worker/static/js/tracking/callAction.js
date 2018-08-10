/**
 * Created by kuzmenko-pavel on 04.04.17.
 */
define([], function () {
    var callAction = function (action){
        if (this.actions[action[1]]){
               this.actions[action[1]].call(this, action[0], action[2], action[3]);
        }
    };
    return callAction;

});