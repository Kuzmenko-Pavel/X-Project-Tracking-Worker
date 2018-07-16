;(function() {
var callMethod, main;
(function () {
  callMethod = function () {
    var callMethod = function (key) {
      var keys = key.split('.').length;
      if (keys.length = 1) {
        console.log(this);
      } else {
        console.log(this);
      }
      console.log('callMethod', key, arguments);
    };
    return callMethod;
  }();
  (function (callMethod) {
    (function (win) {
      var y = win['YottosTrackObject'] || 'ytt';
      var tracker = win[y];
      tracker.callMethod = callMethod;
    }(window));
  }(callMethod));
  main = undefined;
}());
}());