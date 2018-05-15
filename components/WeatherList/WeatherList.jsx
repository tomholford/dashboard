import React from 'react';
import Units from '../../utils/Units';
import WeatherCurrent from '../WeatherCurrent/WeatherCurrent';
import WeatherForecast from '../WeatherForecast/WeatherForecast';
import WeatherService from '../../services/WeatherService';
import './WeatherList.sass'

const WEATHER_API_KEY = '16793c2cd11658bc4be9dc7d5fa5c848';

class WeatherList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      cities: []
    };
  }

  getCurrent = (city) => {
    let units = Units.toSystem(city.unit);
    WeatherService.getCurrent(city.id, units).then((data) => {
      let city = Object.assign(data, {unit: units});
      this.setState({ cities: [...this.state.cities, city]});
      if(this.isLoaded()){
        this.setState({ loaded: true });
      }
    })
  }

  isLoaded() {
    return this.state.cities.length === this.props.cities.length;
  }

  componentDidMount() {
    let cities = this.props.cities;
    cities.forEach((city) => {
      this.getCurrent(city);
    })
  }

  render() {
    const isLoaded = this.state.loaded;

    let output = [];
    if (isLoaded) {
      output = this.state.cities.map(function(city, index) {
        const iconUrl = `http://openweathermap.org/img/w/${city['weather'][0].icon}.png`;
        let unitDivider = city.unit === 'imperial' ? 'F' : 'C';

        return(
          <div className="widget-piece-container" key={index}>
            <WeatherCurrent current={city} />
            <WeatherForecast cityId={city.id} unit={city.unit} />
          </div>
        );
      })
    } else {
      output = <p>Loading...</p>;
    }

    return (<div className="widget-section-container">
      {output}
    </div>);
  }
}

export default WeatherList;
