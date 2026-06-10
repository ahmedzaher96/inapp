cordova.define("onesignal-cordova-plugin.NotificationReceivedEvent", function(require, exports, module) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationWillDisplayEvent = void 0;
var OSNotification_1 = require("./OSNotification");
var NotificationWillDisplayEvent = /** @class */ (function () {
    function NotificationWillDisplayEvent(displayEvent) {
        this.notification = new OSNotification_1.OSNotification(displayEvent);
    }
    /**
     * Call this to prevent OneSignal from displaying the notification automatically.
     * This method can be called up to two times with false and then true, if processing time is needed.
     * Typically this is only possible within a short
     * time-frame (~30 seconds) after the notification is received on the device.
     * @param discard an [preventDefault] set to true to dismiss the notification with no
     * possibility of displaying it in the future.
     */
    NotificationWillDisplayEvent.prototype.preventDefault = function (discard) {
        if (discard === void 0) { discard = false; }
        window.cordova.exec(function () { }, function () { }, "OneSignalPush", "preventDefault", [this.notification.notificationId, discard]);
        return;
    };
    NotificationWillDisplayEvent.prototype.getNotification = function () {
        return this.notification;
    };
    return NotificationWillDisplayEvent;
}());
exports.NotificationWillDisplayEvent = NotificationWillDisplayEvent;

});
