import React, { Component } from 'react';
import { observer, Provider } from 'mobx-react';
import { hot } from 'react-hot-loader';
import Environment from './utils/Environment';
import Locations from './components/Locations/Locations';
import LocationStore from './stores/LocationStore';
import WeatherService from './services/WeatherService';
import './App.sass';

const appDebugClass = () => {
  console.log(process);
  console.log(process.env);
  console.log(Environment);
  console.log(Environment.NODE_ENV);
  return Array.from(Environment.NODE_ENV === 'development' && ["debug"]);
  // return 'debug'
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
        <div className={[
                 "app-container",
                 appDebugClass()
                ].join(" ")} >
          <Locations />
        </div>
      </Provider>
    );
  }
}

export default hot(module)(App)
