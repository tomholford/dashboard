export default class Location {
  constructor(locationObj) {
    this.id = locationObj.id;
    this.unit = locationObj.unit;
    this.locale = locationObj.locale;
    this.timezone = locationObj.timezone;
    this.name = locationObj.name;
    this.showForecastChart = false;
  }
}
