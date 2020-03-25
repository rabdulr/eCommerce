import React from 'react';

const Product = ({id, product, lineItem }) => {
    console.log(lineItem)
    return(
        <div className='product'>
            <h1>{ product.name }</h1>
            <img src={ product.image } />
            <h3>Description: { product.description }</h3>
            <h3>Quantity: { lineItem ? lineItem.quantity : '0' }</h3>
        </div>
    )
};

export default Product;