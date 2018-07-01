import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { hot } from 'react-hot-loader';
import ClockList from './components/ClockList/ClockList';
import WeatherList from './components/WeatherList/WeatherList';
import LocationStore from './stores/LocationStore';
import './App.sass';

const LOCATIONS = [
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
  },
  {
    "id": 3117732,
    "unit": "C",
    "locale": "es-SP",
    "timezone": "Europe/Madrid",
    "name": "Madrid",
  }
];

@observer
class App extends Component {
  constructor(props) {
    super(props);
    this.initializeStore();
    this.addLocation();
  }

  initializeStore = () => {
    this.store = new LocationStore();
    LOCATIONS.forEach((location) => {
      this.store.addLocation(location);
    })
  }

  addLocation = () => {
    setTimeout(() => {
      this.store.addLocation({
        "id": 5746545,
        "unit": "F",
        "locale": "en-US",
        "timezone": "America/Los_Angeles",
        "name": "Portland",
      });
    }, 2000);
  }

  render() {
    const store = this.store;

    return (
      <div className="app-container">
        <h1>Weather</h1>
        <WeatherList locations={store.locations}/>
        <h1>Local Time</h1>
        <ClockList locations={store.locations}/>
      </div>
    );
  }
}

export default hot(module)(App)
