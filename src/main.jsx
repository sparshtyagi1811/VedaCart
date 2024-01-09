import React, { useState } from 'react';
import { PRODUCTS } from './product';

function Main() {
  const [cartItems, setCartItems] = useState([0, 0, 0, 0, 0, 0, 0, 0]);

  const addToCart = (id) => {
    setCartItems((cartItems) => ({ ...cartItems, [id]: cartItems[id] + 1 }));
  };

  const subFromCart = (id) => {
    setCartItems((cartItems) => ({ ...cartItems, [id]: cartItems[id] - 1 }));
  };

  const removeFromCart = (id) => {
    setCartItems((cartItems) => ({ ...cartItems, [id]: 0 }));
  };

  const totalAmount = () => {
    let amount = 0;
    for (const key in cartItems) {
      if (cartItems[key] > 0) {
        let productInfo = PRODUCTS.find((product) => product.id === Number(key));
        amount += Math.floor(cartItems[key] * productInfo.price);
      }
    }
    return amount;
  };

  return (
    <div className='flex flex-wrap justify-center items-center gap-20 p-10 pr-96'>
      {PRODUCTS.map((product) => (
        <div key={product.id}>
          <img className='w-40 h-40 object-contain' src={product.productImage} alt={product.productName} />
          <p>{product.productName}</p>
          <p>${product.price}</p>
          <button onClick={() => addToCart(product.id)} className='border-2 drop-shadow-2xl p-2 rounded hover:bg-green-300'>
            Add To Cart
          </button>
        </div>
      ))}

      <div className='fixed p-4 right-0 top-0 bg-blue-100 h-screen w-80 overflow-y-scroll'>
        <h1 className='text-white font-bold text-2xl'>Your Cart</h1>
        <p className='text-3xl font-blod'>Total: ${totalAmount()}</p>
        {PRODUCTS.map((product) => {
          if (cartItems[product.id] > 0) {
            return (
              <div key={product.id} className='flex justify-between items-center'>
                <div className='flex items-center'>
                  <img className='w-20 h-20 my-4' src={product.productImage} alt='' />
                  X <p className='text-2xl font-bold pl-2'>{cartItems[product.id]}</p>
                </div>
              </div>
            );
          }
          return null; // Added to handle the case when there are no items in the cart
        })}
      </div>
    </div>
  );
}

export default Main;
