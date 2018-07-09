import React from 'react';
import { inject, observer } from 'mobx-react';
import Clock from '../Clock/Clock';
import './ClockList.sass';

@inject('store')
@observer
class ClockList extends React.Component {
  render() {
    const locations = this.props.store.locations;

    return (
      <div className="clocklist-container">
        {
          locations.map((location, _index) => {
            return (
              <Clock key={location.id} location={location}/>
            );
          })
        }
      </div>
    );
  }
}

export default ClockList;
