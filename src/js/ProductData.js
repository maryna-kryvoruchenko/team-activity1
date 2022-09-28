export default class ProductData {
    constructor(category) {
        this.category = category;
        this.path = `../json/${this.category}.json`;
    }
    getData() {
        fetch("../json/tents.json")
        .then(convertToJson)
        .then((data) => {
            products = data;
        });
    }
    findProductById(id) {
        const product = products.find((item) => item.Id === e.target.dataset.id);
    }
}

let products = [];

function convertToJson(res) {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Bad Response");
    }
  }


