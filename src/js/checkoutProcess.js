import CheckoutProcess from "./checkout";

const checkout = new CheckoutProcess("so-cart");
checkout.init();

function calcShipping() {
    checkout.calculateOrdertotal();
}

document.querySelector('#zip').addEventListener("blur", calcShipping);

// this is how it would look if we listen for the click on the button
document.querySelector('.submitButton')
.addEventListener('click', (e) => {
  console.log("Checking out")
  e.preventDefault();
  const myForm = document.forms[0];
  const chk_status = myForm.checkValidity();
  myForm.reportValidity();
  if(chk_status) 
    checkout.checkout();
});