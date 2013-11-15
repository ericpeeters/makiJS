$(document).ready(function() {

	var buttons = ['button>{buttons}','button>{button2}','button>{button3}'];
	var headers = ['h1>{buttonba}','h1>{buttonda}','h1>{button3}'];

	$('.container').maki({
		content: [ buttons, headers ],
		hash: "proto",
		copyControls: true
	});

});
