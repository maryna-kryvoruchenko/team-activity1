import ExternalServices from './ExternalServices.js';

import ProductDetails from './ProductDetails.js';
import { getParam, showTotalCartItems } from './utils.js';



const productId = getParam('product');
const dataSource = new ExternalServices('tents');

const product = new ProductDetails(productId, dataSource);
product.init();



