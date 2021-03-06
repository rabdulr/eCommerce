
import React, {useState, useEffect} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { isNumber } from 'util';

const Cart = ({ lineItems, cart, createOrder, removeFromCart, products, promos})=> {
  const [ discount, setDiscount ] = useState(0.00)
  let totalTotalItemCost = 0
  const [ sale, setSale ] = useState({});

  useEffect(()=>{
    setSale({
      price: totalTotalItemCost,
      name: 'Sale',
      description: `Purchase from ${cart.id}`,
    })
  }, [totalTotalItemCost])

  const makePayment = token => {
    const body = {
      token,
      sale 
    };

    axios.post(`/payment`, body)
      .then(response => {
        console.log('success');
      })
      .catch(err => console.log(err));

    createOrder();
  };
  const promoCheck = async()=>{
    // const guess = await prompt("Enter Your Promo Code", "here!")
    // console.log(guess)
  }
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
                  <img src='https://image.flaticon.com/icons/svg/57/57629.svg' className="cartOverlay"></img>
                  <img src={product.image}></img>
                </div>
              </li>
            );
          })
        }
      </ul>
      ${totalTotalItemCost- totalTotalItemCost*discount}.00
      <br />
      <StripeCheckout 
        stripeKey='pk_test_O0q8inMcz05ji9zR1e1IBK8S00pQrF1tLF'
        token={makePayment}
        name='Buy Items'
        amount={totalTotalItemCost * 100}
      />
      <button disabled={ !lineItems.find( lineItem => lineItem.orderId === cart.id )} onClick={ createOrder }>Place Order</button>
      <button onClick={ promoCheck }>Got a Promo Code? Click here!</button>

    </div>
  );
};

export default Cart;
