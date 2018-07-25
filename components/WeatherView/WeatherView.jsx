import React from 'react';
import { inject, observer } from 'mobx-react';
import DashboardStore from '../../stores/DashboardStore';
import WeatherCurrent from '../WeatherCurrent/WeatherCurrent';
import './WeatherView.sass'

@observer
class WeatherView extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const location = this.props.location;

    return(
      <div className="weather-container widget-box">
        <WeatherCurrent location={location} />
      </div>
    );
  }
}

export default WeatherView;
