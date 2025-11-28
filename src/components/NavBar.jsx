import React from 'react';
import { useCart } from '../contexts/CartContext';  // Usamos el hook para acceder al carrito
import CartWidget from './CartWidget';
import { Link } from 'react-router-dom';
import '../styles/estilos.css';

const NavBar = () => {
  const { cart } = useCart();  // Obtener el carrito desde el contexto

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">
          <Link to="/">
            <img src="/img/logo-shop.jpg" alt="Logo Tierra Zen" />
          </Link>
        </h1>
        <div className="navbar-links">
          <Link className="a-nav" to="/category/mas-vendidos">Más Vendidos</Link>
          <Link className="a-nav" to="/category/ofertas">Ofertas</Link>
          <Link className="a-nav" to="/category/novedades">Novedades</Link>
          <CartWidget cart={cart} /> {/* Pasamos el carrito actualizado al CartWidget */}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
