// wrapper for querySelector...returns matching element
export function qs(selector) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  let currentCart = getLocalStorage(key);

  if (!currentCart) {
    currentCart = [];
  }
  console.log(currentCart);
  currentCart.push(data);
  localStorage.setItem(key, JSON.stringify(currentCart));

  var x = currentCart.length;
  //document.getElementById("demo").innerHTML = x;
  //document.getElementById("counter").innerHTML = x;
  //document.getElementById("counter1").innerHTML = x;
  document.querySelector(".counter").innerHTML = x;
}


// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get('product'); 

  return urlParams.get(param);
}