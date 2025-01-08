import { createBrowserRouter } from 'react-router';
import HomeLayout from './pages/HomeLayout';
import ErrorPage from './pages/Error';
import Landing, { landingLoader } from './pages/Landing';
import Login, { loginAction } from './pages/Login';
import Register, { registerAction } from './pages/Register';

import About from './pages/About';
import { queryClient } from './queryClient';
import store from './store';
import Books, { booksLoader } from './pages/Books';
import SingleBook, { singleBookLoader } from './pages/SingleBook';
import Cart from './pages/Cart';
import Checkout, { checkoutLoader } from './pages/Checkout';
import { checkoutAction } from './components/CheckoutForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Landing></Landing>,
        errorElement: <ErrorPage />,
        loader: landingLoader(queryClient),
      },
      {
        path: '/about',
        element: <About />,
        errorElement: <ErrorPage></ErrorPage>,
      },
      {
        path: '/books',
        element: <Books />,
        errorElement: <ErrorPage></ErrorPage>,
        loader: booksLoader(queryClient),
      },
      {
        path: '/books/:id',
        element: <SingleBook />,
        errorElement: <ErrorPage></ErrorPage>,
        loader: singleBookLoader(queryClient),
      },
      {
        path: '/cart',
        element: <Cart />,
        errorElement: <ErrorPage></ErrorPage>,
      },
      {
        path: '/checkout',
        element: <Checkout />,
        errorElement: <ErrorPage></ErrorPage>,
        loader: checkoutLoader(store),
        action: checkoutAction(store, queryClient),
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorPage />,
    action: loginAction(store),
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <ErrorPage />,
    action: registerAction,
  },
]);

export default router;
