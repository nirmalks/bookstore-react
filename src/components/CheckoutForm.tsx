import { Form, redirect, useSubmit } from 'react-router';
import FormInput from './FormInput';
import { SubmitBtn } from './SubmitBtn';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { clearCart } from '../features/cart/cartSlice';
import { api } from '../utils/api';

export const checkoutAction = (store, queryClient) => {
  return async ({ request }) => {
    const formData = await request.formData();
    console.log(Object.fromEntries(formData));
    const { address, city, state, country, pinCode } =
      Object.fromEntries(formData);
    const user = store.getState().userState.user;
    const { cartItems, orderTotal, numItemsInCart } =
      store.getState().cartState;
    const orderItems = cartItems.map((item) => {
      console.log(item);
      return {
        price: item.price,
        quantity: item.quantity,
        bookId: item.id,
      };
    });
    const info = {
      userId: user.userId,
      address: { address, city, state, country, pinCode },
      items: orderItems,
    };

    try {
      const response = await api.post('/orders/direct', { ...info });
      queryClient.removeQueries(['orders']);
      store.dispatch(clearCart());
      toast.success('Order placed successfully');
      return redirect('/orders?page=0');
    } catch (error) {
      if (error.isAuthError) {
        return redirect('/login');
      }
      const errorMessage =
        error?.response?.data?.error?.message ||
        'There was an error placing your order';
      toast.error(errorMessage);
      return null;
    }
  };
};
const CheckoutForm = () => {
  const { register, handleSubmit } = useForm();
  const submit = useSubmit();
  const onSubmit = (data) => {
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
