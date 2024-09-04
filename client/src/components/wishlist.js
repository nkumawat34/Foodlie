import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdDelete } from "react-icons/md";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { addItemToCart } from './CartSlice';
import { fetchWishlistItems, removeWishlistItem } from './WishListSlice';

export default function Wishlist() {
  const products = useSelector(state => state.wishlist.items);
  const dispatch = useDispatch();

  const add_to_cart = (product) => {
    dispatch(addItemToCart(product));
    toast.success("Item Added", {
      position: "bottom-right"
    });
  };

  const handleRemove = (productName) => {
    dispatch(removeWishlistItem(productName));
    window.location.reload();
    toast.warn("Item Deleted", {
      position: "bottom-right"
    });
  };

  useEffect(() => {
    dispatch(fetchWishlistItems());
  }, [dispatch]);

  return (
    <div>
      <h1 className='text-center text-4xl'>WishList</h1>
      <div className='flex flex-row justify-center gap-4 flex-wrap'>
        {
          products && products.length > 0 ? (
            products.map((product) => (
              <div key={product.name} className='flex flex-col'>
                <h1 className='mt-5 text-3xl text-center'>{product.name}</h1>
                <img src={`/images/${product.name}.jpg`} alt={product.name} />
                <div className='flex gap-4 mt-4 justify-center'>
                  <button className='p-3 bg-red-400 rounded-lg' onClick={() => add_to_cart(product)}>Add to Cart</button>
                  <button className='p-3 bg-red-400 rounded-lg' onClick={() => add_to_cart(product)}>Buy Now</button>
                  <MdDelete size={30} color='red' onClick={() => handleRemove(product.name)} />
                </div>
              </div>
            ))
          ) : (
            <p className='text-center text-xl'>Your wishlist is empty</p>
          )
        }
      </div>
      <ToastContainer />
    </div>
  );
}
