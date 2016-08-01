	
var $body = $("body");
$(window).on("resize", function() {
	$body.height = $(window).height;
	$body.width = $(window).width;
});

$(document).ready(function() {
	var $contribute = $("#contribute"),
		$github = $("#github");

	// Hide 'contribute' text on start
	$contribute.hide();
	// Animate header-logo in 
	$("#logo").animate({
		opacity: 0.6,
		width: "+=100px"
	},"slow", function() {
		$(this).animate({opacity: 1, width:"462px"}, "slow");
	});
	// GitHub link
	$github.hover(
		function fadeInGithub() {
			$contribute.stop(true).fadeIn("slow");
		}, 
		function fadeOutGithub() {
			$contribute.stop(true).fadeOut("fast");
		} 
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
		lat = lat || position.coords.latitude;
		lon = lon || position.coords.longitude;
		
		// Build URL using user long/lat
		var base =  "http://api.openweathermap.org/data/2.5/weather?lat="+ 
					lat + "&lon=" + lon,
			id = "&APPID=73534e4671149a5202f94d9eaf058256",
			units = "&units=imperial";
			
		var fullUrl = base + id + units;
		console.log( fullUrl ); // log URL for testing 

		//  $.getJSON() w/ new url & update displayWeather()
		$.getJSON( fullUrl, function( data ) { displayWeather(data); });
	}

// FAIL - get location through ip-api
//		  if geolocation is blocked
	function fail() {
		$.getJSON("http://ip-api.com/json", function(ipdata) {
			var lat = ipdata.lat;
			var lon = ipdata.lon;
			lat, lon ? success(null, lat, lon) : console.log("Ip-Api failed");
		});
	}

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
	}  


// buttons to change weather
	$("#clear-btn").on("click", function() {
		animateWeather("Clear");
	});
	$("#clouds-btn").on("click", function() {
		animateWeather("Clouds");
	});
	$("#rain-btn").on("click", function() {
		animateWeather("Rain");
	});
	$("#snow-btn").on("click", function() {
		animateWeather("Snow") ;
	});


// $('#clouds').animate({
// 	opacity: 0.25,
// 	left: '+=1400',
// 	height: 'toggle'
// }, 5000, 'linear', function() {
// 	loop();
// });
	$(".weather-icons").hide();

	var $clear = $("#clear"),
		$rain = $("#rain"),
		$clouds = $("#clouds"),
		$snow = $("#snow");
	// Animate page based on weather 
	function animateWeather(conditions) {
		
		$(".weather-icons").hide();
		switch(conditions) {

		case "Clear": 
			$clear.appendTo("#current-weather");
			$clear.slideDown();
			$body.switchClass("rain clouds snow", "clear", 2000);
			

			break;
		case "Rain" :
			$("#rain").appendTo("#current-weather");
			$("#rain").slideDown();
			$body.switchClass("clear clouds snow", "rain", 2000);
			animateRain();
			break;

		case "Clouds":
			// $("#CurrentWeather").append($("#clouds"));
			$("#clouds").appendTo("#current-weather");
			$("#clouds").slideDown();
			$body.switchClass("clear rain snow", "clouds", 2000);
			animateClouds();
			break;

		case "Snow":
			// $("#CurrentWeather").append($("#snow"));
			$("#snow").appendTo("#current-weather");
			$("#snow").slideDown();
			$body.switchClass("clear rain clouds", "snow", 2000);
			break;
		}
	}

	function animateRain() {
		$("#rain-drop1, #rain-drop2, #rain-drop3").css({
			top:0, opacity:0
		});
		$("#rain-drop1, #rain-drop3").animate({
			top: "+=40",
			opacity:1
		},2500, "linear" );

		$("#rain-drop2").animate({
			top: "+=50",
			opacity:0.9
		},2500, "linear" );
		

	}

	function animateClouds() {
		return true;
	}


	
});

