;(function() {
var actions, callAction, callMethod, get_action, processing, main;
(function () {
  actions = function () {
    var actions = {};
    actions['init'] = function (tracker, value, data) {
      console.log(this, tracker, value, data);
    };
    actions['set'] = function (tracker, value, data) {
      console.log(this, tracker, value, data);
    };
    actions['track'] = function (tracker, value, data) {
      this.trakers[tracker] = {
        'id': '',
        'time': 365,
        'gender': null,
        'price': null
      };
      this.trakers[tracker]['id'] = value;
    };
    return actions;
  }();
  callAction = function () {
    var callAction = function (action) {
      if (this.actions[action[1]]) {
        this.actions[action[1]].call(this, action[0], action[2], action[3]);
      }
    };
    return callAction;
  }();
  callMethod = function () {
    var callMethod = function () {
      this.queue.push(arguments);
      this.processing();
    };
    return callMethod;
  }();
  get_action = function () {
    var getAction = function (e) {
      var tracker = 'default';
      var action = 'default';
      var value = 'default';
      var data = {};
      if (e) {
        var key = e[0];
        var val = e[1];
        var dat = e[2];
        if (key) {
          key = key.split('.');
          if (key.length === 1) {
            action = key[0];
          } else if (key.length === 2) {
            tracker = key[0];
            action = key[1];
          }
        }
        if (val) {
          value = val;
        }
        if (dat) {
          data = dat;
        }
        return [
          tracker,
          action,
          value,
          data
        ];
      }
    };
    return getAction;
  }();
  processing = function (getAction) {
    var processing = function () {
      this.callAction(getAction(this.queue.shift()));
    };
    return processing;
  }(get_action);
  (function (actions, callAction, callMethod, processing) {
    (function (win) {
      var y = win['YottosTrackObject'] || 'ytt';
      var tracker = win[y] || function () {
        this.callMethod(arguments);
      };
      tracker.trakers = {};
      tracker.actions = actions;
      tracker.plugins = {};
      tracker.callAction = callAction;
      tracker.callMethod = callMethod;
      tracker.processing = processing;
      tracker.processing();
    }(window));
  }(actions, callAction, callMethod, processing));
  main = undefined;
}());
}());