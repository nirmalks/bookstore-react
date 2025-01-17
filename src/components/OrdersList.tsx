import dayjs from 'dayjs';
import { useLoaderData } from 'react-router';

const OrdersList = (): JSX.Element => {
  const { orders, meta } = useLoaderData();
  console.log(orders);
  return (
    <div className="mt-8">
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Address</th>
              <th>Num of Products</th>
              <th>Cost</th>
              <th className="hidden sm:block">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const id = order.id;
              const date = dayjs(order.placedDate).format(
                'MMM Do, YYYY - hh:mm a'
              );
              return (
                <tr key={id}>
                  <td>{order.address.address}</td>
                  <td>{order.items.length}</td>
                  <td>{order.totalCost}</td>
                  <td>{date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersList;
