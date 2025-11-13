import React, { useState, useEffect } from 'react';
import '../Styles/cart.css';


function Cart({ cart, updateQuantity, setCart }) {
  const [removing, setRemoving] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(newTotal);
  }, [cart]);

  const handleClear = () => {
    if (cart.length === 0) return;
    if (!window.confirm('Are you sure you want to clear the entire cart?')) return;

    setRemoving(true);

    setCart([]);
    setTotal(0);
    localStorage.removeItem('cart');
  
    setTimeout(() => setRemoving(false),300);
  };

  return (
    <div className="cart">
      <h1>Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              className={`cart-item ${removing ? 'removing' : ''}`}
            >
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p>Price: ${item.price}</p>
              <div>
                <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                <span>Quantity: {item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
              </div>
              <p>Subtotal: ${item.price * item.quantity}</p>
            </div>
          ))}

          {cart.length > 0 && (
            <>
              <h2>Total: ${total}</h2>
              <div className="cart-actions">
                <button className="clear-btn" onClick={handleClear}>
                  Clear Cart
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Cart;
