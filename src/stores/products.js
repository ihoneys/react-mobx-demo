import { makeAutoObservable } from "mobx"
import { getAllProducts } from "../api/shop"


class ProductsStore {
  all = []
  constructor(rootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
  }
  // 获取商品列表
  getProductsList = async () => {
    const { products } = await getAllProducts()
    this.all = products
  }
  // 添加购物车逻辑
  addToCart = (curProduct) => {
    const { cartList } = this.rootStore.cartStore

    // 当前添加购物车的商品是否在购物车里存在
    const prod = cartList.find((cartItem) => curProduct.id === cartItem.id)

    // 如果购物车有则数量减一，没有则添加到购物车
    if (prod) {
      prod.quantity++
    } else {
      cartList.push(Object.assign(curProduct, { quantity: 1 }))
    }

    // 添加购物车完成，商品数量对应减1
    this.decreaseInventory(curProduct)
  }
  decreaseInventory = (product) => {
    product.inventory--
  }
}


export default ProductsStore