/* eslint-disable react/prop-types */
import { useReducer, useState, useEffect } from 'react';
import './OrderSlip.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OrderSlip = ({ product, onSubmit, onClick }) => {
  const initialState = { count: 1 };
  const navigate = useNavigate();

  const reducer = (state, action) => {
    switch (action.type) {
      case 'increment':
        return { ...state, count: state.count + 1 };
      case 'decrement':
        return state.count > 1 ? { ...state, count: state.count - 1 } : state;
      case 'reset':
        return initialState;
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [brandName, setBrandName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (product && product.variations && product.variations.length > 0) {
      setSize(product.variations[0].size);
      setColor(product.variations[0].color);
    } else {
      setSize('');
      setColor('');
    }
    if (product && product.name) {
      setBrandName(product.name);
    } else {
      setBrandName('');
    }
  }, [product]);

  const handleSubmit = () => {
    if (state.count > product.stock) {
      setError(`Cannot purchase more than ${product.stock} items`);
      return;
    }
    const updatedStock = product.stock - state.count;

    // Update the stock in the backend
    axios.put(`/products/${product._id}`, { stock: updatedStock })
      .then(response => {
        console.log('Stock updated:', response.data);
        console.log('Quantity:', state.count);
        console.log('Total:', totalPrice);
        dispatch({ type: 'reset' });
        setSize('');
        setColor('');
        setBrandName('');
        onSubmit();
      })
      .catch(error => {
        console.error('Error updating stock:', error);
      });
  };

  const makePayment = () => {
    handleSubmit();
    if (state.count <= product.stock) {
      navigate('/user/paymentGateway');
    }
  };

  const handleCloseOrderSlip = () => {
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
            <img src={product.imageUrl} alt={product.name} />
          ) : (
            <p>No image available</p>
          )}
        </div>
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
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
          <button type='submit' className='paymentBtn' onClick={makePayment}>
            Make Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderSlip;