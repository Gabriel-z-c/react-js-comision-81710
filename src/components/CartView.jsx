// src/components/CartView.jsx
import React from 'react';
import { useCart } from '../contexts/CartContext'; // Accedemos al contexto del carrito

const CartView = () => {
  const { cart, clearCart, getTotal } = useCart();  // Obtenemos el carrito, la función clear y getTotal desde el contexto

  if (cart.length === 0) {
    return <p>El carrito está vacío</p>;
  }
  return (
    <div>
      <h2>Tu carrito de compras</h2>
      {cart.map((producto) => (
        <div key={producto.id}>
          <p>{producto.name} - ${producto.price} x {producto.quantity}</p>
        </div>
      ))}
      <p>Total: ${getTotal()}</p>
      <button onClick={clearCart}>Vaciar carrito</button>
      <button>Finalizar compra</button>
    </div>
  );
};

export default CartView;
