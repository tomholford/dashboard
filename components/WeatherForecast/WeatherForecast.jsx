import React from 'react';
import WeatherService from '../../services/WeatherService';
import './WeatherForecast.sass'

class WeatherForecast extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cityId: this.props.cityId,
      unit: this.props.unit,
      forecast: {}
    };
  }

  getForecastData = () => {
    WeatherService.getForecast(this.state.cityId, this.state.unit)
      .then(data => {
        this.setState({
          forecast: data
        });
    })
  }

  isLoaded = () => {
    // yeah this is a hack :)
    // JSON.stringify(this.state.forecast) === JSON.stringify({})
    return this.state.forecast.hasOwnProperty('city');
  }

  componentDidMount() {
    this.getForecastData();
  }

  render() {
    if(!this.isLoaded()) {
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
    }

    const forecast = this.state.forecast;
    let unitDivider = this.state.unit === 'imperial' ? 'F' : 'C';
    let forecastLow = Math.round(forecast.list[0].main.temp_min);
    let forecastHigh = Math.round(forecast.list[0].main.temp_max);

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
      </div>
    );
  }
}

export default WeatherForecast;
