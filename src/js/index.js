import {getAddedItemsNumber} from "./utils.js";

window.addEventListener("load", event => {
    displayAddedItemsNumber();
});

<<<<<<< HEAD
async function displayAddedItemsNumber() {
=======

export async function displayAddedItemsNumber() {
    console.log(document.querySelector(".counter"));
>>>>>>> main
    document.querySelector(".counter").innerHTML = getAddedItemsNumber();
}