import React from "react";
import { useCart } from "../contexts/CartContext";
import CartItem from "./CartItem"; 

const CartView = () => {
  const { cart, removeFromCart } = useCart();

  if (cart.length === 0) {
    return <p>El carrito está vacío.</p>;
  }

  const total = cart.reduce(
    (sum, producto) => sum + producto.price * producto.quantity,
    0
  );

  return (
    <div>
      <h2>Tu Carrito</h2>
      {cart.map((producto) => (
        <CartItem key={producto.id} producto={producto} removeFromCart={removeFromCart} />
      ))}
      <p>Total: ${total}</p>
      <button>Finalizar compra</button>
    </div>
  );
};

export default CartView;
