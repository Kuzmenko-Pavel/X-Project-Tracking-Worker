/**
 * Created by kuzmenko-pavel on 04.04.17.
 */
define(['underscore', './transport'], function (_, transport) {
    var converter = function (val, key) {
        var r = null;
        if (key === 'gender'){
            if (_.isBoolean(val) || _.isNumber(val)){
                if (Boolean(val)){
                    r = 'w';
                }
                else{
                    r = 'm';
                }
            }
            else if (_.isString(val)){
                r = val;
            }
        }
        else {
            r = val;
        }
        return r;
    };
    var track_actions = {};
    track_actions['remarketing'] = function (tracker, data, defer){
        var d = _.extend({action:'remarketing'}, tracker, data);
        transport.call(this, defer, _.mapObject(d, converter));
    };
    return track_actions;

});