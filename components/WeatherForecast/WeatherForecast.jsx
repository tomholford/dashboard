import React from 'react';
import Units from '../../utils/Units';
import './WeatherForecast.sass';

import WeatherForecastChart from '../WeatherForecastChart/WeatherForecastChart';

class WeatherForecast extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    const location = this.props.location;
    const forecast = location.forecast;

    if(!forecast) {
      return (
        <div>
          <div className="forecast-container">
            <div className="forecast">
              <p></p>
            </div>
            <div className="forecast">
              <p></p>
            </div>
          </div>
        </div>
      );
    } else {
      const unitDivider = location.unit;
      const forecastLow = Math.round(forecast.list[0].main.temp_min);
      const forecastHigh = Math.round(forecast.list[0].main.temp_max);

      return (
        <div>
          <div className="forecast-container">
            <div className="forecast">
              <p>{forecastLow} {unitDivider}</p>
            </div>
            <div className="forecast">
              <p>{forecastHigh} {unitDivider}</p>
            </div>
          </div>
          <WeatherForecastChart forecast={forecast} />
        </div>
      );
    }
  }
}

export default WeatherForecast;
