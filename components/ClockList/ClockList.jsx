import React from 'react';
import Clock from '../Clock/Clock';
import './ClockList.sass';

class ClockList extends React.Component {
  render() {
    let output = [];

    output = this.props.cities.map((city, index) => {
      return (
        <Clock key={index} city={city}/>
      );
    })

    return (
      <div className="clocklist-container">
        {output}
      </div>
    );
  }
}

export default ClockList;
