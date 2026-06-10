cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-statusbar.statusbar",
      "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
      "pluginId": "cordova-plugin-statusbar",
      "clobbers": [
        "window.StatusBar"
      ]
    },
    {
      "id": "cordova-plugin-navigationbar-color.navigationbar",
      "file": "plugins/cordova-plugin-navigationbar-color/www/navigationbar.js",
      "pluginId": "cordova-plugin-navigationbar-color",
      "clobbers": [
        "window.NavigationBar"
      ]
    },
    {
      "id": "cordova-plugin-consent.Consent",
      "file": "plugins/cordova-plugin-consent/www/consent.js",
      "pluginId": "cordova-plugin-consent",
      "clobbers": [
        "consent"
      ]
    },
    {
      "id": "cordova-plugin-device.device",
      "file": "plugins/cordova-plugin-device/www/device.js",
      "pluginId": "cordova-plugin-device",
      "clobbers": [
        "device"
      ]
    },
    {
      "id": "cordova-plugin-dialogs.notification",
      "file": "plugins/cordova-plugin-dialogs/www/notification.js",
      "pluginId": "cordova-plugin-dialogs",
      "merges": [
        "navigator.notification"
      ]
    },
    {
      "id": "cordova-plugin-dialogs.notification_android",
      "file": "plugins/cordova-plugin-dialogs/www/android/notification.js",
      "pluginId": "cordova-plugin-dialogs",
      "merges": [
        "navigator.notification"
      ]
    },
    {
      "id": "cordova-plugin-inappbrowser.inappbrowser",
      "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
      "pluginId": "cordova-plugin-inappbrowser",
      "clobbers": [
        "cordova.InAppBrowser.open"
      ]
    },
    {
      "id": "cordova-plugin-file.DirectoryEntry",
      "file": "plugins/cordova-plugin-file/www/DirectoryEntry.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.DirectoryEntry"
      ]
    },
    {
      "id": "cordova-plugin-file.DirectoryReader",
      "file": "plugins/cordova-plugin-file/www/DirectoryReader.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.DirectoryReader"
      ]
    },
    {
      "id": "cordova-plugin-file.Entry",
      "file": "plugins/cordova-plugin-file/www/Entry.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.Entry"
      ]
    },
    {
      "id": "cordova-plugin-file.File",
      "file": "plugins/cordova-plugin-file/www/File.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.File"
      ]
    },
    {
      "id": "cordova-plugin-file.FileEntry",
      "file": "plugins/cordova-plugin-file/www/FileEntry.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.FileEntry"
      ]
    },
    {
      "id": "cordova-plugin-file.FileError",
      "file": "plugins/cordova-plugin-file/www/FileError.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.FileError"
      ]
    },
    {
      "id": "cordova-plugin-file.FileReader",
      "file": "plugins/cordova-plugin-file/www/FileReader.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.FileReader"
      ]
    },
    {
      "id": "cordova-plugin-file.FileSystem",
      "file": "plugins/cordova-plugin-file/www/FileSystem.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.FileSystem"
      ]
    },
    {
      "id": "cordova-plugin-file.FileUploadOptions",
      "file": "plugins/cordova-plugin-file/www/FileUploadOptions.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.FileUploadOptions"
      ]
    },
    {
      "id": "cordova-plugin-file.FileUploadResult",
      "file": "plugins/cordova-plugin-file/www/FileUploadResult.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.FileUploadResult"
      ]
    },
    {
      "id": "cordova-plugin-file.FileWriter",
      "file": "plugins/cordova-plugin-file/www/FileWriter.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.FileWriter"
      ]
    },
    {
      "id": "cordova-plugin-file.Flags",
      "file": "plugins/cordova-plugin-file/www/Flags.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.Flags"
      ]
    },
    {
      "id": "cordova-plugin-file.LocalFileSystem",
      "file": "plugins/cordova-plugin-file/www/LocalFileSystem.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.LocalFileSystem"
      ],
      "merges": [
        "window"
      ]
    },
    {
      "id": "cordova-plugin-file.Metadata",
      "file": "plugins/cordova-plugin-file/www/Metadata.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.Metadata"
      ]
    },
    {
      "id": "cordova-plugin-file.ProgressEvent",
      "file": "plugins/cordova-plugin-file/www/ProgressEvent.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.ProgressEvent"
      ]
    },
    {
      "id": "cordova-plugin-file.fileSystems",
      "file": "plugins/cordova-plugin-file/www/fileSystems.js",
      "pluginId": "cordova-plugin-file"
    },
    {
      "id": "cordova-plugin-file.requestFileSystem",
      "file": "plugins/cordova-plugin-file/www/requestFileSystem.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.requestFileSystem"
      ]
    },
    {
      "id": "cordova-plugin-file.resolveLocalFileSystemURI",
      "file": "plugins/cordova-plugin-file/www/resolveLocalFileSystemURI.js",
      "pluginId": "cordova-plugin-file",
      "merges": [
        "window"
      ]
    },
    {
      "id": "cordova-plugin-file.isChrome",
      "file": "plugins/cordova-plugin-file/www/browser/isChrome.js",
      "pluginId": "cordova-plugin-file",
      "runs": true
    },
    {
      "id": "cordova-plugin-file.androidEntry",
      "file": "plugins/cordova-plugin-file/www/android/Entry.js",
      "pluginId": "cordova-plugin-file",
      "merges": [
        "Entry"
      ]
    },
    {
      "id": "cordova-plugin-file.androidFileSystem",
      "file": "plugins/cordova-plugin-file/www/android/FileSystem.js",
      "pluginId": "cordova-plugin-file",
      "merges": [
        "FileSystem"
      ]
    },
    {
      "id": "cordova-plugin-file.fileSystems-roots",
      "file": "plugins/cordova-plugin-file/www/fileSystems-roots.js",
      "pluginId": "cordova-plugin-file",
      "runs": true
    },
    {
      "id": "cordova-plugin-file.fileSystemPaths",
      "file": "plugins/cordova-plugin-file/www/fileSystemPaths.js",
      "pluginId": "cordova-plugin-file",
      "merges": [
        "cordova"
      ],
      "runs": true
    },
    {
      "id": "cordova-plugin-zip.Zip",
      "file": "plugins/cordova-plugin-zip/zip.js",
      "pluginId": "cordova-plugin-zip",
      "clobbers": [
        "zip"
      ]
    },
    {
      "id": "cordova-plugin-filepath.FilePath",
      "file": "plugins/cordova-plugin-filepath/www/FilePath.js",
      "pluginId": "cordova-plugin-filepath",
      "clobbers": [
        "window.FilePath"
      ]
    },
    {
      "id": "cordova-plugin-buildinfo.BuildInfo",
      "file": "plugins/cordova-plugin-buildinfo/www/buildinfo.js",
      "pluginId": "cordova-plugin-buildinfo",
      "clobbers": [
        "BuildInfo"
      ]
    },
    {
      "id": "cordova-plugin-media.MediaError",
      "file": "plugins/cordova-plugin-media/www/MediaError.js",
      "pluginId": "cordova-plugin-media",
      "clobbers": [
        "window.MediaError"
      ]
    },
    {
      "id": "cordova-plugin-media.Media",
      "file": "plugins/cordova-plugin-media/www/Media.js",
      "pluginId": "cordova-plugin-media",
      "clobbers": [
        "window.Media"
      ]
    },
    {
      "id": "cordova-plugin-badge.Badge",
      "file": "plugins/cordova-plugin-badge/www/badge.js",
      "pluginId": "cordova-plugin-badge",
      "clobbers": [
        "cordova.plugins.notification.badge"
      ]
    },
    {
      "id": "cordova-plugin-globalization.GlobalizationError",
      "file": "plugins/cordova-plugin-globalization/www/GlobalizationError.js",
      "pluginId": "cordova-plugin-globalization",
      "clobbers": [
        "window.GlobalizationError"
      ]
    },
    {
      "id": "cordova-plugin-globalization.globalization",
      "file": "plugins/cordova-plugin-globalization/www/globalization.js",
      "pluginId": "cordova-plugin-globalization",
      "clobbers": [
        "navigator.globalization"
      ]
    },
    {
      "id": "cordova-plugin-geolocation.geolocation",
      "file": "plugins/cordova-plugin-geolocation/www/android/geolocation.js",
      "pluginId": "cordova-plugin-geolocation",
      "clobbers": [
        "navigator.geolocation"
      ]
    },
    {
      "id": "cordova-plugin-geolocation.PositionError",
      "file": "plugins/cordova-plugin-geolocation/www/PositionError.js",
      "pluginId": "cordova-plugin-geolocation",
      "runs": true
    },
    {
      "id": "es6-promise-plugin.Promise",
      "file": "plugins/es6-promise-plugin/www/promise.js",
      "pluginId": "es6-promise-plugin",
      "runs": true
    },
    {
      "id": "cordova-plugin-network-information.network",
      "file": "plugins/cordova-plugin-network-information/www/network.js",
      "pluginId": "cordova-plugin-network-information",
      "clobbers": [
        "navigator.connection"
      ]
    },
    {
      "id": "cordova-plugin-network-information.Connection",
      "file": "plugins/cordova-plugin-network-information/www/Connection.js",
      "pluginId": "cordova-plugin-network-information",
      "clobbers": [
        "Connection"
      ]
    },
    {
      "id": "cordova-open-native-settings.Settings",
      "file": "plugins/cordova-open-native-settings/www/settings.js",
      "pluginId": "cordova-open-native-settings",
      "clobbers": [
        "cordova.plugins.settings"
      ]
    },
    {
      "id": "cordova-plugin-screen-orientation.screenorientation",
      "file": "plugins/cordova-plugin-screen-orientation/www/screenorientation.js",
      "pluginId": "cordova-plugin-screen-orientation",
      "clobbers": [
        "cordova.plugins.screenorientation",
        "screen.orientation"
      ]
    },
    {
      "id": "cordova-plugin-streaming-media.StreamingMedia",
      "file": "plugins/cordova-plugin-streaming-media/www/StreamingMedia.js",
      "pluginId": "cordova-plugin-streaming-media",
      "clobbers": [
        "streamingMedia"
      ]
    },
    {
      "id": "cordova-plugin-x-socialsharing.SocialSharing",
      "file": "plugins/cordova-plugin-x-socialsharing/www/SocialSharing.js",
      "pluginId": "cordova-plugin-x-socialsharing",
      "clobbers": [
        "window.plugins.socialsharing"
      ]
    },
    {
      "id": "cordova-plugin-background-mode.BackgroundMode",
      "file": "plugins/cordova-plugin-background-mode/www/background-mode.js",
      "pluginId": "cordova-plugin-background-mode",
      "clobbers": [
        "cordova.plugins.backgroundMode",
        "plugin.backgroundMode"
      ]
    },
    {
      "id": "cordova-clipboard.Clipboard",
      "file": "plugins/cordova-clipboard/www/clipboard.js",
      "pluginId": "cordova-clipboard",
      "clobbers": [
        "cordova.plugins.clipboard"
      ]
    },
    {
      "id": "cordova-plugin-applovin-max.AppLovinMAX",
      "file": "plugins/cordova-plugin-applovin-max/www/applovinmax.js",
      "pluginId": "cordova-plugin-applovin-max",
      "clobbers": [
        "applovin"
      ]
    },
    {
      "id": "admob-plus-cordova-native.AdMobNative",
      "file": "plugins/admob-plus-cordova-native/www/index.js",
      "pluginId": "admob-plus-cordova-native",
      "clobbers": [
        "admobNative"
      ]
    },
    {
      "id": "admob-plus-cordova.AdMob",
      "file": "plugins/admob-plus-cordova/www/admob.js",
      "pluginId": "admob-plus-cordova",
      "clobbers": [
        "admob"
      ]
    },
    {
      "id": "cordova-plugin-local-notification.LocalNotification",
      "file": "plugins/cordova-plugin-local-notification/www/local-notification.js",
      "pluginId": "cordova-plugin-local-notification",
      "clobbers": [
        "cordova.plugins.notification.local"
      ]
    },
    {
      "id": "cordova-plugin-app-review.AppReview",
      "file": "plugins/cordova-plugin-app-review/www/AppReview.js",
      "pluginId": "cordova-plugin-app-review",
      "merges": [
        "cordova.plugins.AppReview"
      ]
    },
    {
      "id": "cordova-plugin-app-launcher.Launcher",
      "file": "plugins/cordova-plugin-app-launcher/www/Launcher.js",
      "pluginId": "cordova-plugin-app-launcher",
      "clobbers": [
        "plugins.launcher"
      ]
    },
    {
      "id": "cordova-plugin-customurlscheme.LaunchMyApp",
      "file": "plugins/cordova-plugin-customurlscheme/www/android/LaunchMyApp.js",
      "pluginId": "cordova-plugin-customurlscheme",
      "clobbers": [
        "window.plugins.launchmyapp"
      ]
    },
    {
      "id": "cordova-plugin-safariviewcontroller.SafariViewController",
      "file": "plugins/cordova-plugin-safariviewcontroller/www/SafariViewController.js",
      "pluginId": "cordova-plugin-safariviewcontroller",
      "clobbers": [
        "SafariViewController"
      ]
    },
    {
      "id": "cordova-plugin-overappbrowser.OverAppBrowser",
      "file": "plugins/cordova-plugin-overappbrowser/www/ios/OverAppBrowser.js",
      "pluginId": "cordova-plugin-overappbrowser",
      "clobbers": [
        "OverAppBrowser"
      ]
    },
    {
      "id": "cordova-plugin-downloader.download",
      "file": "plugins/cordova-plugin-downloader/www/download.js",
      "pluginId": "cordova-plugin-downloader",
      "clobbers": [
        "download"
      ]
    },
    {
      "id": "cordova-plugin-advanced-http.cookie-handler",
      "file": "plugins/cordova-plugin-advanced-http/www/cookie-handler.js",
      "pluginId": "cordova-plugin-advanced-http"
    },
    {
      "id": "cordova-plugin-advanced-http.dependency-validator",
      "file": "plugins/cordova-plugin-advanced-http/www/dependency-validator.js",
      "pluginId": "cordova-plugin-advanced-http"
    },
    {
      "id": "cordova-plugin-advanced-http.error-codes",
      "file": "plugins/cordova-plugin-advanced-http/www/error-codes.js",
      "pluginId": "cordova-plugin-advanced-http"
    },
    {
      "id": "cordova-plugin-advanced-http.global-configs",
      "file": "plugins/cordova-plugin-advanced-http/www/global-configs.js",
      "pluginId": "cordova-plugin-advanced-http"
    },
    {
      "id": "cordova-plugin-advanced-http.helpers",
      "file": "plugins/cordova-plugin-advanced-http/www/helpers.js",
      "pluginId": "cordova-plugin-advanced-http"
    },
    {
      "id": "cordova-plugin-advanced-http.js-util",
      "file": "plugins/cordova-plugin-advanced-http/www/js-util.js",
      "pluginId": "cordova-plugin-advanced-http"
    },
    {
      "id": "cordova-plugin-advanced-http.local-storage-store",
      "file": "plugins/cordova-plugin-advanced-http/www/local-storage-store.js",
      "pluginId": "cordova-plugin-advanced-http"
    },
    {
      "id": "cordova-plugin-advanced-http.lodash",
      "file": "plugins/cordova-plugin-advanced-http/www/lodash.js",
      "pluginId": "cordova-plugin-advanced-http"
    },
    {
      "id": "cordova-plugin-advanced-http.messages",
      "file": "plugins/cordova-plugin-advanced-http/www/messages.js",
      "pluginId": "cordova-plugin-advanced-http"
    },
    {
      "id": "cordova-plugin-advanced-http.ponyfills",
      "file": "plugins/cordova-plugin-advanced-http/www/ponyfills.js",
      "pluginId": "cordova-plugin-advanced-http"
    },
    {
      "id": "cordova-plugin-advanced-http.public-interface",
      "file": "plugins/cordova-plugin-advanced-http/www/public-interface.js",
      "pluginId": "cordova-plugin-advanced-http"
    },
    {
      "id": "cordova-plugin-advanced-http.tough-cookie",
      "file": "plugins/cordova-plugin-advanced-http/www/umd-tough-cookie.js",
      "pluginId": "cordova-plugin-advanced-http"
    },
    {
      "id": "cordova-plugin-advanced-http.url-util",
      "file": "plugins/cordova-plugin-advanced-http/www/url-util.js",
      "pluginId": "cordova-plugin-advanced-http"
    },
    {
      "id": "cordova-plugin-advanced-http.http",
      "file": "plugins/cordova-plugin-advanced-http/www/advanced-http.js",
      "pluginId": "cordova-plugin-advanced-http",
      "clobbers": [
        "cordova.plugin.http"
      ]
    },
    {
      "id": "onesignal-cordova-plugin.OneSignalPlugin",
      "file": "plugins/onesignal-cordova-plugin/dist/index.js",
      "pluginId": "onesignal-cordova-plugin",
      "clobbers": [
        "OneSignal"
      ]
    },
    {
      "id": "onesignal-cordova-plugin.NotificationReceivedEvent",
      "file": "plugins/onesignal-cordova-plugin/dist/NotificationReceivedEvent.js",
      "pluginId": "onesignal-cordova-plugin"
    },
    {
      "id": "onesignal-cordova-plugin.OSNotification",
      "file": "plugins/onesignal-cordova-plugin/dist/OSNotification.js",
      "pluginId": "onesignal-cordova-plugin"
    },
    {
      "id": "onesignal-cordova-plugin.UserNamespace",
      "file": "plugins/onesignal-cordova-plugin/dist/UserNamespace.js",
      "pluginId": "onesignal-cordova-plugin"
    },
    {
      "id": "onesignal-cordova-plugin.PushSubscriptionNamespace",
      "file": "plugins/onesignal-cordova-plugin/dist/PushSubscriptionNamespace.js",
      "pluginId": "onesignal-cordova-plugin"
    },
    {
      "id": "onesignal-cordova-plugin.DebugNamespace",
      "file": "plugins/onesignal-cordova-plugin/dist/DebugNamespace.js",
      "pluginId": "onesignal-cordova-plugin"
    },
    {
      "id": "onesignal-cordova-plugin.InAppMessagesNamespace",
      "file": "plugins/onesignal-cordova-plugin/dist/InAppMessagesNamespace.js",
      "pluginId": "onesignal-cordova-plugin"
    },
    {
      "id": "onesignal-cordova-plugin.SessionNamespace",
      "file": "plugins/onesignal-cordova-plugin/dist/SessionNamespace.js",
      "pluginId": "onesignal-cordova-plugin"
    },
    {
      "id": "onesignal-cordova-plugin.LocationNamespace",
      "file": "plugins/onesignal-cordova-plugin/dist/LocationNamespace.js",
      "pluginId": "onesignal-cordova-plugin"
    },
    {
      "id": "onesignal-cordova-plugin.NotificationsNamespace",
      "file": "plugins/onesignal-cordova-plugin/dist/NotificationsNamespace.js",
      "pluginId": "onesignal-cordova-plugin"
    },
    {
      "id": "onesignal-cordova-plugin.LiveActivitiesNamespace",
      "file": "plugins/onesignal-cordova-plugin/dist/LiveActivitiesNamespace.js",
      "pluginId": "onesignal-cordova-plugin"
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-statusbar": "4.0.0",
    "cordova-plugin-navigationbar-color": "0.0.8",
    "cordova-plugin-consent": "3.0.0-alpha.9",
    "cordova-plugin-device": "3.0.0",
    "cordova-plugin-dialogs": "2.0.2",
    "cordova-plugin-inappbrowser": "6.0.0",
    "cordova-plugin-file": "8.1.3",
    "cordova-plugin-zip": "3.1.0",
    "cordova-plugin-filepath": "1.6.0",
    "cordova-plugin-buildinfo": "4.0.0",
    "cordova-plugin-media": "7.0.0",
    "cordova-plugin-badge": "0.8.9",
    "cordova-plugin-globalization": "1.11.0",
    "cordova-plugin-geolocation": "5.0.0",
    "es6-promise-plugin": "4.2.2",
    "cordova-plugin-network-information": "3.0.0",
    "cordova-support-android-plugin": "2.0.4",
    "cordova-open-native-settings": "1.5.5",
    "cordova-plugin-screen-orientation": "3.0.4",
    "cordova-plugin-streaming-media": "2.3.0",
    "cordova-plugin-vibration": "3.1.1",
    "cordova-plugin-x-socialsharing": "6.0.4",
    "cordova-plugin-background-mode": "0.7.3",
    "cordova-clipboard": "1.3.0",
    "cordova-plugin-applovin-max": "2.1.0",
    "admob-plus-cordova-native": "1.0.0-alpha.20",
    "admob-plus-cordova": "2.0.0-alpha.19",
    "cordova-plugin-local-notification": "1.2.1",
    "cordova-plugin-app-review": "3.1.0",
    "cordova-plugin-app-launcher": "0.4.0",
    "cordova-plugin-customurlscheme": "5.0.2",
    "cordova-plugin-safariviewcontroller": "2.0.0",
    "cordova-plugin-overappbrowser": "1.2.0",
    "cordova-plugin-downloader": "0.0.4",
    "cordova-plugin-advanced-http": "3.3.1",
    "onesignal-cordova-plugin": "5.2.15"
  };
});