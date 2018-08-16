import Feed from 'rss-to-json';

class RssService {
  static getFeed(url, callback){
    const reqUrl = 'https://cors-anywhere.herokuapp.com/' + url;
    Feed.load(reqUrl, callback);
  }
}

export default RssService;
