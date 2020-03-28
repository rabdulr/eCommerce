import React, {useState, useEffect} from 'react';

const Products = ({ products, addToCart })=> {
  const [nums, setNums] = useState(
    products.map(p => ({id: p.id, num: 0}))
  )

  const updateNums = (id, num) => {
    setNums(nums.map(n => {
      if(n.id === id){
        return {id: n.id, num: num*1}
      } else {
        return n
      } 
    }))
  }

  function buttonFunction(product, thisNum){
    addToCart(product, thisNum)
    setNums(nums.map(n => {
      if(n.id === product){
        return {id: n.id, num: 0}
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

            let thisNum = nums.find(item => item.id === product.id).num

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
                    value = { thisNum } 
                    onChange = { ev => updateNums(product.id, ev.target.value) } 
                  />
                  <button 
                    disabled = { !thisNum }
                    onClick = { () => buttonFunction(product.id, thisNum) }
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
