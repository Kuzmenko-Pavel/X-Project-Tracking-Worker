/**
 * Created by kuzmenko-pavel on 04.04.17.
 */
define(['underscore'], function (_) {
    var url_cheker = function (tracker){
        var dl = document.location.href;
        var rl = document.referrer;
        _.each(tracker.trakers, function (element) {
            element.dl=dl;
            element.rl=rl;
        });

    };
    return url_cheker;

});