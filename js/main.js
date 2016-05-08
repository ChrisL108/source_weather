$(function() {

	var $contribute = $("#contribute"),
	    $github = $("#github");

	$github.hover(
		function() {$contribute.fadeIn("slow");}, 
		function() {$contribute.fadeOut("fast");} 
	);

	// Check if Geolocation is supported
	// Note: Must be using HTTPS instead of HTTP for 
	// geolocation to allow location.

	if ("geolocation" in navigator) {
		console.log("supported");
		navigator.geolocation.getCurrentPosition(success, fail);
	} else {
		alert("Your browser doesn't support Geolocation :/");
	}
	// Different conditions
	// Clear, Clouds
	function success(position) {
		// Get User Coordinates
		var lon = position.coords.longitude;
		var lat = position.coords.latitude;
		// Build URL using user long/lat and my API key
		var id = "&APPID=73534e4671149a5202f94d9eaf058256",
			units = "&units=imperial",
			base =  "http://api.openweathermap.org/data/2.5/weather?lat="+ 
					lat + "&lon=" + lon;
		var fullUrl = base + id + units;
		console.log( fullUrl ); // for testing 
		$.getJSON( fullUrl, function( data ) { displayWeather(data); });
	};
	function fail() {
		alert("Failed to get your location. Some browsers");
	};
	// Display data
	function displayWeather(data) {
		$("#city-title").html( data["name"]  );
		$("#city-temp").html(  data["main"]["temp"] + " F<br>" +
							   data["weather"][0]["main"]  );
		console.log(data["weather"][0]);
	};


 }); //doc-ready