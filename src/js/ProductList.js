import { renderListWithTemplate } from './utils.js';

export default class ProductList{

    constructor(category, dataSource, listElement) {
        // We passed in this information to make our class as reusable as possible.
        // Being able to define these things when we use the class will make it very flexible
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
      }
      async init() {
        // our dataSource will return a Promise...so we can use await to resolve it.
        const list = await this.dataSource.getData(this.category);
        console.log(list);

        // filter the list

        // const list = await this.dataSource.getData();
        // this.renderList(list)
          // console.log(window.location.href.split('/'));
        
        if (window.location.href.split('/')[3] != 'cart') {
          const list = await this.dataSource.getData();
          console.log(list);
          this.renderList(list);
        } else {
          const list = window.localStorage.getItem("so-cart");
          console.log(list);
            this.renderList(list);
        }
      }

      // callingCartItems(){
      //   const list = window.localStorage.getItem("so-cart");
      //   this.renderList(list);
      // }      

      filterList(list) {
        const filteredList = []
        list.forEach(product => {
          //if (product.Image != "") {
            filteredList.push(product);
          //}
        })
        console.log(filteredList);
        // render the list 
        this.renderList(filteredList);

    // Image paths removed from json due to not having the image file
    // "Image": "../images/tents/marmot-ajax-tent-2-person-3-season-in-pale-pumpkin-terracotta~p~880rt_01~320.jpg",
    // "Image": "../images/tents/the-north-face-talus-tent-3-person-3-season-in-golden-oak-saffron-yellow~p~989cg_01~320.jpg",
      }

      // renderList(list) {
      //   const template = document.getElementById('product-card-template');
      //   list.forEach(product => {
      //     const clone = template.content.cloneNode(true);
      //     const hydratedTemplate = this.prepareTemplate(clone, product);
      //     this.listElement.appendChild(hydratedTemplate);
      //   })
      // }

      renderList(list) {
        // make sure the list is empty
        this.listElement.innerHTML = '';
        //get the template
        const template = document.getElementById('product-card-template');
        console.log(template);
        renderListWithTemplate(template, this.listElement, list, this.prepareTemplate);
        
      }

      prepareTemplate(template, product) {
    
        template.querySelector('a').href +=  product.Id;
        template.querySelector('img').src = product.Images.PrimaryMedium;
        template.querySelector('img').alt += product.Name;
        template.querySelector('.card__brand').textContent = product.Brand.Name;
        // template.querySelector('.card__name').textContent = product.NameWithoutBrand;
        template.querySelector('.product-card__price').textContent += product.FinalPrice; 
        return template;
      }
}
