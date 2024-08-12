import { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import './AdminProductList.css';

function AdminProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  const addNewProduct = () => {
    navigate('/admin/products/productForm');
  };

  const fetchProducts = () => {
    setLoading(true);
    axios
      .get('/products')
      .then((response) => {
        setProducts(response.data);
        setLoading(false);

        const outOfStockProducts = response.data.filter(
          (product) => product.stock === 0
        );
        if (outOfStockProducts.length > 0) {
          setNotifications(
            outOfStockProducts.map(
              (product) =>
                `The ${product.variations[0]?.color} "${product.name}" of size ${product.variations[0]?.size} is out of stock!`
            )
          );
        }
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setError('Error fetching products');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const reloadPage = () => {
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this product?'
    );
    if (!confirmed) return;

    try {
      await axios.delete(`/products/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const editProduct = (id) => {
    navigate(`/admin/products/edit/${id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className='usersList'>
      <h2>Product Details</h2>
      <button className='add-user' onClick={addNewProduct}>
        Add Product
      </button>

      {/* Display notifications when out of stock */}
      {notifications.length > 0 && (
        <div className='notifications'>
          <h3>Notifications</h3>
          <ul>
            {notifications.map((notification, index) => (
              <li key={index}>{notification}</li>
            ))}
          </ul>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Product</th>
            <th>Variations</th>
            <th>Price</th>
            <th>Stock</th>
            <th></th>
            <th>
              <span className='refresh' onClick={reloadPage}>
                <RefreshIcon
                  style={{ marginLeft: '10px', cursor: 'pointer' }}
                />
              </span>
            </th>
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
                  <EditIcon
                    style={{ marginRight: '10px', cursor: 'pointer', color: '#480505'}}
                    onClick={() => editProduct(product._id)}
                  />
                </td>
                <td>
                  <DeleteIcon
                    style={{ cursor: 'pointer', color: 'red' }}
                    onClick={() => deleteProduct(product._id)}
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
