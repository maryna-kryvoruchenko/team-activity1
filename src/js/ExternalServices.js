const baseURL = 'http://server-nodejs.cit.byui.edu:3000/';

function convertToJson(res) {
    if (res.ok) {
      return res.json();
    } else {
      throw { name: 'servicesError', message: res };
    }
  }

export default class ExternalServices {
    constructor(category) {
        // this.category = category;
        // this.path = `../json/${this.category}.json`;
    }
    getData(category) {
      return fetch(baseURL + `products/search/${category}`)
      .then(convertToJson).then((data) => data.Result);
    }
    async findProductById(id) {
        // const products = await this.getData();
        // return products.find((item) => item.Id === id);
        return await fetch(baseURL + `product/${id}`).then(convertToJson)
        .then((data) => data.Result);
    }
    async checkout(payload) {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      };
      return await fetch(baseURL + 'checkout/', options).then(convertToJson);
    }

    async loginRequest(user) {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      }
      const response = await fetch(baseURL + 'login', options).then(convertToJson);
      return response.accessToken;
    }

    async getOrders(token) {
      const options = {
        method: 'GET',
        // the server will reject our request if we don't include the Authorization header with a valid token!
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      const response = await fetch(baseURL + 'orders', options).then(convertToJson);
      return response;
    }
}






