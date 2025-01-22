import { ActionFunctionArgs, redirect, useSubmit } from 'react-router';
import FormInput from './FormInput';
import { SubmitBtn } from './SubmitBtn';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { clearCart } from '../features/cart/cartSlice';
import { api } from '../utils/api';
import { QueryClient } from '@tanstack/react-query';
import { StoreProps } from '../types/store';
import { getErrorMessage } from '../utils';
import { CheckoutFormData } from '../types/checkout';
import { Book } from '../types/books';

export const checkoutAction = (store: StoreProps, queryClient: QueryClient) => {
  return async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const { address, city, state, country, pinCode } =
      Object.fromEntries(formData);
    const user = store.getState().userState.user;
    const { cartItems } = store.getState().cartState;
    const orderItems = cartItems.map((item: Book) => {
      console.log(item);
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
      await api.post('/orders/direct', { ...info });
      queryClient.removeQueries({ queryKey: ['orders'] });
      store.dispatch(clearCart());
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
  const { register, handleSubmit } = useForm<CheckoutFormData>();
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
        />
        <FormInput label="City" name="city" type="text" register={register} />
        <FormInput label="State" name="state" type="text" register={register} />
        <FormInput
          label="Country"
          name="country"
          type="text"
          register={register}
        />
        <FormInput
          label="Pincode"
          name="pinCode"
          type="text"
          register={register}
        />
        <div className="mt-4 col-span-2">
          <SubmitBtn text="Order now" />
        </div>
      </div>
    </form>
  );
};
export default CheckoutForm;
