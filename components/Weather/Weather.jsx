import React from 'react';

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
    const isLoaded = this.state.loaded;

    let output = null;
    if (isLoaded) {
      output = <div>
        <h2>{this.state.weather.name}</h2>
        <h3>current</h3>
        <p>{this.state.weather.main.temp} {this.props.unit}</p>
        <h3>low</h3>
        <p>{this.state.weather.main.temp_min} {this.props.unit}</p>
        <h3>high</h3>
        <p>{this.state.weather.main.temp_max} {this.props.unit}</p>
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
