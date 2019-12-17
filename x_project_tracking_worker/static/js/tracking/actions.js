/**
 * Created by kuzmenko-pavel on 04.04.17.
 */
define(['underscore', 'cid'], function (_, cid) {
    var defaults_tracker = {
            'id': '',
            'time': 365,
            'cid':  '',
            'gender': null,
            'price' : null,
            'content_name': '',
            'content_category': '',
            'content_type': 'product',
            'currency': 'UAH',
            'relevant': true,
            'auto_goals': true
    };
    defaults_tracker.cid = cid();
    var actions = {};
    actions['init'] = function (tracker, val, data){
        var page_view = false;
        if (this.trakers[tracker] !== undefined){
            page_view = true;
        }
        var defer = new _.Deferred();
        this.trakers[tracker] = _.extend(
            this.trakers[tracker] || {}, _.defaults(_.pick(data, _.allKeys(defaults_tracker)), defaults_tracker)
        );
        this.trakers[tracker]['id'] = val;
        this.trakers[tracker].cd = this.cd;
        this.trakers[tracker].dl = this.dl;
        this.trakers[tracker].rl = this.rl;
        this.trakers[tracker].content_type = this.content_type;
        this.trakers[tracker].content_category = this.content_category;
        this.trakers[tracker].content_name = this.content_name;
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
        if (!page_view){
             this.callMethod(tracker + '.track', 'PageView', {});
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
        if(val === 'remarketing'){
            if (data['add']){
                this.callMethod(tracker + '.track', 'ViewContent', {});
            }
            if (data['remove']){
                this.callMethod(tracker + '.track', 'Purchase', {});
            }
            defer.resolveWith(this);
        }
        else{
            if (this.track_actions[val] && this.trakers[tracker]){
            this.track_actions[val].call(this, this.trakers[tracker], data, defer);
            }
            else{
                defer.resolveWith(this);
            }
        }

        return defer;
    };
    actions['trackCustom'] = function (tracker, val, data){
        var defer = new _.Deferred();
        if (this.track_actions[val] && this.trakers[tracker]){
            this.track_actions[val].call(this, this.trakers[tracker], data, defer);
        }
        else{
            defer.resolveWith(this);
        }
        return defer;
    };
    return actions;

});