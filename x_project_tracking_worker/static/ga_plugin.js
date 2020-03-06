// campaign-loader.js

function providePlugin(
    pluginName,
    pluginConstructor
) {
    var ga = window[window['GoogleAnalyticsObject'] || 'ga'];
    if (typeof ga === 'function') {
        ga('provide', pluginName, pluginConstructor);
    }
}

/**
 * Utility function to extract a URL parameter value.
 */
function getUrlParam(param) {
    var match = document.location.search.match('(?:\\?|&)' + param + '=([^&#]*)');
    return (match && match.length === 2) ? decodeURIComponent(match[1]) : '';
}

/**
 * Constructor for the campaignLoader plugin.
 */
var CampaignLoader = function (
    tracker,
    config
) {
    console.log(tracker);
    this.tracker = tracker;
    this.nameParam = config.nameParam || 'name';
    this.sourceParam = config.sourceParam || 'source';
    this.mediumParam = config.mediumParam || 'medium';
    this.isDebug = config.debug;
    // var originalBuildHitTask = tracker.get('buildHitTask');
    var originalSendHitTask = tracker.get('sendHitTask');
    // tracker.set('buildHitTask', function(model) {
    //     console.log(model);
    //     console.log(model.get('hitType'));
    //     originalBuildHitTask(model);
    // });
    tracker.set('sendHitTask', function(model) {
        console.log(model);
        console.log(model.get('eventCategory'));
        console.log(model.get('hitType'));
        console.log(model.get('&ti'));
        console.log(model.get('&ta'));
        console.log(model.get('&tr'));
        console.log(model.get('&tt'));
        console.log(model.get('&ts'));
        console.log(model.get('&tcc'));
        originalSendHitTask(model);
    });
    // this.tracker.set('sendHitTask', function(model) {
    //         console.log(model);
    //         var hitPayload = model.get('hitPayload');
    //         console.log(hitPayload);
    //     });
    // if(this.tracker.plugins_.keys.indexOf('ec') !== -1){
    //     this.tracker.set('sendHitTask', function(model) {
    //         var hitPayload = model.get('hitPayload');
    //         console.log(hitPayload);
    //     });
    // }
};

/**
 * Loads campaign fields from the URL and updates the tracker.
 */
CampaignLoader.prototype.loadCampaignFields = function () {
    this.debugMessage('Loading custom campaign parameters');

    var nameValue = getUrlParam(this.nameParam);
    if (nameValue) {
        this.tracker.set('campaignName', nameValue);
        this.debugMessage('Loaded campaign name: ' + nameValue);
    }

    var sourceValue = getUrlParam(this.sourceParam);
    if (sourceValue) {
        this.tracker.set('campaignSource', sourceValue);
        this.debugMessage('Loaded campaign source: ' + sourceValue);
    }

    var mediumValue = getUrlParam(this.mediumParam);
    if (mediumValue) {
        this.tracker.set('campaignMedium', mediumValue);
        this.debugMessage('Loaded campaign medium: ' + mediumValue);
    }
};

/**
 * Enables / disables debug output.
 */
CampaignLoader.prototype.setDebug = function (enabled) {
    this.isDebug = enabled;
};

/**
 * Displays a debug message in the console, if debugging is enabled.
 */
CampaignLoader.prototype.debugMessage = function (message) {
    if (!this.isDebug) {
        return;
    }
    if (console) {
        console.debug(message);
    }
};


window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};
window.ga.l=+new Date;
providePlugin('campaignLoader', CampaignLoader);
// Register the plugin.
// ga(function () {
//    console.log(arguments);
//    console.log(this);
//    ga('require', 'campaignLoader', {
//       debug: true,
//       nameParam: 'cname',
//       sourceParam: 'csrc',
//       mediumParam: 'cmed'
//    });
// });
// window.ga('require', 'campaignLoader', {
//   debug: true,
//   nameParam: 'cname',
//   sourceParam: 'csrc',
//   mediumParam: 'cmed'
// });
