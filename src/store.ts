import { configureStore } from '@reduxjs/toolkit';
import { setupInterceptors } from './utils/interceptors'; // Make sure the path is correct
import userReducer from './features/user/userSlice';
import cartReducer from './features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    userState: userReducer,
    cartState: cartReducer,
  },
  // middleware: (getDefaultMiddleware) => {
  //   console.log('Applying middleware...');
  //   return getDefaultMiddleware().concat(axiosMiddleware);

  // },
});

export default store;
setupInterceptors(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;