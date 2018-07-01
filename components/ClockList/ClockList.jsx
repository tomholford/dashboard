import React from 'react';
import { observer } from 'mobx-react';
import Clock from '../Clock/Clock';
import './ClockList.sass';

@observer
class ClockList extends React.Component {
  render() {
    const locations = this.props.locations;

    return (
      <div className="clocklist-container">
        {
          locations.map((location, index) => {
            return (
              <Clock key={index} location={location}/>
            );
          })
        }
      </div>
    );
  }
}

export default ClockList;
