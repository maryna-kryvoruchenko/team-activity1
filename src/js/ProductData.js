const baseURL = 'http://server-nodejs.cit.byui.edu:3000/';

function convertToJson(res) {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Bad Response");
    }
  }

export default class ProductData {
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
}






