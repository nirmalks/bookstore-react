import { Form, redirect } from 'react-router';
import FormInput from './FormInput';
import { SubmitBtn } from './SubmitBtn';
import { useForm } from 'react-hook-form';
import { formatPrice } from '../utils';
import { queryClient } from '../queryClient';
import { toast } from 'react-toastify';
import { clearCart } from '../features/cart/cartSlice';
import { api } from '../utils/api';

export const checkoutAction = (store, queryClient) => {
  return async ({ request }) => {
    const formData = await request.formData();
    const { name, address } = Object.fromEntries(formData);
    const user = store.getState().userState.user;

    console.log(userId);
    const { cartItems, orderTotal, numItemsInCart } =
      store.getState().cartState;

    const info = {
      userId: user.id,
      name,
      address,
      chargeTotal: orderTotal,
      orderTotal: formatPrice(orderTotal),
      cartItems,
      numItemsInCart,
    };

    try {
      const response = await api.post('/orders/direct', { data: info });
      queryClient.removeQueries(['orders']);
      store.dispatch(clearCart());
      toast.success('Order placed successfully');
      return redirect('/orders');
    } catch (error) {
      console.log(error);
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

  return (
    <Form method="POST" className="flex flex-col gap-y-4">
      <h4 className="font-medium text-xl capitalize">Address</h4>
      <FormInput label="Name" name="name" type="text" register={register} />
      <FormInput
        label="Address"
        name="address"
        type="text"
        register={register}
      />
      <div className="mt-4">
        <SubmitBtn text="Order now" />
      </div>
    </Form>
  );
};
export default CheckoutForm;
