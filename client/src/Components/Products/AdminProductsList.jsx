import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './AdminProductList.css';
import { useNavigate } from 'react-router-dom';

function AdminProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

 

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

  const addNewProduct=()=>{
    navigate('/admin/products/productForm')
  }

  return (
    <section className='usersList'>
      <h2>Product Details</h2>
      <button className='add-user' onClick={addNewProduct}>Add Product</button>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Product</th>
            <th>Variations</th>
            <th>Price</th>
            <th>Stock</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const formattedPrice = isNaN(product.price)
              ? '-'
              : `$${product.price.toFixed(2)}`;

            return (
              <tr key={product._id}>
                <td>
                  <img
                    src={`/assets/images/${product.imageUrl}`}
                    alt={product.imageUrl}
                    style={{ width: '100px', height: 'auto' }}
                  />
                </td>
                <td>
                  <p>{product.name}</p>
                </td>
                <td>
                  {product.variations.map((variation, index) => (
                    <div key={index}>
                      <p>Color: {variation.color}</p>
                      <p>Size: {variation.size}</p>
                    </div>
                  ))}
                </td>
                <td>
                  <p>{formattedPrice}</p> 
                </td>
                <td>
                  <p>{product.stock}</p>
                </td>
                <td>
                  <FontAwesomeIcon
                    icon={faEdit}
                    style={{ marginRight: '10px', cursor: 'pointer' }}
                    // onClick={addNewProduct:id}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={{ cursor: 'pointer' }}
                     // onClick={addNewProduct:id}
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

export default AdminProductsList;
