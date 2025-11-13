import React from "react";
import { useParams } from "react-router-dom";
import "../styles/productdetails.css";

function ProductDetail({ products, addToCart }) {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return <p>Product not found.</p>;

  return (
    <div className="product-details-container">
      <div className="product-details-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-details-info">
        <h1 className="product-title">{product.name}</h1>
        <p className="product-category">
          <strong>Category:</strong> {product.category}
        </p>

        <p className="product-description">
          <strong>Description:</strong> {product.description}
        </p>

        <div className="product-specs">
          <h3>Specifications</h3>
          <p>{product.spec}</p>
          <p>
            <strong>Rating:</strong> {product.rating}/5
          </p>
        </div>

        <div className="product-purchase">
          <div>
            <p>
              <strong>Price:</strong> ${product.price.toLocaleString()}
            </p>
            <p>
              <strong>Quantity:</strong> {product.quantity}
            </p>
            <p>
              <strong>Subtotal:</strong> $
              {(product.price * product.quantity).toLocaleString()}
            </p>
          </div>
          <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
