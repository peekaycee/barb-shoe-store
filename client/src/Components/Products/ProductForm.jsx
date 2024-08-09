import './ProductForm.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ProductForm = () => {
  const [image, setImage] = useState('');
  const [product, setProduct] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    // add function to submit form values to database here...........

    console.log(image, price, stock);

    navigate('/admin/products');
  };

  return (
    <section className='productForm'>
      <h2>Add New Product</h2>
      <form>
        <div>
          <label htmlFor='image'>ImageUrl: </label>
          <input
            type='text'
            id='image'
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
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
            required
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
            required
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
            required
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
            required
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
            required
            min={0}
            placeholder={0}
            autoComplete='on'
          />
        </div>
        <button type='sumbit' onClick={submitForm}>
          add to list
        </button>
      </form>
    </section>
  );
};

export default ProductForm;
