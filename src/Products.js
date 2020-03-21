import React, {useState, useEffect} from 'react';

const Products = ({ products, addToCart })=> {
  const [num, setNum] = useState(0)
  return (
    <div>
      <h2>Products</h2>
      <ul>
        {
          products.map( product => {
            return (
              <li key={ product.id }>
                <span>
                { product.name }
                </span>
                <span>
                ${
                  Number(product.price).toFixed(2)
                }
                </span>
                <input type = 'number' min='0' max='10' value = { num } onChange = { ev => setNum(ev.target.value) } />
                <button disabled={!num} onClick={ ()=> addToCart(product.id, num)}>Add to Cart</button>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default Products;
