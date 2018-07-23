import React from 'react';
import { observer } from 'mobx-react';
import WeatherView from '../WeatherView/WeatherView';
import Clock from '../Clock/Clock';
import './Location.sass'

@observer
class Location extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const location = this.props.location;

    return(
      <div className="location-container">
        <WeatherView location={location} />
        <Clock location={location}/>
      </div>
    );
  }
}

export default Location;
