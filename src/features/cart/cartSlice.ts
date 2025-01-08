import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 50,
  tax: 0,
  orderTotal: 0,
};

const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('cart')) || defaultState;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: getCartFromLocalStorage(),
  reducers: {
    addItem: (state, action) => {
      const { book } = action.payload
      const existingBook = state.cartItems.find((existingBook) => book.id === existingBook?.id)
      console.log(existingBook)
      if (existingBook) {
        existingBook.quantity += book.quantity;
      } else {
        state.cartItems.push(book)
      }

      state.numItemsInCart += book.quantity;
      state.cartTotal += book.price * book.quantity;
      cartSlice.caseReducers.calculateTotal(state)
      toast.success('Item added to cart');
    },
    clearCart: () => {
      localStorage.setItem('cart', JSON.stringify(defaultState));
      return defaultState;
    },
    removeItem: (state, action) => {
      const { id } = action.payload
      const existingBook = state.cartItems.find((existingBook) => existingBook.id === id);
      console.log(existingBook)
      state.cartItems = state.cartItems.filter((book) => book.id !== id)
      state.numItemsInCart -= existingBook.quantity
      state.cartTotal -= existingBook.price * existingBook.quantity
      cartSlice.caseReducers.calculateTotal(state)
      toast.success('Item removed from cart');
    },
    editItem: (state, action) => {
      const { id, quantity } = action.payload
      const book = state.cartItems.find((existingBook) => existingBook.id === id);
      state.numItemsInCart += quantity - book.quantity
      state.cartTotal += book.price * (quantity - book.quantity)
      book.quantity = quantity
      cartSlice.caseReducers.calculateTotal(state);
      toast.success('Cart updated');
    },
    calculateTotal: (state) => {
      state.tax = 0.1 * state.cartTotal;
      state.orderTotal = state.cartTotal + state.shipping + state.tax;
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

export const { addItem, clearCart, removeItem, editItem } = cartSlice.actions;
export default cartSlice.reducer;