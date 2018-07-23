import React from 'react'
import { observer } from 'mobx-react';
import './WeatherForecastChart.sass'
import '../../node_modules/react-comps-svg-charts/dist/svg-charts-styles.css'

import { LineChart } from 'react-comps-svg-charts';

const RANGE_OPTIONS = [8, 16, 24];
const FORECAST_RANGE = 16;
const CHART_HEIGHT = 150;
const COLORS = ['#7cd6fd', '#743ee2'];

const buildDatasets = (forecastList, range) => {
    return [
      {
        name: 'High',
        values: truncate(mapValueFromDataset(forecastList, 'temp_max'), range)
      },
      {
        name: 'Low',
        values: truncate(mapValueFromDataset(forecastList, 'temp_min'), range)
      }
    ];
  }

const mapValueFromDataset = (dataset, key) => {
    return dataset.map((forecast) => {
      return forecast['main'][key];
    })
  }

const labelDataset = (dataset, range) => {
  return truncate(dataset.map((forecast, index) => {
    let forecastDate = new Date(forecast['dt'] * 1000);
    let forecastHour = forecastDate.getHours();

    if ((index % 3) < 1) {
      return forecastHour.toString()
    } else {
      return '';
    };
  }), range);
}

const truncate = (list, length) => { return list.slice(0, length) };

@observer
class WeatherForecastChart extends React.Component {
  constructor(props) {
    super(props);

    const forecast = this.props.location.forecast;

    this.state = {
      datasets: buildDatasets(forecast.list, FORECAST_RANGE),
      labels: labelDataset(forecast.list, FORECAST_RANGE)
    };
  }

  updateDatasets = (range) => {
    const forecast = this.props.location.forecast;

    this.setState({
      datasets: buildDatasets(forecast.list, range),
      labels: labelDataset(forecast.list, range),
    });
  }

  render() {
    const location = this.props.location;

    if(location.showForecastChart) {
      return (
        <div className="weather-forecast-chart-container">
          <LineChart
            data={{
              labels: this.state.labels,
              datasets: this.state.datasets
            }}
            show_dots={false}
            heatline
            height={CHART_HEIGHT}
            colors={COLORS}
            title=''
          />
          <span>days: </span>
          <hr/>
          <div className="chart-button-container">
            {RANGE_OPTIONS.map((r) => {
              return <button key={r} onClick={() => this.updateDatasets(r)}>{r / 8}</button>
            })}
          </div>
        </div>
      );
    } else {
      return ('');
    }
  }
}

export default WeatherForecastChart
