/**
 * Created by kuzmenko-pavel on 04.04.17.
 */
define([], function () {
    var getAction = function (e){
        var tracker = 'default';
        var action = 'default';
        var value = 'default';
        var data = {};
        if(e){
            var key = e[0];
            var val = e[1];
            var dat = e[2];
            if (key){
                key = key.split('.');
                if (key.length === 1){
                    action = key[0];
                }
                else if (key.length === 2){
                    tracker = key[0];
                    action = key[1];
                }
            }
            if (val){
                value = val;
            }
            if (dat){
                data = dat;
            }
            return [tracker, action, value, data];

        }
    };
    return getAction;

});