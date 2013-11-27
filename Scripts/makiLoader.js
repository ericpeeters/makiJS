;
(function($, window, document, undefined) {
    // Create a global makiSettings array to fill with settings objects
    window.__makiSettings = [];

    /* jQuery.prototype.maki */
    $.fn.maki = function(overrides) {
        
        // Make sure all the ajax requests are sync and nothing is cached
        $.ajaxSetup({
            async: false,
            cache: false
        });    

        // If there are no overrides, create an empty overrides object
        if (!overrides) {
            var overrides = {};
        }
        
        // If contentSrc is filled in, make sure it is formatted correctly
        if (overrides.contentSrc) {
            var contentSrc = (settings.contentSrc.indexOf('/') == 0) ? settings.contentSrc : settings.path + settings.contentSrc;
            $.getScript(contentSrc);
        }

        // Cache element context incl one wrapped in jQuery
        var el = this,
            $el = $(this);

        // Store default maki settings
        this.defaults = {
            content: "h1>{Welcome to maki!}",
            contentSrc: false,
            codeView: false,
            copyControls: false,
            clearfix: true,
            hash: false,
            path: "/Scripts/makiSrc",
            debug: false
        };

        // Set codeView variable equal to the copyControls if not defined
        overrides.codeView = (overrides.codeView) ? overrides.codeView : this.defaults.copyControls;
        // Merge the defaults and overrides in a settings variable
        var settings = $.extend({}, this.defaults, overrides);

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


        /** 
        @func       =loadMakiDependencies
        @namespace  =jQuery.prototype.maki
        @desc       Loads maki's dependencies
        **/
        function loadMakiDependencies() {
            // Load in maki.js
            $.getScript(settings.path + "maki.js");

            // If debug is set to true, load in all depedencies individually
            if (settings.debug == true) {
                $.getScript(settings.path + "prettify.js");
                $.getScript(settings.path + "jquery.zencoding.js");
                $.getScript(settings.path + "ZeroClipboard.js");
            } else { // Load in a minified file of all dependencies
                $.getScript(settings.path + "makiDependencies.min.js");
            }

            // If contentSrc is filled in, load in that source
            if (settings.contentSrc) {
                var contentSrc = (settings.contentSrc.indexOf('/') == 0) ? settings.contentSrc : settings.path + settings.contentSrc;
                $.getScript(contentSrc);
            }
        }

        // Keep a property of whether maki is activated or not
        settings.init = false;

        // If the hash is provided and it equals the hash that is passed in
        if (settings.hash && location.hash == settings.hash) {
            location.hash = "#maki-init";
            settings.init = true;
        }

        // On hash changed, do some checks and initialize maki
        $(window).on('hashchange', function() {
            if (settings.hash && location.hash == settings.hash && settings.init == false) {
                settings.init = true;
            }

            // If hash location is #maki-init and it is initialized
            if (location.hash == "#maki-init" && settings.init == true) {
                loadMakiDependencies();
                makiJS.create(settings, $el);
            // If hash location is NOT #maki-init yet it is set to be initialized, reload the browser
            } else if (location.hash !== "#maki-init" && settings.init == true) {
                location.reload();
            }
        });

        // if there is no hash property filled in, execute maki instantly
        if (!settings.hash) {
            loadMakiDependencies();
            makiJS.create(settings, $el);
        }

        // Finally, store a settings array in the global scope
        window.__makiSettings.push(settings);

    } /* End jQuery.prototype.maki */


})(jQuery, window, document);