import { createSlice } from '@reduxjs/toolkit'




const initialState={
  user: {
    name:"",
    email:""

  },
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    
    add_user: (state, action) => {
      state.user=action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {  add_user } = userSlice.actions

export default userSlice.reducer