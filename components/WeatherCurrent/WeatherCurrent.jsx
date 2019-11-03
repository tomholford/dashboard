import React from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';

import './WeatherCurrent.sass'

@observer
class WeatherCurrent extends React.Component {
  iconUrl() {
    return `http://openweathermap.org/img/w/${this.current.weather[0].icon}.png`;
  }

  capitalizeWords(str) {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  @computed
  get current() {
    return this.props.location.current;
  }

  render() {
    const current = this.current;

    if (!current) {
      return (<div>Loading...</div>);
    } else {
      let unitDivider = location.unit;
      let description = current.weather[0].description;
      let currentTemperature = Math.round(current.main.temp);

      return (
      <div className="weather-container widget-box col-md-3 col-sm-6 col-xs-12">
        <h3 className="current-temp">{currentTemperature}&#176;{unitDivider}</h3>
        <div className="widget-outer-container">
          <div className="contents-container">
            <div className="top-tab-container">
              <h2>Weather</h2>
            </div>
            <div className="conditions-container">
              <div>{this.capitalizeWords(description)}</div>
              <img src={this.iconUrl()} alt=""/>
            </div>
          </div>
        </div>
      </div>
      );
    }
  }
}

export default WeatherCurrent;
