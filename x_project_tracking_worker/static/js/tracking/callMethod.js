/**
 * Created by kuzmenko-pavel on 04.04.17.
 */
define([], function () {
    var callMethod = function (key){
        var keys = key.split('.').length;
        if(keys.length = 1){
            console.log(this);
        }
        else{
            console.log(this);
        }
        console.log('callMethod', key, arguments);
    };
    return callMethod;

});