import React from 'react';
import Units from '../../utils/Units';

import './NewWeatherCurrent.sass'

const LOCATION = {
  "id": 1850144,
  "unit": "C",
  "locale": "ja-JP",
  "timezone": "Asia/Tokyo",
  "name": "Tokyo",
};

const CURRENT = {
  "coord": {
    "lon": 139.69,
    "lat": 35.69
  },
  "weather": [{
    "id": 701,
    "main": "Mist",
    "description": "mist",
    "icon": "50n"
  }],
  "base": "stations",
  "main": {
    "temp": 15.52,
    "pressure": 1018,
    "humidity": 93,
    "temp_min": 15,
    "temp_max": 16
  },
  "visibility": 6000,
  "wind": {
    "speed": 7.7,
    "deg": 70
  },
  "clouds": {
    "all": 75
  },
  "dt": 1524423600,
  "sys": {
    "type": 1,
    "id": 7619,
    "message": 0.0026,
    "country": "JP",
    "sunrise": 1524340761,
    "sunset": 1524388833
  },
  "id": 1850144,
  "name": "Tōkyō-to",
  "cod": 200
};

class NewWeatherCurrent extends React.Component {
  constructor(props) {
    super(props);

  }

  iconUrl() {
    const current = CURRENT;

    return `http://openweathermap.org/img/w/${current.weather[0].icon}.png`;
  }

  render() {
    const location = LOCATION;
    const current = CURRENT;

    if(!current) {
      return (<div>Loading...</div>);
    } else {
      let cityName = current.name;
      let unitDivider = location.unit;
      let description = current.weather[0].description;
      let currentTemperature = Math.round(current.main.temp);

      return (
        <div>
          <div className="top-tab-container">
            <h2 className="city-name">{cityName}</h2>
            <div className="conditions-container">
              <img src={this.iconUrl()} alt=""/>
              <div>{description}</div>
            </div>
          </div>
          <h3 className="current-temp">{currentTemperature} {unitDivider}</h3>
        </div>
      );
    }
  }
}

export default NewWeatherCurrent;
