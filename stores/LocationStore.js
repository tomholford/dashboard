import { action, observable } from 'mobx';
import { computed } from 'mobx-react';

class LocationStore {
	@observable locations = [];

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
}

export default LocationStore;
