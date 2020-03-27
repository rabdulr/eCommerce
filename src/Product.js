import React, {useState, useEffect} from 'react';

const Product = ({ product, lineItem, addToCart }) => {
    const [number, setNumber] = useState(0)
    
    return( 
        <div className='product'>
            <h1>{ product.name }</h1>
            <img src={ product.image } />
            <h3>Description: { product.description }</h3>
            <h3>Quantity in Cart: { lineItem ? lineItem.quantity : '0' }</h3>
            <span>
                <input 
                    type = 'number' 
                    min='0' max='999'
                    value = { number } 
                    onChange = { ev => setNumber(ev.target.value) } 
                />
                <button 
                    disabled = { number === 0 }
                    onClick={ ()=> addToCart( product.id, number )}
                >Add to Cart</button>
            </span>
        </div>
    )
};

export default Product;