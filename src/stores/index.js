import CartStore from "./cart";
import ProductsStore from "./products";

class RootStore {
  constructor() {
    this.productsStore = new ProductsStore(this)
    this.cartStore = new CartStore(this)
    
  }
}

export default RootStore