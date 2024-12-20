import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  user: {},
  theme: {},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

  },
});

export default cartSlice.reducer;