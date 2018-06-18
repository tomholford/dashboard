import React from 'react'
import './WeatherForecastChart.sass'
import '../../node_modules/react-comps-svg-charts/dist/svg-charts-styles.css'

import { LineChart } from 'react-comps-svg-charts';


const buildDatasets = (forecastList) => {
    return [
      {
        name: 'H',
        values: mapDataset(forecastList, 'temp_max')
      },
      {
        name: 'L',
        values: mapDataset(forecastList, 'temp_min')
      }
    ];
  }

const mapDataset = (dataset, key) => {
    return dataset.map((forecast) => {
      return forecast['main'][key];
    })
  }

const labelDataset = (dataset) => {
  return dataset.map((forecast) => {
    return new Date(forecast['dt'] * 1000).getUTCHours().toString();
  })
}

class WeatherForecastChart extends React.Component {
  constructor(props) {
    super(props);

    // console.log(this.props);

    this.state = {
      datasets: buildDatasets(this.props.forecast.list),
      labels: labelDataset(this.props.forecast.list)
    };

    console.log(this.state);
  }

  render() {
    return (
      <div className="chart-container">
        <LineChart
          title="forecast"
          data={{
            labels: this.state.labels,
            datasets: this.state.datasets
          }}
          show_dots={false}
          heatline
          height={150}
        />
      </div>
    )
  }
}

export default WeatherForecastChart
