import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Async thunk for fetching orders
export const fetchOrders = createAsyncThunk(
    'order/fetchOrders',
    async (_, { rejectWithValue }) => {
        try {
            // Retrieve email from localStorage
            const email = localStorage.getItem("email");
            if (!email) throw new Error('User email not found in localStorage');

            const response = await axios.get(`http://localhost:3001/api/orders/${email}`);
            return response.data; // Assuming response.data is an array of orders
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

/// Async thunk for adding an order
export const addOrderAsync = createAsyncThunk(
    'order/addOrderAsync',
    async (order, { rejectWithValue }) => {
        try {
            // Retrieve email from localStorage
            const email = localStorage.getItem("email");
            const token=localStorage.getItem("token")

            if (!email) {
                throw new Error('User email not found in localStorage');
            }

            console.log("Order before sending to backend:", order);

            // Send POST request to the server with the order data
            const response = await axios.post(
                `http://localhost:3001/api/orders/${email}`,
                { order },
                {
                  headers: {
                    Authorization: `Bearer ${token}`, // Add the token to the Authorization header
                  },
                }
              );

            console.log("Response from server:", response.data);

            return response.data; // Assuming response.data contains the updated user with orders
        } catch (error) {
            console.error("Error occurred while adding order:", error.response ? error.response.data : error.message);

            // Return the error message to the Redux store
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);


const OrderListSlice = createSlice({
    name: 'order',
    initialState: {
        orders: [],
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        // Fetch orders
        builder
            .addCase(fetchOrders.pending, (state) => {
                
                state.status = 'loading';
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                
                state.status = 'succeeded';
                state.orders = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
           
                state.status = 'failed';
                state.error = action.payload;
            });

        // Add order
        builder
            .addCase(addOrderAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addOrderAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orders.push(action.payload);
                toast.success("Order added successfully", { position: "bottom-right" });
            })
            .addCase(addOrderAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                toast.error("Failed to add order", { position: "bottom-right" });
            });
    },
});

export const { removeOrder } = OrderListSlice.actions;
export default OrderListSlice.reducer;
