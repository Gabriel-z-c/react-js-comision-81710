 import React from 'react';

const CartWidget = ({ cart }) => {
  const cartLength = cart.length;  // Obtenemos la cantidad de productos en el carrito

  return (
    <div className="cart-widget">
      🛒
      <span className="cart-count">{cartLength}</span>  {/* Muestra la cantidad de productos */}
    </div>
  );
};

export default CartWidget;
