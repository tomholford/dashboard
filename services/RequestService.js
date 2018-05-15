class RequestService {
  static async getRequest(url) {
    let options = {
      method: 'GET',
      cache: 'no-cache'
    };
    let request = new Request(url);

    let data = await(await(fetch(request, options).then(res => {
      return res.json();
    }).catch(err => {
      console.log('Error: ', err);
    })))
    return data;
  }
}

export default RequestService;
