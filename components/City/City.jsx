import React from 'react';
import Weather from '../Weather/Weather';
import Clock from '../Clock/Clock';
import './City.sass';

class City extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="city-container">
        <div>
          <Weather cityId={this.props.city.id} unit={this.props.city.unit}/>
        </div>
        <div>
          <Clock locale={this.props.city.locale} timezone={this.props.city.timezone}/>
        </div>
      </div>
    );
  }
}

export default City;
