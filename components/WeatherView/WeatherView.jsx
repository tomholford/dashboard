import React from 'react';
import WeatherCurrent from '../WeatherCurrent/WeatherCurrent';
import WeatherForecast from '../WeatherForecast/WeatherForecast';
import './WeatherView.sass'

class WeatherView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const location = this.props.location;

    return(
      <div className="widget-piece-container">
        <WeatherCurrent location={location} />
        <WeatherForecast location={location} />
      </div>
    );
  }
}

export default WeatherView;
