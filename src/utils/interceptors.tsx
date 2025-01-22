import { redirect } from 'react-router';
import { AppDispatch, RootState } from '../store';
import { api } from './api';

export const setupInterceptors = (store: {
  getState: () => RootState;
  dispatch: AppDispatch;
}) => {
  api.interceptors.request.use(
    (config) => {
      console.log('Request Interceptor Triggered');
      const state = store.getState();
      const token = state.userState.user?.token;
      if (token) {
        config.headers.Authorization = `${token}`;
      }
      return config;
    },
    (error) => {
      console.log('Request Error:', error);
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      console.log('Response Interceptor Triggered');
      return response;
    },
    (error) => {
      console.log('insie error', error.response);

      if (error.response) {
        console.log('inside err resp', error.response.status);
        if (error.response.status === 401 || error.response.status === 403) {
          console.error('Unauthorized. Logging out...');
          error.isAuthError = true;
          return redirect('/login');
        }
      } else if (error.request) {
        console.error('No response from server.');
      } else {
        console.error('Error:', error.message);
      }
      return Promise.reject(error);
    }
  );
};
