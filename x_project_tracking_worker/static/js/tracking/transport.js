define(['underscore', './settings', './iframe_form'], function (_, settings, Iframe_form) {
    return function (defer, data) {
        var url = settings.rg + settings.rgt;
        var dummy = new Iframe_form(url, data);
        dummy.defer.done(_.bind(function() {
            defer.resolveWith(this);
            }, this)
        );
    };
});
