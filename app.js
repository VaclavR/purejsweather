'use strict';

searchButton.addEventListener('click', searchWeather);
searchCity.addEventListener('input', autocomplete);
var cityNames = [];


function autocomplete(e) {
    var value = e.target.value.trim();
    var item;
    var currentNames = [];
    autocompleteBlock.innerHTML = '';
    for (var i = 0; i < cityNames.length; i++) {
        if (value.toUpperCase() === cityNames[i].substr(0, value.length).toUpperCase()) {
            currentNames.push(cityNames[i]);
            item = document.createElement('div');
            item.textContent = cityNames[i];
            item.setAttribute('id', 'city' + i);
            item.addEventListener('click', function() {
                console.log(this.textContent);
            });
            autocompleteBlock.appendChild(item);
        }
    }
    console.log(currentNames);
}

function loadCityList() {
    var http = new XMLHttpRequest();
    var url = 'https://restcountries.eu/rest/v2/all';
    var method = 'GET';
    http.open(method, url);
    http.onreadystatechange = function () {
        if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
            var data = JSON.parse(http.responseText);
            for (var i = 0; i < data.length; i++) {
                cityNames.push(data[i].capital);
            }
            console.log(cityNames);
        }
    };
    http.send();
}

loadCityList();

function searchWeather() {
   loadText.style.display = 'block';
   weatherBox.style.display = 'none';
   
   var cityName = searchCity.value;
   if (cityName.trim().length === 0) {
       return alert('Please enter a city name');
   }
   var http = new XMLHttpRequest();
   var apiKey = '90daeb6a0170e2403ce8ef744515da66';
   var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apiKey;
   var method = 'GET';

   http.open(method, url);
   http.onreadystatechange = function() {
       if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
            var data = JSON.parse(http.responseText);
            var weatherData = new Weather(cityName,  data.weather[0].description.toUpperCase());
            weatherData.temperature = data.main.temp;

            loadText.style.display = 'none';
            weatherBox.style.display = 'block';
            weatherCity.textContent = weatherData.cityName;
            weatherDescription.textContent = weatherData.description;
            weatherTemperature .textContent = weatherData.temperature;
       } else if (http.readyState === XMLHttpRequest.DONE && http.status !== 200) {
           alert('Error');
       }
   };
   http.send();
}