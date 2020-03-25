import React from 'react';

const Orders = ({ lineItems, orders, products, removeOrder })=> {

  return (
    <div>
      <h2>Orders</h2>
      <ul>
        {
          orders.map( order => {
            const _lineItems = lineItems.filter( lineItem => lineItem.orderId === order.id);
            const totalItems = [];
            const orderTotal = [];
            return (
              <li key={ order.id }>
                <div>
                  OrderID: { order.id.slice(0, 4) }
                  
                </div>
                <ul>
                  {
                    _lineItems.map( lineItem => {
                      const product = products.find( product => product.id === lineItem.productId);
                      const total = lineItem.quantity * product.price;
                      totalItems.push(lineItem.quantity*1)
                      orderTotal.push(total*1);
                      return (
                        <li key={ lineItem.id}>
                          {
                            product && product.name
                          }
                          <span className='quantity'>
                            Quantity: {
                              lineItem.quantity
                            }
                          </span>
                          <span className='order-total'>
                            Total: ${
                              total
                            }
                          </span>
                        </li>
                      );
                    })
                  }
                  <h4>
                    Total Items: { totalItems.reduce( (acc, item)=> { return acc += item}, 0)}
                  </h4>
                  <h4>
                    Order Total: ${ orderTotal.reduce( (acc, order) => { return acc += order }, 0 ) }
                  </h4>
                <button onClick={()=> removeOrder(order.id)}>Remove Order</button>
                </ul>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default Orders;
