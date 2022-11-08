//import {showTotalCartItems} from './utils.js'; 

import ProductList from "./ProductList";

function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function getCartContents() {
  let markup = "";
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => renderCartItem(item));
  console.log(htmlItems);
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  // document.querySelector(".product-list").innerHTML = renderCartItem(cartItems);
  document.querySelector(".counter").innerHTML = cartItems.length;
}

function renderCartItem(item) {
  console.log(item)
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimarySmall}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
  console.log(newItem);
  return newItem;
}

getCartContents();
// const dataSource = new ProductData('tents');
// const productListElement = document.querySelector('.cart-list');
// const cartList = new ProductList('tents', dataSource, productListElement);
// cartList.callingCartItems(window.localStorage.getItem("so-cart"));
//showTotalCartItems(TotalProduct);