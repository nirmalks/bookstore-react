import { screen } from '@testing-library/react';

import { renderWithProviders } from './test-utils';
import { Book } from '../types/books';
import userEvent from '@testing-library/user-event';
import Checkout from '../pages/Checkout';
import { QueryClient } from '@tanstack/react-query';
import { RouteObject } from 'react-router';
import CheckoutForm, { checkoutAction } from '../components/CheckoutForm';
import store from '../store';

jest.mock('../utils/api');
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useLoaderData: jest.fn(),
  useSubmit: jest.fn(() => mockSubmit),
}));

const mockSubmit = jest.fn();

const routes: RouteObject[] = [
  {
    path: '/',
    element: <CheckoutForm />,
    action: checkoutAction(store, new QueryClient()),
  },
  {
    path: '/orders',
    element: <div>Orders Page</div>,
  },
];
describe('Checkout Page Tests', () => {
  const sampleBook: Book = {
    id: 1,
    title: 'The Pragmatic Programmer',
    authorIds: [101],
    price: 42.99,
    stock: 12,
    isbn: '978-0201616224',
    publishedDate: '1999-10-30',
    genreIds: [5],
    imagePath: '/images/pragmatic-programmer.jpg',
    quantity: 1,
  };

  const book2 = {
    id: 2,
    title: 'Clean Code',
    authorIds: [102],
    price: 35.5,
    stock: 7,
    isbn: '978-0132350884',
    publishedDate: '2008-08-11',
    genreIds: [3],
    imagePath: '/images/clean-code.jpg',
    quantity: 2,
  };

  test('shows "Your cart is empty" when no items', () => {
    renderWithProviders(<Checkout />, {
      preloadedState: {
        cartState: {
          cartItems: [],
          numItemsInCart: 0,
          cartTotal: 0,
          shipping: 0,
          tax: 0,
          orderTotal: 0,
        },
        userState: {
          user: null,
          theme: 'light',
        },
      },
    });

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  test('shows items and order now button when item is present', () => {
    renderWithProviders(<Checkout />, {
      preloadedState: {
        cartState: {
          cartItems: [sampleBook],
          numItemsInCart: 1,
          cartTotal: 1,
          shipping: 10,
          tax: 20,
          orderTotal: 42.99,
        },
        userState: {
          user: null,
          theme: 'light',
        },
      },
    });

    expect(screen.getByText(/42.99/i)).toBeInTheDocument();
    expect(screen.getByText(/10.00/i)).toBeInTheDocument();
    expect(screen.getByText(/1.00/i)).toBeInTheDocument();
    expect(screen.getByText(/20.00/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /order now/i })
    ).toBeInTheDocument();
  });

  test('filling the form with valid values will place the order', async () => {
    renderWithProviders(<Checkout />, {
      preloadedState: {
        cartState: {
          cartItems: [sampleBook],
          numItemsInCart: 1,
          cartTotal: 1,
          shipping: 10,
          tax: 20,
          orderTotal: 42.99,
        },
        userState: {
          user: null,
          theme: 'light',
        },
      },
      routes,
    });

    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/address/i), 'address');
    await user.type(screen.getByLabelText(/city/i), 'chennai');
    await user.type(screen.getByLabelText(/state/i), 'tnasd');
    await user.type(screen.getByLabelText(/country/i), 'inasds');
    await user.type(screen.getByLabelText(/pincode/i), '600077');
    await user.click(screen.getByRole('button', { name: /order now/i }));
    expect(mockSubmit).toHaveBeenCalledTimes(1);
    const submittedData = mockSubmit.mock.calls[0][0];

    expect(submittedData.address).toBe('address');
    expect(submittedData.city).toBe('chennai');
    expect(submittedData.state).toBe('tnasd');
    expect(submittedData.country).toBe('inasds');
    expect(submittedData.pinCode).toBe('600077');
  });
});
