import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import Weather from './components/Weather/Weather';
console.log('test')
const root = document.getElementById('root');

const cities = [
  {
    "name": '東京',
    "unit": 'C',
    "currentTemp": '12',
    "forecastLow": '10',
    "forecastHigh": '18',
  },
  {
    "name": 'San Francisco',
    "unit": 'F',
    "currentTemp": '40',
    "forecastLow": '50',
    "forecastHigh": '57',
  }
];

const App = () => (
  cities.map(function(city, index){
    return <Weather
              key={ index }
              name={ city.name }
              unit={ city.unit }
              currentTemp={ city.currentTemp }
              forecastLow={ city.forecastLow }
              forecastHigh={ city.forecastHigh }/>;
  })
);

ReactDOM.render(<App />, root);

// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}
