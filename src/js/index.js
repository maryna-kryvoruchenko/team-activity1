import {getAddedItemsNumber} from "./utils.js";

window.addEventListener("load", event => {
    displayAddedItemsNumber();
});

export function displayAddedItemsNumber() {
    document.querySelector(".counter").innerHTML = getAddedItemsNumber();
}