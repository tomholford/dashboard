import React from 'react';
import WeatherService from '../../services/WeatherService';
import Units from '../../utils/Units';

import './WeatherCurrent.sass'

class WeatherCurrent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current: null
    }
  }

  componentDidMount() {
    this.getCurrentData();
  }

  iconUrl() {
    const current = this.state.current;

    return `http://openweathermap.org/img/w/${current.weather[0].icon}.png`;
  }

  getCurrentData = () => {
    const location = this.props.location;
    let units = Units.toSystem(location.unit);

    WeatherService.getCurrent(location.id, units).then((data) => {
      this.setState({ current: data });
    })
  }

  render() {
    const location = this.props.location;
    const current = this.state.current;

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
