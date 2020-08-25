var latitude_global  
var longitude_global 
document.querySelector('#find-me').addEventListener('click', geoFindMe);

function geoFindMe() {
  const status = document.querySelector('#status');
  const mapLink = document.querySelector('#map-link');
  //mapLink.href = '';
  mapLink.textContent = '';

  function success(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    latitude_global=latitude;
    longitude_global=longitude;
    status.textContent = '';
    //mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    getLocationAndWeather();
    //initialize();
  }

  function error() {
    status.textContent = 'Unable to retrieve your location';
  }

  if (!navigator.geolocation) {
    status.textContent = 'Geolocation is not supported by your browser';
  } else {
    status.textContent = 'Locating…';
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

 var weatherData = {
	city: document.querySelector("#city"),
	temperature: document.querySelector("#temperature"),
	temperatureValue: 0,
	desc:document.querySelector("#description"),
	aqi:document.querySelector("#aqi"),
	units: "°F"
};
		
function switchUnits(){
	if (weatherData.units == "°F"){
		weatherData.temperatureValue = ((weatherData.temperatureValue -  32) * 5/9);
		weatherData.units = "°C";
	  }
	 else{
		weatherData.temperatureValue = ((weatherData.temperatureValue * 9/5) + 32);
		weatherData.units = "°F";
	}
	weatherData.temperature.innerHTML = weatherData.temperatureValue + weatherData.units + " ";      
}

function getLocationAndWeather(){
	if (window.XMLHttpRequest){
		var xhr = new XMLHttpRequest();
		xhr.addEventListener("load", function() {
		var response = JSON.parse(xhr.responseText);
		console.log(response);
		var cityName = response.name;
		var weatherSimpleDescription = response.weather;
		var weatherDescription = response.weather[0].main;
		var weatherTemperature = response.main.temp;
		weatherData.temperatureValue = weatherTemperature;
		weatherData.city.innerHTML = cityName;
		weatherData.desc.innerHTML="Description: "+weatherDescription;
		weatherData.temperature.innerHTML = weatherTemperature + weatherData.units;
	  }, false);
	  
	  var aqr = new XMLHttpRequest();
		aqr.addEventListener("load", function() {
		var aqresponse = JSON.parse(aqr.responseText);
		console.log(aqresponse);
		var aqindex=aqresponse.data.current.pollution.aqius;
		weatherData.aqi.innerHTML="Air Quality Index: "+aqindex;
	   }, false);
	   
	   
	  xhr.addEventListener("error", function(err){
		alert("Could not complete the request");
	  }, false);

	  xhr.open("GET", "https://api.openweathermap.org/data/2.5/weather?lat="+latitude_global+"&lon="+longitude_global+"&units=imperial&APPID=3d5acef41db05b933b2d4c6a3a791e46", true);
	  xhr.send();
	  aqr.open("GET", "https://api.airvisual.com/v2/nearest_city?lat="+latitude_global+"&lon="+longitude_global+"&key=rd6H63oLtfdvQEnes", true);
	  aqr.send();
	}
	else{
	  alert("Unable to fetch the location and weather data.");
	}   
	//getcities();
}

var locations = Array(11).fill(null).map(() => Array(8))
var locat =new  Array(11)
function getcities(){
	
		//Weather
		var xhr = new XMLHttpRequest();
		xhr.addEventListener("load", function() {
		var response = JSON.parse(xhr.responseText);
		console.log(response);
		for(i=0;i<11;i++){	
		locations[i][0] = response.list[i].name;
		locations[i][1] = response.list[i].coord.lon;
		locations[i][2] = response.list[i].coord.lat;
		locations[i][3] = response.list[i].main.temp;
		locations[i][4] = response.list[i].weather[0].description;
		locations[i][5] = response.list[i].wind.speed;
		locations[i][6] = response.list[i].weather[0].icon;
		}
		}, false);
	  
		  xhr.addEventListener("error", function(err){
			alert("Could not complete the request");
		  }, false);

		xhr.open("GET", "https://api.openweathermap.org/data/2.5/group?id=1273293,1275339,1275004,1277333,1176734,1264527,1259229,1267995,1253102,1262180,1269743&units=imperial&APPID=3d5acef41db05b933b2d4c6a3a791e46", true);
		xhr.send();
		

			
}



var map;
var service;
var infowindow;
var weatherData1 = {
	city1: document.querySelector("#city1"),
	temperature1: document.querySelector("#temp1"),
	temperatureValue1: 0,
	desc1:document.querySelector("#description1"),
	aqi1:document.querySelector("#aqi1"),
	units1: "°F"
};
function initialize() {
  var loc = new google.maps.LatLng(23.5,78.50);
  map = new google.maps.Map(document.getElementById('map'), {
      center: loc,
      zoom: 5
    });
	/*var locations=[
		['Delhi',77.25,28.75,1],
		['Mumbai',72.85,19.01,2],
		['Kolkata',88.37,22.57,3],
		['Banglore',77.6,12.98,4],
		['Hyderabad',68.37,25.39,5],
		['Chennai',80.28,13.09,6],
		['Pune',73.86,18.52,7],
		['Kanpur',80.35,26.47,8],
		['Vizag',83.21,17.69,9],
		['Nagpur',79.1,21.15,10],
		['Indore',75.83,22.72,11],
		];*/
		getcities();
    setMarkers(map,locations);
	google.maps.event.addListener(map, 'click', function(event) {
          var latt=event.latLng.lat();
          var longg=event.latLng.lng();
          //alert(event.latLng.lat() + ", " + event.latLng.lng());
				  var xhr = new XMLHttpRequest();
				xhr.addEventListener("load", function() {
				var response = JSON.parse(xhr.responseText);
				console.log(response);
				var cityName = response.name;
				var weatherSimpleDescription = response.weather;
				var weatherDescription = response.weather[0].main;
				var weatherTemperature = response.main.temp;
				weatherData1.temperatureValue1 = weatherTemperature;
				weatherData1.city1.innerHTML = cityName;
				weatherData1.desc1.innerHTML=weatherDescription;
				weatherData1.temperature1.innerHTML = weatherTemperature + weatherData1.units1;
				
			  }, false);
			  
				    var aqr = new XMLHttpRequest();
					aqr.addEventListener("load", function() {
					var aqresponse = JSON.parse(aqr.responseText);
					console.log(aqresponse);
					var aqindex=aqresponse.data.current.pollution.aqius;
					weatherData1.aqi1.innerHTML="Air Quality Index: "+aqindex;
				   }, false);
			  
			  xhr.addEventListener("error", function(err){
				alert("Could not complete the request");
			  }, false);

			  xhr.open("GET", "https://api.openweathermap.org/data/2.5/weather?lat="+latt+"&lon="+longg+"&units=imperial&APPID=3d5acef41db05b933b2d4c6a3a791e46", true);
			  xhr.send();
			  aqr.open("GET", "https://api.airvisual.com/v2/nearest_city?lat="+latt+"&lon="+longg+"&key=rd6H63oLtfdvQEnes", true);
			  aqr.send();
		  document.getElementById("model").style.display='block';
        });
}

function setMarkers(map,locations){
	var marker, i
	for (i = 0; i < locations.length; i++){  
		 //var loan = locations[i][0]
		 var lat = locations[i][2]
		 var longi = locations[i][1]
		 //var add =  locations[i][3]
		 latlngset = new google.maps.LatLng(lat, longi);

		  var marker = new google.maps.Marker({  
				  map: map, title: locations[i][0] , position: latlngset  
				});
				map.setCenter(marker.getPosition())

				var content = "<h3>City: " + locations[i][0] +  '</h3>' +"<h3>Temp : "+locations[i][3]+"°F</h3><h5>Description : "+locations[i][4]+"<img src='http://openweathermap.org/img/w/"+locations[i][6]+".png'></img></h5><h5>Wind speed : "+locations[i][5]+"km/h</h5>"    

		  var infowindow = new google.maps.InfoWindow()

		google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
				return function() {
				   infowindow.setContent(content);
				   infowindow.open(map,marker);
				};
			})(marker,content,infowindow)); 

	}
  }
      
//2b177e424aea8a535f084aa7ab19df6e