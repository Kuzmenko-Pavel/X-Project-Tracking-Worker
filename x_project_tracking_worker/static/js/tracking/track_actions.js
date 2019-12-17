/**
 * Created by kuzmenko-pavel on 04.04.17.
 */
define([
    'underscore',
    './transport'
], function (
    _,
    transport
) {
    var converter = function (
        val,
        key
    ) {
        var r = null;
        if (key === 'gender') {
            if (_.isBoolean(val) || _.isNumber(val)) {
                if (Boolean(val)) {
                    r = 'w';
                }
                else {
                    r = 'm';
                }
            }
            else if (_.isString(val)) {
                r = val;
            }
        }
        else {
            r = val;
        }
        return r;
    };
    var track_actions = {};
    track_actions['AddPaymentInfo'] = function (
        tracker,
        data,
        defer
    ) {
        var d = _.extend({}, tracker, data, {action: 'AddPaymentInfo'});
        transport.call(this, defer, _.mapObject(d, converter), 'frame');
    };
    track_actions['AddToCart'] = function (
        tracker,
        data,
        defer
    ) {
        var d = _.extend({}, tracker, data, {action: 'AddToCart'});
        transport.call(this, defer, _.mapObject(d, converter), 'frame');
    };
    track_actions['AddToWishlist'] = function (
        tracker,
        data,
        defer
    ) {
        var d = _.extend({}, tracker, data, {action: 'AddToWishlist'});
        transport.call(this, defer, _.mapObject(d, converter), 'frame');
    };
    track_actions['CompleteRegistration'] = function (
        tracker,
        data,
        defer
    ) {
        var d = _.extend({}, tracker, data, {action: 'CompleteRegistration'});
        transport.call(this, defer, _.mapObject(d, converter), 'frame');
    };
    track_actions['Contact'] = function (
        tracker,
        data,
        defer
    ) {
        var d = _.extend({}, tracker, data, {action: 'Contact'});
        transport.call(this, defer, _.mapObject(d, converter), 'frame');
    };
    track_actions['CustomizeProduct'] = function (
        tracker,
        data,
        defer
    ) {
        var d = _.extend({}, tracker, data, {action: 'CustomizeProduct'});
        transport.call(this, defer, _.mapObject(d, converter), 'frame');
    };
    track_actions['Donate'] = function (
        tracker,
        data,
        defer
    ) {
        var d = _.extend({}, tracker, data, {action: 'Donate'});
        transport.call(this, defer, _.mapObject(d, converter), 'frame');
    };
    track_actions['FindLocation'] = function (
        tracker,
        data,
        defer
    ) {
        var d = _.extend({}, tracker, data, {action: 'FindLocation'});
        transport.call(this, defer, _.mapObject(d, converter), 'frame');
    };
    track_actions['InitiateCheckout'] = function (
        tracker,
        data,
        defer
    ) {
        var d = _.extend({}, tracker, data, {action: 'AddPaymentInfo'});
        transport.call(this, defer, _.mapObject(d, converter), 'frame');
    };
    track_actions['Lead'] = function (
        tracker,
        data,
        defer
    ) {
        var d = _.extend({}, tracker, data, {action: 'Lead'});
        transport.call(this, defer, _.mapObject(d, converter), 'frame');
    };
    track_actions['PageView'] = function (
        tracker,
        data,
        defer
    ) {
        var d = _.extend({}, tracker, data, {action: 'PageView'});
        transport.call(this, defer, _.mapObject(d, converter), 'frame');
    };
    track_actions['Purchase'] = function (
        tracker,
        data,
        defer
    ) {
        var d = _.extend({}, tracker, data, {action: 'Purchase'});
        transport.call(this, defer, _.mapObject(d, converter), 'frame');
    };
    track_actions['Schedule'] = function (
        tracker,
        data,
        defer
    ) {
        var d = _.extend({}, tracker, data, {action: 'Schedule'});
        transport.call(this, defer, _.mapObject(d, converter), 'frame');
    };
    track_actions['Search'] = function (
        tracker,
        data,
        defer
    ) {
        var d = _.extend({}, tracker, data, {action: 'Search'});
        transport.call(this, defer, _.mapObject(d, converter), 'frame');
    };
    track_actions['StartTrial'] = function (
        tracker,
        data,
        defer
    ) {
        var d = _.extend({}, tracker, data, {action: 'StartTrial'});
        transport.call(this, defer, _.mapObject(d, converter), 'frame');
    };
    track_actions['SubmitApplication'] = function (
        tracker,
        data,
        defer
    ) {
        var d = _.extend({}, tracker, data, {action: 'SubmitApplication'});
        transport.call(this, defer, _.mapObject(d, converter), 'frame');
    };
    track_actions['Subscribe'] = function (
        tracker,
        data,
        defer
    ) {
        var d = _.extend({}, tracker, data, {action: 'Subscribe'});
        transport.call(this, defer, _.mapObject(d, converter), 'frame');
    };
    track_actions['ViewContent'] = function (
        tracker,
        data,
        defer
    ) {
        var d = _.extend({}, tracker, data, {action: 'ViewContent'});
        transport.call(this, defer, _.mapObject(d, converter), 'frame');
    };
    track_actions['AutoGoals'] = function (
        tracker,
        data,
        defer
    ) {
        var d = _.extend({}, tracker, data, {action: 'AutoGoals'});
        transport.call(this, defer, _.mapObject(d, converter), 'beacon');
    };
    track_actions['Goals'] = function (
        tracker,
        data,
        defer
    ) {
        var d = _.extend({}, tracker, data, {action: 'Goals'});
        transport.call(this, defer, _.mapObject(d, converter), 'image');
    };
    return track_actions;


});