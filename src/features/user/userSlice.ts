import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getThemeFromLocalStorage, getUserFromLocalStorage, themes } from '../../utils';

const initialState = {
  user: getUserFromLocalStorage(),
  theme: getThemeFromLocalStorage()
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const user = { ...action.payload }
      state.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem('user')
      toast.success('Logged out successfully');
    },
    toggleTheme: (state) => {
      const { light, dark } = themes;
      state.theme = state.theme === light ? dark : light;
      document.documentElement.setAttribute('data-theme', state.theme);
      localStorage.setItem('theme', state.theme)
    }
  },
});
export const { loginUser, logoutUser, toggleTheme } = userSlice.actions
export default userSlice.reducer;