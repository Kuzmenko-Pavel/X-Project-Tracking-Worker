/**
 * Created by kuzmenko-pavel on 04.04.17.
 */
define(['./ytl', './get_action'], function (YottosLib, getAction) {
    var cid = function (){
        var c = '';
        var yt_url_cid = YottosLib.getQueryVariable('yt_cid');
        var yt_cook_cid = YottosLib.getCook('yt_cid');
        if (YottosLib.isGuid(yt_url_cid)){
            c = yt_url_cid;
        }
        else {
            if (YottosLib.isGuid(yt_cook_cid)){
                c = yt_cook_cid;
            }
        }
        if (YottosLib.isGuid(c)){
            YottosLib.setCook('yt_cid', c, {'max-age': 7200});
        }
        return c;
    };
    return cid;

});