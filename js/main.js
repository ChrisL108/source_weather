$(function() {

	// Check if Geolocation is supported
	if ("geolocation" in navigator) {
		console.log("supported");
		navigator.geolocation.getCurrentPosition(success, fail);
	} else {
		alert("Your browser doesn't support Geolocation :/");
	}

	function success(position) {
		// Get User Coordinates
		var lon = position.coords.longitude;
		var lat = position.coords.latitude;
		// Build URL using user long/lat and my API key
		var id = "&APPID=73534e4671149a5202f94d9eaf058256",
			units = "&units=imperial",
			base =  "http://api.openweathermap.org/data/2.5/weather?lat="+ lat + "&lon=" + lon;
		var fullUrl = base + id + units;
		$.getJSON( fullUrl, function( data ) {
		  var weatherArr = [];
		  $.each( data, function( key, val ) {
		    weatherArr.push("<br>Key: " + key +", Value: " + val );
		  });
		$("#city-title").html(weatherArr);
		console.log(weatherArr);
		});
	}
	function fail() {
		alert("Failed to get your location. Is your browser blocking it?");
	}


 }); //doc-ready