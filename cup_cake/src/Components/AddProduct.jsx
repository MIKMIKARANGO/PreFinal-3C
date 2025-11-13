import React, { useState } from 'react';
import '../styles/addproduct.css';

function AddProduct({ addProduct }) {
  const [form, setForm] = useState({
    image: '',
    name: '',
    category: '',
    description: '',
    spec: '',
    rating: '',
    price: '',
    quantity: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(form).some((val) => !val)) {
      alert('All fields are required!');
      return;
    }
    addProduct({
      ...form,
      price: parseFloat(form.price),
      quantity: parseInt(form.quantity),
      rating: parseFloat(form.rating),
    });
    setForm({
      image: '',
      name: '',
      category: '',
      description: '',
      spec: '',
      rating: '',
      price: '',
      quantity: '',
    });
  };

  return (
    <div className="add-product">
      <h1>Add New Product</h1>
      <form onSubmit={handleSubmit}>
        <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />
        <input name="name" placeholder="Product Name" value={form.name} onChange={handleChange} />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input name="spec" placeholder="Specifications" value={form.spec} onChange={handleChange} />
        <input name="rating" type="number" step="0.1" placeholder="Rating" value={form.rating} onChange={handleChange} />
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} />
        <input name="quantity" type="number" placeholder="Quantity" value={form.quantity} onChange={handleChange} />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
