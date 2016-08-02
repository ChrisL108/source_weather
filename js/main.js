	
var $body = $("body");
$(window).on("resize", function() {
	$body.height = $(window).height;
	$body.width = $(window).width;
});



$(document).ready(function() {

	// Check if Geolocation is supported - need to be using HTTPS 
	if ("geolocation" in navigator) {
		
		navigator.geolocation.getCurrentPosition(success, fail);
	} else {
		alert("Geolocation is not supported");

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
			lat, lon ? success(null, lat, lon) : alert("Ip-Api failed");
		});
	}

// Display weather data
	function displayWeather(data) {
		if (data["name"]) {
			var city = data["name"];
			var temp = data["main"]["temp"];
			var conditions = data["weather"][0]["main"];
			var description = data["weather"][0]["description"];
		}
		$("#city-title").html( city  );
		$("#city-temp").html( temp  + " F&deg;" );
		$("#weatherSum").html(  description  );

		animateWeather(conditions);
	}  

	$("form").on("submit", function(evt) {
		evt.preventDefault();
		var zipUrl = "http://api.openweathermap.org/data/2.5/weather?zip="+
						$("#zip").val() + 
						"&APPID=73534e4671149a5202f94d9eaf058256&units=imperial";
		$.getJSON( zipUrl, function( data ) { displayWeather(data); });
	});

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
	$("#mist-btn").on("click", function() {
		animateWeather("Mist") ;
	});

	// hide weather on load
	$(".weather-icons").hide();
	
	// Animate page based on weather 
	function animateWeather(conditions) {
		
		$(".weather-icons").hide();
		switch(conditions) {

		case "Clear": 
			$("#clear").appendTo("#current-weather");
			$("#clear").slideDown();
			$body.switchClass("rain clouds snow mist", "clear", 1800);
			animateSun();

			break;
		case "Rain" :
			$("#rain").appendTo("#current-weather");
			$("#rain").slideDown();
			$body.switchClass("clear clouds snow mist", "rain", 1800);
			animateRain();
			break;

		case "Clouds":
			// $("#CurrentWeather").append($("#clouds"));
			$("#clouds").appendTo("#current-weather");
			$("#clouds").slideDown();
			$body.switchClass("clear rain snow mist", "clouds", 1800);
			animateClouds();
			break;

		case "Snow":
			// $("#CurrentWeather").append($("#snow"));
			$("#snow").appendTo("#current-weather");
			$("#snow").slideDown();
			$body.switchClass("clear rain clouds mist", "snow", 1800);
			animateSnow();
			break;

		case "Mist":
			// $("#CurrentWeather").append($("#clouds"));
			$("#mist").appendTo("#current-weather");
			$("#mist").slideDown();
			$body.switchClass("clear rain snow clouds", "mist", 1800);
			animateMist();
			break;
		
		case "Haze": 
			// $("#CurrentWeather").append($("#clouds"));
			$("#mist").appendTo("#current-weather");
			$("#mist").slideDown();
			$body.switchClass("clear rain snow clouds", "mist", 1800);
			animateMist();
		}
	}

	function animateSun() {
		$("#clear-cloud").css({ 
			opacity:1,
			marginLeft: "-=50"
		});
		$("#clear-cloud").animate({
			opacity:0,
			marginLeft: "+=50"
		}, 2000, "linear");
		$("#clear-sun").animate({color:"yellow"});
	}

	function animateRain() {
		$("#rain-drop1, #rain-drop2, #rain-drop3").css({
			top:0, opacity:0
		});
		$("#rain-drop1, #rain-drop3").animate({
			top: "+=25",
			opacity:1
		},2500, "linear" );

		$("#rain-drop2").animate({
			top: "+=60",
			opacity:0.9
		},2500, "linear" );
		
	}

	function animateClouds() {
		$("#cloud1, #cloud2").css({marginLeft:0});
		$("#cloud1").animate({
			marginLeft: 30,
			color:"dimgray",
		},1800, "linear" );
		$("#cloud2").animate({
			marginLeft: -50,
			bottom: 15,
			color: "rgb(56, 56, 56)",
			opacity: 0.9
		},1800, "linear" );
	}
	
	function animateSnow() {
		$("#snow-flake1, #snow-flake2, #snow-flake3").css({
			color: "blue"
		});
		$("#snow-flake1").css({
			marginLeft: "+=20"
		}, 1200, "linear");
		$("#snow-flake2").css({
			marginLeft: "-=40",
		}, 1200, "linear");
		$("#snow-flake3").css({
			marginLeft: "-=90"
		}, 1200, "linear");

		$("#snow-flake1").animate({
			color: "white",
			marginLeft: "-=20"
		}, 1200, "linear");
		$("#snow-flake2").animate({
			marginLeft: "+=40",
			color: "#88e1ff"
		}, 1200, "linear");
		$("#snow-flake3").animate({
			color: "#6ab9ff",
			marginLeft: "+=90"
		}, 1200, "linear");
	}

	function animateMist() {
		$("#mist1, #mist2, #mist3, #mist4").css({
			marginLeft:0,
			bottom: 0
		});
		$("#mist1").animate({
			marginLeft: 30,
			opacity: 0.2,
			color: "rgb(56, 56, 56)"
		},1800, "linear" );
		$("#mist2").animate({
			marginLeft: -50,
			bottom: "+=15",
			color: "rgb(56, 56, 56)",
			opacity: 0.1
		},1800, "linear" );
		$("#mist3").animate({
			marginLeft: -50,
			color: "rgb(56, 56, 56)",
			opacity: 0.3
		},1800, "linear" );
		$("#mist4").animate({
			marginLeft: -50,
			bottom: "+=8",
			color: "rgb(56, 56, 56)",
			opacity: 0.2
		},1800, "linear" );
	}

	
});

