import React from 'react';
import { useCart } from '../contexts/CartContext';

const CartView = () => {
  const { cart, clearCart } = useCart();  // Accede al carrito y la función para limpiar el carrito

  return (
    <div>
      <h2>Tu carrito de compras</h2>
      {cart.map((producto) => (
        <div key={producto.id}>
          <p>
            {producto.name} - ${producto.price} x {producto.quantity}
          </p>
        </div>
      ))}
      <p>Total: ${cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}</p>
      <button onClick={clearCart}>Vaciar carrito</button>
      <button>Finalizar compra</button>
    </div>
  );
};

export default CartView;
