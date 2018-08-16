import React, { Component } from 'react';
import { computed } from 'mobx';
import { observer, Provider } from 'mobx-react';
import { hot } from 'react-hot-loader';
import * as Environment from './utils/Environment';
import Debug from './components/Debug/Debug';
import Locations from './components/Locations/Locations';
import DashboardStore from './stores/DashboardStore';
import RssService from './services/RssService';
import WeatherService from './services/WeatherService';
import './App.sass';

const showDebug = () => {
  return Environment.DEVELOPMENT;
}

@observer
class App extends Component {
  constructor(props) {
    super(props);
    this.store = DashboardStore.initialize(WeatherService, RssService);
  }

  @computed
  get appClass() {
    return [
      "app-container",
      Array.from(this.store.showDebugCss && ["debug"])
    ].join(" ");
  }

  render() {
    const store = this.store;

    return (
      <Provider store={store}>
        <React.Fragment>
          <div className={this.appClass} >
            <Locations />
          </div>
          {showDebug() && <Debug />}
        </React.Fragment>
      </Provider>
    );
  }
}

export default hot(module)(App)
