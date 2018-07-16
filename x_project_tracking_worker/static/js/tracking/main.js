/**
 * Created by user on 13.07.16.
 */
require([
    './callMethod'
], function (
    callMethod
) {
    (function(win){
        var y = win['YottosTrackObject'] || 'ytt';
        var tracker = win[y];
        tracker.callMethod = callMethod;
    })(window);
});