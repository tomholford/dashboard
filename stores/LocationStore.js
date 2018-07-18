import { action, observable, reaction } from 'mobx';
import { computed } from 'mobx-react';
import AutoStore from '../utils/AutoStore';

const CACHE_THRESHOLD = 30 * 60 * 1000; /* 30 minutes, in ms */
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
		this.locations.push({
      "id": location.id,
      "unit": location.unit,
      "locale": location.locale,
      "timezone": location.timezone,
      "name": location.name,
    });
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


    found[key] = data;
  }

  @action
  loadData = () => {
    this.locations.forEach((location) => {
      if(this.locationCache(location, 'current')) {
        // do nothing
      } else {
        this.weatherApi.getCurrent(location).then((data) => {
          this.addResponse(location, 'current', data);
        })
      }

      if(this.locationCache(location, 'forecast')) {
        // do nothing
      } else {
        this.weatherApi.getForecast(location).then((data) => {
          this.addResponse(location, 'forecast', data);
        })
      }
    })
  }

  locationCache = (location, key) => {
    if(key in location && location[key]){
      return this.locationShouldUpdate(location, key);
    }else{
      return false;
    }
  }

  locationShouldUpdate = (location, key, delay = CACHE_THRESHOLD) => {
    let lastUpdated;
    if('dt' in location[key]) {
      lastUpdated = new Date(location[key]['dt'] * 1000);
    } else {
      lastUpdated = new Date(location[key]['list'][0]['dt'] * 1000);
    }
    console.log(`${key} last updated: ${lastUpdated.toLocaleString()}`);
    return ((new Date) - lastUpdated) > delay;
  }
}

export default LocationStore;
