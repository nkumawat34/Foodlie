import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders } from './OrderSlice';

export default function Orders() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.order.orders);
  const status = useSelector((state) => state.order.status);
  const error = useSelector((state) => state.order.error);
  const [token, setToken] = useState('');

  useEffect(() => {
    if (localStorage.getItem('email')) {
      dispatch(fetchOrders());
    }
  }, [dispatch]);

  useEffect(() => {
    console.log("Products:", products);
  }, [products]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  if (status === 'loading') {
    return <p className="text-center text-2xl text-blue-500">Loading...</p>;
  }
  if (status === 'failed') {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="min-h-screen  p-8">
      {token ? (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-10">Your Orders</h1>
          {products.length === 0 ? (
            <p className="text-lg text-gray-600">No orders available</p>
          ) : (
            products.map((product, index) => (
              <div
                key={index}
                className="bg-white shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 rounded-lg overflow-hidden w-[350px] mb-8"
              >
                <h1 className="text-xl font-semibold text-gray-700 bg-blue-100 p-4">
                  Order {index + 1}
                </h1>
                <img
                  src="/images/order.jfif"
                  alt={`Order ${index + 1}`}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  {product.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center border-b py-3 last:border-b-0"
                    >
                      <div className="text-lg font-medium text-gray-700">
                        {idx + 1}. {item.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        Price: <span className="text-green-600">&#x20B9;</span> {item.price} × Quantity: {item.quantity} = <span className="font-semibold text-gray-700">&#x20B9; {item.price * item.quantity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <h1 className="text-3xl font-bold text-red-500 text-center mt-20">Please Sign in</h1>
      )}
    </div>
  );
}
