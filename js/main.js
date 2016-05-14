$(function() {

	var $contribute = $("#contribute"),
	    $github = $("#github"),
	    $body = $('body');

	$contribute.hide();
	$("header img").animate({
		opacity: 0.6,
		width: '+=100px'
	},'slow', function() {
			$(this).animate({opacity: 1, width:'462px'}, 'slow');
	});
	
	$github.hover(
		function() {$contribute.stop(true).fadeIn("slow");}, 
		function() {$contribute.stop(true).fadeOut("fast");} 
	);

	// Check if Geolocation is supported - need to be using HTTPS 

	if ("geolocation" in navigator) {
		console.log("supported");
		navigator.geolocation.getCurrentPosition(success, fail);
	} else {
		alert("Your browser doesn't support Geolocation");
	}

	// Different conditions
	// Clear, Clouds, Rain
	function success(position) {
		// Get User Coordinates
		var lon = position.coords.longitude;
		var lat = position.coords.latitude;
		// Build URL using user long/lat
		var id = "&APPID=73534e4671149a5202f94d9eaf058256",
			units = "&units=imperial",
			base =  "http://api.openweathermap.org/data/2.5/weather?lat="+ 
					lat + "&lon=" + lon;
		var fullUrl = base + id + units;
		console.log( fullUrl ); // for testing 

		//  $.getJSON( url ) ..then.. displayWeather()
		$.getJSON( fullUrl, function( data ) { displayWeather(data); });
	};

	function fail() {
		alert("Failed to get location. Make sure it isn't blocked");
	};

	// Display data
	function displayWeather(data) {
		var city = data["name"];
		var temp = data["main"]["temp"];
		var conditions = data["weather"][0]["main"];

		$("#city-title").html( city  );
		$("#city-temp").html( temp  + " F&deg;" );
		$("#weatherSum").html(  conditions  );


		// Animate based on weather
		switch(conditions) {
			case "Clear": 
				break;
			case "Rain" :
				$body.animate({
					backgroundColor : "rgb(100, 140, 169)",
					color : "white"
				}, 1500, function() {
					$("#city-temp").animate({ 
						color: "rgb(74, 74, 210)"}, 'slow');
				});
				break;

			case "Clouds":
				$body.animate({
					backgroundColor : "rgb(113, 113, 113)",
					color : "rgb(51, 66, 111)"
				}, 1500, function() {
					$("#city-temp").animate({
					color: "rgb(187, 187, 187)" }, 'slow');
				});
				break;
		}

	};

 }); //doc-ready