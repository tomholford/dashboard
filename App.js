import React, { Component } from 'react';
import { computed } from 'mobx';
import { observer, Provider } from 'mobx-react';
import { hot } from 'react-hot-loader';
import Settings from './components/Settings/Settings';
import Locations from './components/Locations/Locations';
import DashboardStore from './stores/DashboardStore';
import RssService from './services/RssService';
import WeatherService from './services/WeatherService';
import './App.sass';

@observer
class App extends Component {
  constructor(props) {
    super(props);
    this.store = DashboardStore.initialize(WeatherService, RssService);
  }

  render() {
    const store = this.store;

    return (
      <Provider store={store}>
        <React.Fragment>
          <div className="app-container" >
            <Locations />
          </div>
          <div className="app-button-container">
            <Settings />
          </div>
        </React.Fragment>
      </Provider>
    );
  }
}

export default hot(module)(App)
