import React from 'react';
import { inject } from 'mobx-react';
import LocationStore from '../../stores/LocationStore';
import WeatherCurrent from '../WeatherCurrent/WeatherCurrent';
import WeatherForecast from '../WeatherForecast/WeatherForecast';
import './WeatherView.sass'

@inject('store')
class WeatherView extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
  }

  removeLocation = () => {
    const location = this.props.location;

    this.store.removeLocation(location);
  }

  render() {
    const location = this.props.location;

    return(
      <div className="widget-piece-container">
        <button onClick={() => this.removeLocation()}>X</button>
        <WeatherCurrent location={location} />
        <WeatherForecast location={location} />
      </div>
    );
  }
}

export default WeatherView;
