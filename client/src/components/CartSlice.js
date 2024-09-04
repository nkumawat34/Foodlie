// src/slices/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// Define the initial state
const initialState = {
  products: [],
  loading: false,
  status: "",
  error: null,
};

// Async thunks
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async () => {
    const email = localStorage.getItem("email");
    const response = await axios.get(`http://localhost:3001/api/cart/${email}`);
    return response.data;
  }
);

export const addItemToCart = createAsyncThunk(
  'cart/addItemToCart',
  async (item) => {
    try {
      const email = localStorage.getItem("email");
      const response = await axios.post(`http://localhost:3001/api/cart/item/${email}`, { item });
      return response.data; 
    } catch (error) {
      return { error: error.response ? error.response.data : error.message };
    }
  }
);

// Define the thunk for removing all items from the cart
export const removeAllItemsFromCart = createAsyncThunk(
  'cart/removeAllItemsFromCart',
  async (_, { rejectWithValue }) => {
    try {
      const email = localStorage.getItem("email");
     
      // Send a DELETE request to clear the cart
      await axios.delete(`http://localhost:3001/api/cart/clear/${email}`);
      
      return; // Return nothing on success
    } catch (error) {
      console.log(error.response.data)
      // Handle error and return a rejected value
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);
export const removeItemFromCart = createAsyncThunk(
  'cart/removeItemFromCart',
  async (product) => {
    const email = localStorage.getItem("email");
    
    await axios.delete(`http://localhost:3001/api/cart/item/${email}/${product.name}`);
    window.location.reload();

    return product.name
  }
);

export const increaseItemQuantity = createAsyncThunk(
  'cart/increaseItemQuantity',
  async (item) => {
    const email = localStorage.getItem("email");
    const response = await axios.put(`http://localhost:3001/api/cart/item/increase/${email}`, { item });
    return response.data;
  }
);

export const decreaseItemQuantity = createAsyncThunk(
  'cart/decreaseItemQuantity',
  async (item) => {
    const email = localStorage.getItem("email");
    const response = await axios.put(`http://localhost:3001/api/cart/item/decrease/${email}`, { item });
    return response.data;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.products = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload.cart;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        const item = action.payload;
        const existingItem = state.products.find(prod => prod.name === item.name);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.products.push({ ...item, quantity: 1 });
        }
        toast.success('Item added to cart');
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        
        if(action.payload.name=="")
          state.products=[]
        else
        state.products = state.products.filter(item => item.name !== action.payload.name);
        toast.success('Item removed from cart');
      })
      .addCase(increaseItemQuantity.fulfilled, (state, action) => {
        const item = action.payload;
        const existingItem = state.products.find(prod => prod.name === item.name);
        if (existingItem) {
          existingItem.quantity += 1;
        }
        toast.success('Item quantity increased');
      })
      .addCase(decreaseItemQuantity.fulfilled, (state, action) => {
        const item = action.payload;
        const existingItem = state.products.find(prod => prod.name === item.name);
        if (existingItem) {
          existingItem.quantity -= 1;
          if (existingItem.quantity === 0) {
            state.products = state.products.filter(prod => prod.name !== item.name);
          }
        }
        toast.success('Item quantity decreased');
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
