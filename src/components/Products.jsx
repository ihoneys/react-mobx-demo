import { inject, observer } from 'mobx-react';
import { useEffect } from 'react';
const Products = (props) => {
  const { getProductsList, all, addToCart } = props.productsStore;
  useEffect(() => {
    getProductsList();
  }, []);
  return (
    <div>
      <h2>Products</h2>
      <ul>
        {all.map((item) => (
          <li key={item.id}>
            <p>
              {item.name}——{item.price} * {item.inventory}
            </p>
            <p>
              <button disabled={item.inventory <= 0} onClick={() => addToCart(item)}>
                {item.inventory > 0 ? 'Add to cart' : 'Sold out'}
              </button>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default inject('productsStore')(observer(Products));
