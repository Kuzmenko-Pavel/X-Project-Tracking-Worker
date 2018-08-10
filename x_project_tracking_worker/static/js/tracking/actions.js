/**
 * Created by kuzmenko-pavel on 04.04.17.
 */
define([], function () {
    var actions = {};
    actions['init'] = function (tracker, value, data){console.log(this, tracker, value, data);};
    actions['set'] = function (tracker, value, data){console.log(this, tracker, value, data);};
    actions['track'] = function (tracker, value, data){
        this.trakers[tracker] = {
            'id': '',
            'time': 365,
            'gender': null,
            'price' : null
        };
        this.trakers[tracker]['id'] = value;
    };
    return actions;

});