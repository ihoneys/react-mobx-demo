import { action, makeObservable, makeAutoObservable, observable } from "mobx"
import { buyProducts, getAllProducts } from "../api/shop"


class CartStore {
  cartList = []
  checkoutStatus = null
  constructor(rootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
  }
  //总价格
  get totalPrice() {
    return this.cartList.reduce((acc, prod) => {
      return acc + (prod.price * prod.quantity)
    }, 0)
  }
  checkout = async () => {
    // 保存购物车数据
    const saveCartList = [...this.cartList]

    // 结算
    const { status } = await buyProducts()

    // 设置回调结算状态，成功 successful 失败 failed
    this.setCheckStatus(status)

    // 清空购物车
    this.cartList = []

  }
  // 设置结算状态
  setCheckStatus = (status) => {
    this.checkoutStatus = status
  }
}


export default CartStore