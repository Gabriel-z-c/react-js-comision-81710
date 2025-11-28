import React from "react";

const CartItem = ({ producto, removeFromCart }) => {
  return (
    <div>
      <h3>{producto.name}</h3>
      <p>Cantidad: {producto.quantity}</p>
      <p>Precio: ${producto.price}</p>
      <button onClick={() => removeFromCart(producto.id)}>Eliminar</button>
    </div>
  );
};

export default CartItem;
