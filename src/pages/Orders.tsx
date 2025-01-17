import { redirect } from 'react-router';
import { toast } from 'react-toastify';
import SectionTitle from '../components/SectionTitle';
import { api } from '../utils/api';
import OrdersList from '../components/OrdersList';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import dayjs from 'dayjs';
import PaginationContainer from '../components/PaginationContainer';
dayjs.extend(advancedFormat);
const ordersQuery = (params, user) => {
  console.log(user);
  return {
    queryKey: ['orders', user.userId, params.page ? parseInt(params.page) : 1],
    queryFn: () =>
      api.get(`/orders/${user.userId}`, {
        params,
      }),
  };
};

export const ordersLoader =
  (store, queryClient) =>
  async ({ request }) => {
    const user = store.getState().userState.user;

    if (!user) {
      toast.warn('You must logged in to view orders');
      return redirect('/login');
    }
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    try {
      const response = await queryClient.ensureQueryData(
        ordersQuery(params, user)
      );
      const { content: orders, ...meta } = response.data;
      return { orders, meta, user };
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error?.message || 'Unable to view orders';
      toast.error(errorMessage);
      return null;
    }
  };

const Orders = (): JSX.Element => {
  return (
    <>
      <SectionTitle text="Orders"></SectionTitle>
      <OrdersList></OrdersList>
      <PaginationContainer></PaginationContainer>
    </>
  );
};
export default Orders;
