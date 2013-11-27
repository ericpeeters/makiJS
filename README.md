	                  ,--.    ,--.     ,--. ,---.   
	,--,--,--. ,--,--.|  |,-. `--'     |  |'   .-'  
	|        |' ,-.  ||     / ,--.,--. |  |`.  `-.  
	|  |  |  |\ '-'  ||  \  \ |  ||  '-'  /.-'    | 
	`--`--`--' `--`--'`--'`--'`--' `-----' `-----'  
                                                   

**makiJS** is a jQuery plugin for rapid page prototyping.

The plugin accepts a list of Emmet syntax formatted strings to create a styleguide and/or protopage. 

##Usage
To use it in your project, call it on a jQuery selector of choice with the following properties:

    $(target).maki({
		content:        [] || "...",          
		copyControls:   true || false,
		codeView:       true || false,
    	clearfix:       true || false,
    	hash:			"..." || "#..." || false,
    	path:			"..." || false,
    	debug:			true || false
	});

##Properties

####content:
An array of emmet strings or a single emmet string, also allows for a multidimensional array to extract elements into different arrays and re-use them in multiple cases.

####copyControls:
A boolean that allows you to add Copy Emmet & Copy HTML buttons.

####codeView: 
A boolean that allows you to add a codeView to every element (inherits from copyControls by default and can only be activated if the copyControls property is set to true).

####clearfix: 
A boolean that adds the clearfix class to each element maki creates.

####hash:
A string that allows you to specify a hash that maki will trigger on.

####path:
A string that allows you to specify a path where to load the dependencies from.

###debug:
A boolean that allows you to toggle loading in the minified/non-minified dependencies.

##Thanks to
Redhotminute - [http://www.redhotminute.com](http://www.redhotminute.com "Redhotminute")<br>
jQuery - [http://www.jquery.com](http://www.jquery.com "jQuery")<br>
jQuery-ZenCoding.js - [https://github.com/zodoz/jquery-ZenCoding](https://github.com/zodoz/jquery-ZenCoding "jQuery Zen Coding")<br>
Prettify.js - [https://code.google.com/p/google-code-prettify/](https://code.google.com/p/google-code-prettify/ "Prettify")<br>
Emmet - [http://emmet.io/](http://emmet.io/ "Emmet")

