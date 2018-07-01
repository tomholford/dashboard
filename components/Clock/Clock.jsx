import React from 'react';
import './Clock.sass';

class ClockList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      60000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  formattedDate() {
    return this.state.date.toLocaleTimeString(
      this.props.location.locale,
      { timeZone: this.props.location.timezone });
  }

  render() {
    return (
      <div className="clock-container">
        <h4>{this.formattedDate()}</h4>
      </div>
    );
  }
}

export default ClockList;
