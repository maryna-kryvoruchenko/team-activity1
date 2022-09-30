import ProductData from "./ProductData.js";
export default class ProductDetails {
    constructor(productId, dataSource){
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }
    async init() {
        // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
        
        // once we have the product details we can render out the HTML
        renderProductDetails();
        // once the HTML is rendered we can add a listener to Add to Cart button
        // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
        document.getElementById('addToCart').addEventListener('click', this.addToCart.bind(this));
      }

    addToCart() {
        setLocalStorage("so-cart", this.product);
    }
    renderProductDetails(product) {
        return `
        <section class="product-detail">
        <h3>${this.product.Brand.Name}</h3>
        <h2 class="divider">${this.product.NameWithoutBrand}</h2>
        <img
          class="divider"
          src="${this.product.Image}"
          alt="${this.product.NameWithoutBrand}"
        />

        <p class="product-card__price">${this.product.FinalPrice}</p>
        <p class="product__color">${this.product.Colors.ColorName}</p>
        <p class="product__description">
          ${this.product.DescriptionHtmlSimple}
        </p>
        <div class="product-detail__add">
          <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
        </div>
      </section>`
    }
}