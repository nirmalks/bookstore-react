import { useSelector } from 'react-redux';
import SectionTitle from '../components/SectionTitle';
import { redirect } from 'react-router';
import { toast } from 'react-toastify';
import CartTotal from '../components/CartTotal';
import CheckoutForm from '../components/CheckoutForm';

export const checkoutLoader = (store) => () => {
  const user = store.getState().userState.user;
  if (!user) {
    toast.warn('You must be logged in to checkout');
    return redirect('/login');
  }
  return null;
};
const Checkout: React.FC = () => {
  const cartTotal = useSelector((state) => state.cartState.cartTotal);
  if (cartTotal === 0) {
    return <SectionTitle text="Your cart is empty" />;
  }
  return (
    <>
      <SectionTitle text="Place your order"></SectionTitle>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="mt-8 ">
          <CheckoutForm />
        </div>
        <div className="mt-8 md:grid-cols-1 items-start justify-center">
          <CartTotal />
        </div>
      </div>
    </>
  );
};

export default Checkout;
