import { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import RefreshIcon from '@mui/icons-material/Refresh';
import './OrdersList.css';

function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = () => {
    setLoading(true);
    axios
      .get('/orders')
      .then((response) => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error fetching orders');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const reloadPage = () => {
    fetchOrders();
  };

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

  const confirmOrder = async (id) => {
    const confirmed = window.confirm(
      'Are you sure this order is delivered?'
    );
    if (!confirmed) return;

    try {
      await axios.put(`/orders/${id}`, { status: 'Delivered' });
      setOrders(orders.map((order) => 
        order._id === id ? { ...order, status: 'Delivered' } : order
      ));
    } catch (error) {
      console.error('Error updating the status of this order:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className='ordersList'>
      <h2>Order Details</h2>
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
            <th className='refresh' onClick={reloadPage}>
            <RefreshIcon style={{ marginLeft: '10px', cursor: 'pointer' }} />
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const total = order.price * order.quantity;

            return (
              <tr key={order._id}>
                <td>
                  <img
                    src={`/assets/images/${order.imageUrl}`}
                    alt={order.name}
                    style={{ width: '100px', height: 'auto' }}
                  />
                </td>
                <td>{order.name}</td>
                <td>
                  {order.variations.map((variation, index) => (
                    <div key={index}>
                      <p>Color: {variation.color}</p>
                      <p>Size: {variation.size}</p>
                    </div>
                  ))}
                </td>
                <td>${order.price}</td>
                <td>{order.quantity}</td>
                <td>${total.toFixed(2)}</td>
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
                  {
                    order.status === 'Delivered'
                    ? <DoneAllIcon style={{ cursor: 'pointer', color: 'lightgreen' }} />
                    : <CheckIcon style={{ marginRight: '10px', cursor: 'pointer', color: 'red' }}
                    onClick={() => confirmOrder(order._id)}/> 
                  }
                </td>
                <td>
                <DeleteIcon 
                style={{ cursor: 'pointer', color: 'red' }}
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