import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ItemListContainer from './components/ItemListContainer.jsx';
import ItemDetailContainer from './components/ItemDetailContainer.jsx';
import NotFound from './components/NotFound';
import NavBar from './components/NavBar';
import { CartProvider } from './contexts/CartContext.jsx';  // Importa el CartProvider
function App() {
  return (
    <CartProvider>
      <Router>
        <NavBar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<ItemListContainer greeting="Catálogo de productos" />} />
            <Route path="/category/:categoryId" element={<ItemListContainer />} />
            <Route path="/item/:id" element={<ItemDetailContainer />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
