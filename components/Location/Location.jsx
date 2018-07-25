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
      <div className="location-container">
        <WeatherView location={location} />
        <Clock location={location}/>
        <WeatherForecast location={location} />
        <div className="location-button-container">
          <button className="widget-button" onClick={() => this.removeLocation()}>X</button>
        </div>
      </div>
    );
  }
}

export default Location;
