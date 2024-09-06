import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// Async thunk to fetch wishlist items
export const fetchWishlistItems = createAsyncThunk(
  'wishlist/fetchWishlistItems',
  async (_, { rejectWithValue }) => {
    try {
      const email=localStorage.getItem("email")
      const response = await axios.get(`https://foodlie-backend.onrender.com/api/wishlistitem/${email}`);
     // console.log(response.data.wishlist)
      return response.data.wishlist;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to add an item to the wishlist
export const addWishlistItem = createAsyncThunk(
  'wishlist/addWishlistItem',
  async (item, { rejectWithValue }) => {
    try {
      const email=localStorage.getItem("email")
      const token=localStorage.getItem("token")
      const response = await axios.post(
        `https://foodlie-backend.onrender.com/api/wishlistitem/${email}`,
        { item },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the Authorization header
          },
        }
      );
      toast.success('Item added to wishlist!');
      return response.data;
    } catch (error) {
      console.log(error.response.data)
      toast.error('Failed to add item to wishlist');
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to remove an item from the wishlist
export const removeWishlistItem = createAsyncThunk(
  'wishlist/removeWishlistItem',
  async (name, { rejectWithValue }) => {
    try {
     
      const email=localStorage.getItem("email")
      const token=localStorage.getItem("token")
      const response = await axios.delete(
        `https://foodlie-backend.onrender.com/api/wishlistitem/${email}/${name}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the Authorization header
          },
        }
      );
     // window.location.reload()
      toast.success('Item removed from wishlist!');
      return name;
    } catch (error) {
      console.log(error)
      toast.error('Failed to remove item from wishlist');
      return rejectWithValue(error.response.data);
    }
  }
);

const wishListSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    // Additional reducers if needed
  },
  extraReducers: (builder) => {
    builder
      // Handle fetch wishlist items
      .addCase(fetchWishlistItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWishlistItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchWishlistItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Handle add wishlist item
      .addCase(addWishlistItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addWishlistItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(addWishlistItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Handle remove wishlist item
      .addCase(removeWishlistItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeWishlistItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = state.items.filter(item => item.name !== action.payload);
      })
      .addCase(removeWishlistItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default wishListSlice.reducer;
