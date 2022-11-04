//import {showTotalCartItems} from './utils.js';

function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function getCartContents() {
  let markup = "";
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => renderCartItem(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  // document.querySelector(".product-list").innerHTML = renderCartItem(cartItems);
  document.querySelector(".counter").innerHTML = cartItems.length;
  document.getElementById('remove-icon').addEventListener('click', this.removeFromCart.bind(this));
}

function renderCartItem(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>
<a href="#" class="remove-icon">
    <img
      src="../images/x-cons.png"
      alt="Remove item"
    />
  </a>
`;
  console.log(newItem);
  return newItem;
}

getCartContents();
//showTotalCartItems(TotalProduct);