import React from 'react';
import Units from '../../utils/Units';
import WeatherService from '../../services/WeatherService';
import './WeatherForecast.sass';

import WeatherForecastChart from '../WeatherForecastChart/WeatherForecastChart';

class WeatherForecast extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      forecast: null
    };
  }

  getForecastData = () => {
    const location = this.props.location;
    const units = Units.toSystem(location.unit);

    WeatherService.getForecast(location.id, units)
      .then(data => {
        this.setState({
          forecast: data
        });
    })
  }

  componentDidMount() {
    this.getForecastData();
  }

  render() {
    const forecast = this.state.forecast;

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
      const location = this.props.location;
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
