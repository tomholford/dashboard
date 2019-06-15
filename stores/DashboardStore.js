import { action, computed, observable } from 'mobx';
import * as Environment from '../utils/Environment';
import AutoStorage from '../utils/AutoStorage';
import Location from '../models/Location';
import LoggerService from '../services/LoggerService';
import { defaults } from '../data/defaults.json';

const TTL = 60 * 60 * 1000; /* 60 minutes, in ms */
const DEFAULT_STORE = defaults;

class DashboardStore {
	@observable locations = [];
	@observable settings = {};

	static initialize = function(weatherApi, rssApi) {
    const store = new this(weatherApi, rssApi);
    AutoStorage(store, 'dashboardStore', DEFAULT_STORE);

    store.loadData();
    return store;
	}

  constructor(weatherApi, rssApi) {
    this.weatherApi = weatherApi;
    this.rssApi = rssApi;
    this.settings = { showDebugCss: false };
  }

  @action
	addLocation = (location) => {
    const newLocation = new Location(location);
		this.locations.push(newLocation);
	}

  @action
  addResponse = (location, key, data) => {
    LoggerService.info(`Adding response for ${location.name}:${key}`);
    LoggerService.debug(`Response for ${location.name}:${key}: ${data.toString()}`);

    const index = this.locations.indexOf(location);
    let found = this.locations[index];

    // if response doesn't have timestamp, add it ourselves :)
    if(!('dt' in data)) {
      data['dt'] = Math.round((new Date).getTime() / 1000);
    }

    found[key] = data;
  }

  @action
  loadData = () => {
    LoggerService.info('Loading data...');
    this.locations.forEach((location) => {
      // current
      if(this.shouldUseCached(location, 'current')) {
        LoggerService.info(`Using Current Weather cache for ${location.name}`);
      } else {
        LoggerService.info(`Current Weather not cached for ${location.name}, querying API...`);

        this.weatherApi.getCurrent(location).then((data) => {
          this.addResponse(location, 'current', data);
        })
      }

      // forecast
      if(this.shouldUseCached(location, 'forecast')) {
        LoggerService.info(`Using Weather Forecast cache for ${location.name}`);
      } else {
        LoggerService.info(`Weather Forecast not cached for ${location.name}, querying API...`);

        this.weatherApi.getForecast(location).then((data) => {
          this.addResponse(location, 'forecast', data);
        })
      }

      // headlines
      if(this.shouldUseCached(location, 'headlines')) {
        LoggerService.info(`Using Headlines cache for ${location.name}`);
      } else {
        LoggerService.info(`Headlines not cached for ${location.name}, querying API...`);

        this.rssApi.getFeed(location.headlinesUrl, (err, data) => {
          if(!err) {
            this.addResponse(location, 'headlines', data);
          } else {
            LoggerService.error(err);
          }
        });
      }
    })
  }

  @action
  toggleSetting = (settingKey) => {
    this.settings[settingKey] = !this.settings[settingKey];
  }

	@action
	updateSetting = (key, value) => {
		this.settings[key] = value;
	}

  @computed
  get settingsMenuVisible() {
    return this.settings['settingsMenuVisible'];
  }

  shouldUseCached = (location, key) => {
    LoggerService.debug(`Should Use Cached? ${location.name}:${key}`);
    LoggerService.debug(`Key in location? (for ${location.name}:${key})  ${key in location}`);
    LoggerService.debug(`Location keys (for ${location.name}:${key})  ${Object.keys(location).toString()}`);

    if(key in location && location[key]){
      return !this.isLocationDataStale(location, key);
    }else{
      return false;
    }
  }

  isLocationDataStale = (location, key, ttl = TTL) => {
    let lastUpdated;
    if('dt' in location[key]) {
      lastUpdated = new Date(location[key]['dt'] * 1000);
    } else {
      return true;
    }
    const currentDate = new Date;
    const delta = Math.abs(currentDate - lastUpdated);
    if(Environment.DEVELOPMENT) {
      LoggerService.debug(`current date: ${currentDate.toLocaleString()}`);
      LoggerService.debug(`${key} last updated: ${lastUpdated.toLocaleString()}`);
      LoggerService.debug(`delta: ${delta} ms`);
      LoggerService.debug(`ttl: ${ttl} ms`);
      LoggerService.debug(`shouldUpdate: ${delta > ttl}`);
    }
    return delta > ttl;
  }
}

export default DashboardStore;
