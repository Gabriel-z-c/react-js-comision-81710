import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import CartContainer from './components/CartContainer';
import CheckoutRHF from './components/CheckoutRHF';
import NotFound from './components/NotFound';
import NavbarBS from './components/NavbarBS';  // Importamos NavbarBS
import { CartProvider } from './contexts/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <NavbarBS />  {/* Usamos NavbarBS aquí */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<ItemListContainer greeting="Catálogo de productos" />} />
            <Route path="/category/:categoryId" element={<ItemListContainer />} />
            <Route path="/item/:id" element={<ItemDetailContainer />} />
            <Route path="/cart" element={<CartContainer />} />
            <Route path="/checkout" element={<CheckoutRHF />} />
            <Route path="*" element={<NotFound message="Página no encontrada" />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;