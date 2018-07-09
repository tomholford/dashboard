import RequestService from './RequestService';

const API_KEY = '16793c2cd11658bc4be9dc7d5fa5c848'

class WeatherService {

  static getCurrent(locationId, units){
    var url = `https://api.openweathermap.org/data/2.5/weather?id=${locationId}&units=${units}&appid=${API_KEY}`;
    return RequestService.getRequest(url)
  }

  static getForecast(locationId, units){
    var url = `https://api.openweathermap.org/data/2.5/forecast?id=${locationId}&units=${units}&appid=${API_KEY}`;
    return RequestService.getRequest(url);
  }

}

export default WeatherService;
