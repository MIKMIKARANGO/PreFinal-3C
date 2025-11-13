import React from "react";
import { Link } from "react-router-dom";
import '../Styles/productcard.css';

function ProductCard({ product, addToCart }) {
  const isLowStock = product.quantity < 5;

  return (
    <div className={`product-card ${isLowStock ? "low-stock" : ""}`}>
      <img src={product.image} alt={product.name} className="product-image" />

      <h3 className="product-name">{product.name}</h3>

      <p>Price: ${product.price.toLocaleString()}</p>
      <p>
        Quantity:{" "}
        <span className={isLowStock ? "quantity-warning" : ""}>
          {product.quantity}
        </span>
      </p>
      <p>Subtotal: ${(product.price * product.quantity).toLocaleString()}</p>

      {isLowStock && (
        <p className="low-stock-text">⚠ Low Stock! Only {product.quantity} left.</p>
      )}

      <div className="button-group">
        <Link to={`/product/${product.id}`} className="details-btn">
          View Details
        </Link>
        <button className="cart-btn" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
