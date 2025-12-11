src/components/NavBar.jsx
import React from 'react';
import { useCart } from '../contexts/CartContext';  // Acceder al carrito
import { Link } from 'react-router-dom';
import CartWidget from './CartWidget';  // Mostrar la cantidad de productos

const NavBar = () => {
  const { cart } = useCart();
  const cartLength = cart.length;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">
          <Link to="/">Mi Tienda</Link>
        </h1>
        <div className="navbar-links">
          <Link className="a-nav" to="/category/mas-vendidos">Más Vendidos</Link>
          <Link className="a-nav" to="/category/ofertas">Ofertas</Link>
          <Link className="a-nav" to="/category/novedades">Novedades</Link>
          <Link to="/cart">
            <CartWidget cartLength={cartLength} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;           