import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { addItemToCart, fetchCart, removeItemFromCart, increaseItemQuantity, decreaseItemQuantity, removeAllItemsFromCart } from './CartSlice';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { addOrderAsync } from './OrderSlice';

export default function Cart() {
  const { products, loading } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Fetch the cart items from the store when the component mounts
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    // Update cartItems whenever products change
    setCartItems(products);

    // Calculate total price whenever products or cartItems change
    let total1 = 0;
    products.forEach(product => {
      total1 += product.price * product.quantity;
    });
    setTotal(total1);
  }, [products]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      return prevItems.map(item =>
        item.name === product.name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    });
    dispatch(increaseItemQuantity(product));
  };

  const decreaseQuantity = (product) => {
    setCartItems(prevItems => {
      return prevItems
        .map(item =>
          item.name === product.name
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0); // Remove if quantity is 0
    });

    dispatch(decreaseItemQuantity(product));
  };

  const clearcart = async () => {
    try {
      // 1. Dispatch the action to add the order
      await dispatch(addOrderAsync(cartItems)).unwrap();

      // 2. Dispatch the action to remove all items from the cart
      dispatch(removeAllItemsFromCart());

        // 3. Reset the local state for cart items
        setCartItems([]);
        
        // 4. Show a success message
        toast.success("Cart cleared successfully", {
            position: "bottom-right",
        });
      // 3. Reset the local state for cart items and total
      setCartItems([]);
      setTotal(0);

      // 4. Show a success message
      toast.success("Cart cleared successfully", {
        position: "bottom-right",
      });

    } catch (error) {
      // Handle any errors during the dispatch
      toast.error(`Failed to clear cart: ${error.message}`, {
        position: "bottom-right",
      });
      console.error('Error:', error);
    }
  };

  return (
    <>
      {products.length > 0 ?
        <div>
          <h1 className='text-center text-3xl mt-5'>Your Shopping Cart</h1>
          <div className='flex ml-[15%] gap-4 mt-5'>
            <div className='md:basis-2/5 basis-3/5 border'>Product</div>
            <div className='basis-1/5 md:border md:ml-0 ml-[45%]'>Price</div>
            <div className='basis-1/5 border'>Quantity</div>
            <div className='border basis-1/5 md:ml-0 ml-[8%]'>Subtotal</div>
          </div>
          <div className='flex flex-col gap-4 ml-[15%] mt-5'>
            {cartItems && cartItems.map((product, index) => (
              <div className='w-[250px] flex gap-5 gap-2 ' key={index}>
                <h1>{index + 1}. {product.name}</h1>
                <img src={`/images/${product.name}.jpg`} style={{ width: "20vw", height: "20vh" }} alt={product.name} />
                <div>
                  <h1 className='lg:w-[200px] xl:w-[300px] text-center md:ml-[10rem] lg:ml-[8rem] sm:ml-[6rem] ml-[30px]'>{product.price}</h1>
                </div>
                <div className='flex gap-1 ml-[6vw]'>
                  <CiSquarePlus onClick={() => addToCart(product)} className='mt-1' />
                  <h1>{product.quantity}</h1>
                  <CiSquareMinus onClick={() => decreaseQuantity(product)} className='mt-1' />
                </div>
                <div className='ml-[10vw]'>
                  ${product.quantity * product.price}
                </div>
                <div className='mt-1'>
                  <MdDelete onClick={() => {
                    dispatch(removeItemFromCart(product));
                    toast.warning("Deleted Successfully", {
                      position: "bottom-right"
                    });
                  }} />
                </div>
              </div>
            ))}
            <div className='flex justify-center mr-[15%] text-3xl'>Total Price: ${total}</div>
          </div>
          <div className='flex justify-center'>
            <button className='bg-lime-500 p-3 mt-5' onClick={clearcart}>Proceed To Payment</button>
          </div>
        </div>
        : <div className='flex justify-center text-3xl mt-5'>Sorry, no items in the cart</div>}
      <ToastContainer />
    </>
  );
}
