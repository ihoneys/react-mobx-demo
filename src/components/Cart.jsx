import { inject, observer } from 'mobx-react';

const Cart = (props) => {
  const { cartList, totalPrice, checkout, checkoutStatus } = props.cartStore;
  return (
    <div>
      <h2>Your cart</h2>
      <ul>
        {cartList.map((item) => (
          <li key={item.id}>
            <p>
              {item.name} - {item.price} * {item.quantity}
            </p>
          </li>
        ))}
      </ul>
      <p>Total: {totalPrice}</p>
      {cartList.length > 0 && (
        <p>
          <button onClick={checkout}>Check out</button>
        </p>
      )}
      {checkoutStatus && <p>{checkoutStatus}</p>}
    </div>
  );
};

export default inject('cartStore')(observer(Cart));
