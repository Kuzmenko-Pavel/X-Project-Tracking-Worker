/**
 * Created by kuzmenko-pavel on 04.04.17.
 */
define(['underscore'], function (_) {
    var track_actions = {};
    track_actions['remarketing'] = function (tracker, data){
        console.log(this, tracker, data);
    };
    return track_actions;

});