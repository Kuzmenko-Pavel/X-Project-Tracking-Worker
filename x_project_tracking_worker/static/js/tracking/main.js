/**
 * Created by user on 13.07.16.
 */
require([
    './actions',
    './track_actions',
    './callAction',
    './callMethod',
    './processing'
], function (
    actions,
    track_actions,
    callAction,
    callMethod,
    processing
) {
    (function(){
        var y = window['YottosTrackObject'] || 'ytt';
        var tracker = window[y] || function(){
           tracker.callMethod(arguments);
        };
        tracker.trakers = {};
        tracker.actions = actions;
        tracker.track_actions = track_actions;
        tracker.plugins = {};
        tracker.callAction = callAction;
        tracker.callMethod = callMethod;
        tracker.processing = processing;
        tracker.processing();
    })();
});