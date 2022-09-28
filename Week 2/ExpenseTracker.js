export default class ExpenseTracker {
    constructor(label, outputId){
        this.label = label;
        this.outputId = outputId;
        this.expenses= [];
        this.total = 0;
        this.renderTable();
    }

    renderTable() {
        const element = document.getElementById(this.outputId);
        element.innerHTML = `<h2>${this.label}</h2>
        <table>
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody class="outputBody"></tbody>
        </table>`
    }

    addExpense(expense){
        this.expenses.push(expense);
        this.calculateRunningTotal();
        this.renderExpense();
    }

    calculateRunningTotal(){
        const expense = this.expenses.at(-1);
        this.total += parseFloat(expense.amount);
        expense.total = this.total;
    }

    renderExpense() {
        const expense = this.expenses.at(-1);
        const element = document.querySelector(`#${this.outputId} .outputBody`);
        element.innerHTML += `<tr><td>${expense.description}</td><td>$${expense.amount}</td><td>$${expense.total.toFixed(2)}</td></tr>`;
    }
}