/**
 * Created by kuzmenko-pavel on 05.04.17.
 */
define('fbq', ['underscore'],
    function (_) {
        var FBHistory = function (defer) {
            this.defer = defer;
            this.q = {
                id: '806312163091480',
                it: Date.now(),
                v: '2.8.25',
                r: 'stable',
                'if': 'false',
                rl: document.referrer,
                dl: document.location.href,
                'cd[url]': document.location.href,
                'cd[referrer]': document.referrer,
                ec: 1,
                o: 60,
                noscript: 1


            };
            this.src = function (
                offer_ids,
                ac_id
            ) {
                var a = [];
                var fb_offer_ids = [];
                var gender = '{{gender}}';
                if (gender === 'm') {
                    a.push('ud[ge]' + "=" + encodeURIComponent('62c66a7a5dd70c3146618063c344e531e6d4b59e379808443ce962b3abd63c5a'));
                }
                else if (gender === 'w') {
                    a.push('ud[ge]' + "=" + encodeURIComponent('252f10c83610ebca1a059c0bae8255eba2f95be4d1d7bcfa89d7248a82d9f111'));
                }
                for (var b in this.q) {
                    a.push(b + "=" + encodeURIComponent(this.q[b]));
                }
                a.push("ts=" + encodeURIComponent(new Date().valueOf()));
                if (offer_ids && ac_id) {
                    a.push('cd[content_type]' + "=" + encodeURIComponent('product'));
                    a.push('cd[content_name]' + "=" + encodeURIComponent('{{title}}'));
                    a.push('cd[content_category]' + "=" + encodeURIComponent('{{context}}'));
                    a.push('cd[value]' + "=" + encodeURIComponent('1.0'));
                    a.push('cd[currency]' + "=" + encodeURIComponent('UAH'));
                    for (var y = 0; y < offer_ids.length; y++) {
                        fb_offer_ids.push('"' + encodeURIComponent(offer_ids[y] + '...' + ac_id) + '"');
                    }
                    a.push('cd[content_ids]' + "=[" + encodeURIComponent(fb_offer_ids.join(",")) + "]");

                }
                return 'https://www.facebook.com/tr/?' + a.join("&");
            };
            this.send = function (
                ev,
                offer_id,
                ac_id
            ) {
                this.q.ev = ev;
                var f = new Image();
                f.src = this.src(offer_id, ac_id);
            };
            this.add = function (
                offer_id,
                ac_id
            ) {
                this.send('ViewContent', offer_id, ac_id);
            };
            this.remove = function (
                offer_id,
                ac_id
            ) {
                this.send('Purchase', offer_id, ac_id);
            };
            this.view = function (data
            ) {
                this.send('PageView');
                this.defer.resolve();
            };

        };
        return function (
            url,
            data
        ) {
            var object = this;
            object.defer = new _.Deferred();
            var fb = new FBHistory(object.defer);
            fb.view(data);
            return object;
        };
    });