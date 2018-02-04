import React from 'react';
import './Clock.sass';

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
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

  render() {
    return (
      <div className="clock-container">
        <h4>{this.state.date.toLocaleTimeString(this.props.locale, { timeZone: this.props.timezone })}</h4>
      </div>
    );
  }
}

export default Clock;
