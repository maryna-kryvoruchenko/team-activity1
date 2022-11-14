import ExternalServices from './ExternalServices.js';

export default class Admin {
    constructor(outputSelector) {
        this.mainElement = document.querySelector(outputSelector);
        this.token = null;
        this.services = new ExternalServices();
      }

    async login(creds, next){
        try {
            this.token = await this.services.loginRequest(creds);
            console.log(this.token);
            next()
            console.log("Testing");
          } 
          catch(err) {
            alert("There is an error");
          }
    }
    showLogin(){
        this.mainElement.innerHTML = this.loginForm();
        document.querySelector('#submitButton').addEventListener('click', (e) => {
            const email = document.querySelector('#email').value;
            const password = document.querySelector('#password').value;
            console.log(email, password)
            this.login({email, password}, this.showOrders.bind(this));
          });

    }
    loginForm() {
        return `<fieldset>
        <legend>Log in</legend>
        <div>
            <label>Email</label>
            <input type="text" id="email" placeholder="youremail@gmail.com" value="user1@email.com">
        </div>
        <div>
            <label for="password">Password</label>
            <input type="password" placeholder="password" id="password" />
        </div>
        <button type="submit" id="submitButton">Login</button>
        </fieldset>`
    }

    async showOrders() {
        try {
          const orders = await this.services.getOrders(this.token);
          console.log(orders);
          this.mainElement.innerHTML = this.orderHtml();
          const parent = document.querySelector('#orders tbody');
          parent.innerHTML = orders.map(order=> `<tr><td>${order.id}</td><td>${new Date(order.orderDate).toLocaleDateString('en-US')}</td><td>${order.items.length}</td><td>${order.orderTotal}</td></tr>`).join('');
        } catch(err) {
          console.log(err);
        }
      }    

    orderHtml() {
        return `
        <table id="orders">
            <thead>
                <tr><th>Id</th><th>Date</th><th>#Items</th><th>Total</th>
            </thead>
            <tbody class="order-body">
            </tbody>
        </table>
        `
    }
}