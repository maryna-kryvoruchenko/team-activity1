import CheckoutProcess from "./checkout";

const checkout = new CheckoutProcess("so-cart");
checkout.init();

function calcShipping() {
    checkout.calculateOrdertotal();
}

document.querySelector('#zip').addEventListener("blur", calcShipping);