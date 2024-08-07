import { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminProductList.css';

function AdminProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <div>
              <p>{product.imageUrl} </p>
              <p>{product.name} </p>
              <p>${product.price} </p>
              <p>{product.stock} </p>
            </div>
            <div>
              {product.variations.map((variation, index) => (
                <div key={index}>
                  <p>Color: {variation.color}</p>
                  <p>Size: {variation.size}</p>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminProductsList;
