/**
 * Created by kuzmenko-pavel on 04.04.17.
 */
define(['underscore'], function (_) {
    var defaults_tracker = {
            'id': '',
            'time': 365,
            'gender': null,
            'price' : null
    };
    var actions = {};
    actions['init'] = function (tracker, val, data){
        this.trakers[tracker] = _.extend(
            this.trakers[tracker] || {}, _.defaults(_.pick(data, _.allKeys(defaults_tracker)), defaults_tracker)
        );
        this.trakers[tracker]['id'] = val;
        this.processing();
    };
    actions['set'] = function (tracker, val, data){
        var ext = {};
        ext[val] = data;
        this.trakers[tracker] = _.extend(
            this.trakers[tracker] || {}, ext
        );
        this.processing();
    };
    actions['track'] = function (tracker, val, data){
        if (this.track_actions[val] && this.trakers[tracker]){
            this.track_actions[val].call(this, this.trakers[tracker], data);
        }
        this.processing();
    };
    return actions;

});