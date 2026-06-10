cordova.define("cordova-plugin-downloader.download", function(require, exports, module) {
/** @namespace cordova **/

function Download() {
    this.Settings = {
        fileSystem : cordova.file.dataDirectory,
        folder: "folder",
        unzip: false,
        remove: false,
        timeout: 0,
        headers: [],
        success: null,
        error: null,
        progress: null
    };
}

/**
 * Initialize module
 */
Download.prototype.Initialize = function(settings) {
    Object.assign(this.Settings, settings);
};

Download.prototype.Get = function(url) {
    var that = this;

    if (cordova && typeof window.resolveLocalFileSystemURL !== 'undefined') {
        window.resolveLocalFileSystemURL(
            this.Settings.fileSystem,
            GetParentPathSuccess,
            function() { that.Settings.error && that.Settings.error(0); }
        );
    } else {
        console.log("download.Get supported on Cordova only");
        this.Settings.error && this.Settings.error(1);
    }

    function GetParentPathSuccess(parentEntry) {
        if (!parentEntry.isDirectory) {
            that.Settings.error && that.Settings.error(2);
        } else {
            parentEntry.getDirectory(
                that.Settings.folder,
                { create: true },
                DownloadFile,
                function() { that.Settings.error && that.Settings.error(2); }
            );
        }
    }

    function DownloadFile(dirEntry) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);

        that.Settings.headers.forEach(function(header){
            xhr.setRequestHeader(header.Key, header.Value);
        });        

        xhr.responseType = 'blob';
        xhr.timeout = that.Settings.timeout;

        xhr.onload = function() {
            if (this.status === 200) {
                var blob = new Blob([this.response], { type: 'application/zip' });
                saveFile(dirEntry, blob, GetLastPath(url));
            } else {
                that.Settings.error && that.Settings.error(3);
            }
        };

        xhr.onabort   = function () { that.Settings.error && that.Settings.error(4); };
        xhr.onerror   = function () { that.Settings.error && that.Settings.error(5); };
        xhr.ontimeout = function () { that.Settings.error && that.Settings.error(6); };

        // ✅ Progress event
        xhr.onprogress = function (event) {
            var percent = null;
            if (event.lengthComputable) {
                percent = Math.round((event.loaded / event.total) * 100);
            }

            // callback
            if (typeof that.Settings.progress === "function") {
                that.Settings.progress(percent, event.loaded, event.total, url);
            }

            // dispatch event
            var progressEvent = new CustomEvent("DOWNLOADER_downloadProgress", {
                detail: {
                    percent: percent,
                    loaded: event.loaded,
                    total: event.lengthComputable ? event.total : null,
                    url: url
                }
            });
            document.dispatchEvent(progressEvent);
        };

        xhr.send();
    }

    function saveFile(dirEntry, fileData, fileName) {
        dirEntry.getFile(
            fileName,
            { create: true, exclusive: false },
            function (fileEntry) { writeFile(fileEntry, fileData); },
            function() { that.Settings.error && that.Settings.error(7); }
        );
    }

    function writeFile(fileEntry, dataObj) {
        fileEntry.createWriter(function (fileWriter) {
            fileWriter.onwriteend = function() {
                if (that.Settings.unzip) {
                    that.Unzip(fileEntry.fullPath);
                } else {
                    that.Settings.success && that.Settings.success(fileEntry);
                }
            };

            fileWriter.onerror = function(e) {
                that.Settings.error && that.Settings.error(8);
            };

            fileWriter.write(dataObj);
        });
    }
}; // Get()

Download.prototype.Unzip = function(zipFilePath) {
    var destFS = this.Settings.fileSystem;
    var that = this;

    zip.unzip(
        Join([destFS, zipFilePath]),
        Join([destFS, this.Settings.folder]),
        function(status) {
            if (status === -1) {
                that.Settings.error && that.Settings.error(9);
            } else if (that.Settings.remove) {
                RemoveZipFile(zipFilePath);
            } else {
                that.Settings.success && that.Settings.success();
            }
        }
    );

    function RemoveZipFile(zipFilePath) {
        var fszipFilePath = Join([that.Settings.fileSystem, zipFilePath]);

        window.resolveLocalFileSystemURL(
            fszipFilePath,
            function(entry) {
                if (entry.isFile) {
                    entry.remove(that.Settings.success, function() { that.Settings.error && that.Settings.error(10); });
                } else {
                    that.Settings.error && that.Settings.error(11);
                }
            },
            that.Settings.success
        );
    }
};

function GetLastPath(path) {
    return path.slice(-1) === "/" ? GetAfterLast(path.slice(0, -1), "/") : GetAfterLast(path, "/");
}
function GetAfterLast(str, s) {
    return str.substring(str.lastIndexOf(s)+1);
}
function Join(pathList) {
    var path = "";
    if (pathList.length > 0) {
        path += pathList[0].replace(/\/+$/, "") + "/";
        for (var i = 1; i < pathList.length; i++) {
            path += pathList[i].replace(/^\/+/, "").replace(/\/+$/, "") + "/";
        }
        path = path.slice(0, -1);
    }
    return path;
}

module.exports = Download;
});
