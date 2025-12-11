import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import CartWidgetRI from './CartWidgetRI';  // Este es tu componente para mostrar el ícono del carrito
import { NavLink } from 'react-router-dom';

function NavbarBS() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        {/* Logo de la tienda */}
        <Navbar.Brand as={NavLink} to="/">
          <img src="logo-shop.png" alt="logo" style={{ width: '7rem' }} />
        </Navbar.Brand>
        
        {/* Botón para el menú en dispositivos móviles */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        {/* Menú de navegación */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* Enlace a la página de inicio */}
            <Nav.Link as={NavLink} to="/">Inicio</Nav.Link>
            
            {/* Menú desplegable para categorías de productos */}
            <NavDropdown title="Productos" id="basic-nav-dropdown">
              <NavDropdown.Item as={NavLink} to="/category/nuevos">
                Nuevos
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={NavLink} to="/category/mas-vendidos">
                Más Vendidos
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={NavLink} to="/category/ofertas">
                Ofertas
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          
          {/* Componente del carrito (ícono y cantidad de productos) */}
          <CartWidgetRI />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarBS;
