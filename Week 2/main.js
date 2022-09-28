import ExpenseTracker from "./ExpenseTracker.js";

const janExpense = new ExpenseTracker("Jan", "janOutput");
const febExpense = new ExpenseTracker("Feb", "febOutput");

function submit() {
    const description = document.getElementById("description");
    const amount = document.getElementById("amount");
    const month = document.getElementById("month");

    const expense = {description: description.value, amount: amount.value};

    switch(month.value) {
        case "jan":
            janExpense.addExpense(expense);
            break;
        case "feb":
            febExpense.addExpense(expense);
            break;
    }

    description.value = "";
    amount.value = "";
}
document.getElementById("submit").addEventListener("click", submit);