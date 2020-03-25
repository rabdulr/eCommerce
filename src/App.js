import React, { useState, useEffect } from 'react';
import qs from 'qs';
import axios from 'axios';
import Login from './Login';
import CreateUserAccount from './CreateUserAccount';
import Orders from './Orders';
import Cart from './Cart';
import Products from './Products';
import Product from './Product';

const headers = () => {
  const token = window.localStorage.getItem('token');
  return {
    headers: {
      authorization: token
    }
  };
};

const App = ()=> {
  const [ params, setParams ] = useState(qs.parse(window.location.hash.slice(1)));
  const [ auth, setAuth ] = useState({});
  const [ orders, setOrders ] = useState([]);
  const [ cart, setCart ] = useState({});
  const [ products, setProducts ] = useState([]);
  const [ lineItems, setLineItems ] = useState([]);
  const [ cartQuantity, setCartQuantity ] = useState(0);

  useEffect(() => {
    axios.get('/api/products')
      .then(response => setProducts(response.data));
  }, []);

  useEffect(() => {
    if (auth.id) {
      const token = window.localStorage.getItem('token');
      axios.get('/api/getLineItems', headers())
        .then(response => {
          setLineItems(response.data);
        });
    }
  }, [auth]);

  useEffect(() => {
    if (auth.id) {
      axios.get('/api/getCart', headers())
      .then( response => {
        setCart(response.data);
      });
    }
  }, [auth]);

  useEffect(() => {
    if (auth.id) {
      axios.get('/api/getOrders', headers())
        .then(response => {
          setOrders(response.data);
        });
    }
  }, [auth]);

  const createUserAccount = async (credentials) => {
    const created = (await axios.post('/api/createUserAccount', credentials)).data;
  };

  const login = async (credentials) => {
    const token = (await axios.post('/api/auth', credentials)).data.token;
    window.localStorage.setItem('token', token);
    exchangeTokenForAuth()
  };

  const exchangeTokenForAuth = async () => {
    const response = await axios.get('/api/auth', headers());
    setAuth(response.data);

  };

  const logout = () => {
    window.location.hash = '#';
    window.localStorage.removeItem('token');
    setAuth({});
  };

  useEffect(() => {
    exchangeTokenForAuth();
  }, []);

  useEffect(() => {
    window.addEventListener('hashchange', () => {
      setParams(qs.parse(window.location.hash.slice(1)));
    });
  }, []);

  const createOrder = () => {
    const token = window.localStorage.getItem('token');
    axios.post('/api/createOrder', null , headers())
    .then( response => {
      setOrders([response.data, ...orders]);
      const token = window.localStorage.getItem('token');
      return axios.get('/api/getCart', headers())
    })
    .then( response => {
      setCart(response.data);
      setCartQuantity(0);
    });
    window.location.hash = '#';
  };

  const removeOrder = (orderId) => {
    axios.delete(`/api/removeOrder/${orderId}`, headers())
      .then(() => {
        setOrders(orders.filter(order => order.id !== orderId))
      })
      .catch(ex => console.log(ex))
  }

  const addToCart = (productId, num)=> {
    console.log(num)
      axios.post('/api/addToCart', { productId, num }, headers())
      .then( response => {
        const lineItem = response.data;
        const found = lineItems.find( _lineItem => _lineItem.id === lineItem.id);
        const itemQuantity = lineItems.filter(_lineItems => _lineItems.orderId === lineItem.orderId).reduce((acc, item)=>{
          acc = acc + item.quantity*1;
          return acc;
        }, 0 )
        if(!found){
          setLineItems([...lineItems, lineItem ])
          setCartQuantity(itemQuantity + lineItem.quantity)
        }
        else {
          const updated = lineItems.map(_lineItem => _lineItem.id === lineItem.id ? lineItem : _lineItem);
          setLineItems(updated);
          setCartQuantity(updated.filter(_lineItems => _lineItems.orderId === lineItem.orderId).reduce((acc, item)=>{
            acc = acc + item.quantity*1;
            return acc;
          }, 0 ));
        }
      });
  };
  const removeFromCart = (lineItem)=> {
    axios.delete(`/api/removeFromCart/${lineItem.id}`, headers())
    .then( () => {
      const itemQuantity = lineItems.filter(_lineItems => _lineItems.orderId === lineItem.orderId).reduce((acc, item)=>{
        acc = acc + item.quantity*1;
        return acc;
      }, 0 );
      const currentCart = lineItems.filter(_lineItem => _lineItem.id !== lineItem.id );
      console.log(currentCart)
      setLineItems(currentCart);
      setCartQuantity(itemQuantity - lineItem.quantity);
    });
  };

  const { view, id } = params;

  if (!auth.id) {
    return (
      <div>
        <Login login={login} />
        <CreateUserAccount createUserAccount={createUserAccount} />
      </div>
    );
  }
  else {
    return (
      <div>
        <a href='#'>
        <h1>Foo, Bar, Bazz.. etc Store</h1>
        </a>
        <h4>
          <a href='#view=cart'>
            Total items in cart: { cartQuantity }
          </a>
          <br />
          <a href='#view=orders'>
            Orders
          </a>
        </h4>
        <button onClick={ logout }>Logout { auth.username } </button>
        { !view && 
          <div className='horizontal'>
            <Products addToCart={ addToCart } products={ products } />

          </div>
        }
        {
          view === 'cart' && <Cart lineItems={ lineItems } removeFromCart={ removeFromCart } cart={ cart } createOrder={ createOrder } products={ products }/>
        }
        {
          view === 'orders' && <Orders lineItems={ lineItems } products={ products } orders={ orders } removeOrder={ removeOrder }/>
        }
          {
            view === 'product' && 
              <Product 
                id={id} 
                product={ products.find(product => product.id === id)}
                lineItem ={ lineItems.find(lineItem => lineItem.productId === id )} 
              />
          }
      </div>
    );
  }
};

export default App;
