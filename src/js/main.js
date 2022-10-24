import ProductData from './ProductData.js';
import ProductDetails from './ProductDetails.js';
import { getParam } from './utils.js';
import ProductList from './ProductList.js';
import { loadHeaderFooter, displayNumberinPDetails } from './utils.js';
import { displayAddedItemsNumber } from './index.js';

const productId = getParam('product');
const dataSource = new ProductData('tents');

const product = new ProductDetails(productId, dataSource);

export async function runAll() {
    await loadHeaderFooter(); 
    displayAddedItemsNumber();
    
}
runAll();

const productListElement = document.querySelector('.product-list');

const pList = new ProductList('tents', dataSource, productListElement);
pList.init();
displayNumberinPDetails();
console.log(pList);