import { createBrowserRouter } from 'react-router';
import HomeLayout from './pages/HomeLayout';
import ErrorPage from './pages/Error';
import Landing, { landingLoader } from './pages/Landing';
import Login, { loginAction } from './pages/Login';
import Register, { registerAction } from './pages/Register';

import About from './pages/About';
import { queryClient } from './queryClient';
import store from './store';

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
