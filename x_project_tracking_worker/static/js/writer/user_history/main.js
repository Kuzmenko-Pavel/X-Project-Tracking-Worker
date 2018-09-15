/**
 * Created by kuzmenko-pavel on 13.04.17.
 */
define([
        './../underscore',
        './../json3',
        './test',
        // './fixed_queue',
        // './exclude_offers',
        './retargeting_offers',
        // './gender_account',
        './gender_user',
        // './cost_account',
        './cost_user'
        // './activity_account',
        // './activity_user'
    ],
    function (
        _,
        JSON,
        test,
        // FixedQueue,
        // ExcludeOffers,
        RetargetingOffers,
        // GenderAccount,
        GenderUser,
        // CostAccount,
        CostUser
        // ActivityAccount,
        // ActivityUser
    ) {
        var prototype = 'prototype';
        var getGender= function(val){
            if (val === 'm')
            {
                return 1;
            }
            else if (val === 'w')
            {
                return 2;
            }
            else
            {
                return 0;
            }
        };

        var costRange= function(val){
            val = Number(val);
            if (val>0 && val <= 2500)
            {
                return 1;
            }
            else if (val>2500 && val <= 4500)
            {
                return 2;
            }
            else if (val>4500 && val <= 9000)
            {
                return 3;
            }
            else if (val>9000 && val <= 14000)
            {
                return 4;
            }
            else if (val>14000 && val <= 16500)
            {
                return 5;
            }
            else if (val>16500 && val <= 19000)
            {
                return 6;
            }
            else if (val>19000 && val <= 25000)
            {
                return 7;
            }
            else if (val>25001)
            {
                return 8;
            }
            else
            {
                return 0;
            }
        };
        var UserHistory = function () {
            // this.searchengines = new FixedQueue(3);
            // this.context = new FixedQueue(3);
            this.retargeting = new RetargetingOffers();
            // this.exclude = new ExcludeOffers();
            // this.exclude_click = new ExcludeOffers();
            // this.retargeting_exclude = new ExcludeOffers();
            // this.retargeting_account_exclude = new ExcludeOffers();
            // this.retargeting_exclude_click = new ExcludeOffers();
            // this.retargeting_account_exclude_click = new ExcludeOffers();
            // //this.retargeting_view = new ExcludeOffers(true, true);
            // this.history = new FixedQueue(3);
            // this.gender_accounts = new GenderAccount();
            this.gender_user = new GenderUser();
            // this.cost_accounts = new CostAccount();
            this.cost_user = new CostUser();
            // this.activity_accounts = new ActivityAccount();
            // this.activity_user = new ActivityUser();
            // this.time = Math.floor(Date.now());
        };
        // UserHistory[prototype].clear = function () {
        //     if (test()) {
        //         localStorage.clear();
        //         this.load();
        //         this.save();
        //         return true;
        //     }
        //     return false;
        // };
        UserHistory[prototype].load = function (keys) {
            var retrievedObject;
            var time_clear = false;
            if (test()) {
                keys = keys || _.keys(this);
                // try {
                //     retrievedObject = JSON.parse(localStorage.getItem('time'));
                //     if (retrievedObject + 604800000 > Math.floor(Date.now())) {
                //         this.time = retrievedObject;
                //     }
                //     else {
                //         this.time = Math.floor(Date.now());
                //         time_clear = true;
                //     }
                // } catch (e) {
                //     this.time = Math.floor(Date.now());
                // }
                _.each(keys, function (
                    uh_name
                ) {
                    if (uh_name !== 'time') {
                        retrievedObject = {};
                        try {
                            retrievedObject = JSON.parse(localStorage.getItem(uh_name));
                        } catch (e) {
                        }
                        if (uh_name === 'exclude' && time_clear) {
                            retrievedObject = {};
                        }
                        this[uh_name].clear();
                        _.each(retrievedObject, function (
                            element,
                            index,
                            list
                        ) {
                            this[uh_name].load(index, list[index]);
                        }, this);
                    }
                }, this);
                return true;
            }
            return false;
        };
        UserHistory[prototype].save = function (keys) {
            if (test()) {
                keys = keys || _.keys(this);
                _.each(keys, function (
                    uh_name
                ) {
                    localStorage.setItem(uh_name, JSON.stringify(this[uh_name]));
                }, this);
                return true;
            }
            return false;
        };
        UserHistory[prototype].processing = function (data) {
            if (test()) {
                this.load();
                this.cost_user.add(costRange(data['price']));
                this.gender_user.add(getGender(data['gender']));
                var ac_id = data['account_id'];
                var second = data['time'];
                _.each(data['add'] || [], function (
                            element,
                            index,
                            list
                        ) {
                            if (element.length > 0){
                                this.retargeting.add(element + '...' + ac_id, Math.floor(Date.now())+(second*1000), ac_id,'', Math.floor(Date.now()/1000));
                            }
                }, this);
                _.each(data['remove'] || [], function (
                            element,
                            index,
                            list
                        ) {
                            if (element.length > 0){
                                this.retargeting.remove(element + '...' + ac_id, Math.floor(Date.now())+(second*1000), ac_id,'', Math.floor(Date.now()/1000));
                            }
                }, this);
                this.save();
                return true;
            }
            return false;
        };

        // UserHistory[prototype].exclude_clean = function (cl) {
        //     var k = ['exclude'];
        //     if (cl) {
        //         this.load(k);
        //         this[k[0]].clear();
        //         this.save(k);
        //     }
        //     return cl;
        // };
        // UserHistory[prototype].exclude_click_clean = function (cl) {
        //     var k = ['exclude_click'];
        //     if (cl) {
        //         this.load(k);
        //         this[k[0]].clear();
        //         this.save(k);
        //     }
        //     return cl;
        // };
        // UserHistory[prototype].exclude_get = function () {
        //     var keys = this.exclude.get().concat(this.exclude_click.get());
        //     keys = _.uniq(keys);
        //     return keys;
        // };
        // UserHistory[prototype].retargeting_clean = function (cl) {
        //     var k = ['retargeting_exclude'];
        //     if (cl) {
        //         this.load(k);
        //         this[k[0]].clear();
        //         //this.retargeting_view.clear();
        //         this.save(k);
        //     }
        //     return cl;
        // };
        // UserHistory[prototype].retargeting_account_clean = function (cl) {
        //     var k = ['retargeting_account_exclude'];
        //     if (cl) {
        //         this.load(k);
        //         this[k[0]].clear();
        //         this.save(k);
        //     }
        //     return cl;
        // };
        // UserHistory[prototype].retargeting_click_clean = function (cl) {
        //     var k = ['retargeting_account_exclude'];
        //     if (cl) {
        //         this.load(k);
        //         this[k[0]].clear();
        //         this.save(k);
        //     }
        //     return cl;
        // };
        // UserHistory[prototype].retargeting_exclude_get = function () {
        //     var keys = this.retargeting_exclude.get().concat(this.retargeting_exclude_click.get());
        //     keys = _.uniq(keys);
        //     return keys;
        // };
        // UserHistory[prototype].retargeting_account_exclude_get = function () {
        //     var keys = this.retargeting_account_exclude.get().concat(this.retargeting_account_exclude_click.get());
        //     keys = _.uniq(keys);
        //     return keys;
        // };
        return new UserHistory();
    });