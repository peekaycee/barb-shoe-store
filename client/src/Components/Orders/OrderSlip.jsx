/* eslint-disable react/prop-types */
import { useReducer, useState, useEffect, useCallback } from 'react';
import './OrderSlip.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const initialState = { count: 1 };

const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: Math.max(1, state.count - 1) };
    case 'reset':
      return initialState;
    default:
      return state;
  }
};

const OrderSlip = ({ product, userId, onSubmit, onClick }) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [brandName, setBrandName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (product) {
      const { variations, name } = product;
      if (variations && variations.length > 0) {
        setSize(variations[0].size);
        setColor(variations[0].color);
      } else {
        setSize('');
        setColor('');
      }
      setBrandName(name || '');
    }
  }, [product]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (state.count > product.stock) {
      setError(`Cannot purchase more than ${product.stock} items`);
      return;
    }

    const updatedStock = product.stock - state.count;
    const totalPrice = (product.price * state.count).toFixed(2);

    try {
      // Update the stock in the backend
      await axios.put(`/products/${product._id}`, { stock: updatedStock });

      const newOrder = {
        userId: userId,  // Use the dynamic userId here
        productId: product._id,
        imageUrl: product.imageUrl,
        name: product.name,
        price: product.price,
        quantity: state.count,
        status: 'Pending',
        variations: {
          size: product.variations[0]?.size,
          color: product.variations[0]?.color,
        },
        total: totalPrice,
      };

      await axios.post('/orders', newOrder);

      console.log('Order created successfully.');

      dispatch({ type: 'reset' });
      setSize('');
      setColor('');
      setBrandName('');
      onSubmit();

      navigate('/user/paymentGateway');
    } catch (error) {
      if (error.response) {
        console.error('Error creating order:', error.response.data.message);
      } else {
        console.error('Error creating order:', error.message);
      }
    }
  }, [state.count, product, userId, onSubmit, navigate]);

  const handleCloseOrderSlip = (e) => {
    e.preventDefault();
    onClick();
  };

  if (!product) {
    return <div>Please select a product to order.</div>;
  }

  const totalPrice = (product.price * state.count).toFixed(2);

  return (
    <div className='order-slip-container'>
      <div className='closeBtn' onClick={handleCloseOrderSlip}>
        x
      </div>
      <h3>Order</h3>
      <p className='instruction'>You can make changes to the fields below</p>
      <div className='order-slip'>
        <div className='itemImage'>
          <p className='price'>Price : ${product.price}</p>
          {product.imageUrl ? (
            <img
              src={`/assets/images/${product.imageUrl}`}
              alt={product.imageUrl}
            />
          ) : (
            <p>No image available</p>
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <div className='brand-name'>
            <label htmlFor='brand-name'>Product Name: </label>
            <input
              type='text'
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
            />
          </div>
          <div className='size'>
            <label htmlFor='size'>Size: </label>
            <input
              type='text'
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
          </div>
          <div className='color'>
            <label htmlFor='color'>Color: </label>
            <input
              type='text'
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
          <div className='quantity'>
            <label htmlFor='quantity'>Quantity: </label>
            <input type='number' value={state.count} readOnly />
            <div className='countButton'>
              <button
                type='button'
                onClick={() => dispatch({ type: 'decrement' })}
              >
                -
              </button>
              <button type='button' onClick={() => dispatch({ type: 'reset' })}>
                reset
              </button>
              <button
                type='button'
                onClick={() => dispatch({ type: 'increment' })}
              >
                +
              </button>
            </div>
          </div>
          <p>Total: ${totalPrice}</p>
          {error && <p className='error'>{error}</p>}
          <button type='submit' className='paymentBtn'>
            Make Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderSlip;