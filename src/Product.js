import React, {useEffect, useState} from 'react';

const Product = ({product, lineItem, addToCart}) => {
    const [ item, setItem ] = useState([])
    const [number, setNumber] = useState(0)
    
    useEffect(()=>{
        if(lineItem){
            console.log(lineItem.quantity)
            setItem(lineItem)
        }
    }, [lineItem])

    // useEffect(()=>{
    //     console.log()
    // })
 
    return(
        <div className='product'>
            <h1>{ product.name }</h1>
            <img src={ product.image } />
            <h3>Description: { product.description }</h3>
            <h3>Quantity: { item.quantity }</h3>
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
            <h3>Quantity in Cart: { item.quantity }</h3>
            </span>
        </div>
    )
};

export default Product;