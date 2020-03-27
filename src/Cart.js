import React, {useEffect} from 'react';

const Cart = ({ lineItems, cart, createOrder, removeFromCart, products })=> {

  return (
    <div>
      <h2>Cart - { cart.id && cart.id.slice(0, 4) }</h2>
      <button disabled={ !lineItems.find( lineItem => lineItem.orderId === cart.id )} onClick={ createOrder }>Create Order</button>
      <ul>
        {
          lineItems.filter( lineItem => lineItem.orderId === cart.id ).map( lineItem => {
            const product = products.find( product => product.id === lineItem.productId);
            const totalItemCost = lineItem.quantity * product.price
            return (
              <li key={ lineItem.id }>
                <a href={`#view=product&id=${product.id}`}>
                { product && product.name}
                </a>
                { ' ' }
                <span className='quantity'>Quantity: { lineItem.quantity }</span>
                <span className='cart-total'>Total: ${ totalItemCost }</span> 
                <button onClick={ ()=> removeFromCart(lineItem)}>Remove From Cart</button>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default Cart;
