import React, {Component} from 'react';
import ClockList from './components/ClockList/ClockList';
import WeatherList from './components/WeatherList/WeatherList';
import './App.sass';

const cities = [
  {
    "id": 1850144,
    "unit": "C",
    "locale": "ja-JP",
    "timezone": "Asia/Tokyo",
    "name": "Tokyo",
  },
  {
    "id": 5391959,
    "unit": "F",
    "locale": "en-US",
    "timezone": "America/Los_Angeles",
    "name": "San Francisco",
  }
];

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="app-container">
        <h1>Weather</h1>
        <WeatherList cities={cities}/>
        <h1>Local Time</h1>
        <ClockList cities={cities}/>
      </div>
    );
  }
}

export default App;
