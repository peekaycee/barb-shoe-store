import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './OrdersList.css';

function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Fetching orders...');
    axios
      .get('/orders')
      .then((response) => {
        console.log('Orders fetched:', response.data);
        setOrders(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
        setError('Error fetching orders');
        setLoading(false);
      });
  }, []);

  const deleteOrder = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this order?'
    );
    if (!confirmed) return;

    try {
      await axios.delete(`/orders/${id}`);
      setOrders(orders.filter((order) => order._id !== id));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className='usersList'>
      <h2>Orders Details</h2>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Product</th>
            <th>Variations</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const total = order.price * order.quantity;
            const formattedTotal = isNaN(total) ? '-' : `$${total.toFixed(2)}`;

            return (
              <tr key={order._id}>
                <td>
                  <img
                    src={`/assets/images/${order.imageUrl}`}
                    alt={order.product}
                    style={{ width: '100px', height: 'auto' }}
                  />
                </td>
                <td>
                  <p>{order.name}</p>
                </td>
                <td>
                  {order.variations.map((variation, index) => (
                    <div key={index}>
                      <p>Color: {variation.color}</p>
                      <p>Size: {variation.size}</p>
                    </div>
                  ))}
                </td>
                <td>
                  <p>${order.price}</p>
                </td>
                <td>
                  <p>{order.quantity}</p>
                </td>
                <td>
                  <p>{formattedTotal}</p>
                </td>{' '}
                {/* Conditionally rendered total */}
                <td>
                  <p
                    className={
                      order.status === 'Delivered'
                        ? 'status-delivered'
                        : order.status === 'Pending'
                        ? 'status-pending'
                        : 'status-not-delivered'
                    }>
                    {order.status}
                  </p>
                </td>
                <td>
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={{ cursor: 'pointer' }}
                    onClick={() => deleteOrder(order._id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

export default OrdersList;
