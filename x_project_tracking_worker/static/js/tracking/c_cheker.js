/**
 * Created by kuzmenko-pavel on 04.04.17.
 */
define(['underscore'], function (_) {
    var c_cheker = function (tracker){
        _.each(tracker.trakers, function (element) {element.cd=false;});
        tracker.cd = false;
        var threshold = 160;
        var loop;
        var log_addet = false;
        var dc = document.createElement('div');
        try {
            Object.defineProperty(dc, "id", {
                get: function () {
                    if(tracker.cd !== true){
                        clearInterval(loop);
                        tracker.cd = true;
                        _.each(tracker.trakers, function (element) {element.cd=true;});
                        dc = null;
                    }
                }
            });
        } catch (err) {
        }
        var cheker = function () {

            try {
                var widthThreshold = window.outerWidth - window.innerWidth > threshold;
                var heightThreshold = window.outerHeight - window.innerHeight > threshold;
                if (
                    !(heightThreshold && widthThreshold) &&
                    ((window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) || widthThreshold || heightThreshold)
                ) {
                    clearInterval(loop);
                    tracker.cd = true;
                    _.each(tracker.trakers, function (element) {element.cd=true;});
                } else {
                    tracker.cd = false;
                    _.each(tracker.trakers, function (element) {element.cd=false;});
                    if(!log_addet){
                        log_addet = true;
                        console.log(dc);
                    }
                }
            } catch (err) {
            }
        };
        var interval_cheker = function () {
            if(tracker.cd === false){
                loop = setInterval(cheker, 1000);
            }
        };
        cheker();
        setTimeout(interval_cheker, 500);
    };
    return c_cheker;

});