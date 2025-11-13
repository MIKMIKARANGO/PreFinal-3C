import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import ProductList from './Components/ProductList';
import ProductDetail from './Components/ProductDetails';
import AddProduct from './Components/AddProduct';
import Cart from './Components/Cart';
import './Styles/addproduct.css';
import './Styles/cart.css';
import './Styles/productcard.css';
import './Styles/productdetails.css';
import './Styles/productlist.css';
import './App.css';


function App() {
  const [products, setProducts] = useState([
    {
      id: 1,
      image: 'https://i.pinimg.com/1200x/a5/82/17/a58217da8c43b0a4dd9b0b18d5f706e5.jpg',
      name: 'Oreo Cupcakes: Cookie Crunch Delight',
      category: 'Cookie Flavors',
      description: 'Oreo cupcakes combine beloved cookie flavors with tender cake texture, creating irresistible treats among different types of cupcake flavors that satisfy both cookie lovers and cupcake enthusiasts with every delightful, crunchy bite!.',
      spec: 'Moist chocolate cupcake base blended with crushed Oreo cookies, topped with creamy cookies-and-cream frosting and finished with a mini Oreo garnish. Contains gluten, milk, and eggs. Best stored refrigerated and served at room temperature within 3 days of purchase.',
      rating: 4.8,
      price: 88,
      quantity: 10,
    },
    {
      id: 2,
      image: 'https://mangoesandpalmtrees.com/wp-content/uploads/2024/12/AD_4nXdTS4O59JNw-i6O5hgzKBjSXX3mlP-TI6xO2X6zTjD9x9nOC6UUsCLefvj706smrB9B4tPjo8i5QPhEWUud68CqNgOws8bncS6DQ1iBOMw4VzSHTAOBWosTs1GFdSIos3DGfBsghQ.png.webp',
      name: 'Succulent Cupcakes',
      category: 'Succulent Flavors',
      description: 'Artful green frosting creates stunning succulent designs perfect for nature-themed events.',
      spec: 'Soft vanilla or chocolate cupcake base topped with hand-piped buttercream succulents using natural food colors. Each design is unique and crafted for visual appeal and creamy flavor. Contains gluten, milk, and eggs. Store in a cool, dry place and consume within 3 days for best freshness.',
      rating: 4.7,
      price:  50,
      quantity: 12,
    },
    {
      id: 3,
      image: 'https://mangoesandpalmtrees.com/wp-content/uploads/2024/12/AD_4nXf8un2lFsuQ3bxkus1DnAOmfvPp3q1K_pAA5tF_mDL22JVj-I1ljbrP4Ie5FTCIFyzAfjpRTVXnr_LkbqUdY4UwOVdepTNtRTSnNE67HXgsx5kXYMlf9jxmyG-5vVTqOIcxmJgndQ.png.webp',
      name: 'Confetti Butterfly Cupcakes',
      category: 'Celebration Flavors',
      description: 'Playful sprinkles and butterfly wings create magical treats perfect for celebrations..',
      spec: 'Cut cake tops become decorative “wings”.',
      rating: 4.9,
      price: 75,
      quantity: 10,
    },
  ]);

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState('All');

   useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addProduct = (newProduct) => {
    const id = products.length + 1;
    setProducts([...products, { ...newProduct, id }]);
  };

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, change) => {
    if (id === null && change === 'clear') {
      setCart([]);
      return;
    }

    setCart((prevCart) => prevCart
      .map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
      )
      .filter((item) => item.quantity > 0)
    );
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ProductList products={products} filter={filter} setFilter={setFilter} addToCart={addToCart} />} />
        <Route path="/product/:id" element={<ProductDetail products={products} addToCart={addToCart} />} />
        <Route path="/add" element={<AddProduct addProduct={addProduct} />} />
        <Route   path="/cart"
          element={<Cart cart={cart} updateQuantity={updateQuantity} setCart={setCart} />} />
      </Routes>
    </Router>
  );
}

export default App;