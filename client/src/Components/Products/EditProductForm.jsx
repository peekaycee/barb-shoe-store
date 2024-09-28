import './ProductForm.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const EditProductForm = () => {
  const { id } = useParams();
  const [initialProduct, setInitialProduct] = useState(null); // Initialize as null
  const [image, setImage] = useState('');
  const [product, setProduct] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the product data by ID
    axios
      .get(`/products/${id}`)
      .then((response) => {
        const product = response.data;
        setInitialProduct(product); // Save initial product data
        setImage(product.imageUrl);
        setProduct(product.name);
        if (product.variations && product.variations.length > 0) {
          const variation = product.variations[0]; // Assuming one variation
          setSize(variation.size);
          setColor(variation.color);
        }
        setPrice(product.price);
        setStock(product.stock);
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
      });
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();

    // Only update fields that have changed
    const updatedProduct = {};

    if (image !== initialProduct.imageUrl) updatedProduct.imageUrl = image;
    if (product !== initialProduct.name) updatedProduct.name = product;

    // Handle variations
    if (initialProduct.variations) {
      // Check if the size or color is different
      const existingVariation = initialProduct.variations.find(
        (v) => v.size === size
      );

      if (existingVariation) {
        // Update existing variation
        if (color !== existingVariation.color) {
          updatedProduct.variations = updatedProduct.variations || [];
          updatedProduct.variations = updatedProduct.variations.map((v) =>
            v.size === size ? { ...v, color } : v
          );
        }
      } else {
        // Add new variation if it doesn't exist
        updatedProduct.variations = updatedProduct.variations || [];
        updatedProduct.variations.push({ size, color });
      }
    } else {
      // Handle the case where there are no initial variations
      updatedProduct.variations = [{ size, color }];
    }

    if (price !== initialProduct.price) updatedProduct.price = price;
    if (stock !== initialProduct.stock) updatedProduct.stock = stock;

    try {
      const response = await axios.put(`/products/${id}`, updatedProduct); // Use PUT for updates
      console.log('Product updated:', response.data);
      navigate('/admin/products');
    } catch (error) {
      if (error.response) {
        console.error('Error updating product:', error.response.data.message);
      } else {
        console.error('Error updating product:', error.message);
      }
    }
  };

  if (!initialProduct) {
    return <div>Loading...</div>; // Loading state while fetching data
  }

  return (
    <section className='productForm'>
      <div className="closeBtn" onClick={() => navigate('/admin/products')}>X</div>
      <h2>Edit Product Details</h2>
      <form onSubmit={submitForm}>
        <div>
          <label htmlFor='image'>ImageUrl: </label>
          <input
            type='text'
            id='image'
            value={image}
            onChange={(e) => setImage(e.target.value)}
            autoComplete='on'
          />
        </div>
        <div>
          <label htmlFor='product'>Product: </label>
          <input
            type='text'
            id='product'
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            autoComplete='on'
          />
        </div>
        <div>
          <label htmlFor='size'>Size: </label>
          <input
            type='number'
            id='size'
            value={size}
            onChange={(e) => setSize(e.target.value)}
            min={0}
            placeholder={43}
            autoComplete='on'
          />
        </div>
        <div>
          <label htmlFor='color'>Color: </label>
          <input
            type='text'
            id='color'
            value={color}
            onChange={(e) => setColor(e.target.value)}
            autoComplete='on'
          />
        </div>
        <div>
          <label htmlFor='price'>Price($): </label>
          <input
            type='number'
            id='price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min={0}
            placeholder={'$1'}
            autoComplete='on'
          />
        </div>
        <div>
          <label htmlFor='stock'>Stock: </label>
          <input
            type='number'
            id='stock'
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            min={0}
            placeholder={0}
            autoComplete='on'
          />
        </div>
        <button type='submit'>Save Changes</button>
      </form>
    </section>
  );
};

export default EditProductForm;
