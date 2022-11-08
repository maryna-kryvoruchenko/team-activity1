import { loadHeaderFooter, getLocalStorage, setLocalStorage, alertMessage } from './utils.js';
import ExternalServices from './ExternalServices.js';


loadHeaderFooter();
const services = new ExternalServices();
// takes a form element and returns an object where the key is the "name" of the form input.
function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

// takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
function packageItems(items) {
  // convert the list of products from localStorage to the simpler form required for the checkout process. Array.map would be perfect for this.
  const simplifiedItems = items.map((item) => {
    console.log(item);
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    };
  });
  return simplifiedItems;
  }

export default class CheckoutProcess {
    constructor(key, outputSelector) {
      this.key = key;
      this.outputSelector = outputSelector;
      this.list = [];
      this.itemTotal = 0;
      this.shipping = 0;
      this.tax = 0;
      this.orderTotal = 0;
    }
    init() {
      this.list = getLocalStorage(this.key);
      this.calculateItemSummary();
    }
    calculateItemSummary() {
      // calculate and display the total amount of the items in the cart, and the number of items.
      const showSummary = document.querySelector('.itemSubtotal');
      const totalItems = document.querySelector('.num-items');

      console.log(showSummary, totalItems);

      totalItems.innerHTML = this.list.length;

      const amounts = this.list.map((item) => item.FinalPrice);
        this.itemTotal = amounts.reduce((sum, item) => sum + item);
        showSummary.innerText = '$' + this.itemTotal;
      
    }
    calculateOrdertotal() {
      // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
      this.shipping = 10 + (this.list.length - 1) * 2;
      this.tax = (this.itemTotal * 0.06).toFixed(2);
      this.orderTotal = (
        parseFloat(this.itemTotal) +
        parseFloat(this.shipping) +
        parseFloat(this.tax)).toFixed(2);
      // display the totals.
      this.displayOrderTotals();
    }
    displayOrderTotals() {
      // once the totals are all calculated display them in the order summary page
      const shipping = document.querySelector('.shipEstimate');
      const tax = document.querySelector('.tax');
      const orderTotal = document.querySelector('.orderTotal');

      shipping.innerHTML = '$' + this.shipping;
      tax.innerHTML = '$' + this.tax;
      orderTotal.innerHTML = '$' + this.orderTotal;
    }

    async checkout(form) {
      // build the data object from the calculated fields, the items in the cart, and the information entered into the form
      const formElement = document.forms['checkout'];

      const json = formDataToJSON(formElement);
      // add totals, and item details
      json.lname = document.querySelector("#lname").value;
      json.fname = document.querySelector("#fname").value;
      json.street = document.querySelector("#street").value;
      json.city = document.querySelector("#city").value;
      json.state = document.querySelector("#state").value;
      json.zip = document.querySelector("#zip").value;
      json.cardNumber = document.querySelector("#creditCard").value;
      json.expiration = document.querySelector("#expDate").value;
      json.orderDate = new Date();
      json.orderTotal = this.orderTotal;
      json.tax = this.tax;
      json.shipping = this.shipping;
      json.items = packageItems(this.list);
      console.log(json);
      try {
        const res = await services.checkout(json);
        console.log(res);
        window.localStorage.clear();
        location.assign('../checkout/checkedout.html');
      } catch (err) {
        console.log("Test")
        // removeAllAlerts();
        // for(let message in err.message) {
        alertMessage(err.message);
    //  }
        console.log(err);
      }
      // call the checkout method in our ExternalServices module and send it our data object.
    }
  }