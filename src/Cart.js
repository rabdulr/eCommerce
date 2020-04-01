import React, {useState} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const Cart = ({ lineItems, cart, createOrder, removeFromCart, products })=> {
  let totalTotalItemCost = 0

  const makePayment = token => {
    const body = {
      token, 
    }
    const headers = {
      'Content-Type': 'application/json'
    }
    axios.post(`http://localhost:3000/payment`, headers, body)
      .then(response => {
        console.log('Response', response);
        const { status } = response;
        console.log('Status', status)
      })
      .catch(err => console.log(error))
  };

  return (
    <div id="cartRoot">
      <h2>Your Cart !!!  #{ cart.id && cart.id.slice(0, 4)}</h2>
      <ul>
        {
          lineItems.filter( lineItem => lineItem.orderId === cart.id ).map( lineItem => {
            const product = products.find( product => product.id === lineItem.productId);
            const totalItemCost = lineItem.quantity * product.price
            totalTotalItemCost += totalItemCost
            return (
              <li key={ lineItem.id } className="cartItem">
                <div className="stats">
                  <a href={`#view=product&id=${product.id}`}>
                    { product && product.name}
                  </a>
                  { ' ' }
                  <span className='quantity'>Quantity: { lineItem.quantity }</span>
                  <span className='cart-total'>Total: ${ totalItemCost }</span> 
                  <button onClick={ ()=> removeFromCart(lineItem)}>Remove From Cart</button>
                </div>
                <div className="imgDiv">
                  <img src='https://image.flaticon.com/icons/svg/57/57629.svg' class="cartOverlay"></img>
                  <img src={product.image}></img>
                </div>
              </li>
            );
          })
        }
      </ul>
      ${totalTotalItemCost}.00 <button disabled={ !lineItems.find( lineItem => lineItem.orderId === cart.id )} onClick={ createOrder }>Place Order</button>
      <br />
      <StripeCheckout 
        stripeKey='pk_test_O0q8inMcz05ji9zR1e1IBK8S00pQrF1tLF'
        token={makePayment}
        name='Buy Items'
        amount={totalTotalItemCost * 100}
      />
    </div>
  );
};

export default Cart;
