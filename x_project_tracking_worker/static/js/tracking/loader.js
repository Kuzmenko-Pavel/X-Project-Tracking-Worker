/**
 * Created by kuzmenko-pavel on 04.04.17.
 */
define([], function () {
    var Loader = function (){
        this.loader = function () {
            console.log('loader');
        };
    };
    return new Loader();

});