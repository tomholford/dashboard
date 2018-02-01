import React from 'react';

class Weather extends React.Component {
  render() {
    return (
      <div>
        <h2>{this.props.name}</h2>
        <h3>current</h3>
        <p>{this.props.currentTemp} {this.props.unit}</p>
        <h3>low</h3>
        <p>{this.props.forecastLow} {this.props.unit}</p>
        <h3>high</h3>
        <p>{this.props.forecastHigh} {this.props.unit}</p>
      </div>
    );
  }
}

export default Weather;
