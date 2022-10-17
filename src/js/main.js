import ProductData from './ProductData.js';
import ProductDetails from './ProductDetails.js';
import { getParam } from './utils.js';
import ProductList from './ProductList.js';
import { loadHeaderFooter } from './utils.js';

loadHeaderFooter(); 


const dataSource = new ProductData('tents');


const productListElement = document.querySelector('.product-list');

const pList = new ProductList('tents', dataSource, productListElement);
pList.init();

console.log(pList);