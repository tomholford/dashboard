// import './index.sass';
// 
// var WEATHER_API_KEY_T = '16793c2cd11658bc4be9dc7d5fa5c848';
// var WEATHER_API_ENDPOINT_T = 'https://api.openweathermap.org/data/2.5/weather?zip=94114,us&units=imperial&appid=' + WEATHER_API_KEY_T;
// var WEATHER_API_KEY_A = 'be3c12cf8c96fa59063516f00d1a95b7';
// var WEATHER_API_ENDPOINT_A = 'https://api.openweathermap.org/data/2.5/weather?id=1850144&units=imperial&appid=' + WEATHER_API_KEY_A;
//
// // function handleWeatherSuccess(response, initial, unit) {
// //   // var initial = ['t', 'a'];
// //   // var unit = 'F';
// //   response.json().then(function(data) {
// //     var currentTemp = data['main']['temp'];
// //     var forecastLow = data['main']['temp_min'];
// //     var forecastHigh = data['main']['temp_max'];
// //     var unitDivider = unit;
// //     var initialHere = initial;
// //
// //     document.getElementById('current-' + initialHere).innerText = currentTemp + unitDivider;
// //     document.getElementById('low-' + initialHere).innerText = forecastLow + unitDivider;
// //     document.getElementById('high-' + initialHere).innerText = forecastHigh + unitDivider;
// //     console.log(data);
// //   })
// // }
//
//
// function handleWeatherSuccess_t(response) {
//   response.json().then(function(data) {
//     var currentTemp = data['main']['temp'];
//     var forecastLow = data['main']['temp_min'];
//     var forecastHigh = data['main']['temp_max'];
//
//     document.getElementById('current-t').innerText = currentTemp + ' F';
//     document.getElementById('low-t').innerText = forecastLow + ' F';
//     document.getElementById('high-t').innerText = forecastHigh + ' F';
//     console.log(data);
//   })
// }
//
// function handleWeatherSuccess_a(response) {
//   response.json().then(function(data) {
//     var currentTemp = data['main']['temp'];
//     var forecastLow = data['main']['temp_min'];
//     var forecastHigh = data['main']['temp_max'];
//
//     document.getElementById('current-a').innerText = currentTemp + ' F';
//     document.getElementById('low-a').innerText = forecastLow + ' F';
//     document.getElementById('high-a').innerText = forecastHigh + ' F';
//     console.log(data);
//   })
// }
//
// function handleWeatherError(response) {
//   console.log(response);
// }
//
// function queryWeatherApi() {
//   var options = {
//     method: 'GET',
//     cache: 'no-cache'
//   };
//
//   var request_t = new Request(WEATHER_API_ENDPOINT_T);
//   var request_a = new Request(WEATHER_API_ENDPOINT_A);
//
//   // fetch(request_t, options).then(handleWeatherSuccess(response, "t", "F"), handleWeatherError);
//   // fetch(request_a, options).then(handleWeatherSuccess(response, "a", "F"), handleWeatherError);
//   fetch(request_t, options).then(handleWeatherSuccess_t, handleWeatherError);
//   fetch(request_a, options).then(handleWeatherSuccess_a, handleWeatherError);
// };
//
// document.addEventListener("DOMContentLoaded", function() {
//   queryWeatherApi();
// });
