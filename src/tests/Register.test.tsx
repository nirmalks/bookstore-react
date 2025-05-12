import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as ReactRouter from 'react-router';
import { createMemoryRouter, RouterProvider } from 'react-router';
import Register from '../pages/Register';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useLoaderData: jest.fn(),
  useSubmit: jest.fn(() => mockSubmit),
}));

const mockSubmit = jest.fn();

const renderComponent = () => {
  (ReactRouter.useSubmit as jest.Mock).mockReturnValue(mockSubmit);

  const routes = [
    {
      path: '/',
      element: <Register />,
    },
  ];
  const router = createMemoryRouter(routes, {
    initialEntries: ['/'],
  });

  render(<RouterProvider router={router} />);
};

describe('register page', () => {
  beforeEach(() => {
    mockSubmit.mockClear();
    (ReactRouter.useSubmit as jest.Mock).mockReturnValue(mockSubmit);
  });
  test('register will display the initial fields', () => {
    renderComponent();

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /register/i })
    ).toBeInTheDocument();
  });

  test('submits form with correct data', async () => {
    renderComponent();
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/username/i), 'nirmalk');
    await user.type(screen.getByLabelText(/email/i), 'n@mail.com');
    await user.type(screen.getByLabelText(/password/i), 'password');
    await user.click(screen.getByRole('button', { name: /register/i }));
    expect(mockSubmit).toHaveBeenCalledTimes(1);
    const submittedData = mockSubmit.mock.calls[0][0];

    expect(submittedData.username).toBe('nirmalk');
    expect(submittedData.password).toBe('password');
    expect(submittedData.email).toBe('n@mail.com');
  });

  test('submits form with invalid username will show error and prevent submission', async () => {
    renderComponent();
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/username/i), 'ni');
    await user.type(screen.getByLabelText(/email/i), 'n@mail.com');
    await user.type(screen.getByLabelText(/password/i), 'password');
    await user.click(screen.getByRole('button', { name: /register/i }));
    expect(mockSubmit).toHaveBeenCalledTimes(0);
    expect(
      screen.getByText(/Please enter a minimum of 3 characters/i)
    ).toBeInTheDocument();
  });
});
