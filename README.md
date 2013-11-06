# makiJS #

**makiJS** is a jQuery plugin for rapid page prototyping.

The plugin accepts a list of Emmet syntax formatted strings to create a styleguide and/or protopage. 

##Usage
To use it in your project, call it on a jQuery selector of choice with the following properties:

    $(target).maki({
		content:        [] || "",          
		copyControls:   true || false,
		codeView:       true || false,
    	clearfix:       true || false
	});

##Properties

###content:
	typeof content == "Array" || "String";
> An array of emmet strings or a single emmet string, also you can add a multidimensional array to extract elements into different groups and re use them in multiple cases

***

###copyControls: 
	typeof copyControls == "Boolean";
> A boolean that allows you to add Copy Emmet & Copy HTML buttons

***

###codeView: 
	typeof codeView == "Boolean";
> A boolean that allows you to add a codeView to every element <br>
> (inherits from copyControls by defaults and can only be activated if copyControls == true)


***

###clearfix: 
	typeof clearfix == "Boolean";
> A boolean that adds the clearfix class to each element in the styleguide to give it breathing room

##Thanks to
Redhotminute - [http://www.redhotminute.com](http://www.redhotminute.com "Redhotminute")<br>
jQuery - [http://www.jquery.com](http://www.jquery.com "jQuery")<br>
jQuery-ZenCoding.js - [https://github.com/zodoz/jquery-ZenCoding](https://github.com/zodoz/jquery-ZenCoding "jQuery Zen Coding")<br>
Prettify.js - [https://code.google.com/p/google-code-prettify/](https://code.google.com/p/google-code-prettify/ "Prettify")<br>
Emmet - [http://emmet.io/](http://emmet.io/ "Emmet")

