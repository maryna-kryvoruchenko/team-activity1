import {getAddedItemsNumber} from "./utils.js";

window.addEventListener("load", event => {
    displayAddedItemsNumber();
});

export async function displayAddedItemsNumber() {
    console.log(document.querySelector(".counter"));
    document.querySelector(".counter").innerHTML = getAddedItemsNumber();
}