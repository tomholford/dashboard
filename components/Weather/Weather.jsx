import React from 'react';
import './Weather.sass'

const WEATHER_API_KEY = '16793c2cd11658bc4be9dc7d5fa5c848';

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      weather: {}
    };
  }

  componentDidMount() {
    let options = {
      method: 'GET',
      cache: 'no-cache'
    };

    let units = this.props.unit === 'F' ? 'imperial' : 'metric';

    let request = new Request(`https://api.openweathermap.org/data/2.5/weather?id=${this.props.cityId}&units=${units}&appid=${WEATHER_API_KEY}`);

    fetch(request, options).then((response) => {
      response.json().then((data) => {
        this.setState({weather: data, loaded: true})
      })
    }, (response) => {
      console.log(response);
    });
  }

  render() {
    // https://openweathermap.org/current#current_JSON
    const isLoaded = this.state.loaded;

    let output = null;
    if (isLoaded) {
      const weather = this.state.weather;
      const iconUrl = `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`;

      output =
        <div>
          <h1 className="current-temp">{weather.main.temp} {this.props.unit}</h1>
          <h2 className="city-name">{weather.name}</h2>
          <div className="current-conditions-container">
            <img src={iconUrl} alt=""/>
            <div>{weather.weather[0].description}</div>
          </div>
          <div className="forecast-container">
            <div className="forecast">
              <h4>Low</h4>
              <p>{weather.main.temp_min} {this.props.unit}</p>
            </div>
            <div className="forecast">
              <h4>High</h4>
              <p>{weather.main.temp_max} {this.props.unit}</p>
            </div>
          </div>
        </div>
    } else {
      output = <p>Loading...</p>;
    }

    return (<div>
      {output}
    </div>);
  }
}

export default Weather;
