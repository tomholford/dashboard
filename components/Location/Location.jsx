import React from 'react';
import { observer } from 'mobx-react';
import WeatherView from '../WeatherView/WeatherView';
import WeatherForecast from '../WeatherForecast/WeatherForecast';
import Clock from '../Clock/Clock';
import './Location.sass'

@observer
class Location extends React.Component {
  constructor(props) {
    super(props);
  }

  removeLocation = () => {
    const location = this.props.location;

    this.store.removeLocation(location);
  }

  render() {
    const location = this.props.location;

    return(
      <div>
        <h1>{location.name}</h1>
        <div className="location-container">
          <WeatherView location={location} />
          <Clock location={location}/>
          <div className="weather-forecast-container widget-box">
            <WeatherForecast location={location} />
          </div>
        </div>
      </div>
    );
  }
}

export default Location;
