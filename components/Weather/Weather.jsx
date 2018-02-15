import React from 'react';
import './Weather.sass'

const WEATHER_API_KEY = '16793c2cd11658bc4be9dc7d5fa5c848';

class WeatherList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      cities: []
    };
  }

  getCityData(city) {
    let units = city.unit === 'F' ? 'imperial' : 'metric';
    let options = {
      method: 'GET',
      cache: 'no-cache'
    };
    let request = new Request(`https://api.openweathermap.org/data/2.5/weather?id=${city.id}&units=${units}&appid=${WEATHER_API_KEY}`);

    fetch(request, options).then((response) => {
      response.json().then((data) => {
        let city = Object.assign(data, {unit: units});
        this.setState({ cities: [...this.state.cities, city]});
        if(this.isLoaded()){
          this.setState({ loaded: true });
        }
      })
    }, (response) => {
      console.log(response);
    });
  }

  isLoaded() {
    return this.state.cities.length === this.props.cities.length;
  }

  componentDidMount() {
    let cities = this.props.cities;
    cities.forEach((city) => {
      this.getCityData(city);
    })
  }

  render() {
    // https://openweathermap.org/current#current_JSON
    const isLoaded = this.state.loaded;

    let output = [];
    if (isLoaded) {
      output = this.state.cities.map(function(city, index) {
        const iconUrl = `http://openweathermap.org/img/w/${city.weather[0].icon}.png`;
        let unitDivider = city.unit === 'imperial' ? 'F' : 'C';

        return(
          <div className="widget-piece-container" key={index}>
            <div className="top-tab-container">
              <h2 className="city-name">{city.name}</h2>
              <div className="conditions-container">
                <img src={iconUrl} alt=""/>
                <div>{city.weather[0].description}</div>
              </div>
            </div>
            <h3 className="current-temp">{Math.round(city.main.temp)} {unitDivider}</h3>
            <div className="forecast-container">
              <div className="forecast">
                <p>{Math.round(city.main.temp_min)} {unitDivider}</p>
              </div>
              <div className="forecast">
                <p>{Math.round(city.main.temp_max)} {unitDivider}</p>
              </div>
            </div>
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
