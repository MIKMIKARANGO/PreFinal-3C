import React from 'react';
import ProductCard from './ProductCard';
import '../styles/productlist.css';

function ProductList({ products, filter, setFilter, addToCart }) {
  const filteredProducts = filter === 'All' ? products : products.filter((p) => p.category === filter);
  const categories = ['All', ...new Set(products.map((p) => p.category))];

  return (
    <div className="product-list">
      <h1>Mica's Cup Cake Menu</h1>
      <select onChange={(e) => setFilter(e.target.value)} value={filter}>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <div className="cards">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;