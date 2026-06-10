cordova.define("cordova-plugin-overappbrowser.OverAppBrowser", function(require, exports, module) {
//	OverAppBrowser.js
//	OverAppBrowser Cordova Plugin
//
//
//  	Copyright 2014 Emmanuel Tabard. All rights reserved.
//      MIT Licensed
//


var exec = require('cordova/exec');
var channel = require('cordova/channel');
var modulemapper = require('cordova/modulemapper');
var urlutil = require('cordova/urlutil');

function OverAppBrowser() {
   this.channels = {
        'loadstart': channel.create('loadstart'),
        'loadstop' : channel.create('loadstop'),
        'loaderror' : channel.create('loaderror'),
        'exit' : channel.create('exit')
   };
}

OverAppBrowser.prototype = {
    _eventHandler: function (event) {
        if (event.type in this.channels) {
            this.channels[event.type].fire(event);
        }
    },
    close: function () {
        exec(null, null, "OverAppBrowser", "close", []);
    },
    show: function (toAlpha, duration) {
        exec(null, null, "OverAppBrowser", "show", [toAlpha, duration]);
    },
    hide: function (toAlpha, duration) {
        exec(null, null, "OverAppBrowser", "hide", [toAlpha, duration]);
    },
    resize: function (originX, originY, width, height) {
        exec(null, null, "OverAppBrowser", "resize", [originX, originY, width, height]);
    },
    toggleHardwareBack: function (enable) {
        exec(null, null, "OverAppBrowser", "toggleHardwareBack", [enable]);
    },
    addEventListener: function (eventname,f) {
        if (eventname in this.channels) {
            this.channels[eventname].subscribe(f);
        }
    },
    removeEventListener: function(eventname, f) {
        if (eventname in this.channels) {
            this.channels[eventname].unsubscribe(f);
        }
    },

    executeScript: function(injectDetails, cb) {
        if (injectDetails.code) {
            exec(cb, null, "OverAppBrowser", "injectScriptCode", [injectDetails.code, !!cb]);
        } else if (injectDetails.file) {
            exec(cb, null, "OverAppBrowser", "injectScriptFile", [injectDetails.file, !!cb]);
        } else {
            throw new Error('executeScript requires exactly one of code or file to be specified');
        }
    },

    insertCSS: function(injectDetails, cb) {
        if (injectDetails.code) {
            exec(cb, null, "OverAppBrowser", "injectStyleCode", [injectDetails.code, !!cb]);
        } else if (injectDetails.file) {
            exec(cb, null, "OverAppBrowser", "injectStyleFile", [injectDetails.file, !!cb]);
        } else {
            throw new Error('insertCSS requires exactly one of code or file to be specified');
        }
    }
};

module.exports = function(strUrl, originx,originy,width,height, isAutoFadeIn) {
    isAutoFadeIn = isAutoFadeIn || true;
    strUrl = urlutil.makeAbsolute(strUrl);
    var oab = new OverAppBrowser();
    var cb = function(eventname) {
        if (!eventname) {
            return;
        }
       oab._eventHandler(eventname);
    };

    exec(cb, cb, "OverAppBrowser", "open", [strUrl, originx, originy, width, height, isAutoFadeIn]);
    return oab;
};

});
