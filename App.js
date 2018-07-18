import React, { Component } from 'react';
import { observer, Provider } from 'mobx-react';
import { hot } from 'react-hot-loader';
import ClockList from './components/ClockList/ClockList';
import WeatherList from './components/WeatherList/WeatherList';
import LocationStore from './stores/LocationStore';
import WeatherService from './services/WeatherService';
import './App.sass';


@observer
class App extends Component {
  constructor(props) {
    super(props);
    this.store = LocationStore.initialize(WeatherService);
  }

  render() {
    const store = this.store;

    return (
      <Provider store={store}>
        <div className="app-container">
          <h1>Weather</h1>
          <WeatherList />
          <h1>Local Time</h1>
          <ClockList />
        </div>
      </Provider>
    );
  }
}

export default hot(module)(App)
