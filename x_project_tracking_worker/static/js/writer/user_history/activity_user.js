/**
 * Created by kuzmenko-pavel on 13.04.17.
 */
define(['./../underscore'], function (_) {
    var prototype = 'prototype';
    var ActivityUser = function () {
    };

    ActivityUser[prototype].add = function (
        timeFirst,
        timeLast
    ) {
        if (_.isUndefined(this.timeFirst)) {
            this.timeFirst = timeFirst;
        }
        this.timeLast = timeLast;
    };
    ActivityUser[prototype].clear = function () {
        _.each(this || {}, function (
            value,
            key,
            uh
        ) {
            if (!_.isUndefined(value) && !_.isFunction(value)) {
                delete uh[key];
            }
        });
    };
    ActivityUser[prototype].load = function (
        guid,
        arg1
    ) {
        this[guid] = arg1;
    };

    return ActivityUser;
});