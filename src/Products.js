import React, {useState, useEffect} from 'react';

const Products = ({ products, addToCart })=> {
  const [num, setNum] = useState(0)
  return (
    <div>
      <h2>Products</h2>
      # to add to cart <input type = 'number' min='1' max='10' value = { num } onChange = { ev => setNum(ev.target.value) } />
      <ul>
        {
          products.map( product => {
            return (
              <li key={ product.id }>
                <span>
                  <a href={`#view=product&id=${product.id}`}>{ product.name }</a>
                </span>
                <span>
                  <img src={product.image} />
                </span>
                <span>
                  Product Description: { product.description }
                </span>
                <span>
                ${
                  Number(product.price).toFixed(2)
                }
                </span>
                <button disabled={!num} onClick={ ()=> addToCart(product.id, num)}>Add {num} to Cart</button>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default Products;
