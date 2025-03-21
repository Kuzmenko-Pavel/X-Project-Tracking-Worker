/**
 * Created by user on 13.07.16.
 */
require([
    './actions',
    './track_actions',
    './callAction',
    './callMethod',
    './processing',
    './c_cheker',
    './url_cheker',
    './auto_goals'
], function (
    actions,
    track_actions,
    callAction,
    callMethod,
    processing,
    c_cheker,
    url_cheker,
    auto_goals
) {
    (function(){
        var y = window['YottosTrackObject'] || 'ytt';
        var tracker = window[y] || function(){
            tracker.callMethod(arguments);
        };
        if(!tracker.page_load){
            tracker.page_load = true;
            tracker.trakers = {};
            tracker.actions = actions;
            tracker.track_actions = track_actions;
            tracker.plugins = {};
            tracker.callAction = callAction;
            tracker.callMethod = callMethod;
            tracker.processing = processing;
            c_cheker(tracker);
            url_cheker(tracker);
            auto_goals(tracker);
        }
        tracker.processing();
    })();
});