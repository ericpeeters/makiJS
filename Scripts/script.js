$(document).ready(function() {

	var buttons = [ 'button>{Button 1}', 'button>{Button 2}', 'button>{Button 3}'],
		headers = [ 'h1>{Header 1}', 'h1>{Header 2}', 'h1>{Header 3}'];

	$('.container').maki({
		content: "h1>{Hi}",
		clearfix: true,
		hash: "proto",
		path: 'Scripts/makiSrc',
		debug: true
	});

});
