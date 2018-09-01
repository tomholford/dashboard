import React from 'react';
import { inject, observer } from 'mobx-react';
import Location from '../Location/Location';
import './Locations.sass'

@inject('store')
@observer
class Locations extends React.Component {
  render() {
    const locations = this.props.store.locations;

    return(
      <div className="locations-container">
        {
          locations.map((location, _index) => {
            return (
              <Location location={location} key={location.id} />
            );
          })
        }
      </div>
    );
  }
}

export default Locations;
