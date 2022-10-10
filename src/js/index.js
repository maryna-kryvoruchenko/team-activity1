import {getAddedItemsNumber} from "./utils.js";

window.addEventListener("load", event => {
    displayAddedItemsNumber();
});

function displayAddedItemsNumber() {
    document.querySelector(".counter").innerHTML = getAddedItemsNumber();
}