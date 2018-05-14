import React from 'react';
import './WeatherCurrent.sass'

class WeatherCurrent extends React.Component {
  constructor(props) {
    super(props);

    this.state = { current: this.props.current };
  }

  iconUrl() {
    return `http://openweathermap.org/img/w/${this.currentWeather().weather[0].icon}.png`;
  }

  currentWeather = () => {
    return this.state.current;
  }

  render() {
    const current = this.currentWeather();

    let cityName = current.name;
    let unitDivider = current.unit === 'imperial' ? 'F' : 'C';
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

export default WeatherCurrent;
