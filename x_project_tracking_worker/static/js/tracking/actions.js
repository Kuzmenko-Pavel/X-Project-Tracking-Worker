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
        var defer = new _.Deferred();
        this.trakers[tracker] = _.extend(
            this.trakers[tracker] || {}, _.defaults(_.pick(data, _.allKeys(defaults_tracker)), defaults_tracker)
        );
        this.trakers[tracker]['id'] = val;
        if (data['set'] && _.isObject(data['set'])){
            _.each(data['set'], function (value, key) {
                this.callMethod(tracker + '.set', key, value);
            }, this);
        }
        if (data['track'] && _.isObject(data['track'])){
            _.each(data['track'], function (value, key) {
                this.callMethod(tracker + '.track', key, value);
            }, this);
        }
        defer.resolveWith(this);
        return defer;
    };
    actions['set'] = function (tracker, val, data){
        var defer = new _.Deferred();
        var ext = {};
        ext[val] = data;
        this.trakers[tracker] = _.extend(
            this.trakers[tracker] || {}, ext
        );
        defer.resolveWith(this);
        return defer;
    };
    actions['track'] = function (tracker, val, data){
        var defer = new _.Deferred();
        if (this.track_actions[val] && this.trakers[tracker]){
            this.track_actions[val].call(this, this.trakers[tracker], data, defer);
        }
        return defer;
    };
    return actions;

});