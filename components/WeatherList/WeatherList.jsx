import React from 'react';
import { inject, observer } from 'mobx-react';
import Units from '../../utils/Units';
import WeatherView from '../WeatherView/WeatherView';
import WeatherCreate from '../WeatherCreate/WeatherCreate';
import './WeatherList.sass'

@inject('store')
@observer
class WeatherList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const locations = this.props.store.locations;

    return(
      <div className="widget-section-container">
        {
          locations.map((location, _index) => {
            return (
              <WeatherView location={location} key={location.id} />
            );
          })
        }
        <WeatherCreate />
      </div>
    );
  }
}

export default WeatherList;
