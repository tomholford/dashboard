import React, { Component } from 'react';
import City from './components/City/City';

const cities = [
  {
    "id": 1850144,
    "unit": "C",
    "locale": "ja-JP",
    "timezone": "Asia/Tokyo"
  },
  {
    "id": 5391959,
    "unit": "F",
    "locale": "en-US",
    "timezone": "America/Los_Angeles"
  }
];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cities: []
    };
  }

  componentDidMount() {
    this.setState({ cities });
  }

  render() {
    return (
      this.state.cities.map(function(city, index){
        return <City key={index} city={city} />;
      })
    );
  }
}

export default App;
