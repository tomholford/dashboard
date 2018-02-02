import React, { Component } from 'react';
import Weather from './components/Weather/Weather';

const cities = [
  {
    "id": 5391959,
    "unit": "F"
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
        return <Weather key={index} cityId={city.id} unit={city.unit} />
      })
    );
  }
}

export default App;
