import React from 'react';
import { observer } from 'mobx-react';
import WeatherView from '../WeatherView/WeatherView';
import WeatherForecast from '../WeatherForecast/WeatherForecast';
import Clock from '../Clock/Clock';
import Headlines from '../Headlines/Headlines';
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
          <WeatherForecast location={location} />
          <Headlines location={location} />
        </div>
      </div>
    );
  }
}

export default Location;
