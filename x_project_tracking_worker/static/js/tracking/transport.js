define(['underscore', './settings', './iframe_form', './image'], function (_, settings, Iframe_form, Image) {
    return function (defer, data, type) {
        var url = settings.rg + settings.rgt;
        var dummy;
        if(type === 'frame'){
            dummy = new Iframe_form(url, data);
        }
        else if(type === 'image'){
            dummy = new Image(url, data);
        }
        else{
            dummy = new Iframe_form(url, data);
        }
        dummy.defer.done(_.bind(function() {
            defer.resolveWith(this);
            }, this)
        );
    };
});
