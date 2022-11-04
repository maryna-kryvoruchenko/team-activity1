import {getAddedItemsNumber} from "./utils.js";

window.addEventListener("load", event => {
    displayAddedItemsNumber();
});

async function displayAddedItemsNumber() {
    document.querySelector(".counter").innerHTML = getAddedItemsNumber();
}