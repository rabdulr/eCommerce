import React, {useState, useEffect} from 'react';

const Products = ({ products, addToCart })=> {
  const [nums, setNums] = useState(
    products.map(p => ({id: p.id, num: 0}))
  )

  const updateNums = (id, num) => {
    console.log(nums)
    console.log('')
    setNums(nums.map(n => {
      if(n.id === id){
        return {id: n.id, num: num*1}
      } else {
        return n
      }
    }))
  }

  return (
    <div>
      <h2>Products</h2>
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
                <span>
                  <input 
                    type = 'number' 
                    min='0' max='999'
                    value = { nums.find(item => item.id === product.id).num } 
                    onChange = { ev => updateNums(product.id, ev.target.value) } 
                  />
                  <button 
                    disabled = { !nums.find(item => item.id === product.id).num }
                    onClick={ ()=> addToCart(product.id, nums.find(item => item.id === product.id).num)}
                  >Add to Cart</button>
                </span>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default Products;
