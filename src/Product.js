import React, {useEffect, useState} from 'react';

const Product = ({id, product, lineItem}) => {
    const [ item, setItem ] = useState([])
    
    useEffect(()=>{
        if(lineItem){
            setItem(lineItem)
        }
    }, [lineItem])

    return(
        <div className='product'>
            <h1>{ product.name }</h1>
            <img src={ product.image } />
            <h3>Description: { product.description }</h3>
            <h3>Quantity: { item.quantity }</h3>
        </div>
    )
};

export default Product;