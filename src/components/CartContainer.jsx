import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext'; // Accedemos al contexto del carrito
import EmptyCart from './EmptyCart'; // Componente que muestra un mensaje si el carrito está vacío
import CartView from './CartView'; // Componente que muestra el contenido del carrito

const CartContainer = () => {
  const { cart } = useContext(CartContext);  // Obtenemos el carrito del contexto

  return (
    <>
      {
        !cart.length  // Si el carrito está vacío
        ? <EmptyCart />  // Muestra el componente EmptyCart
        : <CartView />   // Si el carrito tiene productos, muestra CartView
      }
    </>
  );
};

export default CartContainer;
