import React from 'react';
import { inject, observer } from 'mobx-react';
import WeatherForecastChart from '../WeatherForecastChart/WeatherForecastChart';
import './WeatherForecast.sass';

@inject('store')
@observer
class WeatherForecast extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
  }

  toggleForecastChart = () => {
    const location = this.props.location;

    this.store.toggleForecastChart(location);
  }

  render() {
    const location = this.props.location;
    const forecast = location.forecast;

    if(!forecast) {
      return (
        <p>loading forecast...</p>
      );
    } else {
      const unitDivider = location.unit;
      const forecastLow = Math.round(forecast.list[0].main.temp_min);
      const forecastHigh = Math.round(forecast.list[0].main.temp_max);

      return (
        <div className="weather-forecast-container widget-box col-md-3 col-sm-6 col-xs-12">
          <div className="widget-outer-container">
            <div className="contents-container">
              <div className="top-tab-container">
                <h2>FORECAST</h2>
              </div>
              <div className="forecast-container">
                <div className="forecast">
                  <p>{forecastLow} {unitDivider}</p>
                </div>
                <div className="forecast">
                  <p>{forecastHigh} {unitDivider}</p>
                </div>
              </div>
              <div className="weather-forecast-button-container">
                <button className="widget-button" onClick={() => this.toggleForecastChart()}>more</button>
              </div>
              <WeatherForecastChart location={location} />
              <div className="location-button-container">
                <button className="widget-button" onClick={() => this.removeLocation()}>X</button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default WeatherForecast;
