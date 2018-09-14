import React from 'react';
import ReactModal from 'react-modal';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as Environment from '../../utils/Environment';
import './Settings.sass';

@inject('store')
@observer
class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    ReactModal.setAppElement('#root');
  }

  toggleSettingsMenu = () => {
    this.store.toggleSetting('settingsMenuVisible');
  }


  reset = () => {
    localStorage.clear();
    location.reload();
  }

  @computed
  get settingsMenuVisible() {
    return this.store.settingsMenuVisible;
  }

  @computed
  get settings() {
    return this.store.settings;
  }

  @computed
  get modalStyle() {
    return {
      overlay: {
        background: 'rgba(0, 0, 0, 0.3)'
      },
      content: {
        border: '1px solid rgb(204, 204, 204, 0.5)',
        background: 'rgba(255,255,255,1.0)',
        position: 'absolute',
        top: '20%',
        bottom: '20%',
        left: '20%',
        right: '20%',
        overflow: 'auto',
        borderRadius: '4px',
        outline: 'none',
        padding: '30px'
      }
    };
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <button className="widget-button" onClick={() => this.toggleSettingsMenu()}>settings</button>
        </div>
        <ReactModal
          onRequestClose={() => this.toggleSettingsMenu()}
          isOpen={this.settingsMenuVisible}
          style={this.modalStyle}>
          <div className="modal-content-container">
            <div className="modal-button-container">
              <button className="widget-button" onClick={() => this.reset()}>reset</button>
              <button className="widget-button" onClick={() => this.toggleSettingsMenu()}>close</button>
            </div>
            <div className="settings-list">
              {Object.keys(this.settings).map((k) => {
                return <div className="setting-item" key={k}>
                  <span>{k}: {this.settings[k].toString()}</span>
                </div>;
              })}
            </div>
            <div className="app-info">
              <div><span>revision</span> {Environment.REVISION}</div>
              <div><span>updated</span> {new Date(Environment.BUILT_AT * 1000).toLocaleString()}</div>
            </div>
          </div>
        </ReactModal>
      </React.Fragment>
    );
  }
}

export default Settings;
