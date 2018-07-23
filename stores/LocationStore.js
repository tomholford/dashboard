import { action, observable, reaction } from 'mobx';
import { computed } from 'mobx-react';
import * as Environment from '../utils/Environment';
import AutoStore from '../utils/AutoStore';
import Location from '../models/Location';

const TTL = 60 * 60 * 1000; /* 60 minutes, in ms */
const DEFAULT_STORE = {
  "locations": [
    {
      "id": 1850144,
      "unit": "C",
      "locale": "ja-JP",
      "timezone": "Asia/Tokyo",
      "name": "Tokyo",
    },
    {
      "id": 5391959,
      "unit": "F",
      "locale": "en-US",
      "timezone": "America/Los_Angeles",
      "name": "San Francisco",
    },
    {
      "id": 3117732,
      "unit": "C",
      "locale": "es-SP",
      "timezone": "Europe/Madrid",
      "name": "Madrid",
    }
  ]
};

class LocationStore {
	@observable locations = [];

	static initialize = function(weatherApi) {
    const store = new this(weatherApi);
    AutoStore(store, 'dashboardStore', DEFAULT_STORE);

    store.loadData();
    return store;
	}

  constructor(weatherApi) {
    this.weatherApi = weatherApi;
  }

  @action
	addLocation = (location) => {
    const newLocation = new Location(location);
		this.locations.push(newLocation);
	}

  @action
	removeLocation = (location) => {
    const index = this.locations.indexOf(location);
    if(index < 0) {
      return;
    } else {
      this.locations.splice(index, 1);
    }
	}

  @action
  addResponse = (location, key, data) => {
    const index = this.locations.indexOf(location);
    let found = this.locations[index];

    // since forecast response doesn't have timestamp, add it ourselves :)
    if(!('dt' in data)) {
      data['dt'] = Math.round((new Date).getTime() / 1000);
    }

    found[key] = data;
  }

  @action
  loadData = () => {
    this.locations.forEach((location) => {
      if(this.shouldUseCached(location, 'current')) {
        // do nothing
        if(Environment.DEVELOPMENT) {
          console.log(`current cached: ${location.name}`);
        }
      } else {
        if(Environment.DEVELOPMENT) {
          console.log(`current api call: ${location.name}`);
        }
        this.weatherApi.getCurrent(location).then((data) => {
          this.addResponse(location, 'current', data);
        })
      }

      if(this.shouldUseCached(location, 'forecast')) {
        // do nothing
        console.log(`forecast cached: ${location.name}`);
        if(Environment.DEVELOPMENT) {
          console.log(`forecast cached: ${location.name}`);
        }
      } else {
        if(Environment.DEVELOPMENT) {
          console.log(`forecast api call: ${location.name}`);
        }
        this.weatherApi.getForecast(location).then((data) => {
          this.addResponse(location, 'forecast', data);
        })
      }
    })
  }

  @action
  toggleForecastChart = (location) => {
    const index = this.locations.indexOf(location);
    let found = this.locations[index];
    found.showForecastChart = !found.showForecastChart;
  }

  shouldUseCached = (location, key) => {
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
      console.log(`current date: ${currentDate.toLocaleString()}`);
      console.log(`${key} last updated: ${lastUpdated.toLocaleString()}`);
      console.log(`delta: ${delta} ms`);
      console.log(`ttl: ${ttl} ms`);
      console.log(`shouldUpdate: ${delta > ttl}`);
    }
    return delta > ttl;
  }
}

export default LocationStore;
