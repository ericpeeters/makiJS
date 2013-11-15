;
(function($, window, document, undefined) {

    /* jQuery.prototype.maki */
    $.fn.maki = function(overrides) {
        

        // If there are no overrides, create an empty overrides object
        if (!overrides) {
            var overrides = {};
        }

        if (overrides.contentSrc) {
            var contentSrc = (settings.contentSrc.indexOf('/') == 0) ? settings.contentSrc : settings.path + settings.contentSrc;
            $.getScript(contentSrc);
        }

        // Cache element context wrapped in jQuery
        var $el = $(this);

        // Store default maki settings
        this.settings = {
            content: "h1>{Welcome to maki!}",
            contentSrc: false,
            codeView: false,
            copyControls: false,
            clearfix: true,
            hash: false,
            path: "/Scripts/makiSrc",
            debug: false
        };

        // Set codeView variable equal to the copyControls
        overrides.codeView = (overrides.codeView) ? overrides.codeView : this.settings.copyControls;
        // Extend the settings with the overrides
        var settings = $.extend({}, this.settings, overrides);

        // If the contents of settings.content is an array or multiple, if so: concat them
        if ($.isArray(settings.content[0])) {
            for (var i = 0, len = settings.content.length; i < len; ++i) {
                settings.content += settings.content[i - 1];
            }
            settings.content = settings.content.split(',');
        }
        // Check if hash does not contain a hash, if not: put a hash in front of the given string
        if (settings.hash && settings.hash.indexOf('#') < 0) {
            settings.hash = '#' + settings.hash;
        }
        // Check if content is a string, and if so. Convert it to an array.
        if (typeof settings.content == "string") {
            var comma = (settings.content.indexOf(', ') !== -1) ? ', ' : ',';
            settings.content = settings.content.split(comma);
        }
        // Check if path has a slash at the end, if not: add it on there
        if (settings.path && settings.path.indexOf('/') > -1 && settings.path.lastIndexOf('/') !== settings.path.length - 1) {
            settings.path = settings.path + "/";
        }
        // Check if path has a slash at the beginning, if so: strip it off
        if (settings.path.indexOf('/') == 0) {
            settings.path = settings.path.substr(1);
        }

        // Finally, store a settings array in the global scope
        window.__makiSettings = settings;

        
        function loadMakiDependencies() {
            var scripts = $('body').find('script');
            var makiMatch;
            for (var i = 0, len = scripts.length; i < len; i++) {
                if ($(scripts[i]).attr('src').indexOf('makiLoader.js') > -1) {
                    makiMatch = $(scripts[i]);
                }
            }

            var makiSrc = document.createElement('script');
            makiSrc.src = settings.path + "maki.js";
            makiMatch.after(makiSrc);
            if (settings.debug == true) {
                var prettify = document.createElement('script');
                prettify.src = settings.path + "prettify.js";
                makiMatch.after(prettify);

                var zenCoding = document.createElement('script');
                zenCoding.src = settings.path + "jquery.zencoding.js";
                zenCoding.src = settings.path + "jquery.zencoding.js";
                makiMatch.after(zenCoding);

                var ZeroClipboard = document.createElement('script');
                ZeroClipboard.src = settings.path + "ZeroClipboard.js";
                ZeroClipboard.src = settings.path + "ZeroClipboard.js";
                makiMatch.after(ZeroClipboard);
            } else {
                var makiDependencies = document.createElement('script');
                makiDependencies.src = settings.path + "makiDependencies.min.js";
                makiMatch.after(makiDependencies);
            }

            if (settings.contentSrc) {
                var contentSrc = (settings.contentSrc.indexOf('/') == 0) ? settings.contentSrc : settings.path + settings.contentSrc;
                $.getScript(contentSrc);
            }
        }

        // Keep a property of whether maki is activated or not
        window.__makiSettings.init = false;

        if (settings.hash && location.hash == settings.hash) {
            location.hash = "#maki-init";
            window.__makiSettings.init = true;
        }

        $(window).on('hashchange', function() {
            if (settings.hash && location.hash == settings.hash && window.__makiSettings.init == false) {
                window.__makiSettings.init = true;
            }

            if (location.hash == "#maki-init" && window.__makiSettings.init == true) {
                loadMakiDependencies();
                makiJS.create(settings, $el);
            } else if (location.hash !== "#maki-init" && window.__makiSettings.init == true) {
                location.reload();
            }
        });

        if (!settings.hash) {
            loadMakiDependencies();
            makiJS.create(settings, $el);
        }

    } /* End jQuery.prototype.maki */


})(jQuery, window, document);