import { ActionFunctionArgs, redirect, useSubmit } from 'react-router';
import FormInput from './FormInput';
import { SubmitBtn } from './SubmitBtn';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { clearCart } from '../features/cart/cartSlice';
import { api } from '../utils/api';
import { QueryClient } from '@tanstack/react-query';
import { getErrorMessage } from '../utils';
import { CheckoutFormData } from '../types/checkout';
import { Book } from '../types/books';
import { AppState } from '../types/store';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../store';

export const checkoutAction = (queryClient: QueryClient) => {
  return async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const dispatch = useAppDispatch();
    const { address, city, state, country, pinCode } =
      Object.fromEntries(formData);
    const { user } = useSelector((state: AppState) => state.userState);
    const { cartItems } = useSelector((state: AppState) => state.cartState);
    const orderItems = cartItems.map((item: Book) => {
      return {
        price: item.price,
        quantity: item.quantity,
        bookId: item.id,
      };
    });
    const info = {
      userId: user?.userId,
      address: { address, city, state, country, pinCode },
      items: orderItems,
    };

    try {
      const response = await api.post('/orders/direct', { ...info });
      if (response.status !== 200 || !response.data) {
        throw new Error('Failed to place order');
      }
      queryClient.removeQueries({ queryKey: ['orders'] });
      dispatch(clearCart());
      toast.success('Order placed successfully');
      return redirect('/orders?page=0');
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
      return null;
    }
  };
};
const CheckoutForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>();
  const submit = useSubmit();
  const onSubmit = (data: CheckoutFormData) => {
    return submit(data, { method: 'post' });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
      <h4 className="font-medium text-xl capitalize">Address</h4>
      <div className="mt-8 grid gap-4 md:grid-cols-2 items-start">
        <FormInput
          label="Address"
          name="address"
          type="text"
          register={register}
          validationSchema={{
            required: 'address is required',
          }}
          error={errors.address}
        />
        <FormInput
          label="City"
          name="city"
          type="text"
          register={register}
          validationSchema={{
            required: 'city  is required',
          }}
          error={errors.city}
        />
        <FormInput
          label="State"
          name="state"
          type="text"
          register={register}
          validationSchema={{
            required: 'state  is required',
          }}
          error={errors.state}
        />
        <FormInput
          label="Country"
          name="country"
          type="text"
          register={register}
          validationSchema={{
            required: 'country  is required',
          }}
          error={errors.country}
        />
        <FormInput
          label="Pincode"
          name="pinCode"
          type="text"
          register={register}
          validationSchema={{
            required: 'pincode is required',
          }}
          error={errors.pinCode}
        />
        <div className="mt-4 col-span-2">
          <SubmitBtn text="Order now" />
        </div>
      </div>
    </form>
  );
};
export default CheckoutForm;
