import React from 'react';

const Weather = () => {
  return (
    <div>
      <h1>Weather</h1>
      <h2>{this.props.city}</h2>
      <h3>current</h3>
      <p>{this.props.currentTemp}</p>
      <h3>forecast low</h3>
      <p>{this.props.forecastLow}</p>
      <h3>forecase high</h3>
      <p>{this.props.forecastHigh}</p>
    </div>
  );
};

export default Weather;
