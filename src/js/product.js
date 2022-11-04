import ProductData from './ProductData.js';

import ProductDetails from './ProductDetails.js';
import { getParam, showTotalCartItems } from './utils.js';

const productId = getParam('product');
const dataSource = new ProductData('tents');

const product = new ProductDetails(productId, dataSource);
product.init();