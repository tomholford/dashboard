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
        <div>
          <div className="top-tab-container">
            <h2 className="city-name">{cityName}</h2>
            <div className="conditions-container">
              <img src={this.iconUrl()} alt=""/>
              <div>{description}</div>
            </div>
          </div>
          <h3 className="current-temp">{currentTemperature} {unitDivider}</h3>
        </div>
      );
    }
  }
}

export default WeatherCurrent;
