/* 
@obj    makiJS
@desc   The object that holds all maki's methods
*/

var makiJS = {

    /** 
    @func       =create
    @namespace  =makiJS
    @param      settings | maki's settings object
    @param      $this | The element selected
    @return     A warning in the console
    **/
    create: function(settings, $this) {

            /** 
            @func       =spaceWarning
            @desc       function to output a warning in the console
            @param      i | index of the item in the content array
            @param      c | index (char) of the  position of the space in the object
            @return     A warning in the console
            **/
        var spaceWarning = function(i, c) {
            console.warn("Warning! Space detected on char " + c + ", in item " + i + ": " + settings.content[i]);
        },

            /**
            @func       =whiteSpaceCheckChars
            @desc       Checks for certain whitespace characters
            **/
            whiteSpaceCheckChars = [">", "+", "*", "^"],

            /** 
            @func       =whiteSpaceCheck 
            @desc       function to check and correct emmet-string
            @param      i | index of the item in the content array
            @param      e | emmet string to check
            @return     the emmet-string with whitespaces removed
            **/
            whiteSpaceCheck = function(i, e) {
                $.each(whiteSpaceCheckChars, function(j, f) {
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
            loremReplace = function(e) {
                while (e.indexOf('lorem') > -1) {
                    e = e.replace("lorem", "{Lorem ipsum dolor sit amet, <a href=\"/\">consectetur adipisicing elit</a>. Mollitia, cumque, quasi, consequatur, esse accusantium perferendis delectus quis pariatur nobis quam saepe voluptates quia iusto facere quidem dolorum dicta omnis consectetur.}");
                }
                return e;
            };

        // If there is content filled in and copyControls are enabled 
        if (settings.content.length && settings.copyControls == true) {
            // Loop through the content array and display the needed elements on the screen
            $.each(settings.content, function(i, e) {

                e = whiteSpaceCheck(i, e);
                e = loremReplace(e);

                var $makiWrapper = $('<div class="makiWrapper clearfix"><div class="makiBtnWrapper"><button class="btnCopyEmmet">Copy Emmet</button> <button class="btnCopyHTML">Copy HTML</button></div></div>').data('maki', e),
                    $makiSnippet = $('<div class="makiSnippet clearfix"/>').zencode(e);

                $this.append($makiWrapper.prepend($makiSnippet));

                if (settings.codeView == true) {
                    var makiHTML = $('div.makiSnippet').eq(i).html(),
                        codeView = $("<pre class='prettyprint' />").text(makiHTML),
                        $eWrapper = $('div.makiWrapper').eq(i);
                    $eWrapper.append(codeView);
                }
            });


            prettyPrint();

        } else {
            // Loop through the content array and display the needed elements on the screen */
            $.each(settings.content, function(i, e) {

                e = whiteSpaceCheck(i, e);
                e = loremReplace(e);

                var $makiWrapper = $('<span />').data('maki', e),
                    $makiSnippet = $('<span />').zencode(e);

                if (settings.clearfix) {
                    $makiSnippet.addClass('clearfix');
                }

                $this.append($makiWrapper.prepend($makiSnippet));
            });
        }

        // Create the buttons to copy emmet/HTML with
        var copyButtons = $('button.btnCopymaki, button.btnCopyHTML');
        var clip = new ZeroClipboard(copyButtons);

        // As soon as the data is requested from one of the buttons, copy the right content to the clipboard */
        clip.on('dataRequested', function(client, args) {
            $('.copyNotification').remove();
            var snippet = "";
            if ($(this).hasClass('btnCopymaki')) {
                snippet = $(this).parents('.makiWrapper').data('maki');
                $(this).parents('.makiBtnWrapper').append($('<div class="copyNotification">Copied maki!</div>'));
            }
            if ($(this).hasClass('btnCopyHTML')) {
                snippet = $(this).parents('.makiWrapper').find('.makiSnippet').html();
                $(this).parents('.makiBtnWrapper').append($('<div class="copyNotification">Copied HTML!</div>'));
            }
            clip.setText(snippet);

            $('.copyNotification').fadeOut(5000, function() {
                $(this).remove();
            });
        });

    } /* End makiJS.create */

};/* End makiJS object */