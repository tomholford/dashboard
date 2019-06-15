class RequestService {
  static async getRequest(url) {
    let options = {
      method: 'GET',
      cache: 'no-cache'
    };

    let request = new Request(url);
    let response = await fetch(request, options);
    let data = await response.json();

    return data;
  }
}

export default RequestService;
