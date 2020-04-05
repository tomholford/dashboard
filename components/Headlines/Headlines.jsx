import React from 'react';
import { action, computed, observable } from 'mobx';
import { observer } from 'mobx-react';
import LoggerService from '../../services/LoggerService';
import './Headlines.sass';

@observer
class Headlines extends React.Component {
  @observable currentIndex = 0;

  @action
  previous = () => {
    LoggerService.debug(`CurrentIndex: ${this.currentIndex}`);
    LoggerService.debug(`HeadlinesCount: ${this.headlinesCount}`);


    if(this.currentIndex === 0) {
      this.currentIndex = this.headlinesCount - 1;
    } else {
      this.currentIndex -= 1;
    }
  }
  
  @action
  next = () => {
    LoggerService.debug(`CurrentIndex: ${this.currentIndex}`);
    LoggerService.debug(`HeadlinesCount: ${this.headlinesCount}`);

    if(this.currentIndex + 1 === this.headlinesCount) {
      this.currentIndex = 0;
    } else {
      this.currentIndex += 1;
    }
  }

  @computed
  get headlinesCount() {
    const location = this.props.location;
    const headlines = location.headlines;
    if(headlines) {
      return headlines.items.length;
    } else {
      return 0;
    }
  }

  @computed
  get currentHeadline() {
    const location = this.props.location;
    const headlines = location.headlines;
    if(headlines) {
      return headlines.items[this.currentIndex];
    } else {
      return headlines.items[0];
    }
  }

  render() {
    const location = this.props.location;
    const headlines = location.headlines;

    if (!headlines) {
      return (<div>Loading...</div>);
    } else {
      const headline = this.currentHeadline;

      return (
        <div className="widget-box col-md-3 col-sm-6 col-xs-12">
          <div className="widget-outer-container">
            <div className="contents-container">
              <div className="top-tab-container">
                <h2>Headlines</h2>
              </div>
              <div className="headlines-container">
                <div className="headline">
                  <a href={headline.url}
                     rel="noopener nofollow">
                    <h4>
                      {headline.title}
                    </h4>
                  </a>
                </div>
                <div className="headlines-empty-container"></div>
                <div className="headlines-buttons-containers">
                  <button className="widget-button" onClick={() => this.previous()}>&larr;</button>
                  <button className="widget-button" onClick={() => this.next()}>&rarr;</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Headlines;
