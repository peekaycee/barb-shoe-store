import { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductsList.css';
import OrderSlip from '../Orders/OrderSlip';

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderSlipVisible, setOrderSlipVisible] = useState(false);
  const [blur, setBlur] = useState('');

  useEffect(() => {
    console.log('Fetching products...');
    axios
      .get('/products')
      .then((response) => {
        console.log('Products fetched:', response.data);
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setError('Error fetching products');
        setLoading(false);
      });
  }, []);

  const handleOrderClick = (product) => {
    setSelectedProduct(product);
    setOrderSlipVisible(true);
    setBlur('blur');
  };

  const handleCloseOrderSlip = () => {
    setOrderSlipVisible(false);
    setBlur('');
  };

  const handleOrderSubmit = () => {
    // Update the product stock in the local state after successful order
    const updatedProducts = products.map(p => 
      p._id === selectedProduct._id 
        ? { ...p, stock: p.stock - selectedProduct.stock }
        : p
    );
    setProducts(updatedProducts);
    setOrderSlipVisible(false);
    setBlur('');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className='products-container' id={blur}>
        <h1>Products</h1>
        <ul className='productlists'>
          {products.map((product) => (
            <li key={product._id}>
              <div className='product-card'>
                <div className='card-image'>
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt='The product image' />
                  ) : (
                    'thumbnail'
                  )}
                </div>
                <div className='card-details'>
                  <h2>{product.name ? product.name : '...'}</h2>
                  <p>
                    <span>Price</span> :{' '}
                    {product.price ? `$${product.price}` : '$'}
                  </p>
                  <div>
                    {product.variations && product.variations.length > 0 ? (
                      product.variations.map((variation, index) => (
                        <div key={index}>
                          <p>
                            <span>Color</span> : {variation.color}
                          </p>
                          <p>
                            <span>Size</span> : {variation.size}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p>No variations available</p>
                    )}
                  </div>
                  <div>
                    {product.stock > 0 ? (
                      <>
                        <p>
                          <span>Stock</span> : {product.stock}
                        </p>
                      </>
                    ) : (
                      <p>Out of stock</p>
                    )}
                  </div>
                  <button
                    className='order-button'
                    onClick={() => handleOrderClick(product)}
                  >
                    Order
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {orderSlipVisible && (
        <OrderSlip 
          product={selectedProduct} 
          onSubmit={handleOrderSubmit} 
          onClick={handleCloseOrderSlip}
        />
      )}
    </>
  );
}

export default ProductsList;