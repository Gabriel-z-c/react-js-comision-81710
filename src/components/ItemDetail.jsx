// src/components/ItemDetail.jsx
import React, { useState } from 'react';
import ItemCount from './ItemCount';  // Importamos el componente ItemCount
import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';  // Asegúrate de que esta ruta sea correcta
import { Link } from 'react-router-dom';

const ItemDetail = ({ detalle }) => {
  const { cart, addToCart, cartQuantity } = useContext(CartContext);  // Usamos el contexto para acceder al carrito

  const [purchase, setPurchase] = useState(false);  // Estado para verificar si se compró el producto

  // Función para agregar al carrito
  const onAdd = (cantidad) => {
    console.log(`Agregaste ${cantidad} al carrito`);
    setPurchase(true);  // Cambiamos el estado de compra a true
    addToCart(detalle, cantidad);  // Agregamos el producto al carrito

    alert(`Agregaste ${detalle.name} al carrito`);  // Usamos alert para mostrar el mensaje
  };

  // Calculamos el stock disponible
  const stockActualizado = detalle.stock - cartQuantity(detalle.id);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', flexWrap: 'wrap' }}>
      <h1>Detalle de: {detalle.name}</h1>
      {/* Aquí accedemos a la imagen en public/img/ */}
      <img src={`/img/${detalle.img}`} alt={detalle.name} />
      <p>{detalle.description}</p>
      <p>${detalle.price},00</p>
      <p>STOCK DISPONIBLE: {stockActualizado}</p>

      {purchase ? (
        <Link className='btn btn-dark' to='/cart'>Terminar compra</Link>
      ) : (
        <ItemCount stock={stockActualizado} onAdd={onAdd} />
      )}
    </div>
  );
};

export default ItemDetail;