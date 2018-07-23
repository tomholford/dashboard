import React, { Component } from 'react';
import { observer, Provider } from 'mobx-react';
import { hot } from 'react-hot-loader';
import * as Environment from './utils/Environment';
import Locations from './components/Locations/Locations';
import LocationStore from './stores/LocationStore';
import WeatherService from './services/WeatherService';
import './App.sass';

const appClass = () => {
  return [
    "app-container",
    Array.from(Environment.DEVELOPMENT && ["debug"])
  ].join(" ")
}

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
        <div className={appClass()} >
          <Locations />
        </div>
      </Provider>
    );
  }
}

export default hot(module)(App)
