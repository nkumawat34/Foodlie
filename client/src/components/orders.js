import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders } from './OrderSlice';

export default function Orders() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.order.orders);
  const status = useSelector(state => state.order.status);
  const error = useSelector(state => state.order.error);

  useEffect(() => {
    // Fetch orders when the component mounts
    dispatch(fetchOrders());
  }, [dispatch]);

  // Log products when they change
  useEffect(() => {
    console.log("Products:", products);
  }, [products]);

 
 // Handle loading and error states
 if (status === 'loading') {
  return <p>Loading...</p>;
}
  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      
      <div className='flex flex-col'>
        <h1 className='text-center text-4xl'>Orders</h1>
        {products.length === 0 ? (
          <p>No orders available</p>
        ) : (
          products.map((product, index) => (
            <div key={index} className='flex flex-col justify-center items-center gap-4 mt-4 w-full'>
              <h1 className='text-2xl'>Order {index + 1}</h1>
              <img src="/images/order.jfif" alt={`Order ${index + 1}`} />
              {product.map((item, idx) => (
                <div key={idx} className='flex gap-4'>
                  <div className='text-1xl'>{idx + 1}. {item.name}</div>
                  <div className='text-1xl'>Price: {item.price} * Quantity: {item.quantity}</div>
                  <div className='text-1xl'>Total: {item.price * item.quantity}</div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
