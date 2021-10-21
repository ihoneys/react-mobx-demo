export const products = [
  {
    id: 0,
    name: 'MacBook Pro',
    price: '19999',
    inventory: 1,
  },
  {
    id: 1,
    name: 'iPhone 13',
    price: '6888',
    inventory: 2,
  },
  {
    id: 2,
    name: 'AirPods 3',
    price: '1399',
    inventory: 5,
  },
  {
    id: 3,
    name: 'iMac',
    price: '9999',
    inventory: 3,
  }
]

export const getAllProducts = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        products
      })
    }, 1000)
  })
}

export const buyProducts = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        status: Math.random() > 0.5 ? 'successful' : 'failed'
      })
    }, 500)
  })
}