import React from 'react';
import Units from '../../utils/Units';

import './WeatherCurrent.sass'

class WeatherCurrent extends React.Component {
  constructor(props) {
    super(props);
  }

  iconUrl() {
    const current = this.props.location.current;

    return `http://openweathermap.org/img/w/${current.weather[0].icon}.png`;
  }

  capitalizeWords(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  render() {
    const location = this.props.location;
    const current = location.current;

    if(!current) {
      return (<div>Loading...</div>);
    } else {
      let cityName = current.name;
      let unitDivider = location.unit;
      let description = current.weather[0].description;
      let currentTemperature = Math.round(current.main.temp);

      return (
        <div className="weather-container">
          <div className="content-container">
            <div className="top-tab-container">
              <h2>Weather</h2>
            </div>
            <div className="conditions-container">
              <div>{this.capitalizeWords(description)}</div>
              <img src={this.iconUrl()} alt=""/>
            </div>
            <h3 className="current-temp">{currentTemperature}&#176;{unitDivider}</h3>
          </div>
        </div>
      );
    }
  }
}

export default WeatherCurrent;
