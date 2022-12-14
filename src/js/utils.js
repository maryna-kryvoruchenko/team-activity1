import { displayAddedItemsNumber } from "./index.js";
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
  })
}

export function renderWithTemplate(template, parent, data, callback) {
  let clone = template.content.cloneNode(true);

  if(callback){
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
  const template = document.createElement("template");
  template.innerHTML = html;
  return template;
}

export async function loadHeaderFooter(){
  const header = document.getElementById("header");
  const footer = document.getElementById("footer");
  const headerTemplate = await loadTemplate("../partials/header.html");
  const footerTemplate = await loadTemplate("../partials/footer.html");

  renderWithTemplate(headerTemplate, header);
  renderWithTemplate(footerTemplate, footer);  

  displayAddedItemsNumber();
}

export function alertMessage(message, scroll = true, duration = 3000) {
  const alert = document.createElement('div');
  alert.classList.add('alert');
  alert.innerHTML = `<p>${message}</p><span>X</span>`;
  
  alert.addEventListener('click', function(e) {
      if(e.target.tagName == 'SPAN') {
        main.removeChild(this);
      }
  })
  const main = document.querySelector('main');
  main.prepend(alert);
  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if(scroll)
    window.scrollTo(0,0);

  // left this here to show how you could remove the alert automatically after a certain amount of time.
  // setTimeout(function () {
  //   main.removeChild(alert);
  // }, duration);
}
