// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import wishListReducer from './WishListSlice'
import cartReducer from './CartSlice'
import orderReducer from './OrderSlice'
import userReducer from './UserSlice'
import OrderSlice from './OrderSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist:wishListReducer,
    order:orderReducer,
    user:userReducer,
    order:OrderSlice
    // Add your slice reducers here
  },
});

export default store;
