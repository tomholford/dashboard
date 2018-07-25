import React from 'react';
import { inject, observer } from 'mobx-react';
import './Debug.sass';

@inject('store')
@observer
class Debug extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
  }

  toggleDebugCss = () => {
    this.store.toggleDebugCss();
  }

  render() {
    return (
      <div className="debug-container">
        <button className="widget-button" onClick={() => this.toggleDebugCss()}>debug</button>
      </div>
    );
  }
}

export default Debug;
