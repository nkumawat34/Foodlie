import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders } from './OrderSlice';

export default function Orders() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.order.orders);
  const status = useSelector(state => state.order.status);
  const error = useSelector(state => state.order.error);
  const [token,setToken]=useState('')
  useEffect(() => {
    // Fetch orders when the component mounts
    if(localStorage.getItem('email'))
    dispatch(fetchOrders());
  }, [dispatch]);

  // Log products when they change
  useEffect(() => {
    console.log("Products:", products);
  }, [products]);

  useEffect(()=>{

    const token=localStorage.getItem("token")
    setToken(token)
  })
 // Handle loading and error states
 if (status === 'loading') {
  return <p>Loading...</p>;
}
  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

  return (
  
    <div>
      {token?
      <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-center text-4xl mb-8">Orders</h1>
      {products.length === 0 ? (
        <p>No orders available</p>
      ) : (
        products.map((product, index) => (
          <div key={index} className="flex flex-col border justify-center hover:shadow-lg transition-shadow duration-300 items-center gap-4 mt-4 w-[300px] p-4">
            <h1 className="text-2xl">Order {index + 1}</h1>
            <img src="/images/order.jfif" alt={`Order ${index + 1}`} className="w-full h-auto" />
            {product.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div className="text-xl">{idx + 1}. {item.name}</div>
                <div className="text-xl">Price: {item.price} × Quantity: {item.quantity}</div>
                <div className="text-xl">Total: {item.price * item.quantity}</div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
    :<h1 className='text-3xl text-center mt-5'>Please Sign in</h1>
      }
    </div>
  );
}
