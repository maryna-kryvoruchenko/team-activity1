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
  
  showTotalCartItems(currentCart.length);
}

export function getAddedItemsNumber(){
  let localStorage = getLocalStorage("so-cart");
  let addedItemsNumber = 0;

  if(localStorage){
    addedItemsNumber = localStorage.length;
  }

  return addedItemsNumber;
}

// find total items in cart 
export function showTotalCartItems(items){
  document.querySelector(".counter").innerHTML = items;
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

export function renderListWithTemplate(template, parent, list, callback) {
  list.forEach(item => {
    console.log(template);
    const clone = template.content.cloneNode(true);
    const templateWithData = callback(clone, item);
    parent.appendChild(templateWithData);
  });
}

export function renderWithTemplate(template, parent, data, callback) {
  
  let clone = template.content.cloneNode(true);
  if(callback) {
  clone = callback(clone, data);
  
  }
  parent.appendChild(clone);

}

function convertToText(res) {
  if (res.ok) {
    return res.text();
  }
  else {
    throw new Error("Bad Response");
  }
}

export async function loadTemplate(path) {
const html = await fetch(path).then(convertToText);
const template = document.createElement('template');
template.innerHTML = html;
return template;

}

// load the header and footer
export async function loadHeaderFooter() {
const header = await loadTemplate('../partials/header.html');
const footer = await loadTemplate('../partials/footer.html');
const headerElement = document.getElementById('main-header');
const footerElement = document.getElementById('main-footer');
renderWithTemplate(header, headerElement);
renderWithTemplate(footer, footerElement);
}

export function displayNumberinPDetails(){
  const counter =  document.querySelector(".counter")
  counter.innerHTML = getAddedItemsNumber();
}