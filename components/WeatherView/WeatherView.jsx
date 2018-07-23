import React from 'react';
import { inject, observer } from 'mobx-react';
import LocationStore from '../../stores/LocationStore';
import WeatherCurrent from '../WeatherCurrent/WeatherCurrent';
import WeatherForecast from '../WeatherForecast/WeatherForecast';
import WeatherForecastChart from '../WeatherForecastChart/WeatherForecastChart';
import './WeatherView.sass'

@inject('store')
@observer
class WeatherView extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
  }

  removeLocation = () => {
    const location = this.props.location;

    this.store.removeLocation(location);
  }

  toggleForecastChart = () => {
    const location = this.props.location;

    this.store.toggleForecastChart(location);
  }

  render() {
    const location = this.props.location;

    return(
      <div className="weather-view-container">
        <button onClick={() => this.removeLocation()}>X</button>
        <WeatherCurrent location={location} />
        <WeatherForecast location={location} />
        <button onClick={() => this.toggleForecastChart()}>more</button>
        <WeatherForecastChart location={location} />
      </div>
    );
  }
}

export default WeatherView;
