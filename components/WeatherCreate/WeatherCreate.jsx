import React from 'react';
import { inject } from 'mobx-react';
import LocationStore from '../../stores/LocationStore';

import './WeatherCreate.sass'

@inject('store')
class WeatherCreate extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
  }

  addLocation = () => {
    const location = {
      "id": 5746545,
      "unit": "F",
      "locale": "en-US",
      "timezone": "America/Los_Angeles",
      "name": "Portland",
    }

    this.store.addLocation(location);
  }

  render() {
    return(
      <div className="widget-piece-container">
        <button onClick={this.addLocation}>+</button>
      </div>
    );
  }
}

export default WeatherCreate;
