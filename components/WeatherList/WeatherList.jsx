import React from 'react';
import { observer } from 'mobx-react';
import Units from '../../utils/Units';
import WeatherView from '../WeatherView/WeatherView';
import './WeatherList.sass'

@observer
class WeatherList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const locations = this.props.locations;

    return(
      <div className="widget-section-container">
        {
          locations.map((location, index) => {
            return (
              <WeatherView location={location} key={index} />
            );
          })
        }
      </div>
    );
  }
}

export default WeatherList;
