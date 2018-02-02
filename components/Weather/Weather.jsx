import React from 'react';

const WEATHER_API_KEY = '16793c2cd11658bc4be9dc7d5fa5c848';

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weather: {}
    };
  }

  componentDidMount() {
      var options = {
        method: 'GET',
        cache: 'no-cache'
      };

      var request = new Request(`https://api.openweathermap.org/data/2.5/weather?id=${this.props.cityId}&units=imperial&appid=${WEATHER_API_KEY}`);

      fetch(request, options).then(handleWeatherSuccess, handleWeatherError);
  }

  render() {
    return (
      <div>
        <h2>{this.state.weather.name}</h2>
        <h3>current</h3>
        <p>{this.state.weather.main.temp} {this.props.unit}</p>
        <h3>low</h3>
        <p>{this.state.weather.main.temp_min} {this.props.unit}</p>
        <h3>high</h3>
        <p>{this.state.weather.main.temp_max} {this.props.unit}</p>
      </div>
    );
  }

  handleWeatherSuccess(response) {
    response.json().then(function(data) {
      this.setState({ data })
      console.log(data);
    })
  }

  handleWeatherError(response) {
    console.log(response);
  }
}

export default Weather;
