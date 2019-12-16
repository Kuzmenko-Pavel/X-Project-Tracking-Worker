define([
    'underscore',
    './settings',
    './iframe_form',
    './image',
    './beacon'
], function (
    _,
    settings,
    Iframe_form,
    Image,
    Beacon
) {
    return function (
        defer,
        data,
        type
    ) {
        var url;
        var dummy;
        if (type === 'frame') {
            url = settings.rg + settings.rgt;
            dummy = new Iframe_form(url, data);
        }
        else if (type === 'image') {
            url = settings.rg + settings.rgt;
            dummy = new Image(url, data);
        }
         else if (type === 'beacon') {
            url = settings.rg + settings.rgt;
            dummy = new Beacon(url, data);
        }
        else {
            url = settings.rg + settings.rgt;
            dummy = new Iframe_form(url, data);
        }
        dummy.defer.done(_.bind(function () {
                defer.resolveWith(this);
            }, this)
        );
    };
});
