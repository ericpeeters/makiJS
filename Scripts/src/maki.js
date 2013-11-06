; (function ($, window, document, undefined) {


    $.fn.maki = function (overrides) {

        // Cache element context wrapped in jQuery
        var $this = $(this);

        // Store default maki settings
        this.settings = {
            content: "h1>{Welcome to maki!}",
            codeView: false,
            copyControls: false,
            clearfix: true
        };

        // Set codeView variable equal to the copyControls
        overrides.codeView = (overrides.codeView) ? overrides.codeView : this.settings.copyControls;
        // Extend the settings with the overrides
        var settings = $.extend({}, this.settings, overrides);

        if ($.isArray(settings.content[0])) {
            console.log(settings.content.length)
            console.log(settings.content)
            for(var i = 0, len = settings.content.length; i < len; ++i) {
                settings.content += settings.content[i - 1];
            }
            settings.content = settings.content.split(',');
          
        }

        // Check if content is a string, and if so. Convert it to an array.
        if (typeof settings.content == "string") {
            var comma = (settings.content.indexOf(', ') !== -1) ? ', ' : ',';
            settings.content = settings.content.split(comma);
        }


        /** 
                @func       =spaceWarning
                @desc       function to output a warning in the console
                @param      i | index of the item in the content array
                @param      c | index (char) of the  position of the space in the object
                @return     A warning in the console
            **/
            var spaceWarning = function (i, c) {
                console.warn("Warning! Space detected on char " + c + ", in item " + i + ": " + settings.content[i]);
            }

        /**
            @func       =whiteSpaceCheckChars
            @desc       Checks for certain whitespace characters
        **/
        var whiteSpaceCheckChars = [">", "+", "*", "^"],

        /** 
            @func       =whiteSpaceCheck 
            @desc       function to check and correct emmet-string
            @param      i | index of the item in the content array
            @param      e | emmet string to check
            @return     the emmet-string with whitespaces removed
        **/
            whiteSpaceCheck = function (i, e) {
                $.each(whiteSpaceCheckChars, function (j, f) {
                    while (e.indexOf(' ' + f) > -1) {
                        spaceWarning(i, e.indexOf(' ' + f));
                        e = e.replace(' ' + f, f);
                    }
                    while (e.indexOf(f + ' ') > -1) {
                        spaceWarning(i, e.indexOf(f + ' '));
                        e = e.replace(f + ' ', f);
                    }
                });
                return e;
            },

        /**
            @func       =loremReplace
            @desc       Function to replace lorem, since the zencoding-plugin doesn't understand this.
            @param      e | emmet string to check
            @return     the emmet-string with lorem's replaced
        **/
            loremReplace = function (e) {
                while (e.indexOf('lorem') > -1) {
                    e = e.replace("lorem", "{Lorem ipsum dolor sit amet, <a href=\"/\">consectetur adipisicing elit</a>. Mollitia, cumque, quasi, consequatur, esse accusantium perferendis delectus quis pariatur nobis quam saepe voluptates quia iusto facere quidem dolorum dicta omnis consectetur.}");
                }
                return e;
            };

        if (settings.content.length && settings.copyControls == true) {
            // Loop through the content array and display the needed elements on the screen
            $.each(settings.content, function (i, e) {

                e = whiteSpaceCheck(i, e);
                e = loremReplace(e);

                var $emmetWrapper = $('<div class="emmetWrapper clearfix"><div class="emmetBtnWrapper"><button class="btnCopyEmmet">Copy Emmet</button> <button class="btnCopyHTML">Copy HTML</button></div></div>').data('emmet', e),
                    $emmetSnippet = $('<div class="emmetSnippet clearfix"/>').zencode(e);

                $this.append($emmetWrapper.prepend($emmetSnippet));

                if (settings.codeView == true) {
                    var emmetHTML = $('div.emmetSnippet').eq(i).html(),
                        codeView = $("<pre class='prettyprint' />").text(emmetHTML),
                        $eWrapper = $('div.emmetWrapper').eq(i);
                    $eWrapper.append(codeView);
                }
            });


            prettyPrint();

        } else {
            // Loop through the content array and display the needed elements on the screen */
            $.each(settings.content, function (i, e) {

                e = whiteSpaceCheck(i, e);
                e = loremReplace(e);

                var $emmetWrapper = $('<span />').data('emmet', e),
                    $emmetSnippet = $('<span />').zencode(e);

                if (settings.clearfix) {
                    $emmetSnippet.addClass('clearfix');
                }

                $this.append($emmetWrapper.prepend($emmetSnippet));
            });
        }

        // Create the buttons to copy Emmet/HTML with
        var copyButtons = $('button.btnCopyEmmet, button.btnCopyHTML');
        var clip = new ZeroClipboard(copyButtons);

        // As soon as the data is requested from one of the buttons, copy the right content to the clipboard */
        clip.on('dataRequested', function (client, args) {
            $('.copyNotification').remove();
            var snippet = "";
            if ($(this).hasClass('btnCopyEmmet')) {    
                snippet = $(this).parents('.emmetWrapper').data('emmet');
                $(this).parents('.emmetBtnWrapper').append($('<div class="copyNotification">Copied Emmet!</div>'));
            }
            if ($(this).hasClass('btnCopyHTML')) {
                snippet = $(this).parents('.emmetWrapper').find('.emmetSnippet').html();
                $(this).parents('.emmetBtnWrapper').append($('<div class="copyNotification">Copied HTML!</div>'));
            }
            clip.setText(snippet);

            $('.copyNotification').fadeOut(5000, function () { $(this).remove(); });
        });
        
        // Finally, store a settings array in the global scope
        window.__MAKISETTINGS = settings;
    
    }/* End jQuery.prototype.maki */


})(jQuery, window, document);