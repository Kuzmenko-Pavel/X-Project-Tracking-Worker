/**
 * Created by kuzmenko-pavel on 04.04.17.
 */
define(['underscore'], function (_) {
    var url_cheker = function (tracker) {
        var re_char = /[^a-zA-Zа-яА-ЯА-ЩЬЮЯҐЄІЇа-щьюяґєії]/g;
        var getText = function () {
            var result = (document.title.replace(re_char, ' ').replace(/\s+$/g, '').replace(/^\s+/g, '').replace(/[\n\t\r\f\s]{2,}/g, ' ')),
                metas = document.getElementsByTagName('meta'),
                y, x, splitted = [], collector = {}, counter = {}, key, streem_key, arr = [], sort_arr = [], out, i,
                sWord;
            if (metas) {
                for (x = 0, y = metas.length; x < y; x++) {
                    if (metas[x].name.toLowerCase() === "description") {
                        result += ' ' + (metas[x].content.replace(re_char, ' ').replace(/\s+$/g, '').replace(/^\s+/g, '').replace(/[\n\t\r\f\s]{2,}/g, ' ')) + ' ';
                    }
                    if (metas[x].name.toLowerCase() === "keywords") {
                        result += ' ' + (metas[x].content.replace(re_char, ' ').replace(/\s+$/g, '').replace(/^\s+/g, '').replace(/[\n\t\r\f\s]{2,}/g, ' ')) + ' ';
                    }
                }
            }
            splitted = result.toLowerCase().split(' ');
            for (i = 0; i < splitted.length; i++) {
                key = splitted[i].replace(/^\s*/, "").replace(/\s*$/, "");
                if (key.length > 3) {
                    collector[key] = key;
                    counter[key] = counter[key] || 0;
                    counter[key]++;
                }
            }
            arr = [];
            for (sWord in counter) {
                if (counter[sWord] > 1) {
                    arr.push({
                        t: collector[sWord],
                        s: sWord,
                        f: counter[sWord]
                    });
                }
            }
            sort_arr = arr.sort(function (
                a,
                b
            ) {
                return (a.f > b.f) ? -1 : ((a.f < b.f) ? 1 : 0);
            });
            out = [];
            for (i = 0; i < sort_arr.length; i++) {
                out.push(sort_arr[i].t);
            }
            return out.join(' ');
        };
        tracker.dl = document.location.href;
        tracker.rl = document.referrer;
        tracker.content_name = document.title.replace(re_char, ' ').replace(/\s+$/g, '').replace(/^\s+/g, '').replace(/[\n\t\r\f\s]{2,}/g, ' ');
        tracker.content_type = 'product';
        tracker.content_category = getText();
        _.each(tracker.trakers, function (element) {
            element.dl = tracker.dl;
            element.rl = tracker.rl;
            element.content_name = tracker.content_name;
            element.content_type = tracker.content_type;
            element.content_category = tracker.content_category;
        });

    };
    return url_cheker;

});