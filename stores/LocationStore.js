import { action, observable } from 'mobx';
 import { computed } from 'mobx-react';
import AutoStore from '../utils/AutoStore';

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

	static initialize = function() {
    const store = new this();
    AutoStore(this, store, 'dashboardStore', DEFAULT_STORE);

    return store;
	}

  constructor(initialStore) {
    if(initialStore) {
      this.locations = initialStore.locations;
    }
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
}

export default LocationStore;
