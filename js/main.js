	
	
	$(window).on("resize", function() {
		$("body").height = $(window).height;
	});
	
	var $contribute = $("#contribute"),
	    $github = $("#github"),
	    $body = $('body');

	// Hide 'contribute' text on start
	$contribute.hide();
	// Animate header-logo in 
	$("header img").animate({
		opacity: 0.6,
		width: '+=100px'
	},'slow', function() {
			$(this).animate({opacity: 1, width:'462px'}, 'slow');
	});
	// GitHub link
	$github.hover( 
		function() {$contribute.stop(true).fadeIn("slow");}, 
		function() {$contribute.stop(true).fadeOut("fast");} 
	);

	// Check if Geolocation is supported - need to be using HTTPS 
	if ("geolocation" in navigator) {
		console.log("supported");
		navigator.geolocation.getCurrentPosition(success, fail);
	} else {
		console.log("Geolocation is not supported");

	}

// SUCCESS - geolocation works
	function success(position, lat, lon) {
		// Get User Coordinates
		var lon = lon || position.coords.longitude,
			lat = lat || position.coords.latitude;
		// Build URL using user long/lat
		var base =  "http://api.openweathermap.org/data/2.5/weather?lat="+ 
					lat + "&lon=" + lon,
			id = "&APPID=73534e4671149a5202f94d9eaf058256",
			units = "&units=imperial",
			
		var fullUrl = base + id + units;
		console.log( fullUrl ); // log URL for testing 

		//  $.getJSON() w/ new url & update displayWeather()
		$.getJSON( fullUrl, function( data ) { displayWeather(data); });
	};

// FAIL - get location through ip-api
//		  if geolocation is blocked
	function fail() {
		$.getJSON("http://ip-api.com/json", function(ipdata) {
			var lat = ipdata.lat;
			var lon = ipdata.lon;
			lat, lon ? success(null, lat, lon) : console.log("Ip-Api failed");
		});
	};

// Display weather data
	function displayWeather(data) {
		var city = data["name"];
		var temp = data["main"]["temp"];
		var conditions = data["weather"][0]["main"];
		var description = data["weather"][0]["description"];

		$("#city-title").html( city  );
		$("#city-temp").html( temp  + " F&deg;" );
		$("#weatherSum").html(  description  );

		animateWeather(conditions);
	};  // \displayWeather()

// Animate page based on weather 
	function animateWeather(conditions) {

		switch(conditions) {
			case "Clear": 
				$body.animate({
					backgroundColor : "rgb(239,222,130)",
					color : "white"
				}, 1500, function() {
					$("#city-temp").animate({ 
						color: "rgb(8, 157, 246)"}, 'slow');
					}
				);
				break;
			case "Rain" :
				$body.animate({
					backgroundColor : "rgb(100, 140, 169)",
					color : "white"
				}, 1500, function() {
					$("#city-temp").animate({ 
						color: "rgb(74, 74, 210)"}, 'slow');
					}
				);
				break;

			case "Clouds":
				$body.animate({
					backgroundColor : "rgb(113, 113, 113)",
					color : "rgb(51, 66, 111)"
				}, 1500, function() {
					$("#city-temp").animate({
					color: "rgb(187, 187, 187)" }, 'slow');
					}
				);
				break;
		}
	}
	


