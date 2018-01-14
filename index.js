import './index.sass';

var WEATHER_API_KEY = '16793c2cd11658bc4be9dc7d5fa5c848';
var WEATHER_API_ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather?zip=94114,us&units=imperial&appid=' + WEATHER_API_KEY;

function handleWeatherSuccess(response) {
  response.json().then(function(data) {
    var currentTemp = data['main']['temp'];
    var forecastLow = data['main']['temp_min'];
    var forecastHigh = data['main']['temp_max'];

    document.getElementById('current').innerText = currentTemp + ' F';
    document.getElementById('low').innerText = forecastLow + ' F';
    document.getElementById('high').innerText = forecastHigh + ' F';
    console.log(data);
  })
}

function handleWeatherError(response) {
  console.log(response);
}

function queryWeatherApi() {
  var options = {
    method: 'GET',
    cache: 'no-cache'
  };

  var request = new Request(WEATHER_API_ENDPOINT);

  fetch(request, options).then(handleWeatherSuccess, handleWeatherError);
};

document.addEventListener("DOMContentLoaded", function() {
  queryWeatherApi();
});
