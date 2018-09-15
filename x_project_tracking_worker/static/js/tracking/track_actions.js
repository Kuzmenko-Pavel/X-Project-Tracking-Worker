/**
 * Created by kuzmenko-pavel on 04.04.17.
 */
define(['underscore', './transport'], function (_, transport) {
    var track_actions = {};
    track_actions['remarketing'] = function (tracker, data, defer){
        transport.call(this, defer, _.extend({action:'remarketing'}, tracker, data));
    };
    return track_actions;

});